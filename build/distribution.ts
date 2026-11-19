import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'

const learnerDownloads = Array.from({ length: 8 }, (_, index) => {
  const file = 'study-tasks-v' + (index + 5) + '.zip'
  return ['projects/' + file, 'student-projects/' + file, 'application/zip'] as const
})
const staticFiles = [
  ['LICENSE', '../LICENSE', 'text/plain; charset=utf-8'],
  ['LICENSE-CONTENT.md', '../LICENSE-CONTENT.md', 'text/plain; charset=utf-8'],
  ['THIRD_PARTY_NOTICES.txt', '../THIRD_PARTY_NOTICES.txt', 'text/plain; charset=utf-8'],
  ['manifest.webmanifest', 'app-assets/manifest.webmanifest', 'application/manifest+json'],
  ['icons/icon-192.png', 'app-assets/icon-192.png', 'image/png'],
  ['icons/icon-512.png', 'app-assets/icon-512.png', 'image/png'],
  ...learnerDownloads,
] as const

export function distribution(): Plugin {
  const files = new Map(staticFiles.map(([name, source, type]) => [
    name,
    { path: new URL('./' + source, import.meta.url), type },
  ]))
  return {
    name: 'fieldbook-distribution',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'GET' && req.method !== 'HEAD') return next()
        const entry = files.get((req.url ?? '').split('?')[0]!.slice(1))
        if (!entry) return next()
        const bytes = readFileSync(entry.path)
        res.setHeader('Content-Type', entry.type)
        res.setHeader('Content-Length', bytes.length)
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.end(req.method === 'HEAD' ? undefined : bytes)
      })
    },
    generateBundle() {
      for (const [fileName, entry] of files) {
        this.emitFile({ type: 'asset', fileName, source: readFileSync(entry.path) })
      }
      for (const fileName of ['_redirects', '404.html']) {
        this.emitFile({
          type: 'asset',
          fileName,
          source: readFileSync(new URL('./cloudflare/' + fileName, import.meta.url)),
        })
      }
    },
  }
}
