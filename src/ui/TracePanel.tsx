import { For, type Component } from 'solid-js'
import type { TraceGroup, TraceKind } from '../lib/trace'

const KIND_LABEL: Record<TraceKind, string> = {
  component: 'тело компонента',
  effect: 'эффект',
  memo: 'memo',
  dom: 'обновление DOM',
}

const KIND_STYLE: Record<TraceKind, string> = {
  component: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  effect: 'bg-sky-50 text-sky-700 ring-sky-200',
  memo: 'bg-amber-50 text-amber-700 ring-amber-200',
  dom: 'bg-violet-50 text-violet-700 ring-violet-200',
}

/**
 * Панель счётчиков. Читает store из TraceGroup — то есть подписывается только
 * на те строки, которые действительно меняются. Сама ничего не «отмечает»,
 * поэтому не может зациклиться со своими же данными.
 */
export const TracePanel: Component<{ trace: TraceGroup; note?: string }> = (props) => (
  <div class="border-line bg-surface-sunken rounded-lg border p-4">
    <div class="mb-3 flex items-center justify-between gap-4">
      <h4 class="text-ink text-sm font-semibold">Сколько раз выполнилось</h4>
      <button
        type="button"
        class="border-line text-ink-muted hover:bg-surface hover:text-ink cursor-pointer rounded border px-2 py-1 text-xs transition"
        onClick={() => props.trace.reset()}
      >
        Сбросить
      </button>
    </div>

    <ul class="space-y-1.5" data-testid="trace-list">
      <For each={props.trace.entries}>
        {(entry) => (
          <li class="flex items-center justify-between gap-3 text-sm">
            <span class="flex min-w-0 items-center gap-2">
              <span
                class={`shrink-0 rounded px-1.5 py-0.5 text-[11px] ring-1 ring-inset ${KIND_STYLE[entry.kind]}`}
              >
                {KIND_LABEL[entry.kind]}
              </span>
              <span class="text-ink-muted truncate font-mono text-xs">{entry.label}</span>
            </span>
            <span
              class="text-ink shrink-0 font-mono text-base font-semibold tabular-nums"
              data-testid={`trace-count-${entry.label}`}
            >
              {entry.count}
            </span>
          </li>
        )}
      </For>
    </ul>

    {props.note && <p class="text-ink-muted mt-3 text-xs leading-relaxed">{props.note}</p>}
  </div>
)
