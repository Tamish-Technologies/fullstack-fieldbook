# Privacy, Accessibility, Publishing and Licensing — Release Policy Draft

## Privacy-first commitments

- No user accounts, cloud progress synchronization, telemetry, analytics trackers, ads, or server-side learning profile in v1.
- No client-to-developer transmission of learner scores, code drafts or notes.
- User progress resides in that browser and can be backed up/exported by the learner.
- Explain that a **static hosting provider may still log page requests/IP data** under its own policies. “No account” does not mean the web has no network metadata.
- No required external AI API. Optional outbound links to AI providers/doc websites are user-initiated and clearly labeled online.
- Backup JSON may contain learner notes and progress; tell learners to store it carefully. Never ask for credentials or secrets inside notes.

## User-facing privacy copy (draft)

“FullStack Fieldbook stores your course progress in this browser. It doesn't create an account or send your learning progress to our servers. If you clear site data, switch browsers, or change devices, your progress may not follow you. Use **Export Progress** in Settings to save a personal backup you can import later. Optional external links may have their own privacy policies.”

## Accessibility goals

Target WCAG 2.2 AA: readable color contrast (4.5:1 for normal text in typical cases), visible focus, keyboard operation, properly labeled quiz controls, errors that are announced and described in words, adequate target sizing/spacing, and respect for reduced-motion preferences. Browser execution/editors require special keyboard and screen-reader QA. Do not claim WCAG conformity without testing.

Required human checks before release: keyboard-only navigation through lesson and quiz, screen-reader check on completion/error states, zoomed/reflow view, small phone layout, light/dark contrasts, focus visible on dialogs and sidebar, and no keyboard trap in code editor.

## Original curriculum and publication rights

The 12 instructor guides and code archives were assembled for the owner in prior sessions. Before publishing material, confirm rights to any copied images, external snippets, logos, documentation extracts, bundled fonts, project fixtures, and third-party libraries. Attribute external sources where appropriate and obey dependency licenses.

The owner approved [MIT](../../LICENSE) for original application and learner starter code and [CC BY 4.0](../../LICENSE-CONTENT.md) for original lesson text, quizzes, and learner guides, with credit to **Tamish Technologies**. The two notices ship in each learner download. The static build also includes [third-party notices](../../THIRD_PARTY_NOTICES.txt).

Keep raw instructor guides and reference solutions private. Client-side approved quiz answers are visible to anyone who inspects the delivered code.

## Repository publication review

This snapshot starts with the owner-accepted D9 source tree on a fresh `main` branch. Commit attribution uses the GitHub-provided `noreply` address. The owner will review this snapshot before publication.

| Reviewed area | Finding |
|---|---|
| Git history and private inputs | The source audit covered 41 pre-release commits in the private development repository. Compared all 36 private source artifact hashes against reachable Git objects and archive entries. No full copies were present. The deleted planning ZIP in history contains five policy and template Markdown files. The two tracked PDFs are design reviews with no embedded attachments. No demo recordings were found in reachable history. |
| Learner downloads | Compared all eight ZIPs against their private source archives. None contained exact copies of files unique to an instructor solution. They do contain original starter files and adaptations. Review ZIPs for Weeks 10 and 11 also contained local test logs. The updated downloads omit those logs and add the license notices. All other file contents were preserved and the download integrity hashes were refreshed. |
| Credentials | Gitleaks 8.30.1 flagged one phrase about a stable key in the Week 5 pilot protocol. It was prose. A separate scan of the historical ZIP contents found no hits. Credential-shaped values in the archive audit were fictional test accounts and local database examples. |
| Dependencies | Reviewed installed license texts and lockfile metadata. Runtime entries use MIT, ISC, or 0BSD. Notices cover the application bundles, parser worker, and generated client assets. Learner ZIPs contain manifests and lockfiles and install their dependencies separately. The npm runtime advisory check returned zero known vulnerabilities. |

### Owner confirmation and Git history decision

The owner confirmed that Tamish Technologies has the rights to publish and relicense the source-derived starter files and teaching material. Keep the raw source pack private.

The owner chose a clean snapshot for review. The private development repository retains the original history.

## Release checklist

- [x] Product name selected: **FullStack Fieldbook**.
- [ ] Verify domain, trademark availability, public-facing logo and final branding before release.
- [x] Owner approves MIT and CC BY 4.0 with Tamish Technologies credit.
- [x] Owner confirms rights to publish and relicense the source-derived material.
- [ ] Owner approves the clean snapshot for public release.
- [ ] Original private instructor materials not deployed.
- [ ] Public README with setup/architecture, limits and learning philosophy.
- [ ] Privacy notice and backup warning available in UI.
- [ ] No personal identifiers, credentials, API tokens or instructor-only data in build artifacts.
- [ ] Free static host verified with HTTPS and SPA routing support.
- [ ] Offline/refresh/deep-link check passed.
- [ ] Basic accessibility and cross-browser checks completed.
- [ ] New learner pilot and full course learning walkthrough completed.

## Non-goals for v1

Formal certificates, validated exams, fraud prevention, parental tracking, teacher dashboards, proctoring, cloud restores, chat community, ads and payments.

## D9 local review and publication handoff

The local build presents privacy and backup handling in Settings. Downloaded course files live in a release cache. Progress and field notes live in this browser's learning record. Switching site addresses, profiles, or devices requires a backup transfer.

The owner accepted D9 engineering and selected `fullstack.tamishtech.com` as the preferred public address. Snapshot approval, Cloudflare Pages setup, and final human accessibility and learner checks remain open. The [D9 engineering review](../quality/D9_RELEASE_REVIEW.md) records the local engineering checks.

For a subsequent authorized deployment, serve the complete reviewed `dist/` at the site's HTTPS origin root. Apply the HTML fallback to Fieldbook page paths only. Serve `sw.js` as JavaScript with revalidation enabled, and serve actual manifests, icons, archives, and modules at their exact URLs. Publish the build as a single release. On the chosen host, verify a direct lesson URL, exact asset MIME types, download/activation, update, an offline reload, and a backup round trip. The local Vite preview is the review environment.
