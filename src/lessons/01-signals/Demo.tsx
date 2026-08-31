import { createSignal, type Component } from 'solid-js'
import type { TraceGroup } from '../../lib/trace'

export const Demo: Component<{ trace: TraceGroup }> = (props) => {
  // Отмечаем выполнение тела компонента. Забегая вперёд: это число останется
  // равным единице, сколько бы раз ты ни нажал на кнопку.
  props.trace.hit('Demo', 'component')

  // createSignal возвращает ПАРУ: функцию-геттер и функцию-сеттер.
  // Не значение и сеттер, как useState в React, а именно геттер.
  const [count, setCount] = createSignal(0)

  // А вот здесь мы вызвали геттер один раз и положили результат в переменную.
  // Получилось обычное число 0. Оно уже никак не связано с сигналом и никогда
  // не обновится — это и есть главная ловушка первого дня в Solid.
  const snapshot = count()

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="bg-brand cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          onClick={() => setCount(count() + 1)}
          data-testid="increment"
        >
          Увеличить
        </button>
        <button
          type="button"
          class="border-line bg-surface text-ink hover:bg-surface-sunken cursor-pointer rounded-md border px-4 py-2 text-sm transition"
          onClick={() => setCount(0)}
          data-testid="reset"
        >
          Обнулить
        </button>
      </div>

      <dl class="grid gap-3 sm:grid-cols-2">
        <div class="border-line bg-surface rounded-lg border p-4">
          <dt class="text-ink-muted font-mono text-xs">{'{count()}'}</dt>
          <dd
            class="text-ink mt-1 font-mono text-3xl font-semibold tabular-nums"
            data-testid="live-value"
          >
            {count()}
          </dd>
          <p class="text-ink-muted mt-2 text-xs leading-relaxed">
            Геттер вызывается прямо в разметке — этот текстовый узел подписан на сигнал.
          </p>
        </div>

        <div class="border-line bg-surface rounded-lg border p-4">
          <dt class="text-ink-muted font-mono text-xs">{'{snapshot}'}</dt>
          <dd
            class="text-ink-muted mt-1 font-mono text-3xl font-semibold tabular-nums"
            data-testid="snapshot-value"
          >
            {snapshot}
          </dd>
          <p class="text-ink-muted mt-2 text-xs leading-relaxed">
            Значение прочитали один раз в переменную. Связь с сигналом потеряна навсегда.
          </p>
        </div>
      </dl>
    </div>
  )
}
