# Exercise 2 — Build an Agent 🤖

> **Goal:** understand agents as personas (as opposed to skills, which are knowledge), and build
> three of your own.

## Skills vs. agents, in one line

A **skill** is knowledge Copilot picks up automatically. An **agent** is a persona *you*
manually select, with its own tone, focus, and restricted toolset. Agents live as single
Markdown files with YAML frontmatter in `.github/agents/<name>.agent.md`.

> 📚 For frontmatter fields, tool restrictions, and handoffs in depth, see the
> [Agents reference](../../docs/custom-agents.md).

## Step 1 — A doc writer with edit access

- [ ] Create `.github/agents/doc-writer.agent.md` — its `tools` list must include
      `"edit"`, and the description/body should focus on documentation, not code logic.
- [ ] Select it and ask it to document a function or module. Confirm it *can* create/update
      files this time.

## Step 2 — BONUS: design your own

- [ ] Create any additional `.github/agents/<your-agent>.agent.md` with valid `name`, `description`
      (15+ characters), and a non-empty `tools` list. Ideas: a security reviewer, a migration
      assistant, a test generator, a release-notes writer.
- [ ] Ask Copilot to expand a one-paragraph summary into full agent instructions for you — you
      don't have to write the polished prompt yourself.
- [ ] Test it from the agent dropdown.

---

**Next up:** [Exercise 3 — Bug Hunt](03-bug-hunt.md)
