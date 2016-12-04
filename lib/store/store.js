var Alo = require('./../alo.js')
var alo = new Alo()
var u = alo.util

var reducerRelation = u.createObjectRelation('store', 'reducer', alo.isReducer)
var subscriptionRelation = u.createObjectRelation('store', 'subscription', alo.isSubscription)
var middlewareRelation = u.createObjectRelation('store', 'middleware', alo.isMiddleware)
var computedPropertyRelation = u.createObjectRelation('store', 'computedProperty', alo.isDependency)

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
  state = {
    state: state,
    computed: state,
    action: null
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
   * Reducers
   */
  this._reducerRelations = null

  /**
   * Middlewares
   */
  this._middlewareRelations = null

  /**
   * Subscriptions
   */
  this._subscriptionRelations = null

  this._computedProperty = {}

  reducerRelation.constructParent(this)
  middlewareRelation.constructParent(this)
  subscriptionRelation.constructParent(this)
  computedPropertyRelation.constructParent(this)
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
 * Returns the registered reducers
 *
 * @function
 * @return {array} Array of reducers
 */
Store.prototype.getReducer = null

/**
 * Adds a reducer object to the registered reducers
 *
 * @function
 * @param {Reducer} reducer
 *
 * @return {Store} this
 */
Store.prototype.addReducer = null

/**
 * Removes a reducer from the currently registered reducers
 *
 * @function
 * @param {int|Reducer} reducer id or Reducer
 *
 * @return {Store} this
 */
Store.prototype.removeReducer = null

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

reducerRelation.registerParentPrototype(Store.prototype)
middlewareRelation.registerParentPrototype(Store.prototype)
subscriptionRelation.registerParentPrototype(Store.prototype)
computedPropertyRelation.registerParentPrototype(Store.prototype)

/**
 * Creates and registers one or multible reducers
 *
 * @function
 *
 * @param {array|...function} Array or variadic call of one or multible reducer functions
 *
 * @return {Reducer}
 * @see Reducer
 */
Store.prototype.createReducer = function createReducer () {
  var reducer = alo.createReducer.apply(null, arguments)
  this.addReducer(reducer)

  return reducer
}

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
Store.prototype.getData = function getData () {
  return u.cloneDeep(this.getStream()())
}

Store.prototype.getState = function getState () {
  return this.getData().state
}

Store.prototype.createComputedProperty = function createComputedProperty () {
  var dependency = alo.createDependency.apply(null, arguments)
  this.addComputedProperty(dependency)

  return dependency
}

Store.prototype.createSubscription = function createSubscription () {
  var subscription = alo.createSubscription.apply(null, arguments)
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
Store.prototype.dispatch = function () {
  var self = this
  var dispatchArguments = arguments

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

  return u.Promise.resolve().then(function () {
    /*
     * Start with middleware logic
     */
    var middlewares = self.getMiddleware(false)
    if (middlewares.length > 0) {
      /*
       * The middleware handling is done in a recursive manner
       */
      var idx = 0
      var walker = function () {
        if (middlewares[idx] !== undefined) {
          if (alo.isMiddleware(middlewares[idx])) {
            return u.Promise.resolve().then(function () {
              var args = u.values(dispatchArguments)
              args.unshift(self)
              return middlewares[idx]._apply(null, args)
            }).then(function () {
              dispatchArguments = arguments
              idx++
              return walker()
            })
          } else {
            idx++
            return walker()
          }
        } else {
          return dispatchArguments[0]
        }
      }
      return walker()
    } else {
      return dispatchArguments[0]
    }
  }).then(function (action) {
    /*
     * Here is the final commit part
     */
    if (!u.isPlainObject(action)) {
      return false
    } else {
      action = formatAction(action)
      var state = self.getData()
      var newState = state.state
      u.forEach(self.getReducer(false), function (reducer) {
        if (alo.isReducer(reducer)) {
          newState = reducer.reduce(u.cloneDeep(newState), action)
        }
      })

      newState = {
        state: newState,
        computed: {},
        action: action
      }

      return u.Promise.resolve().then(function () {
        /*
         * Add the computed properties into the mix
         */
        var computedProperties = self.getComputedProperty(false)
        if (computedProperties.length > 0) {
          var idx = 0
          var walker = function () {
            if (computedProperties[idx] !== undefined) {
              if (alo.isDependency(computedProperties[idx])) {
                return u.Promise.resolve().then(function () {
                  return computedProperties[idx].reduce(u.cloneDeep(newState))
                }).then(function (computed) {
                  newState.computed = computed
                  idx++
                  return walker()
                })
              } else {
                idx++
                return walker()
              }
            } else {
              return newState
            }
          }
          return walker()
        } else {
          return newState
        }
      }).then(function (newState) {
        // Apply the changed state
        var stream = self.getStream()
        stream(newState)
      })
    }
  })
}

/*
var dispatch = Store.prototype.dispatch

dispatch.signature('Promise', function (promise) {
  var self = this

  return promise.then(function (action) {
    return self.dispatch(action)
  })
})

// Main dispatch signature
dispatch.signature('object', function (action) {
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
*/

module.exports = Store
