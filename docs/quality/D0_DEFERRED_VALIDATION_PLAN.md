# D0 Deferred Verification and Educational QA Plan

**Status:** Audit deliverable, **not evidence tests were executed**. D0, D1 and D2 gates remain separate.

| Development stage | Deferred evidence to produce | Who verifies | Release implication |
|---|---|---|---|
| D1 | Accessible high-fidelity dashboard, lesson, question, code, project, settings and reset screens in desktop/mobile light/dark | Product owner + design/accessibility review | Must be approved before D2 |
| D2 | Storage schema validation, unique ID prereq lookup, Week 4 optional branching, cross-week locks, reset cascade, import/export preview, storage-denied behavior | Automated tests + manual UX | D2 must pass before D3 |
| D3 | Week 1 full student-facing prose, reviewed quizzes, feedback, equivalent retries, limited usability/content learner dry run | Educator + novice learner | Cannot claim required Week 1 browser code passes |
| D4 | Secure iframe/worker code isolation, no progress-origin access, all Week 1 mandatory behavior tests, responsive geometry feasibility, **integrated Week 1 mastery pilot** | Engineering/security review + novice learner | Block D5 until critical defects fixed |
| D5 | Weeks 2–4 lessons, pure JS/DOM/fake fetch test correctness, offline API fixtures and learner pilots | Educator + engineer + learner | Public service availability never gates |
| D6 | Weeks 5–6 React explanation accuracy, real local JSX/Vite/Router exercise instructions and learner pilot | Engineer + student running real app | Do not claim JSX browser auto-grading |
| D7 | Weeks 7–9 Express/SQL instructions on a fresh machine, local test DB safeguards, API contract continuity | Engineer + student using fictional/test data | Never run destructive tests on unknown DB |
| D8 | Weeks 10–12 authorization and final capstone, two-account negative tests, locally self-verified evidence, independent explanation, critical Hold policy | Engineer/security reviewer + learner | No independent certification or production-security assertion |
| D9 | PWA caching, version migrations, offline course, accessibility, backups/restores, privacy/legal licensing DEC-18, static public release | QA + legal/owner review | Public publishing only after owner release signoff |

**Important:** The 706 planned quiz slots are **not written and tested questions**. Method/type counts are curriculum planning records only. The original instructor PDFs/code ZIPs must remain outside the public app and normal site build inputs. Course storage is local to the browser and not proof of independent identity or learning.
