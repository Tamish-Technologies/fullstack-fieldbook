import { useSyncExternalStore } from 'react'
const subscribe = (notify: () => void) => {
  window.addEventListener('popstate', notify)
  window.addEventListener('hashchange', notify)
  return () => {
    window.removeEventListener('popstate', notify)
    window.removeEventListener('hashchange', notify)
  }
}
export function useLocation() {
  const location = useSyncExternalStore(
    subscribe,
    () => window.location.pathname + window.location.hash,
  )
  const [pathname, fragment] = location.split('#', 2)
  return { path: pathname!.replace(/\/$/, '') || '/', fragment }
}
export function localNavigation(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey
  )
    return
  const link =
    event.target instanceof Element &&
    event.target.closest<HTMLAnchorElement>('a[href^="/"]')
  if (!link || link.origin !== location.origin || link.target || link.download)
    return
  if (location.pathname === link.pathname && location.search === link.search) {
    if (!link.hash) event.preventDefault()
    return
  }
  event.preventDefault()
  history.pushState(null, '', link.href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
