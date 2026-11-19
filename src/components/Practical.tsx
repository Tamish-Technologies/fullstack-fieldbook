import { lazy, Suspense, useRef, useState, type FormEvent } from 'react'
import { labFor, projects } from '../content/catalog'
import { answersValid, recordPractical, type Answers } from '../labs/progress'
import type { ProgressStore } from '../store'
import { ResponsiveLab } from './ResponsiveLab'

const CodeLab = lazy(async () => ({
  default: (await import('./CodeLab')).CodeLab,
}))

export function Practical({
  id,
  store,
}: {
  id: string
  store?: ProgressStore
}) {
  const record = store?.getSnapshot().record
  const evidence = record?.evidence.find((e) => e.id === id)
  const saved =
    evidence?.method === 'local-project-self-verified'
      ? evidence.responses
      : undefined
  const [pending, setPending] = useState<Answers | null>(null)
  const answers = pending ?? saved ?? record?.practicalDrafts?.[id] ?? {}
  const latest = useRef(answers)
  latest.current = answers
  const revision = useRef(0)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const local = projects[id],
    lesson = id.slice(8, 10),
    lab = labFor(id)
  const onHold = Boolean(
    local?.passingChoice && answers.choice && answers.choice !== local.passingChoice,
  )
  async function edit(key: string, value: string) {
    const before = latest.current[key]
    const version = ++revision.current
    const next = { ...latest.current }
    if (value || key === 'code' || key === 'wide' || key === 'narrow')
      next[key] = value
    else delete next[key]
    latest.current = next
    setPending(next)
    setError('')
    setStatus('')
    try {
      if (!store) return
      await store.update((p) => {
        const draft = { ...p.practicalDrafts?.[id] }
        if (draft[key] !== before)
          throw Error(
            'This field changed in another tab. Copy your edit and reopen the lesson.',
          )
        if (Object.hasOwn(next, key)) draft[key] = next[key]!
        else delete draft[key]
        return { ...p, practicalDrafts: { ...p.practicalDrafts, [id]: draft } }
      })
      if (revision.current === version) setPending(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The draft could not be saved.')
    }
  }
  async function pass(responses?: Answers) {
    try {
      await store?.update((p) => recordPractical(p, id, responses))
      setStatus(
        store ? '' : 'Practice complete. Review mode records no progress.',
      )
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Could not save this result. Run the check again.',
      )
    }
  }
  function confirm(e: FormEvent) {
    e.preventDefault()
    if (!answersValid(id, answers, true)) {
      setError('Check each item and complete the required fields.')
      return
    }
    void pass(answers)
  }
  return (
    <div id={id} className="practical" tabIndex={-1}>
      {local ? (
        <form className="panel local-project" onSubmit={confirm}>
          <h2>{local.title}</h2>
          <p>
            {store
              ? 'Complete this work on your own computer, then confirm each item. Your checklist and notes stay in this browser and are included in progress backups.'
              : 'Practice checklist. You can try the fields here. Use the regular lesson to save your observations and earn this checkpoint.'}{' '}
            Leave out credentials and personal details.
          </p>
          <fieldset disabled={!!saved}>
            <legend>Local project checklist</legend>
            {local.choices && (
              <label>
                {local.choiceLabel ?? 'Choose your challenge'}
                <select
                  required
                  value={answers.choice ?? ''}
                  onChange={(e) => void edit('choice', e.target.value)}
                >
                  <option value="">Select one task</option>
                  {local.choices.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
            )}
            {local.items.map((item, i) => (
              <label className="attestation" key={item}>
                <input
                  required
                  type="checkbox"
                  checked={answers['item' + i] === 'yes'}
                  onChange={(e) =>
                    void edit('item' + i, e.target.checked ? 'yes' : '')
                  }
                />
                <span>{item}</span>
              </label>
            ))}
            {local.fields.map((f, i) => (
              <label className="project-note" key={f.label}>
                {f.label}
                {f.optional ? ' (optional)' : ' (required)'}
                <textarea
                  maxLength={f.max}
                  required={!f.optional}
                  value={answers['note' + i] ?? ''}
                  onChange={(e) => void edit('note' + i, e.target.value)}
                />
              </label>
            ))}
          </fieldset>
          {onHold && (
            <p className="notice" role="status">
              Hold keeps this checkpoint open. Record the next check in your
              notes and return when the required evidence is ready.
            </p>
          )}
          {!saved && (
            <button className="primary" disabled={onHold}>Confirm local work</button>
          )}
        </form>
      ) : (
        lab &&
        (id === 'p1-w01-l05-c01' ? (
          <ResponsiveLab
            initial={answers}
            edit={(k, v) => void edit(k, v)}
            onPass={() => void pass()}
          />
        ) : (
          <Suspense fallback={<p role="status">Loading browser lab…</p>}>
            <CodeLab
              checkpoint={id}
              lesson={
                id.startsWith('p1-w01-')
                  ? lesson
                  : 'w' +
                    Number(id.slice(4, 6)) +
                    '-' +
                    lesson +
                    (id === 'p1-w04-l11-c02' ? '-copy' : '')
              }
              lab={lab}
              concept={answers.concept ?? ''}
              setConcept={(v) => void edit('concept', v)}
              code={answers.code ?? lab.starter}
              keepsDraft={!!store}
              edit={(v) => void edit('code', v)}
              onPass={() => void pass()}
            />
          </Suspense>
        ))
      )}
      <p className="practical-status" role="status">
        {error ||
          status ||
          (evidence
            ? local
              ? 'Self-verified locally.'
              : 'Browser checkpoint passed.'
            : '')}
      </p>
    </div>
  )
}
