import { useSyncExternalStore } from 'react'
const subscribe = (notify: () => void) => {
  window.addEventListener('popstate', notify)
  return () => window.removeEventListener('popstate', notify)
}
export const usePath = () =>
  useSyncExternalStore(
    subscribe,
    () => window.location.pathname.replace(/\/$/, '') || '/',
  )
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
  event.preventDefault()
  if (location.pathname !== link.pathname) {
    history.pushState(null, '', link.href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
}
