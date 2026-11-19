function weekTwelveCheck(lesson, tree) {
  const fixture = collectionFixture()
  fixture.weekThree = true
  fixture.fields.push('dueDate')
  const check = (ok, hint) => {
    observed.push(ok ? '' : hint)
    return Boolean(ok)
  }
  const dateParts = (value) => {
    if (typeof value !== 'string' || value.length !== 10 || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
    return value.split('-').map(Number)
  }
  const isCalendarDate = (value) => {
    const parts = dateParts(value)
    if (!parts || parts[0] === 0) return false
    const date = new Date(value + 'T00:00:00.000Z')
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  }
  if (lesson === '05') {
    fixture.helpers.dateParts = dateParts
    fixture.helpers.divisibleBy = (value, divisor) =>
      Number.isInteger(value) && [4, 100, 400].includes(divisor) && value % divisor === 0
    const run = learnerProgram(tree, {}, root, null, fixture)
    const valid = (...values) => values.every((v) => run('isValidDateOnly', [v]) === true)
    const invalid = (...values) => values.every((v) => run('isValidDateOnly', [v]) === false)
    return [
      check(invalid(null, undefined, 42, '2026-2-05', '2026-02-5', ' 2026-02-05', '2026-02-05\n'),
        'Check the exact date shape and reject non-string inputs.'),
      check(invalid('0000-01-01', '2026-00-03', '2026-13-01', '2026-04-31', '2026-02-30', '2026-10-00', '2026-01-32'),
        'Check year, month and the days allowed by that month.'),
      check(valid('2028-02-29', '2000-02-29') && invalid('2027-02-29', '1900-02-29', '2100-02-29'),
        'Apply both century exceptions to the divisible-by-four rule.'),
      check(valid('0001-01-01', '9999-12-31', '2026-02-28', '2026-04-30', '2026-07-31'),
        'Accept real calendar dates through the supported boundaries.'),
    ]
  }

  fixture.helpers.isCalendarDate = isCalendarDate
  fixture.helpers.addCalendarDays = (value, days) => {
    if (!isCalendarDate(value) || !Number.isInteger(days) || days < 0 || days > 366)
      throw Error('Pass a valid date and a small integer number of days.')
    const date = new Date(value + 'T00:00:00.000Z')
    date.setUTCDate(date.getUTCDate() + days)
    const result = date.toISOString().slice(0, 10)
    return isCalendarDate(result) ? result : '9999-12-31'
  }
  const run = learnerProgram(tree, {}, root, null, fixture)
  const task = (dueDate, completed = false) => Object.freeze({ dueDate, completed })
  const today = '2028-02-27'
  const classify = (value, date = today) => run('classifyDue', [value, date])
  return [
    check(classify(task('2028-04-31')) === 'invalid' &&
      classify(task('2028-02-27'), '2027-02-29') === 'invalid' &&
      classify(task('2028-02-27', 'no')) === 'invalid' && classify(null) === 'invalid',
      'Validate today, the task shape, and its due date before sorting.'),
    check(classify(task('2028-02-26', true)) === 'none' && classify(task(null)) === 'none',
      'Exclude completed and undated tasks.'),
    check(classify(task('2028-02-26')) === 'overdue' && classify(task(today)) === 'today',
      'Compare the valid padded strings, keeping today separate.'),
    check(classify(task('2028-03-05')) === 'soon' && classify(task('2028-03-06')) === 'later' &&
      classify(task('2027-01-05'), '2026-12-29') === 'soon' &&
      classify(task('2027-01-06'), '2026-12-29') === 'later',
      'Count day seven inclusively across leap-day and year boundaries.'),
  ]
}
