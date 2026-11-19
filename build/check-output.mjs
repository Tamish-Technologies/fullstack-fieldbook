import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { relative, sep } from 'node:path'

const downloads = new Map([
  [5, '1aec5792d399f47999d6d3d44b139325308efa6fc1d1f8b8294f157709211d6f'],
  [6, '46472b6d08a5f51d6ca70b89b9a9a72b50fda2e288ae7d13a69598770eeb4374'],
  [7, '30c9e32161ee79ec13cb510876c74ebd021a49725cedff21e54a3c593f3d9c7f'],
  [8, 'e0f873e19b26c0004b9e9f8f04edb2064fd702233f11c874d4d3df41492da670'],
  [9, '36997157103e991838e382cbf2dfdc0423af5e6ef1c3a0a6ac3122e278bb9650'],
  [10, '4d909b571af495813b7dfc7b6c25e6f90b78750051a8ad5c2918e9b8a85dbb9c'],
  [11, '0d6b63573efc99c9edba493dce0d5ae6390b52867b0595746945e3bebd29bcb7'],
  [12, 'c9c08208efe1bd8e39b9728490516bd8b07d38a4862e00ae9ecaf7cfdb069c4e'],
].map(([week, digest]) => ['projects/study-tasks-v' + week + '.zip', digest]))
const required = new Set([
  'index.html',
  'LICENSE',
  'LICENSE-CONTENT.md',
  'THIRD_PARTY_NOTICES.txt',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  ...downloads.keys(),
])
const bundle = /^assets\/(?:index-[\w-]+\.(?:js|css)|(?:Article|CodeLab|parser\.worker)-[\w-]+\.js)$/
const privateMaterial = /instructor-guide|code-starter-and-reference|fullstack-fieldbook-source-materials|postgres(?:ql)?:\/\/[^\s]+@|BEGIN (?:RSA |EC )?PRIVATE KEY|D2_ONLY_TEST_FIXTURE/i
const names = readdirSync('dist', { recursive: true, withFileTypes: true })
  .filter((entry) => !entry.isDirectory())
  .map((entry) => {
    if (!entry.isFile()) throw Error('Unexpected non-file build entry: ' + entry.name)
    return relative('dist', entry.parentPath + '/' + entry.name).split(sep).join('/')
  })
  .filter((name) => name !== 'sw.js')
  .sort()

const files = []
for (const name of names) {
  if (!required.has(name) && !bundle.test(name))
    throw Error('Unexpected build asset: ' + name)
  required.delete(name)
  const body = readFileSync('dist/' + name)
  const hash = createHash('sha256').update(body).digest()
  if (downloads.has(name) && hash.toString('hex') !== downloads.get(name))
    throw Error('Learner archive checksum differs from the reviewed copy: ' + name)
  if (/\.(?:html|js|css|webmanifest)$/.test(name) && privateMaterial.test(body.toString('utf8')))
    throw Error('Private or test-only content in ' + name)
  files.push(['/' + name, 'sha256-' + hash.toString('base64')])
}
if (required.size) throw Error('Required build files are missing: ' + [...required].join(', '))
const worker = readFileSync(new URL('./offline-worker.js', import.meta.url), 'utf8')
const manifest = JSON.stringify(files)
const version = createHash('sha256').update(manifest).update(worker).digest('hex').slice(0, 20)
writeFileSync('dist/sw.js', `const RELEASE = ${JSON.stringify(version)}\nconst FILES = ${manifest}\n${worker}`)
console.log(`Release ${version} includes ${files.length} verified offline files and the service worker.`)
