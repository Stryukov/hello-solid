import type { Component } from 'solid-js'
import { Demo as DemoBox, LessonPage, Takeaway } from '../../ui/LessonPage'
import { SourceView } from '../../ui/SourceView'
import { TracePanel } from '../../ui/TracePanel'
import { createTraceGroup } from '../../lib/trace'
import { Demo } from './Demo'
import demoSource from './Demo.tsx?raw'

const Lesson: Component = () => {
  const trace = createTraceGroup([['Demo', 'component']])

  return (
    <LessonPage
      num={1}
      title="Сигналы"
      lead="createSignal — единственный примитив состояния, который нужно понять по-настоящему. Всё остальное в Solid выстроено вокруг него."
    >
      <p>
        Сигнал — это ячейка со значением, которая <strong>помнит, кто её читал</strong>.
        Когда значение меняется, сигнал сам будит тех, кто на него подписан: конкретный
        текстовый узел в DOM, конкретный эффект. Не компонент целиком — именно тех, кто
        читал.
      </p>

      <pre class="border-line bg-surface-sunken overflow-x-auto rounded-lg border p-4 font-mono text-xs leading-relaxed">
        <code>{'const [count, setCount] = createSignal(0)'}</code>
      </pre>

      <p>
        Слева пара функций: <code>count</code> — геттер, <code>setCount</code> — сеттер.
        Именно <strong>геттер, а не значение</strong>. Поэтому в разметке пишут{' '}
        <code>{'{count()}'}</code> со скобками. Скобки здесь не украшение: они и есть момент
        подписки. Solid узнаёт «вот этот кусок кода читает вот этот сигнал» ровно в момент
        вызова.
      </p>

      <p>
        Отсюда следствие, на котором спотыкаются все: если вызвать геттер один раз и положить
        результат в переменную, получится <strong>мёртвое число</strong>. Демка показывает оба
        варианта рядом.
      </p>

      <DemoBox>
        <Demo trace={trace} />
      </DemoBox>

      <TracePanel
        trace={trace}
        note="Жми «Увеличить» сколько угодно — счётчик тела компонента останется равен единице. Почему так, разбираем в уроке 02."
      />

      <Takeaway>
        <p>
          Живое значение обновляется, снимок — нет, хотя оба взяты из одного сигнала.
          Разница только в том, <strong>где вызван геттер</strong>: внутри разметки, которую
          Solid отслеживает, или один раз при создании компонента.
        </p>
      </Takeaway>

      <h3>Сеттер</h3>
      <p>
        У сеттера две формы. Обычная — передать новое значение:{' '}
        <code>setCount(5)</code>. Функциональная — вычислить из предыдущего:{' '}
        <code>{'setCount((prev) => prev + 1)'}</code>. Вторая нужна, когда значение зависит
        от текущего, а прочитать его геттером неудобно или нежелательно.
      </p>
      <p>
        Отдельная тонкость: если положить в сигнал <strong>функцию</strong>, Solid решит,
        что это функциональная форма, и вызовет её. Чтобы сохранить именно функцию, её
        оборачивают: <code>{'setFn(() => myFunction)'}</code>.
      </p>

      <h3>Сравнение по ссылке</h3>
      <p>
        Сигнал не уведомляет подписчиков, если новое значение равно старому по{' '}
        <code>===</code>. Для чисел и строк это ровно то, что нужно. Но для массивов и
        объектов означает: мутировать их на месте бесполезно — ссылка та же, сигнал молчит.
        Либо создавай новый объект, либо бери <code>createStore</code> (урок 07), который
        сделан именно для вложенных структур.
      </p>

      <SourceView source={demoSource} file="src/lessons/01-signals/Demo.tsx" />
    </LessonPage>
  )
}

export default Lesson
