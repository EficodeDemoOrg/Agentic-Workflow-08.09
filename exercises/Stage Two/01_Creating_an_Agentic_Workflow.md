# Task 1 : Creating an Agentic Workflow

![01_Creating_an_Agentic_Workflow](/exercises/images/01_Creating_an_Agentic_Workflow.png)

In your team/repo it is sometimes hard to know which issues to tackle next, as new issues are created, and priorities are changing.

Together with the team you've decided to create an agentic workflow to go through the backlog items and reprioritize them making it easier to choose what to do next.

## Why create workflows

Agentic workflows removes the "bottleneck" of the developer; they can be set to run at specified intervals or on events such as pull requests created, issues created, failures etc..

This way one can have the AI perform tasks and actions without having to be manually triggered by a user.

Agentic workflows is also a great way to perform rutine actions, reduce complexity, or to enhance current workflows where parts can be automated.

## Strategies

There are many strategies to creating agentic workflows, here are some of them.

**GitHub Agentic Workflows**: GitHub Agentic Workflows lets you set up and manage agentic workflows using the `gh aw` cli tool. The workflows run in GitHub actions and have features like safe outputs etc.

**GitHub Copilot CLI**: One can use the Copilot CLI for automated tasks, using scripts invoking it with the `-p` argument, or using one of the many SDKs available for GitHub Copilot CLI. The scripts can be run in many environments, including GitHub Actions.

**GitHub Copilot Automations**: Automations is a feature allowing you to create agentic workflows easily using the UI of either the GitHub Copilot App or the browser version. These can even be hosted on your own machine.

Feel free to experiment or choose between the options.

## Requirements

The workflow needs to fulfill the following criteria:

- [ ] Runs once every monday 07:00
- [ ] Runs on manual trigger
- [ ] Issues are labeled with their priority ("high", "medium", "low")
- [ ] Old outdated labels are removed
- [ ] Every time a priority changes for an issue, the reasoning is provided on the issue as a comment.

## Optional Requirements

- [ ] Group related tasks and tasks reliant on each other as sub-tasks of an overarching task.

## Resources

- [Create your own agentic workflow](https://githubnext.github.io/gh-aw-wizard/)
- [Creating and managing labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
- [GitHub Agentic Workflows](https://github.github.com/gh-aw/)
- [Evaluation Workflow (in repo)](/./.github/workflows/evaluate.yml)

---

**Previous:** [← Overview](README.md)  
**Next:** [2. Improving Agent Evaluations →](02_Improving_Agent_Evaluations.md)
