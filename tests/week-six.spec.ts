import { answerQuizRetry } from './quiz-retry'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { weekSixQuizzes } from '../src/content/week-six-quizzes'
import {
  finishWeekSixQuiz,
  solutions,
  normalizeProgram,
  requestProgram,
} from './week-six-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/06/lesson/'

test('a fresh learner reviews 12 readings and both forms of each quiz without saving progress or using the public API', async ({
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
    const quiz = weekSixQuizzes.find((entry) =>
      entry.checkpoint.startsWith('p1-w06-l' + id),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await finishWeekSixQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await answerQuizRetry(page, 'p1-w06-l' + id)
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

test('Week 6 labs reject the wrong shape, missing signal and swallowed failure', async ({
  page,
}) => {
  const wrong = {
    '01-c02': [
      normalizeProgram.replace(
        'throw new Error("Expected a list of ideas")',
        'return []',
      ),
      normalizeProgram.replace('title.length > 100', 'title.length >= 100'),
    ],
    '10-c01': [
      requestProgram.replace('{signal: options.signal}', '{}'),
      requestProgram.replace(
        'if (!response.ok) throw new Error("HTTP " + response.status);',
        '',
      ),
      requestProgram
        .replace(
          'const response = await fetchImpl(IDEAS_URL, {signal: options.signal});',
          'try {\nconst response = await fetchImpl(IDEAS_URL, {signal: options.signal});',
        )
        .replace(
          'return normalizeIdeas(body);',
          'return normalizeIdeas(body);\n} catch (error) { return []; }',
        ),
    ],
  }
  for (const [key, code] of Object.entries(solutions)) {
    await page.goto(review + key.slice(0, 2))
    const lab = page.locator('#p1-w06-l' + key)
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

test('Lesson 1 downloads the reviewed Week 6 learner files', async ({
  page,
}) => {
  await page.goto(review + '01')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', { name: 'Download the Week 6 React starter' })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v6.zip')
  const digest = createHash('sha256')
    .update(await readFile((await download.path())!))
    .digest('hex')
  // Update only after reviewing the archive against the intended student files.
  expect(digest).toBe(
    '46472b6d08a5f51d6ca70b89b9a9a72b50fda2e288ae7d13a69598770eeb4374',
  )
})
