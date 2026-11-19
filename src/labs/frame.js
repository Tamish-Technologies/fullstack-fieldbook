// Fixed, trusted behavior checks. Learner markup is parsed in an inert
// document. Only the form vocabulary below is copied into the live fixture.
const root = document.querySelector('main')
// The browser still rejects invalid submissions. Show lab feedback in the
// exercise instead of opening a native validation popup inside the iframe.
root.addEventListener('invalid', (event) => event.preventDefault(), true)
const observed = []
function formTree(from, into, depth = 0) {
  if (depth > 25) throw Error('Simplify the nesting in the form.')
  for (const child of from.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      into.append(child.textContent)
      continue
    }
    if (child.nodeType !== Node.ELEMENT_NODE) continue
    if (
      ![
        'MAIN',
        'DIV',
        'FORM',
        'LABEL',
        'INPUT',
        'BUTTON',
        'SECTION',
        'H1',
        'H2',
        'H3',
        'UL',
        'LI',
        'P',
        'SPAN',
      ].includes(child.tagName)
    )
      throw Error(
        'Use form, label, input, button, section, heading and list elements in this fixture.',
      )
    const el = document.createElement(child.localName)
    for (const attr of child.attributes) {
      if (
        ![
          'id',
          'type',
          'for',
          'name',
          'placeholder',
          'required',
          'disabled',
          'hidden',
          'class',
          'aria-label',
        ].includes(attr.name)
      )
        throw Error(
          'Use semantic HTML in this lab. Remove the ' +
            attr.name +
            ' attribute.',
        )
      if (
        attr.name === 'type' &&
        !['text', 'submit', 'button'].includes(attr.value)
      )
        throw Error('Use a text field and standard buttons.')
      el.setAttribute(attr.name, attr.value)
    }
    into.append(el)
    formTree(child, el, depth + 1)
  }
}
// The source page is inert. Inspect text nodes so hidden descendants do not
// supply the heading's visible name or appear in the stripped-down preview.
function headingText(heading) {
  if (!heading) return ''
  const walker = heading.ownerDocument.createTreeWalker(
    heading,
    NodeFilter.SHOW_TEXT,
  )
  let text = ''
  while (walker.nextNode()) {
    let el = walker.currentNode.parentElement
    while (el) {
      const style = el.style
      if (
        el.hidden ||
        el.matches('script, style, template, [aria-hidden="true" i]') ||
        style?.display === 'none' ||
        ['hidden', 'collapse'].includes(style?.visibility) ||
        style?.contentVisibility === 'hidden' ||
        (style?.opacity && Number(style.opacity) === 0)
      )
        break
      el = el.parentElement
    }
    if (!el) text += walker.currentNode.textContent
  }
  return text.trim()
}
function markup(lesson, source) {
  const doc = new DOMParser().parseFromString(source, 'text/html')
  if (lesson === '02') {
    const main = doc.querySelector('main'),
      heading = main?.querySelector('h1')
    const pathMatches = (path, name) => {
      try {
        return (
          new URL(path, 'https://fixture.invalid/study/index.html').href ===
            'https://fixture.invalid/study/' + name &&
          !/^(?:[a-z]+:|\/\/)/i.test(path)
        )
      } catch {
        return false
      }
    }
    const has = (selector, test) =>
      Array.from(doc.querySelectorAll(selector)).some(test)
    const visibleHeading = headingText(heading)
    root.textContent = visibleHeading || 'Your heading will appear here.'
    return [
      doc.doctype?.name === 'html' && doc.compatMode === 'CSS1Compat',
      doc.documentElement.lang.toLowerCase() === 'en' && !!doc.title.trim(),
      doc.querySelectorAll('h1').length === 1 && !!visibleHeading,
      has(
        'meta[charset]',
        (m) => m.getAttribute('charset').toLowerCase() === 'utf-8',
      ) &&
        has('meta[name="viewport" i]', (m) =>
          /(?:^|,)\s*width\s*=\s*device-width\s*(?:,|$)/i.test(m.content),
        ),
      has('link[rel~="stylesheet" i][href]', (l) =>
        pathMatches(l.getAttribute('href'), 'styles.css'),
      ) &&
        has('script[defer][src]', (s) =>
          pathMatches(s.getAttribute('src'), 'app.js'),
        ),
    ]
  }
  formTree(doc.body, root)
  const form = root.querySelector('form'),
    input = form?.querySelector('input:not([type]),input[type="text"]')
  const label = input?.labels?.[0]
  const buttons = Array.from(form?.querySelectorAll('button') || [])
  const name = (button) =>
    (button.getAttribute('aria-label') || button.textContent).trim()
  const namedAdd = buttons.find((button) => /\badd\b/i.test(name(button)))
  const submitters = buttons.filter(
    (button) => button.type === 'submit' && name(button),
  )
  const add = namedAdd ?? (submitters.length === 1 ? submitters[0] : undefined)
  const visible = (el) => !!el?.getClientRects().length
  input?.focus()
  const focused =
    !!input &&
    visible(input) &&
    visible(label) &&
    !!label.textContent.trim() &&
    label.control === input &&
    document.activeElement === input
  let submissions = 0
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    submissions++
  })
  if (input) input.value = 'Read'
  add?.click()
  const valid = submissions === 1
  if (input) input.value = ''
  const beforeEmpty = submissions
  form?.requestSubmit()
  return [
    focused,
    !!input?.id &&
      label?.htmlFor === input.id &&
      Array.from(root.querySelectorAll('[id]')).filter(
        (el) => el.id === input.id,
      ).length === 1,
    valid && visible(add),
    submissions === beforeEmpty &&
      !!input?.willValidate &&
      input.validity.valueMissing,
    Array.from(root.querySelectorAll('section')).some(
      (s) =>
        !!s.querySelector('h1,h2,h3')?.textContent.trim() &&
        s.querySelector('ul')?.children.length === 0,
    ),
    Array.from(root.querySelectorAll('button')).every(
      (b) => !/delete/i.test(b.textContent) || b.type === 'button',
    ),
  ]
}
function card(source) {
  // Parse CSS as data. Rebuild only simple box-model declarations on the fixed card.
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(source)
  const box = document.createElement('section'),
    button = document.createElement('button')
  box.className = 'app'
  button.textContent = 'Add task'
  box.append(button)
  root.append(box)
  const allowed =
    /^(?:box-sizing|(?:min-|max-)?width|(?:margin|padding|border)(?:-(?:inline|inline-start|inline-end|block|top|right|bottom|left|width|style|color)(?:-(?:width|style|color))?)?)$/
  for (const rule of sheet.cssRules) {
    if (rule.selectorText !== '.app')
      throw Error('Use the .app class selector for the supplied card.')
    for (const name of rule.style) {
      const value = rule.style.getPropertyValue(name)
      if (name.startsWith('border-image-')) continue // The border shorthand resets these longhands.
      const color =
        name.endsWith('-color') && /^rgba?\([0-9., %]+\)$/.test(value)
      if (!allowed.test(name) || !(color || /^[\w\s.#%+-]+$/.test(value)))
        throw Error('Use simple box-model properties. Check ' + name + '.')
      box.style.setProperty(name, value)
    }
  }
  const r = box.getBoundingClientRect(),
    outer = root.getBoundingClientRect(),
    style = getComputedStyle(box)
  const px = (s) => parseFloat(s) || 0
  button.focus()
  const focus = getComputedStyle(button)
  observed.push(
    'The card has ' + box.style.length + ' applied declarations.',
    'Measured card ' +
      Math.round(r.width) +
      'px. Left and right space: ' +
      Math.round(r.left - outer.left) +
      'px / ' +
      Math.round(outer.right - r.right) +
      'px.',
    'Measured box sizing: ' + style.boxSizing + '.',
    'Measured padding ' +
      style.paddingLeft +
      ', top margin ' +
      style.marginTop +
      '.',
    'Focus outline: ' + focus.outlineStyle + '.',
  )
  return [
    box.style.length > 0,
    r.width >= 90 &&
      r.width < outer.width - 8 &&
      Math.abs(r.left - outer.left - (outer.right - r.right)) <= 2,
    !!(box.style.width || box.style.maxWidth) &&
      style.boxSizing === 'border-box' &&
      px(style.paddingLeft) > 0 &&
      px(style.borderLeftWidth) > 0 &&
      Math.abs(px(style.width) - r.width) < 1,
    button.getBoundingClientRect().left > r.left + px(style.borderLeftWidth) &&
      (px(style.marginTop) > 0 || px(style.marginBottom) > 0),
    document.activeElement === button &&
      focus.outlineStyle !== 'none' &&
      px(focus.outlineWidth) > 0,
  ]
}
function javascript(lesson, tree) {
  if (lesson === '07') {
    const call = learnerProgram(tree, {}, root)
    return [
      ['  Read MDN  ', 'Read MDN'],
      ['', ''],
      [' \t ', ''],
      ['Review', 'Review'],
      ['Study', true],
      ['   ', false],
      ['', false],
      ['  Finish  ', true],
    ].map(([input, expected], i) => {
      const name = i < 4 ? 'cleanTitle' : 'isValidTitle'
      const actual = call(name, [input])
      const display = (value) =>
        ['string', 'boolean', 'number'].includes(typeof value)
          ? JSON.stringify(value).slice(0, 60)
          : typeof value
      observed.push(
        name +
          '(' +
          JSON.stringify(input) +
          ') returned ' +
          display(actual) +
          '. Expected ' +
          display(expected) +
          '.',
      )
      return actual === expected
    })
  }
  const list = document.createElement('ul')
  list.id = 'queue'
  if (lesson === '08') {
    root.append(list)
    let selected = false
    const call = learnerProgram(tree, { document: {} }, root, (target) => {
      if (target === list) selected = true
    })
    const titles = ['One', 'Two', '<b>Read</b>', 'A & "B"']
    for (const title of titles) call('addTask', [title])
    const rows = Array.from(list.children)
    return [
      selected,
      rows.every((el) => el.tagName === 'LI') && !!rows.length,
      rows.length === 4 &&
        rows[0].textContent === 'One' &&
        rows[1].textContent === 'Two',
      rows[2]?.textContent === titles[2] && !rows[2].querySelector('b'),
      rows[3]?.textContent === titles[3],
    ]
  }
  root.innerHTML =
    '<form><label>Task title <input required></label><button>Add</button></form><p role="status"></p>'
  root.append(list)
  const form = root.querySelector('form'),
    input = form.querySelector('input'),
    button = form.querySelector('button'),
    message = root.querySelector('p')
  const call = learnerProgram(
    tree,
    {
      input,
      message,
      addTask(title) {
        const row = document.createElement('li')
        row.textContent = title
        list.append(row)
      },
    },
    root,
  )
  let canceled = false,
    error
  form.addEventListener('submit', (e) => {
    try {
      call('handleSubmit', [e])
      canceled = e.defaultPrevented
    } catch (ex) {
      error = ex
      message.textContent = ex.message
    } finally {
      e.preventDefault()
    }
  })
  function submit(value, click) {
    input.value = value
    button.focus()
    canceled = false
    if (click) button.click()
    else form.requestSubmit(button)
    if (error) throw error
    return canceled
  }
  const first = submit('  Read CSS  ', true) && list.children.length === 1
  const clean = list.firstChild?.textContent === 'Read CSS'
  const second =
    submit('Study', false) &&
    list.children.length === 2 &&
    list.lastChild?.textContent === 'Study'
  const refocused = input.value === '' && document.activeElement === input
  const two = list.children.length === 2
  message.textContent = ''
  submit('', true)
  const emptyRejected = list.children.length === 2
  const spacesCanceled = submit('   ', true)
  const invalid =
    emptyRejected &&
    spacesCanceled &&
    list.children.length === 2 &&
    !!message.textContent.trim()
  if (!spacesCanceled)
    observed.push(
      '',
      '',
      '',
      'Cancel the submit event before returning from the whitespace-only branch.',
    )
  list.replaceChildren()
  input.value = ''
  message.textContent = ''
  return [first, second, clean, invalid, two, refocused]
}
addEventListener(
  'message',
  (e) => {
    if (e.source !== parent || e.ports.length !== 1) return
    const port = e.ports[0]
    const { lesson, source, tree } = e.data
    async function run() {
      port.postMessage({ running: true })
      try {
        const results = lesson.startsWith('w12-')
          ? weekTwelveCheck(lesson.slice(4), tree)
          : lesson.startsWith('w11-')
            ? weekElevenCheck(lesson.slice(4), tree)
            : lesson.startsWith('w10-')
              ? await weekTenCheck(lesson.slice(4), tree)
              : lesson.startsWith('w9-')
                ? await weekNineCheck(lesson.slice(3), tree)
                : lesson.startsWith('w8-')
                  ? await weekEightCheck(lesson.slice(3), tree)
                  : lesson.startsWith('w7-')
                    ? weekSevenCheck(lesson.slice(3), tree)
                    : lesson.startsWith('w6-')
                      ? await weekSixCheck(lesson.slice(3), tree)
                      : lesson.startsWith('w5-')
                        ? weekFiveCheck(lesson.slice(3), tree)
                        : lesson.startsWith('w4-')
                          ? await weekFourCheck(lesson.slice(3), tree)
                          : lesson.startsWith('w3-')
                            ? weekThreeCheck(lesson.slice(3), tree, e.data.concept)
                            : lesson.startsWith('w2-')
                              ? weekTwoCheck(lesson.slice(3), tree, e.data.concept)
                              : ['02', '03'].includes(lesson)
                                ? markup(lesson, source)
                                : lesson === '04'
                                  ? card(source)
                                  : javascript(lesson, tree)
        port.postMessage({ results: results.map(Boolean), observed })
      } catch (err) {
        port.postMessage({ error: String(err?.message || err).slice(0, 180) })
      } finally {
        port.close()
      }
    }
    if (['03', '04', '09', 'w2-07', 'w3-06'].includes(lesson)) {
      const start = document.createElement('button')
      start.textContent = 'Test keyboard focus and run checks'
      start.onclick = () => {
        start.remove()
        run()
      }
      root.append(start)
      port.postMessage({ awaiting: true })
    } else run()
  },
  { once: true },
)
