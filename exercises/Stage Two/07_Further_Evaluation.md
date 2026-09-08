# Task 7 : Further Evaluation

![02_Improving_Agent_Evaluations](/exercises/images/02_Improving_Agent_Evaluations.png)

We've implemented some evaluations of the agentic resources so far in this workshop. These tests/evaluations have so far been utilizing AI to proofread and score the evaluations we have created, as well as some programatic tests to verify correct syntax etc.. This is all well, but we might be left with the question "but how do they work in practice?". This is a harder problem to test, but still doable.

In the file [/evaluator/evaluate.test.ts](/evaluator/evaluate.test.ts) we do find some tests where we test the output of the agent based on what we expect given a certain input. 

**How can we implement something similar for these other agents?**

One way can be to run prompts using these agents in a sandbox environment where we make sure the output of the test runs does not make it into the commit history of the codebase. Fetching the output and logs of a run can provide us with the insight into the reasoning, output, tool calls etc of the AI agents, and this is something we can utilize to check the behavior. 

You can use the method ´evaluatePerformance´ from [/evaluator/evaluate.ts](/evaluator/evaluate.ts) to get Copilot to score the output based on the input and free-text expectations in the same manner as the other AI powered evaluations we have in this repo.


---

**Previous:** [← 6. Tying it togehter](07_Further_Evaluation.md)
**Back to Overview:** [← Overview](README.md)