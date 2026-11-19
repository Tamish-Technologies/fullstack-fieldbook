import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {
  thirdWeekSolutions,
  weekThreeLab,
  weekThreeQuiz,
} from './week-three-journey'
const review = 'http://127.0.0.1:4174/review/week/03/lesson/'
test('fresh Week 3 practice profile can read all lessons, retry every quiz and earns no progress', async ({
  page,
}) => {
  test.setTimeout(90000)
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto(review + '01')
  for (let n = 1; n <= 11; n++) {
    await expect(page).toHaveURL(review + String(n).padStart(2, '0'))
    await page.getByText('Check your prediction', { exact: true }).click()
    await page.getByText('Hint 1', { exact: true }).click()
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    if (n === 1) {
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
      for (const name of ['index.html', 'app.js', 'styles.css', 'README.md'])
        await expect(
          page.getByRole('link', { name, exact: true }),
        ).toHaveAttribute('download', name)
    }
    if (thirdWeekSolutions[n]) {
      await weekThreeLab(
        page,
        n,
        await page.getByLabel('JavaScript editor').inputValue(),
      )
      await expect(page.locator('.lab-result')).toContainText(
        /Try again|Revise and retry/,
      )
      await expect(page.locator('.practical-status').first()).toBeEmpty()
    }
    if ([1, 2, 3, 4, 5, 7, 10, 11].includes(n)) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      await weekThreeQuiz(page, n)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
      await page
        .getByRole('button', { name: 'Retry with another example' })
        .click()
      await weekThreeQuiz(page, n)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 11)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})
test('Week 3 catches plausible but incorrect code and the wrong diagnosis', async ({
  page,
}) => {
  const cases = [
    [
      2,
      thirdWeekSolutions[2]!.replace('>100', '>=100'),
      'Accept a cleaned title',
    ],
    [
      3,
      thirdWeekSolutions[3]!.replace('[...rows]', 'rows'),
      'Preserve original order',
    ],
    [
      5,
      thirdWeekSolutions[5]!.replace(
        'dispatchAction(a,nearestId())',
        'dispatchAction(a,0)',
      ),
      'Route Edit and Delete',
    ],
    [
      6,
      thirdWeekSolutions[6]!.replace('key==="Escape"', 'true'),
      'Cancel and Escape',
    ],
    [
      7,
      thirdWeekSolutions[7]!.replace('ts.filter(t=>!t.completed).length', '2'),
      'Count all unfinished',
    ],
    [
      8,
      thirdWeekSolutions[8]!.replace(' && !result.some(r=>r.id===t.id)', ''),
      'first valid occurrence',
    ],
    [
      9,
      thirdWeekSolutions[9]!.replace(
        'JSON.stringify(actual)===JSON.stringify(expected)',
        'JSON.stringify(actual.map(t=>t.id))===JSON.stringify(expected.map(t=>t.id))',
      ),
      'incorrect or incomplete records',
    ],
    [9, thirdWeekSolutions[9]!, 'Identify the cause'],
  ] as const
  for (const [n, code, label] of cases) {
    await page.goto(review + String(n).padStart(2, '0'))
    await weekThreeLab(page, n, code, 'id')
    await expect(
      page.locator('.lab-result li').filter({ hasText: label }),
    ).toContainText('Try again')
    await expect(page.locator('.practical-status').first()).toBeEmpty()
  }
})
