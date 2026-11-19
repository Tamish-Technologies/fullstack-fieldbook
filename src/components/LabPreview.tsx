import { useId, useState } from 'react'

const panels = [
  ['Code', 'The exercise source will appear here when this lab is available.'],
  ['Preview', 'The isolated preview is unavailable in the foundation release.'],
  ['Tests', 'No behavior checks have run. This checkpoint remains pending.'],
] as const

export function LabPreview({
  example,
  instruction,
}: {
  example?: string
  instruction?: string
}) {
  const id = useId()
  const [active, setActive] = useState(0)
  return (
    <section className="panel">
      <h2>Browser lab preview</h2>
      <div className="lab-tabs" role="tablist" aria-label="Lab preview panels">
        {panels.map(([label], i) => (
          <button
            key={label}
            role="tab"
            id={id + '-tab-' + i}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            aria-controls={id + '-panel-' + i}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              const next = {
                ArrowRight: (i + 1) % 3,
                ArrowLeft: (i + 2) % 3,
                Home: 0,
                End: 2,
              }[event.key]
              if (next === undefined) return
              event.preventDefault()
              setActive(next)
              document.getElementById(id + '-tab-' + next)?.focus()
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map(([label, text], i) => (
        <div
          key={label}
          role="tabpanel"
          tabIndex={0}
          hidden={i !== active}
          id={id + '-panel-' + i}
          aria-labelledby={id + '-tab-' + i}
        >
          {i === 0 && example ? (
            <pre tabIndex={0}>
              <code>{example}</code>
            </pre>
          ) : (
            <p>
              {i === 1 && instruction ? 'Local practice: ' + instruction : text}
            </p>
          )}
        </div>
      ))}
    </section>
  )
}
