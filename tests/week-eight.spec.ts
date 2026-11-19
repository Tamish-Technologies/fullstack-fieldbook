import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { weekEightQuizzes } from '../src/content/week-eight-quizzes'
import {
  finishWeekEightQuiz,
  solutions,
  requestProgram,
} from './week-eight-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/08/lesson/'

test('a fresh learner reviews 11 readings and both forms of each quiz without saving progress or using a backend', async ({
  page,
}) => {
  test.setTimeout(90000)
  await page.setViewportSize({ width: 320, height: 800 })
  const external: string[] = []
  await page.route(/^https?:\/\/(?!127\.0\.0\.1:4174\/)/, (route) => {
    external.push(route.request().url())
    return route.abort()
  })
  await page.goto(review + '01')
  for (let n = 1; n <= 11; n++) {
    const id = String(n).padStart(2, '0')
    await expect(page).toHaveURL(review + id)
    await page.getByText('Check your prediction', { exact: true }).click()
    await page.getByText('Hint 3', { exact: true }).click()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    const quiz = weekEightQuizzes.find((entry) =>
      entry.checkpoint.startsWith('p1-w08-l' + id),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await finishWeekEightQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await finishWeekEightQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n === 3 || n === 11)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    if (n < 11)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(external).toEqual([])
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})

test('Week 8 labs reject false success, decoding 204 and invalid server IDs', async ({
  page,
}) => {
  const wrong = {
    '03-c02': [
      requestProgram.replace('if (!response.ok)', 'if (false)'),
      requestProgram.replace('fetchImpl(path, options)', 'fetchImpl(path, {})'),
    ],
    '07-c02': [
      requestProgram.replace(
        'if (response.ok && response.status === 204 && expected === "none") return;',
        '',
      ),
      requestProgram.replace('if (!response.ok)', 'if (false)'),
    ],
    '09-c02': [
      requestProgram.replace(
        'Number.isSafeInteger(row.id) && row.id > 0 &&',
        '',
      ),
      requestProgram.replace(
        'throw new Error("BAD_JSON")',
        'throw new Error("NETWORK_ERROR")',
      ),
    ],
  }
  for (const [key, code] of Object.entries(solutions)) {
    await page.goto(review + key.slice(0, 2))
    const lab = page.locator('#p1-w08-l' + key)
    await tryLab(lab, await lab.getByRole('textbox').inputValue())
    await expect(lab.locator('.lab-result')).toContainText(
      /Try again|Revise and retry/,
    )
    await tryLab(lab, code)
    await expect(lab.locator('.practical-status')).toContainText(
      'Practice complete',
    )
    for (const variant of wrong[key as keyof typeof wrong]) {
      await tryLab(lab, variant)
      await expect(lab.locator('.lab-result')).toContainText(
        /Try again|Revise and retry/,
      )
    }
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
  }
})

test('Lesson 1 downloads the reviewed Week 8 learner files', async ({
  page,
}) => {
  await page.goto(review + '01')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', {
        name: 'Download the Week 8 React and Express starter',
      })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v8.zip')
  const digest = createHash('sha256')
    .update(await readFile((await download.path())!))
    .digest('hex')
  // Update only after reviewing the archive against the intended student files.
  expect(digest).toBe(
    'e0f873e19b26c0004b9e9f8f04edb2064fd702233f11c874d4d3df41492da670',
  )
})
