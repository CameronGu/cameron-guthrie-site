---
description: Codex assistant operational guidelines and workflows for reliable solo development
alwaysApply: true
---

# Codex Agent Guidelines

## 1. Context & Scoping
- **Establish scope** before acting. Read task, inspect files, and identify affected areas.
- **Gather evidence** by reading source material; avoid speculation or fabrication.
- **Ask focused clarifying questions** only if essential context is missing.
- **Reference files precisely** (`src/module/file.py:42`) to anchor decisions.

## 2. Command Discipline
- Run commands through `bash -lc` and always set `workdir`.
- Use fast, read-only tools first (`rg`, `ls`, `cat`); avoid `cd` unless required.
- Confirm destructive or network commands before execution.
- Double-check file paths and intent before editing or deleting.

## 3. Planning & Execution
- **Plan explicitly** for multi-step or cross-file tasks. Keep one step marked “in progress.”
- Skip planning only for single, trivial actions.
- Automate edits directly rather than giving manual step lists when possible.
- Keep edits incremental and re-evaluate context frequently to avoid regressions.
- Mirror existing naming, patterns, and architecture to maintain consistency.

## 4. Git Workflow Alignment
- Work on `feature/*` branches for multi-commit tasks. Rebase before merging.
- Use `main` for stable, deployable code. Tag semantic versions (`vX.Y.Z`) after validation.
- Format commits as `type: summary` (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`).
- Group related changes; avoid mixed-purpose commits.
- Keep working tree clean before requesting Codex actions to minimize noise.

## 5. Task Triage & Implementation
- Confirm the end goal, constraints, and delivery preferences before touching code.
- Inspect relevant files and recent changes. Note sandbox limits or missing capabilities.
- Surface assumptions and decisions explicitly.
- Preserve user work outside scope; never revert unrelated edits.
- Apply local patterns; don’t impose arbitrary style changes mid-task.

## 6. Validation & Testing
- Run narrow, relevant tests or linters; summarize output concisely.
- Explain skipped checks and how to run them locally if sandboxed.
- Re-run affected suites after refactors or risky edits.
- Capture key test or repro steps in commits or branch descriptions.

## 7. Communication & Finalization
- **Lead with outcome.** Keep responses terse and precise.
- Use inline file references; avoid vague language.
- Note verification performed and remaining risks or manual steps.
- Suggest logical next actions when they add value (e.g., run `pytest`, open PR).

## 8. Rule Authoring & Maintenance
- **Rule format:** concise description block, globs if needed, ASCII-only markdown, bullet lists.
- Provide real code examples with ✅ preferred and ❌ anti-patterns when useful.
- Keep rules DRY by cross-referencing related files.
- Revise or remove rules when workflows or tooling evolve.
- Review rules after major refactors, dependency changes, or process shifts.

## 9. Continuous Improvement Signals
- Repeated friction or defects in Codex sessions.
- New patterns appearing across files.
- Recurring review feedback that rules could prevent.
- Tooling or workflow changes that need reinforcement.
- Platform capability changes affecting task execution.

## 10. Anti-Patterns
- Editing blindly without context gathering.
- Handing off manual instructions for changes Codex can automate.
- Skipping validation or failing to disclose unverified states.
- Verbose, unfocused outputs.
- Force-pushing shared branches without coordination.
- Ignoring repository conventions in favor of personal style.

