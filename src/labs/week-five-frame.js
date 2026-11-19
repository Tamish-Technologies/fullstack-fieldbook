// Week 5 grades pure functions over frozen data. React runs in the local starter.
function weekFiveCheck(lesson, tree) {
  const fixture = collectionFixture()
  fixture.weekThree = true
  fixture.fields.push('ok', 'error')
  // Independent inputs each get the full bounded interpreter allowance.
  const run = (fn, ...args) =>
    learnerProgram(tree, {}, root, null, fixture)(fn, args)
  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }
  const record = (id, title, completed) =>
    Object.freeze({ id, title, completed })
  const tasks = Object.freeze([
    record(12, 'Read React', true),
    record(7, 'Practice JavaScript', false),
    record(31, 'Build React app', false),
  ])
  const sameRows = (a, b) =>
    Array.isArray(a) && a.length === b.length && a.every((v, i) => v === b[i])
  if (lesson === '07') {
    const valid = (s) => {
      const result = run('validateTitle', s)
      return result?.ok === true && result.title === s.trim()
    }
    const invalid = (s) => {
      const result = run('validateTitle', s)
      return (
        result?.ok === false &&
        typeof result.error === 'string' &&
        result.error.trim().length > 0
      )
    }
    return [
      check(
        valid('  Read React  ') && valid('A'),
        'Return an object containing ok: true and the trimmed title.',
      ),
      check(
        ['', '  ', null, {}, 17].every(invalid),
        'Check the input type before trimming. Return an error message for each invalid value.',
      ),
      check(
        valid(' ' + 'x'.repeat(100) + ' ') && invalid('x'.repeat(101)),
        'Measure the cleaned title. Exactly 100 is valid.',
      ),
    ]
  }
  if (lesson === '08') {
    const empty = Object.freeze([])
    const next = run('add', tasks, 42, '  Compare  ')
    const changed = (input, output, id) =>
      Array.isArray(output) &&
      output !== input &&
      output.length === input.length &&
      output.every((t, i) =>
        input[i].id === id
          ? t !== input[i] &&
            t?.id === id &&
            t.title === input[i].title &&
            t.completed === !input[i].completed
          : t === input[i],
      )
    const toggled = run('toggle', tasks, 7)
    const reversed = Object.freeze([...tasks].reverse())
    const deleted = run('remove', reversed, 12)
    const afterDelete = Array.isArray(deleted)
      ? run('add', deleted, 55, 'Next')
      : null
    const appendOK = (result, before, id, title) =>
      Array.isArray(result) &&
      result !== before &&
      result.length === before.length + 1 &&
      sameRows(result.slice(0, -1), before) &&
      result.at(-1)?.id === id &&
      result.at(-1).title === title &&
      result.at(-1).completed === false
    return [
      check(
        appendOK(next, tasks, 42, 'Compare') &&
          appendOK(
            run('add', empty, 1, 'x'.repeat(100)),
            empty,
            1,
            'x'.repeat(100),
          ),
        'Append one fresh incomplete task and retain the existing record references.',
      ),
      check(
        [
          [7, 'Duplicate'],
          [0, 'Zero'],
          ['41', 'String ID'],
          [-1, 'Negative'],
          [1.5, 'Fraction'],
          [9007199254740992, 'Unsafe'],
          [41, ' '],
          [41, null],
          [41, 'x'.repeat(101)],
        ].every(([id, title]) => sameRows(run('add', tasks, id, title), tasks)),
        'Validate the ID and cleaned title before appending.',
      ),
      check(
        changed(tasks, toggled, 7) &&
          changed(tasks, run('toggle', tasks, 12), 12) &&
          sameRows(run('toggle', tasks, 999), tasks),
        'Return a new object only for the matching ID. Flip its current flag.',
      ),
      check(
        sameRows(deleted, [tasks[2], tasks[1]]) &&
          appendOK(afterDelete, deleted, 55, 'Next') &&
          sameRows(run('remove', tasks, 999), tasks),
        'Use the supplied ID after reorder or deletion. Keep all other records.',
      ),
    ]
  }
  if (lesson === '09') {
    const view = (status, query, order, expected, source = tasks) => {
      const result = run('visible', source, status, query, order)
      return (
        Array.isArray(result) &&
        result.length === expected.length &&
        result.every((row, i) => {
          const original = source.find((t) => t.id === expected[i])
          return (
            original &&
            row?.id === original.id &&
            row.title === original.title &&
            row.completed === original.completed
          )
        })
      )
    }
    return [
      check(
        view('active', '  rEaCt  ', 'newest', [31]) &&
          view('completed', 'React', 'oldest', [12]),
        'Apply search and status together after trimming the query.',
      ),
      check(
        view('all', '', 'newest', [31, 12, 7]) &&
          view('all', '', 'oldest', [7, 12, 31]),
        'Sort a derived copy by numeric ID. The provided array is frozen.',
      ),
      check(
        view('all', 'none', 'oldest', []) &&
          view('active', '', 'oldest', [7, 31]) &&
          view('all', '', 'newest', [], []),
        'Clearing search restores the eligible rows. An empty source yields an empty view.',
      ),
      check(
        run('remaining', tasks) === 2 &&
          run('remaining', [tasks[0]]) === 0 &&
          run('remaining', [tasks[1]]) === 1 &&
          run('remaining', []) === 0,
        'Count unfinished records from the full input before filtering.',
      ),
    ]
  }
  throw Error('Unknown Week 5 lab.')
}
