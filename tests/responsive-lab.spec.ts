import { expect, test } from '@playwright/test'

const lesson = '/course/week/01/lesson/05'

test('fresh learner measures a broken layout, revises it and checks keyboard order', async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto(lesson)
  const run = page.getByRole('button', { name: 'Run layout checks' })
  const wide = page.getByLabel('Base declarations for .controls')
  const narrow = page.getByLabel('Narrow override')
  const success = page.getByText(
    'Layout fits at both text sizes (16px and 24px).',
  )
  await run.click()
  await expect(success).toHaveCount(1)
  await expect(page.getByText(/Put the button below the input/)).toBeVisible()
  await narrow.fill('flex-direction: column;')
  await expect(page.locator('.layout-sample')).toHaveCount(0)
  await run.click()
  await expect(success).toHaveCount(2)
  await run.click()
  await expect(success).toHaveCount(2)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  )
  for (const width of [375, 768]) {
    const frame = page.frameLocator('iframe[width="' + width + '"]')
    // macOS WebKit uses Option-Tab to include every control in its tab order.
    await frame.getByRole('textbox').press(
      browserName === 'webkit' && process.platform === 'darwin'
        ? 'Alt+Tab'
        : 'Tab',
    )
    await expect(frame.getByRole('button')).toBeFocused()
  }
  await wide.fill('display: grid; grid-template-columns: 1fr auto; gap: 12px;')
  await narrow.fill('grid-template-columns: 1fr;')
  await run.click()
  await expect(success).toHaveCount(2)
  await page.reload()
  await expect(page.getByText('Browser checkpoint passed.')).toBeVisible()
  await page.goto('/course/week/02')
  await expect(
    page.getByRole('heading', { name: 'This section is locked' }),
  ).toBeVisible()
})

test('isolated practice rejects unsupported rules and flags actual overflow', async ({
  page,
}) => {
  await page.goto(lesson)
  const run = page.getByRole('button', { name: 'Run layout checks' })
  const wide = page.getByLabel('Base declarations for .controls')
  await wide.fill('color: blue;')
  await run.click()
  await expect(page.getByRole('alert')).toContainText('supported layout')
  await expect(page.locator('iframe')).toHaveCount(0)
  await wide.fill('display: grid; grid-template-columns: 900px auto;')
  await run.click()
  await expect(
    page.getByText(/A control or its text does not fit/),
  ).toHaveCount(2)
  const frames = page.locator('.layout-viewport iframe')
  await expect(frames).toHaveCount(2)
  for (const frame of await frames.all()) {
    await expect(frame).toHaveAttribute('sandbox', 'allow-scripts')
    expect(
      await frame.evaluate(
        (element) => (element as HTMLIFrameElement).contentDocument,
      ),
    ).toBeNull()
    const policy = await frame
      .contentFrame()
      .locator('meta[http-equiv]')
      .getAttribute('content')
    expect(policy).toContain("default-src 'none'")
  }
})
