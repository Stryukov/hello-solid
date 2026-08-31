import { createEffect, createMemo, createSignal, type Component } from 'solid-js'
import type { TraceGroup } from '../../lib/trace'

/** Дочерний компонент. Получает значение через props — его тело тоже выполнится один раз. */
const Child: Component<{ value: number; trace: TraceGroup }> = (props) => {
  props.trace.hit('Child', 'component')

  return (
    <div class="border-line bg-surface rounded-lg border p-4">
      <p class="text-ink-muted font-mono text-xs">Child</p>
      <p class="text-ink mt-1 font-mono text-2xl font-semibold tabular-nums" data-testid="child-value">
        {props.value}
      </p>
    </div>
  )
}

export const Demo: Component<{ trace: TraceGroup }> = (props) => {
  // (1) Тело компонента. Выполняется ровно один раз при создании.
  props.trace.hit('Demo', 'component')

  const [count, setCount] = createSignal(0)
  const [name, setName] = createSignal('')

  // (2) memo, читающий count. Пересчитывается только когда count меняется.
  const doubled = createMemo(() => {
    props.trace.hit('doubled', 'memo')
    return count() * 2
  })

  // (3) Эффект, читающий count. Solid сам увидел зависимость — списка deps нет.
  createEffect(() => {
    count()
    props.trace.hit('count', 'effect')
  })

  // (4) Эффект, читающий ТОЛЬКО name. На изменения count он не реагирует —
  //     вот это и есть гранулярность, ради которой всё затевалось.
  createEffect(() => {
    name()
    props.trace.hit('name', 'effect')
  })

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="bg-brand cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          onClick={() => setCount((prev) => prev + 1)}
          data-testid="increment"
        >
          count + 1
        </button>
        <input
          type="text"
          value={name()}
          onInput={(event) => setName(event.currentTarget.value)}
          placeholder="а здесь меняется name"
          class="border-line bg-surface text-ink focus:border-brand min-w-0 flex-1 rounded-md border px-3 py-2 text-sm outline-none"
          data-testid="name-input"
        />
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <div class="border-line bg-surface rounded-lg border p-4">
          <p class="text-ink-muted font-mono text-xs">count()</p>
          <p class="text-ink mt-1 font-mono text-2xl font-semibold tabular-nums" data-testid="count-value">
            {count()}
          </p>
        </div>
        <div class="border-line bg-surface rounded-lg border p-4">
          <p class="text-ink-muted font-mono text-xs">doubled()</p>
          <p class="text-ink mt-1 font-mono text-2xl font-semibold tabular-nums" data-testid="doubled-value">
            {doubled()}
          </p>
        </div>
        <Child value={count()} trace={props.trace} />
      </div>
    </div>
  )
}
