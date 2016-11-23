var Handler = require('./../handler/handler.js')
var u = require('./../util/util.js')

/**
 * The core of Alo. A store is the central place for application state
 *
 * @class
 *
 * @param {Object} state - Optional object to set as a start state
 */
var Store = function AloStore (state) {
  if (!u.isObject(state)) {
    state = {}
  }

  /**
   * @private
   */
  this._namespace = []

  /**
   * @private
   */
  this.protected = {
    id: u.uniqueId(),
    state: state,
    publicState: {},
    handlers: {},
    subscriptions: []
  }

  this._synchronize()
}

Store.prototype.getId = function getId () {
  return this.protected.id
}

/**
 * Adds a handler object to the registered handlers
 *
 * @param {Handler} handler
 *
 * @return {Store} this
 */
Store.prototype.addHandler = function addHandler (handler, fromHandler) {
  if (handler instanceof Handler) {
    var id = handler.getId()
    if (u.isString(id) && id !== '') {
      if (!u.isBoolean(fromHandler) || fromHandler !== true) {
        handler.addStore(this, true)
      }
      this.protected.handlers[id] = handler
    }
  }
  return this
}

/**
 * Removes a handler from the currently registered handlers
 * {int|Handler} handler id or Handler
 * @return {Store} this
 */
Store.prototype.removeHandler = function removeHandler (arg1, fromHandler) {
  var id = null

  if (u.isString(arg1)) {
    id = arg1
  } else if (arg1 instanceof Handler) {
    id = arg1.getId()
  }

  if (u.isString(id) && id !== '') {
    if (!u.isBoolean(fromHandler) || fromHandler !== true) {
      this.protected.handlers[id].removeStore(this.getId(), true)
    }
    delete this.protected.handlers[id]
  }

  return this
}

/**
 * Registers one or multible reducers
 *
 * @function
 *
 * @param {array/...function} Array or variadic call of one or multible reducer functions
 *
 * @return {Handler}
 * @see Handler
 */
Store.prototype.addReducer = u.polymorphic()
var addReducer = Store.prototype.addReducer
var addReducerArray = function (reducer) {
  var handler = new Handler()
  u.forEach(reducer, function (item) {
    if (!u.isFunction(item)) {
      throw new Error('Given argument ist not a function')
    } else {
      handler.addReducer(item)
    }
  })
  this.addHandler(handler)
  return handler
}
addReducer.signature('array', addReducerArray)
addReducer.signature('function', function (func) {
  var reducers = [func]
  return addReducerArray.call(this, reducers)
})
addReducer.signature('...', function (rest) {
  return addReducerArray.call(this, rest)
})

/**
 * Syncs the public state variable with the protected state
 * @private
 * @param no param :)
 */
Store.prototype._synchronize = function _synchronize () {
  this.protected.publicState = u.cloneDeep(this.protected.state)
}

Store.prototype._publish = function _publish (namespace, message) {
  var self = this
  self._synchronize()
  u.forEach(self.protected.subscriptions, function (subscription) {
    self._callSubscription(subscription, namespace, message)
  })
}

Store.prototype._setState = function _setState (newState, namespace, stateParam) {
  var self = this
  if (!u.isString(namespace)) {
    if (typeof (stateParam) === 'undefined') {
      namespace.unshift('state')
      self._setState(newState, namespace, self.protected)
    } else {
      if (namespace.length > 1) {
        var currentNamespace = namespace[0]
        if (stateParam[currentNamespace] == null) {
          stateParam[currentNamespace] = {}
        }
        namespace.shift()
        return self._setState(newState, namespace, stateParam[currentNamespace])
      } else if (namespace.length === 1) {
        stateParam[namespace[0]] = newState
      }
    }
  } else {
    self.protected.state = newState
  }
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

Store.prototype._callSubscription = function _callSubscription (subscription, namespace, message) {
  var self = this
  if (subscription != null) {
    var state = self._getStateByNamespace(subscription.namespace)
    if (subscription.namespace != null) {
      namespace = self._getPreparedNamespace(namespace)
      if (namespace.length > 0) {
        var inNamespace = namespace.every(function (namespaceItem, idx) {
          return (subscription.namespace[idx] == null || subscription.namespace[idx] === namespaceItem)
        })
        if (inNamespace) {
          subscription.callbackFunction.call(null, u.cloneDeep(state), message)
        }
      } else {
        subscription.callbackFunction.call(null, u.cloneDeep(state), message)
      }
    } else {
      subscription.callbackFunction.call(null, u.cloneDeep(state), message)
    }
  }
  return self
}

Store.prototype._getDispatcher = function _getDispatcher (namespace) {
  var self = this
  return function (newState, message) {
    if (u.isObject(newState) && newState != null) {
      self._setState(newState, u.cloneDeep(namespace))
      u.forEach(self.protected.handlers, function (handler) {
        // TODO: State and action needs to be added here
        handler._handle()
      })
    }
    self._publish(namespace, message)
  }
}

Store.prototype.yet = function yet (namespace) {
  namespace = this._getExtendedNamespace(namespace)
  return this._getStateByNamespace(namespace, this.protected.publicState)
}

Store.prototype._getNamespace = function _getNamespace () {
  return this._namespace
}

Store.prototype.subscribe = function subscribe (functionParam, namespace) {
  var self = this
  var subscription = {
    namespace: u.cloneDeep(self._getExtendedNamespace(namespace))
  }
  var callbackFunction = null
  if (functionParam instanceof Store) {
    callbackFunction = function () {
      functionParam.dispatch()
    }
  } else {
    callbackFunction = functionParam
  }
  subscription.callbackFunction = callbackFunction
  var idx = self.protected.subscriptions.push(subscription)
  idx--

  var Subscription = require('./../subscription/subscription.js')
  return new Subscription(idx, self.protected, subscription.namespace)
}

Store.prototype.us = Store.prototype.unsubscribe = function unsubscribe (subscription) {
  this.protected.subscriptions[subscription.id] = null
  return this
}

/**
 * Dispatches new state
 */
Store.prototype.dispatch = function dispatch (functionParam, namespace) {
  var self = this
  namespace = self._getExtendedNamespace(namespace)
  var state = self._getStateByNamespace(namespace)
  state = u.cloneDeep(state)
  var dispatcher = self._getDispatcher(namespace)
  var handleSingleDispatch = function handleSingleDispatch (func) {
    if (u.isFunction(functionParam)) {
      switch (functionParam.length) {
        case 0:
          var functionResult = functionParam()
          if (functionResult != null) {
            dispatcher(functionResult)
          }
          break
        case 1:
          var functionResult = functionParam(state)
          if (functionResult != null) {
            dispatcher(functionResult)
          }
          break
        default:
          functionParam(state, dispatcher)
          break
      }
    }
  }
  switch (typeof (functionParam)) {
    case 'function':
      handleSingleDispatch(functionParam)
      break
    case 'object':
      if (u.isArray(functionParam)) {
        u.forEach(functionParam, function (functionParamItem) {
          handleSingleDispatch(functionParamItem)
        })
      }
      break
    case 'string':
      dispatcher(null, functionParam)
      break
    default:
      dispatcher()
  }
  return this
}

module.exports = Store
