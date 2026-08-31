import { expect, test } from '@playwright/test'

test('оглавление ведёт на готовые уроки, неготовые помечены', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Reactivity Lab', level: 1 })).toBeVisible()

  await page.getByRole('link', { name: /Компонент выполняется один раз/ }).first().click()
  await expect(page).toHaveURL(/\/l\/02-components-run-once$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Компонент выполняется один раз')
})

test('неготовый урок показывает заглушку, а не ошибку', async ({ page }) => {
  await page.goto('/l/09-async')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Асинхронность')
  await expect(page.getByText('Урок ещё не написан')).toBeVisible()
})

test('несуществующий адрес не роняет приложение', async ({ page }) => {
  await page.goto('/l/такого-нет')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Такого урока нет')
})
