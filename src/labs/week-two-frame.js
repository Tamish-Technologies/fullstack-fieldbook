// Fixture capabilities stay inside the opaque frame. Only bounded task data,
// primitive values and the explicitly named operations enter the interpreter.
class StorageFailure extends Error {}
function taskShape(task) {
  return (
    task &&
    Number.isSafeInteger(task.id) &&
    task.id > 0 &&
    typeof task.title === 'string' &&
    !!task.title.trim() &&
    typeof task.completed === 'boolean'
  )
}
const sampleTasks = () => [
  { id: 9, title: '<b>Read</b>', completed: false },
  { id: 4, title: 'A & "B"', completed: true },
  { id: 7, title: '<b>Read</b>', completed: false },
]
function collectionFixture(signal) {
  const fields = ['id', 'title', 'completed']
  function scalar(v) {
    return (
      v == null ||
      typeof v === 'number' ||
      typeof v === 'boolean' ||
      (typeof v === 'string' && v.length <= 2000)
    )
  }
  function record(value) {
    if (
      !value ||
      typeof value !== 'object' ||
      Array.isArray(value) ||
      !Object.entries(value).every(
        ([key, entry]) =>
          fields.includes(key) &&
          (scalar(entry) || (key === 'signal' && signal && entry === signal)),
      )
    )
      throw Error('Use a flat task record with id, title and completed fields.')
    return value
  }
  function list(value) {
    if (
      !Array.isArray(value) ||
      value.length > 64 ||
      !value.every((v) => scalar(v) || record(v))
    )
      throw Error('Use a short list of task records or values.')
    return value
  }
  const saved = new Map()
  const fixture = {
    fields,
    record,
    list,
    saved,
    denied: false,
    writes: 0,
    helpers: { isTask: taskShape },
    statics: {
      'Array.isArray': Array.isArray,
      'Math.max': Math.max,
      'Number.isSafeInteger': Number.isSafeInteger,
      'JSON.stringify': (value) => JSON.stringify(list(value)),
      'JSON.parse': (value) => {
        if (typeof value !== 'string' || value.length > 4000)
          throw new SyntaxError('Invalid stored data.')
        return JSON.parse(value)
      },
    },
    storage: {
      getItem(key) {
        if (fixture.denied) throw new StorageFailure('Storage is unavailable.')
        return saved.get(key) ?? null
      },
      setItem(key, value) {
        if (fixture.denied) throw new StorageFailure('Storage is unavailable.')
        if (
          typeof key !== 'string' ||
          typeof value !== 'string' ||
          value.length > 4000
        )
          throw Error('Save a short JSON string.')
        fixture.writes++
        saved.set(key, value)
      },
    },
  }
  return fixture
}
function weekTwoCheck(lesson, tree, concept) {
  const f = collectionFixture()
  const tasks = sampleTasks()
  const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b)
  const sameTasks = (a, b) =>
    Array.isArray(a) &&
    a.length === b.length &&
    a.every(
      (t, i) =>
        t && ['id', 'title', 'completed'].every((key) => t[key] === b[i][key]),
    )
  const invoke = learnerProgram(
    tree,
    lesson === '09' ? { storage: f.storage } : {},
    root,
    null,
    f,
  )
  const call = (name, ...args) => invoke(name, args)
  const el = (tag, parent = root) =>
    parent.appendChild(document.createElement(tag))
  function makeRow(list, id, title, checked, style) {
    const row = el('li', list)
    row.dataset.id = id
    const box = el('input', row)
    box.type = 'checkbox'
    box.checked = checked === true
    row.classList.toggle('completed', style === true)
    el('span', row).textContent = typeof title === 'string' ? title : ''
    return row
  }
  if (lesson === '01') {
    const data = call('makeTasks')
    const valid =
      Array.isArray(data) && data.length === 2 && data.every(taskShape)
    const rest = call('afterFirst', tasks)
    const other = call('afterFirst', tasks.slice(0, 2))
    return [
      valid,
      valid && data[0].id !== data[1].id,
      sameTasks(rest, sampleTasks().slice(1)) &&
        sameTasks(other, sampleTasks().slice(1, 2)),
      call('secondTitle', tasks) === tasks[1].title &&
        call('size', tasks) === 3 &&
        call('secondTitle', tasks.slice(1)) === tasks[2].title &&
        call('size', tasks.slice(1)) === 2,
      concept === 'property',
    ]
  }
  if (lesson === '02') {
    const seen = []
    f.visit = (value) => {
      seen.push(value)
    }
    call('visitTitles', tasks, f.visit)
    call('visitTitles', [], f.visit)
    return [
      call('normalizeTitle', '  Practice JS  ') === 'Practice JS',
      ['', '  '].every(
        (t) =>
          call('normalizeTitle', t) === '' &&
          call('isNonEmptyTitle', t) === false,
      ),
      call('isNonEmptyTitle', '  Study  ') === true,
      [[], tasks.slice(0, 1), tasks].every(
        (x) => call('countActive', x) === x.filter((t) => !t.completed).length,
      ) && sameTasks(tasks, sampleTasks()),
      equal(
        seen,
        sampleTasks().map((t) => t.title),
      ),
    ]
  }
  if (lesson === '03') {
    const expected = sampleTasks()
    function toggles(id) {
      return sameTasks(
        call('toggle', tasks, id),
        expected.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      )
    }
    observed[2] =
      'Try toggling a completed task. Its completed value should become false, and the other records should keep their values.'
    return [
      sameTasks(
        call('active', tasks),
        expected.filter((t) => !t.completed),
      ),
      equal(
        call('titles', tasks),
        expected.map((t) => t.title),
      ),
      toggles(7) && toggles(4),
      sameTasks([call('lookup', tasks, 4)], [expected[1]]) &&
        call('lookup', tasks, 99) === undefined,
      call('nextId', []) === 1 && call('nextId', tasks) === 10,
      sameTasks(tasks, expected),
    ]
  }
  if (lesson === '05') {
    const list = el('ul')
    f.helpers.clearRows = () => list.replaceChildren()
    f.helpers.appendRow = (id, title, checked, style) => {
      makeRow(list, id, title, checked, style)
    }
    const draw = (data) => call('render', data)
    const matches = (data) =>
      equal(
        Array.from(list.children, (r) => [Number(r.dataset.id), r.textContent]),
        data.map((t) => [t.id, t.title]),
      )
    const two = tasks.slice(0, 2)
    draw(two)
    const initial = matches(two)
    draw(two)
    const repeat = matches(two)
    const style =
      initial &&
      two.every(
        (t, i) =>
          list.children[i]?.querySelector('input')?.checked === t.completed &&
          list.children[i]?.classList.contains('completed') === t.completed,
      )
    draw([tasks[0]])
    const one = matches([tasks[0]]),
      literal = one && !list.querySelector('b')
    draw([])
    return [initial, repeat, one, literal, style, list.children.length === 0]
  }
  if (lesson === '06' || lesson === '07') {
    const form = el('form'),
      input = el('input', form),
      add = el('button', form),
      message = el('p', form),
      list = el('ul', form)
    input.setAttribute('aria-label', 'Task title')
    add.textContent = 'Add'
    let model = tasks.slice(0, 2),
      submits = 0,
      eventError
    // Native event listeners report learner errors back to the check runner.
    const listen = (node, kind, fn) =>
      node.addEventListener(kind, (e) => {
        try {
          fn(e)
        } catch (error) {
          eventError = error
        }
      })
    const eventCheck = () => {
      if (eventError) throw eventError
    }
    const submit = (value) => {
      input.value = value
      form.requestSubmit(add)
      eventCheck()
    }
    if (lesson === '06') {
      f.helpers.warn = (text) => {
        message.textContent = typeof text === 'string' ? text : ''
      }
      function change(action, value) {
        model = f.list(call('update', model, action, value))
        list.replaceChildren()
        for (const t of model) {
          const row = makeRow(list, t.id, t.title, t.completed, t.completed)
          listen(row.querySelector('input'), 'change', () =>
            change('toggle', t.id),
          )
          const del = el('button', row)
          del.type = 'button'
          del.textContent = 'Delete'
          listen(del, 'click', () => change('delete', t.id))
        }
      }
      listen(form, 'submit', (e) => {
        e.preventDefault()
        submits++
        change('add', input.value)
      })
      submit('  Plan  ')
      const added =
        model.length === 3 &&
        model[2]?.title === 'Plan' &&
        model[2].completed === false &&
        taskShape(model[2]) &&
        ![9, 4].includes(model[2].id)
      submit('   ')
      const blank = model.length === 3 && !!message.textContent.trim()
      const box = () => list.querySelector('[data-id="9"] input')
      box()?.click()
      eventCheck()
      const on =
        model.find((t) => t.id === 9)?.completed === true &&
        model.find((t) => t.id === 4)?.completed === true &&
        box()?.checked
      box()?.click()
      eventCheck()
      const off =
        model.find((t) => t.id === 9)?.completed === false &&
        box()?.checked === false
      list.querySelector('[data-id="9"] button')?.click()
      eventCheck()
      return [
        added,
        blank,
        on && off,
        !model.some((t) => t.id === 9) && model.length === 2,
        sameTasks(model.slice(0, 1), [tasks[1]]) &&
          list.children.length === 2 &&
          model[1]?.title === 'Plan',
        added && submits === 2,
      ]
    }
    let target,
      removed,
      activeRow,
      submitKind,
      warningRole,
      warningText,
      focusRequested = false
    function limited(s) {
      if (typeof s !== 'string' || s.length > 2000)
        throw Error('Supply short text.')
      return s
    }
    Object.assign(f.helpers, {
      titleText(text) {
        activeRow.querySelector('span').textContent = limited(text)
      },
      checkbox(label, event, id) {
        const box = activeRow.querySelector('input')
        box.setAttribute('aria-label', limited(label))
        listen(box, limited(event), () => {
          target = id
        })
      },
      deleteControl(type, id) {
        const b = activeRow.querySelector('button')
        b.type = limited(type)
        listen(b, 'click', () => {
          removed = id
        })
      },
      submitOn(event) {
        submitKind = limited(event)
      },
      feedback(role, text) {
        warningRole = limited(role)
        warningText = limited(text)
      },
      focusField() {
        focusRequested = true
      },
    })
    for (const t of model) {
      activeRow = makeRow(list, t.id, '', false, false)
      el('button', activeRow).textContent = 'Delete'
      call('configure', t)
    }
    listen(form, 'submit', (e) => e.preventDefault())
    if (submitKind)
      listen(form, submitKind, () => {
        submits++
        if (!input.value.trim()) {
          message.setAttribute('role', warningRole ?? '')
          message.textContent = warningText ?? ''
        } else if (focusRequested) input.focus()
      })
    add.focus()
    submit('One')
    const added = submits === 1,
      focused = document.activeElement === input
    submit(' ')
    const second = list.lastElementChild,
      box = second.querySelector('input'),
      del = second.querySelector('button')
    const firstBox = list.firstChild.querySelector('input')
    firstBox.dispatchEvent(new Event('change', { bubbles: true }))
    const firstTarget =
      target === model[0].id &&
      firstBox.getAttribute('aria-label')?.includes(model[0].title)
    box.dispatchEvent(new Event('change', { bubbles: true }))
    eventCheck()
    const before = submits
    del.click()
    eventCheck()
    return [
      list.firstChild.querySelector('span').textContent === model[0].title &&
        !list.querySelector('b'),
      second.querySelector('span').textContent === model[1].title,
      firstTarget &&
        target === model[1].id &&
        box.getAttribute('aria-label')?.includes(model[1].title),
      added,
      del.type === 'button' && removed === model[1].id && submits === before,
      focused &&
        ['status', 'alert'].includes(message.getAttribute('role')) &&
        !!message.textContent.trim(),
    ]
  }
  if (lesson === '08') {
    const key = 'study-tasks-week2',
      load = () => call('load', f.storage)
    const savedOk = call('save', tasks, f.storage) === true
    const raw = f.saved.get(key)
    const round =
      savedOk &&
      typeof raw === 'string' &&
      sameTasks(JSON.parse(raw), tasks) &&
      sameTasks(load(), tasks)
    f.saved.clear()
    const missing = equal(load(), [])
    f.saved.set(key, 'not-json')
    const bad = equal(load(), [])
    f.saved.set(key, '{}')
    const shape = equal(load(), [])
    f.saved.set(key, '[{"id":1,"completed":"false","title":"X"}]')
    const invalid = equal(load(), [])
    f.denied = true
    const denied =
      call('save', tasks, f.storage) === false &&
      equal(load(), []) &&
      sameTasks(tasks, sampleTasks())
    observed[5] =
      'Try restoring IDs 2 and 99. Your next ID must be a safe integer above 99. An empty list starts at 1.'
    function nextAfter(id) {
      const next = call('nextId', [
        { ...tasks[0], id: 2 },
        { ...tasks[1], id },
      ])
      return Number.isSafeInteger(next) && next > id
    }
    return [
      round,
      missing,
      bad,
      shape && invalid,
      denied,
      call('nextId', []) === 1 && nextAfter(8) && nextAfter(99),
    ]
  }
  if (lesson === '09') {
    const list = el('ul'),
      count = el('output'),
      message = el('p')
    let counts = true
    observed[2] =
      'Check a project with zero, one and two unfinished tasks. Count the full source each time, including when Completed hides them.'
    const modes = ['all', 'active', 'completed']
    const buttons = modes.map((mode) => {
      const b = el('button')
      b.type = 'button'
      b.textContent = mode
      return b
    })
    Object.assign(f.helpers, {
      showRows(rows) {
        list.replaceChildren()
        for (const t of f.list(rows))
          makeRow(list, t.id, t.title, t.completed, t.completed)
      },
      remaining(n) {
        count.value = String(n)
      },
      emptyMessage(text) {
        message.textContent = text
      },
      pressed(mode) {
        buttons.forEach((b) =>
          b.setAttribute('aria-pressed', String(b.textContent === mode)),
        )
      },
    })
    const show = (data, mode) => {
      count.value = ''
      message.textContent = ''
      const expectedRemaining = data.filter((t) => !t.completed).length
      call('present', data, mode)
      counts &&= count.value === String(expectedRemaining)
      return Array.from(list.children, (r) => Number(r.dataset.id))
    }
    let nonemptyMessages = true
    let controls = true
    const views = modes.map((m) => {
      const ids = show(tasks, m)
      nonemptyMessages &&= message.textContent.trim() === ''
      controls &&= buttons.every(
        (b) =>
          b.type === 'button' &&
          b.getAttribute('aria-pressed') === String(b.textContent === m),
      )
      return ids
    })
    const all = equal(show(tasks, 'all'), [9, 4, 7])
    show([], 'all')
    const empty = message.textContent.trim()
    show([tasks[1]], 'active')
    const noMatches = message.textContent.trim()
    const changed = tasks.map((t) =>
      t.id === 9 ? { ...t, completed: true } : t,
    )
    const toggled =
      equal(show(changed, 'active'), [7]) &&
      equal(show(changed, 'all'), [9, 4, 7])
    const deleted = equal(
      show(
        changed.filter((t) => t.id !== 7),
        'all',
      ),
      [9, 4],
    )
    return [
      equal(views, [[9, 4, 7], [9, 7], [4]]),
      all,
      counts,
      nonemptyMessages &&
        empty === 'No tasks yet' &&
        noMatches === 'No tasks match this filter',
      controls,
      toggled && deleted,
      sameTasks(tasks, sampleTasks()) && f.writes === 0,
    ]
  }
  throw Error('Unknown Week 2 exercise.')
}
