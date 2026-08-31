import { lazy, type Component } from 'solid-js'

export interface BlockMeta {
  num: number
  title: string
}

export interface LessonMeta {
  slug: string
  num: number
  block: number
  title: string
  summary: string
}

export const BLOCKS: BlockMeta[] = [
  { num: 0, title: 'Фронтенд с нуля' },
  { num: 1, title: 'Ядро реактивности' },
  { num: 2, title: 'Состояние и данные' },
  { num: 3, title: 'Ark UI' },
  { num: 4, title: 'Капстоун' },
]

export const LESSONS: LessonMeta[] = [
  {
    slug: '00-frontend-basics',
    num: 0,
    block: 0,
    title: 'Что вообще происходит',
    summary: 'DOM, Vite, TypeScript, JSX и Tailwind — минимум, чтобы дальше не спотыкаться',
  },
  {
    slug: '01-signals',
    num: 1,
    block: 1,
    title: 'Сигналы',
    summary: 'createSignal: почему геттер — это функция, а не значение',
  },
  {
    slug: '02-components-run-once',
    num: 2,
    block: 1,
    title: 'Компонент выполняется один раз',
    summary: 'Главное отличие от React, которое видно на счётчиках',
  },
  { slug: '03-memo', num: 3, block: 1, title: 'Производные значения и createMemo', summary: '' },
  { slug: '04-effects', num: 4, block: 1, title: 'Эффекты и автотрекинг', summary: '' },
  { slug: '05-props', num: 5, block: 1, title: 'Ловушки props', summary: '' },
  { slug: '06-control-flow', num: 6, block: 1, title: 'Управление потоком', summary: '' },
  { slug: '07-stores', num: 7, block: 2, title: 'Stores и вложенное состояние', summary: '' },
  { slug: '08-context', num: 8, block: 2, title: 'Context', summary: '' },
  { slug: '09-async', num: 9, block: 2, title: 'Асинхронность', summary: '' },
  { slug: '10-primitives', num: 10, block: 2, title: 'Свои примитивы и use:-директивы', summary: '' },
  { slug: '11-router', num: 11, block: 2, title: 'Роутинг', summary: '' },
  { slug: '12-ark-anatomy', num: 12, block: 3, title: 'Анатомия headless-компонента', summary: '' },
  { slug: '13-ark-forms', num: 13, block: 3, title: 'Формы: передача показаний', summary: '' },
  { slug: '14-ark-data', num: 14, block: 3, title: 'Данные и навигация: квитанции', summary: '' },
  { slug: '15-park-ui', num: 15, block: 3, title: 'Park UI и Panda CSS', summary: '' },
  { slug: '16-capstone', num: 16, block: 4, title: 'Мини-кабинет', summary: '' },
  { slug: '17-bundle', num: 17, block: 4, title: 'Замер бандла', summary: '' },
]

/**
 * Готовые уроки. lazy() грузит страницу отдельным чанком — до перехода
 * на урок его код в браузер не приезжает.
 *
 * Путь внутри import() обязан быть литералом: Vite анализирует его на этапе
 * сборки, чтобы понять, какие чанки вообще существуют. Собрать путь из
 * переменной не выйдет — отсюда явная таблица.
 */
export const LESSON_PAGES: Record<string, Component> = {
  '00-frontend-basics': lazy(() => import('./lessons/00-frontend-basics')),
  '01-signals': lazy(() => import('./lessons/01-signals')),
  '02-components-run-once': lazy(() => import('./lessons/02-components-run-once')),
}

export const isReady = (slug: string) => slug in LESSON_PAGES
