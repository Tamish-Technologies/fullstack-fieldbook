// The build supplies RELEASE and FILES for this exact set of assets.
const PREFIX = 'fullstack-fieldbook-release-'
const CACHE = PREFIX + RELEASE
const entries = new Map(FILES)
const shell = '/index.html'
const core = [...entries.keys()].filter((path) => path === shell || path.startsWith('/assets/'))
const pagePath = /^(?:\/(?:index\.html|course|progress|settings)?|\/course\/week\/\d{2}(?:\/lesson\/\d{2})?)\/?$/
const address = (path) => new URL(path, self.location.origin).href

function releaseRequest(path) {
  return new Request(address(path), {
    integrity: entries.get(path),
    cache: 'reload',
    credentials: 'omit',
    redirect: 'error',
  })
}

async function prepare() {
  const cache = await caches.open(CACHE)
  // addAll commits the entries as a batch once every integrity-checked fetch succeeds.
  await cache.addAll([...entries.keys()].map(releaseRequest))
  return cache
}

self.addEventListener('install', (event) => {
  event.waitUntil(prepare().catch(async (error) => {
    await caches.delete(CACHE)
    throw error
  }))
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key)
    }
    await self.clients.claim()
  })())
})

async function hasFiles(cache, paths) {
  const available = new Set((await cache.keys()).map((request) => request.url))
  return paths.every((path) => available.has(address(path)))
}

self.addEventListener('message', (event) => {
  const port = event.ports[0]
  const action = event.data?.type
  if (!port || !['FIELD_BOOK_CHECK', 'FIELD_BOOK_PREPARE'].includes(action)) return
  event.waitUntil((async () => {
    try {
      const cache = action === 'FIELD_BOOK_PREPARE' ? await prepare() : await caches.open(CACHE)
      port.postMessage({ ready: await hasFiles(cache, [...entries.keys()]) })
    } catch {
      port.postMessage({ ready: false })
    }
  })())
})

async function availablePage(request) {
  try {
    let cache = await caches.open(CACHE)
    if (!(await hasFiles(cache, core))) cache = await prepare()
    const page = await cache.match(address(shell), { ignoreVary: true })
    if (page) return page
  } catch {
    // A partial cache cannot safely supply the application shell.
  }
  try {
    const live = await fetch(request, { cache: 'no-store', redirect: 'error' })
    const online = live.ok && /^text\/html\b/i.test(live.headers.get('Content-Type') || '')
    await live.body?.cancel()
    if (online) {
      // Start the next navigation without this release so its HTML and assets
      // come from the same online version. Leave the cache for existing tabs.
      await self.registration.unregister()
      return recoveryPage(new URL(request.url).pathname)
    }
  } catch {
    // An offline browser still receives a page explaining how to reconnect.
  }
  return recoveryPage()
}

function recoveryPage(onlinePath) {
  const title = onlinePath ? 'Continue studying online' : 'Offline copy unavailable'
  return new Response(`<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · FullStack Fieldbook</title>
<main><h1>${title}</h1>
${onlinePath
  ? `<p>This browser’s offline copy is incomplete. Your saved progress is still available. Close any other Fieldbook tabs before downloading the course again in Settings.</p>
<p><a href="${onlinePath}">Open the online lesson or page</a></p>`
  : `<p>Reconnect, then reopen FullStack Fieldbook. If an update is waiting, close all Fieldbook tabs and app windows before reopening.</p>
<p>Course downloads and your saved progress are stored separately.</p>
<p><a href="/settings">Try opening Settings again</a></p>`}</main></html>`, {
    status: 503,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return
  if (request.mode === 'navigate' && pagePath.test(url.pathname)) {
    event.respondWith(availablePage(request))
  } else if (!url.search && entries.has(url.pathname)) {
    event.respondWith((async () => {
      const cached = await caches.open(CACHE).then((cache) => cache.match(address(url.pathname), { ignoreVary: true })).catch(() => undefined)
      return cached ?? fetch(releaseRequest(url.pathname))
    })())
  }
})
