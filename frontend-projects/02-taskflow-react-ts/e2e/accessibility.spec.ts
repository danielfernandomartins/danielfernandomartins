import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('has no automatically detectable accessibility violations in the main task flow', async ({ page }) => {
  await page.getByLabel('Nova tarefa').fill('Validar acessibilidade');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page
    .getByRole('checkbox', { name: 'Marcar como concluída: Validar acessibilidade' })
    .check();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test('supports the primary create-task flow with keyboard only', async ({ page }) => {
  await page.keyboard.press('Tab');
  const input = page.getByLabel('Nova tarefa');
  await expect(input).toBeFocused();

  await page.keyboard.type('Criada pelo teclado');
  await page.keyboard.press('Tab');

  const addButton = page.getByRole('button', { name: 'Adicionar' });
  await expect(addButton).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.getByText('Criada pelo teclado')).toBeVisible();
  await expect(page.getByText('0/1 concluídas')).toBeVisible();
});
