import { useLayoutEffect, useRef, useState } from 'react'
import { starterFiles } from '../content/starter'
import { weekOne } from '../content/week-one'
import { weekTwo } from '../content/week-two'
import { weekThree } from '../content/week-three'
import type { Lesson } from '../course'
import { weekFour } from '../content/week-four'
import { weekFive } from '../content/week-five'
import { weekSix } from '../content/week-six'
import { weekSeven } from '../content/week-seven'
import { weekEight } from '../content/week-eight'
import { weekNine } from '../content/week-nine'
import { weekTen } from '../content/week-ten'
import { weekEleven } from '../content/week-eleven'
import { weekTwelve } from '../content/week-twelve'
const weekFourStarter = import.meta.glob<string>(
  '../content/week-four-starter/*',
  { eager: true, query: '?raw', import: 'default' },
)
const readings = {
  ...weekOne,
  ...weekTwo,
  ...weekThree,
  ...weekFour,
  ...weekFive,
  ...weekSix,
  ...weekSeven,
  ...weekEight,
  ...weekNine,
  ...weekTen,
  ...weekEleven,
  ...weekTwelve,
}

const weekTwoStarter = import.meta.glob<string>(
  '../content/week-two-starter/*',
  {
    eager: true,
    query: '?raw',
    import: 'default',
  },
)

const weekThreeStarter = import.meta.glob<string>(
  '../content/week-three-starter/*',
  { eager: true, query: '?raw', import: 'default' },
)
function FirstTaskExample() {
  const [added, setAdded] = useState(false)
  return (
    <section className="starter">
      <h3 id="live-page" tabIndex={-1}>
        Try a task before writing code
      </h3>
      <p>
        The saved example starts with an empty list. Choose “Add sample task”,
        then predict what you’ll see when you choose “Reload example”.
      </p>
      <div className="actions">
        <button type="button" onClick={() => setAdded(true)} disabled={added}>
          Add sample task
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setAdded(false)}
        >
          Reload example
        </button>
      </div>
      <div aria-live="polite">
        {added ? (
          <ul>
            <li>Read one page</li>
          </ul>
        ) : (
          <p>The list is empty.</p>
        )}
      </div>
      <p>
        Adding a task changes the live page. Reloading this example rebuilds the
        list from its saved starting point. You’ll build this behavior yourself
        during the week.
      </p>
    </section>
  )
}

export default function Article({ lesson }: { lesson: Lesson }) {
  const r = readings[lesson.id]!
  const orientation = lesson.id === 'p1-w01-l01'
  const article = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const anchor =
      location.hash && document.getElementById(location.hash.slice(1))
    if (anchor && article.current?.contains(anchor)) {
      anchor.tabIndex = -1
      anchor.focus({ preventScroll: true })
      anchor.scrollIntoView()
    }
  }, [lesson.id])
  return (
    <article ref={article} className="reading">
      <header>
        <p className="small">
          About {r.minutes} minutes · Week {lesson.week}, chapters{' '}
          {lesson.chapters}
        </p>
        <h2>What you’ll be able to do</h2>
        <ul>
          {r.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </header>
      {orientation && (
        <nav aria-labelledby="orientation-topics">
          <h2 id="orientation-topics" tabIndex={-1}>
            Start here
          </h2>
          <ul>
            <li>
              <a href="#page-files">What HTML, CSS and JavaScript each do</a>
            </li>
            <li>
              <a href="#live-page">
                What changes on the live page and what survives a reload
              </a>
            </li>
            <li>
              <a href="#inspect-heading">
                How to find a missing heading with browser tools
              </a>
            </li>
            <li>
              <a href="#ask-for-a-hint">
                How to ask for a hint and test it yourself
              </a>
            </li>
          </ul>
        </nav>
      )}
      <h2 id={orientation ? 'page-files' : undefined} tabIndex={-1}>
        {r.heading}
      </h2>
      {r.explanation.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {lesson.id === 'p1-w12-l01' && (
        <section className="starter">
          <h3>Your Task Planning capstone</h3>
          <p>
            Extract both folders together and open START_HERE.md. Start with
            the inherited baseline. The planning tests guide the work you
            will implement.
          </p>
          <a
            className="secondary"
            download="study-tasks-v12.zip"
            href="/projects/study-tasks-v12.zip"
          >
            Download the Week 12 capstone starter
          </a>
        </section>
      )}
      {lesson.id === 'p1-w11-l01' && (
        <section className="starter">
          <h3>Your local release rehearsal</h3>
          <p>
            Extract both folders together and open START_HERE.md. The learner
            guide explains which tests should fail before you fix the four
            practice defects.
          </p>
          <a
            className="secondary"
            download="study-tasks-v11.zip"
            href="/projects/study-tasks-v11.zip"
          >
            Download the Week 11 reliability starter
          </a>
        </section>
      )}
      {lesson.id === 'p1-w10-l01' && (
        <section className="starter">
          <h3>Your local authentication project</h3>
          <p>
            Extract both folders together and open START_HERE.md. Use fictional
            accounts and a separate practice PostgreSQL database. Lessons 3 and
            4 walk through hashing and migration.
          </p>
          <a
            className="secondary"
            download="study-tasks-v10.zip"
            href="/projects/study-tasks-v10.zip"
          >
            Download the Week 10 authentication starter
          </a>
        </section>
      )}
      {lesson.id === 'p1-w09-l01' && (
        <section className="starter">
          <h3>Your local PostgreSQL project</h3>
          <p>
            Extract both folders together. Open START_HERE.md and set up the
            separate development and test databases in Lesson 2.
          </p>
          <a
            className="secondary"
            download="study-tasks-v9.zip"
            href="/projects/study-tasks-v9.zip"
          >
            Download the Week 9 PostgreSQL starter
          </a>
        </section>
      )}
      {lesson.id === 'p1-w08-l01' && (
        <section className="starter">
          <h3>Your local React and Express project</h3>
          <p>
            Extract both folders together. Start the working Express server and
            the React starter in separate terminals.
          </p>
          <a
            className="secondary"
            download="study-tasks-v8.zip"
            href="/projects/study-tasks-v8.zip"
          >
            Download the Week 8 React and Express starter
          </a>
        </section>
      )}
      {lesson.id === 'p1-w07-l01' && (
        <section className="starter">
          <h3>Your local Node and Express project</h3>
          <p>
            Download the starter and extract both folders together. Begin in
            backend. The separate frontend is used in Lesson 11.
          </p>
          <a
            className="secondary"
            download="study-tasks-v7.zip"
            href="/projects/study-tasks-v7.zip"
          >
            Download the Week 7 Node and React starter
          </a>
        </section>
      )}
      {lesson.id === 'p1-w06-l01' && (
        <section className="starter">
          <h3>Your local React Router project</h3>
          <p>
            Download and extract the ZIP in a new folder. The task list already
            runs. You will add the Ideas inbox and routes as you go.
          </p>
          <a
            className="secondary"
            download="study-tasks-v6.zip"
            href="/projects/study-tasks-v6.zip"
          >
            Download the Week 6 React starter
          </a>
        </section>
      )}
      {['p1-w05-l01', 'p1-w05-l02'].includes(lesson.id) && (
        <section className="starter">
          <h3>Your local React project</h3>
          <p>
            Download and extract the ZIP to keep the src and tests folders
            together. Start in the folder containing package.json. The two demo
            rows let you explore the view before you wire its buttons.
          </p>
          <a
            className="secondary"
            download="study-tasks-v5.zip"
            href="/projects/study-tasks-v5.zip"
          >
            Download the Week 5 React starter
          </a>
        </section>
      )}
      {['p1-w02-l01', 'p1-w03-l01', 'p1-w04-l01'].includes(lesson.id) && (
        <section className="starter">
          <h3>Your Study Tasks v{Number(lesson.week)} starter</h3>
          {lesson.week === '04' ? (
            <p>
              Save all nine files in one folder. Follow README.md to start a
              local server on your Week 3 address and port. Add and edit a task,
              then open tests.html. The inbox buttons are starter exercises. You
              can finish every check with the offline sample.
            </p>
          ) : lesson.week === '03' ? (
            <p>
              Download these four files into a new folder or use a copy of your
              Week 2 project. The starter already saves tasks. Keep its storage
              key and use fictional data. Open the README for the local server
              command. Reuse your Week 2 address and port to see any tasks saved
              there. Keep that same address when adding modules in Lesson 4.
            </p>
          ) : (
            <p>
              Save these four files in the same new folder and open index.html.
              Try adding a task and reloading the page before you change the
              code. You can also begin with a copy of your Week 1 project.
            </p>
          )}
          <div className="actions">
            {Object.entries(
              lesson.week === '04'
                ? weekFourStarter
                : lesson.week === '03'
                  ? weekThreeStarter
                  : weekTwoStarter,
            ).map(([path, body]) => {
              const name = path.split('/').pop()
              return (
                <a
                  key={path}
                  className="secondary"
                  download={name}
                  href={
                    'data:text/plain;charset=utf-8,' + encodeURIComponent(body)
                  }
                >
                  {name}
                </a>
              )
            })}
          </div>
        </section>
      )}
      {orientation && (
        <>
          <FirstTaskExample />
          <section className="starter">
            <h3>Your local starter</h3>
            <p>
              On your computer, make a folder named study-tasks. Save these four
              files into it using the names shown, then open index.html in your
              browser. You should see “My study tasks”. The form and buttons
              come in later lessons. On a phone, you can follow the example
              above and return to the file exercise on a computer.
            </p>
            <div className="actions">
              {Object.entries(starterFiles).map(([name, body]) => (
                <a
                  className="secondary"
                  key={name}
                  href={
                    'data:text/plain;charset=utf-8,' + encodeURIComponent(body)
                  }
                  download={name}
                >
                  {name}
                </a>
              ))}
            </div>
          </section>
        </>
      )}
      <h2 id="worked-example" tabIndex={-1}>
        Worked example
      </h2>
      <p>{r.predict}</p>
      <pre tabIndex={0} aria-label="Worked example">
        <code>{r.example}</code>
      </pre>
      <details>
        <summary>Check your prediction</summary>
        <p>{r.result}</p>
      </details>
      {r.followUp && (
        <>
          <h3 id={orientation ? 'ask-for-a-hint' : undefined} tabIndex={-1}>
            {r.followUp.title}
          </h3>
          <pre tabIndex={0}>
            <code>{r.followUp.example}</code>
          </pre>
          <p>{r.followUp.reasoning}</p>
        </>
      )}
      <h2>Try it locally</h2>
      <p>{r.exercise}</p>
      {r.exerciseExample && (
        <pre tabIndex={0} aria-label="Local practice example">
          <code>{r.exerciseExample}</code>
        </pre>
      )}
      {r.hints.map((hint, i) => (
        <details key={hint}>
          <summary>Hint {i + 1}</summary>
          <p>{hint}</p>
        </details>
      ))}
      <h3 id={orientation ? 'inspect-heading' : undefined} tabIndex={-1}>
        {orientation
          ? 'Find a missing heading with browser tools'
          : 'When the result surprises you'}
      </h3>
      <p>{r.mistake}</p>
      {r.localChecks && (
        <section>
          <h3>Local verification checklist</h3>
          <p>
            Run these checks in your own project and record the results in your
            README. Fieldbook cannot inspect your local work.
          </p>
          <ul>
            {r.localChecks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </section>
      )}
      {r.extension && (
        <details>
          <summary>Optional practice</summary>
          <p>{r.extension}</p>
        </details>
      )}
      <h2>Takeaway</h2>
      <p>{r.takeaway}</p>
    </article>
  )
}
