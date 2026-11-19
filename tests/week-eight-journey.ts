import { expect, type Page } from '@playwright/test'
import { weekEightQuizzes } from '../src/content/week-eight-quizzes'
import { tryLab } from './week-four-journey'

export const requestProgram = `async function receive(path, options) {
  try { return await fetchImpl(path, options); }
  catch (error) {
    if (isAbort(error)) throw error;
    throw new Error("NETWORK_ERROR");
  }
}
async function decode(response) {
  try { return await response.json(); }
  catch (error) { throw new Error("BAD_JSON"); }
}
function isTask(row) {
  return row && typeof row === "object" && !Array.isArray(row) &&
    Number.isSafeInteger(row.id) && row.id > 0 &&
    typeof row.title === "string" && row.title.trim().length > 0 &&
    typeof row.completed === "boolean" && typeof row.createdAt === "string";
}
async function requestTasks(path, options, expected) {
  const response = await receive(path, options);
  if (response.ok && response.status === 204 && expected === "none") return;
  if (!response.contentType.includes("application/json")) {
    throw new Error("NON_JSON_RESPONSE");
  }
  const payload = await decode(response);
  if (!response.ok) {
    const reason = payload && payload.error ? payload.error.message : "Request failed";
    throw new Error("HTTP " + response.status + " " + reason);
  }
  if (!payload || typeof payload !== "object") throw new Error("BAD_RESPONSE");
  const data = payload.data;
  if (expected === "list" && Array.isArray(data) && data.length === payload.count && data.every(isTask)) return data;
  if (expected === "task" && isTask(data)) return data;
  throw new Error("BAD_RESPONSE");
}`
export const solutions: Record<string, string> = {
  '03-c02': requestProgram,
  '07-c02': requestProgram,
  '09-c02': requestProgram,
}

export async function finishWeekEightQuiz(
  page: Page,
  checkpoint: string,
  miss?: number,
) {
  const quiz = weekEightQuizzes.find(
    (entry) => entry.checkpoint === checkpoint,
  )!
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

export async function walkWeekEight(page: Page) {
  await page.goto('/course/week/09/lesson/01')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/08/lesson/01')
  for (let n = 1; n <= 11; n++) {
    const id = String(n).padStart(2, '0')
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()
    const prefix = 'p1-w08-l' + id
    for (const [key, code] of Object.entries(solutions).filter(([key]) =>
      key.startsWith(id),
    )) {
      const lab = page.locator('#p1-w08-l' + key)
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
    const quiz = weekEightQuizzes.find((entry) =>
      entry.checkpoint.startsWith(prefix),
    )
    if (quiz) {
      if (n === 11) {
        await expect(
          page.getByRole('navigation', { name: 'Remaining lesson checks' }),
        ).toContainText('1 check left to complete Week 8')
        await expect(
          page.getByRole('link', { name: 'Open Week 9' }),
        ).toHaveCount(0)
      }
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      if (n === 1) {
        await finishWeekEightQuiz(page, quiz.checkpoint, 0)
        await expect(
          page.getByRole('heading', { name: /Try again · 4\/5/ }),
        ).toBeVisible()
        await page
          .getByRole('button', { name: 'Retry with another example' })
          .click()
      }
      await finishWeekEightQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 11) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'Week 8 complete · includes self-verified local work',
  )
  await page.getByRole('link', { name: 'Open Week 9' }).click()
  await expect(page).toHaveURL(/\/course\/week\/09$/)
}
