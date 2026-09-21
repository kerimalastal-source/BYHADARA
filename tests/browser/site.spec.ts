import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { locales, paths } from '../../content/site';
for (const locale of locales) {
  test(`${locale} routes, responsive bounds and images`, async ({ page }) => {
    for (const path of paths) {
      const response = await page.goto(`/${locale}${path ? '/' + path : ''}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('html')).toHaveAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
      const bounds = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(bounds.scroll).toBeLessThanOrEqual(bounds.width + 1);
    }
  });
}
test('language switch preserves a business detail route', async ({ page }) => {
  await page.goto('/en/businesses/hospitality');
  await page.getByRole('link', { name: 'العربية', exact: true }).first().click();
  await expect(page).toHaveURL(/\/ar\/businesses\/hospitality$/);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
});
test('unconfigured forms do not collect data or promise delivery', async ({ page }) => {
  await page.goto('/en/inquiries/investment');
  await expect(page.getByRole('button', { name: 'Submit inquiry' })).toBeDisabled();
  await expect(
    page.getByText('Online inquiries are not available yet.', { exact: false }),
  ).toBeVisible();
});
test('mobile menu keyboard behavior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/ar');
  const button = page.getByRole('button', { name: 'فتح قائمة التنقل' });
  await button.click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-navigation')).toHaveCount(0);
  await expect(button).toBeFocused();
});
test('representative pages meet automated WCAG checks', async ({ page }) => {
  for (const path of ['/en', '/ar/inquiries/investment', '/tr/insights']) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
