# Showcase — Copilot Chronicle (`/chronicle`)

A short demo (10–15 min) of GitHub Copilot's session-history features. The point to land:
**your Copilot sessions are data you can query and learn from** — not throwaway chat logs.

Generally available since 2 June 2026.

## What Chronicle actually is

Every Copilot chat session is recorded locally: prompts, responses, tools used, and files
modified.

| Where | What |
|---|---|
| `~/.copilot/session-state/` | Individual session records |
| `~/.copilot/session-store.db` | Local SQLite index that `/chronicle` queries |
| GitHub account (sync) | Optional cloud sync, so sessions from CLI, VS Code, JetBrains, cloud agent, code review and the Copilot app land in one view (Agents tab on github.com) |

Session data is **user-scoped** — only you can query it. Admins control *whether* syncing is
available via the "Store local sessions in the Cloud" policy, but enabling that policy does not
give them access to your sessions.

## Where to get started

1. **Have real history first.** Chronicle is only interesting with a few days of actual sessions
   behind it — it reads your history, it doesn't invent one. Do the demo on your own machine
   after a normal working week, *not* on a fresh clone.
2. **Open Copilot CLI** in this repo (the CLI is where all subcommands exist; other surfaces
   expose a subset).
3. **Run `/chronicle reindex` once** before you present, so the local store is current and
   synced.
4. **Run `/chronicle` with no arguments** — you get an interactive picker. Good opening slide:
   it shows the whole surface area in one screen without you reading a list aloud.

## What to show — four beats

Pick these in order; each one is a different *kind* of value.

### 1. `/chronicle standup` — "what did I do?"

```
/chronicle standup
/chronicle standup for the last 3 days
```

Generates a standup report from recent work. Defaults to 24 hours; the timeframe is just natural
language. This is the beat that gets the room's attention because everyone writes this by hand
every morning.

### 2. `/chronicle search <topic>` — "where did I do it?"

```
/chronicle search authentication
```

Direct keyword search across session history. Frame it as the answer to *"I solved this two
weeks ago in some chat, where was it?"* Note that it is content search, not semantic matching —
so demo it with a term you know appears verbatim.

### 3. `/chronicle tips` and `/chronicle cost tips` — "how do I do it better?"

```
/chronicle tips
/chronicle tips for better prompting
/chronicle cost tips
```

`tips` returns 3–5 recommendations grounded in your real usage patterns. `cost tips` looks at
token spend — prompt length, how often you call tools — and suggests reductions.

This is the strongest beat for a workshop audience: it turns "prompt better" from generic advice
into feedback on *their* habits. Read one recommendation out loud and say whether you agree —
the honesty sells it more than a clean result would.

### 4. `/chronicle improve` — "bake it back into the repo"

```
/chronicle improve
```

Analyses friction signals in the current repo and proposes additions to
`.github/copilot-instructions.md`, letting you pick which recommendations to accept.

This closes the loop and ties directly into the rest of this workshop: Chronicle observes where
Copilot kept getting things wrong, and the fix lands in the same instructions file the
[customization overview](./copilot-customization.md) covers. Show the proposed diff, accept one
item, reject one — the selection step is part of the story.

## Also worth a mention (30 seconds each)

- **`/share gist`** — share a view-only copy of a single session. Useful for "look at what this
  agent did" without granting repo or account access.
- **Natural-language questions.** You don't have to use subcommands; you can just ask Copilot
  about your past work and it searches the session store.

## Say this out loud

Enterprise audiences will ask about privacy before they ask about features, so get ahead of it:

- Sessions are **private by default** and user-scoped.
- Cloud sync is optional — set `"remoteExport": false` in the CLI settings JSON to keep
  everything local.
- On Copilot Business/Enterprise, syncing needs an admin to enable the "Store local sessions in
  the Cloud" policy first. Worth checking before the session, or the sync half of the demo will
  simply not work.

## Demo hygiene

- **Your history is on screen.** Skim `/chronicle search` results and `standup` output beforehand
  for client names, credentials, or anything from another customer's repo.
- **Have a screen recording as backup.** These commands hit live session data and take a moment
  to think.
- **Don't script the output.** Chronicle reads whatever you actually did; a pre-written expected
  result will just be wrong on the day.

## Suggested slot

Best placed **after** the instructions/skills/agents material rather than as an intro — beats 3
and 4 only make sense once the audience knows what `copilot-instructions.md` is for. Slots
naturally next to [Exercise 5 — Pitfalls & Tips](../exercises/Stage%20One/05-pitfalls-quiz.md),
which already covers token optimization by hand; Chronicle is the automated version of that
exercise.
