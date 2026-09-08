# Agentic Workshop and AI Evaluation Workshop

![Agentic Workshop and AI Evaluation Workshop](/exercises/images/Agentic_Workshop_and_AI_Evaluation_Workshop.png)
In this workshop we will take a look at how we can both create agentic workflows that can run autonomously in environments we configure.

## Exercises

|  #  | Exercise                                                           | What you'll do                                                             |
| :-: | ------------------------------------------------------------------ | -------------------------------------------------------------------------- |
|  1  | [Creating an Agentic Workflow](01_Creating_an_Agentic_Workflow.md) | Build an agentic workflow that reprioritizes backlog items automatically.  |
|  2  | [Improving Agent Evaluations](02_Improving_Agent_Evaluations.md)   | Extend the evaluator with programmatic and model-choice checks for agents. |
|  3  | [Improving Skill Evaluations](03_Improving_Skill_Evaluations.md)   | Add structural and semantic checks for `SKILL.md` definitions.             |
|  4  | [CI/CD Checks](04_CICD_Checks.md)                                  | Run evaluations on pull requests and gate merges with branch protection.   |
|  5  | [Creating Orchestrations](05_Creating_Orchestrations.md)           | Script a local orchestration that runs and reviews agents in a loop.       |
|  6  | [Tying it Together](06_Tying_It_Together.md)                       | Chain the prioritization and implementation workflows into a daily run.    |
|  7  | [Further Evaluation](07_Further_Evaluation.md)  | Explore additional ways and aspects to evaluate with respects to evaluating agentic artifacts |

## Why Quality Matters

When we have agent, skill definitions and other ways that AI is being utilized by a team, and organization, users etc, they are part of our process and impacts the quality and usefullness of the results created by our AI tools.

These files are more than just documentation, in a way they are part of the infrastructure, just as CI/CD workflows, package managers, test suites etc.. The difference is that AI by nature is non-deterministic, which makes measuring and benchmarking more difficult.

## Approaches to Measurement

We can evaluate agents and skills in different ways.

**Manual** evaluation, however this is timeconsuming and it requires people to remember to do it, we are also not sure that we'd get the same results and if the same requirements have been followed each time.

**Programatic evaluation** is also a way to test our agents and is a great way to test things like the files having the right syntax for example. Due to the nature of agent definitions being defined using natural language, the non-deterministic nature of LLMs it is hard to fully test these using the programatic approach; two runs might create different output and both might still be valid.

**Agentic evaluations** helps us evaluate output, actions, evaluations etc. that doesn't neccesarily create one specific output, but where a range of outputs might all be right. Agents can be great for making desicions, test output of LLM processes etc. and therefore we can utilize one agent to test the output of a different agent. This can also be run programatically, solving some of the issues of manual evaluation.

## What Approach to Choose

There is no one approach to rule them all, these all have different strength and weaknesses, and work best when combined. Programatic tests are great where they can be used, and agentic tests are great where the outcome doesn't have a specific right or wrong answer. Manual evaluation comes in when we are interacting with these resources and reviewing past runs.

## Important Notes on Agentic Evaluation

Evaluating using an agent can be great but there are a couple of tips to keep in mind.

If it can be tested programatically, then that is usually the best option (examples syntax tests, exact output expected, exact tool calls expected).

When choosing a model, the more capable models are often preferred over small light weight models.

Requiring the agents to provide reasoning behind the scores it gives often improves the quality of the scoring and mitigates the tendency of AI agents to opt for average scores.

Providing information about score requirements, things to look out for etc is also great.

---

**Next:** [1. Creating an Agentic Workflow →](01_Creating_an_Agentic_Workflow.md)
