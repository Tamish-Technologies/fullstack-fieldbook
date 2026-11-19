import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { weekSevenQuizzes } from '../src/content/week-seven-quizzes'
import {
  finishWeekSevenQuiz,
  solutions,
  storeProgram,
  validationProgram,
} from './week-seven-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/07/lesson/'

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
    const quiz = weekSevenQuizzes.find((entry) =>
      entry.checkpoint.startsWith('p1-w07-l' + id),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await finishWeekSevenQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await finishWeekSevenQuiz(page, quiz.checkpoint)
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

test('Week 7 labs verify copies, stable IDs, explicit false and canonical IDs', async ({
  page,
}) => {
  const wrong = {
    '06-c01': [
      storeProgram.replace('id:nextId++', 'id:tasks.length + 1'),
      storeProgram.replace(
        'return row ? {...row} : null;',
        'return row || null;',
      ),
    ],
    '07-c01': [
      validationProgram.replace(
        'if (Object.hasOwn(body,"completed"))',
        'if (body.completed)',
      ),
      validationProgram.replace(' && String(id) === raw', ''),
    ],
  }
  for (const [key, code] of Object.entries(solutions)) {
    await page.goto(review + key.slice(0, 2))
    const lab = page.locator('#p1-w07-l' + key)
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

test('Lesson 1 downloads the reviewed Week 7 learner files', async ({
  page,
}) => {
  await page.goto(review + '01')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', { name: 'Download the Week 7 Node and React starter' })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v7.zip')
  const digest = createHash('sha256')
    .update(await readFile((await download.path())!))
    .digest('hex')
  // Update only after reviewing the archive against the intended student files.
  expect(digest).toBe(
    '30c9e32161ee79ec13cb510876c74ebd021a49725cedff21e54a3c593f3d9c7f',
  )
})
