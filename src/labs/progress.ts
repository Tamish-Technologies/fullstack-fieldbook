import { labFor, projects } from '../content/catalog'
import { evaluate, type Evidence, type Progress } from '../learning'

export type Answers = Record<string, string>
export function answersValid(id: string, answers: Answers, complete = false) {
  const project = Object.hasOwn(projects, id) ? projects[id] : undefined
  if (project) {
    const known = new Map<string, (value: string) => boolean>()
    project.items.forEach((_, i) =>
      known.set('item' + i, (value) => value === 'yes'),
    )
    project.fields.forEach((field, i) =>
      known.set('note' + i, (value) => value.length <= field.max),
    )
    if (project.choices)
      known.set('choice', (value) => project.choices!.includes(value))
    if (
      Object.entries(answers).some(
        ([k, v]) => typeof v !== 'string' || !known.get(k)?.(v),
      )
    )
      return false
    return (
      !complete ||
      (project.items.every((_, i) => answers['item' + i] === 'yes') &&
        project.fields.every(
          (f, i) => f.optional || answers['note' + i]?.trim(),
        ) &&
        (!project.choices || !!answers.choice) &&
        (!project.passingChoice || answers.choice === project.passingChoice))
    )
  }
  if (!labFor(id)) return false
  return Object.entries(answers).every(
    ([k, v]) =>
      typeof v === 'string' &&
      (id === 'p1-w01-l05-c01'
        ? ['wide', 'narrow'].includes(k) && v.length <= 600
        : (k === 'code' && v.length <= 4000) ||
          (id === 'p1-w02-l01-c02' &&
            k === 'concept' &&
            ['neither', 'property', 'rebind'].includes(v)) ||
          (id === 'p1-w03-l09-c01' &&
            k === 'concept' &&
            ['filter', 'mutation', 'id'].includes(v))),
  )
}
export function recordPractical(
  progress: Progress,
  id: string,
  responses?: Answers,
): Progress {
  if (progress.evidence.some((e) => e.id === id)) return progress
  if (evaluate(progress).blocked.has(id.slice(0, -4)))
    throw Error(
      'Progress changed. Reopen the eligible lesson before submitting.',
    )
  const at = new Date().toISOString()
  let evidence: Evidence
  if (responses) {
    if (!answersValid(id, responses, true) || !projects[id])
      throw Error('Complete the checklist and required fields first.')
    const required = projects[id]!.items.length
    evidence = {
      id,
      method: 'local-project-self-verified',
      confirmed: required,
      required,
      responses,
      at,
    }
  } else {
    const lab = labFor(id)
    if (!lab || !answersValid(id, {})) throw Error('Unknown lab.')
    evidence = {
      id,
      method: 'browser-code-auto',
      mandatory: lab.checks.length,
      passed: lab.checks.length,
      at,
    }
  }
  const next = { ...progress, evidence: [...progress.evidence, evidence] }
  if (responses && progress.practicalDrafts) {
    next.practicalDrafts = { ...progress.practicalDrafts }
    delete next.practicalDrafts[id]
  }
  return next
}
