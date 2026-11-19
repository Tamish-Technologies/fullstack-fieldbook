// A local fixture emulates responses; no learner operation can call real fetch.
async function weekEightCheck(lesson, tree) {
  const signal = Object.freeze(Object.create(null))
  const fixture = collectionFixture(signal)
  fixture.weekThree = fixture.weekFour = true
  fixture.fields.push(
    'signal',
    'status',
    'ok',
    'contentType',
    'data',
    'count',
    'error',
    'message',
    'code',
    'createdAt',
    'method',
    'body',
  )
  fixture.responses = new WeakSet()
  fixture.helpers.isAbort = (error) =>
    error instanceof DOMException && error.name === 'AbortError'
  const createdAt = '2026-01-01T10:00:00.000Z'
  const task = (id, title, completed = false) =>
    Object.freeze({ id, title, completed, createdAt })
  const rows = Object.freeze([
    task(7, 'Review headers'),
    task(14, 'Trace requests', true),
  ])
  const list = Object.freeze({ data: rows, count: rows.length })
  const saved = task(21, 'Use server IDs')
  const patched = task(7, 'Review headers')
  const abort = new DOMException('Practice request cancelled', 'AbortError')
  const requestLog = []
  let current

  fixture.helpers.fetchImpl = (path, options) => {
    requestLog.push({ path, options })
    const scenario = current
    if (scenario.rejection) return Promise.reject(scenario.rejection)
    const response = Object.freeze({
      ok: scenario.status >= 200 && scenario.status < 300,
      status: scenario.status,
      contentType: scenario.contentType ?? 'application/json',
      json() {
        scenario.reads++
        if (scenario.decodeError || scenario.status === 204)
          return Promise.reject(new SyntaxError('Fixture has no usable JSON'))
        return Promise.resolve(scenario.payload)
      },
    })
    fixture.responses.add(response)
    return Promise.resolve(response)
  }

  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }
  async function request(settings, run) {
    current = { reads: 0, status: 200, payload: list, ...settings }
    requestLog.length = 0
    const {
      path = '/api/tasks',
      method = 'GET',
      body,
      expected = 'list',
    } = current
    const options = Object.freeze({
      method,
      signal,
      ...(body === undefined
        ? {}
        : {
            body: JSON.stringify(body),
            headers: Object.freeze({ 'Content-Type': 'application/json' }),
          }),
    })
    try {
      const value = await run('requestTasks', [path, options, expected])
      return { value, reads: current.reads, args: validArguments() }
    } catch (error) {
      return { error, reads: current.reads, args: validArguments() }
    }
    function validArguments() {
      const call = requestLog[0]
      return (
        requestLog.length === 1 &&
        call.path === path &&
        call.options === options
      )
    }
  }

  const program = () => learnerProgram(tree, {}, root, null, fixture)
  const run = (settings = {}) => request(settings, program())
  const has = (result, text) =>
    result.args &&
    typeof result.error?.message === 'string' &&
    result.error.message.includes(text)
  const http = (status, code, message, settings = {}) =>
    run({
      ...settings,
      status,
      payload: Object.freeze({ error: Object.freeze({ code, message }) }),
    })
  const validList = (result) =>
    result.args && result.reads === 1 && result.value === rows
  const validRecord = (result, row) =>
    result.args && result.reads === 1 && result.value === row
  const post = {
    status: 201,
    method: 'POST',
    expected: 'task',
    body: { title: saved.title },
    payload: Object.freeze({ data: saved }),
  }
  const patch = {
    method: 'PATCH',
    path: '/api/tasks/7',
    expected: 'task',
    body: { completed: false },
    payload: Object.freeze({ data: patched }),
  }
  const remove = {
    status: 204,
    method: 'DELETE',
    path: '/api/tasks/14',
    expected: 'none',
    contentType: '',
  }
  const network = { rejection: new TypeError('Fixture connection unavailable') }
  const malformed = { decodeError: true }
  const html = { contentType: 'text/html', decodeError: true }
  const shape = {
    payload: Object.freeze({ data: rows, count: rows.length + 1 }),
  }
  const badId = {
    ...patch,
    payload: Object.freeze({ data: task('7', 'Invalid ID') }),
  }

  if (lesson === '03') {
    const get = await run()
    const create = await run(post)
    const invalid = await http(
      400,
      'VALIDATION_ERROR',
      'Title too long',
      postWithoutResult(),
    )
    const unavailable = await run(network)
    const cancelled = await run({ rejection: abort })
    const unexpected = await run(html)
    const broken = await run(malformed)
    const wrong = await run(shape)
    const missing = await run({ payload: Object.freeze({ count: 0 }) })
    return [
      check(
        validList(get) && validRecord(create, saved),
        'Forward the path and original options. Decode successes and return validated server data with the existing IDs.',
      ),
      check(
        has(invalid, '400') &&
          has(invalid, 'Title too long') &&
          invalid.reads === 1,
        'Fetch resolved, but the 400 still rejects. Keep the status and the returned message.',
      ),
      check(
        has(unavailable, 'NETWORK_ERROR') &&
          cancelled.args &&
          cancelled.error === abort,
        'A rejected fetch is a network failure. Re-throw deliberate cancellation.',
      ),
      check(
        has(unexpected, 'NON_JSON_RESPONSE') &&
          unexpected.reads === 0 &&
          has(broken, 'BAD_JSON') &&
          has(wrong, 'BAD_RESPONSE') &&
          has(missing, 'BAD_RESPONSE'),
        'Check the media type before decoding and validate the resulting envelope.',
      ),
    ]
  }
  if (lesson === '07') {
    const deleted = await run(remove)
    const invalid = await http(400, 'INVALID_ID', 'Invalid task ID', {
      ...remove,
      path: '/api/tasks/02',
      status: 400,
      contentType: 'application/json',
    })
    const missing = await http(404, 'TASK_NOT_FOUND', 'Task missing', {
      ...remove,
      status: 404,
      contentType: 'application/json',
    })
    const unavailable = await run({ ...remove, ...network })
    const later = await run()
    return [
      check(
        deleted.args &&
          !deleted.error &&
          deleted.value === undefined &&
          deleted.reads === 0,
        'A successful 204 returns undefined before attempting JSON.',
      ),
      check(
        has(invalid, '400') &&
          has(invalid, 'Invalid task ID') &&
          has(missing, '404') &&
          has(missing, 'Task missing'),
        'Decode the failure envelope rather than treating a failed DELETE as success.',
      ),
      check(
        has(unavailable, 'NETWORK_ERROR') &&
          !/HTTP \d{3}/.test(unavailable.error.message),
        'A rejected transport does not have an HTTP status.',
      ),
      check(
        validList(later) && list.count === rows.length,
        'GET still needs validated JSON. Return the server data without altering it.',
      ),
    ]
  }
  if (lesson === '09') {
    const reads = await run()
    const writes = [await run(post), await run(patch), await run(remove)]
    const invalid = await http(
      400,
      'VALIDATION_ERROR',
      'Title too long',
      postWithoutResult(),
    )
    const missing = await http(404, 'TASK_NOT_FOUND', 'Task missing', {
      ...patch,
      payload: undefined,
    })
    const unavailable = await run(network)
    const broken = await run(malformed)
    const unexpected = await run(html)
    const wrong = await run(badId)
    const retry = program()
    const first = await request(malformed, retry)
    const next = await request({}, retry)
    return [
      check(
        validList(reads) &&
          validRecord(writes[0], saved) &&
          validRecord(writes[1], patched) &&
          writes[2].args &&
          writes[2].reads === 0 &&
          !writes[2].error &&
          writes[2].value === undefined,
        'Forward each method, path, signal and body without modification. Keep the 204 shortcut.',
      ),
      check(
        has(invalid, '400') &&
          has(invalid, 'Title too long') &&
          has(missing, '404') &&
          has(missing, 'Task missing'),
        'Keep invalid input and missing resource distinguishable in the HTTP failures.',
      ),
      check(
        has(unavailable, 'NETWORK_ERROR') &&
          has(broken, 'BAD_JSON') &&
          has(unexpected, 'NON_JSON_RESPONSE') &&
          has(wrong, 'BAD_RESPONSE'),
        'A network rejection, malformed JSON, HTML and malformed task each need a useful classification.',
      ),
      check(
        has(first, 'BAD_JSON') && validList(next),
        'Repeat the decode failure, then verify a fresh successful call can recover.',
      ),
    ]
  }
  throw Error('Unknown Week 8 lab.')

  function postWithoutResult() {
    return { method: post.method, expected: post.expected, body: post.body }
  }
}
