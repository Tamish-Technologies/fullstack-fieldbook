import { useEffect, useRef, useState } from 'react'
import ParserWorker from '../labs/parser.worker?worker'
import interpreter from '../labs/language.js?raw'
import weekTwoChecks from '../labs/week-two-frame.js?raw'
import weekThreeChecks from '../labs/week-three-frame.js?raw'
import asyncLanguage from '../labs/week-four-async.js?raw'
import weekTwelveChecks from '../labs/week-twelve-frame.js?raw'
import weekElevenChecks from '../labs/week-eleven-frame.js?raw'
import weekTenChecks from '../labs/week-ten-frame.js?raw'
import weekNineChecks from '../labs/week-nine-frame.js?raw'
import weekEightChecks from '../labs/week-eight-frame.js?raw'
import weekSevenChecks from '../labs/week-seven-frame.js?raw'
import weekSixChecks from '../labs/week-six-frame.js?raw'
import weekFiveChecks from '../labs/week-five-frame.js?raw'
import weekFourChecks from '../labs/week-four-frame.js?raw'
import checks from '../labs/frame.js?raw'
import type { Lab } from '../content/practicals'

// Only repository-authored script and styles enter srcdoc. All learner input
// travels as data after the isolated frame has loaded.
const frame = `<!doctype html><html lang="en"><meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-local-lab'; form-action 'none'; base-uri 'none'">
<title>Exercise preview</title><style>body{font:16px/1.5 system-ui;margin:12px;color:#172920;background:white} main{display:flow-root} input,button{font:inherit;max-width:100%} button:focus,input:focus{outline:3px solid #156846}li{overflow-wrap:anywhere}</style>
<main></main><script nonce="local-lab">${interpreter}\n${weekTwoChecks}\n${weekThreeChecks}\n${asyncLanguage}\n${weekFourChecks}\n${weekFiveChecks}\n${weekSixChecks}\n${weekSevenChecks}\n${weekEightChecks}\n${weekNineChecks}\n${weekTenChecks}\n${weekElevenChecks}\n${weekTwelveChecks}\n${checks}</script></html>`

const collectionLab = (lesson: string) => /^w(?:[2-9]|1[0-2])-/.test(lesson)
const focusFixture = (lesson: string) => ['w2-07', 'w3-06'].includes(lesson)

function Attempt({
  checkpoint,
  lesson,
  lab,
  code,
  concept,
  onPass,
}: {
  checkpoint: string
  lesson: string
  lab: Lab
  code: string
  concept: string
  onPass: () => void
}) {
  const [result, setResult] = useState<boolean[] | string | null>(null)
  const [observed, setObserved] = useState<string[]>([])
  const [awaiting, setAwaiting] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const worker = useRef<Worker | null>(null)
  const port = useRef<MessagePort | null>(null)
  const active = useRef(true)
  const summary = useRef<HTMLHeadingElement>(null)
  function deadline() {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      worker.current?.terminate()
      port.current?.close()
      setResult(
        (r) =>
          r ?? 'The checks timed out. Shorten the exercise and run it again.',
      )
      active.current = false
    }, 5000)
  }
  useEffect(() => {
    active.current = true
    deadline()
    return () => {
      clearTimeout(timer.current)
      active.current = false
      worker.current?.terminate()
      port.current?.close()
    }
  }, [])
  useEffect(() => {
    if (result) summary.current?.focus({ preventScroll: true })
  }, [result])
  function start() {
    function dispatch(tree?: unknown) {
      if (!active.current) return
      const channel = new MessageChannel()
      port.current = channel.port1
      channel.port1.onmessage = ({ data }) => {
        if (!active.current) return
        if (data?.awaiting === true) {
          clearTimeout(timer.current)
          setAwaiting(true)
          return
        }
        if (data?.running === true) {
          // Keep the focus fixture visible throughout its native keyboard checks.
          if (!focusFixture(lesson)) setAwaiting(false)
          deadline()
          return
        }
        clearTimeout(timer.current)
        channel.port1.close()
        if (
          Array.isArray(data?.results) &&
          data.results.length === lab.checks.length &&
          data.results.every((r: unknown) => typeof r === 'boolean')
        ) {
          if (
            Array.isArray(data.observed) &&
            data.observed.length <= lab.checks.length &&
            data.observed.every(
              (s: unknown) => typeof s === 'string' && s.length <= 240,
            )
          )
            setObserved(data.observed)
          setResult(data.results)
          if (data.results.every(Boolean)) onPass()
        } else
          setResult(
            typeof data?.error === 'string'
              ? data.error.slice(0, 180)
              : 'Incomplete result. Run the checks again.',
          )
      }
      frameRef.current?.contentWindow?.postMessage(
        { lesson, source: code, tree, concept },
        '*',
        [channel.port2],
      )
    }
    if (!collectionLab(lesson) && !['07', '08', '09'].includes(lesson))
      return dispatch()
    try {
      const parser = new ParserWorker()
      worker.current = parser
      parser.onmessage = ({ data }) => {
        parser.terminate()
        if (!active.current) return
        if (data.error) setResult('Check the code · ' + data.error)
        else dispatch(data.tree)
      }
      parser.onerror = () => {
        parser.terminate()
        setResult('The parser could not start. Run the checks again.')
      }
      parser.postMessage(code)
    } catch {
      setResult(
        'The browser could not start this exercise. Try running the checks again.',
      )
    }
  }
  return (
    <div className="lab-result">
      <h3 tabIndex={-1} ref={summary} aria-live="polite" aria-atomic="true">
        {typeof result === 'string'
          ? 'Revise and retry'
          : result
            ? result.filter(Boolean).length +
              ' of ' +
              lab.checks.length +
              ' checks passed'
            : awaiting
              ? 'Activate the preview to test keyboard focus'
              : 'Running checks…'}
      </h3>
      {typeof result === 'string' ? (
        <p>{result}</p>
      ) : (
        result && (
          <ul>
            {lab.checks.map((label, i) => (
              <li
                key={label}
                id={checkpoint + '-t' + String(i + 1).padStart(2, '0')}
              >
                <small>t{String(i + 1).padStart(2, '0')}</small>
                {' · '}
                <strong>{result[i] ? 'Passed' : 'Try again'}</strong> · {label}
                {!result[i] && observed[i] && (
                  <small className="observed">{observed[i]}</small>
                )}
              </li>
            ))}
          </ul>
        )
      )}
      <div
        className={lesson === '04' ? 'layout-viewport' : 'lab-frame'}
        hidden={
          collectionLab(lesson) &&
          (!focusFixture(lesson) || !awaiting || result !== null)
        }
      >
        <iframe
          ref={frameRef}
          sandbox={
            ['03', '09', 'w2-06', 'w2-07', 'w3-06'].includes(lesson)
              ? 'allow-scripts allow-forms'
              : 'allow-scripts'
          }
          title={lab.title + ' preview'}
          srcDoc={frame}
          onLoad={start}
          width={lesson === '04' ? 768 : '100%'}
          height={lesson === '07' ? 0 : 180}
          hidden={lesson === '07'}
        />
      </div>
    </div>
  )
}

export function CodeLab({
  checkpoint,
  lesson,
  lab,
  code,
  concept,
  setConcept,
  edit,
  onPass,
}: {
  checkpoint: string
  lesson: string
  lab: Lab
  code: string
  concept: string
  setConcept: (value: string) => void
  edit: (value: string) => void
  onPass: () => void
}) {
  const [attempt, setAttempt] = useState(0)
  return (
    <section className="panel layout-lab">
      <h2>Browser lab · {lab.title}</h2>
      <p>{lab.task}</p>
      {/^w(?:[3-9]|1[0-2])-/.test(lesson) && (
        <p className="small">
          Your editor draft lasts until you leave this lesson. Keep a copy in
          your local project.
        </p>
      )}
      <label htmlFor={lesson.endsWith('-copy') ? 'lab-copy-code' : 'lab-code'}>
        {['02', '03'].includes(lesson)
          ? 'HTML'
          : lesson === '04'
            ? 'CSS'
            : 'JavaScript'}{' '}
        editor
      </label>
      <textarea
        id={lesson.endsWith('-copy') ? 'lab-copy-code' : 'lab-code'}
        className="code-editor"
        rows={10}
        maxLength={4000}
        spellCheck={false}
        autoCapitalize="off"
        value={code}
        onChange={(e) => {
          setAttempt(0)
          edit(e.target.value)
        }}
      />
      {lesson === 'w2-01' && (
        <label>
          With const task = {'{title: "Read"}'}, which change is allowed?
          <select
            value={concept}
            onChange={(e) => {
              setAttempt(0)
              setConcept(e.target.value)
            }}
          >
            <option value="">Choose a prediction</option>
            <option value="neither">Neither change is allowed</option>
            <option value="property">Set task.title to a new string</option>
            <option value="rebind">Assign a different object to task</option>
          </select>
        </label>
      )}
      {lesson === 'w3-09' && (
        <label>
          Why did drawing Oldest change the source order?
          <select
            value={concept}
            onChange={(e) => {
              setAttempt(0)
              setConcept(e.target.value)
            }}
          >
            <option value="">Choose a cause</option>
            <option value="filter">Filtering removes hidden records</option>
            <option value="mutation">sort ran on the original array</option>
            <option value="id">The IDs changed during comparison</option>
          </select>
        </label>
      )}
      <details>
        <summary>What the lab checks</summary>
        <ul>
          {lab.checks.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        {(lesson.startsWith('w4-') ||
          lesson === 'w6-10' ||
          lesson.startsWith('w8-') ||
          lesson.startsWith('w9-') ||
          lesson === 'w10-08') && (
          <p>
            In an async lab, put await in a separate statement, a variable
            initializer or a return. Use the named fixture functions in the
            instructions. Your local project supports the full JavaScript
            language.
          </p>
        )}
        {collectionLab(lesson) &&
          !lesson.startsWith('w4-') &&
          lesson !== 'w6-10' &&
          !lesson.startsWith('w8-') &&
          !lesson.startsWith('w9-') &&
          lesson !== 'w10-08' && (
            <p>
              Use named or arrow functions, local variables, if, for…of, array
              methods, flat task records and the helpers listed above. The full
              JavaScript language is available in your local project.
            </p>
          )}
        {['07', '08', '09'].includes(lesson) && (
          <p>
            This lab supports named functions and arrow functions, local
            variables, comparisons, if, return and the string or DOM operations
            in this lesson. Use your local project for other JavaScript.
          </p>
        )}
      </details>
      <button className="primary" onClick={() => setAttempt((n) => n + 1)}>
        Run lab checks
      </button>
      {attempt > 0 && (
        <Attempt
          key={attempt}
          {...{ checkpoint, lesson, lab, code, concept, onPass }}
        />
      )}
    </section>
  )
}
