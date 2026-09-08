# Agent Skills — Reference

Skills are the most portable Copilot customization: folders of instructions (and optionally
scripts, templates, and examples) that Copilot loads **automatically** when it decides your
prompt matches a skill's described capability. Unlike instructions (always-on) or prompt files
(user-triggered), skills are auto-activated by intent matching — and unlike agents
(session-level), skills are **task-level**.

This is the concept behind [Exercise 1 — Build a Skill](../exercises/Stage%20One/01-build-a-skill.md).

## File structure

Each skill is a directory under `.github/skills/` containing a `SKILL.md`, plus any resources
the instructions reference:

```
.github/skills/
├── gh-issue-creator/
│   ├── SKILL.md              # Main skill definition
│   ├── bug-template.md       # Resource: issue template
│   └── feature-template.md   # Resource: issue template
└── greeting/
    └── SKILL.md
```

## SKILL.md anatomy

```markdown
---
name: gh-issue-creator
description: >
  Create GitHub issues via gh issue create, using bug or
  feature templates. Use when asked to file, open, or
  create an issue or bug report.
---

# GitHub Issue Creator

## When to use this skill
- User asks to file a bug report
- User asks to open a feature request

## Instructions
1. Pick the matching template: [bug-template.md](./bug-template.md)
2. Fill in the fields from the user's description
3. Run `gh issue create` with the right labels
```

Rules that trip people up:

- The frontmatter `name` **must match the folder name**.
- The `description` is the *only* thing Copilot sees before deciding to load the skill — the
  body is invisible at matching time. Put your trigger phrases there.
- Relative links to resource files must resolve from the skill directory.

## Progressive disclosure — why skills are cheap

Skills use a three-level loading model to keep the context window lean:

1. **Level 1 (always):** only the frontmatter `name` + `description` of every skill is loaded
   into the system prompt.
2. **Level 2 (on match):** when Copilot decides a skill is relevant, the full `SKILL.md` body
   is loaded.
3. **Level 3 (on reference):** resource files (templates, examples, scripts) are loaded only if
   the instructions link to them and they're needed.

This means you can install many skills without bloating every request — but it also means a
**bad description sinks the whole skill**, because level 2 never happens.

## Tuning triggers: explicit vs. implicit

The breadth of the `description` (not the instructions) controls when a skill fires:

| Style | Description wording | Behavior |
|---|---|---|
| **Explicit** | Narrow, names one exact trigger phrase | Fires only when the user says close to that phrase — predictable, controlled |
| **Implicit** | Broad, keyword-rich, lists varied phrasings | Fires automatically on related intents — convenient, but can over-trigger |

You build one of each in Exercise 1, and diagnose a description that's *too* narrow in
[Exercise 3 — Bug Hunt](../exercises/Stage%20One/03-bug-hunt.md).

## Skills vs. instructions

| | Instructions | Skills |
|---|---|---|
| Activation | Always included in every request | Auto-loaded only when relevant |
| Scope | Project-wide or file-targeted | Task-specific capabilities |
| Resources | Markdown text only | Can include scripts, templates, examples |
| Portability | VS Code specific | Open standard across agents |
| Best for | Coding standards, architecture context | Specialized workflows, tools, procedures |

Skills are an **open standard**: a skill you write for Copilot in VS Code also works with
Copilot CLI, the Copilot coding agent, and Claude Code. Project skills live in
`.github/skills/`; personal skills in `~/.copilot/skills/` apply across all your workspaces.

## Best practices

- Write clear, **keyword-rich descriptions** — matching happens on the description alone.
- Include a `## When to use` section so maintainers (and evaluators) can see the intended
  trigger boundaries at a glance.
- Use progressive disclosure deliberately: core instructions in `SKILL.md`, details in
  reference files.
- Include example inputs/outputs to demonstrate expected behavior.
- **Test triggering**: prompt with phrases that *should* fire the skill and phrases that
  *shouldn't*, and verify both (Exercise 1, Step 2 and the evaluator in this repo automate
  parts of this).
- Review community skills before adopting them — they're instructions your agent will follow.

## See also

- [Customization overview](copilot-customization.md)
- [Custom Agents reference](custom-agents.md)
- [VS Code docs: Agent skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
