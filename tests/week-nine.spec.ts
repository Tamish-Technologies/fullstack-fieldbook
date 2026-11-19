import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { weekNineQuizzes } from '../src/content/week-nine-quizzes'
import {
  finishWeekNineQuiz,
  solutions,
  readProgram,
  writeProgram,
} from './week-nine-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/09/lesson/'

test('a fresh learner reviews 12 readings and both forms of each quiz without saving progress or using a backend', async ({
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
  for (let n = 1; n <= 12; n++) {
    const id = String(n).padStart(2, '0')
    await expect(page).toHaveURL(review + id)
    await page.getByText('Check your prediction', { exact: true }).click()
    await page.getByText('Hint 3', { exact: true }).click()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    const quiz = weekNineQuizzes.find((entry) =>
      entry.checkpoint.startsWith('p1-w09-l' + id),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await finishWeekNineQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await finishWeekNineQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n === 3 || n === 12)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    if (n < 12)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(external).toEqual([])
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})

test('Week 9 labs check row mapping and keep user values out of SQL text', async ({
  page,
}) => {
  const wrong = {
    '09-c03': [
      readProgram.replace('completed: row.completed', 'completed: true'),
      readProgram.replace(
        'const values = completed === null ? [] : [completed];',
        'const values = [];',
      ),
    ],
    '10-c02': [
      writeProgram.replace('VALUES ($1)', 'VALUES (" + title + ")'),
      writeProgram.replace('[id, completed]', '[id, completed || null]'),
    ],
  }
  for (const [key, code] of Object.entries(solutions)) {
    await page.goto(review + key.slice(0, 2))
    const lab = page.locator('#p1-w09-l' + key)
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

test('Lesson 1 downloads the reviewed Week 9 learner files', async ({
  page,
}) => {
  await page.goto(review + '01')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', {
        name: 'Download the Week 9 PostgreSQL starter',
      })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v9.zip')
  const digest = createHash('sha256')
    .update(await readFile((await download.path())!))
    .digest('hex')
  // Update only after reviewing the archive against the intended student files.
  expect(digest).toBe(
    '36997157103e991838e382cbf2dfdc0423af5e6ef1c3a0a6ac3122e278bb9650',
  )
})
