import { answerQuizRetry } from './quiz-retry'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { weekTwelveQuizzes } from '../src/content/week-twelve-quizzes'
import {
  finishWeekTwelveQuiz,
  labPrograms,
  dateProgram,
  classificationProgram,
} from './week-twelve-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/12/lesson/'

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
    const quiz = weekTwelveQuizzes.find((entry) =>
      entry.checkpoint.startsWith('p1-w12-l' + id),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await finishWeekTwelveQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await answerQuizRetry(page, 'p1-w12-l' + id)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n === 1 || n === 11)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    if (n < 11)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(external).toEqual([])
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})

test('Week 12 labs validate Gregorian dates and deterministic due windows', async ({
  page,
}) => {
  const wrong = {
    '05-c02': [
      dateProgram.replace('leap ? 29 : 28', '29'),
      dateProgram.replace('month > 12', 'month >= 12'),
    ],
    '08-c02': [
      classificationProgram.replace('addCalendarDays(today, 7)', 'addCalendarDays(today, 8)'),
      classificationProgram.replace('task.completed || due', 'due'),
    ],
  }
  for (const [key, code] of Object.entries(labPrograms)) {
    await page.goto(review + key.slice(0, 2))
    const lab = page.locator('#p1-w12-l' + key)
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

test('Lesson 1 downloads the reviewed Week 12 learner files', async ({
  page,
}) => {
  await page.goto(review + '01')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', {
        name: 'Download the Week 12 capstone starter',
      })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v12.zip')
  const digest = createHash('sha256')
    .update(await readFile((await download.path())!))
    .digest('hex')
  // Update only after reviewing the archive against the intended student files.
  expect(digest).toBe(
    'c9c08208efe1bd8e39b9728490516bd8b07d38a4862e00ae9ecaf7cfdb069c4e',
  )
})
