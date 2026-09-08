# Copilot Customization Overview

A quick reference for the customization mechanisms you'll use in the Stage One exercises.
Each mechanism solves a different problem — knowing *which one to reach for* is most of the
skill.

## The landscape at a glance

| Mechanism | What it's for | How it activates | Where it lives |
|---|---|---|---|
| **Instructions** | Always-on project context and coding standards | Automatic, every request | `.github/copilot-instructions.md` or `*.instructions.md` |
| **Prompt files** | Reusable task templates | On-demand via `/command` | `.github/prompts/*.prompt.md` |
| **Custom agents** | Named personas with specific tools and rules | You select the agent in chat | `.github/agents/*.agent.md` |
| **Agent skills** | Portable specialized capabilities with resources | Auto-loaded when the prompt matches the description | `.github/skills/*/SKILL.md` |
| **MCP servers** | Connections to external systems and APIs | Invoked via tools | `.vscode/mcp.json` |

All of these except MCP configuration are Markdown files with YAML frontmatter, so they can be
committed and shared with your team through version control.

## Picking the right mechanism

| You want to… | Reach for | Why |
|---|---|---|
| Set project-wide standards for every interaction | Instructions | Always-on, zero friction |
| Apply rules only to certain file types | File-targeted instructions (`applyTo` globs) | Precise scoping |
| Run a repeatable workflow on demand | Prompt files | Invocable, shareable, can pin tools/model |
| Define a persona with a restricted toolset | Custom agents | Session-level control over behavior |
| Chain phases together (plan → implement → review) | Custom agents with handoffs | Structured pipelines |
| Package a capability with templates or scripts | Agent skills | Self-contained, auto-activated, portable |
| Talk to external systems (DBs, issue trackers, browsers) | MCP servers | Exposes external tools to the agent |

These layer together: instructions set the baseline, agents wrap the session, skills load
per-task, and MCP extends reach beyond the repo.

## How context is assembled

When you send a chat message, Copilot builds the context window roughly in this order:

1. **Agent selection** — the active agent (built-in or custom) sets the session boundaries:
   available tools and system-level instructions.
2. **Instructions injection** — `copilot-instructions.md`, matching `*.instructions.md` files,
   and user-level instructions are all included.
3. **MCP tools** — every enabled tool's definition is pre-loaded (which is why enabling only
   what you need matters for token budget).
4. **Skill matching** — Copilot scans the pre-loaded skill *descriptions*; if one matches your
   prompt, the full `SKILL.md` body is loaded.
5. **Explicit context** — files, symbols, or terminal output you attached with `#`-mentions.
6. **Prompt file content** — if you triggered a `/command`.
7. **Your message** — added last as the user prompt.

> **Tip:** right-click in the Chat view → **Diagnostics** to see exactly which customization
> files loaded for a request. This is the first thing to check when a skill or agent doesn't
> behave as expected (you'll use it in [Exercise 3 — Bug Hunt](../exercises/Stage%20One/03-bug-hunt.md)).

## Comparison matrix

| | Instructions | Prompt files | Custom agents | Agent skills |
|---|---|---|---|---|
| Activation | Automatic (every request) | On-demand (`/` command) | User selects in chat | Auto-matched by description |
| Scope | Global or file-targeted | Per-invocation | Session-level | Task-level |
| Can bundle scripts/files | No | No | No | Yes (full directory) |
| Specifies tools | No | Yes | Yes | No |
| Specifies model | No | Yes | Yes | No |
| Portable beyond VS Code | No | No | No | Yes (open standard) |

## Deep dives

- [Agent Skills reference](skills.md) — anatomy, progressive disclosure, trigger tuning.
- [Custom Agents reference](custom-agents.md) — frontmatter, tool restrictions, handoffs.
- [Agent orchestration in this repo](agent-orchestration.md) — the CI pipeline that turns
  labeled issues into reviewed PRs.

## Further reading

- [VS Code Copilot customization docs](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [GitHub Copilot docs](https://docs.github.com/en/copilot)
- [Copilot Academy](https://copilot-academy.github.io/) — self-paced workshops and labs,
  including the full Customization Handbook this overview is modeled on
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — community-contributed
  instructions, prompts, agents, and skills
