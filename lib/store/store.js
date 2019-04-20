/* @flow */

import {isString} from './../util/typecheck.js'
import ObjectRelation from './../util/object-relation.js'
import Util from './../util/util.js'
var u = new Util()

var reducerRelation = new ObjectRelation('store', 'reducer', function () {
  return this._alo.isReducer.apply(this._alo, arguments)
})
var subscriptionRelation = new ObjectRelation('store', 'subscription', function () {
  return this._alo.isSubscription.apply(this._alo, arguments)
})
var middlewareRelation = new ObjectRelation('store', 'middleware', function () {
  return this._alo.isMiddleware.apply(this._alo, arguments)
})
var computedPropertyRelation = new ObjectRelation('store', 'computedProperty', function () {
  return this._alo.isDependency.apply(this._alo, arguments)
})

/**
 * The core of Alo. A store is the central place for application state
 *
 * @class
 *
 * @param {Object} state - Optional object to set as a start state
 */
var Store = function Store (state: ?any, id: ?string) {
  if (state === undefined || state === null) {
    state = {}
  }
  state = {
    state: state,
    computed: {},
    action: { type: null, payload: null }
  }

  /**
   * @private
   */

  /*
   * TODO: Document members
   */

  this._id = null
  if (id != null && isString(id)) {
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
  var reducer = this._alo.createReducer.apply(this._alo, arguments)
  this.addReducer(reducer)

  return reducer
}

Store.prototype.mapState = function mapState (func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given should be a function')
  } else {
    return u.map(this.getState(), func)
  }
}

Store.prototype.mapData = function mapData (func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given should be a function')
  } else {
    return u.map(this.getData(), func)
  }
}

Store.prototype.mapStream = function mapStream (func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given should be a function')
  } else {
    return u.mapStream(func, this.getStream())
  }
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
  var dependency = this._alo.createDependency.apply(this._alo, arguments)
  this.addComputedProperty(dependency)

  return dependency
}

Store.prototype.createSubscription = function createSubscription () {
  var subscription = this._alo.createSubscription.apply(this._alo, arguments)
  this.addSubscription(subscription)
  return subscription
}
Store.prototype.subscribe = Store.prototype.createSubscription

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
  var dispatchArguments = u.values(arguments)

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
    if (middlewares.length > 0 && self._alo.isMiddleware(middlewares[0])) {
      dispatchArguments.unshift(self)
      return u.Promise.resolve().then(function () {
        return middlewares[0].meddleRecursive(middlewares, dispatchArguments)
      }).then(function (resultArgs) {
        if (u.isArray(resultArgs)) {
          return resultArgs[0]
        } else {
          return resultArgs
        }
      })
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
        if (self._alo.isReducer(reducer)) {
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
          return computedProperties[0].reduceRecursive(computedProperties, self.getId(), u.cloneDeep(newState))
        } else {
          return newState.computed
        }
      }).then(function (computed) {
        newState.computed = computed

        // Apply the changed state
        var stream = self.getStream()
        stream(newState)
      })
    }
  })
}

export default Store
