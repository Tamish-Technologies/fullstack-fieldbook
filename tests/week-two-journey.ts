import { expect, type Page } from '@playwright/test'
import { weekTwoQuizzes } from '../src/content/week-two-quizzes'

export const solutions: Record<string, string> = {
  '01': 'function makeTasks(){return [{id:4,title:"A",completed:true},{id:8,title:"B",completed:false}]} const afterFirst=ts=>ts.slice(1); const secondTitle=ts=>ts[1].title; const size=ts=>ts.length;',
  '02': 'const normalizeTitle=t=>t.trim(); const isNonEmptyTitle=t=>normalizeTitle(t).length>0; const countActive=ts=>ts.filter(t=>!t.completed).length; function visitTitles(ts,visit){for(const t of ts){visit(t.title)}}',
  '03': 'const active=ts=>ts.filter(t=>!t.completed); const titles=ts=>ts.map(t=>t.title);const toggle=(ts,id)=>ts.map(t=>t.id===id?{...t,completed:!t.completed}:t);const lookup=(ts,id)=>ts.find(t=>t.id===id);const nextId=ts=>ts.reduce((n,t)=>Math.max(n,t.id),0)+1;',
  '05': 'function render(ts){clearRows();ts.forEach(t=>appendRow(t.id,t.title,t.completed,t.completed))}',
  '06': 'function update(ts,action,v){if(action==="add"){const title=v.trim();if(!title){warn("Enter a title");return ts}return [...ts,{id:ts.reduce((n,t)=>Math.max(n,t.id),0)+1,title:title,completed:false}]}if(action==="toggle")return ts.map(t=>t.id===v?{...t,completed:!t.completed}:t);return ts.filter(t=>t.id!==v)}',
  '07': 'function configure(t){titleText(t.title);checkbox("Complete "+t.title,"change",t.id);deleteControl("button",t.id);submitOn("submit");feedback("status","Enter a title");focusField()}',
  '08': 'const key="study-tasks-week2";function save(ts,s){try{s.setItem(key,JSON.stringify(ts));return true}catch{return false}}function load(s){try{const value=s.getItem(key);if(!value)return [];const ts=JSON.parse(value);return Array.isArray(ts)?ts.filter(isTask):[]}catch{return []}}const nextId=ts=>ts.reduce((n,t)=>Math.max(n,t.id),0)+1;',
  '09': 'function present(ts,mode){const visible=ts.filter(t=>mode==="all" || (mode==="active"?!t.completed:t.completed));showRows(visible);remaining(ts.filter(t=>!t.completed).length);emptyMessage(ts.length===0?"No tasks yet":visible.length===0?"No tasks match this filter":"");pressed(mode)}',
}
export async function runWeekTwoLab(
  page: Page,
  lesson: string,
  success: boolean,
) {
  if (success && lesson === '01')
    await page.getByRole('combobox').selectOption('property')
  if (success)
    await page.getByLabel('JavaScript editor').fill(solutions[lesson]!)
  await page.getByRole('button', { name: 'Run lab checks' }).click()
  if (lesson === '07')
    await page
      .frameLocator('.lab-result iframe')
      .getByRole('button', { name: 'Test keyboard focus and run checks' })
      .click()
  const result = page.locator('.lab-result')
  if (success) {
    await expect(result).toContainText(/\d+ of \d+ checks passed/)
    await expect(result.getByText('Try again', { exact: true })).toHaveCount(0)
    await expect(page.locator('.practical-status').first()).toContainText(
      /passed|Practice complete/,
    )
  } else {
    await expect(result).toContainText(/Try again|Revise and retry/)
    await expect(page.locator('.practical-status').first()).toBeEmpty()
  }
}
export async function walkWeekTwo(page: Page) {
  const base = '/course/week/02/lesson/'
  await page.goto(base + '02')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto(base + '01')
  for (let n = 1; n <= 11; n++) {
    const lesson = String(n).padStart(2, '0')
    await expect(page).toHaveURL(new RegExp(base + lesson + '$'))
    await expect(
      page.getByRole('heading', { name: 'Checkpoint requirements' }),
    ).toBeVisible()
    const remaining = page.getByRole('navigation', {
      name: 'Remaining lesson checks',
    })
    if (n === 1) {
      await expect(remaining).toContainText('2 checks left to open Lesson 2')
      await remaining
        .getByRole('link', { name: 'Give tasks stable IDs' })
        .click()
      await expect(page.locator('#p1-w02-l01-c02')).toBeFocused()
    }
    if (solutions[lesson]) await runWeekTwoLab(page, lesson, true)
    if (n === 1) {
      await expect(remaining).toContainText('1 check left to open Lesson 2')
      await remaining
        .getByRole('link', { name: 'End-of-lesson knowledge check' })
        .click()
      await expect(page.locator('#p1-w02-l01-c01')).toBeFocused()
    }
    for (const project of await page.locator('form.local-project').all()) {
      const select = project.getByRole('combobox')
      if (await select.count()) await select.selectOption({ index: 1 })
      for (const item of await project.getByRole('checkbox').all())
        await item.check()
      for (const note of await project.getByRole('textbox').all())
        await note.fill('Synthetic browser test of the confirmation form.')
      await project.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(project.getByRole('checkbox').first()).toBeDisabled()
    }
    const quiz = weekTwoQuizzes.find((q) =>
      q.checkpoint.startsWith('p1-w02-l' + lesson),
    )
    if (quiz) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      for (const [i, q] of quiz.questions.entries())
        await page
          .locator('.question')
          .nth(i)
          .getByRole('radio', { name: q.variants[0][1], exact: true })
          .check()
      await page.getByRole('button', { name: 'Check answers' }).click()
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 11) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await expect(page.locator('main')).toContainText(
    'includes self-verified local work',
  )
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'includes self-verified local work',
  )
}
