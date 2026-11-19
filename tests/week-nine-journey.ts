import { expect, type Page } from '@playwright/test'
import { weekNineQuizzes } from '../src/content/week-nine-quizzes'
import { tryLab } from './week-four-journey'

const mapRow = `function toApiTask(row) {
  if (!row) return null;
  return { id: row.id, title: row.title, completed: row.completed,
    createdAt: toIsoTimestamp(row.created_at) };
}`
export const readProgram =
  mapRow +
  `
async function listTasks(completed) {
  const text = "SELECT id, title, completed, created_at FROM tasks";
  const filter = completed === null ? "" : " WHERE completed = $1";
  const values = completed === null ? [] : [completed];
  const result = await query(text + filter + " ORDER BY id", values);
  return result.rows.map(toApiTask);
}
async function getTask(id) {
  const result = await query("SELECT id, title, completed, created_at FROM tasks WHERE id = $1", [id]);
  return toApiTask(result.rows[0]);
}`
export const writeProgram =
  mapRow +
  `
async function insertTask(title) {
  const result = await query("INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, completed, created_at", [title]);
  return toApiTask(result.rows[0]);
}
async function setCompletion(id, completed) {
  const result = await query("UPDATE tasks SET completed = $2 WHERE id = $1 RETURNING id, title, completed, created_at", [id, completed]);
  return toApiTask(result.rows[0]);
}`
export const solutions: Record<string, string> = {
  '09-c03': readProgram,
  '10-c02': writeProgram,
}

export async function finishWeekNineQuiz(
  page: Page,
  checkpoint: string,
  miss?: number,
) {
  const quiz = weekNineQuizzes.find((entry) => entry.checkpoint === checkpoint)!
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

export async function walkWeekNine(page: Page) {
  await page.goto('/course/week/10/lesson/01')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/09/lesson/01')
  for (let n = 1; n <= 12; n++) {
    const id = String(n).padStart(2, '0')
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()
    const prefix = 'p1-w09-l' + id
    for (const [key, code] of Object.entries(solutions).filter(([key]) =>
      key.startsWith(id),
    )) {
      const lab = page.locator('#p1-w09-l' + key)
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
    const quiz = weekNineQuizzes.find((entry) =>
      entry.checkpoint.startsWith(prefix),
    )
    if (quiz) {
      if (n === 12) {
        await expect(
          page.getByRole('navigation', { name: 'Remaining lesson checks' }),
        ).toContainText('1 check left to complete Week 9')
        await expect(
          page.getByRole('link', { name: 'Open Week 10' }),
        ).toHaveCount(0)
      }
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      if (n === 6) {
        await finishWeekNineQuiz(page, quiz.checkpoint, 5)
        await expect(
          page.getByRole('heading', { name: /Try again · 5\/6/ }),
        ).toBeVisible()
        await page
          .getByRole('button', { name: 'Retry with another example' })
          .click()
      }
      await finishWeekNineQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 12) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'Week 9 complete · includes self-verified local work',
  )
  await page.getByRole('link', { name: 'Open Week 10' }).click()
  await expect(page).toHaveURL(/\/course\/week\/10$/)
}
