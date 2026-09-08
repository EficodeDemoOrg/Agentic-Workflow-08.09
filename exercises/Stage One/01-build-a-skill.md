# Exercise 1 — Build a Skill 🧩

> **Goal:** learn how Copilot skills work by building three of your own, then test one against
> realistic trigger phrases.

## What's a skill?

A skill is a folder of instructions Copilot can load automatically when it decides it's
relevant to your request. Each skill lives in `.github/skills/<skill-name>/SKILL.md` and starts
with YAML frontmatter containing `name` and `description`. The `name` must match the folder name.
Copilot uses the `description` to decide when to load the skill, while a **"When to use"** section
in the body can reinforce those trigger boundaries for anyone maintaining it. Keep both narrow
for explicit, controlled invocation or broaden them for automatic, implicit invocation.

> 📚 Want the full picture first — file anatomy, progressive disclosure, trigger tuning? See the
> [Skills reference](../../docs/skills.md) and the
> [Customization overview](../../docs/copilot-customization.md).

## Step 1 — An explicit skill: `hello-ascii`

- [ ] Create `.github/skills/hello-ascii/SKILL.md` with:
  - YAML frontmatter with `name: hello-ascii` and a narrow `description` containing the trigger.
  - A title.
  - A `## When to use` section naming one explicit trigger phrase, e.g. *"show hello in ASCII
    art"*.
  - A `## Instructions` section telling Copilot to reply with ASCII art.
- [ ] Test it: open Copilot Chat (Agent mode) and type exactly that phrase. Confirm it responds
      with your ASCII art.

## Step 2 — An implicit skill: `greeting`

- [ ] Create `.github/skills/greeting/SKILL.md` with `name: greeting` and a broad `description`
      in its YAML frontmatter. Include at least **4** varied greeting phrases (e.g. "hello",
      "hi", "good morning", a greeting in another language) in both the description and a
      `## When to use` section, plus a `## Instructions` section for a friendly response.
- [ ] Test it: open a **new** chat session and just say "Hi" — no explicit mention of the skill.
      Confirm Copilot picks it up automatically.
- [ ] Compare: temporarily narrow the `greeting` skill's frontmatter `description` and try the
      same greeting — notice how the *breadth of the description*, not the instructions, is what
      makes a skill fire implicitly. Restore the broad description afterward.

> **Heads-up:** the repo ships with an intentionally broken `broken-greeting` skill used in
> Exercise 3. Your new `greeting` skill overlaps with it on purpose — in the Bug Hunt you'll
> temporarily disable yours so the broken one's failure is observable, and in Exercise 4 you'll
> compare the two directly.

## Step 3 — A real one: `gh-issue-creator`

This is where skills earn their keep — encoding a real team workflow.

- [ ] Create a skill (e.g. `.github/skills/gh-issue-creator/SKILL.md`) that teaches Copilot to
      create GitHub issues via `gh issue create`, using **different templates for different
      issue types** (e.g. a bug report vs. a feature request). Give it matching `name` and
      `description` fields in YAML frontmatter.
- [ ] Start basic — get one template working end to end.
- [ ] Check you can invoke it: ask Copilot to file a bug report and confirm it uses the right
      template/labels.
- [ ] Improve it — add the second template, tighten the "When to use" section.

Stage Two turns observations like these into programmatic and agentic evaluation checks. Here,
the goal is simply to learn how description wording affects skill discovery.

---

**Next up:** [Exercise 2 — Build an Agent](02-build-an-agent.md)
