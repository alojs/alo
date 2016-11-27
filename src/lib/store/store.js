var u = require('./../util/util.js')
var ObjectRelation = require('./../object_relation/object_relation.js')

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
var Store = function Store (state) {
  if (!u.isObject(state)) {
    state = {}
  }

  /**
   * @private
   */

  /*
   * TODO: Document members
   */

  this._id = null

  /**
   * Stream
   */
  this._stream = u.createStream(state)

  /**
   * Handlers
   */
  this._handlers = null

  /**
   * Middlewares
   */
  this._middlewares = null

  /**
   * Subscriptions
   */
  this._subscriptions = null

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

/*
Store.prototype.removeHandler = u.polymorphic()
var removeHandler = Store.prototype.removeHandler
removeHandler.signature('string, boolean b=false', function (id, fromHandler) {
  if (id === '') {
    throw new Error('Argument given should not be empty')
  } else {
    if (!u.isBoolean(fromHandler) || fromHandler !== true) {
      if (u.isHandler(this._handlers[id])) {
        this._handlers[id].removeStore(this.getId(), true)
      }
    }
    delete this._handlers[id]
  }

  return this
})
removeHandler.signature('object, boolean b=false', function (handler, fromHandler) {
  if (!u.isHandler(handler)) {
    throw new Error('Argument given is not a handler')
  } else {
    var id = handler.getId()
    this.removeHandler(id, fromHandler)
  }
})
*/

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
  return u.cloneDeep(this._stream())
}

// TODO: Reimplement with new subscription
Store.prototype.subscribe = function subscribe (func) {
  var subscription = u.createSubscription(func)
  this.addSubscription(subscription)
  return subscription
}

/*
Store.prototype.addMiddleware = u.polymorphic()
var addMiddleware = Store.prototype.addMiddleware
addMiddleware.signature('object, boolean b=false', function (middleware, fromMiddleware) {
  if (!u.isMiddleware(middleware)) {
    throw new Error('Argument given is not a middleware')
  } else {
    if (fromMiddleware === false) {
      middleware.addStore(this, true)
    }
    this._middlewares[middleware.getId()] = middleware
  }

  return this
})
addMiddleware.signature('array', function (middlewares) {
  u.foreach(middlewares, function (middleware) {
    this.addMiddleware(middleware)
  })

  return this
})
addMiddleware.signature('...', addMiddleware)
*/

/*
Store.prototype.removeMiddleware = u.polymorphic()
var removeMiddleware = Store.prototype.removeMiddleware
removeMiddleware.signature('string, boolean b=false', function (id, fromMiddleware) {
  if (id !== '') {
    if (fromMiddleware === false) {
      if (this._middlewares[id] !== null) {
        this._middlewares[id].removeStore(this, true)
      }
    }
    delete this._middlewares[id]
  }

  return this
})
removeMiddleware.signature('object, boolean b=false', function (middleware, fromMiddleware) {
  if (!u.isMiddleware(middleware)) {
    throw new Error('Argument given is not a middleware')
  } else {
    var id = middleware.getId()
    this.removeMiddleware(id, fromMiddleware)
  }

  return this
})
*/

/*
Store.prototype.getMiddleware = function getMiddleware (id) {
  if (u.isString(id)) {
    if (id === '') {
      throw new Error('Argument given should not be an empty string')
    } else {
      if (this._middlewares[id] !== null) {
        return this._middlewares[id]
      } else {
        return false
      }
    }
  }
  return this._middlewares
}
*/

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

// Main dispatch signature
dispatch.signature('object', function (action) {
  var self = this
  var state = this.getState()

  // Set the type to null if it is undefined
  if (action.type === undefined) {
    action.type = null
  }

  /*
   * This is the final commit function
   * It will be called after all middlewares are applied
   */
  var commit = function (action) {
    if (u.isObject(action)) {
      // Call the registered handlers
      u.forEach(self.getHandler(), function (handler) {
        if (u.isHandler(handler)) {
          state = handler._handle(u.cloneDeep(state), action)
        }
      })
      // Apply the changed state
      var stream = self.getStream()
      stream(state)
    }
  }

  var middlewares = this.getMiddleware()
  if (middlewares.length > 0) {
    // When middlewares are registered, we need to call them

    // Every middleware must give an answer
    var answerCount = 0

    /*
     * Recursive function, will be called by the middleware
     * it calls the next middleware or the commit function
     */
    var callMiddlewares = function (action) {
      if (u.isObject(action)) {
        if (middlewares.length === answerCount) {
          // In this case every middleware was called, so we can commit
          commit(action)
        } else {
          var middleware = middlewares[answerCount]
          answerCount++
          if (u.isMiddleware(middleware)) {
            // If the middleware is a valid middleware, call it
            middleware._call(callMiddlewares, action)
          } else {
            // If its not a valid middleware, just ignore it
            callMiddlewares(action)
          }
        }
      }
    }

    // Launch the middlewareHandler
    callMiddlewares(action)
  } else {
    // If no middlewares are registered, we can just call commit
    commit(action)
  }

  return this
})

// Alternative untyped dispatch signature
dispatch.signature('function', function (func) {
  var payload = func(this.getState())
  if (payload !== undefined) {
    this.dispatch({payload: payload})
  }
})

module.exports = Store
