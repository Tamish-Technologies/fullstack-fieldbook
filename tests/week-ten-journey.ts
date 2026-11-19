import { expect, type Page } from '@playwright/test'
import { weekTenQuizzes } from '../src/content/week-ten-quizzes'
import { tryLab } from './week-four-journey'

export const credentialProgram = `function normalizeEmail(email) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}
function validateCredentials(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false };
  for (const key of Object.keys(body)) {
    if (key !== "email" && key !== "password") return { ok: false };
  }
  const email = normalizeEmail(body.email);
  const password = body.password;
  if (!isEmailAddress(email) || typeof password !== "string" ||
      password.length < 12 || password.length > 128) return { ok: false };
  return { ok: true, email, password };
}`

export const ownerProgram = `async function list(ownerId) {
  const result = await query("SELECT id FROM user_tasks WHERE owner_id = $1", [ownerId]);
  return result.rows;
}
async function get(ownerId, id) {
  const result = await query("SELECT id FROM user_tasks WHERE owner_id = $1 AND id = $2", [ownerId, id]);
  return result.rows.length ? result.rows[0] : null;
}
async function create(ownerId, title) {
  const result = await query("INSERT INTO user_tasks (owner_id, title) VALUES ($1, $2) RETURNING id", [ownerId, title]);
  return result.rows.length ? result.rows[0] : null;
}
async function setCompletion(ownerId, id, completed) {
  const result = await query("UPDATE user_tasks SET completed = $3 WHERE owner_id = $1 AND id = $2 RETURNING id", [ownerId, id, completed]);
  return result.rows.length ? result.rows[0] : null;
}
async function remove(ownerId, id) {
  const result = await query("DELETE FROM user_tasks WHERE owner_id = $1 AND id = $2", [ownerId, id]);
  return result.rowCount > 0;
}`
export const labPrograms: Record<string, string> = {
  '05-c02': credentialProgram,
  '08-c02': ownerProgram,
}

export async function finishWeekTenQuiz(page: Page, checkpoint: string, miss?: number) {
  const quiz = weekTenQuizzes.find((entry) => entry.checkpoint === checkpoint)!
  for (const [index, question] of quiz.questions.entries()) {
    await page.locator('.question').nth(index).getByRole('radio', {
      name: question.variants[0][index === miss ? 2 : 1],
      exact: true,
    }).check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}

export async function walkWeekTen(page: Page) {
  await page.goto('/course/week/11/lesson/01')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/10/lesson/01')
  for (let n = 1; n <= 12; n++) {
    const id = String(n).padStart(2, '0')
    const prefix = 'p1-w10-l' + id
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()

    const key = id + '-c02'
    if (labPrograms[key]) {
      const lab = page.locator('#p1-w10-l' + key)
      await tryLab(lab, labPrograms[key])
      await expect(lab.locator('.practical-status')).toHaveText('Browser checkpoint passed.')
    }
    for (const form of await page.locator('form.local-project').all()) {
      for (const box of await form.getByRole('checkbox').all()) await box.check()
      for (const field of await form.getByRole('textbox').all()) {
        await field.fill('Synthetic evidence for the engineering navigation test.')
      }
      await form.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(form.getByRole('checkbox').first()).toBeDisabled()
    }
    if (n === 12) {
      await expect(page.getByRole('navigation', { name: 'Remaining lesson checks' }))
        .toContainText('1 check left to complete Week 10')
      await expect(page.getByRole('link', { name: 'Open Week 11' })).toHaveCount(0)
    }
    await page.getByRole('button', { name: 'Start knowledge check' }).click()
    if (n === 8) {
      await finishWeekTenQuiz(page, prefix + '-c01', 1)
      await expect(page.getByRole('heading', { name: /Try again · 5\/6/ })).toBeVisible()
      await page.getByRole('button', { name: 'Retry with another example' }).click()
    }
    await finishWeekTenQuiz(page, prefix + '-c01')
    await expect(page.getByRole('heading', { name: /Quiz passed/ })).toBeVisible()
    if (n < 12) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText('Week 10 complete · includes self-verified local work')
  await page.getByRole('link', { name: 'Open Week 11' }).click()
  await expect(page).toHaveURL(/\/course\/week\/11$/)
  await expect(page.locator('h1')).toHaveText('Testing & release')
}
