# D9 local release review

The owner accepted Week 12 and approved D8 engineering. Week 12 was pushed as `d8aa968` with the reviewed learner archive and no demo recordings. D9 is authorized for local review before publishing.

## Try the release candidate

Run `npm ci`, `npm run build`, then `npm run preview`. Use the exact local address printed by Vite. In **Settings → Offline study**, choose **Download course** and wait for **Ready for offline study**. Then disconnect or use the browser’s offline network setting, open a lesson, save a field note, and reload. In **Backup & restore**, export a copy, import it in a fresh profile, review the counts, and confirm. A different port or hostname has its own local storage.

A downloaded update stays available until you finish your work and close all Fieldbook tabs and installed app windows. Reopening starts the new release. Saved progress stays on the same origin. If the browser removes the course cache, reconnect and reopen or use **Download course again** in Settings.

## Changes

- `build/offline-worker.js`, `build/check-output.mjs`, and `build/distribution.ts` assemble a verified release cache from exact build files. The worker serves same-origin course routes and approved assets only. It has no access to the progress record.
- `src/components/OfflineCourse.tsx` offers explicit download, readiness, repair, and updates. Starter archives are separate approved downloads. The compressed reader bundle fell from about 557 kB to 117 kB. The main bundle still has a Vite size warning.
- `src/Settings.tsx` and `src/backup.ts` place import errors next to the file picker, show export time and what restore replaces, and identify older backup behavior only when it applies. They keep the original recovery file and the current backup export available. Cache updates leave the progress schema and course version intact.
- `tests/offline.spec.ts` covers fresh profiles, corrupt import, cache integrity, repair and eviction, and an update through two open tabs. The course regression follows the first lesson through completion with network disabled after preparation.

## Local evidence and release boundary

The production build and 169 unit tests passed. All 63 Chrome browser scenarios passed in the final serial run. The offline course journey finished all 268 required checks from a fresh profile, downloaded the capstone ZIP, and exercised reset and restore. Project checklist entries in this navigation test are synthetic. Earlier D8 review records document the real local project checks. Chrome's 360-pixel offline Settings screen passed its automated accessibility scan. The browser suite also exercised keyboard focus, contrast, and layouts at 320, 834, and 1440 CSS pixels.

Chrome exported a backup while offline and restored it in a second fresh profile. A malformed import left saved progress intact. I verified that the cache refuses a mismatched archive, that missing files can be repaired, and that an update waits and preserves the learner’s note. The production preview initially failed offline module and stylesheet lookup because its responses varied by request header. Matching the integrity-verified static assets by canonical URL corrected that failure. The release validator pins all eight learner archive digests and checks the app output for private or test-only material.

Firefox 159.0 and WebKit 27.2 each imported the Chrome 157.0.8103.79 backup in a fresh profile and reloaded the restored lesson offline at 360 CSS pixels. The older locally cached engines encountered test harness failures. The retest used browser versions matched to Playwright 1.65.1. The reviewed build is `d934391ac47e9da119d1` and contains 17 precached files plus the worker.

Public hosting, final publication rights and licensing, and the independent human pilot remain pending. Full screen-reader verification and host-specific smoke checks are separate from this local engineering run. The [release handoff](../release/PRIVACY_ACCESSIBILITY_PUBLICATION.md#d9-local-review-and-publication-handoff) records the host requirements and open decisions.

- [MDN service-worker lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [MDN Cache.addAll](https://developer.mozilla.org/en-US/docs/Web/API/Cache/addAll)

## Cross-browser and accessibility follow-up

Release `6eab3f78c7b2376fdf18` passed TypeScript, the production build, the offline asset check, and 172 unit tests. Chrome 157, Playwright Firefox 159, and Playwright WebKit 27.2 each passed the 67 browser scenarios across the full run and focused retests. Each engine completed the 268-checkpoint offline journey and saved the capstone ZIP. The Firefox backup scenario crashed when an axe scan and service-worker installation ran in the same page. The responsive suite still runs axe on Settings, and the separate offline backup scenario passed twice on each engine.

Project ZIP downloads now ask the service worker for the file when it controls the page. WebKit saved the cached ZIP with the expected name and bytes while offline. A keyboard and accessibility-tree check in WebKit at 320 CSS pixels verified lesson landmarks, quiz labels, focus on the first unanswered question, the focused passing result, and the malformed backup status.

Spoken VoiceOver verification remains pending because native screen capture failed and macOS denied assistive access to the terminal fallback. The independent learner pilot and live-host checks remain pending.
- [Vite static deployment](https://vite.dev/guide/static-deploy.html)
