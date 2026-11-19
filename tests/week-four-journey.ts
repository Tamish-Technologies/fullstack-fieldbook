import { expect, type Page, type Locator } from '@playwright/test'

export const weekFourSolutions: Record<string, string> = {
  '01-c02':
    'async function trace(label){mark(label);const value=await load();mark(value);mark("done");}',
  '02-c01':
    'function chain(){return load().then(n=>doubleLater(n)).catch(error=>null).finally(()=>cleanup());}',
  '03-c01':
    'async function read(){setLoading(true);try{const n=await load();return n;}catch(error){return null;}finally{setLoading(false);}}',
  '06-c01': `function normalize(rows,limit=8){
    if(!Array.isArray(rows)||!Number.isSafeInteger(limit)||limit<0) throw new Error("Invalid input");
    const out=[];
    for(const r of rows){
      if(r && Number.isSafeInteger(r.id) && r.id>0 && typeof r.title==="string" && typeof r.completed==="boolean"){
        const title=r.title.trim();
        if(title.length>0 && title.length<=100 && !out.some(t=>t.id===r.id) && out.length<limit)
          out.push({id:r.id,title:title,completed:r.completed});
      }
    }
    return out;
  }`,
  '07-c01':
    'async function request(){const response=await fetchImpl();if(!response.ok)throw new Error("HTTP "+response.status);const payload=await response.json();return normalizeIdeas(payload);}',
  '09-c01':
    'async function refresh(){setDisabled(true);show("loading",[]);try{const rows=await load();show(rows.length?"success":"empty",rows);}catch(e){show("error",[]);}finally{setDisabled(false);}}',
  '11-c01':
    'function offline(sample){return normalizeIdeas(sample);}function copy(tasks,idea){let high=0;for(const t of tasks){high=Math.max(high,t.id);}const next=[...tasks,{id:high+1,title:idea.title,completed:false}];save(next);return next;}',
  '11-c02':
    'function paint(idea,titleNode){titleNode.textContent=idea.title;addCopy(idea.id,"Copy "+idea.title);}function onCopy(){const id=nearestId();if(id!==null){copyById(id);announce("Task added");}}',
}

const answers: Record<string, string[]> = {
  '01': [
    'The remaining synchronous log',
    'After the current synchronous work',
    'Handle another click while the function waits',
    'Run in a later task when eligible',
    'A Promise covering the final mark',
  ],
  '03': [
    'A Promise for the returned value',
    'Await the row first',
    'Await the loader inside try',
    'finally',
    'After the first result supplies the ID',
  ],
  '04': [
    'The query',
    'GET',
    'Service temporarily unavailable',
    'An HTTP status returned by the server',
    'Content-Type header',
  ],
  '05': [
    '/ideas/17',
    'PATCH',
    'POST to the collection',
    'In the explicit local task save',
    'PUT',
  ],
  '06': [
    'A boolean',
    'Skip the invalid row',
    'Reject the unexpected root shape',
    'The first valid occurrence',
    'Create a fresh record with a trimmed title',
  ],
  '07': [
    'When the Response arrives',
    'Check ok and raise an HTTP error',
    'Check status, await JSON, validate the payload',
    'The JSON decoding operation',
    'Inject a fetch function that rejects',
  ],
  '08': [
    'Network',
    'A server answered the request',
    'Response body and Content-Type',
    'Whether the origin may read the response',
    'Inspect the error and use the same-origin fixture',
  ],
  '09': [
    'Immediately before awaiting the load',
    'Clear stale inbox rows and show loading',
    'Re-enable the Load control',
    'No ideas available',
    'A visible status and a reachable retry or offline action',
  ],
  '12': [
    'After awaiting the transport Response',
    'Check whether an HTTP response arrived',
    'Validate the payload against the idea schema',
    'Pass both through the same normalizer',
    'Assign textContent',
    'The original saved IDs, titles and flags',
    'Allocate a fresh local ID for each copy',
    'Supply a fake response with a known status',
    'Update a visible status region',
    'Run the same case before and after the change',
  ],
}
export async function tryLab(scope: Locator, code: string) {
  await scope.getByRole('textbox').fill(code)
  await scope.getByRole('button', { name: 'Run lab checks' }).click()
  await expect(scope.locator('.lab-result h3')).toHaveText(
    /checks passed|Revise and retry/,
  )
}
export async function weekFourQuiz(
  page: Page,
  id: string,
  missEssential = false,
) {
  for (const [i, label] of answers[id]!.entries()) {
    const question = page.locator('.question').nth(i)
    if (missEssential && i === 2)
      await question
        .locator('label')
        .filter({ hasNotText: label })
        .first()
        .getByRole('radio')
        .check()
    else await question.getByRole('radio', { name: label, exact: true }).check()
  }
  await page.getByRole('button', { name: 'Check answers' }).click()
}
export async function walkWeekFour(page: Page) {
  await page.goto('/course/week/05')
  await expect(page.locator('h1')).toHaveText('This section is locked')
  await page.goto('/course/week/04/lesson/01')
  for (const id of [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '11',
    '12',
  ]) {
    await expect(page).toHaveURL(new RegExp('lesson/' + id + '$'))
    await page.getByText('Check your prediction', { exact: true }).click()
    for (const [key, code] of Object.entries(weekFourSolutions).filter(
      ([key]) => key.startsWith(id),
    )) {
      const lab = page.locator('#p1-w04-l' + key)
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
      for (const note of await form.getByRole('textbox').all())
        await note.fill(
          'Synthetic checklist observation for the browser journey.',
        )
      await form.getByRole('button', { name: 'Confirm local work' }).click()
      await expect(form.getByRole('checkbox').first()).toBeDisabled()
    }
    if (answers[id]) {
      await page.getByRole('button', { name: 'Start knowledge check' }).click()
      if (id === '01') {
        await weekFourQuiz(page, id, true)
        await expect(
          page.getByRole('heading', { name: /Try again · 4\/5/ }),
        ).toBeVisible()
        await page
          .getByRole('button', { name: 'Retry with another example' })
          .click()
      }
      await weekFourQuiz(page, id)
      await expect(
        page.getByRole('heading', { name: /Quiz passed/ }),
      ).toBeVisible()
    }
    if (id === '09')
      await expect(
        page.getByRole('link', { name: /Optional detour/ }),
      ).toHaveAttribute('href', '/course/week/04/lesson/10')
    if (id !== '12')
      await page.getByRole('link', { name: /^Continue to / }).click()
  }
  await page.reload()
  await expect(page.locator('main')).toContainText(
    'Week 4 complete · includes self-verified local work',
  )
  await page.goto('/course/week/05')
  await expect(page.locator('h1')).toHaveText('React fundamentals')
}

export const quizLessons = Object.keys(answers)
