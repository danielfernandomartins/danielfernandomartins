import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('user creates, completes and filters a task', async ({ page }) => {
  await page.getByLabel('Nova tarefa').fill('Validar fluxo E2E');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.getByText('Validar fluxo E2E')).toBeVisible();
  await expect(page.getByText('0/1 concluídas')).toBeVisible();

  await page.getByRole('checkbox', { name: 'Marcar como concluída: Validar fluxo E2E' }).check();
  await expect(page.getByText('1/1 concluídas')).toBeVisible();

  await page.getByRole('button', { name: 'Concluídas' }).click();
  await expect(page.getByText('Validar fluxo E2E')).toBeVisible();
});

test('task persists after a page reload', async ({ page }) => {
  await page.getByLabel('Nova tarefa').fill('Persistir no navegador');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await page.reload();

  await expect(page.getByText('Persistir no navegador')).toBeVisible();
  await expect(page.getByText('0/1 concluídas')).toBeVisible();
});
