import type { Component, JSX } from 'solid-js'

/**
 * Общий каркас страницы урока: заголовок, теория, демка, счётчики, исходник.
 *
 * Обрати внимание на тип children: JSX.Element. В Solid children — это не
 * «отрендеренные узлы», а значение, которое может быть функцией. Поэтому его
 * нельзя читать дважды как попало; здесь мы просто вставляем его один раз.
 */
export const LessonPage: Component<{
  num: number
  title: string
  lead: string
  children: JSX.Element
}> = (props) => (
  <article class="mx-auto max-w-3xl px-6 py-10 lg:px-10">
    <header class="border-line mb-8 border-b pb-6">
      <p class="text-brand mb-2 font-mono text-xs tracking-wide uppercase">
        Урок {String(props.num).padStart(2, '0')}
      </p>
      <h1 class="text-ink text-3xl font-bold tracking-tight text-balance">{props.title}</h1>
      <p class="text-ink-muted mt-3 leading-relaxed text-pretty">{props.lead}</p>
    </header>

    <div class="prose-lab space-y-6">{props.children}</div>
  </article>
)

/** Блок с живой демкой — визуально отделён от текста, чтобы было ясно: тут можно тыкать. */
export const Demo: Component<{ title?: string; children: JSX.Element }> = (props) => (
  <section class="border-brand/25 bg-brand-soft/40 space-y-4 rounded-xl border p-5">
    <h4 class="text-brand font-mono text-xs tracking-wide uppercase">
      {props.title ?? 'Живая демка'}
    </h4>
    {props.children}
  </section>
)

/** Врезка «на что смотреть» — короткий вывод из демки. */
export const Takeaway: Component<{ children: JSX.Element }> = (props) => (
  <aside class="border-brand bg-brand-soft/50 rounded-r-lg border-l-4 py-3 pr-4 pl-4">
    <div class="text-ink text-sm leading-relaxed [&_code]:text-[0.85em]">{props.children}</div>
  </aside>
)
