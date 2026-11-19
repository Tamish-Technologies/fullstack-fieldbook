import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFile } from 'node:fs/promises'

const first = '/course/week/01/lesson/01'
const second = '/course/week/01/lesson/02'
const key = 'fullstack-fieldbook.phase1.w01.v1'
const stamp = '2026-11-18T00:00:00.000Z'
const quiz = {
  id: 'p1-w01-l01-c01',
  method: 'quiz-auto',
  at: stamp,
  correct: 4,
  scored: 5,
  essentials: 0,
  essentialsCorrect: 0,
}
const progress = {
  schemaVersion: 1,
  contentVersion: 'w01.1',
  courseId: 'phase-1-full-stack',
  updatedAt: stamp,
  theme: 'dark',
  lastLessonId: 'p1-w01-l02',
  attempts: {},
  evidence: [quiz],
  notes: { 'p1-w01-l01': 'D2_ONLY_TEST_FIXTURE' },
}
function payload(p = progress) {
  return JSON.stringify({
    format: 'fullstack-fieldbook-progress',
    exportedAt: stamp,
    progress: p,
  })
}
async function upload(page: Page, body: string) {
  await page.getByLabel('Import backup', { exact: true }).setInputFiles({
    name: 'backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from(body),
  })
}
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
}
async function accessible(page: Page) {
  const report = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  expect(
    report.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([])
}
test('first visit, direct locked URL, history and local note survive reload', async ({
  page,
}) => {
  const remote: string[] = []
  page.on('request', (r) => {
    if (!r.url().startsWith('http://127.0.0.1:4173')) remote.push(r.url())
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Learn the web',
  )
  await page.getByRole('link', { name: 'Begin Week 01' }).click()
  await page
    .getByLabel('Your private note for this lesson')
    .fill('<b>Private field note</b>')
  await page.getByRole('button', { name: 'Save field note' }).click()
  await expect(page.getByText('Field note saved.', { exact: true })).toBeVisible()
  await page.reload()
  await expect(
    page.getByLabel('Your private note for this lesson'),
  ).toHaveValue('<b>Private field note</b>')
  await page.goto('/course/week/02/lesson/01')
  await expect(
    page.getByRole('heading', { name: 'This section is locked' }),
  ).toBeVisible()
  await page.getByRole('link', { name: /Open Orientation/ }).click()
  await expect(page).toHaveURL(new RegExp(first + '$'))
  await page.goBack()
  await expect(
    page.getByRole('heading', { name: 'This section is locked' }),
  ).toBeVisible()
  await page.goto('/')
  await expect(
    page.getByRole('link', { name: 'Resume lesson' }),
  ).toHaveAttribute('href', first)
  await page.goto('/course')
  await expect(page.locator('.week-card')).toHaveCount(12)
  await page.goto('/progress')
  await expect(
    page.getByText('0 of 268 required checkpoints recorded.'),
  ).toBeVisible()
  expect(remote).toEqual([])
})
test('backup round trip, confirmed restore, reset cascade, backup offer and safe focus', async ({
  page,
}) => {
  await page.goto('/settings')
  await upload(page, payload())
  const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText('Backup: 1 completed lesson, 1 checkpoint')
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.getByLabel('Import backup', { exact: true })).toBeFocused()
  await upload(page, payload())
  await dialog.getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  const download = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const downloaded = await download
  expect(
    JSON.parse(await readFile((await downloaded.path())!, 'utf8')).progress
      .evidence,
  ).toEqual([quiz])
  await page.goto(second)
  await expect(
    page.getByRole('heading', { name: 'What you’ll be able to do' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: /Browser lab · Build a semantic page/ }),
  ).toBeVisible()
  await page.goto('/settings')
  await page.getByLabel('Reset scope').selectOption('week')
  const trigger = page.getByRole('button', { name: 'Preview reset' })
  await trigger.click()
  await expect(dialog).toContainText('138 lesson slots in scope')
  await expect(dialog).toContainText('1 checkpoint record and 0 field notes')
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await trigger.click()
  await dialog.getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Progress updated')
  await page.goto(second)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Semantic HTML',
  )
  await page.goto('/course/week/02')
  await expect(
    page.getByRole('heading', { name: 'This section is locked' }),
  ).toBeVisible()
  await page.goto(first)
  await expect(
    page.getByLabel('Your private note for this lesson'),
  ).toHaveValue('D2_ONLY_TEST_FIXTURE')
  await page.goto('/settings')
  await page.getByLabel('Reset scope').selectOption('course')
  await trigger.click()
  await dialog.getByRole('button', { name: 'Continue to confirmation' }).click()
  await expect(dialog.getByRole('heading')).toHaveText(
    'Confirm full course reset',
  )
  await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused()
  await dialog.getByRole('button', { name: 'Reset entire course' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'system')
  expect(
    JSON.parse((await page.evaluate((k) => localStorage.getItem(k), key))!)
      .notes,
  ).toEqual({})
})
test('bad imports preserve the exact saved record', async ({ page }) => {
  await page.goto('/settings')
  await page.getByRole('radio', { name: 'dark', exact: true }).check()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  const original = await page.evaluate((k) => localStorage.getItem(k), key)
  for (const [body, message] of [
    ['{', 'Malformed'],
    [payload({ ...progress, lastLessonId: 'unknown' }), 'Unknown resume'],
    [' '.repeat(512 * 1024 + 1), '512 KiB'],
    [payload({ ...progress, schemaVersion: 2 }), 'Unsupported schema'],
  ]) {
    await upload(page, body!)
    await expect(page.getByRole('status')).toContainText(message!)
    expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBe(
      original,
    )
  }
})
for (const width of [320, 834, 1440])
  test(
    'responsive reading, focus and contrast at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' })
      await page.goto('/')
      await page.keyboard.press('Tab')
      await expect(
        page.getByRole('link', { name: 'Skip to main content' }),
      ).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('main')).toBeFocused()
      await noOverflow(page)
      await accessible(page)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({
        path: test.info().outputPath('dashboard-' + width + '.png'),
      })
      if (width < 1024) {
        const menu = page.getByRole('button', { name: 'Course menu' })
        await menu.focus()
        await page.keyboard.press('Enter')
        const drawer = page.getByRole('dialog')
        await expect(
          drawer.getByRole('button', { name: 'Close menu' }),
        ).toBeFocused()
        await page.keyboard.press('Shift+Tab')
        expect(await drawer.locator(':focus').count()).toBe(1)
        await accessible(page)
        await page.keyboard.press('Escape')
        await expect(menu).toBeFocused()
      }
      await page.goto('/settings')
      await upload(page, payload())
      await page.getByRole('button', { name: 'Confirm replacement' }).click()
      await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
      for (const path of [first, second, '/course', '/settings']) {
        await page.goto(path)
        await noOverflow(page)
        await accessible(page)
        if (path === second) {
          await page.getByLabel('HTML editor').focus()
          await page.keyboard.press('Tab')
          await expect(page.getByText('What the lab checks')).toBeFocused()
          await page.keyboard.press('Enter')
          await expect(
            page.getByText('Use a standards-mode document.'),
          ).toBeVisible()
        }
      }
    },
  )
test('corrupt storage is preserved, recoverable and visibly reported', async ({
  page,
}) => {
  await page.goto('/')
  await page.evaluate((k) => localStorage.setItem(k, '{'), key)
  await page.reload()
  await expect(page.getByRole('status')).toContainText('original is preserved')
  await page.goto(first)
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBe('{')
  await page.goto('/settings')
  await expect(
    page.getByRole('button', { name: 'Download original recovery copy' }),
  ).toBeVisible()
  await upload(page, payload())
  await page.getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(
    page.getByRole('button', { name: 'Download original recovery copy' }),
  ).toHaveCount(0)
})
for (const failure of ['denied', 'quota'])
  test('exportable session on ' + failure, async ({ page }) => {
    await page.addInitScript((mode) => {
      if (mode === 'denied')
        Object.defineProperty(window, 'localStorage', {
          get() {
            throw new Error('Denied')
          },
        })
      else
        Storage.prototype.setItem = () => {
          throw new Error('Quota')
        }
    }, failure)
    await page.goto(first)
    await expect(page.getByText(/Progress is in memory only/)).toBeVisible()
    await page
      .getByLabel('Your private note for this lesson')
      .fill('session note')
    await page.getByRole('button', { name: 'Save field note' }).click()
    await expect(page.getByText(/Field note held in this tab/)).toBeVisible()
    await page.getByRole('link', { name: 'Manage local data' }).click()
    const downloaded = page.waitForEvent('download')
    await page
      .getByRole('button', { name: 'Export backup', exact: true })
      .click()
    expect(
      JSON.parse(await readFile((await (await downloaded).path())!, 'utf8'))
        .progress.notes['p1-w01-l01'],
    ).toBe('session note')
    await upload(page, payload())
    await expect(page.getByRole('dialog')).toContainText(
      'this change applies in this tab only',
    )
    await page.getByRole('button', { name: 'Confirm replacement' }).click()
    await expect(
      page.getByText('Progress updated in this tab only. Export to keep it.'),
    ).toBeVisible()
  })
test('a second tab invalidates a pending overwrite preview', async ({
  page,
  context,
}) => {
  await page.goto('/settings')
  await upload(page, payload())
  const other = await context.newPage()
  await other.goto('/settings')
  await other.getByRole('radio', { name: 'light', exact: true }).check()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'Confirm replacement' }).click()
  await expect(page.getByRole('status')).toContainText('Review a new preview')
  expect(
    JSON.parse((await page.evaluate((k) => localStorage.getItem(k), key))!)
      .evidence,
  ).toEqual([])
})

for (const width of [320, 834]) {
  test(
    'practical work reflows, stays keyboard accessible and resumes partial work at ' +
      width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 800 })
      await page.goto('/course/week/01/lesson/07')
      const editor = page.getByLabel('JavaScript editor')
      await editor.fill(
        'function cleanTitle(s) { return s; }\nfunction isValidTitle(s) { return true; }',
      )
      await page.getByRole('button', { name: 'Run lab checks' }).click()
      await expect(page.locator('.lab-result')).toContainText(
        'Expected "Read MDN"',
      )
      await noOverflow(page)
      await accessible(page)
      await page.goto('/course/week/01/lesson/12')
      const project = page.locator('.local-project').first()
      const firstBox = project.getByRole('checkbox').first()
      await firstBox.focus()
      await page.keyboard.press('Space')
      await expect(firstBox).toBeChecked()
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              JSON.parse(
                localStorage.getItem('fullstack-fieldbook.phase1.w01.v1')!,
              ).practicalDrafts?.['p1-w01-l12-c01']?.item0,
          ),
        )
        .toBe('yes')
      await page.reload()
      await expect(firstBox).toBeChecked()
      await noOverflow(page)
      await accessible(page)
    },
  )
}
