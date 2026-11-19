import { useEffect, useRef, useState } from 'react'
import { layoutFeedback, layoutFixture, layoutPass } from '../labs/responsive'

function LayoutSample({
  width,
  source,
  onFit,
}: {
  width: number
  source: string
  onFit: () => void
}) {
  const [feedback, setFeedback] = useState('Measuring…')
  const port = useRef<MessagePort | null>(null)
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      port.current?.close()
      setFeedback((current) =>
        current === 'Measuring…'
          ? 'Measurement timed out. Run the checks again.'
          : current,
      )
    }, 5000)
    return () => {
      clearTimeout(timeout)
      port.current?.close()
    }
  }, [])
  return (
    <div className="layout-sample">
      <h3>
        {width}px preview <small>· {width === 768 ? 't01' : 't02'}</small>
      </h3>
      <p role="status">{feedback}</p>
      <div
        className="layout-viewport"
        role="region"
        aria-label={width + 'px scrollable preview'}
        tabIndex={0}
      >
        <iframe
          title={'Study Tasks at ' + width + 'px'}
          sandbox="allow-scripts"
          width={width}
          height={180}
          srcDoc={source}
          onLoad={(event) => {
            const channel = new MessageChannel()
            port.current?.close()
            port.current = channel.port1
            channel.port1.onmessage = ({ data }) => {
              try {
                const result = layoutFeedback(data, width)
                setFeedback(result)
                if (result === layoutPass) onFit()
              } catch {
                setFeedback(
                  'The measurement was incomplete. Run the checks again.',
                )
              }
              channel.port1.close()
            }
            // A sandbox with an opaque origin requires "*". Only this frame
            // receives the port, and the app accepts a reply on that port alone.
            event.currentTarget.contentWindow?.postMessage(
              'measure-layout',
              '*',
              [channel.port2],
            )
          }}
        />
      </div>
    </div>
  )
}

export function ResponsiveLab({
  initial,
  edit,
  onPass,
}: {
  initial: Record<string, string>
  edit: (key: string, value: string) => void
  onPass: () => void
}) {
  const runId = useRef(0)
  const passed = useRef(new Set<number>())
  const wide = initial.wide ?? 'display: flex;\ngap: 0.75rem;'
  const narrow = initial.narrow ?? 'flex-direction: row;'
  const [run, setRun] = useState<{ source: string; sequence: number } | null>(
    null,
  )
  const [error, setError] = useState('')
  function check() {
    try {
      const source = layoutFixture(wide, narrow)
      passed.current.clear()
      setRun({ source, sequence: ++runId.current })
      setError('')
    } catch (e) {
      setRun(null)
      setError(e instanceof Error ? e.message : 'Check your CSS declarations.')
    }
  }
  return (
    <section className="panel layout-lab">
      <h2>Practice lab · responsive form</h2>
      <p>
        The starter puts both controls in a row. Run it, then change the narrow
        layout so the button sits below the input with space between them. Tab
        through both previews to check the focus order. On macOS, enable full
        keyboard navigation or use Option-Tab in Safari to reach the button.
      </p>
      <label htmlFor="layout-wide">Base declarations for .controls</label>
      <textarea
        id="layout-wide"
        spellCheck={false}
        maxLength={600}
        value={wide}
        onChange={(e) => {
          ++runId.current
          edit('wide', e.target.value)
          setRun(null)
          setError('')
        }}
      />
      <label htmlFor="layout-narrow">Narrow override · up to 36rem</label>
      <textarea
        id="layout-narrow"
        spellCheck={false}
        maxLength={600}
        value={narrow}
        onChange={(e) => {
          ++runId.current
          edit('narrow', e.target.value)
          setRun(null)
          setError('')
        }}
      />
      <details>
        <summary>Supported CSS and hints</summary>
        <p>
          Enter declarations inside the supplied rules. You can use display,
          flex-direction, flex-wrap, gap, row-gap, column-gap, align-items,
          justify-content, grid-template-columns and grid-auto-flow with simple
          values.
        </p>
        <p>
          First check which axis your controls follow. Then check whether the
          narrow rule changes that axis and leaves a visible gap.
        </p>
      </details>
      <p className="small">
        Pass both widths at both text sizes to earn this browser checkpoint.
      </p>
      <button className="primary" type="button" onClick={check}>
        Run layout checks
      </button>
      {error && <p role="alert">{error}</p>}
      {run && (
        <div key={run.sequence}>
          {[768, 375].map((width) => (
            <LayoutSample
              key={width}
              width={width}
              source={run.source}
              onFit={() => {
                if (run.sequence !== runId.current) return
                passed.current.add(width)
                if (passed.current.size === 2) onPass()
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
