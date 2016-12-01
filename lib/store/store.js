var u = require('./../util/util.js')
var ObjectRelation = require('./../object-relation/object-relation.js')

var handlerRelation = new ObjectRelation('store', 'handler', u.isHandler)
var subscriptionRelation = new ObjectRelation('store', 'subscription', u.isSubscription)
var middlewareRelation = new ObjectRelation('store', 'middleware', u.isMiddleware)

/**
 * The core of Alo. A store is the central place for application state
 *
 * @class
 *
 * @param {Object} state - Optional object to set as a start state
 */
var Store = function Store (state, id) {
  if (state === undefined || state === null) {
    state = {}
  }

  /**
   * @private
   */

  /*
   * TODO: Document members
   */

  this._id = null
  if (u.isString(id)) {
    id = id.trim()
    if (id !== '') {
      this._id = id
    }
  }

  /**
   * Stream
   */
  this._stream = u.createStream(state)

  /**
   * Handlers
   */
  this._handlerRelations = null

  /**
   * Middlewares
   */
  this._middlewareRelations = null

  /**
   * Subscriptions
   */
  this._subscriptionRelations = null

  this._computedProperty = {}

  handlerRelation.constructParent(this)
  middlewareRelation.constructParent(this)
  subscriptionRelation.constructParent(this)
}

/*
 * Setup relations
 */

/**
 * Returns the id of the store
 *
 * @function
 */
Store.prototype.getId = null

/**
 * Returns the registered handlers
 *
 * @function
 * @return {array} Array of handlers
 */
Store.prototype.getHandler = null

/**
 * Adds a handler object to the registered handlers
 *
 * @function
 * @param {Handler} handler
 *
 * @return {Store} this
 */
Store.prototype.addHandler = null

/**
 * Removes a handler from the currently registered handlers
 *
 * @function
 * @param {int|Handler} handler id or Handler
 *
 * @return {Store} this
 */
Store.prototype.removeHandler = null

/**
 * Returns the registered middlewares
 *
 * @function
 * @param {string} [id] The id is optional
 *
 * @return {array|Middleware|false} Array of middlewares, middleware with id, or false if middleware with id wasn't found
 */
Store.prototype.getMiddleware = null

/**
 * Registers one or multible middlewares on this store
 *
 * @function
 * @return {Store} this
 */
Store.prototype.addMiddleware = null

/**
 * Removes a middleware
 *
 * @function
 * @param {id|Middleware} id of middleware or middleware
 *
 * @return {Store} this
 */
Store.prototype.removeMiddleware

/**
 * Get a registered subscription by id
 *
 * @function
 */
Store.prototype.getSubscription = null

/**
 * Registers a subscription
 *
 * @function
 */
Store.prototype.addSubscription = null

/**
 * Removes a subscription
 *
 * @function
 */
Store.prototype.removeSubscription = null

handlerRelation.registerParentPrototype(Store.prototype)
middlewareRelation.registerParentPrototype(Store.prototype)
subscriptionRelation.registerParentPrototype(Store.prototype)

Store.prototype.addComputedProperty = u.createPolymorphic()
var addComputedProperty = Store.prototype.addComputedProperty
addComputedProperty.signature('string, array b=[], function', function (name, dependencies, func) {
  if (name === '') {
    throw new Error('Name of computed property should not be empty')
  } else {
    this._computedProperty[name] = {
      dependencies: dependencies,
      propertyFunction: func
    }
  }

  return this
})
addComputedProperty.signature('object', function (properties) {
  var self = this

  u.forEach(properties, function (func, name) {
    self.addComputedProperty(name, func)
  })

  return this
})

// TODO: Implement removeComputedProperty

/**
 * Registers one or multible reducers
 *
 * @function
 *
 * @param {array|...function} Array or variadic call of one or multible reducer functions
 *
 * @return {Handler}
 * @see Handler
 */
Store.prototype.addReducer = u.createPolymorphic()
var addReducer = Store.prototype.addReducer
addReducer.signature('array', function (reducers) {
  var handler = u.createHandler(reducers)
  this.addHandler(handler)

  return handler
})
addReducer.signature('function', function (func) {
  return this.addReducer([func])
})
// TODO: Change to better signature
addReducer.signature('...', addReducer)

Store.prototype._getStateByNamespace = function _getStateByNamespace (namespace, state) {
  var self = this
  if (typeof (state) === 'undefined') {
    state = self.protected.state
  }
  namespace = self._getPreparedNamespace(namespace)
  u.forEach(namespace, function (currentNamespace) {
    if (state[currentNamespace] == null) {
      state[currentNamespace] = {}
    }
    state = state[currentNamespace]
  })
  return state
}

Store.prototype._getPreparedNamespace = function _getPreparedNamespace (namespace) {
  switch (typeof (namespace)) {
    case 'string':
      namespace = namespace.split('.')
      break
    case 'undefined':
      namespace = []
      break
  }
  return namespace
}

Store.prototype._getExtendedNamespace = function _getExtendedNamespace (extNamespace) {
  var self = this
  var namespace = self._getNamespace()
  extNamespace = self._getPreparedNamespace(extNamespace)
  return namespace.concat(extNamespace)
}

/**
 * Returns the stream of this store
 *
 * @return {stream} flyd stream
 */
Store.prototype.getStream = function getStream () {
  // TODO: Implement Stream Combine
  return this._stream
}

/**
 * Returns the current state
 *
 * @return {object} current state
 */
Store.prototype.getState = function getState () {
  return u.cloneDeep(this.getStream()())
}

Store.prototype.createSubscription = function createSubscription () {
  var subscription = u.createSubscription.apply(null, arguments)
  this.addSubscription(subscription)
  return subscription
}

/**
 * Dispatches an action
 *
 * @function
 * @param {function|object} action An untyped action function that returns payload, or an action object
 *
 * @return {Store} this
 */
Store.prototype.dispatch = u.createPolymorphic()
var dispatch = Store.prototype.dispatch

dispatch.signature('Promise', function (promise) {
  var self = this

  return promise.then(function (action) {
    return self.dispatch(action)
  })
})

// Main dispatch signature
dispatch.signature('object', function (action) {
  var self = this

  var formatAction = function (action) {
    // Set the type to null if it is undefined
    if (action.type === undefined) {
      action.type = null
    }
    if (action.payload === undefined) {
      action.payload = null
    }
    return action
  }

  action = formatAction(action)

  var state = self.getState()

  return u.Promise.resolve().then(function () {
    /*
     * Start with middleware logic
     */
    var middlewares = self.getMiddleware()
    if (middlewares.length > 0) {
      /*
       * The middleware handling is done in a recursive manner
       */
      var idx = 0
      var handleMiddleware = function (idx) {
        return u.Promise.resolve(action).then(function (action) {
          return middlewares[idx](u.cloneDeep(state), action)
        }).then(function (result) {
          idx++
          if (!u.isObject(result)) {
            result = false
          }
          if (idx === middlewares.length || result === false) {
            return result
          } else {
            return handleMiddleware(idx)
          }
        })
      }
      return handleMiddleware(idx)
    } else {
      return action
    }
  }).then(function (action) {
    /*
     * Here is the final commit part
     */
    if (action === false) {
      return false
    } else {
      action = formatAction(action)
      u.forEach(self.getHandler(), function (handler) {
        if (u.isHandler(handler)) {
          state = handler._handle(u.cloneDeep(state), action)
        }
      })

      /*
       * Add the computed properties into the mix
       */
      // TODO: Reimplement computed properties
      /*
      u.forEach(this.getComputedProperty, function (func, name) {
        state[name] = func(state)
      })*/

      // Apply the changed state
      var stream = self.getStream()
      stream(state)
    }
  })
})

// Alternative untyped dispatch signature
dispatch.signature('function', function (func) {
  var self = this

  return u.createPromise(function (resolve, reject) {
    var payload = func(self.getState())
    if (payload !== undefined) {
      return resolve(self.dispatch({payload: payload}))
    } else {
      return resolve()
    }
  })
})

module.exports = Store
