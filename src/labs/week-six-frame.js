// Week 6 inputs are frozen data and disposable HTTP-like fixtures.
async function weekSixCheck(lesson, tree) {
  // Only the identity of this inert token may cross the interpreter boundary.
  const signal =
    lesson === '10' ? Object.freeze(Object.create(null)) : undefined
  const fixture = collectionFixture(signal)
  fixture.weekThree = fixture.weekFour = true
  fixture.fields.push('signal', 'ok', 'status', 'method')
  fixture.responses = new WeakSet()

  const url = 'https://jsonplaceholder.typicode.com/todos?_limit=8'
  const row = (id, title, completed = false) =>
    Object.freeze({ id, title, completed })
  const equalRows = (result, expected) =>
    Array.isArray(result) &&
    result.length === expected.length &&
    result.every(
      (item, i) =>
        item &&
        item.id === expected[i].id &&
        item.title === expected[i].title &&
        item.completed === expected[i].completed,
    )

  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }

  async function outcome(name, argument) {
    try {
      const run = learnerProgram(tree, { IDEAS_URL: url }, root, null, fixture)
      return { value: await run(name, [argument]), failed: false }
    } catch (error) {
      return { error, failed: true }
    }
  }
  if (lesson === '01') {
    const samples = Object.freeze([
      row(17, '  Read React docs  ', true),
      row(17, 'Duplicate'),
      row(8, ' <b>Literal</b> ', 'true'),
      row(29, 'x'.repeat(100)),
    ])
    const good = await outcome('normalizeIdeas', samples)
    const invalid = Object.freeze([
      row('2', 'Invalid'),
      row(0, 'Invalid'),
      row(-2, 'Invalid'),
      row(1.5, 'Invalid'),
      row(9007199254740992, 'Invalid'),
      null,
      3,
      [],
      row(40, ' '),
      row(40, 5),
      row(40, 'x'.repeat(101)),
      row(40, 'First usable row'),
    ])
    const mixed = await outcome('normalizeIdeas', invalid)
    const malformed = await Promise.all(
      [null, {}, 42].map((value) => outcome('normalizeIdeas', value)),
    )
    const empty = await outcome('normalizeIdeas', Object.freeze([]))
    return [
      check(
        malformed.every(
          (entry) =>
            entry.failed &&
            /list|array|shape/i.test(entry.error?.message ?? ''),
        ) && equalRows(empty.value, []),
        'Check Array.isArray before iterating. Reject an invalid shape and return [] for a valid empty list.',
      ),
      check(
        equalRows(good.value, [
          row('api-17', 'Read React docs', true),
          row('api-8', '<b>Literal</b>'),
          row('api-29', 'x'.repeat(100)),
        ]) && good.value.every((item) => !samples.includes(item)),
        'Keep the first usable ID, trim the title and build a fresh record. Use completed === true.',
      ),
      check(
        equalRows(mixed.value, [row('api-40', 'First usable row')]),
        'Skip invalid IDs and unsupported titles. A rejected row must not claim its ID.',
      ),
    ]
  }

  async function request(mode) {
    let calls = 0,
      parses = 0,
      normalized = 0,
      validArgs = true
    const failure =
      mode === 'abort'
        ? new DOMException('Fixture was cancelled', 'AbortError')
        : new TypeError('Fixture connection failed')
    const invalidJson = new SyntaxError('Invalid fixture JSON')
    const invalidShape = new Error('Expected a list of ideas')
    const raw = Object.freeze([row(37, '  Review cleanup  ')])
    const clean = Object.freeze([row('api-37', 'Review cleanup')])
    fixture.helpers.fetchImpl = (endpoint, options) => {
      calls++
      validArgs &&=
        endpoint === url &&
        options?.signal === signal &&
        (!options.method || options.method === 'GET') &&
        Object.keys(options).every(
          (key) => key === 'signal' || key === 'method',
        )
      if (mode === 'network' || mode === 'abort') return Promise.reject(failure)
      const response = Object.freeze({
        ok: mode !== 'http',
        status: mode === 'http' ? 503 : 200,
        json: async () => {
          parses++
          if (mode === 'json') throw invalidJson
          return mode === 'shape' ? {} : raw
        },
      })
      fixture.responses.add(response)
      return Promise.resolve(response)
    }
    fixture.helpers.normalizeIdeas = (data) => {
      normalized++
      if (data !== raw) throw invalidShape
      return clean
    }
    const result = await outcome('fetchIdeas', Object.freeze({ signal }))
    return {
      ...result,
      validArgs: validArgs && calls === 1,
      parses,
      normalized,
      expectedResult: equalRows(result.value, clean),
      propagated:
        result.failed &&
        result.error ===
          (mode === 'json'
            ? invalidJson
            : mode === 'shape'
              ? invalidShape
              : failure),
    }
  }

  const good = await request('good')
  const http = await request('http')
  const json = await request('json')
  const shape = await request('shape')
  const network = await request('network')
  const abort = await request('abort')
  return [
    check(
      good.validArgs &&
        good.parses === 1 &&
        good.normalized === 1 &&
        good.expectedResult,
      'Call the injected fake once with IDEAS_URL and the original signal. Decode once and return the normalized array.',
    ),
    check(
      http.validArgs &&
        http.failed &&
        /503/.test(http.error?.message ?? '') &&
        http.parses === 0 &&
        http.normalized === 0,
      'Check response.ok before json(). Throw an error containing the HTTP status.',
    ),
    check(
      json.validArgs &&
        json.propagated &&
        json.parses === 1 &&
        json.normalized === 0 &&
        shape.validArgs &&
        shape.propagated &&
        shape.parses === 1 &&
        shape.normalized === 1,
      'Decoding and normalization failures should reach the caller.',
    ),
    check(
      network.validArgs &&
        network.propagated &&
        abort.validArgs &&
        abort.propagated,
      'Let the original transport and cancellation rejections reach the caller.',
    ),
  ]
}
