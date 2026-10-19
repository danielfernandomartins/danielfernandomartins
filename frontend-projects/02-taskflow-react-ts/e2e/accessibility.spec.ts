import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('has no automatically detectable accessibility violations in the main task flow', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.getByLabel('Nova tarefa').fill('Validar acessibilidade');
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await page
    .getByRole('checkbox', { name: 'Marcar como concluída: Validar acessibilidade' })
    .check();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
