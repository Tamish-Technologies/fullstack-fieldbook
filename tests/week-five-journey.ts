import { expect, type Page } from '@playwright/test'
import { tryLab } from './week-four-journey'
export const weekFiveSolutions: Record<string, string> = {
  '07-c01': `function validateTitle(raw){
   const title=typeof raw==="string"?raw.trim():"";
   if(!title || title.length>100)return {ok:false,error:"Use 1 to 100 characters"};
   return {ok:true,title:title};
 }`,
  '08-c02': `function add(tasks,id,raw){
   if(!Number.isSafeInteger(id)||id<=0||tasks.some(t=>t.id===id)||typeof raw!=="string")return tasks;
   const title=raw.trim();
   if(!title || title.length>100)return tasks;
   return [...tasks,{id:id,title:title,completed:false}];
 }
 function toggle(tasks,id){return tasks.map(t=>t.id===id?{...t,completed:!t.completed}:t)}
 function remove(tasks,id){return tasks.filter(t=>t.id!==id)}`,
  '09-c02': `function visible(tasks,filter,query,sort){
   const q=query.trim().toLowerCase();
   const found=tasks.filter(t=>(filter==="all" || (filter==="active"?!t.completed:t.completed)) && t.title.toLowerCase().includes(q));
   return found.sort((a,b)=>sort==="oldest"?a.id-b.id:b.id-a.id);
 }
 function remaining(tasks){return tasks.filter(t=>!t.completed).length}`,
}
const answers: Record<string, string[]> = {
  '01': [
    'checked={task.completed}',
    'Update the affected DOM output',
    'Update the state owner with the changed record',
    'TaskItem',
    'React and JavaScript in the browser',
  ],
  '02': [
    'Run local development tooling',
    'src/main.jsx using createRoot',
    'Run npm install in the project folder',
    'package-lock.json',
  ],
  '03': [
    'A fragment',
    'htmlFor',
    '{task.title}',
    'Use a capitalized TaskItem tag',
    '{showHelp && <p>Hint</p>}',
    '<span>{task.title}</span>',
  ],
  '04': [
    'TaskList',
    'Each receives its own task prop',
    'No tasks match this view',
    'The stable task ID',
    'The task or an explicit id prop',
  ],
  '05': [
    'onClick={() => onDelete(task.id)}',
    'Call the supplied callback with the task ID',
    'Its task.id',
    'App, which owns tasks',
    'The prop name through App and TaskList',
  ],
  '06': [
    'The count captured by that render',
    'Call setCount(n => n + 1) twice',
    'At component top level before conditional returns',
    'Call setShowHelp to toggle visibility',
    'The component that renders the toggle and help',
    'Computing the same next state again',
  ],
  '08': [
    'A new array containing the old records and the new task',
    'The task object being mutated',
    'Compare each task ID with the supplied ID',
    'Filter the full previous tasks by the target ID',
    'Allocate and validate an unused positive safe integer',
    'On each TaskItem returned by map',
  ],
  '09': [
    'Their nearest common owner',
    'A view derived from tasks, status, query and sort',
    'Keep tasks intact and derive a filtered array',
    'All unfinished source tasks',
    'A derived or copied array',
  ],
  '10': [
    'The initializer function itself',
    'An effect depending on tasks and permission to save',
    'The complete browser origins',
    'Withhold writes and display the read error',
    'Read safely and avoid side effects',
  ],
  '11': [
    'Form callback, parent update, next render',
    'App’s state updater',
    'As an ordinary text child',
    'A function bound as the click handler',
    'task.id',
    'A new array and a fresh object for the matching ID',
    'A visible error and an editable draft',
    'Remaining from all source tasks',
    'Origin, key, initial read and save effect',
    'Repeat a sorted click and compare the ID received by App',
  ],
}
export const quizLessons = Object.keys(answers)
export async function weekFiveQuiz(
  page: Page,
  id: string,
  missEssential = false,
) {
  for (const [i, label] of answers[id]!.entries()) {
    const group = page.locator('.question').nth(i)
    if (missEssential && i === 2)
      await group
        .locator('label')
        .filter({ hasNotText: label })
        .first()
        .getByRole('radio')
        .check()
    else await group.getByRole('radio', { name: label, exact: true }).check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}
export async function walkWeekFive(page: Page) {
  await page.goto('/course/week/06')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/05/lesson/01')
  for (let n = 1; n <= 11; n++) {
    const id = String(n).padStart(2, '0')
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()
    for (const [key, code] of Object.entries(weekFiveSolutions).filter(
      ([key]) => key.startsWith(id),
    )) {
      const scope = page.locator('#p1-w05-l' + key)
      await tryLab(scope, code)
      await expect(scope.locator('.practical-status')).toHaveText(
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
          'Synthetic local checklist for the course navigation test.',
        )
      await form.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(form.getByRole('checkbox').first()).toBeDisabled()
    }
    if (quizLessons.includes(id)) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      if (n === 1) {
        await weekFiveQuiz(page, id, true)
        await expect(
          page.getByRole('heading', { name: /Try again · 4\/5/ }),
        ).toBeVisible()
        await page
          .getByRole('button', { name: 'Retry with another example' })
          .click()
      }
      await weekFiveQuiz(page, id)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 11) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'Week 5 complete · includes self-verified local work',
  )
  await page.getByRole('link', { name: 'Open Week 6' }).click()
  await expect(page.locator('h1')).toHaveText('Hooks & routing')
}
