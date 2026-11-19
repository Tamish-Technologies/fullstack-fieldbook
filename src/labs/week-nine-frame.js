// The fixture only captures statement text and values. It never evaluates SQL.
async function weekNineCheck(lesson, tree) {
  const fixture = collectionFixture()
  fixture.weekThree = fixture.weekFour = true
  fixture.responses = new WeakSet()
  fixture.fields.push('rows', 'rowCount', 'created_at', 'createdAt')
  fixture.helpers.toIsoTimestamp = (value) => {
    if (typeof value !== 'string' && !(value instanceof Date))
      throw Error('Pass the database timestamp to toIsoTimestamp.')
    return new Date(value).toISOString()
  }
  const instant = '2026-02-03T04:05:06.000Z'
  const offsetTime = '2026-02-03T09:05:06+05:00'
  const row = (id, title, completed, created_at = new Date(instant)) =>
    Object.freeze({ id, title, completed, created_at })
  const first = row(7, 'Review SQL', false)
  const second = row(19, 'Read constraints', true, offsetTime)
  const all = Object.freeze([first, second])
  function matches(output, input) {
    return (
      output !== input &&
      output?.id === input.id &&
      output.title === input.title &&
      output.completed === input.completed &&
      output.createdAt === instant &&
      !Object.hasOwn(output, 'created_at')
    )
  }
  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }
  async function invoke(name, args, rows = []) {
    const calls = []
    fixture.helpers.query = (sql, values) => {
      calls.push({ sql, values })
      return Promise.resolve(
        Object.freeze({ rows: Object.freeze(rows), rowCount: rows.length }),
      )
    }
    const run = learnerProgram(tree, {}, root, null, fixture)
    const value = await run(name, args)
    const call = calls[0]
    return {
      value,
      sql: calls.length === 1 && typeof call.sql === 'string' ? call.sql : '',
      values:
        calls.length === 1 && Array.isArray(call.values) ? call.values : null,
    }
  }
  const equal = (a, b) =>
    Array.isArray(a) && JSON.stringify(a) === JSON.stringify(b)
  const select = (result) =>
    /\bselect\b[\s\S]+\bfrom\s+tasks\b/i.test(result.sql)
  const field = (sql, name) => new RegExp('\\b' + name + '\\b', 'i').test(sql)
  const explicit = (sql) =>
    ['id', 'title', 'completed', 'created_at'].every((name) =>
      field(sql, name),
    ) && !/\*/.test(sql)
  const hasOrder = (sql) =>
    /\border\s+by\s+(?:tasks\.)?id\b(?!\s+desc)/i.test(sql)
  const filteredBy = (sql, name) =>
    new RegExp(
      '\\bwhere\\s+(?:tasks\\.)?' + name + '\\s*=\\s*\\$1\\b',
      'i',
    ).test(sql)

  if (lesson === '09') {
    const mapped = await invoke('toApiTask', [first])
    const mappedOffset = await invoke('toApiTask', [second])
    const missing = await invoke('toApiTask', [undefined])
    const listing = await invoke('listTasks', [null], all)
    const active = await invoke('listTasks', [false], [first])
    const completed = await invoke('listTasks', [true])
    const one = await invoke('getTask', [19], [second])
    const absent = await invoke('getTask', [121])
    return [
      check(
        matches(mapped.value, first) &&
          matches(mappedOffset.value, second) &&
          missing.value === null,
        'Use the timestamp converter for both driver shapes and preserve completed:false.',
      ),
      check(
        select(listing) &&
          explicit(listing.sql) &&
          hasOrder(listing.sql) &&
          !/\bwhere\b/i.test(listing.sql) &&
          equal(listing.values, []) &&
          Array.isArray(listing.value) &&
          listing.value.length === 2 &&
          listing.value.every((item, i) => matches(item, all[i])),
        'Read the named columns in ascending ID order. Return mapped rows and use an empty values array without a filter.',
      ),
      check(
        select(active) &&
          select(completed) &&
          hasOrder(active.sql) &&
          filteredBy(active.sql, 'completed') &&
          filteredBy(completed.sql, 'completed') &&
          equal(active.values, [false]) &&
          equal(completed.values, [true]) &&
          Array.isArray(active.value) &&
          active.value.length === 1 &&
          matches(active.value[0], first) &&
          equal(completed.value, []),
        'Bind explicit false and true. A query with no matches returns an empty array.',
      ),
      check(
        select(one) &&
          select(absent) &&
          filteredBy(one.sql, 'id') &&
          filteredBy(absent.sql, 'id') &&
          equal(one.values, [19]) &&
          equal(absent.values, [121]) &&
          matches(one.value, second) &&
          absent.value === null,
        'Send the numeric ID as a parameter and map a missing task to null.',
      ),
    ]
  }
  if (lesson === '10') {
    const titles = [
      'Study types',
      "Read O'Reilly",
      'My note: SELECT id FROM tasks',
    ]
    const input = titles.map((title, i) => row(23 + i, title, false))
    const inserted = []
    for (const item of input)
      inserted.push(await invoke('insertTask', [item.title], [item]))
    const falseRow = row(19, second.title, false)
    const reopened = await invoke('setCompletion', [19, false], [falseRow])
    const completed = await invoke(
      'setCompletion',
      [7, true],
      [row(7, first.title, true)],
    )
    const missing = await invoke('setCompletion', [121, false])
    const updateShape = (sql) =>
      /\bupdate\s+tasks\b[\s\S]+\bset\s+completed\s*=\s*\$2\b/i.test(sql) &&
      filteredBy(sql, 'id') &&
      /\breturning\b/i.test(sql) &&
      explicit(sql)
    const insertShape = (sql) =>
      /\binsert\s+into\s+tasks\s*\(\s*title\s*\)\s*values\s*\(\s*\$1\s*\)/i.test(
        sql,
      ) &&
      /\breturning\b/i.test(sql) &&
      explicit(sql)
    return [
      check(
        inserted.every(
          ({ sql }, i) =>
            insertShape(sql) &&
            sql === inserted[0].sql &&
            !sql.includes(titles[i]),
        ),
        'Keep fixed INSERT text with VALUES ($1), named columns and RETURNING.',
      ),
      check(
        inserted.every(
          (result, i) =>
            equal(result.values, [titles[i]]) &&
            matches(result.value, input[i]),
        ),
        'Pass the exact title separately and return the mapped server record.',
      ),
      check(
        updateShape(reopened.sql) &&
          updateShape(completed.sql) &&
          equal(reopened.values, [19, false]) &&
          equal(completed.values, [7, true]) &&
          matches(reopened.value, falseRow) &&
          matches(completed.value, row(7, first.title, true)),
        'Bind [id, completed] with the exact boolean and a WHERE selecting the ID.',
      ),
      check(
        updateShape(missing.sql) &&
          equal(missing.values, [121, false]) &&
          missing.value === null,
        'An update without a match returns null, not fabricated data.',
      ),
    ]
  }
  throw Error('Unknown Week 9 code lab.')
}
