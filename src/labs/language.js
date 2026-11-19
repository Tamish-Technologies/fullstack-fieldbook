// This interpreter runs inside the opaque exercise frame. Only the fixture
// capabilities below cross into the Week 1 language; syntax is never evaluated.
function learnerProgram(tree, globals, scope, onSelect, collection) {
  let budget = 3500
  let depth = 0
  const functions = new Map()
  const outer = new Map(
    Object.entries(globals).map(([k, value]) => [
      k,
      { value, writable: false },
    ]),
  )
  const missing = (name) => {
    throw Error(
      'Check "' +
        name +
        '". That name or operation is unavailable in this exercise.',
    )
  }
  const string = (value) => {
    if (typeof value !== 'string' || value.length > 2000)
      throw Error('Use a short text value here.')
    return value
  }
  const safeCalls = new WeakSet()
  function callable(fn, env) {
    const callback = (...args) => execute(fn, args, env)
    safeCalls.add(callback)
    return callback
  }
  function add(left, right) {
    return typeof left === 'number' && typeof right === 'number'
      ? left + right
      : string(string(left) + string(right))
  }
  function invoke(name, args) {
    const fn = functions.get(name)
    if (!fn) {
      if (collection && Object.hasOwn(collection.helpers, name))
        return collection.helpers[name](...args)
      if (name === 'Boolean') return Boolean(args[0])
      if (name === 'addTask' && globals.addTask)
        return globals.addTask(string(args[0]))
      return missing(name)
    }
    return execute(fn, args, outer)
  }
  function execute(fn, args, parentEnv) {
    if (++depth > 16)
      throw Error(
        'Call depth exceeded. Check for a function that calls itself.',
      )
    try {
      const env = new Map(parentEnv)
      fn.params.forEach((p, i) => {
        if (
          collection?.weekFour &&
          p.type === 'AssignmentPattern' &&
          p.left.type === 'Identifier'
        ) {
          env.set(p.left.name, {
            value: args[i] === undefined ? expr(p.right, env) : args[i],
            writable: true,
          })
        } else {
          if (p.type !== 'Identifier') missing('parameter')
          env.set(p.name, { value: args[i], writable: true })
        }
      })
      if (collection?.weekFour && fn.async)
        return asyncLabBody(fn, env, expr, tick)
      if (fn.body.type !== 'BlockStatement') return expr(fn.body, env)
      return statement(fn.body, env)?.value
    } finally {
      depth--
    }
  }
  function tick() {
    if (--budget < 0)
      throw Error('Step limit reached. Simplify this function and try again.')
  }
  function property(node) {
    if (node.computed || node.property.type !== 'Identifier')
      missing('computed property')
    return node.property.name
  }
  function expr(n, env) {
    tick()
    switch (n.type) {
      case 'NewExpression':
        if (
          collection?.weekFour &&
          n.callee.name === 'Error' &&
          n.arguments.length === 1
        )
          return new Error(String(expr(n.arguments[0], env)).slice(0, 200))
        return missing('constructor')
      case 'AwaitExpression':
        throw Error(
          'Put await in an async function, in a variable initializer, a return or a separate statement.',
        )
      case 'Literal':
        if (
          n.value !== null &&
          !['string', 'number', 'boolean'].includes(typeof n.value)
        )
          return missing('literal')
        return n.value
      case 'ArrayExpression':
        if (!collection) return missing('array')
        return collection.list(
          n.elements.flatMap((el) =>
            el?.type === 'SpreadElement'
              ? collection.list(expr(el.argument, env))
              : [expr(el, env)],
          ),
        )
      case 'ObjectExpression': {
        if (!collection) return missing('record')
        const record = Object.create(null)
        for (const p of n.properties) {
          if (p.type === 'SpreadElement')
            Object.assign(record, collection.record(expr(p.argument, env)))
          else if (
            p.type === 'Property' &&
            !p.computed &&
            (!p.method || collection.storeMethods?.includes(p.key.name)) &&
            p.kind === 'init' &&
            collection.fields.includes(p.key.name)
          )
            record[p.key.name] = expr(p.value, env)
          else return missing('task property')
        }
        return collection.record(record)
      }
      case 'ArrowFunctionExpression':
      case 'FunctionExpression':
        if (collection) return callable(n, env)
        return missing('callback')
      case 'Identifier':
        if (collection && functions.has(n.name))
          return callable(functions.get(n.name), outer)
        if (collection?.weekFour && Object.hasOwn(collection.helpers, n.name)) {
          const helper = collection.helpers[n.name]
          safeCalls.add(helper)
          return helper
        }
        if (collection && n.name === 'undefined') return undefined
        if (collection && n.name === 'isTask') return collection.helpers.isTask
        if (!env.has(n.name)) return missing(n.name)
        return env.get(n.name).value
      case 'MemberExpression': {
        const obj = expr(n.object, env),
          key = collection && n.computed ? expr(n.property, env) : property(n)
        if (collection && Array.isArray(obj)) {
          if (key === 'length') return obj.length
          if (Number.isSafeInteger(key) && key >= 0) return obj[key]
        }
        if (
          collection &&
          obj &&
          typeof obj === 'object' &&
          collection.fields.includes(key)
        )
          return Object.hasOwn(obj, key) ? obj[key] : undefined
        if (collection?.weekFour && obj instanceof Error && key === 'message')
          return obj.message
        if (key === 'length' && typeof obj === 'string') return obj.length
        if (key === 'value' && obj instanceof HTMLInputElement) return obj.value
        if (key === 'textContent' && obj instanceof HTMLElement)
          return obj.textContent
        return missing(key)
      }
      case 'CallExpression': {
        const args = n.arguments.map((a) => expr(a, env))
        if (n.callee.type === 'Identifier') {
          const fn = env.get(n.callee.name)?.value
          if (collection && (safeCalls.has(fn) || fn === collection.visit)) {
            if (typeof fn === 'function') return fn(...args)
          }
          return invoke(n.callee.name, args)
        }
        if (collection && n.callee.object?.type === 'Identifier') {
          const name = n.callee.object.name + '.' + property(n.callee)
          if (Object.hasOwn(collection.statics, name))
            return collection.statics[name](...args)
        }
        if (n.callee.type !== 'MemberExpression') return missing('call')
        const obj = expr(n.callee.object, env),
          method = property(n.callee)
        if (
          collection &&
          obj === collection.storage &&
          ['getItem', 'setItem'].includes(method)
        )
          return obj[method](...args)
        if (collection?.weekFour) {
          if (
            obj instanceof Promise &&
            ['then', 'catch', 'finally'].includes(method) &&
            args.length === 1 &&
            safeCalls.has(args[0])
          )
            return obj[method](args[0])
          if (method === 'json' && collection.responses.has(obj))
            return obj.json()
        }
        if (collection && Array.isArray(obj)) {
          if (collection.weekThree && method === 'sort') {
            collection.list(obj)
            if (!safeCalls.has(args[0])) return missing('numeric comparator')
            return obj.sort(args[0])
          }
          if (method === 'slice') return obj.slice(...args)
          if (method === 'push') {
            collection.list([...obj, ...args])
            return obj.push(...args)
          }
          if (
            [
              'map',
              'filter',
              'reduce',
              'find',
              'forEach',
              'some',
              'every',
            ].includes(method)
          ) {
            const fn = args[0]
            if (
              typeof fn !== 'function' ||
              !(
                safeCalls.has(fn) ||
                fn === collection.helpers.isTask ||
                fn === collection.visit
              )
            )
              return missing('callback')
            const result = obj[method](...args)
            return Array.isArray(result) ? collection.list(result) : result
          }
        }
        if (collection?.weekThree && typeof obj === 'string') {
          if (method === 'toLowerCase') return string(obj.toLowerCase())
          if (method === 'includes') return obj.includes(string(args[0]))
        }
        if (method === 'trim' && typeof obj === 'string') return obj.trim()
        if (collection) return missing(method)
        if (
          ['querySelector', 'getElementById'].includes(method) &&
          globals.document &&
          obj === globals.document
        ) {
          const selector = string(args[0])
          if (
            !/^(?:[a-z][\w-]{0,40})?(?:[#.][a-z][\w-]{0,40})?$/i.test(
              selector,
            ) ||
            !selector
          )
            return missing('selector')
          const target = scope.querySelector(
            method === 'getElementById' ? '#' + CSS.escape(selector) : selector,
          )
          onSelect?.(target)
          return target
        }
        if (
          method === 'createElement' &&
          obj === globals.document &&
          ['li', 'span'].includes(args[0])
        )
          return document.createElement(args[0])
        if (
          ['append', 'appendChild'].includes(method) &&
          obj instanceof HTMLElement &&
          ['UL', 'LI', 'SPAN'].includes(obj.tagName) &&
          args.length === 1
        ) {
          if (
            args[0] instanceof HTMLElement &&
            ['LI', 'SPAN'].includes(args[0].tagName)
          )
            return obj.appendChild(args[0])
          if (method === 'append') {
            obj.append(string(args[0]))
            return
          }
        }
        if (
          method === 'focus' &&
          obj === globals.input &&
          obj instanceof HTMLInputElement
        ) {
          obj.focus()
          return
        }
        if (method === 'preventDefault' && obj instanceof Event) {
          obj.preventDefault()
          return
        }
        return missing(method)
      }
      case 'UpdateExpression': {
        if (!collection || n.argument.type !== 'Identifier')
          return missing(n.operator)
        const cell = env.get(n.argument.name)
        if (!cell?.writable || typeof cell.value !== 'number')
          throw Error('Use a numeric let variable for a counter.')
        const before = cell.value
        cell.value += n.operator === '++' ? 1 : -1
        return n.prefix ? cell.value : before
      }
      case 'AssignmentExpression': {
        const compound =
          collection && n.operator === '+=' && n.left.type === 'Identifier'
        if (n.operator !== '=' && !compound) return missing(n.operator)
        if (n.left.type === 'Identifier' && env.has(n.left.name)) {
          const cell = env.get(n.left.name)
          if (!cell.writable)
            throw Error('Cannot reassign ' + n.left.name + '.')
          const before = cell.value
          const right = expr(n.right, env)
          cell.value = compound ? add(before, right) : right
          return cell.value
        }
        if (n.left.type !== 'MemberExpression') return missing('assignment')
        const value = expr(n.right, env)
        const obj = expr(n.left.object, env),
          key = property(n.left)
        if (key === 'value' && obj instanceof HTMLInputElement)
          obj.value = string(value)
        else if (key === 'textContent' && obj instanceof HTMLElement)
          obj.textContent = string(value)
        else return missing(key)
        return value
      }
      case 'UnaryExpression':
        if (collection && n.operator === 'typeof')
          return typeof expr(n.argument, env)
        if (n.operator === '!') return !expr(n.argument, env)
        return missing(n.operator)
      case 'ConditionalExpression':
        return expr(expr(n.test, env) ? n.consequent : n.alternate, env)
      case 'LogicalExpression': {
        const left = expr(n.left, env)
        if (n.operator === '&&') return left && expr(n.right, env)
        if (n.operator === '||') return left || expr(n.right, env)
        return missing(n.operator)
      }
      case 'BinaryExpression': {
        const a = expr(n.left, env),
          b = expr(n.right, env)
        switch (n.operator) {
          case '===':
            return a === b
          case '!==':
            return a !== b
          case '>':
            return a > b
          case '>=':
            return a >= b
          case '<':
            return a < b
          case '<=':
            return a <= b
          case '-':
            if (
              collection?.weekThree &&
              typeof a === 'number' &&
              typeof b === 'number'
            )
              return a - b
            return missing('numeric subtraction')
          case '+':
            if (
              collection?.weekFour &&
              [a, b].every(
                (v) => typeof v === 'number' || typeof v === 'string',
              ) &&
              typeof a !== typeof b
            )
              return string(String(a) + String(b))
            return add(a, b)
          default:
            return missing(n.operator)
        }
      }
      default:
        return missing(n.type)
    }
  }
  function statement(n, env) {
    tick()
    switch (n.type) {
      case 'BlockStatement':
        env = new Map(env)
        for (const child of n.body) {
          const result = statement(child, env)
          if (result) return result
        }
        break
      case 'VariableDeclaration':
        for (const decl of n.declarations) {
          if (decl.id.type !== 'Identifier') return missing('declaration')
          env.set(decl.id.name, {
            value: decl.init ? expr(decl.init, env) : undefined,
            writable: n.kind !== 'const',
          })
        }
        break
      case 'TryStatement':
        if (!collection || !n.handler || n.finalizer)
          return missing('try/catch')
        try {
          return statement(n.block, env)
        } catch (error) {
          if (
            budget < 0 ||
            !(error instanceof SyntaxError || error instanceof StorageFailure)
          )
            throw error
          return statement(n.handler.body, env)
        }
      case 'BreakStatement':
      case 'ContinueStatement':
        if (collection?.weekFour && !n.label) return { flow: n.type }
        return missing(n.type)
      case 'ThrowStatement':
        if (collection?.weekFour) throw expr(n.argument, env)
        return missing('throw')
      case 'ForOfStatement': {
        if (!collection || n.left.type !== 'VariableDeclaration')
          return missing('for of')
        const values = expr(n.right, env)
        if (collection.weekThree) {
          // Restoration must let the learner inspect and discard malformed rows.
          if (!Array.isArray(values) || values.length > 64)
            throw Error('Use a list of at most 64 entries.')
        } else collection.list(values)
        for (const value of values) {
          const local = new Map(env)
          local.set(n.left.declarations[0].id.name, {
            value,
            writable: n.left.kind !== 'const',
          })
          const result = statement(n.body, local)
          if (result?.flow === 'ContinueStatement') continue
          if (result?.flow === 'BreakStatement') break
          if (result) return result
        }
        break
      }
      case 'IfStatement':
        if (expr(n.test, env)) return statement(n.consequent, env)
        if (n.alternate) return statement(n.alternate, env)
        break
      case 'ReturnStatement':
        return { value: n.argument ? expr(n.argument, env) : undefined }
      case 'ExpressionStatement':
        expr(n.expression, env)
        break
      case 'EmptyStatement':
        break
      default:
        return missing(n.type)
    }
  }
  for (const node of tree.body) {
    if (node.type === 'FunctionDeclaration') functions.set(node.id.name, node)
    else if (node.type === 'VariableDeclaration') {
      for (const decl of node.declarations) {
        if (decl.id.type !== 'Identifier')
          return missing('top-level declaration')
        if (
          ['ArrowFunctionExpression', 'FunctionExpression'].includes(
            decl.init?.type,
          )
        )
          functions.set(decl.id.name, decl.init)
        else
          outer.set(decl.id.name, {
            value: decl.init ? expr(decl.init, outer) : undefined,
            writable: node.kind !== 'const',
          })
      }
    } else if (node.type !== 'EmptyStatement')
      return missing('top-level statement')
  }
  return invoke
}
