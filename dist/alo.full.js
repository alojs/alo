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

	var Alo = __webpack_require__(1)

	var extras = __webpack_require__(202)

	/**
	 * Useful functions
	 *
	 * @memberof module:alo
	 *
	 * @see extras
	 */
	Alo.prototype.extras = extras

	module.exports = Alo


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Alo = function Alo () {
	  var Util = __webpack_require__(2)

	  /**
	   * Access to the util namespace
	   *
	   * @see util
	   */
	  this.util = new Util()
	}

	Alo.prototype.createSubscription = function createSubscription () {
	  var Subscription = __webpack_require__(196)
	  var subscription = Object.create(Subscription.prototype)
	  Subscription.apply(subscription, arguments)
	  return subscription
	}

	Alo.prototype.isSubscription = function isSubscription (subscription) {
	  var Subscription = __webpack_require__(196)
	  return (subscription instanceof Subscription)
	}

	Alo.prototype.createDependency = function createDependency () {
	  var Dependency = __webpack_require__(197)
	  var dependency = Object.create(Dependency.prototype)
	  Dependency.apply(dependency, arguments)
	  return dependency
	}

	Alo.prototype.isDependency = function isDependency (dependency) {
	  var Dependency = __webpack_require__(197)
	  return (dependency instanceof Dependency)
	}

	Alo.prototype.createMember = function createMember () {
	  var Member = __webpack_require__(198)
	  var member = Object.create(Member.prototype)
	  Member.apply(member, arguments)
	  return member
	}

	Alo.prototype.isMember = function isMember (member) {
	  var Member = __webpack_require__(198)
	  return (member instanceof Member)
	}

	/**
	 * Access to the handler constructor
	 *
	 * @see Handler
	 */
	// util.Handler = require('./../handler/handler.js'),
	/**
	 * Access to the store constructor
	 *
	 * @see Store
	 */
	// util.Store = require('./../store/store.js'),
	/**
	 * Access to the subscription constructor
	 *
	 * @see Subscription
	 */
	// util.Subscription = require('./../subscription/subscription.js')

	/**
	 * Same as new Reducer
	 * @see Reducer
	 */
	Alo.prototype.createReducer = function createReducer () {
	  var Reducer = __webpack_require__(199)
	  var reducer = Object.create(Reducer.prototype)
	  Reducer.apply(reducer, arguments)
	  return reducer
	}

	/**
	 * Instanceof check for reducers
	 *
	 * @param {*} reducer Argument to check if it is a reducer
	 *
	 * @return {boolean} true of it is a reducer, false in the other case
	 */
	Alo.prototype.isReducer = function isReducer (reducer) {
	  var Reducer = __webpack_require__(199)
	  return (reducer instanceof Reducer)
	}

	/**
	 * Same as new Store
	 * @see Store
	 */
	Alo.prototype.createStore = function createStore () {
	  var Store = __webpack_require__(200)
	  var store = Object.create(Store.prototype)
	  Store.apply(store, arguments)
	  return store
	}

	/**
	 * Instanceof check for stores
	 *
	 * @param {*} store Argument to check if it is a store
	 *
	 * @return {boolean} true of it is a store, false in the other case
	 */
	Alo.prototype.isStore = function isStore (store) {
	  var Store = __webpack_require__(200)
	  return (store instanceof Store)
	}

	Alo.prototype.isMiddleware = function isMiddleware (middleware) {
	  var Middleware = __webpack_require__(201)
	  return (middleware instanceof Middleware)
	}

	module.exports = Alo


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Several utility functions / libs used by alo
	 *
	 * Some of this functions / libs might change over time: Please read the description of the specific function / lib.
	 *
	 */
	var Util = function () {}

	// Library functions
	// Lodash
	/**
	 * Lodash cloneDeep, can be used
	 *
	 * @function
	 */
	Util.prototype.cloneDeep = __webpack_require__(3)

	Util.prototype.filter = __webpack_require__(114)

	/**
	 * Lodash values, can be used
	 *
	 * @function
	 */
	Util.prototype.values = __webpack_require__(158)

	/**
	 * Lodash forEach, can be used
	 *
	 * @function
	 */
	Util.prototype.forEach = __webpack_require__(160)

	/**
	 * Lodash isFunction, can be used
	 *
	 * @function
	 */
	Util.prototype.isFunction = __webpack_require__(22)

	/**
	 * Lodash isString, can be used
	 *
	 * @function
	 */
	Util.prototype.isString = __webpack_require__(162)

	/**
	 * Lodash isObject, can be used
	 *
	 * @function
	 */
	Util.prototype.isObject = __webpack_require__(29)

	Util.prototype.merge = __webpack_require__(163)

	/**
	 * Lodash isEqual, can be used
	 *
	 * @function
	 */
	Util.prototype.isEqual = __webpack_require__(179)

	/**
	 * Lodash isPlainObject, can be used
	 *
	 * @function
	 */
	Util.prototype.isPlainObject = __webpack_require__(168)

	/**
	 * Lodash isArray, can be used
	 *
	 * @function
	 */
	Util.prototype.isArray = __webpack_require__(61)

	/**
	 * Lodash isBoolean, can be used
	 *
	 * @function
	 */
	Util.prototype.isBoolean = __webpack_require__(180)

	/**
	 * Lodash uniqueId, can be used
	 *
	 * @function
	 */
	Util.prototype.uniqueId = __webpack_require__(181)

	Util.prototype.toPairs = __webpack_require__(182)

	var flyd = __webpack_require__(186)
	/**
	 * Flyd stream: Might change!
	 *
	 * @function
	 */
	Util.prototype.createStream = flyd.stream

	/**
	 * Flyd stream: Might change!
	 *
	 * @function
	 */
	Util.prototype.combineStreams = flyd.combine

	/**
	 * Flyd isStream: Might change!
	 *
	 * @function
	 */
	Util.prototype.isStream = flyd.isStream

	/**
	 * Flyd immediate: Might change!
	 *
	 * @function
	 */
	Util.prototype.immediateStream = flyd.immediate

	/**
	 * Flyd endsOn: Might change!
	 *
	 * @function
	 */
	Util.prototype.streamEndsOn = flyd.endsOn

	/**
	 * Flyd map: Might change!
	 *
	 * @function
	 */
	Util.prototype.mapStream = flyd.map

	/**
	 * Flyd on: Might change!
	 *
	 * @function
	 */
	Util.prototype.streamOn = flyd.on

	/**
	 * Flyd scan: Might change!
	 *
	 * @function
	 */
	Util.prototype.scanStream = flyd.scan

	/**
	 * Flyd merge: Might change!
	 *
	 * @function
	 */
	Util.prototype.mergeStream = flyd.merge

	/**
	 * Flyd transduce: Might change!
	 *
	 * @function
	 */
	Util.prototype.transduceStream = flyd.transduce

	/**
	 * Flyd curryN: Might change!
	 *
	 * @function
	 */
	Util.prototype.curryN = flyd.curryN

	/**
	 * Polymorphic helper: Might change!
	 *
	 * @function
	 */
	Util.prototype.createPolymorphic = __webpack_require__(193)

	Util.prototype.Promise = __webpack_require__(194)

	Util.prototype.createPromise = function createPromise (resolve, reject) {
	  return new this.Promise(resolve, reject)
	}

	/**
	 * Same as new Alo
	 * @see Alo
	 */
	Util.prototype.createAlo = function createAlo () {
	  var Alo = __webpack_require__(1)
	  var alo = Object.create(Alo.prototype)
	  Alo.apply(alo, arguments)
	  return alo
	}

	Util.prototype.createObjectRelation = function createObjectRelation () {
	  var ObjectRelation = __webpack_require__(195)
	  var objectRelation = Object.create(ObjectRelation.prototype)
	  ObjectRelation.apply(objectRelation, arguments)
	  return objectRelation
	}

	module.exports = Util


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(4);

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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(5),
	    arrayEach = __webpack_require__(49),
	    assignValue = __webpack_require__(50),
	    baseAssign = __webpack_require__(53),
	    baseAssignIn = __webpack_require__(76),
	    cloneBuffer = __webpack_require__(80),
	    copyArray = __webpack_require__(81),
	    copySymbols = __webpack_require__(82),
	    copySymbolsIn = __webpack_require__(85),
	    getAllKeys = __webpack_require__(89),
	    getAllKeysIn = __webpack_require__(91),
	    getTag = __webpack_require__(92),
	    initCloneArray = __webpack_require__(97),
	    initCloneByTag = __webpack_require__(98),
	    initCloneObject = __webpack_require__(112),
	    isArray = __webpack_require__(61),
	    isBuffer = __webpack_require__(62),
	    isObject = __webpack_require__(29),
	    keys = __webpack_require__(55);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(6),
	    stackClear = __webpack_require__(14),
	    stackDelete = __webpack_require__(15),
	    stackGet = __webpack_require__(16),
	    stackHas = __webpack_require__(17),
	    stackSet = __webpack_require__(18);

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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(7),
	    listCacheDelete = __webpack_require__(8),
	    listCacheGet = __webpack_require__(11),
	    listCacheHas = __webpack_require__(12),
	    listCacheSet = __webpack_require__(13);

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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(9);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(10);

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
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(9);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(9);

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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(9);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(6);

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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(6),
	    Map = __webpack_require__(19),
	    MapCache = __webpack_require__(34);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(20),
	    root = __webpack_require__(25);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(21),
	    getValue = __webpack_require__(33);

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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(22),
	    isMasked = __webpack_require__(30),
	    isObject = __webpack_require__(29),
	    toSource = __webpack_require__(32);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(23),
	    isObject = __webpack_require__(29);

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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24),
	    getRawTag = __webpack_require__(27),
	    objectToString = __webpack_require__(28);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(25);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(26);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24);

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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(31);

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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(25);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(35),
	    mapCacheDelete = __webpack_require__(43),
	    mapCacheGet = __webpack_require__(46),
	    mapCacheHas = __webpack_require__(47),
	    mapCacheSet = __webpack_require__(48);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(36),
	    ListCache = __webpack_require__(6),
	    Map = __webpack_require__(19);

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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(37),
	    hashDelete = __webpack_require__(39),
	    hashGet = __webpack_require__(40),
	    hashHas = __webpack_require__(41),
	    hashSet = __webpack_require__(42);

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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(38);

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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(20);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(38);

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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(38);

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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(38);

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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(44);

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(45);

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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(44);

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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(44);

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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(44);

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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(51),
	    eq = __webpack_require__(10);

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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(52);

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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(20);

	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	module.exports = defineProperty;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(54),
	    keys = __webpack_require__(55);

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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(50),
	    baseAssignValue = __webpack_require__(51);

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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(56),
	    baseKeys = __webpack_require__(71),
	    isArrayLike = __webpack_require__(75);

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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(57),
	    isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(61),
	    isBuffer = __webpack_require__(62),
	    isIndex = __webpack_require__(65),
	    isTypedArray = __webpack_require__(66);

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
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(59),
	    isObjectLike = __webpack_require__(60);

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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(23),
	    isObjectLike = __webpack_require__(60);

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
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(25),
	    stubFalse = __webpack_require__(64);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ },
/* 63 */
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
/* 64 */
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
/* 65 */
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(67),
	    baseUnary = __webpack_require__(69),
	    nodeUtil = __webpack_require__(70);

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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(23),
	    isLength = __webpack_require__(68),
	    isObjectLike = __webpack_require__(60);

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
/* 68 */
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
/* 69 */
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(26);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(72),
	    nativeKeys = __webpack_require__(73);

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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(74);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(22),
	    isLength = __webpack_require__(68);

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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(54),
	    keysIn = __webpack_require__(77);

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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(56),
	    baseKeysIn = __webpack_require__(78),
	    isArrayLike = __webpack_require__(75);

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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29),
	    isPrototype = __webpack_require__(72),
	    nativeKeysIn = __webpack_require__(79);

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
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(25);

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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)(module)))

/***/ },
/* 81 */
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(54),
	    getSymbols = __webpack_require__(83);

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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(74),
	    stubArray = __webpack_require__(84);

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
/* 84 */
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(54),
	    getSymbolsIn = __webpack_require__(86);

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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(87),
	    getPrototype = __webpack_require__(88),
	    getSymbols = __webpack_require__(83),
	    stubArray = __webpack_require__(84);

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
/* 87 */
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(74);

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	module.exports = getPrototype;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(90),
	    getSymbols = __webpack_require__(83),
	    keys = __webpack_require__(55);

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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(87),
	    isArray = __webpack_require__(61);

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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(90),
	    getSymbolsIn = __webpack_require__(86),
	    keysIn = __webpack_require__(77);

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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(93),
	    Map = __webpack_require__(19),
	    Promise = __webpack_require__(94),
	    Set = __webpack_require__(95),
	    WeakMap = __webpack_require__(96),
	    baseGetTag = __webpack_require__(23),
	    toSource = __webpack_require__(32);

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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(20),
	    root = __webpack_require__(25);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(20),
	    root = __webpack_require__(25);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(20),
	    root = __webpack_require__(25);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(20),
	    root = __webpack_require__(25);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 97 */
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(99),
	    cloneDataView = __webpack_require__(101),
	    cloneMap = __webpack_require__(102),
	    cloneRegExp = __webpack_require__(106),
	    cloneSet = __webpack_require__(107),
	    cloneSymbol = __webpack_require__(110),
	    cloneTypedArray = __webpack_require__(111);

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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var Uint8Array = __webpack_require__(100);

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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(25);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(99);

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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var addMapEntry = __webpack_require__(103),
	    arrayReduce = __webpack_require__(104),
	    mapToArray = __webpack_require__(105);

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
/* 103 */
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
/* 104 */
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
/* 105 */
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
/* 106 */
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var addSetEntry = __webpack_require__(108),
	    arrayReduce = __webpack_require__(104),
	    setToArray = __webpack_require__(109);

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
/* 108 */
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
/* 109 */
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24);

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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var cloneArrayBuffer = __webpack_require__(99);

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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var baseCreate = __webpack_require__(113),
	    getPrototype = __webpack_require__(88),
	    isPrototype = __webpack_require__(72);

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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29);

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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(115),
	    baseFilter = __webpack_require__(116),
	    baseIteratee = __webpack_require__(122),
	    isArray = __webpack_require__(61);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(117);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(118),
	    createBaseEach = __webpack_require__(121);

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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(119),
	    keys = __webpack_require__(55);

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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(120);

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
/* 120 */
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
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(75);

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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(123),
	    baseMatchesProperty = __webpack_require__(138),
	    identity = __webpack_require__(154),
	    isArray = __webpack_require__(61),
	    property = __webpack_require__(155);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(124),
	    getMatchData = __webpack_require__(135),
	    matchesStrictComparable = __webpack_require__(137);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(5),
	    baseIsEqual = __webpack_require__(125);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(126),
	    isObject = __webpack_require__(29),
	    isObjectLike = __webpack_require__(60);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(5),
	    equalArrays = __webpack_require__(127),
	    equalByTag = __webpack_require__(133),
	    equalObjects = __webpack_require__(134),
	    getTag = __webpack_require__(92),
	    isArray = __webpack_require__(61),
	    isBuffer = __webpack_require__(62),
	    isTypedArray = __webpack_require__(66);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(128),
	    arraySome = __webpack_require__(131),
	    cacheHas = __webpack_require__(132);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(34),
	    setCacheAdd = __webpack_require__(129),
	    setCacheHas = __webpack_require__(130);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 129 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 130 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 131 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24),
	    Uint8Array = __webpack_require__(100),
	    eq = __webpack_require__(10),
	    equalArrays = __webpack_require__(127),
	    mapToArray = __webpack_require__(105),
	    setToArray = __webpack_require__(109);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var keys = __webpack_require__(55);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(136),
	    keys = __webpack_require__(55);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(29);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(125),
	    get = __webpack_require__(139),
	    hasIn = __webpack_require__(151),
	    isKey = __webpack_require__(142),
	    isStrictComparable = __webpack_require__(136),
	    matchesStrictComparable = __webpack_require__(137),
	    toKey = __webpack_require__(150);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(140);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is returned in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(141),
	    toKey = __webpack_require__(150);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = castPath(path, object);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(61),
	    isKey = __webpack_require__(142),
	    stringToPath = __webpack_require__(144),
	    toString = __webpack_require__(147);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value, object) {
	  if (isArray(value)) {
	    return value;
	  }
	  return isKey(value, object) ? [value] : stringToPath(toString(value));
	}

	module.exports = castPath;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(61),
	    isSymbol = __webpack_require__(143);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(23),
	    isObjectLike = __webpack_require__(60);

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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped = __webpack_require__(145);

	/** Used to match property names within property paths. */
	var reLeadingDot = /^\./,
	    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoizeCapped(function(string) {
	  var result = [];
	  if (reLeadingDot.test(string)) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(146);

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	module.exports = memoizeCapped;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(34);

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(148);

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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(24),
	    arrayMap = __webpack_require__(149),
	    isArray = __webpack_require__(61),
	    isSymbol = __webpack_require__(143);

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
/* 149 */
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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(143);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(152),
	    hasPath = __webpack_require__(153);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(141),
	    isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(61),
	    isIndex = __webpack_require__(65),
	    isLength = __webpack_require__(68),
	    toKey = __webpack_require__(150);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = castPath(path, object);

	  var index = -1,
	      length = path.length,
	      result = false;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result || ++index != length) {
	    return result;
	  }
	  length = object == null ? 0 : object.length;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 154 */
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
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(156),
	    basePropertyDeep = __webpack_require__(157),
	    isKey = __webpack_require__(142),
	    toKey = __webpack_require__(150);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 156 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(140);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(159),
	    keys = __webpack_require__(55);

	/**
	 * Creates an array of the own enumerable string keyed property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object == null ? [] : baseValues(object, keys(object));
	}

	module.exports = values;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(149);

	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}

	module.exports = baseValues;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(49),
	    baseEach = __webpack_require__(117),
	    castFunction = __webpack_require__(161),
	    isArray = __webpack_require__(61);

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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(154);

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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(23),
	    isArray = __webpack_require__(61),
	    isObjectLike = __webpack_require__(60);

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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(164),
	    createAssigner = __webpack_require__(170);

	/**
	 * This method is like `_.assign` except that it recursively merges own and
	 * inherited enumerable string keyed properties of source objects into the
	 * destination object. Source properties that resolve to `undefined` are
	 * skipped if a destination value exists. Array and plain object properties
	 * are merged recursively. Other objects and value types are overridden by
	 * assignment. Source objects are applied from left to right. Subsequent
	 * sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.5.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var object = {
	 *   'a': [{ 'b': 2 }, { 'd': 4 }]
	 * };
	 *
	 * var other = {
	 *   'a': [{ 'c': 3 }, { 'e': 5 }]
	 * };
	 *
	 * _.merge(object, other);
	 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
	 */
	var merge = createAssigner(function(object, source, srcIndex) {
	  baseMerge(object, source, srcIndex);
	});

	module.exports = merge;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(5),
	    assignMergeValue = __webpack_require__(165),
	    baseFor = __webpack_require__(119),
	    baseMergeDeep = __webpack_require__(166),
	    isObject = __webpack_require__(29),
	    keysIn = __webpack_require__(77);

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    if (isObject(srcValue)) {
	      stack || (stack = new Stack);
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	module.exports = baseMerge;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(51),
	    eq = __webpack_require__(10);

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	module.exports = assignMergeValue;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var assignMergeValue = __webpack_require__(165),
	    cloneBuffer = __webpack_require__(80),
	    cloneTypedArray = __webpack_require__(111),
	    copyArray = __webpack_require__(81),
	    initCloneObject = __webpack_require__(112),
	    isArguments = __webpack_require__(58),
	    isArray = __webpack_require__(61),
	    isArrayLikeObject = __webpack_require__(167),
	    isBuffer = __webpack_require__(62),
	    isFunction = __webpack_require__(22),
	    isObject = __webpack_require__(29),
	    isPlainObject = __webpack_require__(168),
	    isTypedArray = __webpack_require__(66),
	    toPlainObject = __webpack_require__(169);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = object[key],
	      srcValue = source[key],
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray(srcValue),
	        isBuff = !isArr && isBuffer(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	module.exports = baseMergeDeep;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(75),
	    isObjectLike = __webpack_require__(60);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(23),
	    getPrototype = __webpack_require__(88),
	    isObjectLike = __webpack_require__(60);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(54),
	    keysIn = __webpack_require__(77);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var baseRest = __webpack_require__(171),
	    isIterateeCall = __webpack_require__(178);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(154),
	    overRest = __webpack_require__(172),
	    setToString = __webpack_require__(174);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(173);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },
/* 173 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(175),
	    shortOut = __webpack_require__(177);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(176),
	    defineProperty = __webpack_require__(52),
	    identity = __webpack_require__(154);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },
/* 176 */
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },
/* 177 */
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(10),
	    isArrayLike = __webpack_require__(75),
	    isIndex = __webpack_require__(65),
	    isObject = __webpack_require__(29);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(125);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are **not** supported.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}

	module.exports = isEqual;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(23),
	    isObjectLike = __webpack_require__(60);

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
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(147);

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
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var createToPairs = __webpack_require__(183),
	    keys = __webpack_require__(55);

	/**
	 * Creates an array of own enumerable string keyed-value pairs for `object`
	 * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
	 * entries are returned.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias entries
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	var toPairs = createToPairs(keys);

	module.exports = toPairs;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(184),
	    getTag = __webpack_require__(92),
	    mapToArray = __webpack_require__(105),
	    setToPairs = __webpack_require__(185);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/**
	 * Creates a `_.toPairs` or `_.toPairsIn` function.
	 *
	 * @private
	 * @param {Function} keysFunc The function to get the keys of a given object.
	 * @returns {Function} Returns the new pairs function.
	 */
	function createToPairs(keysFunc) {
	  return function(object) {
	    var tag = getTag(object);
	    if (tag == mapTag) {
	      return mapToArray(object);
	    }
	    if (tag == setTag) {
	      return setToPairs(object);
	    }
	    return baseToPairs(object, keysFunc(object));
	  };
	}

	module.exports = createToPairs;


/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(149);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}

	module.exports = baseToPairs;


/***/ },
/* 185 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to its value-value pairs.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the value-value pairs.
	 */
	function setToPairs(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = [value, value];
	  });
	  return result;
	}

	module.exports = setToPairs;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var curryN = __webpack_require__(187);

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
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(188);
	var _curry1 = __webpack_require__(189);
	var _curry2 = __webpack_require__(191);
	var _curryN = __webpack_require__(192);


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
/* 188 */
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
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var _isPlaceholder = __webpack_require__(190);


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
/* 190 */
/***/ function(module, exports) {

	module.exports = function _isPlaceholder(a) {
	  return a != null &&
	         typeof a === 'object' &&
	         a['@@functional/placeholder'] === true;
	};


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(189);
	var _isPlaceholder = __webpack_require__(190);


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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	var _arity = __webpack_require__(188);
	var _isPlaceholder = __webpack_require__(190);


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
/* 193 */
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
/* 194 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 Yaku v0.16.7
	 (c) 2015 Yad Smood. http://ysmood.org
	 License MIT
	*/
	(function () {
	    "use strict";

	    var $undefined
	    , $null = null
	    , root = typeof window === "object" ? window : global
	    , isLongStackTrace = false
	    , process = root.process
	    , Arr = Array
	    , Err = Error

	    , $rejected = 0
	    , $resolved = 1
	    , $pending = 2

	    , $Symbol = "Symbol"
	    , $iterator = "iterator"
	    , $species = "species"
	    , $speciesKey = $Symbol + "(" + $species + ")"
	    , $return = "return"

	    , $unhandled = "_uh"
	    , $promiseTrace = "_pt"
	    , $settlerTrace = "_st"

	    , $invalidThis = "Invalid this"
	    , $invalidArgument = "Invalid argument"
	    , $fromPrevious = "\nFrom previous "
	    , $promiseCircularChain = "Chaining cycle detected for promise"
	    , $unhandledRejectionMsg = "Uncaught (in promise)"
	    , $rejectionHandled = "rejectionHandled"
	    , $unhandledRejection = "unhandledRejection"

	    , $tryCatchFn
	    , $tryCatchThis
	    , $tryErr = { e: $null }
	    , $noop = function () {}
	    , $cleanStackReg = /^.+\/node_modules\/yaku\/.+\n?/mg
	    ;

	    /**
	     * This class follows the [Promises/A+](https://promisesaplus.com) and
	     * [ES6](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) spec
	     * with some extra helpers.
	     * @param  {Function} executor Function object with two arguments resolve, reject.
	     * The first argument fulfills the promise, the second argument rejects it.
	     * We can call these functions, once our operation is completed.
	     */
	    var Yaku = module.exports = function Promise (executor) {
	        var self = this,
	            err;

	        // "this._s" is the internal state of: pending, resolved or rejected
	        // "this._v" is the internal value

	        if (!isObject(self) || self._s !== $undefined)
	            throw genTypeError($invalidThis);

	        self._s = $pending;

	        if (isLongStackTrace) self[$promiseTrace] = genTraceInfo();

	        if (executor !== $noop) {
	            if (!isFunction(executor))
	                throw genTypeError($invalidArgument);

	            err = genTryCatcher(executor)(
	                genSettler(self, $resolved),
	                genSettler(self, $rejected)
	            );

	            if (err === $tryErr)
	                settlePromise(self, $rejected, err.e);
	        }
	    };

	    Yaku["default"] = Yaku;

	    extendPrototype(Yaku, {
	        /**
	         * Appends fulfillment and rejection handlers to the promise,
	         * and returns a new promise resolving to the return value of the called handler.
	         * @param  {Function} onFulfilled Optional. Called when the Promise is resolved.
	         * @param  {Function} onRejected  Optional. Called when the Promise is rejected.
	         * @return {Yaku} It will return a new Yaku which will resolve or reject after
	         * @example
	         * the current Promise.
	         * ```js
	         * var Promise = require('yaku');
	         * var p = Promise.resolve(10);
	         *
	         * p.then((v) => {
	         *     console.log(v);
	         * });
	         * ```
	         */
	        then: function then (onFulfilled, onRejected) {
	            if (this._s === undefined) throw genTypeError();

	            return addHandler(
	                this,
	                newCapablePromise(Yaku.speciesConstructor(this, Yaku)),
	                onFulfilled,
	                onRejected
	            );
	        },

	        /**
	         * The `catch()` method returns a Promise and deals with rejected cases only.
	         * It behaves the same as calling `Promise.prototype.then(undefined, onRejected)`.
	         * @param  {Function} onRejected A Function called when the Promise is rejected.
	         * This function has one argument, the rejection reason.
	         * @return {Yaku} A Promise that deals with rejected cases only.
	         * @example
	         * ```js
	         * var Promise = require('yaku');
	         * var p = Promise.reject(new Error("ERR"));
	         *
	         * p['catch']((v) => {
	         *     console.log(v);
	         * });
	         * ```
	         */
	        "catch": function (onRejected) {
	            return this.then($undefined, onRejected);
	        },

	        // The number of current promises that attach to this Yaku instance.
	        _pCount: 0,

	        // The parent Yaku.
	        _pre: $null,

	        // A unique type flag, it helps different versions of Yaku know each other.
	        _Yaku: 1
	    });

	    /**
	     * The `Promise.resolve(value)` method returns a Promise object that is resolved with the given value.
	     * If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable,
	     * adopting its eventual state; otherwise the returned promise will be fulfilled with the value.
	     * @param  {Any} value Argument to be resolved by this Promise.
	     * Can also be a Promise or a thenable to resolve.
	     * @return {Yaku}
	     * @example
	     * ```js
	     * var Promise = require('yaku');
	     * var p = Promise.resolve(10);
	     * ```
	     */
	    Yaku.resolve = function resolve (val) {
	        return isYaku(val) ? val : settleWithX(newCapablePromise(this), val);
	    };

	    /**
	     * The `Promise.reject(reason)` method returns a Promise object that is rejected with the given reason.
	     * @param  {Any} reason Reason why this Promise rejected.
	     * @return {Yaku}
	     * @example
	     * ```js
	     * var Promise = require('yaku');
	     * var p = Promise.reject(new Error("ERR"));
	     * ```
	     */
	    Yaku.reject = function reject (reason) {
	        return settlePromise(newCapablePromise(this), $rejected, reason);
	    };

	    /**
	     * The `Promise.race(iterable)` method returns a promise that resolves or rejects
	     * as soon as one of the promises in the iterable resolves or rejects,
	     * with the value or reason from that promise.
	     * @param  {iterable} iterable An iterable object, such as an Array.
	     * @return {Yaku} The race function returns a Promise that is settled
	     * the same way as the first passed promise to settle.
	     * It resolves or rejects, whichever happens first.
	     * @example
	     * ```js
	     * var Promise = require('yaku');
	     * Promise.race([
	     *     123,
	     *     Promise.resolve(0)
	     * ])
	     * .then((value) => {
	     *     console.log(value); // => 123
	     * });
	     * ```
	     */
	    Yaku.race = function race (iterable) {
	        var self = this
	        , p = newCapablePromise(self)

	        , resolve = function (val) {
	            settlePromise(p, $resolved, val);
	        }

	        , reject = function (val) {
	            settlePromise(p, $rejected, val);
	        }

	        , ret = genTryCatcher(each)(iterable, function (v) {
	            self.resolve(v).then(resolve, reject);
	        });

	        if (ret === $tryErr) return self.reject(ret.e);

	        return p;
	    };

	    /**
	     * The `Promise.all(iterable)` method returns a promise that resolves when
	     * all of the promises in the iterable argument have resolved.
	     *
	     * The result is passed as an array of values from all the promises.
	     * If something passed in the iterable array is not a promise,
	     * it's converted to one by Promise.resolve. If any of the passed in promises rejects,
	     * the all Promise immediately rejects with the value of the promise that rejected,
	     * discarding all the other promises whether or not they have resolved.
	     * @param  {iterable} iterable An iterable object, such as an Array.
	     * @return {Yaku}
	     * @example
	     * ```js
	     * var Promise = require('yaku');
	     * Promise.all([
	     *     123,
	     *     Promise.resolve(0)
	     * ])
	     * .then((values) => {
	     *     console.log(values); // => [123, 0]
	     * });
	     * ```
	     * @example
	     * Use with iterable.
	     * ```js
	     * var Promise = require('yaku');
	     * Promise.all((function * () {
	     *     yield 10;
	     *     yield new Promise(function (r) { setTimeout(r, 1000, "OK") });
	     * })())
	     * .then((values) => {
	     *     console.log(values); // => [123, 0]
	     * });
	     * ```
	     */
	    Yaku.all = function all (iterable) {
	        var self = this
	        , p1 = newCapablePromise(self)
	        , res = []
	        , ret
	        ;

	        function reject (reason) {
	            settlePromise(p1, $rejected, reason);
	        }

	        ret = genTryCatcher(each)(iterable, function (item, i) {
	            self.resolve(item).then(function (value) {
	                res[i] = value;
	                if (!--ret) settlePromise(p1, $resolved, res);
	            }, reject);
	        });

	        if (ret === $tryErr) return self.reject(ret.e);

	        if (!ret) settlePromise(p1, $resolved, []);

	        return p1;
	    };

	    /**
	     * The ES6 Symbol object that Yaku should use, by default it will use the
	     * global one.
	     * @type {Object}
	     * @example
	     * ```js
	     * var core = require("core-js/library");
	     * var Promise = require("yaku");
	     * Promise.Symbol = core.Symbol;
	     * ```
	     */
	    Yaku.Symbol = root[$Symbol] || {};

	    // To support browsers that don't support `Object.defineProperty`.
	    genTryCatcher(function () {
	        Object.defineProperty(Yaku, getSpecies(), {
	            get: function () { return this; }
	        });
	    })();

	    /**
	     * Use this api to custom the species behavior.
	     * https://tc39.github.io/ecma262/#sec-speciesconstructor
	     * @param {Any} O The current this object.
	     * @param {Function} defaultConstructor
	     */
	    Yaku.speciesConstructor = function (O, D) {
	        var C = O.constructor;

	        return C ? (C[getSpecies()] || D) : D;
	    };

	    /**
	     * Catch all possibly unhandled rejections. If you want to use specific
	     * format to display the error stack, overwrite it.
	     * If it is set, auto `console.error` unhandled rejection will be disabled.
	     * @param {Any} reason The rejection reason.
	     * @param {Yaku} p The promise that was rejected.
	     * @example
	     * ```js
	     * var Promise = require('yaku');
	     * Promise.onUnhandledRejection = (reason) => {
	     *     console.error(reason);
	     * };
	     *
	     * // The console will log an unhandled rejection error message.
	     * Promise.reject('my reason');
	     *
	     * // The below won't log the unhandled rejection error message.
	     * Promise.reject('v').catch(() => {});
	     * ```
	     */
	    Yaku.unhandledRejection = function (reason, p) {
	        try {
	            root.console.error(
	                $unhandledRejectionMsg,
	                isLongStackTrace ? p.longStack : genStackInfo(reason, p)
	            );
	        } catch (e) {} // eslint-disable-line
	    };

	    /**
	     * Emitted whenever a Promise was rejected and an error handler was
	     * attached to it (for example with `.catch()`) later than after an event loop turn.
	     * @param {Any} reason The rejection reason.
	     * @param {Yaku} p The promise that was rejected.
	     */
	    Yaku.rejectionHandled = $noop;

	    /**
	     * It is used to enable the long stack trace.
	     * Once it is enabled, it can't be reverted.
	     * While it is very helpful in development and testing environments,
	     * it is not recommended to use it in production. It will slow down
	     * application and eat up memory.
	     * It will add an extra property `longStack` to the Error object.
	     * @example
	     * ```js
	     * var Promise = require('yaku');
	     * Promise.enableLongStackTrace();
	     * Promise.reject(new Error("err")).catch((err) => {
	     *     console.log(err.longStack);
	     * });
	     * ```
	     */
	    Yaku.enableLongStackTrace = function () {
	        isLongStackTrace = true;
	    };

	    /**
	     * Only Node has `process.nextTick` function. For browser there are
	     * so many ways to polyfill it. Yaku won't do it for you, instead you
	     * can choose what you prefer. For example, this project
	     * [setImmediate](https://github.com/YuzuJS/setImmediate).
	     * By default, Yaku will use `process.nextTick` on Node, `setTimeout` on browser.
	     * @type {Function}
	     * @example
	     * ```js
	     * var Promise = require('yaku');
	     * Promise.nextTick = fn => window.setImmediate(fn);
	     * ```
	     * @example
	     * You can even use sync resolution if you really know what you are doing.
	     * ```js
	     * var Promise = require('yaku');
	     * Promise.nextTick = fn => fn();
	     * ```
	     */
	    Yaku.nextTick = process ?
	        process.nextTick :
	        function (fn) { setTimeout(fn); };

	    // ********************** Private **********************

	    Yaku._Yaku = 1;

	    /**
	     * All static variable name will begin with `$`. Such as `$rejected`.
	     * @private
	     */

	    // ******************************* Utils ********************************

	    function getSpecies () {
	        return Yaku[$Symbol][$species] || $speciesKey;
	    }

	    function extendPrototype (src, target) {
	        for (var k in target) {
	            src.prototype[k] = target[k];
	        }
	        return src;
	    }

	    function isObject (obj) {
	        return obj && typeof obj === "object";
	    }

	    function isFunction (obj) {
	        return typeof obj === "function";
	    }

	    function isInstanceOf (a, b) {
	        return a instanceof b;
	    }

	    function isError (obj) {
	        return isInstanceOf(obj, Err);
	    }

	    function ensureType (obj, fn, msg) {
	        if (!fn(obj)) throw genTypeError(msg);
	    }

	    /**
	     * Wrap a function into a try-catch.
	     * @private
	     * @return {Any | $tryErr}
	     */
	    function tryCatcher () {
	        try {
	            return $tryCatchFn.apply($tryCatchThis, arguments);
	        } catch (e) {
	            $tryErr.e = e;
	            return $tryErr;
	        }
	    }

	    /**
	     * Generate a try-catch wrapped function.
	     * @private
	     * @param  {Function} fn
	     * @return {Function}
	     */
	    function genTryCatcher (fn, self) {
	        $tryCatchFn = fn;
	        $tryCatchThis = self;
	        return tryCatcher;
	    }

	    /**
	     * Generate a scheduler.
	     * @private
	     * @param  {Integer}  initQueueSize
	     * @param  {Function} fn `(Yaku, Value) ->` The schedule handler.
	     * @return {Function} `(Yaku, Value) ->` The scheduler.
	     */
	    function genScheduler (initQueueSize, fn) {
	        /**
	         * All async promise will be scheduled in
	         * here, so that they can be execute on the next tick.
	         * @private
	         */
	        var fnQueue = Arr(initQueueSize)
	        , fnQueueLen = 0;

	        /**
	         * Run all queued functions.
	         * @private
	         */
	        function flush () {
	            var i = 0;
	            while (i < fnQueueLen) {
	                fn(fnQueue[i], fnQueue[i + 1]);
	                fnQueue[i++] = $undefined;
	                fnQueue[i++] = $undefined;
	            }

	            fnQueueLen = 0;
	            if (fnQueue.length > initQueueSize) fnQueue.length = initQueueSize;
	        }

	        return function (v, arg) {
	            fnQueue[fnQueueLen++] = v;
	            fnQueue[fnQueueLen++] = arg;

	            if (fnQueueLen === 2) Yaku.nextTick(flush);
	        };
	    }

	    /**
	     * Generate a iterator
	     * @param  {Any} obj
	     * @private
	     * @return {Object || TypeError}
	     */
	    function each (iterable, fn) {
	        var len
	        , i = 0
	        , iter
	        , item
	        , ret
	        ;

	        if (!iterable) throw genTypeError($invalidArgument);

	        var gen = iterable[Yaku[$Symbol][$iterator]];
	        if (isFunction(gen))
	            iter = gen.call(iterable);
	        else if (isFunction(iterable.next)) {
	            iter = iterable;
	        }
	        else if (isInstanceOf(iterable, Arr)) {
	            len = iterable.length;
	            while (i < len) {
	                fn(iterable[i], i++);
	            }
	            return i;
	        } else
	            throw genTypeError($invalidArgument);

	        while (!(item = iter.next()).done) {
	            ret = genTryCatcher(fn)(item.value, i++);
	            if (ret === $tryErr) {
	                isFunction(iter[$return]) && iter[$return]();
	                throw ret.e;
	            }
	        }

	        return i;
	    }

	    /**
	     * Generate type error object.
	     * @private
	     * @param  {String} msg
	     * @return {TypeError}
	     */
	    function genTypeError (msg) {
	        return new TypeError(msg);
	    }

	    function genTraceInfo (noTitle) {
	        return (noTitle ? "" : $fromPrevious) + new Err().stack;
	    }


	    // *************************** Promise Helpers ****************************

	    /**
	     * Resolve the value returned by onFulfilled or onRejected.
	     * @private
	     * @param {Yaku} p1
	     * @param {Yaku} p2
	     */
	    var scheduleHandler = genScheduler(999, function (p1, p2) {
	        var x, handler;

	        // 2.2.2
	        // 2.2.3
	        handler = p1._s ? p2._onFulfilled : p2._onRejected;

	        // 2.2.7.3
	        // 2.2.7.4
	        if (handler === $undefined) {
	            settlePromise(p2, p1._s, p1._v);
	            return;
	        }

	        // 2.2.7.1
	        x = genTryCatcher(callHanler)(handler, p1._v);
	        if (x === $tryErr) {
	            // 2.2.7.2
	            settlePromise(p2, $rejected, x.e);
	            return;
	        }

	        settleWithX(p2, x);
	    });

	    var scheduleUnhandledRejection = genScheduler(9, function (p) {
	        if (!hashOnRejected(p)) {
	            p[$unhandled] = 1;
	            emitEvent($unhandledRejection, p);
	        }
	    });

	    function emitEvent (name, p) {
	        var browserEventName = "on" + name.toLowerCase()
	            , browserHandler = root[browserEventName];

	        if (process && process.listeners(name).length)
	            name === $unhandledRejection ?
	                process.emit(name, p._v, p) : process.emit(name, p);
	        else if (browserHandler)
	            browserHandler({ reason: p._v, promise: p });
	        else
	            Yaku[name](p._v, p);
	    }

	    function isYaku (val) { return val && val._Yaku; }

	    function newCapablePromise (Constructor) {
	        if (isYaku(Constructor)) return new Constructor($noop);

	        var p, r, j;
	        p = new Constructor(function (resolve, reject) {
	            if (p) throw genTypeError();

	            r = resolve;
	            j = reject;
	        });

	        ensureType(r, isFunction);
	        ensureType(j, isFunction);

	        return p;
	    }

	    /**
	     * It will produce a settlePromise function to user.
	     * Such as the resolve and reject in this `new Yaku (resolve, reject) ->`.
	     * @private
	     * @param  {Yaku} self
	     * @param  {Integer} state The value is one of `$pending`, `$resolved` or `$rejected`.
	     * @return {Function} `(value) -> undefined` A resolve or reject function.
	     */
	    function genSettler (self, state) {
	        return function (value) {
	            if (isLongStackTrace)
	                self[$settlerTrace] = genTraceInfo(true);

	            if (state === $resolved)
	                settleWithX(self, value);
	            else
	                settlePromise(self, state, value);
	        };
	    }

	    /**
	     * Link the promise1 to the promise2.
	     * @private
	     * @param {Yaku} p1
	     * @param {Yaku} p2
	     * @param {Function} onFulfilled
	     * @param {Function} onRejected
	     */
	    function addHandler (p1, p2, onFulfilled, onRejected) {
	        // 2.2.1
	        if (isFunction(onFulfilled))
	            p2._onFulfilled = onFulfilled;
	        if (isFunction(onRejected)) {
	            if (p1[$unhandled]) emitEvent($rejectionHandled, p1);

	            p2._onRejected = onRejected;
	        }

	        if (isLongStackTrace) p2._pre = p1;
	        p1[p1._pCount++] = p2;

	        // 2.2.6
	        if (p1._s !== $pending)
	            scheduleHandler(p1, p2);

	        // 2.2.7
	        return p2;
	    }

	    // iterate tree
	    function hashOnRejected (node) {
	        // A node shouldn't be checked twice.
	        if (node._umark)
	            return true;
	        else
	            node._umark = true;

	        var i = 0
	        , len = node._pCount
	        , child;

	        while (i < len) {
	            child = node[i++];
	            if (child._onRejected || hashOnRejected(child)) return true;
	        }
	    }

	    function genStackInfo (reason, p) {
	        var stackInfo = [];

	        function push (trace) {
	            return stackInfo.push(trace.replace(/^\s+|\s+$/g, ""));
	        }

	        if (isLongStackTrace) {
	            if (p[$settlerTrace])
	                push(p[$settlerTrace]);

	            // Hope you guys could understand how the back trace works.
	            // We only have to iterate through the tree from the bottom to root.
	            (function iter (node) {
	                if (node && $promiseTrace in node) {
	                    iter(node._next);
	                    push(node[$promiseTrace] + "");
	                    iter(node._pre);
	                }
	            })(p);
	        }

	        return (reason && reason.stack ? reason.stack : reason) +
	            ("\n" + stackInfo.join("\n")).replace($cleanStackReg, "");
	    }

	    function callHanler (handler, value) {
	        // 2.2.5
	        return handler(value);
	    }

	    /**
	     * Resolve or reject a promise.
	     * @private
	     * @param  {Yaku} p
	     * @param  {Integer} state
	     * @param  {Any} value
	     */
	    function settlePromise (p, state, value) {
	        var i = 0
	        , len = p._pCount;

	        // 2.1.2
	        // 2.1.3
	        if (p._s === $pending) {
	            // 2.1.1.1
	            p._s = state;
	            p._v = value;

	            if (state === $rejected) {
	                if (isLongStackTrace && isError(value)) {
	                    value.longStack = genStackInfo(value, p);
	                }

	                scheduleUnhandledRejection(p);
	            }

	            // 2.2.4
	            while (i < len) {
	                scheduleHandler(p, p[i++]);
	            }
	        }

	        return p;
	    }

	    /**
	     * Resolve or reject promise with value x. The x can also be a thenable.
	     * @private
	     * @param {Yaku} p
	     * @param {Any | Thenable} x A normal value or a thenable.
	     */
	    function settleWithX (p, x) {
	        // 2.3.1
	        if (x === p && x) {
	            settlePromise(p, $rejected, genTypeError($promiseCircularChain));
	            return p;
	        }

	        // 2.3.2
	        // 2.3.3
	        if (x !== $null && (isFunction(x) || isObject(x))) {
	            // 2.3.2.1
	            var xthen = genTryCatcher(getThen)(x);

	            if (xthen === $tryErr) {
	                // 2.3.3.2
	                settlePromise(p, $rejected, xthen.e);
	                return p;
	            }

	            if (isFunction(xthen)) {
	                if (isLongStackTrace && isYaku(x))
	                    p._next = x;

	                // Fix https://bugs.chromium.org/p/v8/issues/detail?id=4162
	                if (isYaku(x))
	                    settleXthen(p, x, xthen);
	                else
	                    Yaku.nextTick(function () {
	                        settleXthen(p, x, xthen);
	                    });
	            } else
	                // 2.3.3.4
	                settlePromise(p, $resolved, x);
	        } else
	            // 2.3.4
	            settlePromise(p, $resolved, x);

	        return p;
	    }

	    /**
	     * Try to get a promise's then method.
	     * @private
	     * @param  {Thenable} x
	     * @return {Function}
	     */
	    function getThen (x) { return x.then; }

	    /**
	     * Resolve then with its promise.
	     * @private
	     * @param  {Yaku} p
	     * @param  {Thenable} x
	     * @param  {Function} xthen
	     */
	    function settleXthen (p, x, xthen) {
	        // 2.3.3.3
	        var err = genTryCatcher(xthen, x)(function (y) {
	            // 2.3.3.3.3
	            // 2.3.3.3.1
	            x && (x = $null, settleWithX(p, y));
	        }, function (r) {
	            // 2.3.3.3.3
	            // 2.3.3.3.2
	            x && (x = $null, settlePromise(p, $rejected, r));
	        });

	        // 2.3.3.3.4.1
	        if (err === $tryErr && x) {
	            // 2.3.3.3.4.2
	            settlePromise(p, $rejected, err.e);
	            x = $null;
	        }
	    }

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2)
	var u = new Util()

	var functions = {
	  get: {
	    relation: true
	  },
	  add: {
	    relation: true
	  },
	  remove: {
	    relation: true
	  },
	  getId: {}
	}

	var formatFunctionName = function (action, name) {
	  name = name.split('')
	  name[0] = name[0].toUpperCase()
	  name = name.join('')
	  return action + name
	}

	var ObjectRelation = function ObjectRelation () {
	  objectRelation.apply(this, arguments)
	}
	var objectRelation = u.createPolymorphic()
	objectRelation.signature('string, string, function', function (parentName, relationName, isRelationObject) {
	  var self = this
	  if (parentName === '' || relationName === '') {
	    throw new Error('Argument given should not be empty')
	  } else {
	    this.idPropertyName = '_id'
	    this.parentName = parentName
	    this.relationName = relationName
	    this.relationByIdPropertyName = '_' + relationName + 'RelationsById'
	    this.relationPropertyName = '_' + relationName + 'Relations'
	    this.isRelationObject = isRelationObject

	    this.functions = {}
	    u.forEach(functions, function (func, funcName) {
	      self.functions[funcName] = {
	        after: []
	      }
	      if (func.relation === true) {
	        self.functions[funcName].parentName = formatFunctionName(funcName, parentName)
	        self.functions[funcName].relationName = formatFunctionName(funcName, relationName)
	      }
	    })
	  }
	})

	/**
	 * Should be called in the constructor of the parent
	 */
	ObjectRelation.prototype.constructParent = function (parentObject) {
	  if (parentObject[this.idPropertyName] === null || parentObject[this.idPropertyName] === undefined) {
	    var id = u.uniqueId()
	    parentObject[this.idPropertyName] = id
	  }
	  parentObject[this.relationByIdPropertyName] = {}
	  parentObject[this.relationPropertyName] = []
	}

	ObjectRelation.prototype.registerParentPrototype = function (prototype) {
	  var self = this
	  var createCaller = function (funcName, func) {
	    return function () {
	      var parent = this
	      var args = u.values(arguments)
	      args.unshift(self)
	      var result = func.apply(parent, args)
	      u.forEach(self.functions[funcName].after, function (afterFunc) {
	        afterFunc.call(parent)
	      })
	      return result
	    }
	  }

	  u.forEach(self.functions, function (func, funcName) {
	    var prototypeFunctionName = funcName
	    if (u.isString(func.relationName) && func.relationName !== '') {
	      prototypeFunctionName = func.relationName
	    }
	    prototype[prototypeFunctionName] = createCaller(funcName, self[funcName + 'Function'])
	  })
	}

	ObjectRelation.prototype.getIdFunction = function getId (config) {
	  return this[config.idPropertyName]
	}

	ObjectRelation.prototype.getFunction = u.createPolymorphic()
	var get = ObjectRelation.prototype.getFunction
	get.signature('object, boolean b=true', function (config, byId) {
	  var self = this

	  if (byId) {
	    return this[config.relationByIdPropertyName]
	  } else {
	    var result = []
	    u.forEach(this[config.relationPropertyName], function (item) {
	      result.push(get.call(self, config, item))
	    })
	    return result
	  }
	})
	get.signature('object, string', function (config, id) {
	  if (id === '') {
	    throw new Error('Argument given should not be an empty string')
	  } else {
	    if (this[config.relationByIdPropertyName][id] !== null) {
	      return this[config.relationByIdPropertyName][id]
	    } else {
	      return false
	    }
	  }
	})

	ObjectRelation.prototype.addFunction = u.createPolymorphic()
	var add = ObjectRelation.prototype.addFunction
	add.signature('object, object, boolean b=false', function (config, relationObject, fromRelation) {
	  if (!config.isRelationObject(relationObject)) {
	    throw new Error('Argument given is not a ' + config.relationName)
	  } else {
	    var id = relationObject.getId()
	    if (!u.isString(id) || id === '') {
	      throw new Error('Id is not a string or empty')
	    } else {
	      if (fromRelation !== true) {
	        relationObject[config.functions.add.parentName](this, true)
	      }
	      this[config.relationByIdPropertyName][id] = relationObject
	      this[config.relationPropertyName].push(id)
	    }
	  }

	  return this
	})
	add.signature('object, array', function (config, relationObjects) {
	  var self = this

	  u.forEach(relationObjects, function (relationObject) {
	    add.call(self, config, relationObject)
	  })

	  return this
	})
	add.signature('object, object, object, ...', function (config, relationObject1, relationObject2, rest) {
	  var relationObjects = [relationObject1, relationObject2]

	  return add.call(this, config, relationObjects.concat(rest))
	})

	ObjectRelation.prototype.removeFunction = u.createPolymorphic()
	var remove = ObjectRelation.prototype.removeFunction
	remove.signature('object, string, boolean b=false', function (config, id, fromRelation) {
	  if (id === '') {
	    throw new Error('Argument given should not be empty')
	  } else {
	    if (!u.isBoolean(fromRelation) || fromRelation !== true) {
	      if (config.isRelationObject(this[config.relationPropertyName][id])) {
	        this[config.relationByIdPropertyName][id][config.functions.remove.parentName](this.getId(), true)
	      }
	    }
	    delete this[config.relationByIdPropertyName][id]
	    var position = this[config.relationPropertyName].indexOf(id)
	    if (position > -1) {
	      this[config.relationPropertyName].splice(position, 1)
	    }
	  }

	  return this
	})
	remove.signature('object, object, boolean b=false', function (config, relationObject, fromRelation) {
	  if (!config.isRelation(relationObject)) {
	    throw new Error('Argument given is not a ' + config.relationName)
	  } else {
	    var id = relationObject.getId()
	    return remove.call(this, config, id, fromRelation)
	  }
	})
	remove.signature('object', function (config) {
	  var self = this

	  u.forEach(this[config.relationPropertyName], function (id) {
	    remove.call(self, config, id)
	  })

	  return this
	})

	ObjectRelation.prototype.after = u.createPolymorphic()
	var after = ObjectRelation.prototype.after
	after.signature('string, function', function (functionName, func) {
	  this.functions[functionName].after.push(func)
	})

	module.exports = ObjectRelation


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var Alo = __webpack_require__(1)
	var alo = new Alo()
	var u = alo.util

	var storeRelation = u.createObjectRelation('subscription', 'store', alo.isStore)
	var memberRelation = u.createObjectRelation('subscription', 'member', alo.isMember)
	var dependencyRelation = u.createObjectRelation('subscription', 'dependency', alo.isDependency)

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
	var Subscription = function Subscription () {
	  this._id = null

	  this._storeRelations = null
	  this._memberRelations = null
	  this._dependencyRelations = null

	  this._events = {
	    'beforePublish': [],
	    'afterPublish': []
	  }

	  this._subscriptionStream = null
	  this._stream = null
	  this._lastData = {}

	  this._muted = false

	  storeRelation.constructParent(this)
	  memberRelation.constructParent(this)
	  dependencyRelation.constructParent(this)

	  subscription.apply(this, arguments)
	}

	// TODO: Implement additional signatures
	var subscription = u.createPolymorphic()
	subscription.signature('', function () {})
	subscription.signature('object, array', function (dependencies, members) {
	  this._dependencyCache.setDependency(dependencies)
	  this.addMember(members)
	})
	subscription.signature('object', function (dependencies) {
	  this._dependencyCache.setDependency(dependencies)
	})
	subscription.signature('array', function (members) {
	  this.addMember(members)
	})
	subscription.signature('function', function (func) {
	  this.createMember(func)
	})

	Subscription.prototype.addMember = null
	Subscription.prototype.getMember = null

	var afterChange = function () {
	  var self = this

	  if (u.isStream(this._stream)) {
	    this._stream.end(true)
	    this._stream = null
	  }
	  if (u.isStream(this._subscriptionStream)) {
	    this._subscriptionStream.end(true)
	    this._subscriptionStream = null
	  }

	  var streams = []
	  var stores = u.values(this.getStore())
	  u.forEach(stores, function (store) {
	    streams.push(store.getStream())
	  })
	  this._stream = u.combineStreams(function () {
	    var streamState = {}
	    u.forEach(u.values(arguments), function (stream, idx) {
	      if (alo.isStore(stores[idx])) {
	        streamState[stores[idx].getId()] = stream()
	      }
	    })
	    return u.Promise.resolve().then(function () {
	      var dependencies = self.getDependency(false)
	      if (dependencies.length > 0) {
	        var depsState = {
	          state: streamState,
	          computed: {}
	        }
	        var idx = 0
	        var walker = function () {
	          if (dependencies[idx] !== undefined) {
	            if (alo.isDependency(dependencies[idx])) {
	              return u.Promise.resolve().then(function () {
	                return dependencies[idx].reduce(depsState)
	              }).then(function (computed) {
	                depsState.computed = computed
	                idx++
	                return walker()
	              })
	            } else {
	              idx++
	              return walker()
	            }
	          } else {
	            return depsState.computed
	          }
	        }
	        return walker()
	      } else {
	        return {}
	      }
	    }).then(function (computed) {
	      return {stores: streamState, computed: computed}
	    })
	  }, streams)
	  this._subscriptionStream = u.streamOn(function (data) {
	    var computedLength = u.values(data.computed).length
	    if ((computedLength === 0 && !u.isEqual(self._lastData.stores, data.stores)) ||
	      (computedLength > 0 && !u.isEqual(self._lastData.computed, data.computed))
	    ) {
	      self._lastData = data
	      self._publish(data)
	    }
	  }, this._stream)
	}

	storeRelation.after('add', afterChange)
	storeRelation.after('remove', afterChange)

	storeRelation.registerParentPrototype(Subscription.prototype)
	memberRelation.registerParentPrototype(Subscription.prototype)
	dependencyRelation.registerParentPrototype(Subscription.prototype)

	Subscription.prototype.createMember = function createMember () {
	  var member = alo.createMember.apply(null, arguments)
	  this.addMember(member)

	  return this
	}

	Subscription.prototype._callEvent = function (name, state) {
	  var promises = this._events[name].map(function (func) {
	    return u.Promise.resolve(state).then(func)
	  })
	  return u.Promise.all(promises).then(function (results) {
	    var result = (results.indexOf(false) === -1)
	    return result
	  })
	}

	Subscription.prototype._publish = function (state) {
	  var self = this
	  if (self._muted === false) {
	    self._muted = true
	    var promise = u.Promise.resolve().then(function () {
	      return self._callEvent('beforePublish', state)
	    }).then(function (runPublish) {
	      if (runPublish !== false) {
	        var state = self.getData()
	        var promises = []
	        u.forEach(self.getMember(false), function (member) {
	          promises.push(member._call(state.stores, state.computed))
	        })
	        return u.Promise.all(promises)
	      } else {
	        return false
	      }
	    }).then(function (runPublish) {
	      if (runPublish !== false) {
	        return self._callEvent('afterPublish', state)
	      }
	    }).then(function () {
	      self._muted = false
	      return null
	    })
	    return promise
	  }
	}

	Subscription.prototype.enable = null
	Subscription.prototype.disable = null

	// TODO: Rewrite
	Subscription.prototype.remember = function remember () {
	  var self = this

	  var promises = []

	  u.forEach(this.getStore(), function (store) {
	    promises.push(self._publish(store, store.getData()))
	  })

	  return u.Promise.all(promises)
	}

	Subscription.prototype.stop = function stop () {
	  this.disable()
	  this.removeStore()

	  return this
	}

	Subscription.prototype.getStream = function getStream () {
	  return this._stream
	}

	Subscription.prototype.getData = function getData () {
	  return u.cloneDeep(this.getStream()())
	}

	Subscription.prototype.createDependency = function createDependency () {
	  var dependency = alo.createDependency.apply(null, arguments)
	  this.addDependency(dependency)

	  return dependency
	}

	Subscription.prototype.on = u.createPolymorphic()
	var on = Subscription.prototype.on
	on.signature('string, function', function (type, func) {
	  if (!u.isArray(this._events[type])) {
	    throw new Error('Argument type is not a valid type')
	  } else {
	    var idx = this._events[type].length
	    this._events[type].push(func)
	  }
	  return {
	    stop: function () {
	      delete this._events[type][idx]
	    }
	  }
	})

	module.exports = Subscription


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var Alo = __webpack_require__(1)
	var alo = new Alo()
	var u = alo.util

	var dependencyRelation = u.createObjectRelation('dependency', 'parentDependency', alo.isDependency)
	var parentDependencyRelation = u.createObjectRelation('parentDependency', 'dependency', alo.isDependency)
	var storeRelation = u.createObjectRelation('dependency', 'store', alo.isStore)
	var subscriptionRelation = u.createObjectRelation('dependency', 'subscription', alo.isSubscription)
	var memberRelation = u.createObjectRelation('dependency', 'member', alo.isMember)

	var Dependency = function Dependency () {
	  this._beforeDependencies = {}
	  this._afterDependencies = {}

	  // TODO: Implement Cache Class
	  this._cache = {}

	  dependencyRelation.constructParent(this)
	  parentDependencyRelation.constructParent(this)
	  storeRelation.constructParent(this)
	  subscriptionRelation.constructParent(this)
	  memberRelation.constructParent(this)

	  this.add.apply(this, arguments)
	}

	dependencyRelation.registerParentPrototype(Dependency.prototype)
	parentDependencyRelation.registerParentPrototype(Dependency.prototype)
	storeRelation.registerParentPrototype(Dependency.prototype)
	subscriptionRelation.registerParentPrototype(Dependency.prototype)
	memberRelation.registerParentPrototype(Dependency.prototype)

	Dependency.prototype.get = u.createPolymorphic()
	var get = Dependency.prototype.get
	get.signature('string a=after', function (type) {
	  switch (type) {
	    case 'before':
	      return this._beforeDependencies
	    case 'after':
	      return this._afterDependencies
	    default:
	      throw new Error('Argument for type should be before or after')
	  }
	})

	Dependency.prototype.add = u.createPolymorphic()
	var add = Dependency.prototype.add
	add.signature('', function () {})
	add.signature('object, string b=after', function (dependencies, type) {
	  var self = this
	  if (['before', 'after'].indexOf(type) === -1) {
	    throw new Error('Argument type should be before or after')
	  } else {
	    u.forEach(dependencies, function (dependency, name) {
	      if (u.isArray(dependency)) {
	        self.add(name, dependency[0], dependency[1], type)
	      } else {
	        self.add(name, dependency, type)
	      }
	    })
	  }

	  return this
	})
	add.signature('string, array, function, string a=after', function (name, dependencies, func, type) {
	  u.forEach(dependencies, function (dependency) {
	    if (!u.isString(dependency) || dependency === '') {
	      throw new Error('Dependency should be a string and not empty')
	    }
	  })
	  switch (type) {
	    case 'before':
	      this._beforeDependencies[name] = [dependencies, func]
	      break
	    case 'after':
	      this._afterDependencies[name] = [dependencies, func]
	      break
	    default:
	      throw new Error('Type should be before or after')
	  }

	  return this
	})
	add.signature('string, function, string a=after', function (name, func, type) {
	  return add.call(this, name, [], func, type)
	})

	Dependency.prototype.remove = function remove (name, type) {
	  if (type !== undefined && ['before', 'after'].indexOf(type) === -1) {
	    throw new Error('Argument for type should be before or after')
	  } else {
	    if (type === undefined || type === 'before') {
	      this._beforeDependencies = false
	    }
	    if (type === undefined || type === 'after') {
	      this._afterDependencies = false
	    }
	  }

	  return this
	}

	Dependency.prototype.reduce = function reduce (state) {
	  var self = this

	  var walkDependencies = function (dependencies, called) {
	    var pairs = u.toPairs(dependencies)
	    if (called === undefined) {
	      called = []
	    }
	    var idx = 0
	    var walker = function () {
	      if (pairs[idx] !== undefined) {
	        return u.Promise.resolve().then(function () {
	          return walkDependency(called, pairs[idx], dependencies)
	        }).then(function (newCalled) {
	          called = newCalled
	          idx++
	          return walker()
	        })
	      } else {
	        return called
	      }
	    }
	    return walker()
	  }

	  var walkDependency = function (called, properties, dependencies) {
	    var name = properties[0]
	    var deps = properties[1][0]
	    var func = properties[1][1]
	    if (called.indexOf(name) === -1) {
	      return u.Promise.resolve().then(function () {
	        if (deps.length > 0) {
	          var filteredDeps = u.filter(deps, function (name) {
	            return (state.computed[name] === undefined)
	          })
	          var preparedDeps = {}
	          u.forEach(filteredDeps, function (name) {
	            preparedDeps[name] = dependencies[name]
	          })
	          return walkDependencies(preparedDeps, called)
	        } else {
	          return called
	        }
	      }).then(function (called) {
	        var recalculate = true
	        if (deps.length > 0) {
	          recalculate = false
	          u.forEach(deps, function (name) {
	            if (!u.isEqual(state.computed[name], self._cache[name])) {
	              recalculate = true
	              return false
	            }
	          })
	        }
	        if (recalculate) {
	          if (u.isFunction(func)) {
	            return func(state.state, state.computed, state.action)
	          } else {
	            return null
	          }
	        } else {
	          return self._cache[name]
	        }
	      }).then(function (result) {
	        if (result === undefined) {
	          result = null
	        }
	        state.computed[name] = result
	        called.push(name)
	        return called
	      })
	    } else {
	      return called
	    }
	  }

	  var nextDependencies = {
	    before: this.get('before'),
	    after: this.get('after')
	  }

	  return u.Promise.resolve().then(function () {
	    return walkDependencies(nextDependencies.before, [])
	  }).then(function (called) {
	    var idx = 0
	    var relationDependencies = self.getDependency(false)
	    var walker = function () {
	      if (relationDependencies[idx] !== undefined) {
	        if (alo.isDependency(relationDependencies[idx])) {
	          return u.Promise.resolve().then(function () {
	            return relationDependencies[idx].reduce(state)
	          }).then(function (computed, called) {
	            state.computed = computed
	            idx++
	            return walker()
	          })
	        } else {
	          idx++
	          return walker()
	        }
	      } else {
	        return true
	      }
	    }
	    return walker()
	  }).then(function () {
	    return walkDependencies(nextDependencies.after, [])
	  }).then(function () {
	    self._cache = state.computed
	    return state.computed
	  })
	}

	module.exports = Dependency


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var Alo = __webpack_require__(1)
	var alo = new Alo()
	var u = alo.util

	var subscriptionRelation = u.createObjectRelation('member', 'subscription', alo.isSubscription)

	var Member = function Member () {
	  this._dependency = {}
	  this._function = null
	  this._enabled = true

	  subscriptionRelation.constructParent(this)
	  member.apply(this, arguments)
	}
	var member = u.createPolymorphic()
	member.signature('function', function (func) {
	  return member.call(this, {}, func)
	})
	member.signature('object, function', function (dependency, func) {
	  this.addDependency(dependency)
	  this.setFunction(func)
	})

	subscriptionRelation.registerParentPrototype(Member.prototype)

	Member.prototype._call = function _call (stores, computed) {
	  if (this.isEnabled()) {
	    var func = this.getFunction()
	    if (u.isFunction(func)) {
	      func(stores, computed)
	    }
	  }
	  return this
	}

	Member.prototype.disable = function disable () {
	  this._enabled = false
	  return this
	}

	Member.prototype.enable = function enable () {
	  this._enabled = true
	  return this
	}

	Member.prototype.isEnabled = function isEnabled () {
	  return this._enabled
	}

	Member.prototype.getFunction = function getFunction () {
	  return this._function
	}

	Member.prototype.setFunction = function setFunction (func) {
	  if (!u.isFunction(func)) {
	    throw new Error('Argument given needs to be a function')
	  } else {
	    this._function = func
	  }

	  return this
	}

	Member.prototype.getDependency = function getDependency () {
	  return this._dependency
	}

	Member.prototype.addDependency = u.createPolymorphic()
	var addDependency = Member.prototype.addDependency
	addDependency.signature('string, function', function (name, func) {
	  if (name === '') {
	    throw new Error('Dependency name should not be empty')
	  } else {
	    this._dependency[name] = func
	  }

	  return this
	})
	addDependency.signature('object', function addDependency (dependency) {
	  var self = this

	  u.forEach(dependency, function (func, name) {
	    self.addDependency(name, func)
	  })

	  return this
	})

	Member.prototype.stop = function stop () {
	  this.disable()
	  this.removeSubscription()

	  return this
	}

	module.exports = Member


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	var Alo = __webpack_require__(1)
	var alo = new Alo()
	var u = alo.util

	var storeRelation = u.createObjectRelation('reducer', 'store', alo.isStore)
	var reducerRelation = u.createObjectRelation('reducer', 'parentReducer', alo.isReducer)
	var parentReducerRelation = u.createObjectRelation('parentReducer', 'reducer', alo.isReducer)

	/**
	 * Reducer class
	 * TODO: Describe what this class is all about
	 *
	 * @class
	 */
	var Reducer = function Reducer () {
	  /**
	   * Is this reducer enabled?
	   *
	   * @name _enabled
	   * @memberof Reducer
	   * @private
	   */
	  this._enabled = true

	  /**
	   * Unique ID of this reducer
	   *
	   * @name _id
	   * @memberof Reducer
	   * @private
	   */
	  this._id = null

	  this._prepareFunction = false
	  this._finalizeFunction = false

	  /**
	   * Array of registered reducers
	   *
	   * @name _reducers
	   * @memberof Reducer
	   * @private
	   */
	  this._reducerRelations = null

	  /**
	   * Object of registered stores
	   *
	   * @name _stores
	   * @memberof Reducer
	   * @private
	   */
	  this._storeRelations = null

	  storeRelation.constructParent(this)
	  reducerRelation.constructParent(this)
	  parentReducerRelation.constructParent(this)

	  reducer.apply(this, arguments)
	}
	var reducer = u.createPolymorphic()
	reducer.signature('', function () {})
	reducer.signature('function', function (prepareFunction) {
	  this.set('prepare', prepareFunction)
	})
	reducer.signature('array', function (reducers) {
	  this.addReducer(reducers)
	})
	reducer.signature('function, function', function (prepareFunction, finalizeFunction) {
	  this.set('prepare', prepareFunction)
	  this.set(finalizeFunction)
	})
	reducer.signature('function, array', function (prepareFunction, reducers) {
	  this.set('prepare', prepareFunction)
	  this.addReducer(reducers)
	})
	reducer.signature('function, function, array', function (prepareFunction, finalizeFunction, reducers) {
	  this.set('prepare', prepareFunction)
	  this.set(finalizeFunction)
	  this.addReducer(reducers)
	})

	/**
	 * Get id of this reducer
	 *
	 * @return {string} Unique ID of this reducer
	 */
	Reducer.prototype.getId = null

	/**
	 * Connect one or multible stores to this reducer
	 *
	 * @function
	 *
	 * @param {Store|array} store One store or array of stores
	 * @param {boolean} fromStore Was this function called within a store
	 *
	 * @return {Reducer} this
	 */
	Reducer.prototype.addStore = null

	/**
	 * Remove a store or all stores from this reducer
	 *
	 * @function
	 *
	 * @param {integer|Store|boolean} store|fromStore
	 * @param {boolean} fromStore Was this called within a store?
	 *
	 * @return {Reducer} this
	 */
	Reducer.prototype.removeStore = null

	storeRelation.registerParentPrototype(Reducer.prototype)
	reducerRelation.registerParentPrototype(Reducer.prototype)
	parentReducerRelation.registerParentPrototype(Reducer.prototype)

	/**
	 *
	 */
	Reducer.prototype.set = u.createPolymorphic()
	var set = Reducer.prototype.set
	set.signature('string a=finalize, function', function (type, func) {
	  switch (type) {
	    case 'prepare':
	      this._prepareFunction = func
	      break
	    case 'finalize':
	      this._finalizeFunction = func
	      break
	    default:
	      throw new Error('Argument for type should be prepare or finalize')
	  }

	  return this
	})

	Reducer.prototype.has = u.createPolymorphic()
	var has = Reducer.prototype.has
	has.signature('string a=finalize', function (type) {
	  switch (type) {
	    case 'prepare':
	      return u.isFunction(this.get(type))
	    case 'finalize':
	      return u.isFunction(this.get(type))
	    default:
	      throw new Error('Argument for type should be prepare or finalize')
	  }
	})

	Reducer.prototype.get = u.createPolymorphic()
	var get = Reducer.prototype.get
	get.signature('string a=finalize', function get (type) {
	  switch (type) {
	    case 'prepare':
	      return this._prepareFunction
	    case 'finalize':
	      return this._finalizeFunction
	    default:
	      throw new Error('Argument for type should be prepare or finalize')
	  }
	})

	Reducer.prototype.unset = function (type) {
	  if (type !== undefined && ['prepare', 'finalize'].indexOf(type) === -1) {
	    throw new Error('Argument for type should be prepare or finalize')
	  } else {
	    if (type === undefined || type === 'prepare') {
	      this._prepareFunction = false
	    }
	    if (type === undefined || type === 'finalize') {
	      this._finalizeFunction = false
	    }
	  }

	  return this
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
	Reducer.prototype.reduce = function reduce (state, action) {
	  if (this.isEnabled()) {
	    var preparer = this.get('prepare')
	    if (u.isFunction(preparer)) {
	      state = preparer(u.cloneDeep(state), action)
	    }
	    u.forEach(this.getReducer(false), function (item) {
	      state = item.reduce(u.cloneDeep(state), action)
	    })
	    var finalizer = this.get('finalize')
	    if (u.isFunction(finalizer)) {
	      state = finalizer(u.cloneDeep(state), action)
	    }
	  }

	  return state
	}

	/**
	 * Disables this reducer
	 *
	 * @return {Reducer} this
	 */
	Reducer.prototype.disable = function disable () {
	  this._enabled = false

	  return this
	}

	/**
	 * Enables this reducer
	 *
	 * @return {Reducer} this
	 */
	Reducer.prototype.enable = function enable () {
	  this._enabled = true

	  return this
	}

	Reducer.prototype.isEnabled = function isEnabled () {
	  return this._enabled
	}

	/**
	 * Stops this reducer: it will be disabled and removed from all stores
	 *
	 * @return {Reducer} this
	 */
	Reducer.prototype.stop = function stop () {
	  this.removeStore()
	  this.disable()
	  return this
	}

	module.exports = Reducer


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var Alo = __webpack_require__(1)
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


/***/ },
/* 201 */
/***/ function(module, exports) {

	var Middleware = function Middleware () {}

	module.exports = Middleware


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Extras, but useful stuff
	 *
	 * @namespace
	 */
	var extras = {}

	/**
	 * Several included reducer examples
	 */
	extras.reducers = __webpack_require__(203)

	module.exports = extras


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var Alo = __webpack_require__(1)
	var alo = new Alo()
	var u = alo.util

	var reducers = {}

	/**
	 * A basic reducer which just replaces state with payload of untyped actions
	 *
	 * @memberof extras
	 */
	reducers.createUntypedReplace = function () {
	  var reduce = function (state, action) {
	    if (action.type === undefined || action.type === null || action.type === '') {
	      if (action.payload !== undefined) {
	        return action.payload
	      }
	    }
	    return state
	  }

	  return alo.createReducer(reduce)
	}

	module.exports = reducers


/***/ }
/******/ ]);