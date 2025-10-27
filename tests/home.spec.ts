import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load and display content', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page loads
    await expect(page).toHaveTitle(/NRG Portfolio/)
    
    // Check for main heading
    await expect(page.getByRole('heading', { name: /Modern Web Development/ })).toBeVisible()
    
    // Check for featured projects section
    await expect(page.getByRole('heading', { name: /Featured Projects/ })).toBeVisible()
    
    // Check for navigation
    await expect(page.getByRole('link', { name: /Projects/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /About/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Contact/ })).toBeVisible()
  })

  test('should have working search', async ({ page }) => {
    await page.goto('/')
    
    // Find search input and type
    const searchInput = page.getByPlaceholder('Search projects...')
    await searchInput.fill('matcha')
    
    // Wait for results to update
    await page.waitForTimeout(500)
    
    // Check if results are filtered
    const projectCards = page.locator('[data-testid="project-card"]')
    await expect(projectCards).toHaveCount(1)
  })

  test('should have working filters', async ({ page }) => {
    await page.goto('/')
    
    // Click on filters button
    await page.getByRole('button', { name: /Filters/ }).click()
    
    // Check if filter panel is visible
    await expect(page.getByText('Technologies & Tags')).toBeVisible()
    
    // Click on a tag filter
    await page.getByText('Next.js').click()
    
    // Check if results are filtered
    await page.waitForTimeout(500)
    const projectCards = page.locator('[data-testid="project-card"]')
    await expect(projectCards).toHaveCountGreaterThan(0)
  })

  test('should be responsive', async ({ page }) => {
    await page.goto('/')
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { name: /Modern Web Development/ })).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: /Modern Web Development/ })).toBeVisible()
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: /Modern Web Development/ })).toBeVisible()
  })
})



