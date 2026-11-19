# Week 11 learner pilot protocol

Week 11 follows the A-012 baseline. The [engineering review](D8_WEEK11_REVIEW.md) records the browser and local release rehearsal. The independent human learner pilot remains pending.


## Purpose

Test whether a student can use Fieldbook instructions to make the **existing** Week 10 app more reliable, not whether they can memorize quiz answer keys. This is a **future execution plan**. No pilot results have been observed or claimed.

## Pilot prerequisite and scope

- Enter only after Week 10 mandatory authentication and two-account authorization outcomes are demonstrated.
- Require local Node, npm, a safe learning PostgreSQL instance, fictional accounts and privacy-reviewed test evidence.
- Use Week 11 private `student-starter/`, not instructor `reference-solution/`.
- Core evaluation includes all 11 quiz gates, two synthetic safe-JS browser checks and 11 self-verified real local activities. Public hosting is optional.

## Observe in the pilot

1. Can the learner correctly identify whether each red test is a code problem, environment issue or a wrong assertion?
2. Do they stop before running destructive DB tests when `_test` target is uncertain?
3. Can they correlate browser status/request ID with sanitized server log without copying cookies/secrets?
4. Do they produce a truthful report when unit tests pass but HTTP/DB tests cannot run?
5. Can they explain why a 503 is not an empty task list and why failed POST does not update confirmed state?
6. Can they demonstrate liveness and readiness differences using fake failure injection?
7. Does a built single-origin preview correctly handle refresh `/tasks` and unknown `/api/*` JSON errors?
8. Can they describe correct cookies/origin/proxy assumptions without claiming a local HTTP test proves HTTPS?
9. Are the quiz essential questions fair and genuinely aligned to lessons?
10. Is the final release report useful, appropriately cautious and free of private values?

## Stop conditions

- Student points at a real/shared DB for destructive test -> stop, switch to safe fake/db setup.
- Student exposes real secrets in screenshot, note or AI prompt -> stop, remove/redact; rotate if real credentials were exposed.
- Instructor/reference solution leaks into built course assets -> stop release.
- Code runner requests network access or has origin/storage access beyond sandbox -> stop technical pilot until secure isolation is restored.

## Evidence to collect (privacy-safe)

- Lesson IDs, whether a checkpoint was genuinely auto-passed or self-verified, count of attempts, time-on-task ranges, anonymous misconception notes and reason for help requests.
- Learner-owned release report with command names, redacted result summaries, what was skipped, and a fictional Alice/Bob isolation summary.
- No raw server logs, tokens, private URLs, credentials, `.env`, password hashes or session values.

## Pilot acceptance and disposition

- [ ] Learner navigates all 11 required lessons in prerequisite order and never bypasses mandatory checks by scrolling.
- [ ] Two browser JS tasks pass isolated deterministic cases.
- [ ] Local-project tasks are labeled self-verified, including skipped/not-run distinction.
- [ ] The 80%-plus-essential quiz rule and unlimited retries work as specified.
- [ ] On a faulty full-stack run, the learner can locate the boundary and recover with usable hints.
- [ ] Core completion does not demand internet hosting, AI account, paid service or live deployment.
- [ ] Week 12 unlock only when required checks and Week 11 readiness gate satisfy approved rules.

**Human pilot status: pending.** Record participant observations and remaining blockers here when the pilot runs.
