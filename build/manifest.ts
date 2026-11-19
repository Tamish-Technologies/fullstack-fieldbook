import { readFileSync } from 'node:fs'
import type { Lesson, Method } from '../src/course'

const read = (name: string) =>
  readFileSync(new URL('../docs/curriculum/' + name, import.meta.url), 'utf8')
function rows(name: string) {
  const [header, ...rows] = read(name).trim().split(/\r?\n/)
  const keys = header!.split(',')
  return rows.map((line) => {
    const fields = line.split(',')
    if (fields.length !== keys.length || line.includes('"'))
      throw Error('Unexpected inventory format in ' + name)
    return Object.fromEntries(
      keys.map((key, i) => [key, fields[i]!]),
    ) as Record<string, string>
  })
}

// Read the two planning indexes at build time. Select only learner-facing metadata.
export function loadManifest(): Lesson[] {
  const titles = new Map<string, { title: string; chapters: string }>()
  for (const line of read('PROPOSED_LESSON_MAP.md').split('\n')) {
    const cells = line.split('|').map((cell) => cell.trim().replaceAll('`', ''))
    if (/^p1-w\d{2}-l\d{2}$/.test(cells[1] ?? '')) {
      const chapters = cells[3]!.match(/C\d+(?:[–-]C?\d+)?/g)?.join(', ')
      if (!chapters || titles.has(cells[1]!))
        throw Error('Invalid lesson mapping: ' + cells[1])
      titles.set(cells[1]!, { title: cells[2]!, chapters })
    }
  }
  const sourceChecks = rows('D0_CHECKPOINT_MASTER_INDEX.csv')
  const inventory = new Map(
    sourceChecks.map((row) => [row.checkpoint_id!, row]),
  )
  if (inventory.size !== sourceChecks.length)
    throw Error('Duplicate checkpoint in master index')
  const used = new Set<string>()
  const ids = new Set<string>()
  const manifest = rows('D0_PREREQUISITE_INDEX.csv').map((row) => {
    const id = row.lesson_id!
    const title = titles.get(id)
    if (!title || ids.has(id)) throw Error('Invalid lesson ID: ' + id)
    ids.add(id)
    const checks = [
      'required_checkpoint_ids',
      'optional_checkpoint_ids',
    ].flatMap((key) =>
      row[key]!.split(';')
        .filter(Boolean)
        .map((checkId) => {
          const check = inventory.get(checkId)
          const required = key === 'required_checkpoint_ids'
          if (
            !check ||
            used.has(checkId) ||
            check.lesson_id !== id ||
            check.required !== String(required) ||
            ![
              'quiz-auto',
              'browser-code-auto',
              'local-project-self-verified',
              'optional-enrichment',
            ].includes(check.verification_method!)
          )
            throw Error('Invalid checkpoint: ' + checkId)
          used.add(checkId)
          return {
            id: checkId,
            required,
            method: check.verification_method as Method,
          }
        }),
    )
    return {
      id,
      ...title,
      week: row.week_id!.slice(-2),
      required: row.required_lesson === 'true',
      previous: row.requires_lesson_id!,
      previousWeek: row.requires_completed_week!.slice(-2),
      checks,
    }
  })
  if (used.size !== inventory.size || titles.size !== ids.size)
    throw Error('Unmapped planning inventory')
  return manifest
}
