import { readStored, validate } from './backup'
import { emptyProgress, type Progress } from './learning'

const FOUNDATION_KEY = 'fullstack-fieldbook.phase1.v1'
export const STORAGE_KEY = 'fullstack-fieldbook.phase1.w01.v1'
type Phase = 'ready' | 'session' | 'corrupt' | 'conflict'
interface Snapshot {
  record: Progress
  phase: Phase
  warning: string
}
type StoragePort = Pick<Storage, 'getItem' | 'setItem'>
const temporary =
  'Progress is in memory only. Export a backup before closing this tab.'
const conflict =
  'Another tab changed your progress. Export this session or reload before saving again.'

export function createStore(access: () => StoragePort) {
  let raw: string | null = null
  let dirty = false
  let snapshot: Snapshot = {
    record: emptyProgress(),
    phase: 'ready',
    warning: '',
  }
  const listeners = new Set<() => void>()
  function publish(record: Progress, phase: Phase, warning = '') {
    snapshot = { record, phase, warning }
    listeners.forEach((fn) => fn())
  }
  function load(value: string | null) {
    raw = value
    try {
      publish(value === null ? emptyProgress() : readStored(value), 'ready')
    } catch {
      publish(
        emptyProgress(),
        'corrupt',
        'Stored progress could not be read. The original is preserved. Export a recovery copy or restore a valid backup in Settings.',
      )
    }
  }
  try {
    const current = access().getItem(STORAGE_KEY)
    load(current)
    if (current === null) {
      const archived = access().getItem(FOUNDATION_KEY)
      if (archived !== null) {
        try {
          const record = readStored(archived)
          publish(
            record,
            'ready',
            'Your D2 notes and preferences were carried forward. Foundation demo passes do not count toward Week 1. Your original D2 record is preserved.',
          )
        } catch {
          publish(
            snapshot.record,
            'ready',
            'Your previous D2 record could not be migrated and remains in its original storage entry.',
          )
        }
      }
    }
  } catch {
    publish(snapshot.record, 'session', temporary)
  }

  function sync() {
    try {
      const value = access().getItem(STORAGE_KEY)
      if (value === raw) return
      if (dirty) publish(snapshot.record, 'conflict', conflict)
      else load(value)
    } catch {
      publish(snapshot.record, 'session', temporary)
    }
  }
  function save(
    transform: (p: Progress) => Progress,
    expected?: Progress,
    recover = false,
    sessionOnlyAllowed = false,
  ) {
    const before = snapshot.record
    if (expected && expected !== before)
      throw Error('Progress changed. Review a new preview before confirming.')
    let readable = true
    let current: string | null
    try {
      current = access().getItem(STORAGE_KEY)
    } catch {
      current = raw
      readable = false
    }
    if (current !== raw || snapshot.phase === 'conflict') {
      sync()
      throw Error(
        'Progress changed in another tab. Review the current record before continuing.',
      )
    }
    const next = validate({
      ...transform(before),
      updatedAt: new Date().toISOString(),
    })
    if (snapshot.phase === 'corrupt' && !recover) {
      if (expected)
        throw Error(
          'Restore a valid backup or confirm a full course reset to replace unreadable storage.',
        )
      dirty = true
      publish(next, 'corrupt', snapshot.warning)
      return
    }
    const serialized = JSON.stringify(next)
    try {
      if (!readable) throw Error('Existing storage could not be checked.')
      access().setItem(STORAGE_KEY, serialized)
    } catch {
      // Destructive replacements are atomic: a failed write leaves the previous record available.
      if (expected && !(sessionOnlyAllowed && snapshot.phase === 'session')) {
        publish(
          before,
          snapshot.phase === 'corrupt' ? 'corrupt' : 'session',
          'Replacement was not saved. Your current session is preserved. Export it before retrying.',
        )
        throw Error('The browser could not save the replacement.')
      }
      dirty = true
      publish(next, 'session', temporary)
      return
    }
    raw = serialized
    dirty = false
    publish(next, 'ready')
  }
  return {
    getSnapshot: () => snapshot,
    subscribe(fn: () => void) {
      listeners.add(fn)
      return () => {
        listeners.delete(fn)
      }
    },
    sync,
    recovery: () => (snapshot.phase === 'corrupt' ? raw : null),
    async update(
      transform: (p: Progress) => Progress,
      expected?: Progress,
      recover = false,
      sessionOnlyAllowed = false,
    ) {
      const write = () => save(transform, expected, recover, sessionOnlyAllowed)
      if (typeof window !== 'undefined' && window.navigator.locks)
        await window.navigator.locks.request(STORAGE_KEY, write)
      else write()
    },
  }
}
export type ProgressStore = ReturnType<typeof createStore>
