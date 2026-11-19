// These checks exercise plain records and learner-created closures only.
function weekSevenCheck(lesson, tree) {
  const fixture = collectionFixture()
  fixture.weekThree = fixture.weekFour = true
  fixture.responses = new WeakSet()
  fixture.fields.push('createdAt', 'ok', 'value', 'message')
  fixture.statics['Object.keys'] = (value) => Object.keys(value)
  fixture.statics['Object.hasOwn'] = (value, key) => Object.hasOwn(value, key)
  fixture.helpers.Number = (value) =>
    typeof value === 'string' ? Number(value) : NaN
  fixture.helpers.String = (value) =>
    typeof value === 'number' ? String(value) : ''
  const clock = '2026-01-01T10:00:00.000Z'
  fixture.helpers.now = () => clock

  // Store methods may close over the student's own task state. They are
  // invoked by the test fixture, never by code in the application origin.
  if (lesson === '06') {
    fixture.fields.push('initialTasks')
    fixture.storeMethods = ['list', 'get', 'create', 'update', 'remove']
    fixture.fields.push(...fixture.storeMethods)
  }
  const flatRecord = fixture.record
  fixture.record = (value) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const scalarFields = { ...value }
      if (fixture.storeMethods) {
        for (const method of fixture.storeMethods) {
          if (typeof value[method] === 'function') delete scalarFields[method]
        }
      } else if (typeof value.value === 'object' && value.value !== null) {
        flatRecord(value.value)
        delete scalarFields.value
      }
      flatRecord(scalarFields)
      return value
    }
    return flatRecord(value)
  }

  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }
  const run = (name, argument) =>
    learnerProgram(tree, {}, root, null, fixture)(name, [argument])
  const createBody = (title) => Object.freeze({ title })

  if (lesson === '06') {
    const store = (initialTasks = []) =>
      run(
        'createTaskStore',
        Object.freeze({
          initialTasks: Object.freeze(initialTasks),
        }),
      )
    function probe(steps) {
      const instance = store()
      if (
        !instance ||
        !fixture.storeMethods.every(
          (name) => typeof instance[name] === 'function',
        )
      ) {
        throw Error(
          'Return an object with list, get, create, update and remove functions.',
        )
      }
      return steps(instance)
    }
    const correctRow = (row, id, title, completed) =>
      row?.id === id &&
      row.title === title &&
      row.completed === completed &&
      row.createdAt === clock
    return [
      check(
        probe((api) => {
          const startsEmpty =
            Array.isArray(api.list()) &&
            api.list().length === 0 &&
            api.get(1) === null
          return (
            startsEmpty &&
            correctRow(api.create(createBody('Read')), 1, 'Read', false)
          )
        }),
        'Start empty. Create ID 1 with completed:false and now() as createdAt.',
      ),
      check(
        probe((api) => {
          const first = api.create(createBody('One'))
          const second = api.create(createBody('Two'))
          const removed = api.remove(first.id)
          const third = api.create(createBody('Three'))
          const seeded = store([
            Object.freeze({
              id: 8,
              title: 'Seed',
              completed: true,
              createdAt: clock,
            }),
            Object.freeze({
              id: 3,
              title: 'Other',
              completed: false,
              createdAt: clock,
            }),
          ])
          return (
            first.id === 1 &&
            second.id === 2 &&
            removed === true &&
            third.id === 3 &&
            seeded.get(8)?.title === 'Seed' &&
            seeded.create(createBody('After seed')).id === 9
          )
        }),
        'Increment a separate counter and initialise it above the highest seed ID.',
      ),
      check(
        probe((api) => {
          const completed = api.create(createBody('Done'))
          api.create(createBody('Pending'))
          api.update(completed.id, Object.freeze({ completed: true }))
          const ids = (value) =>
            Array.isArray(value) ? value.map((item) => item.id).join(',') : ''
          return (
            ids(api.list({ completed: true })) === '1' &&
            ids(api.list({ completed: false })) === '2' &&
            ids(api.list({ completed: null })) === '1,2'
          )
        }),
        'An explicit false must select active tasks. null selects all.',
      ),
      check(
        probe((api) => {
          const created = api.create(createBody('Original'))
          if (!created) return false
          created.title = 'Edited outside'
          if (!correctRow(api.get(1), 1, 'Original', false)) return false
          const row = api.get(1)
          const listed = api.list()[0]
          row.completed = true
          listed.title = 'Edited outside'
          if (!correctRow(api.get(1), 1, 'Original', false)) return false
          const patch = api.update(1, Object.freeze({ title: 'Revised' }))
          if (!correctRow(patch, 1, 'Revised', false)) return false
          patch.title = 'Also external'
          return (
            correctRow(api.get(1), 1, 'Revised', false) &&
            api.get(99) === null &&
            api.update(99, Object.freeze({ title: 'Unused' })) === null &&
            api.remove(99) === false
          )
        }),
        'Return independent copies and keep ID and timestamp during partial updates. Handle missing IDs.',
      ),
      check(
        probe((api) => {
          api.create(createBody('Only here'))
          const another = store()
          return (
            another.list().length === 0 &&
            another.create(createBody('Fresh')).id === 1 &&
            api.get(1)?.title === 'Only here'
          )
        }),
        'Each factory call starts a new store and owns its own ID counter.',
      ),
    ]
  }

  const invalid = (result) =>
    result?.ok === false &&
    typeof result.message === 'string' &&
    result.message.trim().length > 0
  const valid = (result, expected) => {
    if (result?.ok !== true) return false
    if (expected === null || typeof expected !== 'object')
      return result.value === expected
    const fields = Object.keys(expected)
    return (
      result.value &&
      Object.keys(result.value).length === fields.length &&
      fields.every(
        (key) =>
          Object.hasOwn(result.value, key) &&
          result.value[key] === expected[key],
      )
    )
  }
  const create = (value) => run('validateCreateBody', value)
  const patch = (value) => run('validatePatchBody', value)
  const id = (value) => run('parseTaskId', value)
  const filter = (value) => run('parseCompletedFilter', value)
  const padded = createBody('  Learn  ')
  return [
    check(
      [
        null,
        undefined,
        [],
        {},
        42,
        'text',
        createBody(42),
        { title: 'OK', id: 2 },
        { title: 'OK', completed: false },
        { title: 'OK', isAdmin: true },
      ].every((value) => invalid(create(value))),
      'Require a JSON object whose only own key is a string title.',
    ),
    check(
      valid(create(padded), { title: 'Learn' }) &&
        padded.title === '  Learn  ' &&
        valid(create(createBody('x')), { title: 'x' }) &&
        valid(create(createBody(' ' + 'x'.repeat(80) + ' ')), {
          title: 'x'.repeat(80),
        }) &&
        invalid(create(createBody('x'.repeat(81)))) &&
        invalid(create(createBody('   '))),
      'Trim before checking the inclusive range, and leave the supplied object unchanged.',
    ),
    check(
      [
        null,
        undefined,
        [],
        {},
        42,
        { id: 1 },
        { completed: 'false' },
        { title: ' ' },
        { title: 1 },
        { title: 'x'.repeat(81) },
        { title: 'OK', isAdmin: true },
      ].every((value) => invalid(patch(value))),
      'Require at least one allowed field. Reject invalid types, lengths and unknown keys.',
    ),
    check(
      valid(patch(Object.freeze({ completed: false })), { completed: false }) &&
        valid(patch(Object.freeze({ completed: true })), { completed: true }) &&
        valid(patch(createBody(' Revise ')), { title: 'Revise' }) &&
        valid(patch(Object.freeze({ title: ' Both ', completed: false })), {
          title: 'Both',
          completed: false,
        }),
      'Check field presence explicitly. Preserve false and trim supplied titles.',
    ),
    check(
      id('1') === 1 &&
        id('7') === 7 &&
        id('9007199254740991') === 9007199254740991 &&
        [
          '0',
          '-2',
          '1.5',
          'abc',
          '02',
          ' 2',
          '+2',
          '1e2',
          '9007199254740992',
          2,
          null,
        ].every((value) => id(value) === null),
      'Require string input, a positive safe integer, and an exact canonical decimal representation.',
    ),
    check(
      valid(filter(undefined), null) &&
        valid(filter('true'), true) &&
        valid(filter('false'), false) &&
        ['yes', '0', false, ['true', 'false'], null, ''].every((value) =>
          invalid(filter(value)),
        ),
      'Only undefined, "true" and "false" are valid. Do not use Boolean on query strings.',
    ),
  ]
}
