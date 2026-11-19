import { expect, type Page } from '@playwright/test'
import { weekTwelveQuizzes } from '../src/content/week-twelve-quizzes'
import { tryLab } from './week-four-journey'

export const dateProgram = `function isValidDateOnly(value) {
  const parts = dateParts(value);
  if (!parts) return false;
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = divisibleBy(year, 4) && (!divisibleBy(year, 100) || divisibleBy(year, 400));
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= days[month - 1];
}`

export const classificationProgram = `function classifyDue(task, today) {
  if (!task || typeof task.completed !== "boolean" || !isCalendarDate(today)) return "invalid";
  const due = task.dueDate;
  if (due !== null && !isCalendarDate(due)) return "invalid";
  if (task.completed || due === null) return "none";
  if (due < today) return "overdue";
  if (due === today) return "today";
  return due <= addCalendarDays(today, 7) ? "soon" : "later";
}`

export const labPrograms: Record<string, string> = {
  '05-c02': dateProgram,
  '08-c02': classificationProgram,
}

export async function finishWeekTwelveQuiz(page: Page, checkpoint: string, miss?: number) {
  const quiz = weekTwelveQuizzes.find((entry) => entry.checkpoint === checkpoint)!
  for (const [index, question] of quiz.questions.entries()) {
    await page.locator('.question').nth(index).getByRole('radio', {
      name: question.variants[0][index === miss ? 2 : 1],
      exact: true,
    }).check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}

export async function walkWeekTwelve(page: Page) {
  await page.goto('/progress')
  await expect(page.getByText('Phase 1 complete', { exact: true })).toHaveCount(0)
  await page.goto('/course/week/12/lesson/01')
  for (let n = 1; n <= 11; n++) {
    const id = String(n).padStart(2, '0')
    const prefix = 'p1-w12-l' + id
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()

    const key = id + '-c02'
    if (labPrograms[key]) {
      const lab = page.locator('#p1-w12-l' + key)
      await tryLab(lab, labPrograms[key])
      await expect(lab.locator('.practical-status')).toHaveText('Browser checkpoint passed.')
    }
    for (const form of await page.locator('form.local-project').all()) {
      if (n === 11) await form.getByLabel('Local demo decision').selectOption('Hold')
      for (const box of await form.getByRole('checkbox').all()) await box.check()
      for (const field of await form.getByRole('textbox').all()) {
        await field.fill('Synthetic evidence for the engineering navigation test.')
      }
      const submit = form.getByRole('button', { name: 'Confirm local work' })
      if (n === 11) {
        await expect(submit).toBeDisabled()
        await expect(form.getByRole('status')).toContainText('Hold keeps this checkpoint open')
        await page.reload()
        await expect(form.getByLabel('Local demo decision')).toHaveValue('Hold')
        await expect(form.getByRole('textbox').first()).toHaveValue('Synthetic evidence for the engineering navigation test.')
      } else {
        await submit.click()
        await expect(form.getByRole('checkbox').first()).toBeDisabled()
      }
    }
    if (n === 11) {
      await expect(page.getByRole('navigation', { name: 'Remaining lesson checks' }))
        .toContainText('2 checks left to complete Week 12')
    }
    await page.getByRole('button', { name: 'Start knowledge check' }).click()
    if (n === 6) {
      await finishWeekTwelveQuiz(page, prefix + '-c01', 4)
      await expect(page.getByRole('heading', { name: /Try again · 5\/6/ })).toBeVisible()
      await page.getByRole('button', { name: 'Retry with another example' }).click()
    }
    await finishWeekTwelveQuiz(page, prefix + '-c01')
    await expect(page.getByRole('heading', { name: /Quiz passed/ })).toBeVisible()
    if (n < 11) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await expect(page.getByText('Phase 1 complete', { exact: true })).toHaveCount(0)
  await expect(page.getByRole('navigation', { name: 'Remaining lesson checks' }))
    .toContainText('1 check left to complete Week 12')
  const final = page.locator('#p1-w12-l11-c02')
  await final.getByLabel('Local demo decision').selectOption('Ready for local demo')
  await final.getByRole('button', { name: 'Confirm local work' }).click()
  await expect(final.getByRole('checkbox').first()).toBeDisabled()
  await page.reload()
  await expect(page.getByRole('region', { name: 'Phase 1 completion' }))
    .toContainText('self-verified capstone work')
  await expect(page.getByRole('link', { name: /Week 13/ })).toHaveCount(0)
  await page.getByRole('link', { name: 'View your learning record' }).click()
  await expect(page).toHaveURL(/\/progress$/)
  await expect(page.getByText('Phase 1 complete', { exact: true })).toBeVisible()
}
