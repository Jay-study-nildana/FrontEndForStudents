// ...existing code...
import { test, expect } from '@playwright/test';

function escapeForRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('/');

  // match actual app title
  await expect(page).toHaveTitle(/react-tw-hw3/);

  const getStarted = page.locator('text=Get Started').first();
  await expect(getStarted).toHaveCount(1);

  const href = await getStarted.getAttribute('href');
  await getStarted.click();

  if (href) {
    // if the link had an href, wait for URL to include it
    const re = new RegExp('.*' + escapeForRegExp(href));
    await expect(page).toHaveURL(re);
  }
});
// ...existing code...