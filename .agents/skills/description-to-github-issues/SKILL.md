---
name: description-to-github-issues
description: 'Turn a project DESCRIPTION.md, FUNCTIONAL_REQUIREMENTS.md, and TECHNICAL_REQUIREMENTS.md into an actionable implementation plan and GitHub issues. Use when requirements need to be decomposed, prioritized, and tracked in GitHub.'
argument-hint: 'Provide the paths to the project description and functional requirements files.'
user-invocable: true
disable-model-invocation: false
---

# Description To GitHub Issues

## Purpose

Convert a project's narrative description and functional requirements into a small, coherent backlog of GitHub issues. Each issue must be implementable, testable, and traceable to the source documents.

## Inputs

Use the paths supplied by the user. When no paths are supplied, default to:

- `src/DESCRIPTION.md`
- `src/FUNCTIONAL_REQUIREMENTS.md`
- `src/TECHNICAL_REQUIREMENTS.md`

Read both files before making the plan. Preserve the source documents' meaning. Do not fill gaps with invented product behavior; represent important missing decisions as a discovery or clarification issue.

## Procedure

1. Read the three input Markdown files and extract:
   - product goals, actors, workflows, and domain nouns from the description;
   - explicit technical, quality, runtime, and hosting constraints from the functional requirements;
   - explicit technical, quality, runtime, and hosting constraints from the technical requirements;
   - incomplete statements, contradictions, and dependencies that need decisions.
2. Inspect the repository briefly to identify the existing stack, test runner, browser entry point, and contribution conventions. Reuse those conventions in issue text. Do not modify application code during this workflow.
3. Build an implementation plan in dependency order. Split work at a size that one contributor can complete in one focused change. Keep the number of issues small: combine tightly coupled tasks and avoid creating an issue for every sentence.
4. For every planned issue, define:
   - a concise imperative title;
   - the user or engineering outcome;
   - scope and concrete implementation tasks;
   - acceptance criteria written as observable checks;
   - tests or verification steps;
   - source traceability, quoting the relevant requirement in paraphrase or with a short excerpt;
   - dependencies and risks, when applicable.
5. Make the plan cover all explicit requirements. For this repository, that means ensuring the resulting backlog addresses TypeScript, automated tests, no cloud-resource dependency, and browser execution. Treat the incomplete McSquishy description as an explicit product-definition gap rather than silently guessing its ending.
6. Before creating anything, inspect existing GitHub issues and labels to avoid duplicates. Use the repository's `origin` remote to determine the owner and repository. If the remote is unavailable or ambiguous, ask for the target repository.
7. Confirm GitHub authentication with `gh auth status`. If authentication is missing, present the proposed issue plan and stop with the exact command the user can run: `gh auth login`.
8. Present the proposed issue titles, dependency order, and any clarification issues for review when the user has not explicitly authorized immediate creation. If immediate creation is authorized, continue to step 9.
9. Create each approved issue with `gh issue create --repo OWNER/REPO --title TITLE --body-file FILE`. Use labels only when they already exist, unless the user explicitly asks to create labels. Do not put secrets in issue bodies or command arguments.
10. After creation, verify each issue with `gh issue view NUMBER --repo OWNER/REPO` and report the issue number, URL, title, and any skipped duplicate. If an issue fails, do not claim it was created; report the error and continue only when doing so cannot create misleading dependency links.

## Planning Rules

- Prefer vertical slices that leave a demonstrable result over broad architecture-only issues.
- Put foundational setup and product decisions before implementation issues that depend on them.
- Make acceptance criteria specific enough for a reviewer to verify without interpreting the original request.
- Include local commands and browser checks where the repository provides them.
- For browser work, require a local run path and a test that does not call cloud services.
- For TypeScript work, require compilation/type checking and keep new code covered by focused tests.
- For unspecified game mechanics, visuals, controls, scoring, or win/loss behavior, create a clearly named decision issue and mark dependent implementation issues as blocked by it.
- Do not create duplicate issues when an existing issue already covers the same outcome. Mention the existing issue in the final report.
- Do not close, edit, label, assign, or comment on unrelated issues.

## Completion Checklist

- Both source files were read.
- Every explicit functional requirement maps to at least one issue acceptance criterion.
- Missing product decisions are visible as clarification issues.
- Issue order and dependencies are stated.
- Existing issues were checked for duplicates.
- GitHub authentication and target repository were verified.
- Each created issue was read back successfully, or its failure was reported accurately.
- The final report distinguishes proposed, created, skipped, and failed issues.
