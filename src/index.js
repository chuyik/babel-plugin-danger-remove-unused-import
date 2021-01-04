/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/29
 * @description:
 */
const match = require('./utils/matchRule')

module.exports = function(babel) {
  const t = babel.types
  return {
    visitor: {
      Program: {
        exit: (path, { opts } = {}) => {
          const UnRefBindings = new Map()
          for (const [name, binding] of Object.entries(path.scope.bindings)) {
            if (!binding.path.parentPath || binding.kind !== 'module') continue

            const source = binding.path.parentPath.get('source')
            const importName = source.node.value
            if (
              !t.isStringLiteral(source) ||
              (opts.ignore && match(opts.ignore, importName))
            )
              continue

            const key = `${importName}(${source.node.loc &&
              source.node.loc.start.line})`

            if (!UnRefBindings.has(key)) {
              UnRefBindings.set(key, binding)
            }

            if (binding.referenced) {
              UnRefBindings.set(key, null)
            } else {
              const nodeType = binding.path.node.type
              if (nodeType === 'ImportSpecifier') {
                binding.path.remove()
              } else if (nodeType === 'ImportDefaultSpecifier') {
                binding.path.remove()
              } else if (nodeType === 'ImportNamespaceSpecifier') {
                binding.path.remove()
              } else if (binding.path.parentPath) {
                binding.path.parentPath.remove()
              }
            }
          }

          UnRefBindings.forEach((binding, key) => {
            if (binding && binding.path.parentPath) {
              binding.path.parentPath.remove()
            }
          })
        }
      }
    }
  }
}
