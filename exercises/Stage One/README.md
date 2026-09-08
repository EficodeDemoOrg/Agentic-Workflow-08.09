# 👋 Welcome — GitHub Copilot Fundamentals Workshop

This is your starting point. If you haven't run anything yet, start here — it explains what
this stage is about, what to expect, and how to get around.

## What this stage is about

This workshop is a hands-on tour of GitHub Copilot built around one idea: **you learn Copilot by
using it on real, small tasks in your own repo**, not by watching a slideshow. By the end you'll
have:

- A working feature overview of Copilot Chat (Ask vs. Agent mode, `/init`, model choice).
- Built your own **skills** (both an explicit, narrowly-triggered one and a broadly-triggered
  implicit one) and your own **agents**.
- Seen a **broken** agent/skill up close, diagnosed why it doesn't work, and fixed it.
- Run a controlled **manual comparison** and connected configuration choices to observable
  behavior.
- A short list of general pitfalls, token-optimization habits, and model/context-window tips you
  can reuse immediately after this session.

## What to expect

- **Self-paced.** Nobody is waiting on you and you're not waiting on anyone else. Go as fast or
  slow as you like, skip around, come back later.
- **Hands-on.** You'll be editing real files in your own fork/clone — creating skill and agent
  files, fixing intentionally broken ones, writing short notes.

## How to navigate

1. **Fork or clone this repo**, and create your own working branch (don't work on `main`) —
   covered in Exercise 0 below.
2. **Work through the exercises below, in order** (0 → 5) — each one builds a little on the
   last, though nothing stops you from jumping ahead if you're comfortable.
3. For each step: read the instructions in the exercise file and do the thing in your own
   repo/IDE.
4. **Keep the reference docs handy** — when an exercise mentions a concept you want more depth
   on, check the [Customization overview](../../docs/copilot-customization.md), the
   [Skills reference](../../docs/skills.md), and the [Agents reference](../../docs/custom-agents.md).

## The exercises

| # | Exercise | What you'll do |
|---|----------|-----------------|
| 0 | [Onboarding](00-welcome-and-setup.md) | Fork/branch your repo, try Ask vs. Agent mode, compare two models, and generate `.github/copilot-instructions.md` with `/init`. |
| 1 | [Build a Skill](01-build-a-skill.md) | Build three skills, then manually test one against expected and unexpected trigger phrases. |
| 2 | [Build an Agent](02-build-an-agent.md) | Build a code-reviewer agent, a doc-writer agent, and one of your own design. |
| 3 | [Bug Hunt](03-bug-hunt.md) | Diagnose and fix intentionally broken customizations in `.github/agents/` and `.github/skills/`. |
| 4 | [Eval Arena](04-eval-arena.md) | Run a controlled manual comparison and connect configuration choices to observable behavior. |
| 5 | [Pitfalls & Tips Quiz](05-pitfalls-quiz.md) | Compare a busy chat with a fresh one, then recap token optimization, context windows, and common gotchas. |

**Next up:** [Exercise 0 — Onboarding](00-welcome-and-setup.md) →
