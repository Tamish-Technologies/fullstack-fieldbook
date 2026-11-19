import { expect, type Page } from '@playwright/test'
import { weekSixQuizzes } from '../src/content/week-six-quizzes'
import { tryLab } from './week-four-journey'

export const normalizeProgram = `function normalizeIdeas(payload) {
  if (!Array.isArray(payload)) throw new Error("Expected a list of ideas");
  const ideas = [];
  for (const row of payload) {
    if (!row || typeof row !== "object" || Array.isArray(row)) continue;
    if (!Number.isSafeInteger(row.id) || row.id <= 0 || typeof row.title !== "string") continue;
    const title = row.title.trim();
    const id = "api-" + row.id;
    if (!title || title.length > 100 || ideas.some(idea => idea.id === id)) continue;
    ideas.push({id: id, title: title, completed: row.completed === true});
  }
  return ideas;
}`
export const requestProgram = `async function fetchIdeas(options) {
  const response = await fetchImpl(IDEAS_URL, {signal: options.signal});
  if (!response.ok) throw new Error("HTTP " + response.status);
  const body = await response.json();
  return normalizeIdeas(body);
}`

export const solutions: Record<string, string> = {
  '01-c02': normalizeProgram,
  '10-c01': requestProgram,
}

export async function finishWeekSixQuiz(
  page: Page,
  checkpoint: string,
  miss?: number,
) {
  const quiz = weekSixQuizzes.find((entry) => entry.checkpoint === checkpoint)!
  for (const [index, question] of quiz.questions.entries()) {
    await page
      .locator('.question')
      .nth(index)
      .getByRole('radio', {
        name: question.variants[0][index === miss ? 2 : 1],
        exact: true,
      })
      .check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}

export async function walkWeekSix(page: Page) {
  await page.goto('/course/week/07/lesson/01')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/06/lesson/01')
  for (let n = 1; n <= 12; n++) {
    const id = String(n).padStart(2, '0')
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()
    const prefix = 'p1-w06-l' + id
    for (const [key, code] of Object.entries(solutions).filter(([key]) =>
      key.startsWith(id),
    )) {
      const lab = page.locator('#p1-w06-l' + key)
      await tryLab(lab, code)
      await expect(lab.locator('.practical-status')).toHaveText(
        'Browser checkpoint passed.',
      )
    }
    for (const form of await page.locator('form.local-project').all()) {
      if (await form.getByRole('combobox').count())
        await form.getByRole('combobox').selectOption({ index: 1 })
      for (const box of await form.getByRole('checkbox').all())
        await box.check()
      for (const field of await form.getByRole('textbox').all())
        await field.fill(
          'Synthetic evidence for the engineering navigation test.',
        )
      await form.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(form.getByRole('checkbox').first()).toBeDisabled()
    }
    const quiz = weekSixQuizzes.find((entry) =>
      entry.checkpoint.startsWith(prefix),
    )
    if (quiz) {
      if (n === 12) {
        await expect(
          page.getByRole('navigation', { name: 'Remaining lesson checks' }),
        ).toContainText('1 check left to complete Week 6')
        await expect(
          page.getByRole('link', { name: 'Open Week 7' }),
        ).toHaveCount(0)
      }
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      if (n === 1) {
        await finishWeekSixQuiz(page, quiz.checkpoint, 4)
        await expect(
          page.getByRole('heading', { name: /Try again · 4\/5/ }),
        ).toBeVisible()
        await page
          .getByRole('button', { name: 'Retry with another example' })
          .click()
      }
      await finishWeekSixQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 12) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'Week 6 complete · includes self-verified local work',
  )
  await page.getByRole('link', { name: 'Open Week 7' }).click()
  await expect(page).toHaveURL(/\/course\/week\/07$/)
}
