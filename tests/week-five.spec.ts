import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {
  weekFiveSolutions,
  weekFiveQuiz,
  quizLessons,
} from './week-five-journey'
import { tryLab } from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/05/lesson/'

test('a fresh mobile reviewer can read all eleven React lessons, try labs and retry the quizzes offline', async ({
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
    await page.getByText('Hint 1', { exact: true }).click()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    if (n === 7)
      await expect(page.locator('form.local-project')).toContainText(
        'Use the regular lesson to save your observations',
      )
    if (n === 1 || n === 11)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    for (const key of Object.keys(weekFiveSolutions).filter((k) =>
      k.startsWith(id),
    )) {
      const lab = page.locator('#p1-w05-l' + key)
      await tryLab(lab, await lab.getByRole('textbox').inputValue())
      await expect(lab.locator('.lab-result')).toContainText(
        /Try again|Revise and retry/,
      )
      await expect(lab.locator('.practical-status')).toBeEmpty()
      if (n === 7) {
        await expect(
          lab.locator('.lab-result').getByRole('heading', { level: 3 }),
        ).toBeVisible()
        expect((await new AxeBuilder({ page }).analyze()).violations).toEqual(
          [],
        )
      }
    }
    if (quizLessons.includes(id)) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await weekFiveQuiz(page, id)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await weekFiveQuiz(page, id)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n !== 11)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(external).toEqual([])
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})

test('Week 5 pure labs accept working programs and reject a plausible mistake in each one', async ({
  page,
}) => {
  const alterations: Record<string, [string, string]> = {
    '07-c01': ['title.length>100', 'title.length>=100'],
    '08-c02': ['completed:!t.completed', 'completed:true'],
    '09-c02': ['tasks.filter(t=>!t.completed).length', '2'],
  }
  for (const [key, code] of Object.entries(weekFiveSolutions)) {
    await page.goto(review + key.slice(0, 2))
    const scope = page.locator('#p1-w05-l' + key)
    await tryLab(scope, code)
    await expect(scope.locator('.practical-status'), key).toContainText(
      'Practice complete',
    )
    await tryLab(scope, code.replace(...alterations[key]!))
    await expect(scope.locator('.lab-result'), key).toContainText(
      /Try again|Revise and retry/,
    )
  }
})

test('the setup lesson downloads the reviewed student-only project', async ({
  page,
}) => {
  await page.goto(review + '02')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page
      .getByRole('link', { name: 'Download the Week 5 React starter' })
      .click(),
  ])
  expect(download.suggestedFilename()).toBe('study-tasks-v5.zip')
  const file = await download.path()
  expect(file).toBeTruthy()
  // Re-audit all 15 archive entries before changing the reviewed digest.
  const digest = createHash('sha256')
    .update(await readFile(file!))
    .digest('hex')
  expect(digest).toBe(
    'a7773f9b50ba5ecd640f379904e2de325a54ef65fe4e846662ef48398268b558',
  )
})
