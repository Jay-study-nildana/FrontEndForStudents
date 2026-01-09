// ...existing code...
import { test, expect } from '@playwright/test';

test.describe('App routes', () => {
  test('home → about → contact navigation', async ({ page }) => {
    await page.goto('/');

    // app title used in your project
    await expect(page).toHaveTitle(/react-tw-hw3/i);

    const aboutLink = page.getByRole('link', { name: /about/i }).first();
    const contactLink = page.getByRole('link', { name: /contact/i }).first();

    await expect(aboutLink).toBeVisible();
    await expect(contactLink).toBeVisible();

    await aboutLink.click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole('heading', { name: /about/i })).toBeVisible();

    await contactLink.click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible();

    // return to home
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
  });

  test('unknown route shows not-found UI', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page).toHaveURL(/this-route-does-not-exist/);

    // Flexible check: some apps render "Not Found", "404" or "Page not found"
    const notFound = page.locator('text=/not\\s*found|404|page not found/i');
    await expect(notFound.first()).toBeVisible();
  });
});
// ...existing code...