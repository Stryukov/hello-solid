import { For, Show, type Component } from 'solid-js'
import { A } from '@solidjs/router'
import { BLOCKS, LESSONS, isReady } from '../routes'

const Home: Component = () => (
  <div class="mx-auto max-w-3xl px-6 py-12 lg:px-10">
    <h1 class="text-ink text-4xl font-bold tracking-tight text-balance">
      Reactivity Lab
    </h1>
    <p class="text-ink-muted mt-4 text-lg leading-relaxed text-pretty">
      Учебник по SolidJS, в котором каждый урок — живая демка со счётчиками выполнений.
      Числа в панели показывают, сколько раз выполнилась каждая реактивная область:
      именно они делают разницу с React осязаемой.
    </p>

    <div class="border-line bg-surface-sunken mt-8 rounded-lg border p-5">
      <h2 class="text-ink text-sm font-semibold">С чего начать</h2>
      <p class="text-ink-muted mt-2 text-sm leading-relaxed">
        Если фронтенд для тебя новая территория — сначала{' '}
        <A href="/l/00-frontend-basics" class="text-brand underline underline-offset-2">
          урок 00
        </A>{' '}
        и <code class="bg-surface border-line rounded border px-1 py-0.5 font-mono text-xs">README.md</code>{' '}
        в корне репозитория. Там разобрано, что такое DOM, зачем Vite и почему JSX в Solid
        устроен не так, как в React.
      </p>
    </div>

    <div class="mt-10 space-y-8">
      <For each={BLOCKS}>
        {(block) => (
          <section>
            <h2 class="text-ink-muted mb-3 text-xs font-semibold tracking-wider uppercase">
              Блок {block.num} — {block.title}
            </h2>
            <ul class="space-y-2">
              <For each={LESSONS.filter((lesson) => lesson.block === block.num)}>
                {(lesson) => (
                  <li>
                    <A
                      href={`/l/${lesson.slug}`}
                      class="border-line hover:border-brand/40 hover:bg-brand-soft/30 block rounded-lg border px-4 py-3 transition"
                    >
                      <span class="flex items-baseline gap-3">
                        <span class="text-ink-muted shrink-0 font-mono text-xs">
                          {String(lesson.num).padStart(2, '0')}
                        </span>
                        <span class="text-ink font-medium">{lesson.title}</span>
                        <Show when={!isReady(lesson.slug)}>
                          <span class="border-line text-ink-muted ml-auto shrink-0 rounded border px-1.5 py-0.5 text-[10px]">
                            скоро
                          </span>
                        </Show>
                      </span>
                      <Show when={lesson.summary}>
                        <span class="text-ink-muted mt-1 block pl-9 text-sm text-pretty">
                          {lesson.summary}
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
  </div>
)

export default Home
