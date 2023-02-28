import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

test('test', async ({ page }) => {
  // go to opp page, and add ranking of things research 
  await page.goto('http://localhost:4200/opp-board?psuID=dxi5017');
  await page.getByRole('listitem').filter({ hasText: 'Ranking Things in the Internet of ThingsNaseem Ibrahim Erie, PA Description: The' }).getByRole('button', { name: 'Apply to Research' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();

  // check applied research page
  await page.getByRole('button', { name: 'Applied Researches' }).click();

  // expects to see "ranking things in the internet of things" research on the page
  await expect(page.getByText('Ranking Things in the Internet of Things')).toBeVisible;
  await page.getByRole('paragraph').filter({ hasText: 'Ranking Things in the Internet of ThingsNaseem Ibrahim Erie, PA Description: The' }).getByRole('button', { name: 'Cancel Application' }).click();
  await page.getByRole('button', { name: 'Yes, Cancel' }).click();
});
