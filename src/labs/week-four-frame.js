// Everything supplied to these programs is local to one opaque exercise frame.
async function weekFourCheck(lesson, tree) {
  const f = collectionFixture()
  f.weekThree = f.weekFour = true
  f.responses = new WeakSet()
  f.fields.push('ok', 'status')
  const call = learnerProgram(tree, {}, root, null, f)
  const run = (name, ...args) => call(name, args)
  const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b)
  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }
  const idea = (id, title = 'Read ' + id, completed = false) => ({
    id,
    title,
    completed,
  })
  function deferred() {
    let resolve, reject
    const promise = new Promise((yes, no) => {
      resolve = yes
      reject = no
    })
    promise.catch(() => {})
    return { promise, resolve, reject }
  }
  const rejection = async (action) => {
    try {
      await action()
      return null
    } catch (error) {
      return String(error?.message ?? error)
    }
  }
  if (lesson === '01') {
    async function trace(label) {
      const gate = deferred(),
        log = []
      f.helpers.load = () => gate.promise
      f.helpers.mark = (v) => {
        log.push(v)
      }
      const done = run('trace', label)
      const before = log.slice()
      gate.resolve(label + ' ready')
      await done
      return [
        done instanceof Promise,
        equal(before, [label]),
        equal(log, [label, label + ' ready', 'done']),
      ]
    }
    const a = await trace('one'),
      b = await trace('two')
    return [
      'Return a Promise for the entire trace.',
      'Mark the input immediately, while load is pending.',
      'Mark the resolved value and then done after settlement.',
    ].map((hint, i) => check(a[i] && b[i], hint))
  }
  if (lesson === '02' || lesson === '03') {
    async function trial(value, fail, transformFails = false) {
      const gate = deferred(),
        events = []
      f.helpers.load = () => gate.promise
      f.helpers.doubleLater = (n) =>
        transformFails
          ? Promise.reject(Error('transform unavailable'))
          : Promise.resolve(n + n)
      f.helpers.cleanup = () => {
        events.push('clean')
      }
      f.helpers.setLoading = (b) => {
        events.push(b)
      }
      const result = run(lesson === '02' ? 'chain' : 'read')
      const before = events.slice()
      if (fail) gate.reject(Error('offline'))
      else gate.resolve(value)
      const output = await result
      return { output, before, events, promise: result instanceof Promise }
    }
    const a = await trial(4, false),
      b = await trial(11, false),
      c = await trial(2, true)
    const chain = lesson === '02'
    const nested = chain ? await trial(5, false, true) : c
    return [
      check(
        [a, b, c].every((r) => r.promise) &&
          a.output === (chain ? 8 : 4) &&
          b.output === (chain ? 22 : 11),
        'Return the eventual value for both successful inputs.',
      ),
      check(
        c.output === null && nested.output === null,
        'Recover with null when the loader or an awaited transformation rejects.',
      ),
      check(
        [a, b, c, nested].every(
          (r) =>
            equal(r.before, chain ? [] : [true]) &&
            equal(r.events, chain ? ['clean'] : [true, false]),
        ),
        'Compare pending and settled states on both paths. Cleanup must run exactly once.',
      ),
    ]
  }
  if (lesson === '06') {
    const first = idea(9, '  Study  ', true),
      extra = Array.from({ length: 19 }, (_, i) => idea(i + 20))
    const input = [
      null,
      { ...first, title: 5 },
      { ...first, id: -1 },
      { ...first, id: 1.5 },
      { ...first, id: 0 },
      { ...first, id: 9007199254740992 },
      { ...first, completed: 'yes' },
      { ...first, title: '  ' },
      { ...first, title: 'x'.repeat(101) },
      first,
      { ...first, title: 'Duplicate' },
      idea(3, 'x'.repeat(100)),
      ...extra,
    ]
    const before = JSON.stringify(input)
    // Each independent payload gets the same interpreter budget; one case
    // must never exhaust another learner attempt's allowance.
    const normalize = (...args) =>
      learnerProgram(tree, {}, root, null, f)('normalize', args)
    const result = normalize(input),
      two = normalize(input, 2)
    const expected = [
      idea(9, 'Study', true),
      idea(3, 'x'.repeat(100)),
      ...extra.slice(0, 6),
    ]
    const matches = (a, b) =>
      Array.isArray(a) &&
      a.length === b.length &&
      a.every(
        (t, i) =>
          t &&
          t.id === b[i].id &&
          t.title === b[i].title &&
          t.completed === b[i].completed &&
          Object.keys(t).length === 3,
      )
    return [
      check(
        (await rejection(() => normalize({}, 8))) !== null &&
          (await rejection(() => normalize([], -1))) !== null &&
          (await rejection(() => normalize([], 1.5))) !== null,
        'Reject a non-array, a negative limit and a fractional limit.',
      ),
      check(
        matches(result, expected),
        'Validate fields before reserving an ID. Trim valid titles and keep the first valid occurrence.',
      ),
      check(
        matches(two, expected.slice(0, 2)) &&
          matches(normalize(input, 0), []) &&
          matches(normalize([], 8), []),
        'Count accepted records toward the limit. The default is eight and a zero limit keeps none.',
      ),
      check(
        before === JSON.stringify(input) &&
          matches(result, expected) &&
          result.every((t) => !input.includes(t)),
        'Create new records without modifying the input.',
      ),
    ]
  }
  if (lesson === '07') {
    async function request(kind) {
      let parses = 0,
        normalizations = 0,
        requests = 0
      const raw = [idea(3, '  Study  ')],
        clean = [idea(3, 'Study')]
      f.helpers.fetchImpl = () => {
        requests++
        if (kind === 'offline') return Promise.reject(Error('offline'))
        const response = {
          ok: kind !== 'http',
          status: kind === 'http' ? 503 : 200,
          json: async () => {
            parses++
            if (kind === 'json') throw Error('invalid JSON')
            return kind === 'shape' ? {} : raw
          },
        }
        f.responses.add(response)
        return Promise.resolve(response)
      }
      f.helpers.normalizeIdeas = (data) => {
        normalizations++
        if (!equal(data, raw)) throw Error('invalid shape')
        return clean
      }
      let result
      const err = await rejection(async () => {
        result = await run('request')
      })
      return { ok: equal(result, clean), err, parses, normalizations, requests }
    }
    const good = await request('good'),
      http = await request('http'),
      offline = await request('offline'),
      json = await request('json'),
      bad = await request('shape')
    return [
      check(
        good.ok &&
          good.requests === 1 &&
          good.parses === 1 &&
          good.normalizations === 1,
        'Await the response and its decoded body, then return normalized ideas.',
      ),
      check(
        http.err?.includes('503') && http.parses === 0,
        'Reject the HTTP response with its status before reading the body.',
      ),
      check(
        offline.err?.includes('offline') &&
          json.err?.includes('invalid JSON') &&
          bad.err?.includes('invalid shape'),
        'Keep network, decoding and validation failures observable to the caller.',
      ),
    ]
  }
  if (lesson === '09') {
    let gate,
      history = [],
      disabled = false,
      shown = [],
      phase = 'idle'
    f.helpers.load = () => gate.promise
    f.helpers.setDisabled = (v) => {
      disabled = v
    }
    f.helpers.show = (state, items) => {
      phase = state
      shown = items
      history.push(state)
    }
    async function attempt(rows, fail) {
      gate = deferred()
      history = []
      const result = run('refresh')
      const pending =
        phase === 'loading' && disabled === true && equal(shown, [])
      if (fail) gate.reject(Error('offline'))
      else gate.resolve(rows)
      await result
      return { pending, phase, disabled, shown, history }
    }
    const data = [idea(2), idea(5)]
    const a = await attempt(data, false),
      b = await attempt([], false),
      c = await attempt([], true),
      d = await attempt(data, false)
    return [
      check(
        [a, b, c, d].every((r) => r.pending),
        'Clear stale results, show loading and disable Load before waiting.',
      ),
      check(
        equal(a.history, ['loading', 'success']) &&
          equal(a.shown, data) &&
          equal(b.history, ['loading', 'empty']) &&
          equal(b.shown, []),
        'Show the received rows. A valid empty array has its own state.',
      ),
      check(
        equal(c.history, ['loading', 'error']) &&
          equal(c.shown, []) &&
          equal(d.history, ['loading', 'success']) &&
          [a, b, c, d].every((r) => r.disabled === false),
        'An error clears stale rows and leaves Load enabled for retry.',
      ),
    ]
  }
  if (lesson === '11') {
    const source = [idea(9, '  Practice  ', true)],
      old = [idea(7), idea(9)]
    const before = JSON.stringify([old, source])
    const writes = []
    let normalized = 0
    f.helpers.normalizeIdeas = (data) => {
      normalized++
      if (!equal(data, source))
        throw Error('Pass the offline fixture to the normalizer.')
      return [idea(9, 'Practice', true)]
    }
    f.helpers.save = (rows) => {
      writes.push(JSON.stringify(rows))
    }
    const ideas = run('offline', source),
      clean = equal(ideas, [idea(9, 'Practice', true)])
    const unchanged =
      writes.length === 0 && JSON.stringify([old, source]) === before
    const next = run('copy', old, idea(9, 'Practice', true))
    const again = Array.isArray(next)
      ? run('copy', next, idea(9, 'Practice', true))
      : null
    const valid = (after, prior) =>
      Array.isArray(after) &&
      after.length === prior.length + 1 &&
      equal(after.slice(0, -1), prior) &&
      Number.isSafeInteger(after.at(-1).id) &&
      after.at(-1).id > 0 &&
      !prior.some((t) => t.id === after.at(-1).id) &&
      after.at(-1).id !== 9 &&
      after.at(-1).title === 'Practice' &&
      after.at(-1).completed === false
    return [
      check(
        normalized === 1 && clean && unchanged,
        'Loading uses the normalizer and performs no local write.',
      ),
      check(
        valid(next, old) &&
          valid(again, next) &&
          JSON.stringify([old, source]) === before,
        'Append a new incomplete task with a fresh local ID on each copy.',
      ),
      check(
        writes.length === 2 &&
          writes[0] === JSON.stringify(next) &&
          writes[1] === JSON.stringify(again),
        'Save the complete next local collection exactly once per copy.',
      ),
    ]
  }
  if (lesson === '11-copy') {
    const list = document.createElement('ul'),
      status = document.createElement('p')
    status.setAttribute('role', 'status')
    root.append(list, status)
    const items = [idea(91, '<b>Read</b>'), idea(4, 'Second')]
    let active,
      target,
      copied = []
    f.helpers.addCopy = (id, label) => {
      const button = document.createElement('button')
      button.dataset.id = String(id)
      button.setAttribute('aria-label', String(label))
      button.append(document.createElement('span'))
      button.firstChild.textContent = 'Copy'
      active.append(button)
    }
    f.helpers.nearestId = () => {
      const button = target.closest('button[data-id]')
      return button ? Number(button.dataset.id) : null
    }
    f.helpers.copyById = (id) => {
      copied.push(id)
    }
    f.helpers.announce = (msg) => {
      status.textContent = msg
    }
    function render(item) {
      active = document.createElement('li')
      list.prepend(active)
      const title = document.createElement('span')
      active.append(title)
      run('paint', item, title)
      return title
    }
    const titles = items.map(render),
      buttons = [...list.querySelectorAll('button')]
    let eventError
    list.addEventListener('click', (e) => {
      target = e.target
      try {
        run('onCopy')
      } catch (error) {
        eventError = error
      }
    })
    for (const b of buttons) b.firstChild.click()
    list.click()
    if (eventError) throw eventError
    return [
      check(
        titles.every(
          (el, i) =>
            el.textContent === items[i].title && el.childElementCount === 0,
        ),
        'Set the supplied title node’s textContent, including the angle brackets.',
      ),
      check(
        buttons.length === 2 &&
          buttons.every((b) =>
            items.some(
              (t) =>
                Number(b.dataset.id) === t.id &&
                (b.getAttribute('aria-label') || '').includes(t.title),
            ),
          ),
        'Give each button the idea ID and a label that names its title.',
      ),
      check(
        equal(copied, [4, 91]) && !!status.textContent.trim(),
        'Use the nearest button ID, ignore blank space and announce the completed copy.',
      ),
    ]
  }
  throw Error('Unknown Week 4 activity.')
}
