import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { weekTenQuizzes } from '../src/content/week-ten-quizzes'
import {
  finishWeekTenQuiz,
  labPrograms,
  credentialProgram,
  ownerProgram,
} from './week-ten-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/10/lesson/'

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
    const quiz = weekTenQuizzes.find((entry) =>
      entry.checkpoint.startsWith('p1-w10-l' + id),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await finishWeekTenQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await finishWeekTenQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n === 1 || n === 12)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    if (n < 12)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(external).toEqual([])
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})

test('Week 10 labs check credentials and owner query bindings in isolation', async ({
  page,
}) => {
  const wrong = {
    '05-c02': [
      credentialProgram.replace('const password = body.password;', 'const password = body.password.trim();'),
      credentialProgram.replace('return { ok: false };\n  }', 'continue;\n  }'),
    ],
    '08-c02': [
      ownerProgram.replace('DELETE FROM user_tasks WHERE owner_id = $1 AND id = $2', 'DELETE FROM user_tasks WHERE id = $2'),
      ownerProgram.replace('[ownerId, id, completed]', '[ownerId, id, completed || null]'),
    ],
  }
  for (const [key, code] of Object.entries(labPrograms)) {
    await page.goto(review + key.slice(0, 2))
    const lab = page.locator('#p1-w10-l' + key)
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

test('Lesson 1 downloads the reviewed Week 10 learner files', async ({
  page,
}) => {
  await page.goto(review + '01')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', {
        name: 'Download the Week 10 authentication starter',
      })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v10.zip')
  const digest = createHash('sha256')
    .update(await readFile((await download.path())!))
    .digest('hex')
  // Update only after reviewing the archive against the intended student files.
  expect(digest).toBe(
    '4d909b571af495813b7dfc7b6c25e6f90b78750051a8ad5c2918e9b8a85dbb9c',
  )
})
