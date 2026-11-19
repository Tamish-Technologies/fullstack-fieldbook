import { useEffect, useId, useRef, useState } from 'react'
import type { Quiz } from '../content/quizzes'
import { quizForm } from '../content/retry-scenarios'
import { passes } from '../learning'
import type { ProgressStore } from '../store'
import { recordQuiz, score } from './assessment'

function answerOrder(id: string, attempt: number) {
  let hash = 2166136261
  for (const letter of id + ':' + attempt)
    hash = Math.imul(hash ^ letter.charCodeAt(0), 16777619) >>> 0
  const first = hash % 3
  const step = hash % 2 ? 1 : 2
  return [first, (first + step) % 3, (first + 2 * step) % 3]
}

export function QuizForm({
  quiz,
  store,
  earned,
  reviewHref,
  continueHref,
  continueLabel,
}: {
  quiz: Quiz
  store?: ProgressStore
  earned: boolean
  reviewHref: string
  continueHref: string
  continueLabel: string
}) {
  const id = useId()
  const [started, setStarted] = useState(false)
  const [attempt, setAttempt] = useState(
    () => store?.getSnapshot().record.attempts[quiz.checkpoint]?.count ?? 0,
  )
  const [localAnswers, setLocalAnswers] = useState<Record<string, number>>({})
  const [pendingChoices, setPendingChoices] = useState<Record<string, number>>(
    {},
  )
  const [result, setResult] = useState<ReturnType<typeof score> | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const summary = useRef<HTMLHeadingElement>(null)
  const first = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (result) summary.current?.focus()
    else if (started) first.current?.focus()
  }, [result, attempt, started])
  const retry = attempt % 2 === 1
  const essentialCount = quiz.questions.filter((q) => q.essential).length
  const answers =
    store && !result
      ? {
          ...store.getSnapshot().record.quizDrafts?.[quiz.checkpoint],
          ...pendingChoices,
        }
      : localAnswers
  const answered = Object.keys(answers).length
  async function choose(question: string, choice: number) {
    if (!store) {
      setLocalAnswers((a) => ({ ...a, [question]: choice }))
      return
    }
    setPendingChoices((a) => ({ ...a, [question]: choice }))
    try {
      await store.update((p) => {
        if ((p.attempts[quiz.checkpoint]?.count ?? 0) !== attempt)
          throw Error('This quiz changed. Reopen the lesson to continue.')
        return {
          ...p,
          quizDrafts: {
            ...p.quizDrafts,
            [quiz.checkpoint]: {
              ...p.quizDrafts?.[quiz.checkpoint],
              [question]: choice,
            },
          },
        }
      })
      setError('')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not retain this choice.')
    } finally {
      setPendingChoices((a) => {
        if (a[question] !== choice) return a
        const next = { ...a }
        delete next[question]
        return next
      })
    }
  }
  return (
    <section id={quiz.checkpoint} className="panel quiz" tabIndex={-1}>
      <h2>End-of-lesson knowledge check</h2>
      <p>
        {store
          ? !quiz.checkpoint.startsWith('p1-w01')
            ? 'Pass this quiz and the other required checks in this lesson to continue.'
            : 'Practice now or return after reading the other lessons. A passing score counts toward Week 2.'
          : 'Practice here without saving a score. Use the regular lesson to earn this checkpoint.'}
      </p>
      <p>
        Answer at least {Math.ceil(quiz.questions.length * 0.8)} of{' '}
        {quiz.questions.length} correctly
        {essentialCount ? ', including every question marked essential' : ''}.
        You can retry as often as you like.
      </p>
      {earned && (
        <p className="status-tag">Earned checkpoint · Passed automatically</p>
      )}
      {!started && (
        <div className="actions">
          <button type="button" onClick={() => setStarted(true)}>
            {answered ? 'Resume knowledge check' : 'Start knowledge check'}
          </button>
          {answered > 0 && (
            <span>
              {answered} of {quiz.questions.length} answered
            </span>
          )}
          <a href={reviewHref}>Revisit the lesson</a>
        </div>
      )}
      {started && (
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (busy || result) return
            setBusy(true)
            setError('')
            try {
              const graded = score(quiz, answers, new Date().toISOString())
              if (store)
                await store.update((p) => {
                  if (
                    (p.attempts[quiz.checkpoint]?.count ?? 0) !== attempt ||
                    quiz.questions.some(
                      (q) =>
                        p.quizDrafts?.[quiz.checkpoint]?.[q.id] !==
                        answers[q.id],
                    )
                  )
                    throw Error(
                      'These answers changed. Reopen the quiz before submitting.',
                    )
                  return recordQuiz(p, graded)
                })
              setLocalAnswers(answers)
              setResult(graded)
            } catch (reason) {
              setError(
                reason instanceof Error
                  ? reason.message
                  : 'Submission could not be recorded. Please try again.',
              )
            } finally {
              setBusy(false)
            }
          }}
        >
          {!result && (
            <div className="actions">
              <a href={continueHref}>{continueLabel}</a>
              <span className="small">
                {store
                  ? 'Your selections are kept as a draft until you submit.'
                  : 'Practice mode clears your selections when you leave.'}
              </span>
            </div>
          )}
          {quiz.questions.map((q, i) => {
            const { variant: [stem, ...options], feedback } = quizForm(q, retry)
            const order = answerOrder(q.id, attempt)
            const selected = answers[q.id]
            return (
              <fieldset
                className="question"
                key={q.id}
                disabled={!!result || busy}
              >
                <legend>
                  {i + 1}. {stem}{' '}
                  {q.essential && (
                    <strong className="essential">Essential</strong>
                  )}
                </legend>
                {order.map((choice, j) => (
                  <label className="answer" key={choice}>
                    <input
                      type="radio"
                      required
                      name={id + q.id}
                      ref={i === 0 && j === 0 ? first : undefined}
                      checked={selected === choice}
                      onChange={() => void choose(q.id, choice)}
                    />
                    <span>{options[choice]}</span>
                  </label>
                ))}
                {result && selected !== undefined && (
                  <p
                    className="answer-feedback"
                    id={q.id + '-feedback'}
                    tabIndex={-1}
                  >
                    <b>{selected === 0 ? 'Correct.' : 'Review.'}</b>{' '}
                    {feedback[selected]} {selected !== 0 && feedback[0]}
                  </p>
                )}
              </fieldset>
            )
          })}
          {!result && (
            <button type="submit" disabled={busy}>
              {busy ? 'Checking…' : 'Check answers'}
            </button>
          )}
          {error && <p role="alert">{error}</p>}
        </form>
      )}
      {result && (
        <div className="quiz-result">
          <h3 tabIndex={-1} ref={summary}>
            {passes(result) ? 'Quiz passed' : 'Try again'} · {result.correct}/
            {result.scored} correct
          </h3>
          <p>
            {result.essentialsCorrect < result.essentials
              ? 'An essential answer needs another look. Review the linked feedback before retrying.'
              : passes(result)
                ? 'You met the quiz requirements.'
                : 'Review the explanations above, then try the alternate examples.'}{' '}
            {!store
              ? 'This review attempt does not change learner progress.'
              : earned
                ? 'Your earned pass is retained.'
                : ''}
          </p>
          {result.essentialsCorrect < result.essentials && (
            <ul>
              {quiz.questions.map(
                (q, i) =>
                  q.essential &&
                  answers[q.id] !== 0 && (
                    <li key={q.id}>
                      <a href={'#' + q.id + '-feedback'}>
                        Question {i + 1} · {q.topic}
                      </a>
                    </li>
                  ),
              )}
            </ul>
          )}
          <div className="actions">
            <a href={reviewHref}>Revisit the lesson</a>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setLocalAnswers({})
                setResult(null)
                setAttempt((n) => n + 1)
              }}
            >
              Retry with another example
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
