import { expect, test } from '@playwright/test'

// Главная проверка всей лаборатории. Если она когда-нибудь упадёт, значит
// сломалось либо утверждение урока, либо сам механизм счётчиков.
test.describe('Урок 02 — компонент выполняется один раз', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/l/02-components-run-once')
  })

  test('тела компонентов не выполняются повторно, а эффект и memo — да', async ({ page }) => {
    await expect(page.getByTestId('trace-count-Demo')).toHaveText('1')
    await expect(page.getByTestId('trace-count-Child')).toHaveText('1')

    for (let i = 0; i < 5; i++) await page.getByTestId('increment').click()

    await expect(page.getByTestId('count-value')).toHaveText('5')
    await expect(page.getByTestId('doubled-value')).toHaveText('10')
    await expect(page.getByTestId('child-value')).toHaveText('5')

    // Пять кликов не заставили компоненты выполниться заново.
    await expect(page.getByTestId('trace-count-Demo')).toHaveText('1')
    await expect(page.getByTestId('trace-count-Child')).toHaveText('1')

    // А эффект и memo, читающие count, отработали: один раз изначально + пять раз.
    await expect(page.getByTestId('trace-count-count')).toHaveText('6')
    await expect(page.getByTestId('trace-count-doubled')).toHaveText('6')
  })

  test('эффект реагирует только на свой сигнал', async ({ page }) => {
    // Эффект, читающий name, не должен шевелиться от изменений count.
    for (let i = 0; i < 5; i++) await page.getByTestId('increment').click()
    await expect(page.getByTestId('trace-count-name')).toHaveText('1')

    // И наоборот: ввод в поле не трогает эффект, читающий count.
    await page.getByTestId('name-input').fill('вода')
    await expect(page.getByTestId('trace-count-name')).not.toHaveText('1')
    await expect(page.getByTestId('trace-count-count')).toHaveText('6')
  })

  test('сброс обнуляет счётчики', async ({ page }) => {
    for (let i = 0; i < 3; i++) await page.getByTestId('increment').click()
    await expect(page.getByTestId('trace-count-count')).toHaveText('4')

    await page.getByRole('button', { name: 'Сбросить' }).click()
    await expect(page.getByTestId('trace-count-count')).toHaveText('0')
    await expect(page.getByTestId('trace-count-Demo')).toHaveText('0')
  })
})
