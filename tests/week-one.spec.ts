import { walkWeekTwelve } from './week-twelve-journey'
import { walkWeekEleven } from './week-eleven-journey'
import { walkWeekTen } from './week-ten-journey'
import { walkWeekNine } from './week-nine-journey'
import { walkWeekEight } from './week-eight-journey'
import { walkWeekSeven } from './week-seven-journey'
import { walkWeekSix } from './week-six-journey'
import { walkWeekFive } from './week-five-journey'
import { walkWeekFour } from './week-four-journey'
import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFile } from 'node:fs/promises'
import { thirdWeekSolutions, walkWeekThree } from './week-three-journey'
import { walkWeekTwo } from './week-two-journey'
import { weekOne } from '../src/content/week-one'

const learner = '/course/week/01/lesson/'
const review = 'http://127.0.0.1:4174/review/week/01/lesson/'
const key = 'fullstack-fieldbook.phase1.w01.v1'
// Independent answer rubric. Each pair describes the expected concept for both authored forms.
const rubric: Record<string, [RegExp, RegExp][]> = {
  '01': [
    [/^HTML, CSS/, /^HTML, CSS/],
    [/live document tree/, /current DOM/],
    [/original list/, /saved HTML/],
    [/Inspect the element/, /Compare the live ID/],
    [/Ask for one hint/, /Isolate one change/],
  ],
  '03': [
    [/for="topic"/, /for="new-task"/],
    [/form’s submit/, /submit on the form/],
    [/^submit and button$/, /Save: submit; Help: button/],
    [/Accepts it as nonempty/, /Only the empty/],
    [/^h2, ul and li$/, /heading followed by ul/],
  ],
  '06': [
    [/^8$/, /^6$/],
    [/^false$/, /^false$/],
    [/tasks.push/, /names.push/],
    [/^tasks\[0\].title$/, /^cards\[0\].title$/],
    [/^""$/, /^"   ".trim\(\)$/],
  ],
  '08': [
    [/^null$/, /^null$/],
    [/Read input.value/, /field.value → row.textContent/],
    [/textContent/, /textContent/],
    [/In memory, unattached/, /no parent/],
    [/Create and append a new/, /Use separate nodes/],
  ],
  '10': [
    [/Selector spelling/, /Compare the selector/],
    [/Network load result/, /Elements Styles/],
    [/Default form navigation/, /submit reaches preventDefault/],
    [/Inspect local values/, /live call state/],
    [/Enter spaces, click Add/, /Add A and B/],
  ],
  '11': [
    [/working file differs/, /working tree/],
    [/Stages the current contents/, /version that was staged/],
    [/^git push$/, /Push the committed/],
    [/Inspect the diff/, /Review the unrelated/],
    [/Inspect the patch/, /Review the patch/],
  ],
  '12': [
    [/matching label\/id/, /labeled input in a form/],
    [/Preventing the form/, /Call event.preventDefault/],
    [/Trim the value/, /raw\.trim\(\) is empty/],
    [/^"skip"$/, /^"empty"$/],
    [/box.checked/, /Remove its completed class/],
    [/list.children.length === 0/, /remaining child count/],
    [/span’s textContent/, /label\.textContent = title/],
    [/returns null/, /^null when/],
    [/At 375px, not at 768px/, /Column, then row/],
    [/local history records/, /local snapshot exists/],
  ],
}
async function startCheck(page: Page) {
  await expect(page.getByRole('radio')).toHaveCount(0)
  const start = page.getByRole('button', { name: 'Start knowledge check' })
  await start.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('radio').first()).toBeFocused()
}

async function answer(
  page: Page,
  lesson: string,
  variant: 0 | 1,
  miss: number[] = [],
) {
  const groups = page.locator('.question')
  const questions = rubric[lesson]!
  await expect(groups).toHaveCount(questions.length)
  for (const [i, forms] of questions.entries()) {
    const group = groups.nth(i)
    const options = group.getByRole('radio')
    // Accessible names normalize runs of whitespace, including the spaces inside a quoted example.
    const expected =
      lesson === '06' && i === 4 && variant === 1
        ? /^"\s+".trim\(\)$/
        : forms[variant]
    const right = group.getByRole('radio', { name: expected })
    await expect(right).toHaveCount(1)
    if (miss.includes(i)) {
      const labels = await group.locator('label span').allTextContents()
      const wrong = labels.findIndex((name) => !expected.test(name))
      await options.nth(wrong).check()
    } else await right.check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}
test('regular learner can read all 12 lessons in order before taking any quiz', async ({
  page,
}) => {
  await page.goto('/course/week/01')
  await page
    .getByRole('link', { name: /Orientation, tools and safe AI learning/ })
    .click()
  const guide = page.getByRole('navigation', {
    name: 'Start here',
  })
  for (const link of await guide.getByRole('link').all()) {
    const target = await link.getAttribute('href')
    await link.click()
    await expect(page.locator(target!)).toBeFocused()
  }
  for (let i = 1; i <= 12; i++) {
    const id = String(i).padStart(2, '0')
    await expect(page).toHaveURL(new RegExp(learner + id + '(#.*)?$'))
    await expect(page.locator('article')).toContainText(
      weekOne['p1-w01-l' + id]!.heading,
    )
    await expect(page.getByRole('radio')).toHaveCount(0)
    if (i < 12) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Study Tasks',
  )
  const record = JSON.parse(
    (await page.evaluate((k) => localStorage.getItem(k), key))!,
  )
  expect(record.lastLessonId).toBe('p1-w01-l12')
  expect(record.evidence).toEqual([])
  expect(record.attempts).toEqual({})
  await page.getByRole('link', { name: 'Review Week 01 requirements' }).click()
  await expect(page.locator('.lesson-list a')).toHaveCount(12)
  await page.goto('/course/week/02/lesson/01')
  await expect(
    page.getByRole('heading', { name: 'This section is locked' }),
  ).toBeVisible()
})
test('learner dry run: fail, keep reading, refresh, retry, revisit and reset', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Begin Week 01' }).click()
  await expect(page.getByRole('radio')).toHaveCount(0)
  await page.getByRole('button', { name: 'Add sample task' }).click()
  await expect(page.getByText('Read one page', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Reload example' }).click()
  await expect(
    page.getByText('The list is empty.', { exact: true }),
  ).toBeVisible()
  for (const name of ['index.html', 'styles.css', 'app.js', 'README.md']) {
    const file = page.waitForEvent('download')
    await page.getByRole('link', { name, exact: true }).click()
    const download = await file
    expect(download.suggestedFilename()).toBe(name)
    expect(
      (await readFile((await download.path())!, 'utf8')).length,
    ).toBeGreaterThan(50)
  }
  await startCheck(page)
  await answer(page, '01', 0, [0, 1])
  await expect(
    page.getByRole('heading', { name: 'Try again · 3/5 correct' }),
  ).toBeFocused()
  await page.getByRole('link', { name: /^Continue to Semantic HTML/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Semantic HTML',
  )
  await page.goBack()
  await page.reload()
  await startCheck(page)
  await answer(page, '01', 1, [0])
  await expect(
    page.getByRole('heading', { name: 'Quiz passed · 4/5 correct' }),
  ).toBeFocused()
  await page.getByRole('link', { name: /^Continue to Semantic HTML/ }).click()
  await expect(page).toHaveURL(new RegExp(learner + '02$'))
  await expect(page.getByText('Try the browser lab below')).toBeVisible()
  await page.goto('/')
  await expect(
    page.getByRole('link', { name: 'Resume lesson' }),
  ).toHaveAttribute('href', learner + '02')
  for (const path of ['/course/week/02/lesson/01', '/course/week/02']) {
    await page.goto(path)
    await expect(
      page.getByRole('heading', { name: 'This section is locked' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Open Forms, labels/ }),
    ).toHaveAttribute('href', learner + '03')
  }
  await page.goto(learner + '01')
  await startCheck(page)
  await answer(page, '01', 0, [0, 1, 2, 3, 4])
  await expect(
    page.getByRole('heading', { name: 'Try again · 0/5 correct' }),
  ).toBeFocused()
  await expect(
    page.getByText('Earned checkpoint · Passed automatically'),
  ).toBeVisible()
  const stored = JSON.parse(
    (await page.evaluate((k) => localStorage.getItem(k), key))!,
  )
  expect(stored.evidence).toHaveLength(1)
  expect(stored.attempts['p1-w01-l01-c01'].count).toBe(3)
  await page.goto('/settings')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await expect(page.getByRole('dialog')).toContainText(
    'Removes 1 quiz attempt summary',
  )
  await page.getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/02')
  await expect(
    page.getByRole('heading', { name: 'This section is locked' }),
  ).toBeVisible()
  await page.goto('/review/week/01/lesson/03')
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible()
})
test('local review dry run: read all lessons and check all 80 question variants', async ({
  page,
}) => {
  test.setTimeout(120000)
  await page.goto(review + '01')
  const faults: string[] = []
  page.on('pageerror', (e) => faults.push(e.message))
  for (let i = 1; i <= 12; i++) {
    const lesson = String(i).padStart(2, '0')
    await expect(page).toHaveURL(review + lesson)
    await expect(page.getByText('Content review · practice only')).toBeVisible()
    await page.getByText('Check your prediction', { exact: true }).click()
    await expect(page.locator('article details[open] p').first()).toHaveText(
      weekOne['p1-w01-l' + lesson]!.result,
    )
    await page.getByText('Hint 1', { exact: true }).click()
    if (rubric[lesson]) {
      const essential = { '03': 0, '08': 2, '12': 6 }[lesson]
      await startCheck(page)
      await answer(page, lesson, 0, [essential ?? 0])
      const summary = page.locator('.quiz-result h3')
      await expect(summary).toBeFocused()
      await expect(summary).toContainText(
        essential === undefined ? 'Quiz passed' : 'Try again',
      )
      if (essential !== undefined)
        await expect(
          page.getByText(/An essential answer needs another look/),
        ).toBeVisible()
      await expect(
        page.locator('.answer-feedback').filter({ hasText: 'Review.' }),
      ).toHaveCount(1)
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await expect(page.locator('.question input').first()).toBeFocused()
      await answer(page, lesson, 1)
      await expect(summary).toHaveText(
        'Quiz passed · ' +
          rubric[lesson]!.length +
          '/' +
          rubric[lesson]!.length +
          ' correct',
      )
    }
    if (i < 12)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull()
  await page.goto('http://127.0.0.1:4174/course/week/02')
  await expect(
    page.getByRole('heading', { name: 'This section is locked' }),
  ).toBeVisible()
  expect(faults).toEqual([])
})
for (const width of [320, 834])
  test('quiz accessibility and reflow at ' + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(review + '03')
    await startCheck(page)
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('.question input:checked')).toHaveCount(1)
    await answer(page, '03', 0, [0])
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(
      scan.violations.map((v) => ({
        rule: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
    ).toEqual([])
  })
test('worked examples: landmarks, label, box size, responsive controls and literal task text', async ({
  page,
}) => {
  const r = (n: string) => weekOne['p1-w01-l' + n]!
  await page.setContent(r('02').example)
  await expect(page).toHaveTitle('My reading queue')
  await expect(
    page.getByRole('main').getByRole('heading', { level: 1 }),
  ).toHaveText('Today’s reading')
  await page.setContent(r('03').example)
  await page.getByText('Reading topic', { exact: true }).click()
  await expect(page.getByLabel('Reading topic')).toBeFocused()
  expect(
    await page
      .getByLabel('Reading topic')
      .evaluate((el) => (el as HTMLInputElement).checkValidity()),
  ).toBe(false)
  await page.getByLabel('Reading topic').fill('   ')
  expect(
    await page
      .getByLabel('Reading topic')
      .evaluate((el) => (el as HTMLInputElement).checkValidity()),
  ).toBe(true)
  await page.setContent(
    '<!doctype html><main class="app"><div class="controls"><input><button>Add</button></div></main>',
  )
  await page.addStyleTag({ content: r('04').example + '\n' + r('05').example })
  for (const [width, direction] of [
    [768, 'row'],
    [375, 'column'],
  ] as const) {
    await page.setViewportSize({ width, height: 900 })
    await expect(page.locator('.controls')).toHaveCSS(
      'flex-direction',
      direction,
    )
    const parentWidth = await page
      .locator('body')
      .evaluate((el) => el.getBoundingClientRect().width)
    await expect(page.locator('.app')).toHaveCSS(
      'width',
      Math.min(parentWidth, 360) + 'px',
    )
  }
  await page.setContent('<ul id="queue"></ul>')
  // Fixed course-authored example, run only in this disposable Playwright document.
  await page.addScriptTag({ content: r('08').example })
  await expect(page.locator('#queue li')).toHaveText('<em>Plan</em>')
  await expect(page.locator('#queue em')).toHaveCount(0)
})

test('mobile learner can defer a partial quiz near the first question and resume after reload', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto(learner + '01')
  await startCheck(page)
  const first = page.getByRole('radio').first()
  await first.check()
  const leave = page.getByRole('link', {
    name: 'Continue reading',
    exact: true,
  })
  await expect(leave).toBeInViewport()
  await leave.click()
  await expect(page.locator('h1')).toContainText('Semantic HTML')
  await page.goBack()
  await page.reload()
  await page.getByRole('button', { name: 'Resume knowledge check' }).click()
  await expect(first).toBeChecked()
  await expect(page.locator('input:checked')).toHaveCount(1)
  const record = await page.evaluate(
    (k) => JSON.parse(localStorage.getItem(k)!),
    key,
  )
  expect(record.evidence).toEqual([])
  expect(record.attempts).toEqual({})
})
test('new and edited field notes keep drafts across navigation, save and discard', async ({
  page,
}) => {
  await page.goto(learner + '01')
  const note = page.getByLabel('Your private note for this lesson')
  const discard = page.getByRole('button', { name: 'Discard draft' })
  await note.pressSequentially('DOM means live page.', { delay: 6 })
  await expect(page.getByRole('status')).toContainText('Unsaved changes')
  await page.getByRole('link', { name: /^Continue to Semantic/ }).click()
  await page.goBack()
  await expect(note).toHaveValue('DOM means live page.')
  await discard.click()
  await expect(note).toHaveValue('')
  await note.fill('My saved observation.')
  await page.getByRole('button', { name: 'Save field note' }).click()
  await expect(page.getByRole('status')).toContainText('Field note saved')
  await note.fill('My revised observation.')
  await expect(page.getByRole('status')).toContainText('draft retained')
  await page.reload()
  await expect(note).toHaveValue('My revised observation.')
  await discard.click()
  await expect(note).toHaveValue('My saved observation.')
  await note.fill('Final observation.')
  await page.getByRole('button', { name: 'Save field note' }).click()
  await page.reload()
  await expect(note).toHaveValue('Final observation.')
})
test('missed essential topics link to specific feedback by keyboard', async ({
  page,
}) => {
  for (const [id, miss] of [
    ['03', [0]],
    ['12', [2, 6]],
  ] as const) {
    await page.goto(learner + id)
    await startCheck(page)
    await answer(page, id, 0, [...miss])
    await expect(page.locator('.quiz-result h3')).toBeFocused()
    const links = page.locator('.quiz-result li a')
    await expect(links).toHaveCount(miss.length)
    for (const [i, index] of miss.entries()) {
      const link = links.nth(i)
      await expect(link).toHaveAccessibleName(
        new RegExp('Question ' + (index + 1) + ' · .+'),
      )
      await link.focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('.answer-feedback').nth(index)).toBeFocused()
    }
  }
})
test('Week 2 offers an unfinished quiz or an honest completion summary after all seven passes', async ({
  page,
}) => {
  await page.goto('/course/week/02')
  await expect(
    page.getByRole('heading', { name: '0 of 7 Week 1 quizzes passed' }),
  ).toBeVisible()
  for (const id of Object.keys(rubric).sort()) {
    await page.locator('.lock-panel a.primary').click()
    await expect(page).toHaveURL(new RegExp(learner + id + '$'))
    await startCheck(page)
    await answer(page, id, 0)
    await expect(page.locator('.quiz-result h3')).toContainText('Quiz passed')
    await page.goto('/course/week/02/lesson/01')
  }
  await expect(
    page.getByRole('heading', { name: '7 of 7 Week 1 quizzes passed' }),
  ).toBeVisible()
  await expect(page.locator('.lock-panel')).toContainText(
    '7 browser coding checks and 4 local project checks',
  )
  await expect(page.locator('.lock-panel a.primary')).toHaveAttribute(
    'href',
    learner + '02#p1-w01-l02-c01',
  )
  await page.getByRole('link', { name: 'Export progress in Settings' }).click()
  await expect(
    page.getByRole('button', { name: 'Export backup', exact: true }),
  ).toBeVisible()
})
test('Lesson 6 published practice runs for each prescribed input', async ({
  page,
}) => {
  await page.goto(learner + '06')
  const snippet = await page.getByLabel('Local practice example').innerText()
  await page.goto('about:blank')
  for (const [input, expected] of [
    ['', '0 false'],
    ['   ', '0 false'],
    ['Read docs', '9 true'],
  ]) {
    const message = page.waitForEvent('console')
    await page.addScriptTag({
      content: snippet.replace('"Read docs"', JSON.stringify(input)),
    })
    expect((await message).text()).toBe(expected)
  }
})

test('a fresh learner earns 268 checkpoints across twelve weeks offline and verifies reset and restore gates', async ({
  page,
}, testInfo) => {
  test.setTimeout(300000)
  const work: Record<string, string> = {
    '02': '<!DOCTYPE html><html lang="en"><head><title>My reading list</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="./styles.css"><script defer src="app.js"></script></head><body><main><h1>My tasks today</h1></main></body></html>',
    '03': '<form><label for="task">Task title</label><input id="task" required><button>Add</button></form><section><h2>Tasks</h2><ul></ul></section>',
    '04': '.app { box-sizing: border-box; width: 90%; max-width: 350px; margin: 18px auto; padding: 15px; border: 2px solid navy; }',
    '07': 'const cleanTitle = word => word.trim(); function isValidTitle(word) { return Boolean(cleanTitle(word)); }',
    '08': 'function addTask(title) { const queue = document.querySelector("#queue"); const item = document.createElement("li"); item.append(title); queue.appendChild(item); }',
    '09': 'function handleSubmit(event) { event.preventDefault(); const text = input.value.trim(); if (!text) { message.textContent = "Write a title."; return; } addTask(text); input.value = ""; input.focus(); }',
  }
  await page.goto('/settings')
  await page.getByRole('button', { name: 'Download course', exact: true }).click()
  await expect(page.getByText('Ready for offline study.')).toBeVisible({ timeout: 15000 })
  await page.context().setOffline(true)
  await page.goto('/')
  await page.getByRole('link', { name: 'Begin Week 01' }).click()
  const actualNotes = [
    'The empty form reloaded.',
    'Elements showed the button was outside the form.',
    'I moved the button into the form and repeated the submit test.',
  ]
  for (let n = 1; n <= 12; n++) {
    const id = String(n).padStart(2, '0')
    if (n > 1)
      await page
        .getByRole('link', { name: /^Continue to / })
        .last()
        .click()
    await expect(page).toHaveURL(new RegExp(learner + id + '$'))
    if (work[id]) {
      const editor = page.locator('#lab-code'),
        run = page.getByRole('button', { name: 'Run lab checks' })
      await run.click()
      if (['03', '04', '09'].includes(id))
        await page
          .frameLocator('.lab-result iframe')
          .getByRole('button', { name: 'Test keyboard focus and run checks' })
          .click()
      await expect(page.locator('.lab-result h3')).not.toHaveText(
        'Running checks…',
      )
      await expect(page.locator('.practical-status')).toBeEmpty()
      await editor.fill(work[id]!)
      await run.click()
      if (['03', '04', '09'].includes(id))
        await page
          .frameLocator('.lab-result iframe')
          .getByRole('button', { name: 'Test keyboard focus and run checks' })
          .click()
      await expect(page.locator('.practical-status')).toHaveText(
        'Browser checkpoint passed.',
      )
      if (id === '03') {
        const preview = page.frameLocator('.lab-frame iframe')
        await preview.getByText('Task title', { exact: true }).click()
        await expect(preview.getByRole('textbox')).toBeFocused()
      }
      if (id === '09') {
        const fixture = page.frameLocator('.lab-frame iframe')
        await fixture.getByRole('textbox').fill('  Keyboard study  ')
        await fixture.getByRole('textbox').press('Enter')
        await expect(fixture.getByRole('listitem')).toHaveText('Keyboard study')
        await expect(fixture.getByRole('textbox')).toBeFocused()
      }
      if (id === '07') {
        await editor.fill(
          'function cleanTitle(value) { return cleanTitle(value); }',
        )
        await run.click()
        if (['03', '04', '09'].includes(id))
          await page
            .frameLocator('.lab-result iframe')
            .getByRole('button', { name: 'Test keyboard focus and run checks' })
            .click()
        await expect(page.locator('.lab-result')).toContainText(
          'Call depth exceeded',
        )
        await page.reload()
        await expect(editor).toHaveValue(/return cleanTitle/)
        await expect(page.locator('.practical-status')).toHaveText(
          'Browser checkpoint passed.',
        )
      }
    }
    if (id === '05') {
      await page.getByLabel('Narrow override').fill('flex-direction: column;')
      await page.getByRole('button', { name: 'Run layout checks' }).click()
      await expect(page.locator('.practical-status')).toHaveText(
        'Browser checkpoint passed.',
      )
    }
    if (rubric[id]) {
      await startCheck(page)
      await answer(page, id, 0)
      await expect(page.locator('.quiz-result h3')).toContainText('Quiz passed')
    }
    for (const project of await page.locator('.local-project').all()) {
      const isLast = (await project.getByRole('combobox').count()) > 0
      if (isLast) {
        await page.goto('/course/week/02/lesson/01')
        await expect(page.locator('h1')).toHaveText('This section is locked')
        await page.locator('.lock-panel a.primary').click()
        await expect(page.locator('#p1-w01-l12-c03')).toBeFocused()
        await project.getByRole('combobox').selectOption({ index: 2 })
      }
      await project.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(project.locator(':invalid').first()).toBeVisible()
      for (const box of await project.getByRole('checkbox').all())
        await box.check()
      for (const [i, field] of (
        await project.locator('textarea[required]').all()
      ).entries()) {
        await field.fill(
          isLast
            ? [
                'I wired a checkbox change handler.',
                'I toggled one of two rows twice.',
                'The change event reads checked and updates the selected row class.',
              ][i]!
            : actualNotes[i]!,
        )
      }
      await project.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(project.getByRole('checkbox').first()).toBeDisabled()
    }
  }
  await page.goto('/course/week/02/lesson/01')
  await expect(page.locator('main')).toContainText('You unlocked Week 2')
  await page.reload()
  await expect(page.locator('main')).toContainText('You unlocked Week 2')
  await page.goto('/settings')
  const downloading = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const path = testInfo.outputPath('week-one-test-backup.json')
  await (await downloading).saveAs(path)
  const exported = JSON.parse(await readFile(path, 'utf8'))
  expect(exported.progress.evidence).toHaveLength(18)
  await page.getByLabel('Reset scope').selectOption('week')
  await page.getByLabel('Week to reset', { exact: true }).selectOption('01')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/02')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles(path)
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/02')
  await expect(page.locator('h1')).toHaveText('JavaScript state')
  await page.goto('/course/week/03')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await walkWeekTwo(page)
  await page.goto('/settings')
  const completedDownload = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const completeFile = testInfo.outputPath('two-weeks-test-backup.json')
  await (await completedDownload).saveAs(completeFile)
  const twoWeeks = JSON.parse(await readFile(completeFile, 'utf8'))
  expect(twoWeeks.progress.evidence).toHaveLength(37)
  await page.getByLabel('Reset scope').selectOption('week')
  await page.getByLabel('Week to reset', { exact: true }).selectOption('02')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/02/lesson/02')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  // Restore the same earned evidence as an accepted Week 2 export.
  twoWeeks.progress.contentVersion = 'w02.1'
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-two.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(twoWeeks)),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/02/lesson/11')
  await expect(page.locator('main')).toContainText(
    'includes self-verified local work',
  )
  await page.goto('/course/week/04')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await walkWeekThree(page)
  await page.goto('/settings')
  const exportAll = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const allFile = testInfo.outputPath('three-weeks-test-backup.json')
  await (await exportAll).saveAs(allFile)
  const threeWeeks = JSON.parse(await readFile(allFile, 'utf8')).progress
  expect(threeWeeks.evidence).toHaveLength(58)
  expect(threeWeeks.practicalDrafts['p1-w03-l09-c01']).toEqual({
    code: thirdWeekSolutions[9],
    concept: 'mutation',
  })
  await page.goto('/course/week/04')
  await expect(page.locator('h1')).not.toHaveText('This section is locked')
  await page.goto('/settings')
  await page.getByLabel('Reset scope').selectOption('week')
  await page.getByLabel('Week to reset', { exact: true }).selectOption('03')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  expect(await page.evaluate((storageKey) =>
    JSON.parse(localStorage.getItem(storageKey)!).practicalDrafts?.['p1-w03-l09-c01'], key)).toBeUndefined()
  await page.goto('/course/week/04')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-three.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...JSON.parse(await readFile(allFile, 'utf8')),
        progress: threeWeeks,
      }),
    ),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/03/lesson/09')
  await expect(page.getByLabel('JavaScript editor')).toHaveValue(thirdWeekSolutions[9]!)
  await page.goto('/course/week/03/lesson/11')
  await expect(page.locator('main')).toContainText('Week 3 complete')
  await walkWeekFour(page)
  await page.goto('/settings')
  const downloadFour = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const backup = testInfo.outputPath('four-weeks.json')
  await (await downloadFour).saveAs(backup)
  const four = JSON.parse(await readFile(backup, 'utf8')).progress
  expect(four.evidence).toHaveLength(79)
  expect(
    four.evidence.filter((e: { id: string }) => e.id.startsWith('p1-w04-l10')),
  ).toEqual([])
  expect(
    Object.keys(four.practicalDrafts).filter((id) => id.startsWith('p1-w04')).length,
  ).toBeGreaterThan(0)
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page
    .getByLabel('Lesson to reset', { exact: true })
    .selectOption('p1-w04-l10')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/05')
  await expect(page.locator('h1')).toHaveText('React fundamentals')
  await page.goto('/settings')
  await page.getByLabel('Reset scope').selectOption('week')
  await page.getByLabel('Week to reset', { exact: true }).selectOption('04')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/05')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-four.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...JSON.parse(await readFile(backup, 'utf8')),
        progress: { ...four, contentVersion: 'w04.1' },
      }),
    ),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/05')
  await expect(page.locator('h1')).toHaveText('React fundamentals')
  await walkWeekFive(page)
  await page.goto('/settings')
  const exportFive = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const fivePath = testInfo.outputPath('five-weeks.json')
  await (await exportFive).saveAs(fivePath)
  const five = JSON.parse(await readFile(fivePath, 'utf8')).progress
  expect(five.evidence).toHaveLength(101)
  expect(
    five.evidence.filter((e: { id: string }) => e.id.startsWith('p1-w05-')),
  ).toHaveLength(22)
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page
    .getByLabel('Lesson to reset', { exact: true })
    .selectOption('p1-w05-l07')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/06')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-five.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...JSON.parse(await readFile(fivePath, 'utf8')),
        progress: { ...five, contentVersion: 'w05.1' },
      }),
    ),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/06')
  await expect(page.locator('h1')).toHaveText('Hooks & routing')
  await walkWeekSix(page)
  await page.goto('/settings')
  const exportSix = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const sixPath = testInfo.outputPath('six-weeks.json')
  await (await exportSix).saveAs(sixPath)
  const six = JSON.parse(await readFile(sixPath, 'utf8')).progress
  expect(six.evidence).toHaveLength(124)
  expect(
    six.evidence.filter((entry: { id: string }) =>
      entry.id.startsWith('p1-w06-'),
    ),
  ).toHaveLength(23)
  expect(six.practicalDrafts['p1-w06-l10-c01'].code).toBeTruthy()
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page
    .getByLabel('Lesson to reset', { exact: true })
    .selectOption('p1-w06-l03')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/07')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-six.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...JSON.parse(await readFile(sixPath, 'utf8')),
        progress: { ...six, contentVersion: 'w06.1' },
      }),
    ),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/07')
  await expect(page.locator('h1')).toHaveText('Node & Express')
  await walkWeekSeven(page)
  await page.goto('/settings')
  const exportSeven = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const sevenPath = testInfo.outputPath('seven-weeks.json')
  await (await exportSeven).saveAs(sevenPath)
  const seven = JSON.parse(await readFile(sevenPath, 'utf8')).progress
  expect(seven.evidence).toHaveLength(148)
  expect(
    seven.evidence.filter((entry: { id: string }) =>
      entry.id.startsWith('p1-w07-'),
    ),
  ).toHaveLength(24)
  expect(seven.practicalDrafts['p1-w07-l06-c01'].code).toBeTruthy()
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page
    .getByLabel('Lesson to reset', { exact: true })
    .selectOption('p1-w07-l06')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/08')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-seven.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...JSON.parse(await readFile(sevenPath, 'utf8')),
        progress: { ...seven, contentVersion: 'w07.1' },
      }),
    ),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/08')
  await expect(page.locator('h1')).toHaveText('Full-stack integration')
  await walkWeekEight(page)
  await page.goto('/settings')
  const exportEight = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const eightPath = testInfo.outputPath('eight-weeks.json')
  await (await exportEight).saveAs(eightPath)
  const eight = JSON.parse(await readFile(eightPath, 'utf8')).progress
  expect(eight.evidence).toHaveLength(172)
  expect(
    eight.evidence.filter((entry: { id: string }) =>
      entry.id.startsWith('p1-w08-'),
    ),
  ).toHaveLength(24)
  expect(eight.practicalDrafts['p1-w08-l09-c02'].code).toBeTruthy()
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page
    .getByLabel('Lesson to reset', { exact: true })
    .selectOption('p1-w08-l07')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/09')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-eight.json',
    mimeType: 'application/json',
    buffer: Buffer.from(
      JSON.stringify({
        ...JSON.parse(await readFile(eightPath, 'utf8')),
        progress: { ...eight, contentVersion: 'w08.1' },
      }),
    ),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/09')
  await expect(page.locator('h1')).toHaveText('SQL & persistence')
  await walkWeekNine(page)
  await page.goto('/settings')
  const exportNine = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const ninePath = testInfo.outputPath('nine-weeks.json')
  await (await exportNine).saveAs(ninePath)
  const nine = JSON.parse(await readFile(ninePath, 'utf8')).progress
  expect(nine.evidence).toHaveLength(196)
  expect(
    nine.evidence.filter((entry: { id: string }) =>
      entry.id.startsWith('p1-w09-'),
    ),
  ).toHaveLength(24)
  expect(nine.practicalDrafts['p1-w09-l10-c02'].code).toBeTruthy()
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page
    .getByLabel('Lesson to reset', { exact: true })
    .selectOption('p1-w09-l07')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/10')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-nine.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      ...JSON.parse(await readFile(ninePath, 'utf8')),
      progress: { ...nine, contentVersion: 'w09.1' },
    })),
  })
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Confirm replacement' })
    .click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/10')
  await expect(page.locator('h1')).toHaveText('Authentication & sessions')
  await walkWeekTen(page)
  await page.goto('/settings')
  const exportTen = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const tenPath = testInfo.outputPath('ten-weeks.json')
  await (await exportTen).saveAs(tenPath)
  const { progress: ten } = JSON.parse(await readFile(tenPath, 'utf8'))
  expect(ten.contentVersion).toBe('w12.2')
  expect(ten.evidence).toHaveLength(220)
  expect(ten.evidence.filter((entry: { id: string }) => entry.id.startsWith('p1-w10-'))).toHaveLength(24)
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page.getByLabel('Lesson to reset', { exact: true }).selectOption('p1-w10-l08')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/11')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-ten.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      ...JSON.parse(await readFile(tenPath, 'utf8')),
      progress: { ...ten, contentVersion: 'w10.1' },
    })),
  })
  await page.getByRole('dialog').getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/11')
  await expect(page.locator('h1')).toHaveText('Testing & release')
  await walkWeekEleven(page)
  await page.goto('/settings')
  const exportEleven = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const elevenPath = testInfo.outputPath('eleven-weeks.json')
  await (await exportEleven).saveAs(elevenPath)
  const { progress: eleven } = JSON.parse(await readFile(elevenPath, 'utf8'))
  expect(eleven.contentVersion).toBe('w12.2')
  expect(eleven.evidence).toHaveLength(244)
  expect(eleven.evidence.filter((entry: { id: string }) => entry.id.startsWith('p1-w11-'))).toHaveLength(24)
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page.getByLabel('Lesson to reset', { exact: true }).selectOption('p1-w11-l08')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/12')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/settings')
  await page.locator('input[type=file]').setInputFiles({
    name: 'week-eleven.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      ...JSON.parse(await readFile(elevenPath, 'utf8')),
      progress: { ...eleven, contentVersion: 'w11.1' },
    })),
  })
  await page.getByRole('dialog').getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/course/week/12')
  await expect(page.locator('h1')).toHaveText('Full-stack capstone')
  await walkWeekTwelve(page)
  await page.goto('/course/week/12/lesson/01')
  const [capstoneDownload] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: 'Download the Week 12 capstone starter' }).click(),
  ])
  expect(capstoneDownload.suggestedFilename()).toBe('study-tasks-v12.zip')
  expect(await readFile((await capstoneDownload.path())!))
    .toEqual(await readFile('build/student-projects/study-tasks-v12.zip'))
  await page.goto('/settings')
  const exportTwelve = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const twelvePath = testInfo.outputPath('twelve-weeks.json')
  await (await exportTwelve).saveAs(twelvePath)
  const { progress: twelve } = JSON.parse(await readFile(twelvePath, 'utf8'))
  expect(twelve.contentVersion).toBe('w12.2')
  expect(twelve.evidence).toHaveLength(268)
  expect(twelve.evidence.find((entry: { id: string }) => entry.id === 'p1-w12-l11-c02')
    .responses.choice).toBe('Ready for local demo')
  await page.getByLabel('Reset scope').selectOption('lesson')
  await page.getByLabel('Lesson to reset', { exact: true }).selectOption('p1-w12-l08')
  await page.getByRole('button', { name: 'Preview reset' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/progress')
  await expect(page.getByText('Phase 1 complete', { exact: true })).toHaveCount(0)
  await page.goto('/settings')
  const hold = { ...twelve, evidence: twelve.evidence.map((entry: { id: string, responses?: Record<string, string> }) =>
    entry.id === 'p1-w12-l11-c02'
      ? { ...entry, responses: { ...entry.responses, choice: 'Hold' } }
      : entry,
  ) }
  await page.locator('input[type=file]').setInputFiles({
    name: 'capstone-hold.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      ...JSON.parse(await readFile(twelvePath, 'utf8')),
      progress: hold,
    })),
  })
  await expect(page.getByRole('status')).toContainText('Incomplete local project evidence.')
  await page.locator('input[type=file]').setInputFiles(twelvePath)
  await page.getByRole('dialog').getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto('/progress')
  await expect(page.getByText('Phase 1 complete', { exact: true })).toBeVisible()
})

test('practice review leaves no progress and the local JS fixture exposes only the lesson vocabulary', async ({
  page,
}) => {
  await page.goto(review + '07')
  const editor = page.getByLabel('JavaScript editor')
  const run = page.getByRole('button', { name: 'Run lab checks' })
  await editor.fill('function cleanTitle(s) { return location; }')
  await run.click()
  await expect(page.locator('.lab-result')).toContainText(
    'That name or operation is unavailable',
  )
  await editor.fill(
    'function cleanTitle(s) { return s.trim(); }\nfunction isValidTitle(s) { return s.trim().length > 0; }',
  )
  await run.click()
  await expect(page.locator('.practical-status')).toContainText(
    'Practice complete',
  )
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull()
})

test('broken heading, Add control and invalid-submit branch each withhold mastery', async ({
  page,
}) => {
  const examples = [
    [
      '02',
      '<!doctype html><html lang="en"><head><title>Study notes</title><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="styles.css"><script defer src="app.js"></script></head><body><main><h1 style="display:none">My tasks</h1></main></body></html>',
      3,
      '4 of 5',
    ],
    [
      '03',
      '<form><label for="task">Task title</label><input id="task" required><button type="button">Add</button><button type="submit">Save draft</button></form><section><h2>My tasks</h2><ul></ul></section>',
      3,
      '5 of 6',
    ],
    [
      '09',
      'function handleSubmit(event) { const title=input.value.trim(); if (!title) { message.textContent="Enter a title"; return; } event.preventDefault(); addTask(title); input.value=""; input.focus(); }',
      4,
      '5 of 6',
    ],
  ] as const
  for (const [id, submission, failedCheck, summary] of examples) {
    await page.goto(learner + id)
    await expect(page.getByRole('heading', { name: 'What you’ll be able to do' })).toBeVisible()
    await page.locator('#lab-code').fill(submission)
    await page.getByRole('button', { name: 'Run lab checks' }).click()
    if (id !== '02')
      await page
        .frameLocator('.lab-result iframe')
        .getByRole('button', { name: 'Test keyboard focus and run checks' })
        .press('Enter')
    await expect(page.locator('.lab-result h3')).toContainText(summary)
    await expect(
      page.locator('.lab-result li').nth(failedCheck - 1),
    ).toContainText('Try again')
    await expect(page.locator('.practical-status')).toBeEmpty()
  }
})
