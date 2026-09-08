# Exercise 0 — Onboarding 🚀

> **Goal:** get your environment ready and take a first tour of Copilot Chat.

## Step 1 — Fork/clone and branch

- [ ] Fork or clone this repo.
- [ ] Create a dedicated branch for your work, e.g.:
  ```
  git checkout -b copilot-exercises
  ```
  Keep all your experiments off `main`/`master`.

## Step 2 — Confirm Copilot is enabled

- [ ] Make sure the GitHub Copilot extension and Copilot Chat are active in your IDE.

## Step 3 — Explore Copilot Chat (Ask mode)

Pick a file or function you don't know well and get curious. Try things like:

- "Explain what this function does, step by step."
- "Where is this used elsewhere in the repo?"
- "Could this be simplified?"
- "Generate a test for this."

### Compare two models

- [ ] Pick one prompt from the list above and run it in a new chat with a fast/small model.
- [ ] Run the **same prompt** in another new chat with a larger reasoning model. Keep the mode,
      attached files, and prompt identical so the model is the only intentional difference.
- [ ] Record this small table in a scratch note:

      | Measure | Fast/small model | Larger model |
      |---|---|---|
      | Approximate response time | | |
      | Correctness (1–5) | | |
      | Followed the requested format (1–5) | | |
      | Useful detail without repetition (1–5) | | |

- [ ] Decide which model was the better fit for this task and write one sentence explaining why.

This is a small observation, not a scientific benchmark. The goal is to make model choice a
deliberate trade-off rather than assuming the largest model is always best.

## Step 4 — Generate `.github/copilot-instructions.md`

This file is a persistent project briefing Copilot loads automatically in every future chat —
so you stop re-explaining your project every session.

- [ ] In Copilot Chat (Agent mode), type `/init` and let Copilot analyse your workspace.
- [ ] Open the generated file, read it, and add at least a sentence of your own — make it a real
      briefing, not a stub.
- [ ] Open a **new** chat session, ask "What is this project?", and confirm
      `copilot-instructions.md` appears in the references list.

## Step 5 — Quick knowledge check

- [ ] Make sure you can explain, in your own words, the difference between Ask mode and Agent
      mode.

---

**Next up:** [Exercise 1 — Build a Skill](01-build-a-skill.md)
