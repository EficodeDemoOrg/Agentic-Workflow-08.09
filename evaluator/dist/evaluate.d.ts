type EvaluationResult = {
    score: number;
    reasoning: string;
};
declare function evaluatePerformance(userPrompt: string, processOutput: string, expectations: string): Promise<EvaluationResult>;
declare function evaluateSkillDefinition(skillDefinition: string, skillArtifacts?: {
    path: string;
    content: string;
}[]): Promise<EvaluationResult>;
declare function evaluateAgentDefinition(agentDefinition: string): Promise<EvaluationResult>;
export { evaluatePerformance, evaluateSkillDefinition, evaluateAgentDefinition };
export type { EvaluationResult };
//# sourceMappingURL=evaluate.d.ts.map