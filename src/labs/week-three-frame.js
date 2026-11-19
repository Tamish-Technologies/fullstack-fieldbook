// Trusted fixtures run inside the opaque lab iframe. The interpreter receives
// only named operations and small task values, never a live node or event.
function weekThreeCheck(lesson, tree, concept) {
  const f = collectionFixture()
  f.weekThree = true
  f.helpers.isTask = (t) => !!taskShape(t) && t.title.length <= 100
  const call = learnerProgram(tree, {}, root, null, f)
  const run = (name, ...args) => call(name, args)
  const rows = () => [
    { id: 12, title: 'Debug JavaScript', completed: false },
    { id: 7, title: 'Read JavaScript', completed: false },
    { id: 9, title: 'Practice CSS', completed: true },
  ]
  const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b)
  const same = (a, b) =>
    Array.isArray(a) &&
    a.length === b.length &&
    a.every(
      (t, i) =>
        t && ['id', 'title', 'completed'].every((k) => t[k] === b[i][k]),
    )
  const ts = rows()
  function expectCheck(ok, hint) {
    observed.push(ok ? '' : hint)
    return !!ok
  }
  if (lesson === '01') {
    const count = (data) => run('countRemaining', data)
    const first = count(ts)
    return [
      expectCheck(
        first === 2 &&
          count([]) === 0 &&
          count([rows()[2]]) === 0 &&
          count(rows().slice(0, 1)) === 1,
        'Count all records whose completed flag is false. Try empty and one-record inputs.',
      ),
      expectCheck(
        count(ts) === first,
        'Calling a count a second time should give the first result.',
      ),
      expectCheck(
        same(ts, rows()),
        'Compare all input records before and after counting.',
      ),
    ]
  }
  if (lesson === '02') {
    let intact = true
    function check(id, raw, title) {
      const input = rows(),
        expected = rows().map((t) =>
          title && t.id === id ? { ...t, title } : t,
        )
      const result = run('rename', input, id, raw)
      intact &&= same(input, rows())
      return same(result, expected)
    }
    return [
      expectCheck(
        check(9, '  Finish  ', 'Finish') && check(7, 'Read more', 'Read more'),
        'Use the requested ID, retain completed, and trim before saving.',
      ),
      expectCheck(
        ['   ', 42, 'x'.repeat(101), null].every((v) => check(7, v)),
        'Reject invalid data before writing a title.',
      ),
      expectCheck(
        check(12, ' ' + 'x'.repeat(100) + ' ', 'x'.repeat(100)),
        'Measure the trimmed value. Exactly 100 characters is valid.',
      ),
      expectCheck(
        check(99, 'Fresh') && intact,
        'A rename cannot create a missing ID or modify an original record.',
      ),
    ]
  }
  if (lesson === '03') {
    const data = [
      { id: 12, title: 'Twin', completed: true },
      { id: 4, title: 'Twin', completed: false },
      { id: 19, title: 'Last', completed: false },
    ]
    const snapshot = structuredClone(data)
    const old = run('ordered', data, 'oldest'),
      oldOk = same(old, [snapshot[1], snapshot[0], snapshot[2]]),
      firstIntact = same(data, snapshot)
    const newest = run('ordered', data, 'newest')
    return [
      expectCheck(
        oldOk && same(newest, [snapshot[2], snapshot[0], snapshot[1]]),
        'For 12, 4, 19 expect oldest 4, 12, 19 and newest 19, 12, 4.',
      ),
      expectCheck(
        equal(run('ordered', [], 'oldest'), []) &&
          same(run('ordered', snapshot.slice(0, 2), 'oldest'), [
            snapshot[1],
            snapshot[0],
          ]),
        'Keep each ID paired with its original title and flag.',
      ),
      expectCheck(
        firstIntact && same(data, snapshot),
        'Take a copy before calling sort. Compare the input order after each view.',
      ),
    ]
  }
  if (lesson === '05') return delegationFixture(f, run)
  if (lesson === '06') return editingFixture(f, run)
  if (lesson === '07') {
    function view(status, q, mode, ids) {
      const result = run('visible', ts, status, q, mode)
      return same(
        result,
        ids.map((id) => rows().find((t) => t.id === id)),
      )
    }
    return [
      expectCheck(
        view('active', ' JAVAscript ', 'oldest', [7, 12]) &&
          view('completed', 'css', 'newest', [9]) &&
          view('all', 'missing', 'oldest', []),
        'Trim and lowercase both strings. Apply status and search together.',
      ),
      expectCheck(
        view('all', '', 'newest', [12, 9, 7]) &&
          view('all', '', 'oldest', [7, 9, 12]),
        'Compare numeric IDs on a copy.',
      ),
      expectCheck(
        [ts, [], [rows()[2]], rows().slice(0, 1)].every(
          (d) => run('remaining', d) === d.filter((t) => !t.completed).length,
        ),
        'Count unfinished source tasks even when they are hidden.',
      ),
      expectCheck(
        run('message', [], []) === 'empty' &&
          run('message', ts, []) === 'no-match' &&
          run('message', ts, [ts[0]]) === '',
        'Check source length first, then visible length.',
      ),
      expectCheck(
        same(ts, rows()) && view('all', '', 'oldest', [7, 9, 12]),
        'Clearing the controls must recover every original record.',
      ),
    ]
  }
  if (lesson === '08') {
    const restore = (input) => run('restore', input)
    const good = rows()[0],
      other = rows()[2]
    return [
      expectCheck(
        [null, 'not-json', 'null', '{}', '42'].every((x) =>
          equal(restore(x), []),
        ),
        'Guard parsing and check Array.isArray before using the result.',
      ),
      expectCheck(
        same(
          restore(
            JSON.stringify([
              null,
              ['unexpected'],
              { label: 'incomplete' },
              { ...good, id: 0 },
              { ...good, title: '  ' },
              { ...good, title: 'x'.repeat(101) },
              3,
              good,
              { ...good, completed: 'false' },
              { ...good, id: 9007199254740992 },
              other,
            ]),
          ),
          [good, other],
        ),
        'Keep valid neighbors when other entries fail the ID, title or boolean check.',
      ),
      expectCheck(
        same(
          restore(
            JSON.stringify([
              { ...good, title: '' },
              other,
              good,
              { ...other, title: 'Later' },
            ]),
          ),
          [other, good],
        ),
        'Reserve an ID only after accepting its first valid record.',
      ),
    ]
  }
  if (lesson === '09') {
    function probe(source, kind) {
      let calls = 0
      f.helpers.orderUnderTest = (data) => {
        calls++
        const sorted = data.slice().sort((a, b) => a.id - b.id)
        if (kind === 'mutates') return data.sort((a, b) => a.id - b.id)
        if (kind === 'wrong') return sorted.reverse()
        if (kind === 'missing') return sorted.slice(1)
        if (kind === 'changed')
          return sorted.map((t) => ({ ...t, title: 'Lost title' }))
        return sorted
      }
      const pass = run('verify', source)
      return calls === 1 && pass === (kind === 'correct')
    }
    return [
      expectCheck(
        [rows(), [], rows().slice(0, 1)].every((d) => probe(d, 'correct')),
        'A correct sort must pass, including empty and one-record inputs.',
      ),
      expectCheck(
        probe(rows(), 'mutates'),
        'Snapshot the source before calling orderUnderTest. A sorted result can conceal mutation.',
      ),
      expectCheck(
        probe(rows(), 'wrong') &&
          probe(rows(), 'missing') &&
          probe(rows(), 'changed'),
        'Check order, length and record contents. A sorted result can still have the wrong title.',
      ),
      expectCheck(
        concept === 'mutation',
        'Which line could rearrange the original array?',
      ),
    ]
  }
  throw Error('Unknown Week 3 lab.')
}
function fixtureNode(tag, parent, text) {
  const node = document.createElement(tag)
  if (text) node.textContent = text
  parent.append(node)
  return node
}
function delegationFixture(f, run) {
  const list = fixtureNode('ul', root),
    calls = []
  let current = null,
    listeners = 0,
    failed
  function nearest() {
    const control = current?.target.closest('[data-action]')
    return control && list.contains(control) ? control : null
  }
  Object.assign(f.helpers, {
    nearestAction: () => nearest()?.dataset.action ?? null,
    nearestId: () => (nearest() ? Number(nearest().dataset.id) : null),
    dispatchAction: (action, id) => {
      calls.push([action, id])
    },
    listenList(kind) {
      if (!['click', 'change'].includes(kind) || ++listeners > 4)
        throw Error('Register click and change once during install().')
      list.addEventListener(kind, (e) => {
        current = e
        try {
          run('route', kind)
        } catch (err) {
          failed = err
        } finally {
          current = null
        }
      })
    },
  })
  function draw(ids) {
    list.replaceChildren()
    for (const id of ids) {
      const row = fixtureNode('li', list)
      for (const action of ['edit', 'delete', 'other']) {
        const button = fixtureNode('button', row)
        button.dataset.action = action
        button.dataset.id = id
        fixtureNode('span', button, action)
      }
      const box = fixtureNode('input', row)
      box.type = 'checkbox'
      box.dataset.action = 'toggle'
      box.dataset.id = id
    }
  }
  function trigger(node, kind = 'click') {
    node.dispatchEvent(new Event(kind, { bubbles: true }))
    if (failed) throw failed
  }
  const get = (id, action) =>
    list.querySelector('[data-id="' + id + '"][data-action="' + action + '"]')
  const matches = (expected) =>
    JSON.stringify(calls.splice(0)) === JSON.stringify(expected)
  draw([4, 12])
  run('install')
  trigger(get(12, 'edit').firstChild)
  trigger(get(4, 'delete').firstChild)
  const nested = matches([
    ['edit', 12],
    ['delete', 4],
  ])
  get(4, 'toggle').click()
  if (failed) throw failed
  const toggled = matches([['toggle', 4]])
  trigger(list)
  trigger(get(4, 'other'))
  trigger(fixtureNode('span', root, 'Outside'))
  const ignored = matches([])
  draw([12, 4])
  trigger(get(4, 'edit').firstChild)
  return [nested, toggled, ignored, matches([['edit', 4]])]
}
function editingFixture(f, run) {
  const records = [
    { id: 12, title: 'Newest' },
    { id: 7, title: 'Middle' },
    { id: 4, title: 'First' },
  ]
  const controls = new Map(),
    panel = fixtureNode('div', root)
  let active = null,
    field,
    form,
    error,
    failed,
    writes = 0
  function listen(node, event, fn) {
    node.addEventListener(event, (e) => {
      try {
        fn(e)
      } catch (err) {
        failed = err
      }
    })
  }
  function checkError() {
    if (failed) throw failed
  }
  for (const row of records) {
    const btn = fixtureNode('button', root, 'Edit ' + row.title)
    controls.set(row.id, btn)
    listen(btn, 'click', () => run('handle', 'edit', row.id, ''))
  }
  Object.assign(f.helpers, {
    openEditor(id) {
      const row = records.find((t) => t.id === id)
      if (!row) throw Error('Open the editor with an existing numeric ID.')
      active = id
      panel.replaceChildren()
      form = fixtureNode('form', panel)
      const label = fixtureNode('label', form, 'Task title')
      field = fixtureNode('input', label)
      field.value = row.title
      fixtureNode('button', form, 'Save').type = 'submit'
      const cancel = fixtureNode('button', form, 'Cancel')
      cancel.type = 'button'
      error = fixtureNode('p', form)
      error.setAttribute('role', 'status')
      listen(form, 'submit', (e) => {
        e.preventDefault()
        run('handle', 'save', active, field.value)
      })
      listen(cancel, 'click', () =>
        run('handle', 'cancel', active, field.value),
      )
      listen(field, 'keydown', (e) => {
        if (run('cancels', e.key) === true) {
          e.preventDefault()
          run('handle', 'cancel', active, field.value)
        }
      })
      field.focus()
    },
    showError(text) {
      if (!error || typeof text !== 'string')
        throw Error('Give the learner a short correction.')
      error.textContent = text
    },
    commitTitle(id, title) {
      const row = records.find((t) => t.id === id)
      if (!row || typeof title !== 'string')
        throw Error('Commit a title to its numeric ID.')
      row.title = title
      writes++
    },
    closeEditor() {
      const old = active
      active = null
      panel.replaceChildren()
      controls.get(old)?.focus()
    },
  })
  function open(id) {
    controls.get(id).click()
    checkError()
    return active === id && !!field
  }
  function type(value) {
    field.value = value
    field.dispatchEvent(new Event('input', { bubbles: true }))
  }
  function submit() {
    form.requestSubmit()
    checkError()
  }
  function key(k) {
    const e = new KeyboardEvent('keydown', {
      key: k,
      bubbles: true,
      cancelable: true,
    })
    field.dispatchEvent(e)
    checkError()
    return !e.defaultPrevented
  }
  if (!open(12)) return [false, false, false, false, false, false]
  const opened =
    field.value === 'Newest' &&
    document.activeElement === field &&
    !!field.labels.length
  type('   ')
  submit()
  const rejected =
    active === 12 &&
    writes === 0 &&
    records[0].title === 'Newest' &&
    !!error.textContent.trim()
  if (!open(12)) return [opened, rejected, false, false, false, false]
  type('  Revised  ')
  if (key('Enter') && active === 12) submit()
  const saved =
    active === null &&
    writes === 1 &&
    records[0].title === 'Revised' &&
    records[1].title === 'Middle'
  const focused = document.activeElement === controls.get(12)
  if (!open(7)) return [opened, rejected, saved, false, false, false]
  type('x'.repeat(101))
  submit()
  const tooLong = active === 7 && records[1].title === 'Middle' && writes === 1
  open(7)
  type('a'.repeat(100))
  submit()
  const limit = tooLong && records[1].title === 'a'.repeat(100) && writes === 2
  open(4)
  type('Draft')
  const other = key('ArrowLeft') && active === 4
  key('Escape')
  const escaped = active === null && document.activeElement === controls.get(4)
  open(4)
  type('Different')
  form.querySelector('[type=button]').click()
  checkError()
  return [
    opened,
    rejected,
    saved,
    limit,
    other &&
      escaped &&
      active === null &&
      writes === 2 &&
      records[2].title === 'First',
    focused && document.activeElement === controls.get(4),
  ]
}
