# Week 1 fresh-learner audit

**18 November 2026 · Current recommendation: ready for owner acceptance of D3.** The two original acceptance blockers and the three requested usability fixes passed fresh-profile checks in Chrome. The original findings below document the earlier build. The two polish suggestions remain optional.

The recording gallery is retained locally for owner review.

## Acceptance retest

| Scenario | Observed result on the revised build |
|---|---|
| Lesson 6 local practice | Ran the published block three times in one clean local page, changing only the input. Empty text and three spaces each produced `0 false`. “Read docs” produced `9 true`. |
| Week 2 recovery | At 0/7 the lock offered orientation. At 1/7 it offered the forms lesson, whose quiz was available. At 7/7 it acknowledged all seven passes, explained the seven pending browser checks and four pending local checks, and offered review and export. Export contained the seven real passes. |
| Mobile quiz deferral | At 320 × 740, Continue reading was visible with the first question. A selected answer survived navigation, Back and reload. Resume restored the correct selection with zero attempts and zero mastery evidence. |
| Field notes | A new draft survived navigation. An edit to a saved note survived reload. Discard restored the saved note, and saving a subsequent revision kept it after reload. The regression also discarded a new draft back to an empty note. |
| Essential-question recovery | The score summary linked each missed essential by question number and topic. Keyboard activation moved focus to that question’s feedback. Exercised Lesson 3 with one miss and Lesson 12 with two. |
| Uninterrupted reading | From a fresh dashboard session, followed the regular learner links through Lessons 1–12 while all quizzes stayed closed. The last lesson became the resume location. Attempts and earned passes stayed empty. |

Strict typecheck, production build and public asset checks passed. Vitest passed 39 tests. Chrome passed all 21 browser tests, including the new regressions, the original 80-question-variant walkthrough and the responsive accessibility checks. The first retest exposed a delay in rendering radio choices during browser storage writes. The final implementation displays the choice immediately and retains it through the validated progress store.

Each of the six new recordings used a fresh, isolated browser profile. All six MP4s passed full decoding and all 43 gallery selections played in Chrome. Manual screen-reader use and beginner comprehension remain unverified. Week 2 remains locked pending practical verification in D4. The owner decides stage acceptance.

## Original audit findings

### Original acceptance blockers

| Finding | What happened in the learner session | Change and retest |
|---|---|---|
| **Lesson 6 gives an expression that fails in the preceding example.** | The example printed the expected `11 7 false 1` and named the cleaned string `title`. The very next exercise asked for `Boolean(trimmedTitle)`. Trying it produced `ReferenceError: trimmedTitle is not defined`. The quiz still awarded 5/5. | Use one variable name throughout and show exactly where to substitute each new input. Run the published instructions in a clean local page with an empty string, spaces only and “Read docs”. Verify the three pairs of length and Boolean result are 0/false, 0/false and 9/true. |
| **The Week 2 lock gives an impossible recovery instruction.** | After seven real quiz passes, the learner outline still had 11 required practical checks pending. Opening Week 2 directed me to finish Lesson 2. Its Tests tab said the check was pending, with no action available to earn it. The week outline does explain the version limit, but the lock omits it at the decision point. | On the lock screen, distinguish available quiz work from the seven pending browser checks and four pending local verifications. Offer an unfinished quiz when one exists. Once all seven quizzes pass, acknowledge that result and offer to revisit lessons or export progress. Retest both states and confirm Week 2 stays locked. |

### Original usability observations

| Priority | Observation | Recommended change |
|---|---|---|
| Next | On a 320 × 740 viewport, after I started the orientation quiz and selected an answer, the Continue link began **2,029 pixels below the viewport top**. On returning from Lesson 2, the quiz was closed and the unsubmitted selection was gone. The page fit the screen horizontally. | Put “Continue reading” or “Return to this quiz later” beside the open quiz header. Preserve in-progress answers locally or tell the learner what leaving will discard. Keep earned evidence separate from draft answers. |
| Next | Saving a field note worked across reload. After editing it again, choosing Continue and then Back silently restored only the earlier saved text. | Show a clear unsaved state and retain a draft or offer to save it on navigation. Test with an existing note, a new note and a deliberate discard. |
| Next | An essential miss correctly failed Lesson 3 at 4/5. Focus went to the score, below all five questions. The summary referred me back to “that question” without identifying it. | Name the missed topic and link its question number to its feedback. Retest with keyboard alone and with more than one essential miss on Lesson 12. |
| Polish | After all seven quizzes passed, progress emphasized course-wide counts and checkpoint codes. Several lessons with an earned quiz still read “Ready to study” because a practical check remained. | Lead with “Week 1 quizzes: 7 of 7 passed”, then group pending practical work. Use lesson titles in checkpoint history. |
| Polish | The orientation required four separate downloads. The notes explain how to put them together. On opening the files correctly, the initial page showed a heading, as the lesson predicted. | Offer a single learner starter folder as a ZIP alongside the current files. Keep the expected first-screen description and mobile reading option. |

## What worked

- **Reading order.** The regular learner route supported all 12 lessons in sequence. Opening a lesson left its quiz closed. The separate fresh-state regression followed all 12 without any attempts or earned evidence and confirmed the Week 2 lock.
- **Testing after learning.** The orientation guide links file roles, the live page and reload, browser inspection, and the hint workflow to teaching before the questions. I deferred this quiz until after Lesson 12, scored 3/5, revisited the teaching and passed the alternate form.
- **Quiz behavior.** The learner profile earned all seven quiz passes. The independent regression exercised 40 question slots and their 40 alternate forms, essential misses, feedback, retry focus and review-mode isolation.
- **Local practice.** I used the four downloaded starter files in a temporary learner project. An independently written task list handled button and Enter submission, rejected blank and whitespace-only input, displayed markup-like titles literally, toggled a selected duplicate, deleted the right row and restored the empty state. I checked the narrow layout and expected loss on reload. I introduced and repaired a mismatched selector and made two local commits in that temporary project. No practical pass was written to Fieldbook.
- **Progress and recovery.** Export, previewed reset and confirmed import took the disposable record from seven earned passes to six and back to seven. The additional recordings cover malformed imports, storage recovery, session-only storage and a stale confirmation across two tabs.

## Method and evidence

I ran an AI-operated walkthrough in Chrome with empty browser storage on the production build. The learner session opened all 12 articles through normal navigation, expanded predictions and hints, and used the local downloads. I separately tested the 320px reading path and used the development-only practice route for the alternate-question regression. All notes, quiz attempts and backups were disposable audit data. The reset/restore clip resumed from the backup exported during the walkthrough.

The original audit groups hold 20 learner and feature recordings, plus 17 regression recordings for 16 browser tests, including both tabs of the concurrent-restore test. Clips show the actual browser viewport. The pointer and occasional action labels come from the recorder. The two local exercise clips include transcripts of actual outputs. The second clip shows the learner project during testing. The readings are traversed at audit speed. Clip length does not measure learner study time.

| Verification | Result |
|---|---|
| Strict typecheck, production build and public asset check | Passed |
| Unit tests | 38 passed |
| Browser regression suite | 16 passed in recorded Chrome sessions |
| Recording format | H.264 MP4, silent, with native playback controls, seeking and full-resolution file links |
| Playback checks | All 37 MP4 files passed full-stream decoding. Chrome played a frame from every gallery selection. The gallery fit a 375px viewport. |
| Recording setup | The initial capture attempt stopped before testing because Playwright's expected encoder was absent. The recorded run used the installed FFmpeg encoder. A reset-control selector in the audit driver was corrected before completing the final reset/restore clip. |

This audit evaluates learnability issues an experienced tester can reproduce and the behavior of the current app. Human comprehension, time estimates, independent beginner transfer and manual screen-reader use remain open. The D4 isolated runner and integrated learner pilot are separate milestones. The acceptance retest above supersedes this original recommendation.
