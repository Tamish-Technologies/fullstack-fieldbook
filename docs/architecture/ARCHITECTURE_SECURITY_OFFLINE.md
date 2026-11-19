# Technical Architecture, Offline Behavior and Security Boundaries — Proposed

## Architecture in one sentence

A statically hosted **React + TypeScript + Vite** application consumes versioned *bundled curriculum content*, evaluates eligible exercises locally, and stores learner progress in browser `localStorage`; no required network API, backend database, accounts, analytics, or paid services.

## Logical modules (future code folders, not created yet)

```
Future src/ (NOT YET IMPLEMENTED)
  app/          routing, application shell and settings
  curriculum/   typed manifest, content loader, source metadata
  learning/     prerequisites, mastery, assessment rules
  progress/     validation, persistence, migration, export/import, reset
  lessons/      structured lesson block renderer
  exercises/    quiz engine, code checks, local project labs
  playground/   isolated editor runtime and output renderer
  components/   design system and shared primitives
  styles/       tokens and themes
  utils/        small shared helpers
Future content/
  phase1/week-01/...   authored, versioned student lesson content
Future public/
  icons/ and approved static assets ONLY
```

Keep grading logic and rules independent of React components so they are testable. Keep lesson content independent of UI and progress state. Use stable IDs for all persistent references.

## Proposed tech stack

| Concern | Proposal | Reason |
|---|---|---|
| UI | React + TypeScript | Component-based, type-safe, maintainable |
| Bundling | Vite | Static deploy and fast local development |
| CSS | Tailwind CSS + design-token CSS variables | Customized system without a heavy theme framework |
| Accessible primitives | selected shadcn/ui components | Own the components; do not install a massive unused UI suite |
| Routing | Lightweight client-side router | Direct course links + route guards; confirm hosting SPA fallback |
| Editor | CodeMirror 6 | Editor for appropriate browser-only labs |
| Grading | Local pure assessment functions | Deterministic, testable, no required service |
| Progress | localStorage + validated JSON import/export | Small, simple local persistence |
| Offline | Service worker/PWA after D9 | Bundled course usable after first online load/cache preparation |
| Tests | Vitest, React Testing Library, Playwright | Unit, UI, keyboard, critical learner flows |
| Hosting | Static HTTPS origin | Free public access; no application server |

Versions and current compatibility must be checked when D2 starts. Prefer minimal dependencies and avoid runtime CDN fonts or APIs that would break offline study.

## Deployment and local-only meaning

- Users **may visit a publicly hosted static site**; site files download to the browser. This is still a frontend-only application, not a server-backed account service.
- Core learning and progress remain on-device. An initial online load is needed unless app files have been installed/cached in advance.
- Hosting provider sees normal network requests to serve files; don't promise anonymity against hosting/network logs.
- Never say users can double-click `index.html` and expect robust progress/offline support. File-origin browser storage is not reliably defined.

## Security for learner-supplied code

### Default principle

Never execute untrusted learner code with full privileges in the parent application's JS environment (no direct `eval`, `new Function` or innerHTML into the trusted app DOM). A malicious or accidental infinite loop must not irreversibly break the learning platform.

### HTML/CSS preview

- Render in a **sandboxed iframe on an opaque origin**; do **not** combine `allow-scripts` and `allow-same-origin` when same-origin content could escape isolation.
- Sanitize/design strict restrictions on embedded active content and outbound requests. In a truly offline lab, block external network dependencies rather than trusting a naive iframe sandbox to block all network calls.
- Limit input length, number of rendered frames and total session resource use; provide reset/reload.
- Test sandbox isolation, accessibility and script injection attempts before enabling it.

### JavaScript checks

- Prefer constrained, testable exercises implemented through an isolated worker or appropriately sandboxed execution context.
- Enforce a per-run timeout and terminate a worker that never returns; keep main app responsive.
- Treat any messages from the sandbox as untrusted: validate origin/source/message schema, cap output size, escape text.
- Do not expose progress storage, user notes, imported backups, parent app DOM or privileged host interfaces to learner code.
- Recognize that client-side isolation against arbitrary hostile JS has limitations; use no false security guarantee. Require a security review before D4.
- For labs that cannot be safely executed offline, offer a non-executing explanation and an external local project task instead.

### React/Node/SQL labs

- Use a real starter ZIP and local dev environment. Browser-only syntax playgrounds can teach a small concept but do not replace actual React/Express/PostgreSQL work.
- Don't include real credentials, personal data or API secrets in sample code/fixtures.
- Never upload learner code or progress to an external AI agent automatically; copyable prompts are user-controlled.

## Offline architecture and update lifecycle

- All essential instructional text, glossary, question assets, self-contained demos, and learning UI are bundled and cacheable. No dependency on an external learning API.
- Service worker registers only in a secure context (HTTPS/localhost for local development). Avoid unsafe caching of unknown cross-origin resources.
- Precache the app shell plus approved content chunks or provide an explicit “Download full course for offline use” that confirms completion. Do not claim full offline availability before required files are cached.
- Static video links, third-party docs and hosted AI tool links are **optional online resources** and must be labeled as such.
- On application update, use a versioned cache lifecycle and explain when a refresh is needed. Preserve validated progress data separately from cache management.
- Tests: airplane mode after confirmed installation; loading every required week; quiz/edit flow offline; update process; stale service worker; cache eviction/failure, and returning online.

## Content versioning

- Keep **application release version**, **curriculum content version** and **progress schema version** distinct.
- A typo fix can change content version without invalidating existing mastery; a changed mandatory checkpoint may require an explicit migration/reassessment rule.
- Content manifest includes stable IDs, ordered lesson list, prerequisites, references and published/approved status.
- Build-time content integrity test rejects missing duplicate IDs, unknown prerequisites, cycles, missing question explanation/answer, and instructor-only asset imports.

## Privacy and storage boundaries

- No app-backend calls for progress, telemetry, third-party ad scripts or invisible external trackers.
- Do not request geolocation, camera or microphone.
- Keep notes/backup data plain text and size-limited; do not execute imported JSON or HTML.
- Add a visible storage-unavailable state rather than silently failing saves.

## Hosting plan

- Static HTTPS host with SPA route fallbacks (or compatible hash routing if host restrictions demand). Free hosting can serve the compiled app; it must not require a database or Node server for users.
- Before public release, verify caching headers, proper fallback for lesson deep links, MIME types for bundled assets, content security policy where feasible, offline PWA behavior, and optional browser installation.
- Keep original PDF guides and instructor reference ZIPs outside the deployed asset tree.

## Decisions that may change after pilot

- Using a local IndexedDB store for large multi-file drafts if needed in a future version. **Not proposed for v1** because the owner requested no database and progress storage remains small.
- Replacing an editor feature if it introduces unacceptable offline or safety complexity.
- Splitting content bundles into per-week lazy chunks while still offering a reliable full-course offline caching option.

## Official documentation to consult during implementation

- Vite: https://vite.dev/guide/ and https://vite.dev/guide/static-deploy.html
- React: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui Vite: https://ui.shadcn.com/docs/installation/vite
- CodeMirror: https://codemirror.net/docs/
- MDN localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- MDN service workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
- MDN iframe sandbox: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/

## D9 implementation for release review

The built preview serves an explicit offline download from Settings. The app waits for its worker to control the tab and confirm the full copy before reporting readiness. The build lists the exact shell, modules, styles, manifest, icons, and eight learner ZIPs with SHA-256 integrity values. Those reviewed archives are separate static files. The first lesson read downloads only the application and reader bundles until the learner chooses an archive or prepares the full course.

Each build has an identifier derived from the artifact contents and worker code. A browser installs a new cache as a batch, and the new worker waits for the old pages to close before activating. The active release serves its own cached routes and assets. A failed install leaves the active cache available. Missing files produce a repair action in Settings or a standalone recovery page when the app cannot boot. The worker accesses exact same-origin release resources and known course navigation routes. It performs no progress writes and caches no learner data.

The release identifier is separate from progress schema `1` and curriculum `w12.1`. Saved progress remains in localStorage on the same browser and origin through a cache update. The offline copy downloads the course itself and its approved starter files. npm dependencies and third-party services still follow their own availability.
