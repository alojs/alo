var alo =
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
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * alo Modul
	 * @module alo
	 */

	/**
	 * public object with access to the different constructors
	 */
	module.exports = {
	  /**
	   * Access to the store constructor
	   *
	   * @see Store
	   */
	  Store: __webpack_require__(1),

	  /**
	   * Access to the handler constructor
	   *
	   * @see Handler
	   */
	  Handler: __webpack_require__(2),

	  /**
	   * Access to the subscription constructor
	   *
	   * @see Subscription
	   */
	  Subscription: __webpack_require__(139),

	  /**
	   * Access to the util namespace
	   *
	   * @see util
	   */
	  util: __webpack_require__(3)
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Handler = __webpack_require__(2)
	var u = __webpack_require__(3)

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

	  var Subscription = __webpack_require__(139)
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var u = __webpack_require__(3)

	/**
	 * Handler class
	 * TODO: Describe what this class is all about
	 *
	 * @class
	 */
	var Handler = function AloHandler () {
	  /**
	   * Private properties
	   *
	   * @namespace
	   *
	   * @private
	   */
	  this.protected = {}

	  /**
	   * Is this handler enabled?
	   */
	  this.protected.enabled = true

	  /**
	   * Unique ID of this handler
	   */
	  this.protected.id = u.uniqueId()

	  /**
	   * Array of registered reducers
	   */
	  this.protected.reducers = []

	  /**
	   * Object of registered stores
	   */
	  this.protected.stores = {}
	}

	/**
	 * Calls the registered reducers with the provided state and action
	 * This is automatically started after a successfull dispatch on the Store
	 *
	 * @private
	 *
	 * @param {object} state
	 * @param {object} action
	 *
	 * @return {object} state Returns the changed state
	 */

	Handler.prototype._handle = function _handle (state, action) {
	  if (this.protected.enabled === true) {
	    u.forEach(this.protected.reducers, function (item) {
	      state = item.call(this, state, action)
	    })
	  }

	  return state
	}

	/**
	 * Add reducer functions to the handler
	 *
	 * @function
	 *
	 * @param {array|function} reducer Array of reducers or single reducer function
	 * @param {...function} reducers More reducers
	 *
	 * @return {Handler} this
	 */
	Handler.prototype.addReducer = u.polymorphic()
	var addReducer = Handler.prototype.addReducer
	var addReducerArray = function addReducerArray (reducers) {
	  var self = this

	  if (!u.isArray(reducers)) {
	    throw new Error('Argument given is not an array')
	  }
	  u.forEach(reducers, function (reducer) {
	    if (!u.isFunction(reducer)) {
	      throw new Error('Item in array is not a function')
	    } else {
	      self.protected.reducers.push(reducer)
	    }
	  })

	  return this
	}
	addReducer.signature('array', addReducerArray)
	addReducer.signature('...', addReducerArray)
	addReducer.signature('function', function (reducer) {
	  return addReducerArray.call(this, [reducer])
	})

	/**
	 * Connect one or multible stores to this handler
	 *
	 * @function
	 *
	 * @param {Store|array} store One store or array of stores
	 * @param {boolean} fromStore Was this function called within a store
	 *
	 * @return {Handler} this
	 */
	Handler.prototype.addStore = u.polymorphic()
	var addStore = Handler.prototype.addStore
	var addStoreArray = function addStoreArray (stores, fromStore) {
	  var self = this
	  if (!u.isArray(stores)) {
	    throw new Error('Argument given is not an array')
	  }
	  if (stores.length > 0) {
	    var Store = __webpack_require__(1)
	    u.forEach(stores, function (store) {
	      if (!(store instanceof Store)) {
	        throw new Error('Item in array given is not a store')
	      } else {
	        var id = store.getId()
	        if (u.isString(id) && id !== '') {
	          self.protected.stores[id] = store
	          if (!u.isBoolean(fromStore) || fromStore !== true) {
	            store.addHandler(self, true)
	          }
	        }
	      }
	    })
	  }

	  return this
	}
	addStore.signature('array, boolean b=false', addStoreArray)
	addStore.signature('object, boolean b=false', function (store, fromStore) {
	  return addStoreArray.call(this, [store], fromStore)
	})

	/**
	 * Disables this handler
	 *
	 * @return {Handler} this
	 */
	Handler.prototype.disable = function disable () {
	  this.protected.enabled = false

	  return this
	}

	/**
	 * Enables this handler
	 *
	 * @return {Handler} this
	 */
	Handler.prototype.enable = function enable () {
	  this.protected.enabled = true

	  return this
	}

	/**
	 * Get id of this handler
	 *
	 * @return {string} Unique ID of this handler
	 */
	Handler.prototype.getId = function getId () {
	  return this.protected.id
	}

	/**
	 * Remove a store or all stores from this handler
	 *
	 * @function
	 *
	 * @param {integer|Store|boolean} store|fromStore
	 * @param {boolean} fromStore Was this called within a store?
	 *
	 * @return {Handler} this
	 */
	Handler.prototype.removeStore = u.polymorphic()
	var removeStore = Handler.prototype.removeStore
	var removeStoreById = function removeStoreById (id, fromStore) {
	  if (!u.isString(id) || id !== '') {
	    throw new Error('Provided id is not a valid string')
	  } else {
	    if (this.protected.stores[id] != null) {
	      if (!u.isBoolean(fromStore) || fromStore !== true) {
	        var Store = __webpack_require__(1)
	        if (this.protected.stores[id] instanceof Store) {
	          this.protected.stores[id].removeHandler(this.getId(), true)
	        }
	      }
	      delete this.protected.stores[id]
	    }
	  }

	  return this
	}
	removeStore.signature('string, boolean b=false', removeStoreById)
	removeStore.signature('object, boolean b=false', function (store, fromStore) {
	  var Store = __webpack_require__(1)
	  if (!(store instanceof Store)) {
	    throw new Error('Argument of type object is not a store')
	  } else {
	    return removeStoreById.call(this, store.getId(), fromStore)
	  }
	})
	removeStore.signature('boolean a=false', function (fromStore) {
	  var self = this

	  u.forEach(this.protected.stores, function (store, idx) {
	    removeStoreById.call(self, idx, fromStore)
	  })

	  return this
	})

	/**
	 * Stops this handler: it will be disabled and removed from all stores
	 *
	 * @return {Handler} this
	 */
	Handler.prototype.stop = function stop () {
	  this.removeStore()
	  this.disable()
	  return this
	}

	module.exports = Handler


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Several utility functions / libs used by alo
	 *
	 * Some of this functions / libs might change over time: Please read the description of the specific function / lib.
	 *
	 * @namespace
	 *
	 */
	var util = {}

	// Library functions
	// Lodash
	/**
	 * Lodash cloneDeep, can be used
	 */
	util.cloneDeep = __webpack_require__(4)

	/**
	 * Lodash forEach, can be used
	 */
	util.forEach = __webpack_require__(115)

	/**
	 * Lodash isFunction, can be used
	 */
	util.isFunction = __webpack_require__(23)

	/**
	 * Lodash isString, can be used
	 */
	util.isString = __webpack_require__(123)

	/**
	 * Lodash isObject, can be used
	 */
	util.isObject = __webpack_require__(30)

	/**
	 * Lodash isArray, can be used
	 */
	util.isArray = __webpack_require__(62)

	/**
	 * Lodash isBoolean, can be used
	 */
	util.isBoolean = __webpack_require__(124)

	/**
	 * Lodash uniqueId, can be used
	 */
	util.uniqueId = __webpack_require__(125)

	/**
	 * Flyd streams: Might change!
	 */
	util.flyd = __webpack_require__(130)

	/**
	 * Polymorphic helper: Might change!
	 */
	util.polymorphic = __webpack_require__(137)

	/**
	 * Several included reducer examples
	 */
	util.reducers = __webpack_require__(138)

	module.exports = util


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(5);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_SYMBOLS_FLAG = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}

	module.exports = cloneDeep;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(6),
	    arrayEach = __webpack_require__(50),
	    assignValue = __webpack_require__(51),
	    baseAssign = __webpack_require__(54),
	    baseAssignIn = __webpack_require__(77),
	    cloneBuffer = __webpack_require__(81),
	    copyArray = __webpack_require__(82),
	    copySymbols = __webpack_require__(83),
	    copySymbolsIn = __webpack_require__(86),
	    getAllKeys = __webpack_require__(90),
	    getAllKeysIn = __webpack_require__(92),
	    getTag = __webpack_require__(93),
	    initCloneArray = __webpack_require__(98),
	    initCloneByTag = __webpack_require__(99),
	    initCloneObject = __webpack_require__(113),
	    isArray = __webpack_require__(62),
	    isBuffer = __webpack_require__(63),
	    isObject = __webpack_require__(30),
	    keys = __webpack_require__(56);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, baseClone, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(7),
	    stackClear = __webpack_require__(15),
	    stackDelete = __webpack_require__(16),
	    stackGet = __webpack_require__(17),
	    stackHas = __webpack_require__(18),
	    stackSet = __webpack_require__(19);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(8),
	    listCacheDelete = __webpack_require__(9),
	    listCacheGet = __webpack_require__(12),
	    listCacheHas = __webpack_require__(13),
	    listCacheSet = __webpack_require__(14);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(10);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(11);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(10);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(10);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(10);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(7);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(7),
	    Map = __webpack_require__(20),
	    MapCache = __webpack_require__(35);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21),
	    root = __webpack_require__(26);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(22),
	    getValue = __webpack_require__(34);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(23),
	    isMasked = __webpack_require__(31),
	    isObject = __webpack_require__(30),
	    toSource = __webpack_require__(33);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(24),
	    isObject = __webpack_require__(30);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(25),
	    getRawTag = __webpack_require__(28),
	    objectToString = __webpack_require__(29);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(26);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(27);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(25);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(32);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(26);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(36),
	    mapCacheDelete = __webpack_require__(44),
	    mapCacheGet = __webpack_require__(47),
	    mapCacheHas = __webpack_require__(48),
	    mapCacheSet = __webpack_require__(49);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(37),
	    ListCache = __webpack_require__(7),
	    Map = __webpack_require__(20);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(38),
	    hashDelete = __webpack_require__(40),
	    hashGet = __webpack_require__(41),
	    hashHas = __webpack_require__(42),
	    hashSet = __webpack_require__(43);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(39);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(45);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(46);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 46 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(45);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(45);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(45);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(52),
	    eq = __webpack_require__(11);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignValue;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(53);

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	module.exports = baseAssignValue;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(55),
	    keys = __webpack_require__(56);

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return object && copyObject(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(51),
	    baseAssignValue = __webpack_require__(52);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(57),
	    baseKeys = __webpack_require__(72),
	    isArrayLike = __webpack_require__(76);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(58),
	    isArguments = __webpack_require__(59),
	    isArray = __webpack_require__(62),
	    isBuffer = __webpack_require__(63),
	    isIndex = __webpack_require__(66),
	    isTypedArray = __webpack_require__(67);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 58 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(60),
	    isObjectLike = __webpack_require__(61);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(24),
	    isObjectLike = __webpack_require__(61);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 61 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(26),
	    stubFalse = __webpack_require__(65);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)(module)))

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 65 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(68),
	    baseUnary = __webpack_require__(70),
	    nodeUtil = __webpack_require__(71);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(24),
	    isLength = __webpack_require__(69),
	    isObjectLike = __webpack_require__(61);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(27);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)(module)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(73),
	    nativeKeys = __webpack_require__(74);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 73 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(75);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(23),
	    isLength = __webpack_require__(69);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(55),
	    keysIn = __webpack_require__(78);

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn(object, source) {
	  return object && copyObject(source, keysIn(source), object);
	}

	module.exports = baseAssignIn;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(57),
	    baseKeysIn = __webpack_require__(79),
	    isArrayLike = __webpack_require__(76);

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	module.exports = keysIn;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30),
	    isPrototype = __webpack_require__(73),
	    nativeKeysIn = __webpack_require__(80);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeysIn;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = nativeKeysIn;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(26);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)(module)))

/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = copyArray;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(55),
	    getSymbols = __webpack_require__(84);

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols(source, object) {
	  return copyObject(source, getSymbols(source), object);
	}

	module.exports = copySymbols;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(75),
	    stubArray = __webpack_require__(85);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

	module.exports = getSymbols;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(55),
	    getSymbolsIn = __webpack_require__(87);

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn(source, object) {
	  return copyObject(source, getSymbolsIn(source), object);
	}

	module.exports = copySymbolsIn;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(88),
	    getPrototype = __webpack_require__(89),
	    getSymbols = __webpack_require__(84),
	    stubArray = __webpack_require__(85);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush(result, getSymbols(object));
	    object = getPrototype(object);
	  }
	  return result;
	};

	module.exports = getSymbolsIn;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(75);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(91),
	    getSymbols = __webpack_require__(84),
	    keys = __webpack_require__(56);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(88),
	    isArray = __webpack_require__(62);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(91),
	    getSymbolsIn = __webpack_require__(87),
	    keysIn = __webpack_require__(78);

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn(object) {
	  return baseGetAllKeys(object, keysIn, getSymbolsIn);
	}

	module.exports = getAllKeysIn;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(94),
	    Map = __webpack_require__(20),
	    Promise = __webpack_require__(95),
	    Set = __webpack_require__(96),
	    WeakMap = __webpack_require__(97),
	    baseGetTag = __webpack_require__(24),
	    toSource = __webpack_require__(33);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21),
	    root = __webpack_require__(26);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21),
	    root = __webpack_require__(26);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21),
	    root = __webpack_require__(26);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(21),
	    root = __webpack_require__(26);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(100),
	    cloneDataView = __webpack_require__(102),
	    cloneMap = __webpack_require__(103),
	    cloneRegExp = __webpack_require__(107),
	    cloneSet = __webpack_require__(108),
	    cloneSymbol = __webpack_require__(111),
	    cloneTypedArray = __webpack_require__(112);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, cloneFunc, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return cloneArrayBuffer(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case dataViewTag:
	      return cloneDataView(object, isDeep);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      return cloneTypedArray(object, isDeep);

	    case mapTag:
	      return cloneMap(object, isDeep, cloneFunc);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      return cloneRegExp(object);

	    case setTag:
	      return cloneSet(object, isDeep, cloneFunc);

	    case symbolTag:
	      return cloneSymbol(object);
	  }
	}

	module.exports = initCloneByTag;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(101);

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	module.exports = cloneArrayBuffer;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(26);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(100);

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	module.exports = cloneDataView;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(104),
	    arrayReduce = __webpack_require__(105),
	    mapToArray = __webpack_require__(106);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `map`.
	 *
	 * @private
	 * @param {Object} map The map to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned map.
	 */
	function cloneMap(map, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
	  return arrayReduce(array, addMapEntry, new map.constructor);
	}

	module.exports = cloneMap;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	 * Adds the key-value `pair` to `map`.
	 *
	 * @private
	 * @param {Object} map The map to modify.
	 * @param {Array} pair The key-value pair to add.
	 * @returns {Object} Returns `map`.
	 */
	function addMapEntry(map, pair) {
	  // Don't return `map.set` because it's not chainable in IE 11.
	  map.set(pair[0], pair[1]);
	  return map;
	}

	module.exports = addMapEntry;


/***/ },
/* 105 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as
	 *  the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;


/***/ },
/* 106 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	module.exports = cloneRegExp;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(109),
	    arrayReduce = __webpack_require__(105),
	    setToArray = __webpack_require__(110);

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1;

	/**
	 * Creates a clone of `set`.
	 *
	 * @private
	 * @param {Object} set The set to clone.
	 * @param {Function} cloneFunc The function to clone values.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned set.
	 */
	function cloneSet(set, isDeep, cloneFunc) {
	  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
	  return arrayReduce(array, addSetEntry, new set.constructor);
	}

	module.exports = cloneSet;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * Adds `value` to `set`.
	 *
	 * @private
	 * @param {Object} set The set to modify.
	 * @param {*} value The value to add.
	 * @returns {Object} Returns `set`.
	 */
	function addSetEntry(set, value) {
	  // Don't return `set.add` because it's not chainable in IE 11.
	  set.add(value);
	  return set;
	}

	module.exports = addSetEntry;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(25);

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	module.exports = cloneSymbol;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(100);

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	module.exports = cloneTypedArray;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(114),
	    getPrototype = __webpack_require__(89),
	    isPrototype = __webpack_require__(73);

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	module.exports = initCloneObject;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30);

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	module.exports = baseCreate;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(50),
	    baseEach = __webpack_require__(116),
	    castFunction = __webpack_require__(121),
	    isArray = __webpack_require__(62);

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}

	module.exports = forEach;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(117),
	    createBaseEach = __webpack_require__(120);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(118),
	    keys = __webpack_require__(56);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(119);

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(76);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(122);

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}

	module.exports = castFunction;


/***/ },
/* 122 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(24),
	    isArray = __webpack_require__(62),
	    isObjectLike = __webpack_require__(61);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(24),
	    isObjectLike = __webpack_require__(61);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]';

	/**
	 * Checks if `value` is classified as a boolean primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
	 * @example
	 *
	 * _.isBoolean(false);
	 * // => true
	 *
	 * _.isBoolean(null);
	 * // => false
	 */
	function isBoolean(value) {
	  return value === true || value === false ||
	    (isObjectLike(value) && baseGetTag(value) == boolTag);
	}

	module.exports = isBoolean;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(126);

	/** Used to generate unique IDs. */
	var idCounter = 0;

	/**
	 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {string} [prefix=''] The value to prefix the ID with.
	 * @returns {string} Returns the unique ID.
	 * @example
	 *
	 * _.uniqueId('contact_');
	 * // => 'contact_104'
	 *
	 * _.uniqueId();
	 * // => '105'
	 */
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	module.exports = uniqueId;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(127);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(25),
	    arrayMap = __webpack_require__(128),
	    isArray = __webpack_require__(62),
	    isSymbol = __webpack_require__(129);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isArray(value)) {
	    // Recursively convert values (susceptible to call stack limits).
	    return arrayMap(value, baseToString) + '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(24),
	    isObjectLike = __webpack_require__(61);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curryN = __webpack_require__(131);

	// Utility
	function isFunction(obj) {
	  return !!(obj && obj.constructor && obj.call && obj.apply);
	}
	function trueFn() { return true; }

	// Globals
	var toUpdate = [];
	var inStream;
	var order = [];
	var orderNextIdx = -1;
	var flushing = false;

	/** @namespace */
	var flyd = {}

	// /////////////////////////// API ///////////////////////////////// //

	/**
	 * Creates a new stream
	 *
	 * __Signature__: `a -> Stream a`
	 *
	 * @name flyd.stream
	 * @param {*} initialValue - (Optional) the initial value of the stream
	 * @return {stream} the stream
	 *
	 * @example
	 * var n = flyd.stream(1); // Stream with initial value `1`
	 * var s = flyd.stream(); // Stream with no initial value
	 */
	flyd.stream = function(initialValue) {
	  var endStream = createDependentStream([], trueFn);
	  var s = createStream();
	  s.end = endStream;
	  s.fnArgs = [];
	  endStream.listeners.push(s);
	  if (arguments.length > 0) s(initialValue);
	  return s;
	}

	/**
	 * Create a new dependent stream
	 *
	 * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`
	 *
	 * @name flyd.combine
	 * @param {Function} fn - the function used to combine the streams
	 * @param {Array<stream>} dependencies - the streams that this one depends on
	 * @return {stream} the dependent stream
	 *
	 * @example
	 * var n1 = flyd.stream(0);
	 * var n2 = flyd.stream(0);
	 * var max = flyd.combine(function(n1, n2, self, changed) {
	 *   return n1() > n2() ? n1() : n2();
	 * }, [n1, n2]);
	 */
	flyd.combine = curryN(2, combine);
	function combine(fn, streams) {
	  var i, s, deps, depEndStreams;
	  var endStream = createDependentStream([], trueFn);
	  deps = []; depEndStreams = [];
	  for (i = 0; i < streams.length; ++i) {
	    if (streams[i] !== undefined) {
	      deps.push(streams[i]);
	      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
	    }
	  }
	  s = createDependentStream(deps, fn);
	  s.depsChanged = [];
	  s.fnArgs = s.deps.concat([s, s.depsChanged]);
	  s.end = endStream;
	  endStream.listeners.push(s);
	  addListeners(depEndStreams, endStream);
	  endStream.deps = depEndStreams;
	  updateStream(s);
	  return s;
	}

	/**
	 * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.
	 *
	 * __Signature__: `* -> Boolean`
	 *
	 * @name flyd.isStream
	 * @param {*} value - the value to test
	 * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise
	 *
	 * @example
	 * var s = flyd.stream(1);
	 * var n = 1;
	 * flyd.isStream(s); //=> true
	 * flyd.isStream(n); //=> false
	 */
	flyd.isStream = function(stream) {
	  return isFunction(stream) && 'hasVal' in stream;
	}

	/**
	 * Invokes the body (the function to calculate the value) of a dependent stream
	 *
	 * By default the body of a dependent stream is only called when all the streams
	 * upon which it depends has a value. `immediate` can circumvent this behaviour.
	 * It immediately invokes the body of a dependent stream.
	 *
	 * __Signature__: `Stream a -> Stream a`
	 *
	 * @name flyd.immediate
	 * @param {stream} stream - the dependent stream
	 * @return {stream} the same stream
	 *
	 * @example
	 * var s = flyd.stream();
	 * var hasItems = flyd.immediate(flyd.combine(function(s) {
	 *   return s() !== undefined && s().length > 0;
	 * }, [s]);
	 * console.log(hasItems()); // logs `false`. Had `immediate` not been
	 *                          // used `hasItems()` would've returned `undefined`
	 * s([1]);
	 * console.log(hasItems()); // logs `true`.
	 * s([]);
	 * console.log(hasItems()); // logs `false`.
	 */
	flyd.immediate = function(s) {
	  if (s.depsMet === false) {
	    s.depsMet = true;
	    updateStream(s);
	  }
	  return s;
	}

	/**
	 * Changes which `endsStream` should trigger the ending of `s`.
	 *
	 * __Signature__: `Stream a -> Stream b -> Stream b`
	 *
	 * @name flyd.endsOn
	 * @param {stream} endStream - the stream to trigger the ending
	 * @param {stream} stream - the stream to be ended by the endStream
	 * @param {stream} the stream modified to be ended by endStream
	 *
	 * @example
	 * var n = flyd.stream(1);
	 * var killer = flyd.stream();
	 * // `double` ends when `n` ends or when `killer` emits any value
	 * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {
	 *   return 2 * n();
	 * }, [n]);
	*/
	flyd.endsOn = function(endS, s) {
	  detachDeps(s.end);
	  endS.listeners.push(s.end);
	  s.end.deps.push(endS);
	  return s;
	}

	/**
	 * Map a stream
	 *
	 * Returns a new stream consisting of every value from `s` passed through
	 * `fn`. I.e. `map` creates a new stream that listens to `s` and
	 * applies `fn` to every new value.
	 * __Signature__: `(a -> result) -> Stream a -> Stream result`
	 *
	 * @name flyd.map
	 * @param {Function} fn - the function that produces the elements of the new stream
	 * @param {stream} stream - the stream to map
	 * @return {stream} a new stream with the mapped values
	 *
	 * @example
	 * var numbers = flyd.stream(0);
	 * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);
	 */
	// Library functions use self callback to accept (null, undefined) update triggers.
	flyd.map = curryN(2, function(f, s) {
	  return combine(function(s, self) { self(f(s.val)); }, [s]);
	})

	/**
	 * Listen to stream events
	 *
	 * Similar to `map` except that the returned stream is empty. Use `on` for doing
	 * side effects in reaction to stream changes. Use the returned stream only if you
	 * need to manually end it.
	 *
	 * __Signature__: `(a -> result) -> Stream a -> Stream undefined`
	 *
	 * @name flyd.on
	 * @param {Function} cb - the callback
	 * @param {stream} stream - the stream
	 * @return {stream} an empty stream (can be ended)
	 */
	flyd.on = curryN(2, function(f, s) {
	  return combine(function(s) { f(s.val); }, [s]);
	})

	/**
	 * Creates a new stream with the results of calling the function on every incoming
	 * stream with and accumulator and the incoming value.
	 *
	 * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`
	 *
	 * @name flyd.scan
	 * @param {Function} fn - the function to call
	 * @param {*} val - the initial value of the accumulator
	 * @param {stream} stream - the stream source
	 * @return {stream} the new stream
	 *
	 * @example
	 * var numbers = flyd.stream();
	 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
	 * numbers(2)(3)(5);
	 * sum(); // 10
	 */
	flyd.scan = curryN(3, function(f, acc, s) {
	  var ns = combine(function(s, self) {
	    self(acc = f(acc, s.val));
	  }, [s]);
	  if (!ns.hasVal) ns(acc);
	  return ns;
	});

	/**
	 * Creates a new stream down which all values from both `stream1` and `stream2`
	 * will be sent.
	 *
	 * __Signature__: `Stream a -> Stream a -> Stream a`
	 *
	 * @name flyd.merge
	 * @param {stream} source1 - one stream to be merged
	 * @param {stream} source2 - the other stream to be merged
	 * @return {stream} a stream with the values from both sources
	 *
	 * @example
	 * var btn1Clicks = flyd.stream();
	 * button1Elm.addEventListener(btn1Clicks);
	 * var btn2Clicks = flyd.stream();
	 * button2Elm.addEventListener(btn2Clicks);
	 * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
	 */
	flyd.merge = curryN(2, function(s1, s2) {
	  var s = flyd.immediate(combine(function(s1, s2, self, changed) {
	    if (changed[0]) {
	      self(changed[0]());
	    } else if (s1.hasVal) {
	      self(s1.val);
	    } else if (s2.hasVal) {
	      self(s2.val);
	    }
	  }, [s1, s2]));
	  flyd.endsOn(combine(function() {
	    return true;
	  }, [s1.end, s2.end]), s);
	  return s;
	});

	/**
	 * Creates a new stream resulting from applying `transducer` to `stream`.
	 *
	 * __Signature__: `Transducer -> Stream a -> Stream b`
	 *
	 * @name flyd.transduce
	 * @param {Transducer} xform - the transducer transformation
	 * @param {stream} source - the stream source
	 * @return {stream} the new stream
	 *
	 * @example
	 * var t = require('transducers.js');
	 *
	 * var results = [];
	 * var s1 = flyd.stream();
	 * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());
	 * var s2 = flyd.transduce(tx, s1);
	 * flyd.combine(function(s2) { results.push(s2()); }, [s2]);
	 * s1(1)(1)(2)(3)(3)(3)(4);
	 * results; // => [2, 4, 6, 8]
	 */
	flyd.transduce = curryN(2, function(xform, source) {
	  xform = xform(new StreamTransformer());
	  return combine(function(source, self) {
	    var res = xform['@@transducer/step'](undefined, source.val);
	    if (res && res['@@transducer/reduced'] === true) {
	      self.end(true);
	      return res['@@transducer/value'];
	    } else {
	      return res;
	    }
	  }, [source]);
	});

	/**
	 * Returns `fn` curried to `n`. Use this function to curry functions exposed by
	 * modules for Flyd.
	 *
	 * @name flyd.curryN
	 * @function
	 * @param {Integer} arity - the function arity
	 * @param {Function} fn - the function to curry
	 * @return {Function} the curried function
	 *
	 * @example
	 * function add(x, y) { return x + y; };
	 * var a = flyd.curryN(2, add);
	 * a(2)(4) // => 6
	 */
	flyd.curryN = curryN

	/**
	 * Returns a new stream identical to the original except every
	 * value will be passed through `f`.
	 *
	 * _Note:_ This function is included in order to support the fantasy land
	 * specification.
	 *
	 * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`
	 *
	 * @name stream.map
	 * @param {Function} function - the function to apply
	 * @return {stream} a new stream with the values mapped
	 *
	 * @example
	 * var numbers = flyd.stream(0);
	 * var squaredNumbers = numbers.map(function(n) { return n*n; });
	 */
	function boundMap(f) { return flyd.map(f, this); }

	/**
	 * Returns a new stream which is the result of applying the
	 * functions from `this` stream to the values in `stream` parameter.
	 *
	 * `this` stream must be a stream of functions.
	 *
	 * _Note:_ This function is included in order to support the fantasy land
	 * specification.
	 *
	 * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`
	 *
	 * @name stream.ap
	 * @param {stream} stream - the values stream
	 * @return {stream} a new stram with the functions applied to values
	 *
	 * @example
	 * var add = flyd.curryN(2, function(x, y) { return x + y; });
	 * var numbers1 = flyd.stream();
	 * var numbers2 = flyd.stream();
	 * var addToNumbers1 = flyd.map(add, numbers1);
	 * var added = addToNumbers1.ap(numbers2);
	 */
	function ap(s2) {
	  var s1 = this;
	  return combine(function(s1, s2, self) { self(s1.val(s2.val)); }, [s1, s2]);
	}

	/**
	 * Get a human readable view of a stream
	 * @name stream.toString
	 * @return {String} the stream string representation
	 */
	function streamToString() {
	  return 'stream(' + this.val + ')';
	}

	/**
	 * @name stream.end
	 * @memberof stream
	 * A stream that emits `true` when the stream ends. If `true` is pushed down the
	 * stream the parent stream ends.
	 */

	/**
	 * @name stream.of
	 * @function
	 * @memberof stream
	 * Returns a new stream with `value` as its initial value. It is identical to
	 * calling `flyd.stream` with one argument.
	 *
	 * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`
	 *
	 * @param {*} value - the initial value
	 * @return {stream} the new stream
	 *
	 * @example
	 * var n = flyd.stream(1);
	 * var m = n.of(1);
	 */

	// /////////////////////////// PRIVATE ///////////////////////////////// //
	/**
	 * @private
	 * Create a stream with no dependencies and no value
	 * @return {Function} a flyd stream
	 */
	function createStream() {
	  function s(n) {
	    if (arguments.length === 0) return s.val
	    updateStreamValue(s, n)
	    return s
	  }
	  s.hasVal = false;
	  s.val = undefined;
	  s.vals = [];
	  s.listeners = [];
	  s.queued = false;
	  s.end = undefined;
	  s.map = boundMap;
	  s.ap = ap;
	  s.of = flyd.stream;
	  s.toString = streamToString;
	  return s;
	}

	/**
	 * @private
	 * Create a dependent stream
	 * @param {Array<stream>} dependencies - an array of the streams
	 * @param {Function} fn - the function used to calculate the new stream value
	 * from the dependencies
	 * @return {stream} the created stream
	 */
	function createDependentStream(deps, fn) {
	  var s = createStream();
	  s.fn = fn;
	  s.deps = deps;
	  s.depsMet = false;
	  s.depsChanged = deps.length > 0 ? [] : undefined;
	  s.shouldUpdate = false;
	  addListeners(deps, s);
	  return s;
	}

	/**
	 * @private
	 * Check if all the dependencies have values
	 * @param {stream} stream - the stream to check depencencies from
	 * @return {Boolean} `true` if all dependencies have vales, `false` otherwise
	 */
	function initialDepsNotMet(stream) {
	  stream.depsMet = stream.deps.every(function(s) {
	    return s.hasVal;
	  });
	  return !stream.depsMet;
	}

	/**
	 * @private
	 * Update a dependent stream using its dependencies in an atomic way
	 * @param {stream} stream - the stream to update
	 */
	function updateStream(s) {
	  if ((s.depsMet !== true && initialDepsNotMet(s)) ||
	      (s.end !== undefined && s.end.val === true)) return;
	  if (inStream !== undefined) {
	    toUpdate.push(s);
	    return;
	  }
	  inStream = s;
	  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
	  var returnVal = s.fn.apply(s.fn, s.fnArgs);
	  if (returnVal !== undefined) {
	    s(returnVal);
	  }
	  inStream = undefined;
	  if (s.depsChanged !== undefined) s.depsChanged = [];
	  s.shouldUpdate = false;
	  if (flushing === false) flushUpdate();
	}

	/**
	 * @private
	 * Update the dependencies of a stream
	 * @param {stream} stream
	 */
	function updateDeps(s) {
	  var i, o, list
	  var listeners = s.listeners;
	  for (i = 0; i < listeners.length; ++i) {
	    list = listeners[i];
	    if (list.end === s) {
	      endStream(list);
	    } else {
	      if (list.depsChanged !== undefined) list.depsChanged.push(s);
	      list.shouldUpdate = true;
	      findDeps(list);
	    }
	  }
	  for (; orderNextIdx >= 0; --orderNextIdx) {
	    o = order[orderNextIdx];
	    if (o.shouldUpdate === true) updateStream(o);
	    o.queued = false;
	  }
	}

	/**
	 * @private
	 * Add stream dependencies to the global `order` queue.
	 * @param {stream} stream
	 * @see updateDeps
	 */
	function findDeps(s) {
	  var i
	  var listeners = s.listeners;
	  if (s.queued === false) {
	    s.queued = true;
	    for (i = 0; i < listeners.length; ++i) {
	      findDeps(listeners[i]);
	    }
	    order[++orderNextIdx] = s;
	  }
	}

	/**
	 * @private
	 */
	function flushUpdate() {
	  flushing = true;
	  while (toUpdate.length > 0) {
	    var s = toUpdate.shift();
	    if (s.vals.length > 0) s.val = s.vals.shift();
	    updateDeps(s);
	  }
	  flushing = false;
	}

	/**
	 * @private
	 * Push down a value into a stream
	 * @param {stream} stream
	 * @param {*} value
	 */
	function updateStreamValue(s, n) {
	  if (n !== undefined && n !== null && isFunction(n.then)) {
	    n.then(s);
	    return;
	  }
	  s.val = n;
	  s.hasVal = true;
	  if (inStream === undefined) {
	    flushing = true;
	    updateDeps(s);
	    if (toUpdate.length > 0) flushUpdate(); else flushing = false;
	  } else if (inStream === s) {
	    markListeners(s, s.listeners);
	  } else {
	    s.vals.push(n);
	    toUpdate.push(s);
	  }
	}

	/**
	 * @private
	 */
	function markListeners(s, lists) {
	  var i, list;
	  for (i = 0; i < lists.length; ++i) {
	    list = lists[i];
	    if (list.end !== s) {
	      if (list.depsChanged !== undefined) {
	        list.depsChanged.push(s);
	      }
	      list.shouldUpdate = true;
	    } else {
	      endStream(list);
	    }
	  }
	}

	/**
	 * @private
	 * Add dependencies to a stream
	 * @param {Array<stream>} dependencies
	 * @param {stream} stream
	 */
	function addListeners(deps, s) {
	  for (var i = 0; i < deps.length; ++i) {
	    deps[i].listeners.push(s);
	  }
	}

	/**
	 * @private
	 * Removes an stream from a dependency array
	 * @param {stream} stream
	 * @param {Array<stream>} dependencies
	 */
	function removeListener(s, listeners) {
	  var idx = listeners.indexOf(s);
	  listeners[idx] = listeners[listeners.length - 1];
	  listeners.length--;
	}

	/**
	 * @private
	 * Detach a stream from its dependencies
	 * @param {stream} stream
	 */
	function detachDeps(s) {
	  for (var i = 0; i < s.deps.length; ++i) {
	    removeListener(s, s.deps[i].listeners);
	  }
	  s.deps.length = 0;
	}

	/**
	 * @private
	 * Ends a stream
	 */
	function endStream(s) {
	  if (s.deps !== undefined) detachDeps(s);
	  if (s.end !== undefined) detachDeps(s.end);
	}

	/**
	 * @private
	 * transducer stream transformer
	 */
	function StreamTransformer() { }
	StreamTransformer.prototype['@@transducer/init'] = function() { };
	StreamTransformer.prototype['@@transducer/result'] = function() { };
	StreamTransformer.prototype['@@transducer/step'] = function(s, v) { return v; };

	module.exports = flyd;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(132);
	var _curry1 = __webpack_require__(133);
	var _curry2 = __webpack_require__(135);
	var _curryN = __webpack_require__(136);


	/**
	 * Returns a curried equivalent of the provided function, with the specified
	 * arity. The curried function has two unusual capabilities. First, its
	 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
	 * following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`, the
	 * following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var sumArgs = (...args) => R.sum(args);
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  if (length === 1) {
	    return _curry1(fn);
	  }
	  return _arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0: return function() { return fn.apply(this, arguments); };
	    case 1: return function(a0) { return fn.apply(this, arguments); };
	    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
	    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
	    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
	    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
	    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
	    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(134);


	/**
	 * Optimized internal one-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0 || _isPlaceholder(a)) {
	      return f1;
	    } else {
	      return fn.apply(this, arguments);
	    }
	  };
	};


/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(133);
	var _isPlaceholder = __webpack_require__(134);


	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2
	             : _curry1(function(_b) { return fn(a, _b); });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2
	             : _isPlaceholder(a) ? _curry1(function(_a) { return fn(_a, b); })
	             : _isPlaceholder(b) ? _curry1(function(_b) { return fn(a, _b); })
	             : fn(a, b);
	    }
	  };
	};


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(132);
	var _isPlaceholder = __webpack_require__(134);


	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @param {Array} received An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (!_isPlaceholder(received[combinedIdx]) ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (!_isPlaceholder(result)) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined)
	                     : _arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 137 */
/***/ function(module, exports) {

	'use strict';

	/**
	 *  Create polymorphic functions
	 *  @package    polymorphic
	 *  @copyright  Konfirm ⓒ 2015
	 *  @author     Rogier Spieker (rogier+npm@konfirm.eu)
	 *  @license    GPLv2
	 */
	function polymorphic() {
		var registry = [];

		/**
		 *  Determine if somewhere in the prototype chains the variable extends an Object with given name
		 *  @name    isExtendOf
		 *  @access  internal
		 *  @param   string  name
		 *  @param   object  variable
		 *  @return  bool    extends
		 */
		function isExtendOf(name, variable) {
			var offset = typeof variable === 'object' && variable ? Object.getPrototypeOf(variable) : null,
				pattern = offset ? new RegExp('^' + name + '$') : null;

			//  It is not quite feasible to compare the inheritance using `instanceof` (all constructors would have to
			//  be registered somehow then) we simply compare the constructor function names.
			//  As a side effect, this enables polymorphic to compare against the exact type (unless a developer has
			//  altered the constructor name, which is not protected from overwriting)
			while (offset && offset.constructor) {
				if (pattern.test(offset.constructor.name)) {
					return true;
				}

				offset = Object.getPrototypeOf(offset);
			}

			return false;
		}

		/**
		 *  Map the param property of given candidate to contain only the values and resolve any references to other arguments
		 *  @name    parameterize
		 *  @access  internal
		 *  @param   Object candidate
		 *  @return  Object candidate (with resolved params)
		 */
		function parameterize(candidate) {
			candidate.param = candidate.param.map(function(param) {
				var value;

				if ('value' in param) {
					value = param.value;
				}
				else if ('reference' in param) {
					value = candidate.param.reduce(function(p, c) {
						return c !== param && !p && param.reference === c.name && 'value' in c ? c.value : p;
					}, null);
				}

				return value;
			});

			return candidate;
		}

		/**
		 *  Filter given list so only matching signatures are kept
		 *  @name    matchSignature
		 *  @access  internal
		 *  @param   array  candidates
		 *  @param   array  arguments
		 *  @return  array  filtered candidates
		 */
		function matchSignature(list, arg) {
			var types = arg.map(function(variable) {
					return new RegExp('^(' + type(variable) + ')');
				});

			return list.filter(function(config) {
				var variadic = false,
					result;

				//  result is true if no more arguments are provided than the signature allows OR the last
				//  argument in the signature is variadic
				result = arg.length <= config.arguments.length || (config.arguments[config.arguments.length - 1] && config.arguments[config.arguments.length - 1].type === '...');

				//  test each given argument agains the configured signatures
				if (result) {
					arg.forEach(function(value, index) {
						var expect = config.arguments[index] ? config.arguments[index].type : null;

						//  look at ourself and ahead - if there is a following item, and it is variadic, it may be
						//  left out entirely (zero or more)
						if (isTypeAtIndex('...', config.arguments, index)) {
							variadic = true;
						}

						//  the result remains valid as long as the values match the given signature
						//  (type matches or it is variadic)
						result = result && (variadic || types[index].test(expect) || (expect[expect.length - 1] !== '!' && isExtendOf(expect, value)));
					});
				}

				return result;
			});
		}

		/**
		 *  Map the registered values to a new object containing the specifics we use to determine the best
		 *  @name    prepare
		 *  @access  internal
		 *  @param   array  candidates
		 *  @param   array  arguments
		 *  @return  array  mapped candidates
		 */
		function prepare(list, arg) {
			return list.map(function(config) {
				var item = {
						//  the function to call
						call: config.call,

						//  all configured arguments
						arguments: config.arguments,

						//  the calculated specificity
						specificity: config.arguments.map(function(argument, index) {
							var value = 'value' in argument,
								specificity = 0;

							//  if a argument not a variadic one and the value is specified
							if (argument.type !== '...' && index < arg.length) {
								++specificity;

								//  bonus points if the exact type matches (explicit by type)
								//  OR there is no default value (explicitly provided)
								if (Number(argument.type === type(arg[index], true) || isExtendOf(argument.type, arg[index]) || !value)) {
									++specificity;
								}

								//  extra bonus points if the type is explicity the same (in case of inheritance)
								if (argument.type[argument.type.length - 1] === '!' && type(arg[index], true)) {
									++specificity;
								}
							}

							return specificity;
						}).join(''),

						//  the parameters with which the `call` may be executed
						param: config.arguments.map(function(argument, index) {
							var result = {};

							result.name = argument.name;

							//  if a variadic type is encountered, the remainder of the given arguments becomes the value
							if (argument.type === '...') {
								result.value = arg.slice(index);
							}
							else if (index < arg.length && typeof arg[index] !== 'undefined' && arg[index] !== null) {
								result.value = arg[index];
							}
							else if ('value' in argument) {
								result.value = argument.value;
							}
							else if ('reference' in argument) {
								result.reference = argument.reference;
							}

							return result;
						})
					};

				return item;
			});
		}

		/**
		 *  Prioritize the items in the list
		 *  @name    prepare
		 *  @access  internal
		 *  @param   array  candidates
		 *  @param   array  arguments
		 *  @return  array  prioritized candidates
		 *  @note    the list should contain pre-mapped items (as it works on specificity mostly)
		 */
		function prioritize(list, arg) {
			return list.sort(function(a, b) {
				var typing = function(item, index) {
						return +(item.type === type(arg[index], true));
					};

				//  if the calculated specificity is not equal it has precedence
				if (a.specificity !== b.specificity) {
					//  the shortest specificity OR ELSE the highest specificity wins
					return a.specificity.length - b.specificity.length || b.specificity - a.specificity;
				}

				//  if the specificity is equal, we want to prioritize on the more explicit types
				return b.arguments.map(typing).join('') - a.arguments.map(typing).join('');
			});
		}

		/**
		 *  Compare the type of the argument at a specific position within a collection
		 *  @name    isTypeAtIndex
		 *  @access  internal
		 *  @param   string type
		 *  @param   array  arguments
		 *  @param   int    index
		 *  @return  boolean type at index
		 */
		function isTypeAtIndex(type, list, index) {
			return list.length > index && 'type' in list[index] ? list[index].type === type : false;
		}

		/**
		 *  Determine the proper delegate handler for given arguments
		 *  @name    delegate
		 *  @access  internal
		 *  @param   array  arguments
		 *  @return  mixed  handler result
		 */
		function delegate(arg) {
			//  create a list of possible candidates based on the given arguments
			var candidate = matchSignature(registry, arg);

			//  prepare the configured signatures/arguments based on the arguments actually recieved
			candidate = prepare(candidate, arg);

			//  prioritize the candidates
			candidate = prioritize(candidate, arg);

			//  and finally, filter any candidate which does not fully comply with the signature based on the - now - parameters
			candidate = candidate.filter(function(item) {
				var variadic = false,
					min = item.arguments.map(function(argument, index) {
						variadic = isTypeAtIndex('...', item.arguments, index) || isTypeAtIndex('...', item.arguments, index + 1);

						return +(!(variadic || 'value'  in argument || 'reference' in argument));
					}).join('').match(/^1+/);

				return arg.length >= (min ? min[0].length : 0);
			});

			return candidate.length ? parameterize(candidate[0]) : false;
		}

		/**
		 *  Cast variable to given type
		 *  @name    cast
		 *  @access  internal
		 *  @param   string type
		 *  @param   string value
		 *  @return  mixed  value
		 */
		function cast(type, variable) {
			var result = variable;

			switch (type) {
				case 'number':
					result = +result;
					break;

				case 'int':
					result = parseInt(result, 10);
					break;

				case 'float':
					result = parseFloat(result);
					break;

				case 'bool':
				case 'boolean':
					result = ['true', '1', 1].indexOf(result) >= 0;
					break;
			}

			return result;
		}

		/**
		 *  Create a string matching various number types depending on given variable
		 *  @name    numberType
		 *  @access  internal
		 *  @param   string  type
		 *  @param   number  variable
		 *  @param   bool    explicit typing
		 *  @return  string  types
		 */
		function numberType(type, variable, explicit) {
			//  if the integer value is identical to the float value, it is an integer
			return (parseInt(variable, 10) === parseFloat(variable) ? 'int' : 'float') + (explicit ? '' : '|' + type);
		}

		/**
		 *  Create a string matching various object types (object constructor name if explicit)
		 *  @name    objectType
		 *  @access  internal
		 *  @param   string  type
		 *  @param   object  variable
		 *  @param   bool    explicit typing
		 *  @return  string  types
		 */
		function objectType(type, variable, explicit) {
			//  array get some special treatment by indicating it is not an object but instead an array
			//  this also goes for inherited types
			if (variable instanceof Array) {
				type = 'array';
			}

			return variable ? variable.constructor.name + (explicit ? '' : '|' + type) : 'null';
		}

		/**
		 *  Create a string matching 'boolean' type and - if not explicit - its shorthand version 'bool'
		 *  @name    booleanType
		 *  @access  internal
		 *  @param   string  type
		 *  @param   bool    explicit typing
		 *  @return  string  types
		 */
		function booleanType(type, explicit) {
			return type + (explicit ? '' : '|bool');
		}

		/**
		 *  Create a string matching undefined (and any string having one or more alphatical characters if not explicit)
		 *  @name    undefinedType
		 *  @access  internal
		 *  @param   string     type
		 *  @param   bool       explicit typing
		 *  @return  string  types
		 */
		function undefinedType(type, explicit) {
			return type + (explicit ? '' : '|[a-z]+');
		}

		/**
		 *  Determine the type and create a string ready for use in regular expressions
		 *  @name    type
		 *  @access  internal
		 *  @param   mixed   variable
		 *  @param   bool    explicit
		 *  @return  string  type
		 */
		function type(variable, explicit) {
			var result = typeof variable;

			switch (result) {
				case 'number':
					result = numberType(result, variable, explicit);
					break;

				case 'object':
					result = objectType(result, variable, explicit);
					break;

				case 'boolean':
					result = booleanType(result, explicit);
					break;

				case 'undefined':
					result = undefinedType(result, explicit);
					break;
			}

			return result;
		}

		/**
		 *  Process the expression match result and prepare the argument object
		 *  @name    prepareArgument
		 *  @access  internal
		 *  @param   RegExpMatch match
		 *  @param   string defaultname
		 *  @result  Object argument
		 */
		function prepareArgument(match, name) {
			var result = {
					type:  match ? match[1] : false,
					name:  match ? match[2] : name
				};

			if (match) {
				if (match[4] === '@') {
					result.reference = match[5];
				}
				else if (match[3] === '=') {
					result.value = cast(result.type, match[5]);
				}
			}

			return result;
		}

		/**
		 *  Parse given signature string and create an array containing all argument options for the signature
		 *  @name    parse
		 *  @access  internal
		 *  @param   string  signature
		 *  @return  array   options
		 */
		function parse(signature) {
			var pattern = /^(?:void|([a-zA-Z]+!?|\.{3})(?:[:\s]+([a-zA-Z]+)(?:(=)(@)?(.*))?)?)?$/;

			return signature.split(/\s*,\s*/).map(function(argument, index, all) {
				var result = prepareArgument(argument.match(pattern), 'var' + (index + 1));

				if (result.type === false) {
					throw new Error('polymorphic: invalid argument "' + argument + '" in signature "' + signature + '"');
				}
				else if (result.type === '...' && index < all.length - 1) {
					throw new Error('polymorphic: variadic argument must be at end of signature "' + signature + '"');
				}

				return result;
			}).filter(function(argument) {
				//  a type is undefined if it was declared as 'void' or '' (an empty string)
				return argument.type !== undefined;
			});
		}

		/**
		 *  The main result function, this is the function actually being returned by `polymorphic`
		 *  @name    result
		 *  @access  internal
		 *  @param   * [one or more arguments]
		 *  @return  mixed  handler result
		 *  @throws  polymorph: signature not found "<resolved pattern>"
		 */
		function polymorph() {
			var arg = Array.prototype.slice.call(arguments),
				candidate = delegate(arg);

			if (!candidate) {
				throw new Error('polymorph: signature not found "' + arg.map(function(variable) {
					return type(variable);
				}).join(', ') + '"');
			}

			return candidate.call.apply(this, candidate.param);
		}

		/**
		 *  Add one or more signatures and a handler for those signatures
		 *  @name    signature
		 *  @access  public
		 *  @param   string signature1
		 *  @param   string signatureN [optional - any number of signature can be provided for a handler]
		 *  @param   function handler
		 *  @return  void
		 *  @throws  polymorphic.signature: expected one or more signatures
		 *           polymorphic.signature: expected final argument to be a callback
		 */
		polymorph.signature = function() {
			var arg = Array.prototype.slice.call(arguments),
				call = arg.length && typeof arg[arg.length - 1] === 'function' ? arg.pop() : null;

			if (!arg.length) {
				throw new Error('polymorphic.signature: expected one or more signatures');
			}
			else if (!call) {
				throw new Error('polymorphic.signature: expected final argument to be a callback');
			}

			arg.forEach(function(signature) {
				registry.push({
					signature: signature,
					arguments: parse(signature),
					call: call
				});
			});
		};

		return polymorph;
	}

	module.exports = polymorphic;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30)

	var basic = function (state, action) {
	  /*
	  if (action.payload != null && isObject(action.payload)) {
	    return action.payload
	  }
	  */
	}

	module.exports = {
	  basic: basic
	}


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var Store = __webpack_require__(1)

	/**
	 * Subscription Constructor, is used in the Store Class to create Subscriptions to state
	 *
	 * @class
	 * @extends {Store}
	 * @see Store
	 * @param {number} id
	 * @param {Object} storeProtected
	 * @param {string | Array} namespace
	 */
	var Subscription = function AloSubscription (id, storeProtected, namespace) {
	  this._id = id
	  this._namespace = this._getPreparedNamespace(namespace)
	  this.protected = storeProtected
	}

	Subscription.prototype = Object.create(Store.prototype)
	Subscription.prototype.constructor = Subscription
	Subscription.prototype.remember = function remember () {
	  this._callSubscription(this.protected.subscriptions[this._id])
	  return this
	}

	module.exports = Subscription


/***/ }
/******/ ]);