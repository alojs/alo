var PocketStore =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var PocketStore = function (state) {
	  if (typeof (state) !== 'object') {
	    state = {}
	  }
	  this.protected = {
	    state: state,
	    publicState: {},
	    subscriptions: []
	  }
	  this._synchronize()
	}

	PocketStore.prototype._synchronize = function _synchronize () {
	  this.protected.publicState = this._cloneObject(this.protected.state)
	}

	PocketStore.prototype._publish = function _publish (namespace, message) {
	  var self = this
	  self._synchronize()
	  self.protected.subscriptions.forEach(function (subscription) {
	    self._callSubscription(subscription, namespace, message)
	  })
	}

	PocketStore.prototype._setState = function _setState (newState, namespace, state) {
	  var self = this
	  if (typeof (state) === 'undefined') {
	    state = self.protected.state
	  }
	  if (typeof (namespace) !== 'string') {
	    if (namespace.length > 1) {
	      var currentNamespace = namespace[0]
	      if (state[currentNamespace] == null) {
	        state[currentNamespace] = {}
	      }
	      namespace.shift()
	      return self._setState(newState, namespace, state[currentNamespace])
	    } else if (namespace.length === 1) {
	      state[namespace[0]] = newState
	    } else {
	      state = newState
	    }
	  }
	}

	PocketStore.prototype._getStateByNamespace = function _getStateByNamespace (namespace, state) {
	  var self = this
	  if (typeof (state) === 'undefined') {
	    state = self.protected.state
	  }
	  namespace = self._getPreparedNamespace(namespace)
	  namespace.forEach(function (currentNamespace) {
	    if (state[currentNamespace] == null) {
	      state[currentNamespace] = {}
	    }
	    state = state[currentNamespace]
	  })
	  return state
	}

	PocketStore.prototype._getPreparedNamespace = function _getPreparedNamespace (namespace) {
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

	PocketStore.prototype._callSubscription = function _callSubscription (subscription, namespace, message) {
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
	          subscription.callbackFunction.call(null, self._cloneObject(state), message)
	        }
	      } else {
	        subscription.callbackFunction.call(null, self._cloneObject(state), message)
	      }
	    } else {
	      subscription.callbackFunction.call(null, self._cloneObject(state), message)
	    }
	  }
	  return self
	}

	PocketStore.prototype._cloneObject = function _cloneObject (object) {
	  var clone = null
	  if (this._isArray(object)) {
	    clone = []
	  } else {
	    clone = {}
	  }
	  for (var i in object) {
	    if (typeof (object[i]) === 'object' && object[i] != null) {
	      clone[i] = this._cloneObject(object[i])
	    } else {
	      clone[i] = object[i]
	    }
	  }
	  return clone
	}

	PocketStore.prototype._getDispatcher = function _getDispatcher (namespace) {
	  var self = this
	  return function (newState, message) {
	    if (typeof (newState) === 'object' && newState != null) {
	      self._setState(newState, self._cloneObject(namespace))
	    }
	    self._publish(namespace, message)
	  }
	}

	PocketStore.prototype._isArray = function _isArray (object) {
	  return Object.prototype.toString.call(object) === '[object Array]'
	}

	PocketStore.prototype.yt = PocketStore.prototype.yet = function yet (namespace) {
	  namespace = this._getExtendedNamespace(namespace)
	  return this._getStateByNamespace(namespace, this.protected.publicState)
	}

	PocketStore.prototype._getNamespace = function _getNamespace () {
	  return []
	}

	PocketStore.prototype._getExtendedNamespace = function _getExtendedNamespace (extNamespace) {
	  var self = this
	  var namespace = self._getNamespace()
	  extNamespace = self._getPreparedNamespace(extNamespace)
	  return namespace.concat(extNamespace)
	}

	PocketStore.prototype.ss = PocketStore.prototype.subscribe = function subscribe (functionParam, namespace) {
	  var self = this
	  var subscription = {
	    namespace: self._cloneObject(self._getExtendedNamespace(namespace))
	  }
	  var callbackFunction = null
	  if (functionParam instanceof PocketStore) {
	    callbackFunction = function () {
	      functionParam.dispatch()
	    }
	  } else {
	    callbackFunction = functionParam
	  }
	  subscription.callbackFunction = callbackFunction
	  var idx = self.protected.subscriptions.push(subscription)
	  idx--

	  var PocketStoreSubscription = function () {
	    this.id = idx
	    this.protected = self.protected
	  }
	  PocketStoreSubscription.prototype = Object.create(PocketStore.prototype)
	  PocketStoreSubscription.prototype.constructor = PocketStoreSubscription
	  PocketStoreSubscription.prototype.remember = function remember () {
	    self._callSubscription(self.protected.subscriptions[idx])
	    return self
	  }

	  PocketStoreSubscription.prototype._getNamespace = function _getNamespace () {
	    return subscription.namespace
	  }
	  return new PocketStoreSubscription()
	}

	PocketStore.prototype.us = PocketStore.prototype.unsubscribe = function unsubscribe (subscription) {
	  this.protected.subscriptions[subscription.id] = null
	  return this
	}

	PocketStore.prototype.dp = PocketStore.prototype.dispatch = function dispatch (functionParam, namespace) {
	  var self = this
	  namespace = self._getExtendedNamespace(namespace)
	  var state = self._getStateByNamespace(namespace)
	  state = self._cloneObject(state)
	  var dispatcher = self._getDispatcher(namespace)
	  var handleSingleDispatch = function handleSingleDispatch (func) {
	    if (typeof (functionParam) === 'function') {
	      switch (functionParam.length) {
	        case 0:
	          dispatcher(functionParam())
	          break
	        case 1:
	          dispatcher(functionParam(state))
	          break
	        default:
	          functionParam(state, dispatcher)
	          break
	      }
	    }
	  }
	  console.log(functionParam)
	  switch (typeof (functionParam)) {
	    case 'function':
	      handleSingleDispatch(functionParam)
	      break
	    case 'object':
	      if (self._isArray(functionParam)) {
	        functionParam.forEach(function (functionParamItem) {
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

	module.exports = PocketStore


/***/ }
/******/ ]);