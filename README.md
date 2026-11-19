# FullStack Fieldbook

**Learn the foundations. Build faster with AI.**

FullStack Fieldbook is a free, self-paced, 12-week course for anyone curious about computer science and ready to build real web applications. Created by **Tamish Technologies**, it takes you from your first HTML page to a full-stack capstone through guided lessons, quizzes, coding labs, and projects.

## Learn with AI, build with understanding

AI makes this an unusually good time to learn software development. It can explain an unfamiliar idea, help you debug a problem, and take on repetitive implementation work. The more you understand about the browser, HTTP, databases, and testing, the better you can direct AI and judge what it builds.

- **Learn the concept.** Work through a small example and predict what it will do. If you get stuck, ask AI for a hint or an explanation you can test.
- **Apply it yourself.** Try the exercise, debug what breaks, and explain why your solution works.
- **Build faster with AI.** Give it clear requirements and constraints, let it handle routine implementation, and review and test the result before you rely on it.

For example, after you understand how an HTTP endpoint validates input and returns errors, ask AI to draft a similar endpoint and its tests. Then run the tests and check how it handles invalid input. That practice carries over to projects far beyond the course. AI is optional throughout Fieldbook.

## What you’ll learn

- Build accessible, responsive web pages with HTML and CSS.
- Use JavaScript to handle events, update the page, and work with APIs.
- Build React interfaces with components, hooks, and routing.
- Develop Node.js and Express APIs, store data in PostgreSQL, and implement authentication and authorization.
- Test and debug a full-stack application, then put the pieces together in a capstone.

Start with Week 1 and work through the lessons at your own pace. Quizzes follow the lessons, and required practice checks unlock later weeks. Browser labs run in the Fieldbook app. The full-stack projects run on your own computer, where you verify them using the provided tests and checklists.

The course site runs without accounts, a backend, or a paid AI subscription. Fieldbook stores progress and notes in your browser. In the release build, you can download the course for offline study and export your progress as a JSON backup.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the address printed in your terminal and start with **Week 1**. To try offline study and backups, use the release preview instead.

```sh
npm run build
npm run preview
```

Open the preview address. In **Settings → Offline study**, select **Download course**. When it says **Ready for offline study**, disconnect and reopen a lesson. In **Settings → Backup & restore**, export a backup or import one into another browser profile.

For app or curriculum changes, run the relevant checks. If Chrome or a matching Playwright browser is unavailable, install Chromium with `npx playwright install chromium`.

```sh
npm run typecheck
npm test
npm run build
npm run test:e2e -- --workers=1
```

## Contribute

Help us make FullStack Fieldbook a full-stack learning resource anyone can use and improve. Learners, educators, and developers are welcome to contribute.

- **Improve a lesson.** Clarify a difficult explanation, correct an example, or write feedback that helps learners understand a quiz answer.
- **Add practice.** Propose a lab, a worked example, an accessibility exercise, or a companion project.
- **Go beyond the current course.** Propose a translation, a deeper topic guide, or a new learning track. Tell us who it serves, what readers should know first, and what they will be able to build or explain afterward.
- **Improve the platform.** Report usability and accessibility issues, improve offline study, or add tests that reproduce a learner problem.

For a small fix, open a pull request that describes what changed and how you verified it. For a new module or larger change, start with a GitHub issue so we can agree on where it fits. For lesson submissions, follow the [content authoring standard](docs/curriculum/CONTENT_AUTHORING_STANDARD.md) and credit your sources.

## License

Original application and learner starter code use the [MIT License](LICENSE). Original lesson text, quizzes, and learner guides use [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Both permit commercial reuse under their terms. Keep the applicable notices and credit **Tamish Technologies**.

See the [licensing scope](LICENSE-CONTENT.md) for an example attribution and the [third-party notices](THIRD_PARTY_NOTICES.txt) for bundled dependencies.

## Project status

D9 engineering is accepted. The independent human learner pilot and final publication checks are pending. See the [D9 engineering review](docs/quality/D9_RELEASE_REVIEW.md), [release checklist](docs/release/PRIVACY_ACCESSIBILITY_PUBLICATION.md), [decision register](DECISIONS.md), and [development roadmap](ROADMAP.md).
