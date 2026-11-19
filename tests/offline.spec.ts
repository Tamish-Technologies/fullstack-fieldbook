import { createHash } from 'node:crypto'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const lesson = '/course/week/01/lesson/01'
const cachePrefix = 'fullstack-fieldbook-release-'
const readyText = 'Ready for offline study.'

async function prepare(page: Page, origin = '') {
  await page.goto(origin + '/settings')
  await page.getByRole('button', { name: 'Download course', exact: true }).click()
  await expect(page.getByText(readyText)).toBeVisible({ timeout: 15000 })
}

async function recordNote(page: Page, path: string) {
  await page.goto(path)
  await page.getByLabel('Your private note for this lesson').fill('<b>Offline study note</b>')
  await page.getByRole('button', { name: 'Save field note' }).click()
  await expect(page.getByText('Field note saved.', { exact: true })).toBeVisible()
}

async function releaseHost() {
  const worker = await readFile('dist/sw.js', 'utf8')
  const line = worker.split('\n')[1]
  if (!line?.startsWith('const FILES = ')) throw Error('Offline manifest missing.')
  const files: [string, string][] = JSON.parse(line.slice('const FILES = '.length))
  const resources = new Map(await Promise.all(files.map(async ([path]) => [
    path, await readFile('dist' + path),
  ] as const)))
  const index = resources.get('/index.html')!.toString()
  const updatedIndex = index.replace('<head>', '<head><meta name="qa-release" content="updated">')
  const updatedFiles = files.map(([path, integrity]) => [
    path,
    path === '/index.html'
      ? 'sha256-' + createHash('sha256').update(updatedIndex).digest('base64')
      : integrity,
  ])
  const version = createHash('sha256').update(updatedIndex).digest('hex').slice(0, 20)
  const updatedWorker = worker.replace(/^const RELEASE = .*\nconst FILES = .*\n/,
    'const RELEASE = ' + JSON.stringify(version) + '\nconst FILES = ' + JSON.stringify(updatedFiles) + '\n')
  let newest = false
  let tampered = false
  const server = createServer((req, res) => {
    const path = new URL(req.url ?? '/', 'http://localhost').pathname
    const route = /^(?:\/(?:course|settings|progress)?|\/course\/week\/\d{2}(?:\/lesson\/\d{2})?)$/.test(path)
    const target = route ? '/index.html' : path
    const type = target.endsWith('.html') ? 'text/html'
      : target.endsWith('.js') ? 'text/javascript'
        : target.endsWith('.css') ? 'text/css'
          : target.endsWith('.png') ? 'image/png'
            : target.endsWith('.webmanifest') ? 'application/manifest+json' : 'application/zip'
    let body: string | Buffer | undefined =
      target === '/sw.js' ? (newest ? updatedWorker : worker)
        : target === '/index.html' && newest ? updatedIndex : resources.get(target)
    if (tampered && target === '/projects/study-tasks-v12.zip') body = 'A mismatched download'
    res.writeHead(body ? 200 : 404, { 'Content-Type': type, 'Cache-Control': 'no-store' })
    res.end(body ?? 'Not found')
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const details = server.address()
  if (!details || typeof details === 'string') throw Error('Test server address missing.')
  return {
    origin: 'http://127.0.0.1:' + details.port,
    makeUpdateAvailable: () => { newest = true },
    tamperWithDownload: (value: boolean) => { tampered = value },
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  }
}

test('a fresh learner writes a note and moves a backup between offline browser profiles', async ({ page, browser }) => {
  await page.goto('/settings')
  await expect(page.getByText('Download the course while online to study offline.')).toBeVisible()
  await expect(page.getByText(readyText)).toHaveCount(0)
  await page.getByRole('button', { name: 'Download course', exact: true }).click()
  await expect(page.getByText(readyText)).toBeVisible({ timeout: 15000 })
  expect(await page.evaluate(() => navigator.serviceWorker.controller !== null)).toBe(true)
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])

  await page.context().setOffline(true)
  await recordNote(page, lesson)
  await page.reload()
  await expect(page.getByLabel('Your private note for this lesson')).toHaveValue('<b>Offline study note</b>')
  await page.goto('/settings')
  await expect(page.getByText('You’re offline. Reconnect to download or update the course.')).toBeVisible()
  const exported = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export backup', exact: true }).click()
  const path = (await (await exported).path())!
  const saved = JSON.parse(await readFile(path, 'utf8'))
  expect(saved.progress.notes['p1-w01-l01']).toBe('<b>Offline study note</b>')

  const empty = await browser.newContext()
  try {
    const receiver = await empty.newPage()
    await prepare(receiver, 'http://127.0.0.1:4173')
    await empty.setOffline(true)
    const importFile = receiver.getByLabel('Import backup', { exact: true })
    await importFile.setInputFiles({
      name: 'damaged.json', mimeType: 'application/json', buffer: Buffer.from('{'),
    })
    const section = receiver.getByRole('region', { name: 'Backup & restore' })
    await expect(section.getByRole('status')).toContainText('Your progress is unchanged. Malformed JSON.')
    await importFile.setInputFiles(path)
    const dialog = receiver.getByRole('dialog')
    await expect(dialog).toContainText('1 field note')
    await expect(dialog).toContainText('Exported')
    await expect(dialog).not.toContainText('foundation backup')
    await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused()
    await dialog.getByRole('button', { name: 'Confirm replacement' }).click()
    await expect(section.getByRole('status')).toContainText('Your backup was restored.')
    await receiver.goto('http://127.0.0.1:4173' + lesson)
    await expect(receiver.getByLabel('Your private note for this lesson')).toHaveValue('<b>Offline study note</b>')
    await expect(receiver.locator('b').filter({ hasText: 'Offline study note' })).toHaveCount(0)
  } finally {
    await empty.close()
  }
})

test('an incomplete download fails safely, and a missing cache can be repaired', async ({ page }) => {
  const host = await releaseHost()
  try {
    host.tamperWithDownload(true)
    await page.goto(host.origin + '/settings')
    await page.getByRole('button', { name: 'Download course', exact: true }).click()
    await expect(page.getByText(/course download could not finish/)).toBeVisible({ timeout: 15000 })
    await expect(page.getByText(readyText)).toHaveCount(0)
    expect(await page.evaluate(() => navigator.serviceWorker.controller)).toBeNull()
    host.tamperWithDownload(false)
    await page.getByRole('button', { name: 'Download course', exact: true }).click()
    await expect(page.getByText(readyText)).toBeVisible()

    await page.evaluate(async (prefix) => {
      const key = (await caches.keys()).find((name) => name.startsWith(prefix))!
      await (await caches.open(key)).delete('/projects/study-tasks-v12.zip')
    }, cachePrefix)
    await page.reload()
    await expect(page.getByText('The offline copy is incomplete.', { exact: false })).toBeVisible()
    await page.getByRole('button', { name: 'Download course again' }).click()
    await expect(page.getByText(readyText)).toBeVisible()

    await recordNote(page, host.origin + lesson)
    await page.evaluate(async (prefix) => {
      const key = (await caches.keys()).find((name) => name.startsWith(prefix))!
      await caches.delete(key)
    }, cachePrefix)
    await page.context().setOffline(true)
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Offline copy unavailable' })).toBeVisible()
    await page.context().setOffline(false)
    await page.getByRole('link', { name: 'Try opening Settings again' }).click()
    await expect(page.getByText(readyText)).toBeVisible()
    await page.goto(host.origin + lesson)
    await expect(page.getByLabel('Your private note for this lesson')).toHaveValue('<b>Offline study note</b>')
  } finally {
    await host.close()
  }
})

test('a downloaded update waits for existing tabs and preserves learner progress', async ({ page, context }) => {
  const host = await releaseHost()
  try {
    await prepare(page, host.origin)
    await recordNote(page, host.origin + lesson)
    const oldTab = await context.newPage()
    await oldTab.goto(host.origin + '/settings')
    await expect(oldTab.getByText(readyText)).toBeVisible()
    host.makeUpdateAvailable()
    await oldTab.getByRole('button', { name: 'Check for updates' }).click()
    await expect(oldTab.getByText(/An update is ready/)).toBeVisible()
    expect(await oldTab.locator('meta[name=qa-release]').count()).toBe(0)
    expect(await oldTab.evaluate(async (prefix) =>
      (await caches.keys()).filter((name) => name.startsWith(prefix)).length, cachePrefix)).toBe(2)
    await oldTab.reload()
    await expect(oldTab.getByText(/An update is ready/)).toBeVisible()
    expect(await oldTab.locator('meta[name=qa-release]').count()).toBe(0)
    const updated = await context.newPage()
    await page.close()
    await oldTab.close()
    await updated.goto(host.origin + '/settings')
    await expect(updated.locator('meta[name=qa-release]')).toHaveAttribute('content', 'updated')
    await expect(updated.getByText(readyText)).toBeVisible()
    expect(await updated.evaluate(async (prefix) =>
      (await caches.keys()).filter((name) => name.startsWith(prefix)).length, cachePrefix)).toBe(1)
    await context.setOffline(true)
    await updated.goto(host.origin + lesson)
    await expect(updated.getByLabel('Your private note for this lesson')).toHaveValue('<b>Offline study note</b>')
  } finally {
    await host.close()
  }
})
