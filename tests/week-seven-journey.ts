import { expect, type Page } from '@playwright/test'
import { weekSevenQuizzes } from '../src/content/week-seven-quizzes'
import { tryLab } from './week-four-journey'

export const storeProgram = `function createTaskStore(options) {
  let tasks = options.initialTasks.map(row => ({...row}));
  let nextId = tasks.reduce((max, row) => Math.max(max, row.id), 0) + 1;
  return {
    list(filter) {
      const selected = !filter || filter.completed === null ? tasks :
        tasks.filter(row => row.completed === filter.completed);
      return selected.map(row => ({...row}));
    },
    get(id) {
      const row = tasks.find(task => task.id === id);
      return row ? {...row} : null;
    },
    create(body) {
      const row = {id:nextId++, title:body.title, completed:false, createdAt:now()};
      tasks.push(row);
      return {...row};
    },
    update(id, patch) {
      const previous = tasks.find(row => row.id === id);
      if (!previous) return null;
      const updated = {...previous, ...patch};
      tasks = tasks.map(row => row.id === id ? updated : row);
      return {...updated};
    },
    remove(id) {
      const before = tasks.length;
      tasks = tasks.filter(row => row.id !== id);
      return tasks.length !== before;
    }
  };
}`
export const validationProgram = `function reject() {
  return {ok:false, message:"Check the input"};
}
function object(body) {
  return body && typeof body === "object" && !Array.isArray(body);
}
function titleOK(title) {
  return typeof title === "string" && title.trim().length >= 1 && title.trim().length <= 80;
}
function validateCreateBody(body) {
  if (!object(body) || !Object.hasOwn(body,"title") || Object.keys(body).length !== 1 || !titleOK(body.title)) return reject();
  return {ok:true, value:{title:body.title.trim()}};
}
function validatePatchBody(body) {
  if (!object(body)) return reject();
  const keys = Object.keys(body);
  if (!keys.length || keys.some(key => key !== "title" && key !== "completed")) return reject();
  let value = {};
  if (Object.hasOwn(body,"title")) {
    if (!titleOK(body.title)) return reject();
    value = {...value, title:body.title.trim()};
  }
  if (Object.hasOwn(body,"completed")) {
    if (typeof body.completed !== "boolean") return reject();
    value = {...value, completed:body.completed};
  }
  return {ok:true,value:value};
}
function parseTaskId(raw) {
  if (typeof raw !== "string") return null;
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 && String(id) === raw ? id : null;
}
function parseCompletedFilter(raw) {
  if (raw === undefined) return {ok:true,value:null};
  if (raw === "true") return {ok:true,value:true};
  if (raw === "false") return {ok:true,value:false};
  return reject();
}`
export const solutions: Record<string, string> = {
  '06-c01': storeProgram,
  '07-c01': validationProgram,
}

export async function finishWeekSevenQuiz(
  page: Page,
  checkpoint: string,
  miss?: number,
) {
  const quiz = weekSevenQuizzes.find(
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

export async function walkWeekSeven(page: Page) {
  await page.goto('/course/week/08/lesson/01')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/07/lesson/01')
  for (let n = 1; n <= 12; n++) {
    const id = String(n).padStart(2, '0')
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()
    const prefix = 'p1-w07-l' + id
    for (const [key, code] of Object.entries(solutions).filter(([key]) =>
      key.startsWith(id),
    )) {
      const lab = page.locator('#p1-w07-l' + key)
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
    const quiz = weekSevenQuizzes.find((entry) =>
      entry.checkpoint.startsWith(prefix),
    )
    if (quiz) {
      if (n === 12) {
        await expect(
          page.getByRole('navigation', { name: 'Remaining lesson checks' }),
        ).toContainText('1 check left to complete Week 7')
        await expect(
          page.getByRole('link', { name: 'Open Week 8' }),
        ).toHaveCount(0)
      }
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      if (n === 5) {
        await finishWeekSevenQuiz(page, quiz.checkpoint, 5)
        await expect(
          page.getByRole('heading', { name: /Try again · 5\/6/ }),
        ).toBeVisible()
        await page
          .getByRole('button', { name: 'Retry with another example' })
          .click()
      }
      await finishWeekSevenQuiz(page, quiz.checkpoint)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 12) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'Week 7 complete · includes self-verified local work',
  )
  await page.getByRole('link', { name: 'Open Week 8' }).click()
  await expect(page).toHaveURL(/\/course\/week\/08$/)
}
