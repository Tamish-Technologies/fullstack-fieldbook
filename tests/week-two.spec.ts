import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { runWeekTwoLab, solutions } from './week-two-journey'

const review = 'http://127.0.0.1:4174/review/week/02/lesson/'
test('all Week 2 readings are reviewable without earning progress and unfinished labs fail', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto(review + '01')
  await expect(
    page.getByRole('navigation', { name: 'Review lessons' }).getByRole('link'),
  ).toHaveCount(11)
  for (let n = 1; n <= 11; n++) {
    const lesson = String(n).padStart(2, '0')
    await expect(page).toHaveURL(review + lesson)
    await expect(
      page.locator('article h2', { hasText: 'Worked example' }),
    ).toBeVisible()
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
    if ([1, 2, 3, 5, 6, 7, 8, 9].includes(n))
      await runWeekTwoLab(page, lesson, false)
    if (n < 11)
      await page.getByRole('link', { name: 'Review next lesson' }).click()
  }
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
  await page.goto('/review/week/02/lesson/01')
  await expect(page.locator('article')).toHaveCount(0)
})

test('a partial render and an incorrectly wired change event each withhold practice credit', async ({
  page,
}) => {
  const examples = [
    [
      '05',
      'function render(ts){ts.forEach(t=>appendRow(t.id,t.title,t.completed,t.completed))}',
      'Render twice without duplicates.',
    ],
    [
      '07',
      'function configure(t){titleText(t.title);checkbox("Finish "+t.title,"click",t.id);deleteControl("button",t.id);submitOn("submit");feedback("status","Enter a title");focusField()}',
      'Label the checkbox and toggle its own ID on change.',
    ],
  ]
  for (const [lesson, code, label] of examples) {
    await page.goto(review + lesson)
    await page.getByLabel('JavaScript editor').fill(code!)
    await page.getByRole('button', { name: 'Run lab checks' }).click()
    if (lesson === '07')
      await page
        .frameLocator('.lab-result iframe')
        .getByRole('button', { name: 'Test keyboard focus and run checks' })
        .click()
    await expect(
      page.locator('.lab-result li').filter({ hasText: label }),
    ).toContainText('Try again')
    await expect(page.locator('.practical-status')).toBeEmpty()
  }
})

test('a learner can review a missed essential, retry at tablet width and leave without recording a pass', async ({
  page,
}) => {
  await page.setViewportSize({ width: 834, height: 1000 })
  await page.goto(review + '09')
  await page.getByRole('button', { name: 'Start knowledge check' }).focus()
  await page.keyboard.press('Enter')
  const choices = [
    'Only the completed record',
    'Overwrite tasks with the active subset',
    '3',
    'No tasks match this filter',
    'aria-pressed',
  ]
  for (const [i, label] of choices.entries())
    await page
      .locator('.question')
      .nth(i)
      .getByRole('radio', { name: label, exact: true })
      .check()
  await page.getByRole('button', { name: 'Check answers' }).click()
  await expect(
    page.getByRole('heading', { name: 'Try again · 4/5 correct' }),
  ).toBeFocused()
  await page.getByRole('link', { name: /Question 2 · Filters/ }).click()
  await expect(page.locator('#p1-w02-l09-q02-feedback')).toBeFocused()
  await page.getByRole('button', { name: 'Retry with another example' }).click()
  await expect(page.getByRole('radio').first()).toBeFocused()
  choices[1] = 'Derive visible rows from the full tasks array'
  for (const [i, label] of choices.entries())
    await page
      .locator('.question')
      .nth(i)
      .getByRole('radio', { name: label, exact: true })
      .check()
  await page.getByRole('button', { name: 'Check answers' }).click()
  await expect(
    page.getByRole('heading', { name: 'Quiz passed · 5/5 correct' }),
  ).toBeFocused()
  expect(await page.evaluate(() => localStorage.length)).toBe(0)
})

test('Week 2 accepts ordinary counter loops and catches mistakes hidden by one input', async ({
  page,
}) => {
  const examples = [
    {
      lesson: '02',
      code: solutions['02']!.replace(
        'ts=>ts.filter(t=>!t.completed).length',
        'ts=>{let count=0;for(const task of ts){if(!task.completed)count+=1}return count}',
      ),
      score: '5 of 5',
    },
    {
      lesson: '02',
      code: solutions['02']!.replace(
        'ts=>ts.filter(t=>!t.completed).length',
        'ts=>{let count=0;ts.forEach(t=>{if(!t.completed)count++});return count}',
      ),
      score: '5 of 5',
    },
    {
      lesson: '03',
      code: solutions['03']!.replace(
        'completed:!t.completed',
        'completed:true',
      ),
      score: '5 of 6',
      hint: 'Try toggling a completed task',
    },
    {
      lesson: '08',
      code: solutions['08']!.replace(
        'ts.reduce((n,t)=>Math.max(n,t.id),0)+1',
        'ts.length?99:1',
      ),
      score: '5 of 6',
      hint: 'Try restoring IDs 2 and 99',
    },
    {
      lesson: '09',
      code: solutions['09']!.replace(
        'remaining(ts.filter(t=>!t.completed).length)',
        'remaining(2)',
      ),
      score: '6 of 7',
      hint: 'zero, one and two unfinished tasks',
    },
  ]
  for (const { lesson, code, score, hint } of examples) {
    await page.goto(review + lesson)
    await page.getByLabel('JavaScript editor').fill(code)
    await page.getByRole('button', { name: 'Run lab checks' }).click()
    await expect(page.locator('.lab-result h3')).toHaveText(
      score + ' checks passed',
    )
    if (hint) {
      await expect(page.locator('.lab-result .observed')).toContainText(hint)
      await expect(page.locator('.practical-status')).toBeEmpty()
    } else
      await expect(page.locator('.practical-status')).toContainText(
        'Practice complete',
      )
    await expect(page.locator('.lab-result iframe')).toBeHidden()
  }
})
