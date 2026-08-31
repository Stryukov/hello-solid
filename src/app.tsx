import { For, Show, Suspense, type Component, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { A, useParams } from '@solidjs/router'
import { BLOCKS, LESSONS, LESSON_PAGES, isReady } from './routes'

const Sidebar: Component = () => (
  <nav class="border-line bg-surface-sunken h-full overflow-y-auto border-r">
    <A href="/" class="border-line block border-b px-5 py-5">
      <span class="text-ink block text-sm font-semibold">Reactivity Lab</span>
      <span class="text-ink-muted block text-xs">SolidJS + Ark UI</span>
    </A>

    <div class="px-3 py-4">
      <For each={BLOCKS}>
        {(block) => (
          <section class="mb-5">
            <h2 class="text-ink-muted mb-1.5 px-2 text-[11px] font-semibold tracking-wider uppercase">
              {block.title}
            </h2>
            <ul>
              <For each={LESSONS.filter((lesson) => lesson.block === block.num)}>
                {(lesson) => (
                  <li>
                    <A
                      href={`/l/${lesson.slug}`}
                      class="hover:bg-line/50 group flex items-baseline gap-2 rounded px-2 py-1.5 text-sm transition"
                      activeClass="bg-brand-soft text-brand font-medium"
                      inactiveClass={isReady(lesson.slug) ? 'text-ink' : 'text-ink-muted/60'}
                    >
                      <span class="w-5 shrink-0 font-mono text-[11px] opacity-60">
                        {String(lesson.num).padStart(2, '0')}
                      </span>
                      <span class="text-pretty">{lesson.title}</span>
                      <Show when={!isReady(lesson.slug)}>
                        <span class="border-line text-ink-muted/70 ml-auto shrink-0 self-center rounded border px-1 text-[10px]">
                          скоро
                        </span>
                      </Show>
                    </A>
                  </li>
                )}
              </For>
            </ul>
          </section>
        )}
      </For>
    </div>
  </nav>
)

/** Оболочка: колонка меню + область содержимого. props.children подставляет роутер. */
export const AppShell: Component<{ children?: JSX.Element }> = (props) => (
  <div class="grid min-h-screen grid-cols-1 md:grid-cols-[17rem_minmax(0,1fr)]">
    <aside class="hidden md:block md:h-screen md:sticky md:top-0">
      <Sidebar />
    </aside>
    <main class="min-w-0">
      <Suspense
        fallback={<p class="text-ink-muted px-6 py-10 text-sm lg:px-10">Загружаем урок…</p>}
      >
        {props.children}
      </Suspense>
    </main>
  </div>
)

/** Страница урока: ищет компонент по slug из адреса, иначе показывает заглушку. */
export const LessonRoute: Component = () => {
  const params = useParams<{ slug: string }>()
  const lesson = () => LESSONS.find((item) => item.slug === params.slug)

  return (
    <Show when={lesson()} fallback={<NotFound />}>
      {(meta) => (
        <Show when={LESSON_PAGES[meta().slug]} fallback={<ComingSoon title={meta().title} />}>
          {(Page) => <Dynamic component={Page()} />}
        </Show>
      )}
    </Show>
  )
}

const ComingSoon: Component<{ title: string }> = (props) => (
  <div class="mx-auto max-w-3xl px-6 py-10 lg:px-10">
    <h1 class="text-ink text-2xl font-bold">{props.title}</h1>
    <p class="text-ink-muted mt-3 text-sm">
      Урок ещё не написан. Маршрут стоит здесь, чтобы структура курса была видна целиком.
    </p>
  </div>
)

const NotFound: Component = () => (
  <div class="mx-auto max-w-3xl px-6 py-10 lg:px-10">
    <h1 class="text-ink text-2xl font-bold">Такого урока нет</h1>
    <A href="/" class="text-brand mt-3 inline-block text-sm underline underline-offset-2">
      К оглавлению
    </A>
  </div>
)
