# Exercise 5 — Pitfalls & Tips Quiz 🧠

> **Goal:** a fast-paced recap of the conceptual stuff that doesn't need a repo to teach — token
> optimization, model choice, context window management, and common beginner pitfalls.

Answer each scenario before opening
`answers/Stage One/05-pitfalls-quiz/self-check-answers.md`. Write down the letter you choose and
one sentence explaining why.

## Scenario 1 — Choosing a model

You need to apply the same simple formatting change to 30 Markdown files. Which model should you
try first?

- **A.** The largest reasoning model available.
- **B.** A fast, smaller model that can follow a precise format.
- **C.** Whichever model was selected in your previous unrelated chat.

## Scenario 2 — Stale context

After a long debugging session, you want Copilot to draft an unrelated README. It keeps referring
to the bug and files from the earlier task. What is the best first move?

- **A.** Repeat the README request with more emphasis in the same chat.
- **B.** Paste the entire repository into the same chat for more context.
- **C.** Start a fresh chat and provide only the README task's relevant context.

### Test the stale-context scenario

Use the same model and Ask mode for both runs. Do not attach files manually.

- [ ] In the chat you used for the previous exercises, ask: "Summarize the purpose of Stage One
      in exactly three bullets, using only the Stage One README."
- [ ] Start a new chat and run the exact same prompt.
- [ ] Compare the two responses using this table in a scratch note:

  | Measure | Existing chat | Fresh chat |
  |---|---|---|
  | Approximate response time | | |
  | Followed the three-bullet constraint? | | |
  | Number of referenced files | | |
  | Included irrelevant earlier context? | | |

- [ ] Write one sentence about whether the fresh chat was more focused. Results can vary; the
      useful habit is checking whether old context still helps before carrying it into a new
      task.

## Scenario 3 — Skill triggering

A greeting skill works when you run `/greeting`, but does not load automatically when someone
says "good morning." What should you inspect first?

- **A.** Whether the frontmatter `description` includes realistic greeting phrases and use cases.
- **B.** Whether the instructions contain a longer example response.
- **C.** Whether the agent is using the largest available model.

## Scenario 4 — Agent tool restrictions

A code-review agent should report findings without changing files, but its frontmatter includes
`edit` in the `tools` list. What is the best fix?

- **A.** Keep `edit` and add "please do not edit" to the prompt each time.
- **B.** Remove `edit` from the agent's tools and state the read-only boundary in its description
  and instructions.
- **C.** Move the review process into a skill and leave the agent unchanged.

## Scenario 5 — Skill or agent?

Your team wants Copilot to apply its issue-writing conventions whenever someone asks to create a
GitHub issue. They do not want users to select a special persona first. What should you create?

- **A.** A skill with a description that matches issue-creation requests.
- **B.** A custom agent that every user must select manually.
- **C.** A longer one-off prompt stored in a team document.

When you have committed to all five answers, compare them with the self-check answer key.

---

That's the full beginner/intermediate track. Take a moment to note one habit from these exercises
that you will use in your next Copilot task.
