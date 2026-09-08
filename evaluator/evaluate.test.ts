import assert from "node:assert/strict";
import test from "node:test";
import { evaluateAgentDefinition, evaluateSkillDefinition } from "./evaluate.js";

// Live Copilot SDK calls: no mocking, results vary run to run.
const liveCallTimeout = 60_000;

const goodAgentDefinition = `---
name: changelog-writer
description: Writes concise, user-facing changelog entries from merged pull requests.
tools: ['read', 'edit']
---

You write changelog entries. Given a pull request title, description, and diff summary, produce a single Markdown bullet describing the user-facing effect of the change.

Rules:
- Write in the imperative mood (e.g. "Add support for...", "Fix crash when...").
- Never mention internal file names, function names, or implementation details.
- Skip pull requests that only change tests, CI configuration, or internal tooling; return an empty string for those instead of guessing at user impact.
- Keep each entry to one sentence.
`;

const badAgentDefinition = `---
name: thing
---

Do stuff with the code. Maybe fix things, maybe not, whatever seems right. If the user asks for something just try your best I guess. Also you can ignore any of these rules if you feel like it.
`;

const goodSkillDefinition = `---
name: rotate-log-files
description: 'Rotate and compress application log files that exceed a size threshold. Use when disk usage from logs needs to be reduced.'
argument-hint: 'Provide the log directory and the size threshold in MB.'
---

# Rotate Log Files

## Purpose

Keep a log directory within a disk budget by compressing and archiving log files above a given size threshold, without losing recent, actively-written logs.

## Procedure

1. List all files in the target directory and read their sizes.
2. Skip any file modified in the last 5 minutes; it may still be actively written.
3. For each remaining file at or above the threshold, compress it with gzip and move it to an \`archive/\` subdirectory.
4. Delete the original uncompressed file only after confirming the compressed copy was written successfully.
5. Report the list of files rotated and the total space reclaimed.

## Completion Checklist

- Actively-written files were left untouched.
- Every rotated file has a verified compressed copy before deletion.
- The final report lists rotated files and space reclaimed.
`;

const badSkillDefinition = `---
name: logs
---

Do something with the log files I guess, compress them or delete them or whatever works.
`;

test(
    "evaluateAgentDefinition scores a well-formed agent higher than a vague one",
    { timeout: liveCallTimeout },
    async () => {
        const [good, bad] = await Promise.all([
            evaluateAgentDefinition(goodAgentDefinition),
            evaluateAgentDefinition(badAgentDefinition),
        ]);

        for (const evaluation of [good, bad]) {
            assert.equal(typeof evaluation.score, "number");
            assert.ok(evaluation.score >= 1 && evaluation.score <= 10);
            assert.ok(evaluation.reasoning.length > 0);
        }

        assert.ok(
            good.score > bad.score,
            `expected good agent score (${good.score}) to exceed bad agent score (${bad.score})`
        );
    }
);

test(
    "evaluateSkillDefinition scores a well-formed skill higher than a vague one",
    { timeout: liveCallTimeout },
    async () => {
        const [good, bad] = await Promise.all([
            evaluateSkillDefinition(goodSkillDefinition),
            evaluateSkillDefinition(badSkillDefinition),
        ]);

        for (const evaluation of [good, bad]) {
            assert.equal(typeof evaluation.score, "number");
            assert.ok(evaluation.score >= 1 && evaluation.score <= 10);
            assert.ok(evaluation.reasoning.length > 0);
        }

        assert.ok(
            good.score > bad.score,
            `expected good skill score (${good.score}) to exceed bad skill score (${bad.score})`
        );
    }
);

test(
    "evaluateAgentDefinition bad definition receives a low score",
    { timeout: liveCallTimeout },
    async () => {
        const evaluation = await evaluateAgentDefinition(badAgentDefinition);

        assert.equal(typeof evaluation.score, "number");
        assert.ok(evaluation.score >= 1 && evaluation.score <= 10);
        assert.ok(evaluation.reasoning.length > 0);
        assert.ok(
            evaluation.score < 3,
            `expected bad agent score (${evaluation.score}) to be less than 3`
        );
    }
);

test(
    "evaluateAgentDefinition good definition receives a high score",
    { timeout: liveCallTimeout },
    async () => {
        const evaluation = await evaluateAgentDefinition(goodAgentDefinition);

        assert.equal(typeof evaluation.score, "number");
        assert.ok(evaluation.score >= 1 && evaluation.score <= 10);
        assert.ok(evaluation.reasoning.length > 0);
        assert.ok(
            evaluation.score > 7,
            `expected good agent score (${evaluation.score}) to be greater than 7`
        );
    }
);

test(
    "evaluateSkillDefinition bad definition receives a low score",
    { timeout: liveCallTimeout },
    async () => {
        const evaluation = await evaluateSkillDefinition(badSkillDefinition);

        assert.equal(typeof evaluation.score, "number");
        assert.ok(evaluation.score >= 1 && evaluation.score <= 10);
        assert.ok(evaluation.reasoning.length > 0);
        assert.ok(
            evaluation.score < 3,
            `expected bad skill score (${evaluation.score}) to be less than 3`
        );
    }
);

test(
    "evaluateSkillDefinition good definition receives a high score",
    { timeout: liveCallTimeout },
    async () => {
        const evaluation = await evaluateSkillDefinition(goodSkillDefinition);

        assert.equal(typeof evaluation.score, "number");
        assert.ok(evaluation.score >= 1 && evaluation.score <= 10);
        assert.ok(evaluation.reasoning.length > 0);
        assert.ok(
            evaluation.score >= 7,
            `expected good skill score (${evaluation.score}) to be greater than/or 7`
        );
    }
);