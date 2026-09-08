# Custom Agents — Reference

Custom agents define **how Copilot Chat operates for an entire session**: a named persona with
its own instructions, a restricted toolset, and optionally a preferred model. When you select a
custom agent from the chat dropdown, every prompt in that session runs within its rules.

One line to keep the distinction straight: a **skill is knowledge Copilot picks up
automatically; an agent is a persona *you* select.**

This is the concept behind [Exercise 2 — Build an Agent](../exercises/Stage%20One/02-build-an-agent.md).

## File structure

Agents are single Markdown files in `.github/agents/<name>.agent.md`:

```markdown
---
name: code-reviewer
description: Reviews code for bugs, style, and risky patterns — read-only, never edits.
tools: ["read", "search"]
---

# Code Review Instructions

You are a careful code reviewer. Examine the requested files and report:
- Correctness issues and potential bugs
- Risky patterns (unvalidated input, swallowed errors)
- Style inconsistencies

Never modify any file. Present findings as a prioritized list.
```

The Markdown body becomes the agent's system prompt for the session.

## Key frontmatter fields

| Field | Purpose | Notes |
|---|---|---|
| `name` | Identifier shown in the agent dropdown | Should match the filename |
| `description` | What the agent does | Helps users (and orchestrators) pick the right agent |
| `tools` | Tool allowlist for the session | The main safety lever — omit `edit` for read-only agents |
| `model` | Preferred model(s), with fallback order | e.g. `['Claude Opus 4.5', 'GPT-5.2']` |
| `handoffs` | Buttons that transition to another agent | See below |

## Tool restrictions — the main safety lever

The `tools` list is an *allowlist*: anything not on it is unavailable for the whole session.
This is deterministic in a way instructions are not — an agent without `edit` **cannot** edit,
no matter how it's prompted. Typical shapes:

- **Reviewer / planner:** `["read", "search"]` — can analyze, cannot touch files.
- **Doc writer / implementer:** add `"edit"` — can create and update files.
- **Release helper:** add `"execute"`-class tools deliberately, and only if needed.

In [Exercise 3 — Bug Hunt](../exercises/Stage%20One/03-bug-hunt.md) you'll meet a "read-only"
reviewer whose tools list quietly includes `edit` — the fix is one line, and the lesson is to
treat the tools list as the contract, not the prose.

## Handoffs — chaining agents

Handoffs let you build multi-step workflows (plan → implement → review). When the user finishes
with one agent, they see a button that transitions to the next agent with a pre-filled prompt:

```yaml
handoffs:
  - label: Implement Plan
    agent: agent
    prompt: Implement the plan outlined above.
    send: false
```

With `send: true` the prompt auto-submits; with `send: false` the user can review and edit it
first. This repo's CI pipeline applies the same idea non-interactively — see
[Agent orchestration](agent-orchestration.md) for `spec_analyzer` → `risk_reviewer` →
`implementer` chained through GitHub Actions.

## When to use a custom agent

- You need a **named persona** that consistently orchestrates tools for a workflow.
- You want to **restrict tools** to prevent unintended actions.
- You need **multi-step workflows** with handoff transitions between phases.
- You want certain operations to always use a specific, high-capability **model**.

Agents work best as the outermost wrapper around a workflow: combine them with instructions
(standards) and skills (specialized tasks). A reviewer agent will still auto-load your
`gh-issue-creator` skill if the conversation calls for it.

## Agents vs. skills vs. prompt files

| | Custom agent | Skill | Prompt file |
|---|---|---|---|
| Activated by | User selects in dropdown | Description matching | `/command` |
| Scope | Whole session | Single task | Single invocation |
| Controls tools | Yes | No | Yes (overrides the agent's for that request) |
| Controls model | Yes | No | Yes |
| Bundles resources | No | Yes | No |

## Best practices

- Make the `description` specific (what it does *and* what it refuses to do) — vague
  descriptions produce vague behavior and confuse anyone picking from the dropdown.
- Keep the `tools` list minimal; add capabilities only when the persona genuinely needs them.
- Put process in the body: how to start, what to output, what *not* to do.
- Test the negative case: ask a read-only agent to edit something and confirm it can't.
- Let Copilot draft the body — write a one-paragraph persona summary and ask it to expand
  (Exercise 2, Step 3).

## See also

- [Customization overview](copilot-customization.md)
- [Agent Skills reference](skills.md)
- [Agent orchestration in this repo](agent-orchestration.md)
- [VS Code docs: Custom agents](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
