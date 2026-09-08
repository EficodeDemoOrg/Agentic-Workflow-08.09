# Exercise 3 — Bug Hunt 🐛

> **Goal:** get hands-on practice diagnosing and fixing broken agents/skills — the pitfalls you
> just avoided in Exercises 1–2 are baked into these on purpose.

Two intentionally broken files are waiting for you:

- `.github/agents/broken-reviewer.agent.md`
- `.github/skills/broken-greeting/SKILL.md`

> **See the current state first.** The [Evaluation Status badge in the README](../../README.md#evaluation-status)
> reflects the latest scores for every agent and skill in this repo. Note where the broken
> reviewer and broken greeting sit today — that's your baseline to improve. The badge is refreshed
> by the [Evaluate Agents & Skills](../../.github/workflows/evaluate.yml) workflow, which you'll run
> yourself at the end of this exercise.

## Step 1 — See it fail

- [ ] **First, disable your own `greeting` skill from Exercise 1** — otherwise it will answer
      your "hi" and mask the broken skill's failure. Rename the folder (e.g.
      `.github/skills/greeting` → `.github/skills/greeting.disabled`) and start a fresh chat so
      the change takes effect. You'll restore it at the end of this exercise.
- [ ] Select the broken reviewer agent from the agent dropdown (or ask Copilot to load
      `.github/agents/broken-reviewer.agent.md`) and give it a real review task. Notice something's off
      — set your expectations first ("I expect a read-only review, focused on code quality") and
      compare that to what actually happens.
- [ ] Separately, open a new chat and just say "hi" — notice the broken greeting skill either
      doesn't trigger at all, or responds unhelpfully when directly invoked.

## Step 2 — Capture the baseline

Before changing either file, save evidence that you can compare after the fix.

- [ ] Create `notes/bug-hunt-baseline.md` and record the model you are using.
- [ ] With the broken reviewer selected, run this exact prompt and paste the response into your
      note: "Review `.github/hooks/scripts/block-dangerous-commands.sh` for correctness and
      maintainability. Do not modify files."
- [ ] In a separate new chat using the same model, run the exact prompt "Hi" and paste the
      response into your note.
- [ ] For each result, record whether the expected customization appeared in the response's
      references, what went wrong, and any tools the agent used.

Keep these prompts unchanged when you retest. That makes the before-and-after comparison about
your customization changes rather than a different prompt or model.

## Step 3 — Troubleshoot

- [ ] In each chat where you captured a failure, switch from the custom reviewer back to the
      default Agent mode. Keep the existing chat open so its earlier behavior remains available
      for investigation.
- [ ] Run: `/troubleshoot explain why the customization did not behave as I expected; base the
      answer on evidence from this chat's debug log`.
- [ ] Check whether the evidence confirms that the expected customization loaded, which tools
      were available, and whether the problem came from configuration or model behavior. Add
      those findings to `notes/bug-hunt-baseline.md`.
- [ ] Compare the evidence with the files themselves. Look closely at:
  - The agent's `tools` list — does it allow more than it should?
  - The agent's `description` — is it specific enough to be selected/understood confidently?
  - The skill's frontmatter `description` and `## When to use` section — are they too narrow to
    trigger implicitly?
  - The skill's `## Instructions` — is there enough substance to act on?
- [ ] For a second opinion grounded in the same rubric the badge uses, load the `evaluator` agent
      (`.github/agents/evaluator.agent.md`) and ask it to evaluate the two broken files. Compare its
      scores and reasoning with your own findings before you start editing.

## Step 4 — Fix and retest

- [ ] Edit `.github/agents/broken-reviewer.agent.md` directly: fix the description so it clearly
      describes code review, and remove `edit`/`write` from its `tools` list so it's genuinely
      read-only.
- [ ] Edit `.github/skills/broken-greeting/SKILL.md` directly: broaden its frontmatter
      `description` and `## When to use` section to at least 4 varied greeting phrases, and flesh
      out `## Instructions` with real guidance.
- [ ] Re-test both in Copilot Chat and confirm the behavior now matches your original
      expectations. Keep your Exercise 1 `greeting` skill disabled while retesting so you're
      measuring the fixed `broken-greeting`, not your own skill.
- [ ] Restore your Exercise 1 `greeting` skill (rename the folder back). Both greeting skills
      now coexist — Exercise 4 compares them directly.
- [ ] Optionally re-run the `evaluator` agent on both fixed files to confirm the scores improved
      before you publish.

## Step 5 — Publish and update the state

Your manual tests prove the fix locally; now update the shared state so the badge reflects it.

- [ ] Commit your edits to the two files on the `main` branch and push to the repository:

  ```bash
  git add .github/agents/broken-reviewer.agent.md .github/skills/broken-greeting/SKILL.md
  git commit -m "fix: repair broken reviewer agent and greeting skill"
  git push origin main
  ```

- [ ] Trigger the **Evaluate Agents & Skills** workflow to re-score everything and refresh the badge.
      Either use the CLI:

  ```bash
  gh workflow run evaluate.yml --ref main
  ```

  or open the **Actions** tab on GitHub, select **Evaluate Agents & Skills**, and click **Run workflow**.
- [ ] Watch the run finish (`gh run watch` or the Actions tab). When it completes, the workflow
      commits an updated `eval-badge.svg`.
- [ ] Refresh the [Evaluation Status badge in the README](../../README.md#evaluation-status) and
      confirm the scores for the reviewer and greeting improved compared to the baseline you noted
      in Step 1.

---

**Next up:** [Exercise 4 — Eval Arena](04-eval-arena.md)
