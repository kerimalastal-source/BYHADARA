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
  for (const path of ['/en/contact', '/en/inquiries/investment']) {
    await page.goto(path);
    await expect(page.getByRole('button', { name: 'Send request' })).toBeDisabled();
    await expect(page.getByLabel('Country code')).toBeDisabled();
    await expect(page.getByLabel('Email address')).toBeDisabled();
    await expect(
      page.getByText('Online requests are not available at the moment.', { exact: false }),
    ).toBeVisible();
  }
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
  for (const path of [
    '/en',
    '/ar/inquiries/investment',
    '/tr/insights',
    '/ar/insights/lotus-yasam-launch',
    '/ar/contact/thank-you',
  ]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
test('wordmark stays English and pinned left in every locale', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const seen: string[] = [];
    for (const locale of locales) {
      await page.goto(`/${locale}`);
      for (const brand of [page.locator('header .brand'), page.locator('footer .brand')]) {
        await expect(brand).toHaveText('BYHADARA.G R O U P');
        await expect(brand).toHaveAttribute('translate', 'no');
        const box = await brand.boundingBox();
        seen.push(`${Math.round(box!.x)}×${Math.round(box!.width)}`);
      }
    }
    expect(new Set(seen.filter((_, i) => i % 2 === 0)).size, `header at ${width}px`).toBe(1);
    expect(new Set(seen.filter((_, i) => i % 2 === 1)).size, `footer at ${width}px`).toBe(1);
  }
});
test('phones and tablets: no sideways scroll, Contact reachable, comfortable tap targets', async ({
  page,
}) => {
  // Mobile first: 320–430 px phones, then 768–1180 px tablets in portrait and landscape.
  for (const width of [320, 375, 390, 430, 768, 820, 1024, 1180]) {
    await page.setViewportSize({ width, height: width < 700 ? 800 : 1000 });
    for (const path of [
      '/en',
      '/ar/contact',
      '/tr/insights',
      '/ar/insights/cityscape-qatar-2026',
    ]) {
      await page.goto(path);
      const check = await page.evaluate(() => {
        const small = [
          ...document.querySelectorAll<HTMLElement>('header a, header button, footer a'),
        ]
          .filter((e) => e.offsetParent && !e.closest('.sr-only'))
          .map((e) => ({ text: e.textContent?.trim(), box: e.getBoundingClientRect() }))
          .filter(({ box }) => box.width < 24 || box.height < 24)
          .map(({ text, box }) => `${text} ${Math.round(box.width)}×${Math.round(box.height)}`);
        return {
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          small,
        };
      });
      expect(check.overflow, `${width}px ${path} sideways scroll`).toBeLessThanOrEqual(1);
      expect(check.small, `${width}px ${path} small tap targets`).toEqual([]);
      // Contact is either in the header or one tap away in the menu.
      const contact = page.locator('.header-contact');
      if (!(await contact.isVisible())) {
        await page.locator('.menu-button').click();
        await expect(page.locator('#mobile-navigation a').last()).toHaveAttribute(
          'href',
          new RegExp(`^/${path.slice(1, 3)}/contact$`),
        );
        await page.keyboard.press('Escape');
      }
    }
  }
});
