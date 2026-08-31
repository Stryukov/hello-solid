import { expect, test } from '@playwright/test'

// Урок 01 утверждает: геттер сигнала, вызванный в разметке, даёт живое значение,
// а вызванный один раз в переменную — мёртвое. Проверяем оба утверждения.
test.describe('Урок 01 — сигналы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/l/01-signals')
  })

  test('живое значение обновляется, снимок — нет', async ({ page }) => {
    const live = page.getByTestId('live-value')
    const snapshot = page.getByTestId('snapshot-value')

    await expect(live).toHaveText('0')
    await expect(snapshot).toHaveText('0')

    for (let i = 0; i < 3; i++) await page.getByTestId('increment').click()

    await expect(live).toHaveText('3')
    await expect(snapshot).toHaveText('0')
  })

  test('тело компонента выполняется один раз', async ({ page }) => {
    for (let i = 0; i < 5; i++) await page.getByTestId('increment').click()
    await expect(page.getByTestId('trace-count-Demo')).toHaveText('1')
  })
})
