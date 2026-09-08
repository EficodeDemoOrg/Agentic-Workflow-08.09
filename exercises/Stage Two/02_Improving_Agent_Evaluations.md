# Task 2 : Improving Agent Evaluations

![02_Improving_Agent_Evaluations](/exercises/images/02_Improving_Agent_Evaluations.png)

In this repository we've implemented an AI powered evaluator for agents and skill definitions. The source code can be found in [evaluator/](/evaluator/).

This is a tool written in typescript that is utilizing the Copilot SDK to get AI to review the definitions, using some custom tool definitions to extract the output in a reliable manner.

## Tasks

- [ ] Add a programatic check that the agent files are syntaxically formatted right.
  - Wrongly formatted agent definition results in a 0 score.
- [ ] Check if the model chosen is a valid model
  - (!) Undefined model selection is fine; might be a design choice
- [ ] Check if the chosen model is a reasonable choice for the agents role
  - Can be part of the agent evaluation system prompt
  - Can be a seperate check impacting the final score
- [ ] Check that the tool allow-list isn't too loose or narrow.

---

**Previous:** [← 1. Creating an Agentic Workflow](01_Creating_an_Agentic_Workflow.md)  
**Next:** [3. Improving Skill Evaluations →](03_Improving_Skill_Evaluations.md)
