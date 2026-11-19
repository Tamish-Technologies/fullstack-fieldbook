function weekElevenCheck(lesson, tree) {
  const fixture = collectionFixture()
  fixture.weekThree = true
  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }
  if (lesson === '04') {
    fixture.fields.push('event', 'requestId', 'method', 'route', 'status', 'elapsedMs')
    fixture.helpers.isRequestId = (value) =>
      typeof value === 'string' && /^req-[a-z0-9-]{1,36}$/.test(value)
    fixture.helpers.isHttpMethod = (value) =>
      ['GET', 'POST', 'PATCH', 'DELETE', 'HEAD'].includes(value)
    fixture.helpers.isRouteTemplate = (value) =>
      ['/api/tasks', '/api/tasks/:id', '/api/health', '/api/live', '/api/auth/me'].includes(value)
    const run = learnerProgram(tree, {}, root, null, fixture)
    const from = (input) => run('buildRequestLog', [input])
    const record = (changes = {}) => Object.freeze({
      method: 'GET', route: '/api/tasks/:id', requestId: 'req-first', status: 401, elapsedMs: 8,
      rawUrl: '/api/tasks/123?private=sensitive', cookie: 'private', token: 'private',
      body: 'private', headers: 'private', ...changes,
    })
    const expected = (input, route = input.route) => {
      const output = from(input)
      return output && output !== input && Object.keys(output).length === 6 &&
        output.event === 'http_request' && output.requestId === input.requestId &&
        output.method === input.method && output.route === route &&
        output.status === input.status && output.elapsedMs === input.elapsedMs
    }
    const rejects = (...inputs) => inputs.every((input) => from(input) === null)
    return [
      check(expected(record()) && expected(record({ method: 'PATCH', requestId: 'req-next', status: 200, elapsedMs: 0 })),
        'Create a new record with exactly the six approved fields.'),
      check(expected(record({ route: '/api/live' })) &&
        expected(record({ route: '/api/tasks/889?private=yes' }), 'unmatched') &&
        expected(record({ route: undefined }), 'unmatched'),
        'Keep approved templates and return unmatched for other route values.'),
      check(rejects(record({ status: 99 }), record({ status: 600 }), record({ status: '200' }),
        record({ elapsedMs: -1 }), record({ elapsedMs: Infinity }), record({ elapsedMs: 1.2 })) &&
        expected(record({ status: 599, elapsedMs: 0 })),
        'Validate integer status and duration, including zero elapsed time.'),
      check(rejects(null, '', [], record({ requestId: 'bad secret' }), record({ method: 'TRACK-PRIVATE' })),
        'Reject invalid input, request IDs, and HTTP methods.'),
    ]
  }

  fixture.fields.push('type', 'status', 'code', 'message')
  fixture.helpers.hasDbClassPrefix = (code) =>
    typeof code === 'string' && code.startsWith('08')
  const run = learnerProgram(tree, {}, root, null, fixture)
  const error = (fields = {}) => Object.freeze({
    ...fields, message: 'password=fictional PRIVATE_DETAILS', stack: 'PRIVATE_STACK',
  })
  const fixed = (status, code, inputs) => {
    const outputs = inputs.map((input) => run('classifyPublicError', [input]))
    const message = outputs[0]?.message
    return typeof message === 'string' && message.trim().length >= 5 && message.length <= 140 &&
      !/password\s*=|private_details|private_stack|stack trace|postgres:\/\//i.test(message) &&
      outputs.every((output) => output && Object.keys(output).length === 3 &&
        output.status === status && output.code === code && output.message === message)
  }
  return [
    check(fixed(400, 'INVALID_JSON', [error({ type: 'entity.parse.failed' }), { type: 'entity.parse.failed' }]),
      'Return 400 INVALID_JSON with a fixed public message.'),
    check(fixed(413, 'PAYLOAD_TOO_LARGE', [error({ type: 'entity.too.large' }), { type: 'entity.too.large' }]),
      'Return 413 PAYLOAD_TOO_LARGE with a fixed public message.'),
    check(fixed(503, 'DB_UNAVAILABLE',
      ['ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', '57P01', '08006', '08P01'].map((code) => error({ code }))),
      'Recognize each listed database connection code and the 08 class.'),
    check(fixed(500, 'INTERNAL_ERROR', [error({ code: 'OTHER' }), error({ code: 19 }), error(), null]),
      'Return a consistent 500 fallback without raw driver details.'),
  ]
}
