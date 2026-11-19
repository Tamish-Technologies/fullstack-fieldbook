import fixture from './responsive-fixture.html?raw'

const properties = new Set([
  'display',
  'flex-direction',
  'flex-wrap',
  'gap',
  'row-gap',
  'column-gap',
  'align-items',
  'justify-content',
  'grid-template-columns',
  'grid-auto-flow',
])

// Only serialize simple layout declarations into the stylesheet slots. Learner
// input never supplies markup, selectors, resource references or script.
function declarations(source: string) {
  if (source.length > 600) throw Error('Keep each rule under 600 characters.')
  return source
    .split(';')
    .map((line) => {
      if (!line.trim()) return ''
      const pair =
        /^\s*([a-z-]+)\s*:\s*([a-z0-9.%-]+(?:\s+[a-z0-9.%-]+){0,7})\s*$/i.exec(
          line,
        )
      if (!pair)
        throw Error(
          'Write one property and value per declaration, separated by semicolons.',
        )
      const property = pair[1]!.toLowerCase()
      const value = pair[2]!.trim()
      if (!properties.has(property))
        throw Error('Choose a property from the supported layout controls.')
      if (!CSS.supports(property, value))
        throw Error('Check the value for ' + property + '.')
      return property + ':' + value + ';'
    })
    .join('')
}

export function layoutFixture(wide: string, narrow: string) {
  return fixture
    .replace('/* wide declarations */', declarations(wide))
    .replace('/* narrow declarations */', declarations(narrow))
}

export const layoutPass = 'Layout fits at both text sizes (16px and 24px).'

export function layoutFeedback(data: unknown, width: number): string {
  if (!Array.isArray(data) || data.length !== 2)
    throw Error('Incomplete measurement.')
  for (const [index, sample] of data.entries()) {
    if (
      !sample ||
      sample.width !== width ||
      sample.fontSize !== [16, 24][index] ||
      typeof sample.fits !== 'boolean' ||
      typeof sample.row !== 'boolean' ||
      typeof sample.stack !== 'boolean'
    )
      throw Error('Unexpected measurement.')
    const size = sample.fontSize + 'px text'
    if (!sample.fits)
      return (
        size +
        ' · A control or its text does not fit. Adjust the space available to both controls.'
      )
    if (width === 768 && !sample.row)
      return size + ' · The input and button need to share a row.'
    if (width === 375 && !sample.stack)
      return size + ' · Put the button below the input and leave a gap.'
  }
  return layoutPass
}
