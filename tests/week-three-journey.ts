import { expect, type Page } from '@playwright/test'

export const thirdWeekSolutions: Record<number, string> = {
  1: 'function countRemaining(rows){let n=0;for(const row of rows){if(!row.completed)n++}return n}',
  2: 'function rename(rows,id,raw){if(typeof raw!=="string")return rows;const title=raw.trim();if(!title || title.length>100)return rows;return rows.map(t=>t.id===id?{...t,title}:t)}',
  3: 'function ordered(rows,mode){return [...rows].sort((a,b)=>mode==="oldest"?a.id-b.id:b.id-a.id)}',
  5: 'function install(){listenList("click");listenList("change")}function route(kind){const a=nearestAction();if(kind==="click" && (a==="edit" || a==="delete"))dispatchAction(a,nearestId());if(kind==="change" && a==="toggle")dispatchAction(a,nearestId())}',
  6: 'function handle(action,id,value){if(action==="edit"){openEditor(id);return}if(action==="cancel"){closeEditor();return}const title=value.trim();if(!title || title.length>100){showError("Enter 1 to 100 characters.");return}commitTitle(id,title);closeEditor()}const cancels=key=>key==="Escape";',
  7: 'function visible(rows,status,query,mode){const q=query.trim().toLowerCase();return rows.filter(t=>(status==="all" || (status==="completed"?t.completed:!t.completed)) && t.title.toLowerCase().includes(q)).sort((a,b)=>mode==="oldest"?a.id-b.id:b.id-a.id)}const remaining=ts=>ts.filter(t=>!t.completed).length;const message=(ts,v)=>ts.length?(v.length?"":"no-match"):"empty";',
  8: 'function restore(raw){try{const parsed=JSON.parse(raw);if(!Array.isArray(parsed))return [];const result=[];for(const t of parsed){if(isTask(t) && !result.some(r=>r.id===t.id))result.push(t)}return result}catch{return []}}',
  9: 'function verify(tasks){const before=JSON.stringify(tasks);const expected=tasks.slice().sort((a,b)=>a.id-b.id);const actual=orderUnderTest(tasks);return JSON.stringify(actual)===JSON.stringify(expected) && before===JSON.stringify(tasks)}',
}
const responses: Record<number, string[]> = {
  1: [
    'Saving a renamed task',
    'In the source array',
    'Writing to storage',
    'Use its stored ID against the full model',
    'Whether the helper changed its input',
  ],
  2: [
    'The trimmed title',
    '101',
    'Keep every original record unchanged',
    'Its numeric ID',
    'Explain the rejection and allow correction',
  ],
  3: [
    '4',
    'Its visible index',
    'Copy the array before sorting',
    'Relative creation order',
    '12, 4, 19',
  ],
  4: [
    'The data logic module',
    './task-logic.js',
    'Serve the project folder over local HTTP',
    'A 404 for the imported URL',
    'It delivers files and the browser runs the edits',
  ],
  5: [
    'The containing list',
    'On the stable list container',
    'Find the nearest action control inside the list and read its ID',
    'Change and submit',
    'Ignore it',
  ],
  7: [
    'Trim the query and compare lowercased text',
    'Practice CSS only',
    'Keep the original collection without a save',
    '2',
    'No tasks match this view',
  ],
  10: [
    'The original record order',
    'The target title and unaffected records before and after',
    'Understand its inputs, effects and purpose',
    'Which unstaged tracked lines changed',
    'One reproducible defect and one acceptance test',
  ],
  11: [
    'Validate, update the model, save, redraw',
    'The control’s stable numeric ID',
    'The input array order',
    '100 characters',
    'Discard the draft and return focus',
    'The import path relative to the importing file',
    'Assign literal text with textContent',
    'Larger numeric ID first',
    'The first valid record for each ID',
    'It fails with the original defect and passes with the repair',
  ],
}
export async function weekThreeLab(
  page: Page,
  n: number,
  code: string,
  concept = 'mutation',
) {
  await page.getByLabel('JavaScript editor').fill(code)
  if (n === 9) await page.getByRole('combobox').selectOption(concept)
  await page.getByRole('button', { name: 'Run lab checks' }).click()
  if (n === 6) {
    const start = page
      .frameLocator('.lab-result iframe')
      .getByRole('button', { name: /Test keyboard/ })
    await start.focus()
    await start.press('Enter')
  }
  await expect(page.locator('.lab-result h3')).toHaveText(
    /checks passed|Revise and retry/,
  )
}
export async function weekThreeQuiz(page: Page, n: number, wrong = false) {
  for (const [i, label] of responses[n]!.entries()) {
    const group = page.locator('.question').nth(i)
    if (wrong && i === 3) {
      const other = group.locator('label').filter({ hasNotText: label }).first()
      await other.getByRole('radio').check()
    } else await group.getByRole('radio', { name: label, exact: true }).check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}
export async function walkWeekThree(page: Page) {
  await page.goto('/course/week/03/lesson/02')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/03/lesson/01')
  for (let n = 1; n <= 11; n++) {
    await expect(page).toHaveURL(
      new RegExp('/course/week/03/lesson/' + String(n).padStart(2, '0') + '$'),
    )
    await page.getByText('Check your prediction', { exact: true }).click()
    if (n === 9) {
      const draft = '// Keep my sort experiment here while I review the reading.'
      await page.getByLabel('JavaScript editor').fill(draft)
      await page.getByRole('combobox', { name: /Why did drawing Oldest/ }).selectOption('mutation')
      await page.waitForFunction((source) => {
        const raw = localStorage.getItem('fullstack-fieldbook.phase1.w01.v1')
        const saved = raw && JSON.parse(raw).practicalDrafts?.['p1-w03-l09-c01']
        return saved?.code === source && saved.concept === 'mutation'
      }, draft)
      await page.reload()
      await expect(page.getByLabel('JavaScript editor')).toHaveValue(draft)
      await expect(page.getByRole('combobox', { name: /Why did drawing Oldest/ })).toHaveValue('mutation')
    }
    if (thirdWeekSolutions[n]) {
      await weekThreeLab(page, n, thirdWeekSolutions[n]!)
      await expect(page.locator('.lab-result')).not.toContainText('Try again')
      await expect(
        page.getByText('Browser checkpoint passed.', { exact: true }),
      ).toBeVisible()
    }
    for (const form of await page.locator('form.local-project').all()) {
      if (await form.getByRole('combobox').count())
        await form.getByRole('combobox').selectOption({ index: 1 })
      for (const box of await form.getByRole('checkbox').all())
        await box.check()
      for (const note of await form.getByRole('textbox').all())
        await note.fill('Synthetic local checklist flow verification.')
      await form.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(form.getByRole('checkbox').first()).toBeDisabled()
    }
    if (responses[n]) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      if (n === 1) {
        await weekThreeQuiz(page, n, true)
        await expect(
          page.getByRole('heading', { name: 'Try again · 4/5 correct' }),
        ).toBeFocused()
        await expect(
          page.getByRole('navigation', { name: 'Remaining lesson checks' }),
        ).toContainText('1 check left')
        await page
          .getByRole('button', { name: 'Retry with another example' })
          .click()
      }
      await weekThreeQuiz(page, n)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (n < 11) await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'Week 3 complete · includes self-verified local work',
  )
}
