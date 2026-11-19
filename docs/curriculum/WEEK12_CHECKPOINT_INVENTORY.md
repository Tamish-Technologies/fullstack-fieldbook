# Week 12 Checkpoint Inventory — Owner-Approved Structure A-013

> **CURRENT AUTHORITATIVE PLANNING STATUS — 2026-11-17:** All 12 weekly educational BLUEPRINT STRUCTURES have owner approval (Week 12 = **A-013**). The D0 **cross-week audit is prepared**, but the owner has **not yet signed off D0**. All learner-ready content, question banks, code runners and pilots remain future work. D1 visual approval and explicit D2 coding authorization are also pending. Historical status notices in this document describe prior snapshots and are superseded by `docs/product/D0_OWNER_SIGNOFF.md` and `docs/product/D0_APPROVAL_LOG.md`.


> **Owner structurally approved A-013 (2026-11-17).** Week 11 A-012 approved as structure only. No actual student-facing questions, sandbox runs, capstone project executions, code builds or independent oral evaluations have been conducted in creating these planning documents. All local results are learner-attested; app coding is **NOT AUTHORIZED**.

**Totals:** 27 checkpoint IDs = **24 required** (11 quiz sets / 66 intended scored items, two isolated synthetic pure-JS coding exercises, 11 local self-verifications), **three optional**. Each required six-item quiz passes at ≥5/6 **and all final-designated essential questions**. The final Week 12 quiz is the readiness check; local L11 completion includes the required capstone project gate. No additional phantom “Week 13” unlock.

## 1. Complete register

| Stable checkpoint ID | DEC-21 method | Gate | Proposed evidence and acceptance criteria |
|---|---|---|---|
| `p1-w12-l01-c01` | `quiz-auto` | Required | Six reviewed capstone mission, baseline and acceptance evidence questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l01-c02` | `local-project-self-verified` | Required | From the supplied Week 12 student starter: start or otherwise inspect Week 11 baseline safely, run available pure baseline tests, record actual commands/outputs and Git commit in EVIDENCE_LOG. Note expected capstone TODO failures separately; use fictional accounts and avoid secrets. |
| `p1-w12-l02-c01` | `quiz-auto` | Required | Six reviewed trace a request, create a safe git branch and log ai use questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l02-c02` | `local-project-self-verified` | Required | Create and check a branch without touching an existing production database. Save a sanitized request trace, initial commit ID, and one reviewed AI-assisted plan in AI_WORK_LOG; no network session IDs or credentials. |
| `p1-w12-l02-c03` | `optional-enrichment` | Optional | Compare two bounded AI prompts for usefulness. This is optional and must not force sign-in to an AI service.; never gating. |
| `p1-w12-l03-c01` | `quiz-auto` | Required | Six reviewed write user stories, scope a vertical slice and order the work questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l03-c02` | `local-project-self-verified` | Required | Produce CAPSTONE_BRIEF and a reviewable task list; self-check every requirement against the original A01–A10 contract. Record any blocked acceptance criterion explicitly. |
| `p1-w12-l04-c01` | `quiz-auto` | Required | Six reviewed additive postgresql migration and date-only semantics questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l04-c02` | `local-project-self-verified` | Required | Safely apply an additive migration to a local development DB and verify existing rows and owner IDs remain intact. Separately confirm a disposable `_test` database before any destructive suite; never run destructive SQL if uncertain. |
| `p1-w12-l05-c01` | `quiz-auto` | Required | Six reviewed define the api contract and validate create/patch inputs questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l05-c02` | `browser-code-auto` | Required | Implement a pure `isValidDateOnly(value)` function for synthetic inputs. Mandatory checks include leap-day 2028-02-29 true; 2027-02-29 false; 2026-02-30 false; 2026-13-01 false; 2026-2-5 false; non-string false; no Date-to-local conversion, no network/Node imports. All mandatory synthetic behavior checks must pass; no user secrets. |
| `p1-w12-l05-c03` | `local-project-self-verified` | Required | Locally run backend validation tests for create and patch. Demonstrate title-only POST default; invalid priority and impossible date 400; omitted date preserves while explicit null clears. Record concrete test commands/status codes with no secrets. |
| `p1-w12-l06-c01` | `quiz-auto` | Required | Six reviewed owner-scoped sql, repository mapping and api client contracts questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l06-c02` | `local-project-self-verified` | Required | Run available backend repository and HTTP tests locally, including failure and foreign-owner cases. Confirm server JSON includes priority/date; preserve no-secrets and fictional-account rules. |
| `p1-w12-l07-c01` | `quiz-auto` | Required | Six reviewed controlled react forms and server-confirmed updates questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l07-c02` | `local-project-self-verified` | Required | Use local React app to demonstrate create/edit/clear/reload and a failed save with helpful feedback. Verify actual request payload/response via Network DevTools, redacting session information. |
| `p1-w12-l08-c01` | `quiz-auto` | Required | Six reviewed pure date logic, testable derivations and optional dashboard questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l08-c02` | `browser-code-auto` | Required | Implement a pure `classifyDue(task, today)` or equivalent with explicit `today` argument and validated ISO date-only values. Mandatory cases: overdue yesterday/incomplete, due today, exactly +7 days, +8 days, completed overdue false, no due date false, invalid dates rejected; run without `Date.now`, network, Node packages or DOM. All mandatory synthetic behavior checks must pass; no user secrets. |
| `p1-w12-l08-c03` | `local-project-self-verified` | Required | Document date-only assumptions and locally run the pure planning helper tests. Compare expected classifications with actual outcomes; dashboard presentation is an optional extension, not a required gate. |
| `p1-w12-l08-c04` | `optional-enrichment` | Optional | Build optional React dashboard counts for overdue/due-soon/high-priority-open with accessible labels; never required for graduation.; never gating. |
| `p1-w12-l09-c01` | `quiz-auto` | Required | Six reviewed prove behavior across unit, http, postgresql and browser layers questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l09-c02` | `local-project-self-verified` | Required | Complete an A01–A10 evidence matrix with unit, HTTP, live PostgreSQL only if safe, and browser verification. Use distinct fictional users; run real 404 denial and unchanged-row check, or record honest blocker and do not mark it passed. |
| `p1-w12-l10-c01` | `quiz-auto` | Required | Six reviewed diagnose bugs, review security and decide whether to release questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l10-c02` | `local-project-self-verified` | Required | Complete three debugging-lab records, including a critical PATCH/owner case, perform sanitized diff/security review, and record a truthful release decision. Public hosting is optional and not a graduation requirement. |
| `p1-w12-l11-c01` | `quiz-auto` | Required | Six reviewed final demonstration, exit assessment and phase 2 readiness questions; ≥5/6 + every essential; explanatory wrong-answer feedback, unlimited retries. |
| `p1-w12-l11-c02` | `local-project-self-verified` | Required | Complete final capstone demonstration and explicit self-attestation: A01–A10, required test evidence, ownership denied, safety report, Git diff/AI log, at least three debugger exercises, ten oral self-check answers and 100-point rubric. Mark unfinished or blocked safety checks incomplete and choose Hold; never present this as externally certified. |
| `p1-w12-l11-c03` | `optional-enrichment` | Optional | Optional public demo or personal Phase 2 portfolio polish with fictional data and independent review; never required for course completion.; never gating. |

## 2. Per-method acceptance rules and evidence boundaries

**`quiz-auto`:** eleven groups of six scored items (66 **planned**), with rounded-up 80% = five correct of six plus any essential item correct. No placeholder item can make a lesson pass; reviewed answers, distractors and equivalent retry prompts must be written before publication. The terminal `p1-w12-l11-c01` is the required final readiness quiz.

**`browser-code-auto`:** L05 date-only validation and L08 pure due-date classification are browser-safe only with a reviewed isolated runner and synthetic dates. All mandatory checks must pass. No network, React/Node/PostgreSQL/cookies, `localStorage` academy progress or privileged imports are available to student code. A green browser helper test cannot attest to the user's database migration or UI.

**`local-project-self-verified`:** eleven checkpoints requiring actual separate local tasks. The user records bounded commands/test observations and A01–A10 evidence, never session cookies, account credentials, private environment files or full raw logs. A `pass` check means **“Self-verified locally”**; if an activity was not run, show “Not run,” don't infer success from a different layer. Explicit project and final oral evidence are local/self-attested and can be edited by the learner.

**`optional-enrichment`:** L02 AI-prompt comparison, L08 dashboard UI, L11 optional public showcase. None is a prerequisite for graduation, and no paid/external AI service is needed.

## 3. Mandatory acceptance and safety overrides

| Required gate | Proof standard |
|---|---|
| A01–A07 | Save, validate, preserve and clear priority/date; persistence and legacy request supported |
| A08 | **Foreign-user GET/PATCH/DELETE blocked** and owner row unchanged; critical override |
| A09 | Failed HTTP/DB save is not presented as success |
| A10 | Actual test logs, code review, Git history, demonstration and independent explanation |
| Safe migration | Preserve existing user_tasks rows and ownership, verify database target; no destructive shortcut |
| Secret handling | No `.env`, real cookies, passwords or connection strings in public content, Git or AI logs |
| Independent explanation | At least three debugging labs and ten oral reasoning prompts without AI during the self-check |

A critical failure requires **Hold** and targeted remediation; a high self-assessed rubric score cannot override a cross-account vulnerability. The platform must never assert that it independently executed local tests or certified security.

## 4. Prerequisites, resets and Phase 1 completion

- Entrance: accepted Week 11 readiness (`p1-w11-l11` plus all mandatory Week 11 checks).
- Default order L01→L02→L03→L04→L05→L06→L07→L08→L09→L10→L11. Independently reviewed optional side branches do not block.
- Final course status requires **all required Week 1–12 gates** and Week 12 L11 quiz/project/readiness; there is no Week 13 course unlock.
- Reattempts do not revoke mastery. Formal lesson/week/course resets invalidate the dependent progress chain with preview and export suggestion under approved reset rules.
- Imports must validate stable IDs; don't trust imported `unlocked` flags, inflated self-scores or missing evidence as proof of verification.

## 5. Item authoring and publication QA

- [ ] Each quiz question gets a stable question ID, reviewed correct answer, essential designation, rationales, targeted feedback and equivalent retry.
- [ ] Both browser code suites have deterministic edge cases and isolated execution security review.
- [ ] Local commands and expected outputs are checked against actual current starter files before student publication.
- [ ] A01–A10 evidence card is usable without revealing instructor solutions.
- [ ] Safety-critical scenarios cannot be bypassed by optional dashboard or AI tasks.
- [ ] Learner pilot includes a novice's demonstration and checks for inappropriate “automatically verified” wording.

**Planning status:** 27 proposed IDs classified, not executed. Week 12 pending owner structural approval; D0/D1 unsigned and D2 not authorized.
