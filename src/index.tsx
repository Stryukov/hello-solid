/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router } from '@solidjs/router'
import './index.css'
import { AppShell, LessonRoute } from './app'
import Home from './pages/Home'

const root = document.getElementById('root')

render(
  () => (
    <Router root={AppShell}>
      <Route path="/" component={Home} />
      <Route path="/l/:slug" component={LessonRoute} />
    </Router>
  ),
  root!,
)
