var Alo = require('./../alo.js')
var alo = new Alo()
var u = alo.util

var middlewares = {}

/**
 * A thunk middleware
 *
 * @memberof extras.middlewares
 */
middlewares.createThunk = function createThunk () {
  var middleware = alo.createMiddleware(function () {
    var args = u.values(arguments)
    var arg = args[1]
    var walk = function (args) {
      var arg = args[1]
      args.splice(1, 1)
      return u.Promise.resolve().then(function () {
        return arg.apply(null, args)
      }).then(function (arg) {
        if (u.isFunction(arg)) {
          args.splice(1, 0, arg)
          return walk(args)
        } else {
          args.splice(0, 1, arg)
          return args
        }
      })
    }

    if (u.isFunction(arg)) {
      return walk(args)
    } else {
      args.splice(0, 1)
      return args
    }
  })

  return middleware
}

module.exports = middlewares
