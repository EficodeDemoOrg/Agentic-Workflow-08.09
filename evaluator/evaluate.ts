
import { z } from "zod";
import { CopilotClient, defineTool } from "@github/copilot-sdk";

type EvaluationResult = {
    score: number;
    reasoning: string;
};

const maxEvaluationAttempts = 3;

function isEvalFailure(error: unknown): boolean {
    return error instanceof Error && error.cause === "eval_failure";
}

const EvalSchema = z.object({
    score: z.number().min(1).max(10).describe("The score of the evaluation, must be between 1 and 10."),
    reasoning: z.string().min(1).max(500).describe("The reasoning and justification behind the evaluation, must be between 1 and 500 characters."),
});

const evaluateTool = defineTool(
    "evaluate",
    {
        description: "Evaluates the quality of a given code snippet and provides a score and reasoning.",
        parameters: EvalSchema,
        defer: "never",
        skipPermission: true,
        isTerminal: true,
        handler: async (value: any) => {
            return { score: value.score, reasoning: value.reasoning };
        },
    }
);

const baseRole = `
You are an evaluator for agents, prompts, skills and tools. You will be given a code snippet and you need to evaluate its quality based on the following criteria:
1. Correctness: Does the code do what it is supposed to do?
2. Efficiency: Is the code optimized for performance?
3. Readability: Is the code easy to read and understand?
4. Maintainability: Is the code structured in a way that makes it easy to maintain and extend?
`;

const scoringSystem = `
<scoring>
The scoring system is based on a scale of 1 to 10, where 1 is the lowest and 10 is the highest. 
Every evaluation should include a reasoning to justify the score given.
1 - Failing: The agent or skill does not meet the basic requirements and fails to perform its intended function.
2 - Poor: The agent or skill has significant issues that hinder its performance and usability.
3 - Below Average: The agent or skill performs below expectations and has noticeable flaws
4 - Average: The agent or skill meets basic expectations but lacks advanced features or optimizations.
5 - Above Average: The agent or skill performs well in most scenarios but has some areas for improvement.
6 - Good: The agent or skill performs well and meets expectations, with minor areas for improvement.
7 - Very Good: The agent or skill performs very well, with only minor issues or areas for improvement.
8 - Excellent: The agent or skill performs excellently, with only minor issues
9 - Outstanding: The agent or skill performs exceptionally well, with very few issues or areas for improvement.
10 - Exceptional: The agent or skill performs exceptionally well, exceeding expectations and demonstrating advanced capabilities
</scoring>`;

async function evaluateBase(systemMessage: string, evaluationPrompt: string): Promise<EvaluationResult> {
    for (let attempt = 1; attempt <= maxEvaluationAttempts; attempt++) {
        try {
            return await evaluateBaseAttempt(systemMessage, evaluationPrompt);
        } catch (error) {
            if (!isEvalFailure(error)) {
                throw error;
            }

            if (attempt === maxEvaluationAttempts) {
                throw new Error("Maximum retry attempts reached during evaluation.", { cause: "eval_failure" });
            }

            console.error(`Evaluation failed, retrying (${attempt}/${maxEvaluationAttempts})...`, error);
        }
    }

    throw new Error("Maximum retry attempts reached during evaluation.", { cause: "eval_failure" });
}

async function evaluateBaseAttempt(systemMessage: string, evaluationPrompt: string): Promise<EvaluationResult> {
    const client = new CopilotClient();
    await client.start();

    try {
        const session = await client.createSession({
            systemMessage: {
                mode: "replace",
                content: systemMessage,
            },
            enableSessionStore: false,
            tools: [evaluateTool],
        });

        const result = await session.sendAndWait(evaluationPrompt);

        if (!result?.data.toolRequests || result.data.toolRequests.length === 0) {
            throw new Error("No tool requests found in the evaluation result.", { cause: "eval_failure" });
        }

        const evaluations = result.data.toolRequests
            .filter((request) => request.name === "evaluate")
            .map((request) => {
                const args = request.arguments;
                const isRecord = typeof args === "object" && args !== null && !Array.isArray(args);
                return {
                    score: isRecord ? (args as { [key: string]: unknown }).score : undefined,
                    reasoning: isRecord ? (args as { [key: string]: unknown }).reasoning : undefined,
                } as EvaluationResult;
            });

        if (evaluations.length === 0) {
            throw new Error("No evaluations found in the tool requests.", { cause: "eval_failure" });
        }
        
        const evaluation = evaluations[0];
        
        if (evaluation?.score === undefined || evaluation?.reasoning === undefined) {
            throw new Error("Incomplete evaluation result.", { cause: "eval_failure" });
        }
        
        return evaluation;
    } catch (error) {
        console.error("Error during evaluation:", error);
        throw error;
    } finally {
        await client.stop();
    }
}

async function evaluatePerformance(userPrompt: string, processOutput: string, expectations: string): Promise<EvaluationResult> {
    const systemMessage = `
${baseRole}
${scoringSystem}
`;
    const evaluationPrompt = `
Evaluate the performance based on the following user prompt, process output, and expectations.

<user-prompt>
${userPrompt}
</user-prompt>

<process-output>
${processOutput}
</process-output>

<expectations>
${expectations}
</expectations>
`;

    return await evaluateBase(systemMessage, evaluationPrompt);
}

async function evaluateSkillDefinition(skillDefinition: string, skillArtifacts?: { path: string; content: string }[]) : Promise<EvaluationResult> {
    const systemMessage = `
${baseRole}
${scoringSystem}
`;
    let evaluationPrompt = `
Evaluate the following skill definition based on the criteria provided.

<skill-definition>
${skillDefinition}
</skill-definition>
`;
    if (skillArtifacts && skillArtifacts.length > 0) {
        evaluationPrompt += `
<skill-artifacts>
${skillArtifacts.map(artifact => `<artifact path="${artifact.path}">${artifact.content}</artifact>`).join("\n")}
</skill-artifacts>
`;
    }

    return await evaluateBase(systemMessage, evaluationPrompt);
}

async function evaluateAgentDefinition(agentDefinition: string): Promise<EvaluationResult> {

    const systemMessage = `
${baseRole}
${scoringSystem}
`;
    const evaluationPrompt = `
Evaluate the following agent definition based on the criteria provided. 

<agent-definition>
${agentDefinition}
</agent-definition>
`;

    return await evaluateBase(systemMessage, evaluationPrompt);
}


export {
    evaluatePerformance,
    evaluateSkillDefinition,
    evaluateAgentDefinition
};

export type { EvaluationResult };