import { test, expect } from '@playwright/test';

test.describe('Google Search Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.google.com');
  });

  test('should display search bar and button', async ({ page, isMobile }) => {
    // Verify search bar exists
    const searchBar = isMobile
      ? page.locator('textarea[name="q"], input[name="q"]')
      : page.getByLabel('Search', { exact: true });
    await expect(searchBar).toBeVisible();

    if (!isMobile) {
      // Click on search bar to reveal the search button
      await searchBar.click();

      // Verify search button exists using aria-label
      const searchButton = page.locator('[aria-label="Google Search"]');
      await expect(searchButton.first()).toBeVisible();
    }
  });
});
