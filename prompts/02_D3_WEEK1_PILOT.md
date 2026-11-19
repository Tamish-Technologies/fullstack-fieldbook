# Prompt 02 — Universal D3 Week 1 Content/Quiz Dry Run — ONLY After D2 Owner Signoff

Implement **D3: the actual Week 1 student lessons, quiz engine/content and a LIMITED content/navigation/usability dry run** (not all 12 weeks and not an integrated mastery pilot). Follow DEC-24, the approved Week 1 structure, the design system and the mastery policy.

- Read `../fullstack-fieldbook-source-materials/phase1/week-01/instructor-guide-source.md`, the PDF as needed, and inspect the original Week 1 code ZIP. Do not invent or flatten the source content.
- Convert the approved proposed Week 1 lesson map into genuinely student-facing lessons: explanation, goal, worked code, small exercise, misconception, hints, meaningful assessments, summary and source trace.
- Build generic lesson block rendering and question/quiz components that are reusable for Weeks 2–12; avoid hardcoding Week 1 behavior.
- Implement honest mastery gates with feedback and retries; never pass by scrolling.
- **Do not run arbitrary learner code in the main app or fake coding-check passes.** Until D4 runner security review, show coding tasks as static/non-scored previews or clearly pending; no Week 1 full graduation when required `browser-code-auto` checks remain unverified.
- Make completed lessons reviewable, keep direct-URL locks working, and preserve correct progress on refresh.
- Add content integrity, accessibility, question correctness and browser workflow tests.
- Include a limited learner **content/usability dry-run** script that records explanations and quiz confusion, with separate note that full Week 1 mastery must wait for D4.

**Do not convert Weeks 2–12, build the complete playground, enable unsafe code evaluation, claim a fully passed Week 1, or ship publicly during D3.** Report the actual dry-run scope, pending browser checks, and tests truly executed. After D3 signoff, request separate D4 authorization. D0/D1 approval and explicit D2 authorization are required before any D3 work.
