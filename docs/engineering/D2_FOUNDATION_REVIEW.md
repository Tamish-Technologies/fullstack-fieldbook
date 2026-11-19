# D2 foundation review

**Accepted by the owner · November 18, 2026.** After D0 approval A-014 and D1 approval A-017, the owner separately wrote **“I authorize D2 application foundation development”**. This delivery covers the static application shell and browser-local progress engine. The owner subsequently confirmed **“I accept D2”**. D3 requires separate authorization.

## Run the demo

From the repository root, with Node 24.21.0 and npm 11.19.0 as tested:

```sh
npm ci
npm run dev
```

Open the loopback URL Vite prints. Keep the same browser and URL throughout the demo because browser storage is scoped to the origin. For a production-build demo, run `npm run build` followed by `npm run preview`. The preview server supports direct lesson URLs. A future static host needs a fallback to `index.html` for application routes.

1. On the dashboard, select **Begin Week 01**, enter a field note and select **Save field note**. Refresh. The note persists and **Progress & review** still shows zero earned checkpoints.
2. Open `/course/week/01/lesson/02` directly. The locked screen links to the earliest unmet lesson. Browse the 12-week roadmap and return to the dashboard to test Resume.
3. In **Settings**, change the theme and export a backup. Edit the note, then import the exported file. Inspect the replacement preview, cancel once, then repeat and confirm. The original note and preference are restored.
4. Preview a lesson or week reset and inspect the affected scope, earned records and note count. Press Escape to cancel and verify focus returns to **Preview reset**. Full-course reset has a second confirmation.
5. At 320px or 834px, use the course menu with the keyboard. For completed-state, lab-placeholder and reset-cascade examples, run the browser suite below. It supplies synthetic evidence in isolated browser contexts. A fresh learner can preview the first lesson and cannot award themselves mastery through the interface.

## Delivered behavior and files

| Area | Implementation | Acceptance evidence |
|---|---|---|
| Shell and navigation | `index.html`, `src/main.tsx`, `src/App.tsx`, `src/router.ts`, `src/styles.css`, `src/components/Dialog.tsx`, `src/components/LabPreview.tsx` | A-017 wordmark and editorial reader, responsive course rail/drawer, light/dark/system themes, dashboard, roadmap, weekly outlines, reader, progress, settings, protected deep links and route recovery. Lab panels expose pending states without executing learner code. |
| Course and progression | `build/manifest.ts`, `src/course.ts`, `src/learning.ts` | The build reads titles and chapter references from the lesson map and joins the two D0 indexes by ID. It emits metadata for 138 provisional lesson slots and 304 checkpoints. The engine derives eligibility from required evidence, including weekly project and readiness gates. W04 L10 is optional. W04 L11 depends on L09. Reset traversal follows those same dependencies. |
| Persistence and recovery | `src/store.ts`, `src/backup.ts`, `src/Settings.tsx` | Versioned records, exact ID and evidence-method validation, resuming, plain-text field notes, explicit storage warnings, original corrupt-record recovery, JSON backup and confirmed replacement. A write rechecks the current record. Stale destructive previews require a new review. |
| Build and verification | `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `playwright.config.ts`, `build/check-output.mjs`, `tests/foundation.test.ts`, `tests/browser.spec.ts`, `.gitignore` | Strict TypeScript, lockfile install, automated graph/storage and real-browser tests, and an output check for unexpected assets, private-material markers and test fixtures. |
| Stage records | `README.md`, `AGENTS.md`, `DECISIONS.md`, `ROADMAP.md`, `D2_HANDOFF_START_HERE.md`, the engineering handoff/scope/checklist, this report and `docs/product/OPEN_DECISIONS_FOR_SIGNOFF.md` | Active handoffs record the owner's actual instruction and retain the separate D2 acceptance and D3 authorization gates. |

## Verification performed

| Command | Result |
|---|---|
| `npm ci --offline --no-audit` | Clean lockfile install succeeded from the local npm cache. npm emitted an install-script policy warning for optional macOS dependency `fsevents`. |
| `npm ls --depth=0` | Resolved direct dependencies matched the pinned manifest. |
| `npm run typecheck` and `npm run build` | Passed. Output contained one HTML file, one stylesheet and one JavaScript bundle. The build's asset allowlist and private-material checks passed on all three. |
| `npm test` | **28 passed.** Coverage includes ID joins, dependency ordering, required and optional gates, quiz thresholds and essentials, mandatory checks, scoped reset, bounded backup validation, corrupt or unreadable storage, failed replacement and stale writes. |
| `npm run test:e2e` | **10 passed** on the final production build in headless Google Chrome 157.0.8103.79. Covered direct URLs and history, note persistence, export/restore, reset confirmations, a two-tab overwrite conflict, denied storage, quota failure and recovery. |
| Accessibility checks within the browser suite | At 320, 834 and 1440 CSS pixels, checked horizontal overflow, keyboard navigation, focus, reflow and selected WCAG rules with axe. The tested screens passed those checks. Light dashboard and dark reader, lab placeholder, roadmap and settings were exercised. The drawer was checked at the two narrow widths. |
| `npm audit --omit=dev --json` and `npm audit --json` | Production-dependency audit returned zero findings. Full audit reported six high-severity entries tied to one transitive build/test dependency advisory for `picomatch@4.0.7`. |

To repeat the automated checks after installation:

```sh
npm run build
npm test
npm run test:e2e
```

Playwright launches a loopback preview on port 4173 and uses installed Google Chrome on macOS when available. Elsewhere, install the matching browser with `npx playwright install chromium`, or select an installed supported channel with `PW_CHANNEL`. Browser tests create synthetic records in temporary browser contexts.

Earlier runs exposed delayed feedback on the theme radio buttons and a test that navigated before the reset acknowledgement. Both were corrected before the final run. The project has no configured lint command. Manual screen-reader testing, learner testing, Safari and Firefox remain unverified.

## Implementation choices and limits

- The local record uses schema version 1 and content version `d2.1`. Imports are limited to **512 KiB**, records to **448 KiB**, and each plain-text lesson note to **2,000 UTF-16 code units**. An incompatible version is rejected with the existing record preserved. A future content revision needs an explicit migration.
- Ordinary edits remain exportable in memory when saving fails. A replacement that unexpectedly fails to write preserves the previous record. When Settings has already reported session-only mode, the confirmation describes the in-memory replacement. Cross-tab writes use Web Locks where available and a stale-record check. Browsers without Web Locks have weaker concurrency guarantees.
- Checkpoint records retain their verification method. Local project evidence stays labeled self-verified. The owner of browser storage can edit a backup, so progress is suitable for self-study and carries no independent certification.
- Runtime assets are bundled locally. The browser test observed zero external requests during the first-visit, reader and roadmap flow. Deployment, service-worker caching and offline installation belong to later milestones.
- The setup was checked against the official Vite guide, Tailwind Vite integration and shadcn Dialog reference, and against npm registry and installed package metadata. The lockfile pins React/React DOM 19.3.1, TypeScript 7.0.2, Vite 8.3.8, the Vite React plugin 6.3.0, Tailwind and its Vite plugin 4.3.5, and the selected Radix Dialog primitive 1.3.1. [Vite guide](https://vite.dev/guide/) · [Tailwind Vite setup](https://tailwindcss.com/docs/installation/using-vite) · [shadcn Dialog](https://ui.shadcn.com/docs/components/radix/dialog)
- At verification time, the registry returned 4.0.7 as the latest `picomatch`. The outstanding advisory concerns glob matching in the development toolchain. The static learner app accepts no glob patterns. Recheck the advisory when upgrading the build tools. [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)
- DEC-18 publication licensing, DEC-19 final lesson count after the D4 pilot and DEC-22 optional external AI disclosures remain open at their scheduled gates.

**Next gate.** Week 1 content and quiz work can begin after separate owner authorization for D3.
