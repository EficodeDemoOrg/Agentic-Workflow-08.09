# Task 3 : Improving Skill Evaluations

![03_Improving_Skill_Evaluations](/exercises/images/03_Improving_Skill_Evaluations.png)

In this repository we've implemented an AI powered evaluator for agents and skill definitions. The source code can be found in [evaluator/](/evaluator/).

This is a tool written in typescript that is utilizing the Copilot SDK to get AI to review the definitions, using some custom tool definitions to extract the output in a reliable manner.

## Requirements

- [ ] Check that the SKILL.md file is formatted correctly
  - Wrong formatting results in 0 score
- [ ] Check that the SKILL.md header contains required properties
  - Missing required properties should give a 0 score
- [ ] Verify that the skill name is the same as the skill sub-folder
- [ ] Ensure the evaluator considers if the name and description fits with the content
- [ ] Ensure the evaluator considers if referenced files are part of the supporting files.
- [ ] Ensure the evaluator considers if the skill contains project specific information.

---

**Previous:** [← 2. Improving Agent Evaluations](02_Improving_Agent_Evaluations.md)  
**Next:** [4. CI/CD Checks →](04_CICD_Checks.md)
