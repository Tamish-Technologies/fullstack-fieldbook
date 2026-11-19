import { useEffect, useRef, useState } from 'react'

type Availability = 'checking' | 'available' | 'ready' | 'missing' | 'reload'
type Action = 'download' | 'update'
const script = '/sw.js'

function askWorker(
  worker: ServiceWorker,
  type: 'FIELD_BOOK_CHECK' | 'FIELD_BOOK_PREPARE',
  timeout: number,
) {
  return new Promise<boolean>((resolve) => {
    const channel = new MessageChannel()
    function finish(ready: boolean) {
      window.clearTimeout(timer)
      channel.port1.close()
      resolve(ready)
    }
    const timer = window.setTimeout(() => finish(false), timeout)
    channel.port1.onmessage = (event) => finish(event.data?.ready === true)
    try {
      worker.postMessage({ type }, [channel.port2])
    } catch {
      finish(false)
    }
  })
}

function waitForControl(
  service: ServiceWorkerContainer,
  registration: ServiceWorkerRegistration,
) {
  if (service.controller) return Promise.resolve(true)
  const worker = registration.installing ?? registration.waiting ?? registration.active
  if (!worker || worker.state === 'redundant') return Promise.resolve(false)
  return new Promise<boolean>((resolve) => {
    function finish(ready: boolean) {
      window.clearTimeout(timer)
      service.removeEventListener('controllerchange', inspect)
      worker?.removeEventListener('statechange', inspect)
      resolve(ready)
    }
    function inspect() {
      if (service.controller) finish(true)
      else if (worker?.state === 'redundant') finish(false)
    }
    const timer = window.setTimeout(() => finish(false), 60000)
    service.addEventListener('controllerchange', inspect)
    worker.addEventListener('statechange', inspect)
    inspect()
  })
}

const readiness = {
  checking: 'Checking this browser’s offline copy…',
  available: 'Download the course while online to study offline.',
  ready: 'Ready for offline study.',
  missing: 'The offline copy is incomplete. Download it again when connected.',
  reload: 'Reload Fieldbook to connect this tab to its offline copy.',
}

export function OfflineCourse() {
  const service = import.meta.env.PROD && window.isSecureContext
    ? navigator.serviceWorker
    : undefined
  const [availability, setAvailability] = useState<Availability>('checking')
  const [online, setOnline] = useState(navigator.onLine)
  const [waiting, setWaiting] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [action, setAction] = useState<Action | null>(null)
  const [message, setMessage] = useState('')
  const refresh = useRef<() => Promise<void>>(async () => {})
  const actionLock = useRef(false)

  useEffect(() => {
    if (!service) return
    const container: ServiceWorkerContainer = service
    const events = new AbortController()
    const options = { signal: events.signal }
    const watched = new WeakSet<EventTarget>()
    let sequence = 0

    function watch(target: EventTarget | null | undefined, event: string) {
      if (!target || watched.has(target)) return
      watched.add(target)
      target.addEventListener(event, inspect, options)
    }

    async function inspect() {
      const request = ++sequence
      setOnline(navigator.onLine)
      try {
        const registration = await container.getRegistration()
        if (events.signal.aborted || sequence !== request) return
        watch(registration, 'updatefound')
        watch(registration?.installing, 'statechange')
        watch(registration?.waiting, 'statechange')
        watch(registration?.active, 'statechange')
        setWaiting(Boolean(registration?.waiting && container.controller))
        setUpdating(Boolean(registration?.installing && container.controller))
        const controller = container.controller
        const next = controller
          ? (await askWorker(controller, 'FIELD_BOOK_CHECK', 5000)) ? 'ready' : 'missing'
          : registration?.installing ? 'checking'
            : registration?.active ? 'reload' : 'available'
        if (!events.signal.aborted && sequence === request) setAvailability(next)
      } catch {
        if (!events.signal.aborted && sequence === request) setAvailability('available')
      }
    }

    refresh.current = inspect
    window.addEventListener('online', inspect, options)
    window.addEventListener('offline', inspect, options)
    window.addEventListener('focus', inspect, options)
    container.addEventListener('controllerchange', inspect, options)
    void inspect()
    return () => events.abort()
  }, [service])

  async function perform(job: Action) {
    if (!service || actionLock.current) return
    actionLock.current = true
    setAction(job)
    setMessage('')
    try {
      if (job === 'update') {
        const registration = await service.getRegistration()
        if (!registration) throw Error()
        const current = await registration.update()
        if (!current.installing && !current.waiting) setMessage('No newer course copy was found.')
      } else {
        const controller = service.controller
        if (controller) {
          if (!(await askWorker(controller, 'FIELD_BOOK_PREPARE', 60000))) throw Error()
        } else {
          const registration = await service.register(script, { updateViaCache: 'none' })
          if (!(await waitForControl(service, registration))) throw Error()
        }
      }
    } catch {
      setMessage(job === 'download'
        ? 'The course download could not finish. Check your connection and available browser storage, then try again.'
        : 'Could not check for an update. Reconnect and try again.')
    } finally {
      await refresh.current()
      actionLock.current = false
      setAction(null)
    }
  }

  return (
    <section className="panel" aria-labelledby="offline-course">
      <h2 id="offline-course">Offline study</h2>
      {!service ? (
        <p>
          Offline downloads are available on the built site in browsers that
          support service workers on HTTPS or a local preview.
        </p>
      ) : (
        <>
          <p aria-live="polite">
            {action === 'download' ? 'Downloading the course…' : readiness[availability]}
          </p>
          {!online && <p>You’re offline. Reconnect to download or update the course.</p>}
          <p className="small">
            The copy includes lessons, quizzes, browser labs and starter files.
            Local projects still use their own tools. Download project
            dependencies while online.
          </p>
          {availability === 'reload' ? (
            <button className="secondary" onClick={() => window.location.reload()}>
              Reload Fieldbook
            </button>
          ) : availability === 'ready' ? (
            <button className="secondary" disabled={!online || !!action || waiting || updating}
              onClick={() => void perform('update')}>
              {action === 'update' || updating ? 'Checking for updates…' : 'Check for updates'}
            </button>
          ) : (
            <button className="secondary" disabled={!online || !!action || availability === 'checking'}
              onClick={() => void perform('download')}>
              {availability === 'missing' ? 'Download course again' : 'Download course'}
            </button>
          )}
          {waiting && (
            <p className="notice" aria-live="polite">
              An update is ready. Finish your work, close all Fieldbook tabs and app windows,
              then reopen Fieldbook. Your saved progress stays in this browser.
            </p>
          )}
          <p aria-live="polite" hidden={!message}>{message}</p>
        </>
      )}
    </section>
  )
}
