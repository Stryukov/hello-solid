import { createSignal, type Component } from 'solid-js'

/**
 * Показывает исходник демки. Строка приезжает из Vite: `import src from './Demo.tsx?raw'`
 * — суффикс ?raw говорит сборщику отдать содержимое файла текстом, а не модулем.
 */
export const SourceView: Component<{ source: string; file: string }> = (props) => {
  const [open, setOpen] = createSignal(false)

  return (
    <div class="border-line overflow-hidden rounded-lg border">
      <button
        type="button"
        class="bg-surface-sunken hover:bg-line/40 flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-left transition"
        onClick={() => setOpen(!open())}
        aria-expanded={open()}
      >
        <span class="text-ink font-mono text-xs">{props.file}</span>
        <span class="text-ink-muted text-xs">{open() ? 'скрыть исходник' : 'показать исходник'}</span>
      </button>

      {open() && (
        <pre class="border-line max-h-[32rem] overflow-auto border-t p-4 font-mono text-xs leading-relaxed">
          <code>{props.source}</code>
        </pre>
      )}
    </div>
  )
}
