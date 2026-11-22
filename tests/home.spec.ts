import { expect, test } from '@playwright/test'

test.describe('public site', () => {
  test.describe.configure({ timeout: 45_000 })
  test('homepage explains the offer and uses one consultation link', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Automate the busywork/)
    await expect(page.getByRole('heading', { level: 1, name: /Automate the busywork/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Problems we solve' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Solutions' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'How it works' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Why NRG' })).toBeVisible()

    const ctas = page.getByRole('link', { name: 'Book a Consultation' })
    await expect(ctas).toHaveCount(3)
    const count = await ctas.count()
    for (let index = 0; index < count; index += 1) {
      await expect(ctas.nth(index)).toHaveAttribute('href', '/contact#consultation-form')
    }

    const primary = page.getByRole('navigation', { name: 'Primary' })
    if (await primary.isVisible()) {
      await expect(primary).not.toContainText('Clothing')
    }
  })

  test('navigation reaches solutions, about, and contact', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Uses the desktop navigation.')
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Solutions' }).click()
    await expect(page).toHaveURL(/\/solutions/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1, name: /Communication, operations/ })).toBeVisible()

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL(/\/about/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1, name: 'Nikolay Goranov' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Selected projects' })).toBeVisible()

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1, name: 'Book a consultation' })).toBeVisible()
    await expect(page.getByLabel('Business name')).toBeVisible()
    await expect(page.getByLabel('Service of interest')).toBeVisible()
  })

  test('mobile menu and narrow layout do not overflow', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 })
    await page.goto('/')

    await page.getByRole('button', { name: 'Open menu' }).click()
    const mobileNav = page.getByRole('navigation', { name: 'Mobile' })
    await expect(mobileNav.getByRole('link', { name: 'Solutions' })).toBeVisible()
    await expect(mobileNav).not.toContainText('Clothing')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(1)

    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  })

  test('skip link is the first tab stop', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  })

  test('clothing routes and the wishlist API are not public', async ({ page }) => {
    const clothing = await page.goto('/clothing')
    expect(clothing?.status()).toBe(404)
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()

    const detail = await page.goto('/clothing/wishlist')
    expect(detail?.status()).toBe(404)

    const api = await page.request.get('/api/clothing/wishlist?slug=sample')
    expect(api.status()).toBe(404)

    const sitemap = await page.request.get('/sitemap.xml')
    const xml = await sitemap.text()
    expect(xml).toContain('/solutions')
    expect(xml).not.toContain('/clothing')

    const robots = await page.request.get('/robots.txt')
    expect(await robots.text()).toContain('Disallow: /clothing')
  })

  test('consultation success copy reports when email was not sent', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          delivered: false,
          stored: true,
          message:
            'Your request was saved on this server. Email delivery is not configured, so it has not been sent to an inbox.',
        }),
      })
    })

    await page.goto('/contact')
    await page.getByLabel('Name', { exact: true }).fill('Ada Lovelace')
    await page.getByLabel('Business name').fill('Example Restaurant')
    await page.getByLabel('Email', { exact: true }).fill('ada@example.com')
    await page.getByLabel('Business type').selectOption('Restaurant')
    await page.getByLabel('Service of interest').selectOption('Not Sure Yet')
    await page.getByLabel('Message').fill('Guests write and nobody answers until the next day.')
    await page.getByRole('button', { name: 'Book a Consultation' }).click()

    const status = page.getByTestId('consultation-status')
    await expect(status).toContainText('has not been sent')
    await expect(status).not.toContainText('was sent by email')
  })

  test('consultation form validates before it submits', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: 'Book a Consultation' }).click()
    await expect(page.getByText('Enter your name.')).toBeVisible()
    await expect(page.getByText('Enter a valid email address.')).toBeVisible()
    await expect(page.getByText('Select a service.')).toBeVisible()

    let posted = false
    page.on('request', (request) => {
      if (request.url().includes('/api/contact') && request.method() === 'POST') posted = true
    })
    await page.getByRole('button', { name: 'Book a Consultation' }).click()
    expect(posted).toBe(false)
  })
})
