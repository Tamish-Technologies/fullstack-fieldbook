import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { weekElevenQuizzes } from '../src/content/week-eleven-quizzes'
import {
  finishWeekElevenQuiz,
  labPrograms,
  logProgram,
  errorProgram,
} from './week-eleven-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/11/lesson/'

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
    const quiz = weekElevenQuizzes.find((entry) =>
      entry.checkpoint.startsWith('p1-w11-l' + id),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await finishWeekElevenQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await finishWeekElevenQuiz(page, quiz.checkpoint)
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

test('Week 11 labs check safe logs and public error mapping in isolation', async ({
  page,
}) => {
  const wrong = {
    '04-c02': [
      logProgram.replace('route: route', 'route: input.route'),
      logProgram.replace('input.elapsedMs < 0', 'input.elapsedMs <= 0'),
    ],
    '05-c02': [
      errorProgram.replace('message: "Try again when storage recovers."', 'message: error.message'),
      errorProgram.replace(' || hasDbClassPrefix(code)', ''),
    ],
  }
  for (const [key, code] of Object.entries(labPrograms)) {
    await page.goto(review + key.slice(0, 2))
    const lab = page.locator('#p1-w11-l' + key)
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

test('Lesson 1 downloads the reviewed Week 11 learner files', async ({
  page,
}) => {
  await page.goto(review + '01')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', {
        name: 'Download the Week 11 reliability starter',
      })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v11.zip')
  const digest = createHash('sha256')
    .update(await readFile((await download.path())!))
    .digest('hex')
  // Update only after reviewing the archive against the intended student files.
  expect(digest).toBe(
    '0d6b63573efc99c9edba493dce0d5ae6390b52867b0595746945e3bebd29bcb7',
  )
})
