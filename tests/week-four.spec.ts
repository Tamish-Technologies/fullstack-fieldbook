import { answerQuizRetry } from './quiz-retry'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {
  weekFourSolutions,
  weekFourQuiz,
  quizLessons,
  tryLab,
} from './week-four-journey'
const review = 'http://127.0.0.1:4174/review/week/04/lesson/'

test('a fresh mobile reviewer can read all twelve lessons, try labs and retry the quizzes offline', async ({
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
    await page.getByText('Hint 1', { exact: true }).click()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    if (n === 1 || n === 11)
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
    for (const key of Object.keys(weekFourSolutions).filter((k) =>
      k.startsWith(id),
    )) {
      const lab = page.locator('#p1-w04-l' + key)
      await tryLab(lab, await lab.getByRole('textbox').inputValue())
      await expect(lab.locator('.lab-result')).toContainText(
        /Try again|Revise and retry/,
      )
      await expect(lab.locator('.practical-status')).toBeEmpty()
    }
    if (quizLessons.includes(id)) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await weekFourQuiz(page, id)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await answerQuizRetry(page, 'p1-w04-l' + id)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n !== 12)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(external).toEqual([])
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})

test('Week 4 labs accept working programs and reject a plausible mistake in each one', async ({
  page,
}) => {
  const alterations: Record<string, [string, string]> = {
    '01-c02': ['mark(value)', 'mark(label)'],
    '02-c01': ['n=>doubleLater(n)', 'n=>{doubleLater(n)}'],
    '03-c01': ['setLoading(false)', 'setLoading(true)'],
    '06-c01': ['title.length<=100', 'title.length<100'],
    '07-c01': ['if(!response.ok)', 'if(false)'],
    '09-c01': ['"success":"empty"', '"success":"error"'],
    '11-c01': ['high+1', 'idea.id'],
    '11-c02': ['copyById(id)', 'copyById(4)'],
  }
  for (const [key, code] of Object.entries(weekFourSolutions)) {
    await page.goto(review + key.slice(0, 2))
    const scope = page.locator('#p1-w04-l' + key)
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
