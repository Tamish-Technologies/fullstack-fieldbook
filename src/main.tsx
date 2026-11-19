import { createRoot } from 'react-dom/client'
import { App } from './App'
import { createStore, STORAGE_KEY } from './store'
import { localNavigation } from './router'
import './styles.css'

const store = createStore(() => window.localStorage)
document.documentElement.dataset.theme = store.getSnapshot().record.theme
window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY || e.key === null) store.sync()
})
document.addEventListener('click', localNavigation)
createRoot(document.getElementById('root')!).render(<App store={store} />)
