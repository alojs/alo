var Alo = require('./../alo.js')
var Customizer = require('./../util/customizer.js')

var alo = new Alo()
var u = alo.util

var customizer = new Customizer(true)
var middlewareRelation = u.createObjectRelation('middleware', 'parentMiddleware', alo.isMiddleware)
var parentMiddlewareRelation = u.createObjectRelation('parentMiddleware', 'middleware', alo.isMiddleware)
var storeRelation = u.createObjectRelation('middleware', 'store', alo.isStore)

// Add a better constructor
var Middleware = function Middleware () {
  customizer.constructParent(this)
  middlewareRelation.constructParent(this)
  parentMiddlewareRelation.constructParent(this)
  storeRelation.constructParent(this)
  customizer.constructParent(this)
}

customizer.registerParentPrototype(Middleware.prototype)
middlewareRelation.registerParentPrototype(Middleware.prototype)
parentMiddlewareRelation.registerParentPrototype(Middleware.prototype)
storeRelation.registerParentPrototype(Middleware.prototype)

/*
 * The middleware handling is done in a recursive manner
 */
Middleware.prototype.meddleRecursive = function meddleRecursive (middlewares, args) {
  var self = this
  args = u.values(args)
  // First argument is always the store
  var store = args[0]

  if (!u.isArray(middlewares)) {
    throw new Error('Argument given should be an array')
  } else if (middlewares.length === 0) {
    // store needs to be removed at the end of the recursion
    return args.slice(1)
  } else {
    return u.Promise.resolve().then(function () {
      if (alo.isMiddleware(middlewares[0])) {
        return middlewares[0].meddle(args)
      } else {
        return args.slice(1)
      }
    }).then(function (resultArgs) {
      resultArgs = u.values(resultArgs)
      if (resultArgs[0] === undefined) {
        resultArgs = args
      } else {
        resultArgs.unshift(store)
      }
      args = resultArgs
      middlewares = middlewares.slice(1)
      return self.meddleRecursive(middlewares, resultArgs)
    })
  }
}

Middleware.prototype.meddle = function meddle (args) {
  var self = this
  args = u.values(args)
  var store = args[0]
  args = args.slice(1)

  var argsToArray = function (resultArgs) {
    if (resultArgs === undefined) {
      resultArgs = args
    } else if (!u.isArray(resultArgs)) {
      resultArgs = [resultArgs]
    }
    args = u.cloneDeep(resultArgs)

    return resultArgs
  }

  return u.Promise.resolve().then(function () {
    var newArgs = u.cloneDeep(args)
    newArgs.unshift(store)
    newArgs.unshift('prepare')
    return self.callCustomizer.apply(self, newArgs)
  }).then(function (resultArgs) {
    resultArgs = argsToArray(resultArgs)
    resultArgs.unshift(store)
    return self.meddleRecursive(self.getMiddleware(false), resultArgs)
  }).then(function (resultArgs) {
    resultArgs = argsToArray(resultArgs)
    resultArgs.unshift(store)
    resultArgs.unshift('finalize')
    return self.callCustomizer.apply(self, resultArgs)
  }).then(function (resultArgs) {
    resultArgs = argsToArray(resultArgs)
    return resultArgs
  })
}
module.exports = Middleware
