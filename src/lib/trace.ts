import { untrack } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

/**
 * Счётчики выполнений реактивных областей — главный инструмент этой лаборатории.
 *
 * Идея простая: в интересное место кода (тело компонента, эффект, memo) ставится
 * вызов hit(). Панель рядом показывает, сколько раз каждая область выполнилась.
 * Именно эти числа делают разницу между Solid и React осязаемой: тело компонента
 * отрабатывает один раз за всю жизнь, а не на каждое изменение состояния.
 */

export type TraceKind = 'component' | 'effect' | 'memo' | 'dom'

export interface TraceEntry {
  label: string
  kind: TraceKind
  count: number
}

export interface TraceGroup {
  entries: readonly TraceEntry[]
  hit: (label: string, kind: TraceKind) => void
  reset: () => void
}

/**
 * seed задаёт порядок строк в панели, чтобы они не прыгали по мере выполнения.
 * Области, которых нет в seed, добавляются в конец при первом hit().
 */
export function createTraceGroup(seed: ReadonlyArray<[string, TraceKind]> = []): TraceGroup {
  const [entries, setEntries] = createStore<TraceEntry[]>(
    seed.map(([label, kind]) => ({ label, kind, count: 0 })),
  )

  const hit = (label: string, kind: TraceKind) =>
    // hit() вызывается ИЗНУТРИ отслеживаемых областей. Без untrack чтение
    // entries.findIndex подписало бы эту область на собственный счётчик —
    // она бы перезапускала сама себя до бесконечности. untrack рвёт петлю:
    // «прочитай и запиши, но не считай это зависимостью».
    untrack(() => {
      const index = entries.findIndex((entry) => entry.label === label)
      if (index === -1) setEntries(entries.length, { label, kind, count: 1 })
      else setEntries(index, 'count', (count) => count + 1)
    })

  const reset = () =>
    untrack(() =>
      setEntries(
        produce((list) => {
          for (const entry of list) entry.count = 0
        }),
      ),
    )

  return { entries, hit, reset }
}
