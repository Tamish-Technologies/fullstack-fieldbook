// Drive the allowed statements until an actual await yields. Ordinary statements
// run immediately, just as they do before the first await in an async function.
function asyncLabBody(fn, env, expr, tick) {
  function* value(node, scope) {
    if (!node) return undefined
    if (node.type === 'AwaitExpression') {
      const pending = yield* value(node.argument, scope)
      return yield pending
    }
    return expr(node, scope)
  }
  function* visit(node, scope) {
    tick()
    switch (node.type) {
      case 'BlockStatement': {
        const block = new Map(scope)
        for (const child of node.body) {
          const done = yield* visit(child, block)
          if (done) return done
        }
        break
      }
      case 'VariableDeclaration':
        for (const decl of node.declarations) {
          if (decl.id.type !== 'Identifier')
            throw Error('Use a named local variable.')
          scope.set(decl.id.name, {
            value: yield* value(decl.init, scope),
            writable: node.kind !== 'const',
          })
        }
        break
      case 'ExpressionStatement':
        yield* value(node.expression, scope)
        break
      case 'ReturnStatement':
        return { value: yield* value(node.argument, scope) }
      case 'ThrowStatement':
        throw yield* value(node.argument, scope)
      case 'IfStatement': {
        const branch = (yield* value(node.test, scope))
          ? node.consequent
          : node.alternate
        if (branch) return yield* visit(branch, scope)
        break
      }
      case 'TryStatement':
        try {
          return yield* visit(node.block, scope)
        } catch (error) {
          if (!node.handler) throw error
          const local = new Map(scope)
          if (node.handler.param)
            local.set(node.handler.param.name, {
              value: error,
              writable: false,
            })
          return yield* visit(node.handler.body, local)
        } finally {
          if (node.finalizer) {
            const done = yield* visit(node.finalizer, scope)
            if (done) return done
          }
        }
      case 'EmptyStatement':
        break
      default:
        throw Error(
          'This async lab supports local variables, calls, if, try/catch/finally and return. Put await on its own line or in a variable initializer.',
        )
    }
  }
  const steps =
    fn.body.type === 'BlockStatement'
      ? visit(fn.body, env)
      : value(fn.body, env)
  function advance(method, input) {
    try {
      const step = steps[method](input)
      if (step.done)
        return Promise.resolve(
          fn.body.type === 'BlockStatement' ? step.value?.value : step.value,
        )
      return Promise.resolve(step.value).then(
        (v) => advance('next', v),
        (e) => advance('throw', e),
      )
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return advance('next')
}
