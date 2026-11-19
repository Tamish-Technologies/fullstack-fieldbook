// Fictional credentials and a query recorder. Neither fixture starts an API or runs SQL.
async function weekTenCheck(lesson, tree) {
  const fixture = collectionFixture()
  fixture.weekThree = fixture.weekFour = true
  fixture.responses = new WeakSet()
  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }

  if (lesson === '05') {
    fixture.fields.push('email', 'password', 'ok')
    fixture.statics['Object.keys'] = Object.keys
    fixture.helpers.isEmailAddress = (email) =>
      typeof email === 'string' &&
      email.length <= 254 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const run = learnerProgram(tree, {}, root, null, fixture)
    const email = '  Reader@Example.Test '
    const password = ' FictionalPhrase '
    const valid = Object.freeze({ email, password })
    const accepts = (body, normalized) => {
      const result = run('validateCredentials', [Object.freeze(body)])
      return result?.ok === true && result.email === normalized &&
        result.password === body.password && Object.keys(result).length === 3
    }
    const rejects = (...bodies) =>
      bodies.every((body) => run('validateCredentials', [body])?.ok === false)
    return [
      check(
        run('normalizeEmail', [email]) === 'reader@example.test' &&
        run('normalizeEmail', [' BOB+notes@EXAMPLE.TEST  ']) === 'bob+notes@example.test' &&
        run('normalizeEmail', [17]) === '' && run('normalizeEmail', [null]) === '',
        'Check the input type before trimming and lowercasing.',
      ),
      check(
        rejects(null, 'invalid', [], { ...valid, email: 42 },
          { ...valid, email: 'reader@example' },
          { ...valid, email: 'x'.repeat(245) + '@example.test' }),
        'Reject invalid bodies and let isEmailAddress check the normalized value.',
      ),
      check(
        rejects({ ...valid, password: 7 }, { ...valid, password: 'x'.repeat(11) },
          { ...valid, password: 'x'.repeat(129) }) &&
        accepts({ ...valid, password: 'x'.repeat(12) }, 'reader@example.test') &&
        accepts({ ...valid, password: 'x'.repeat(128) }, 'reader@example.test'),
        'Require a password string and accept both 12 and 128 characters.',
      ),
      check(
        rejects({ ...valid, ownerId: 'other' }, { email }) &&
        accepts(valid, 'reader@example.test') &&
        accepts({ email: 'BOB@example.test', password: ' InDEPENDent practice ' }, 'bob@example.test'),
        'Allow only email and password. Return the normalized email with the unchanged password.',
      ),
    ]
  }

  fixture.fields.push('rows', 'rowCount')
  const ownerA = 'practice-owner-a'
  const ownerB = 'practice-owner-b'
  const row = Object.freeze({ id: 37 })
  const scope = 'where owner_id = $1 and id = $2'
  async function invoke(name, args, rows = []) {
    const calls = []
    fixture.helpers.query = (statement, values) => {
      calls.push({ statement, values })
      return Promise.resolve(Object.freeze({ rows: Object.freeze(rows), rowCount: rows.length }))
    }
    const run = learnerProgram(tree, {}, root, null, fixture)
    const value = await run(name, args)
    const call = calls[0]
    const sql = calls.length === 1 && typeof call.statement === 'string'
      ? call.statement.trim().toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '')
      : ''
    return { sql, values: call?.values, value }
  }
  const binds = (call, values) =>
    Array.isArray(call.values) && JSON.stringify(call.values) === JSON.stringify(values)
  const listA = await invoke('list', [ownerA], [row])
  const listB = await invoke('list', [ownerB])
  const getA = await invoke('get', [ownerA, 37], [row])
  const getB = await invoke('get', [ownerB, 37])
  const insertA = await invoke('create', [ownerA, "Learner's notes"], [row])
  const insertB = await invoke('create', [ownerB, 'New practice row'], [row])
  const active = await invoke('setCompletion', [ownerA, 37, false], [row])
  const blocked = await invoke('setCompletion', [ownerB, 37, true])
  const removeA = await invoke('remove', [ownerA, 37], [row])
  const removeB = await invoke('remove', [ownerB, 37])
  return [
    check(
      listA.sql === 'select id from user_tasks where owner_id = $1' &&
      listB.sql === listA.sql && binds(listA, [ownerA]) && binds(listB, [ownerB]) &&
      listA.value?.length === 1 && listA.value[0]?.id === row.id &&
      Array.isArray(listB.value) && listB.value.length === 0 &&
      getA.sql === 'select id from user_tasks ' + scope && getB.sql === getA.sql &&
      binds(getA, [ownerA, 37]) && binds(getB, [ownerB, 37]) &&
      getA.value?.id === row.id && getB.value === null,
      'Select id and keep the owner binding in both list and get.',
    ),
    check(
      /^insert into user_tasks\s*\(owner_id,\s*title\) values\s*\(\$1,\s*\$2\) returning id$/.test(insertA.sql) &&
      insertA.sql === insertB.sql &&
      binds(insertA, [ownerA, "Learner's notes"]) && binds(insertB, [ownerB, 'New practice row']) &&
      insertA.value?.id === row.id && insertB.value?.id === row.id,
      'Bind the verified owner and unchanged title to the INSERT.',
    ),
    check(
      active.sql === 'update user_tasks set completed = $3 ' + scope + ' returning id' &&
      active.sql === blocked.sql && binds(active, [ownerA, 37, false]) &&
      binds(blocked, [ownerB, 37, true]) && active.value?.id === row.id && blocked.value === null,
      'Scope UPDATE by owner and ID, and bind false without coercing it.',
    ),
    check(
      removeA.sql === 'delete from user_tasks ' + scope &&
      removeB.sql === removeA.sql && binds(removeA, [ownerA, 37]) &&
      binds(removeB, [ownerB, 37]) && removeA.value === true && removeB.value === false,
      'Scope DELETE by owner and ID and derive the result from rowCount.',
    ),
  ]
}
