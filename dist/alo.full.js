(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Alo"] = factory();
	else
		root["Alo"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 220);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebirdCoreMin = __webpack_require__(86);

var _bluebirdCoreMin2 = _interopRequireDefault(_bluebirdCoreMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Several utility functions / libs used by alo
 *
 * Some of this functions / libs might change over time: Please read the description of the specific function / lib.
 *
 */
var Util = function Util() {};

// Library functions
// Lodash
/**
 * Lodash cloneDeep, can be used
 *
 * @function
 */
Util.prototype.cloneDeep = __webpack_require__(184);

Util.prototype.filter = __webpack_require__(186);

/**
 * Lodash values, can be used
 *
 * @function
 */
Util.prototype.values = __webpack_require__(206);

/**
 * Lodash forEach, can be used
 *
 * @function
 */
Util.prototype.forEach = __webpack_require__(187);

/**
 * Lodash isFunction, can be used
 *
 * @function
 */
Util.prototype.isFunction = __webpack_require__(22);

/**
 * Lodash isString, can be used
 *
 * @function
 */
Util.prototype.isString = __webpack_require__(194);

/**
 * Lodash isObject, can be used
 *
 * @function
 */
Util.prototype.isObject = __webpack_require__(1);

Util.prototype.merge = __webpack_require__(197);

/**
 * Lodash isEqual, can be used
 *
 * @function
 */
Util.prototype.isEqual = __webpack_require__(192);

/**
 * Lodash isPlainObject, can be used
 *
 * @function
 */
Util.prototype.isPlainObject = __webpack_require__(79);

/**
 * Lodash isArray, can be used
 *
 * @function
 */
Util.prototype.isArray = __webpack_require__(0);

Util.prototype.map = __webpack_require__(195);

/**
 * Lodash isBoolean, can be used
 *
 * @function
 */
Util.prototype.isBoolean = __webpack_require__(191);

Util.prototype.isInteger = __webpack_require__(193);

/**
 * Lodash uniqueId, can be used
 *
 * @function
 */
Util.prototype.uniqueId = __webpack_require__(205);

Util.prototype.toPairs = __webpack_require__(203);

var flyd = __webpack_require__(87);
/**
 * Flyd stream: Might change!
 *
 * @function
 */
Util.prototype.createStream = flyd.stream;

/**
 * Flyd stream: Might change!
 *
 * @function
 */
Util.prototype.combineStreams = flyd.combine;

/**
 * Flyd isStream: Might change!
 *
 * @function
 */
Util.prototype.isStream = flyd.isStream;

/**
 * Flyd immediate: Might change!
 *
 * @function
 */
Util.prototype.immediateStream = flyd.immediate;

/**
 * Flyd endsOn: Might change!
 *
 * @function
 */
Util.prototype.streamEndsOn = flyd.endsOn;

/**
 * Flyd map: Might change!
 *
 * @function
 */
Util.prototype.mapStream = flyd.map;

/**
 * Flyd on: Might change!
 *
 * @function
 */
Util.prototype.streamOn = flyd.on;

/**
 * Flyd scan: Might change!
 *
 * @function
 */
Util.prototype.scanStream = flyd.scan;

/**
 * Flyd merge: Might change!
 *
 * @function
 */
Util.prototype.mergeStream = flyd.merge;

/**
 * Flyd transduce: Might change!
 *
 * @function
 */
Util.prototype.transduceStream = flyd.transduce;

/**
 * Polymorphic helper: Might change!
 *
 * @function
 */
Util.prototype.createPolymorphic = __webpack_require__(207);

/* Util.prototype.Promise = require('yaku')

// TODO: yaku 0.17.4 uses setTimeout for nextTick in the browser, next-tick is a faster polyfill. Remove the polyfill, if yaku decides to implement/integrate one itsself
import nextTick from 'next-tick'
Util.prototype.Promise.nextTick = fn => nextTick(fn)
*/

Util.prototype.Promise = _bluebirdCoreMin2.default;

Util.prototype.createPromise = function createPromise(resolve, reject) {
  return new this.Promise(resolve, reject);
};

/**
 * Same as new Alo
 * @see Alo
 */
Util.prototype.createAlo = function createAlo() {
  var Alo = __webpack_require__(25);
  var alo = Object.create(Alo.prototype);
  Alo.apply(alo, arguments);
  return alo;
};

exports.default = Util;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(70);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10),
    getRawTag = __webpack_require__(144),
    objectToString = __webpack_require__(171);

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
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var u = new _util2.default();

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
  relatedTo: {
    relation: true
  },
  indexOf: {
    relation: true
  },
  setIndexOf: {
    relation: true
  },
  getId: {}
};

var formatFunctionName = function formatFunctionName(action, name) {
  name = name.split('');
  name[0] = name[0].toUpperCase();
  name = name.join('');
  return action + name;
};

var ObjectRelation = function ObjectRelation() {
  objectRelation.apply(this, arguments);
};
var objectRelation = u.createPolymorphic();
objectRelation.signature('string, string, function', function (parentName, relationName, isRelationObject) {
  var self = this;
  if (parentName === '' || relationName === '') {
    throw new Error('Argument given should not be empty');
  } else {
    this.idPropertyName = '_id';
    this.parentName = parentName;
    this.relationName = relationName;
    this.relationByIdPropertyName = '_' + relationName + 'RelationsById';
    this.relationPropertyName = '_' + relationName + 'Relations';
    this.isRelationObject = isRelationObject;

    this.functions = {};
    u.forEach(functions, function (func, funcName) {
      self.functions[funcName] = {
        before: [],
        after: []
      };
      if (func.relation === true) {
        self.functions[funcName].parentName = formatFunctionName(funcName, parentName);
        self.functions[funcName].relationName = formatFunctionName(funcName, relationName);
      }
    });
  }
});

/**
 * Should be called in the constructor of the parent
 */
ObjectRelation.prototype.constructParent = function (parentObject) {
  if (parentObject[this.idPropertyName] === null || parentObject[this.idPropertyName] === undefined) {
    var id = u.uniqueId();
    parentObject[this.idPropertyName] = id;
  }
  parentObject[this.relationByIdPropertyName] = {};
  parentObject[this.relationPropertyName] = [];
};

ObjectRelation.prototype.registerParentPrototype = function (prototype) {
  var self = this;
  var createCaller = function createCaller(funcName, func) {
    return function () {
      var parent = this;
      var args = u.values(arguments);
      args.unshift(self);
      u.forEach(self.functions[funcName].before, function (beforeFunc) {
        beforeFunc.call(parent);
      });
      var result = func.apply(parent, args);
      u.forEach(self.functions[funcName].after, function (afterFunc) {
        afterFunc.call(parent);
      });
      return result;
    };
  };

  u.forEach(self.functions, function (func, funcName) {
    var prototypeFunctionName = funcName;
    if (u.isString(func.relationName) && func.relationName !== '') {
      prototypeFunctionName = func.relationName;
    }
    prototype[prototypeFunctionName] = createCaller(funcName, self[funcName + 'Function']);
  });
};

ObjectRelation.prototype.getIdFunction = function getId(config) {
  return this[config.idPropertyName];
};

ObjectRelation.prototype.getFunction = u.createPolymorphic();
var get = ObjectRelation.prototype.getFunction;
get.signature('object, boolean b=true', function (config, byId) {
  var self = this;

  if (byId) {
    return this[config.relationByIdPropertyName];
  } else {
    var result = [];
    u.forEach(this[config.relationPropertyName], function (item) {
      result.push(get.call(self, config, item));
    });
    return result;
  }
});
get.signature('object, string', function (config, id) {
  if (id === '') {
    throw new Error('Argument given should not be an empty string');
  } else {
    if (this[config.relationByIdPropertyName][id] !== null) {
      return this[config.relationByIdPropertyName][id];
    } else {
      return false;
    }
  }
});

ObjectRelation.prototype.addFunction = u.createPolymorphic();
var add = ObjectRelation.prototype.addFunction;
add.signature('object, object, integer a=-1, boolean b=false', function (config, relationObject, index, fromRelation) {
  if (!config.isRelationObject.call(this, relationObject)) {
    throw new Error('Argument given is not a ' + config.relationName);
  } else {
    var id = relationObject.getId();
    if (!u.isString(id) || id === '') {
      throw new Error('Id is not a string or empty');
    } else {
      if (fromRelation !== true) {
        relationObject[config.functions.add.parentName](this, -1, true);
      }
      this[config.relationByIdPropertyName][id] = relationObject;
      if (index >= 0) {
        this[config.relationPropertyName].splice(index, 0, id);
      } else {
        this[config.relationPropertyName].push(id);
      }
    }
  }

  return this;
});
add.signature('object, array', function (config, relationObjects) {
  var self = this;

  u.forEach(relationObjects, function (relationObject) {
    add.call(self, config, relationObject, -1);
  });

  return this;
});
add.signature('object, object, object, ...', function (config, relationObject1, relationObject2, rest) {
  var relationObjects = [relationObject1, relationObject2];

  return add.call(this, config, relationObjects.concat(rest), -1);
});

ObjectRelation.prototype.removeFunction = u.createPolymorphic();
var remove = ObjectRelation.prototype.removeFunction;
remove.signature('object, string, boolean b=false', function (config, id, fromRelation) {
  if (id === '') {
    throw new Error('Argument given should not be empty');
  } else {
    if (!u.isBoolean(fromRelation) || fromRelation !== true) {
      if (config.isRelationObject.call(this, this[config.relationPropertyName][id])) {
        this[config.relationByIdPropertyName][id][config.functions.remove.parentName](this.getId(), true);
      }
    }
    delete this[config.relationByIdPropertyName][id];
    var position = this[config.relationPropertyName].indexOf(id);
    if (position > -1) {
      this[config.relationPropertyName].splice(position, 1);
    }
  }

  return this;
});
remove.signature('object, object, boolean b=false', function (config, relationObject, fromRelation) {
  if (!config.isRelationObject.call(this, relationObject)) {
    throw new Error('Argument given is not a ' + config.relationName);
  } else {
    var id = relationObject.getId();
    return remove.call(this, config, id, fromRelation);
  }
});
remove.signature('object', function (config) {
  var self = this;

  u.forEach(this[config.relationPropertyName], function (id) {
    remove.call(self, config, id);
  });

  return this;
});

ObjectRelation.prototype.relatedToFunction = function (config, relationObj) {
  return indexOf.apply(this, arguments) > -1;
};

ObjectRelation.prototype.indexOfFunction = function (config, relationObj) {
  var id = null;

  if (u.isString(relationObj) || u.isInteger(relationObj)) {
    id = relationObj;
  } else if (!config.isRelationObject.call(this, relationObj)) {
    throw new Error('Argument given should be an id or a ' + config.relationName);
  } else {
    id = relationObj.getId();
  }

  return this[config.relationPropertyName].indexOf(id);
};
var indexOf = ObjectRelation.prototype.indexOfFunction;

ObjectRelation.prototype.setIndexOfFunction = function (config, relationObj, index) {
  if (!u.isInteger(index)) {
    throw new Error('Argument for index should be an integer');
  } else {
    var id = null;

    if (u.isString(relationObj) || u.isInteger(relationObj)) {
      id = relationObj;
    } else if (!config.isRelationObject.call(this, relationObj)) {
      throw new Error('Argument given should be an id or a ' + config.relationName);
    } else {
      id = relationObj.getId();
    }

    var oldIndex = this[config.relationPropertyName].indexOf(id);
    if (oldIndex !== -1 && oldIndex !== index) {
      delete this[config.relationPropertyName][oldIndex];
      this[config.relationPropertyName].splice(index, 0, id);
    }

    return index;
  }
};

ObjectRelation.prototype.before = u.createPolymorphic();
var before = ObjectRelation.prototype.before;
before.signature('string, function', function (functionName, func) {
  this.functions[functionName].before.push(func);
});

ObjectRelation.prototype.after = u.createPolymorphic();
var after = ObjectRelation.prototype.after;
after.signature('string, function', function (functionName, func) {
  this.functions[functionName].after.push(func);
});

exports.default = ObjectRelation;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(108),
    getValue = __webpack_require__(145);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(55),
    baseKeys = __webpack_require__(110),
    isArrayLike = __webpack_require__(9);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(22),
    isLength = __webpack_require__(40);

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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(59),
    baseAssignValue = __webpack_require__(28);

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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(157),
    listCacheDelete = __webpack_require__(158),
    listCacheGet = __webpack_require__(159),
    listCacheHas = __webpack_require__(160),
    listCacheSet = __webpack_require__(161);

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(13),
    stackClear = __webpack_require__(178),
    stackDelete = __webpack_require__(179),
    stackGet = __webpack_require__(180),
    stackHas = __webpack_require__(181),
    stackSet = __webpack_require__(182);

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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

var eq = __webpack_require__(12);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(155);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(23);

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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3),
    stubFalse = __webpack_require__(199);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)(module)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObject = __webpack_require__(1);

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

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(4);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(55),
    baseKeysIn = __webpack_require__(111),
    isArrayLike = __webpack_require__(9);

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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alo = function Alo(id) {
  /**
   * Access to the util namespace
   *
   * @see util
   */
  this.util = new _util2.default();
  this._id = this.util.isString(id) && id !== '' ? id : this.util.uniqueId();
};

Alo.prototype.createSubscription = function createSubscription() {
  var Subscription = __webpack_require__(50);
  var subscription = Object.create(Subscription.prototype);
  subscription._alo = this;
  Subscription.apply(subscription, arguments);
  return subscription;
};

Alo.prototype.isSubscription = function isSubscription(subscription) {
  var Subscription = __webpack_require__(50);
  return subscription instanceof Subscription;
};

Alo.prototype.createDependency = function createDependency() {
  var Dependency = __webpack_require__(45);
  var dependency = Object.create(Dependency.prototype);
  dependency._alo = this;
  Dependency.apply(dependency, arguments);
  return dependency;
};

Alo.prototype.isDependency = function isDependency(dependency) {
  var Dependency = __webpack_require__(45);
  return dependency instanceof Dependency;
};

Alo.prototype.createMember = function createMember() {
  var Member = __webpack_require__(46);
  var member = Object.create(Member.prototype);
  member._alo = this;
  Member.apply(member, arguments);
  return member;
};

Alo.prototype.isMember = function isMember(member) {
  var Member = __webpack_require__(46);
  return member instanceof Member;
};

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
Alo.prototype.createReducer = function createReducer() {
  var Reducer = __webpack_require__(48);
  var reducer = Object.create(Reducer.prototype);
  reducer._alo = this;
  Reducer.apply(reducer, arguments);
  return reducer;
};

/**
 * Instanceof check for reducers
 *
 * @param {*} reducer Argument to check if it is a reducer
 *
 * @return {boolean} true of it is a reducer, false in the other case
 */
Alo.prototype.isReducer = function isReducer(reducer) {
  var Reducer = __webpack_require__(48);
  return reducer instanceof Reducer;
};

/**
 * Same as new Store
 * @see Store
 */
Alo.prototype.createStore = function createStore() {
  var Store = __webpack_require__(49);
  var store = Object.create(Store.prototype);
  store._alo = this;
  Store.apply(store, arguments);
  return store;
};

/**
 * Instanceof check for stores
 *
 * @param {*} store Argument to check if it is a store
 *
 * @return {boolean} true of it is a store, false in the other case
 */
Alo.prototype.isStore = function isStore(store, validateId) {
  validateId = validateId === true;
  var Store = __webpack_require__(49);
  var isStore = store instanceof Store;
  var idValid = !validateId || store._alo && store._alo._id === this._id;
  return isStore && idValid;
};

Alo.prototype.isMiddleware = function isMiddleware(middleware) {
  var Middleware = __webpack_require__(47);
  return middleware instanceof Middleware;
};

Alo.prototype.createMiddleware = function createMiddleware() {
  var Middleware = __webpack_require__(47);
  var middleware = Object.create(Middleware.prototype);
  middleware._alo = this;
  Middleware.apply(middleware, arguments);
  return middleware;
};

module.exports = Alo;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(162),
    mapCacheDelete = __webpack_require__(163),
    mapCacheGet = __webpack_require__(164),
    mapCacheHas = __webpack_require__(165),
    mapCacheSet = __webpack_require__(166);

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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(68);

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(103),
    createBaseEach = __webpack_require__(137);

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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(106),
    isObjectLike = __webpack_require__(4);

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
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(52);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(76);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(54),
    stubArray = __webpack_require__(80);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(88),
    Map = __webpack_require__(26),
    Promise = __webpack_require__(90),
    Set = __webpack_require__(91),
    WeakMap = __webpack_require__(93),
    baseGetTag = __webpack_require__(5),
    toSource = __webpack_require__(78);

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
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(0),
    isSymbol = __webpack_require__(23);

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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(105),
    isObjectLike = __webpack_require__(4);

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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(109),
    baseUnary = __webpack_require__(124),
    nodeUtil = __webpack_require__(170);

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
/* 42 */
/***/ function(module, exports) {

module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};


/***/ },
/* 43 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 44 */
/***/ function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			configurable: false,
			get: function() { return module.l; }
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			configurable: false,
			get: function() { return module.i; }
		});
		module.webpackPolyfill = 1;
	}
	return module;
}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _objectRelation = __webpack_require__(6);

var _objectRelation2 = _interopRequireDefault(_objectRelation);

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var u = new _util2.default();

var dependencyRelation = new _objectRelation2.default('dependency', 'parentDependency', function () {
  return this._alo.isDependency.apply(this._alo, arguments);
});
var parentDependencyRelation = new _objectRelation2.default('parentDependency', 'dependency', function () {
  return this._alo.isDependency.apply(this._alo, arguments);
});
var storeRelation = new _objectRelation2.default('dependency', 'store', function () {
  return this._alo.isStore.apply(this._alo, arguments);
});
var subscriptionRelation = new _objectRelation2.default('dependency', 'subscription', function () {
  return this._alo.isSubscription.apply(this._alo, arguments);
});
var memberRelation = new _objectRelation2.default('dependency', 'member', function () {
  return this._alo.isMember.apply(this._alo, arguments);
});

var Dependency = function Dependency() {
  this._beforeDependencies = {};
  this._afterDependencies = {};

  this._cache = {};

  dependencyRelation.constructParent(this);
  parentDependencyRelation.constructParent(this);
  storeRelation.constructParent(this);
  subscriptionRelation.constructParent(this);
  memberRelation.constructParent(this);

  this.add.apply(this, arguments);
};

dependencyRelation.registerParentPrototype(Dependency.prototype);
parentDependencyRelation.registerParentPrototype(Dependency.prototype);
storeRelation.registerParentPrototype(Dependency.prototype);
subscriptionRelation.registerParentPrototype(Dependency.prototype);
memberRelation.registerParentPrototype(Dependency.prototype);

Dependency.prototype.get = u.createPolymorphic();
var get = Dependency.prototype.get;
get.signature('string a=after', function (type) {
  switch (type) {
    case 'before':
      return this._beforeDependencies;
    case 'after':
      return this._afterDependencies;
    default:
      throw new Error('Argument for type should be before or after');
  }
});

Dependency.prototype.add = u.createPolymorphic();
var add = Dependency.prototype.add;
add.signature('', function () {});
add.signature('object, string b=after', function (dependencies, type) {
  var self = this;
  if (['before', 'after'].indexOf(type) === -1) {
    throw new Error('Argument type should be before or after');
  } else {
    u.forEach(dependencies, function (dependency, name) {
      if (u.isArray(dependency)) {
        self.add(name, dependency[0], dependency[1], type);
      } else {
        self.add(name, dependency, type);
      }
    });
  }

  return this;
});
add.signature('string, array, function, string a=after', function (name, dependencies, func, type) {
  u.forEach(dependencies, function (dependency) {
    if (!u.isString(dependency) || dependency === '') {
      throw new Error('Dependency should be a string and not empty');
    }
  });
  switch (type) {
    case 'before':
      this._beforeDependencies[name] = [dependencies, func];
      break;
    case 'after':
      this._afterDependencies[name] = [dependencies, func];
      break;
    default:
      throw new Error('Type should be before or after');
  }

  return this;
});
add.signature('string, function, string a=after', function (name, func, type) {
  return add.call(this, name, [], func, type);
});

Dependency.prototype.remove = function remove(name, type) {
  if (type !== undefined && ['before', 'after'].indexOf(type) === -1) {
    throw new Error('Argument for type should be before or after');
  } else {
    if (type === undefined || type === 'before') {
      this._beforeDependencies = false;
    }
    if (type === undefined || type === 'after') {
      this._afterDependencies = false;
    }
  }

  return this;
};

// TODO: Maybe implement createDependency

Dependency.prototype.reduceRecursive = function reduceRecursive(dependencies, id, data) {
  var self = this;

  return u.Promise.resolve().then(function () {
    if (dependencies.length > 0) {
      var idx = 0;
      var walker = function walker() {
        if (dependencies[idx] !== undefined) {
          if (self._alo.isDependency(dependencies[idx])) {
            return u.Promise.resolve().then(function () {
              return dependencies[idx].reduce(id, data);
            }).then(function (computed) {
              data.computed = computed;
              idx++;
              return walker();
            });
          } else {
            idx++;
            return walker();
          }
        } else {
          return data.computed;
        }
      };
      return walker();
    } else {
      return {};
    }
  });
};

Dependency.prototype.reduce = function reduce(id, data) {
  var self = this;
  self._cache[id] = self._cache[id] || {};

  var walkDependencies = function walkDependencies(dependencies, called) {
    var pairs = u.toPairs(dependencies);
    if (called === undefined) {
      called = [];
    }
    var idx = 0;
    var walker = function walker() {
      if (pairs[idx] !== undefined) {
        return u.Promise.resolve().then(function () {
          return walkDependency(called, pairs[idx], dependencies);
        }).then(function (newCalled) {
          called = newCalled;
          idx++;
          return walker();
        });
      } else {
        return called;
      }
    };
    return walker();
  };

  var walkDependency = function walkDependency(called, properties, dependencies) {
    var name = properties[0];
    var deps = properties[1][0];
    var func = properties[1][1];
    if (called.indexOf(name) === -1) {
      return u.Promise.resolve().then(function () {
        if (deps.length > 0) {
          var filteredDeps = u.filter(deps, function (name) {
            return data.computed[name] === undefined;
          });
          var preparedDeps = {};
          u.forEach(filteredDeps, function (name) {
            preparedDeps[name] = dependencies[name];
          });
          return walkDependencies(preparedDeps, called);
        } else {
          return called;
        }
      }).then(function (called) {
        var recalculate = true;
        if (deps.length > 0) {
          recalculate = false;
          u.forEach(deps, function (name) {
            if (!u.isEqual(data.computed[name], self._cache[id][name])) {
              recalculate = true;
              return false;
            }
          });
        }
        if (recalculate) {
          if (u.isFunction(func)) {
            return func(data.state, data.computed, data.action);
          } else {
            return null;
          }
        } else {
          return self._cache[id][name];
        }
      }).then(function (result) {
        if (result === undefined) {
          result = null;
        }
        data.computed[name] = result;
        called.push(name);
        return called;
      });
    } else {
      return called;
    }
  };

  var nextDependencies = {
    before: this.get('before'),
    after: this.get('after')
  };

  return u.Promise.resolve().then(function () {
    return walkDependencies(nextDependencies.before, []);
  }).then(function (called) {
    var idx = 0;
    var relationDependencies = self.getDependency(false);
    var walker = function walker() {
      if (relationDependencies[idx] !== undefined) {
        if (self._alo.isDependency(relationDependencies[idx])) {
          return u.Promise.resolve().then(function () {
            return relationDependencies[idx].reduce(self.getId(), data);
          }).then(function (computed, called) {
            data.computed = computed;
            idx++;
            return walker();
          });
        } else {
          idx++;
          return walker();
        }
      } else {
        return true;
      }
    };
    return walker();
  }).then(function () {
    return walkDependencies(nextDependencies.after, []);
  }).then(function () {
    self._cache[id] = data.computed;
    return data.computed;
  });
};

module.exports = Dependency;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _objectRelation = __webpack_require__(6);

var _objectRelation2 = _interopRequireDefault(_objectRelation);

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var u = new _util2.default();

var subscriptionRelation = new _objectRelation2.default('member', 'subscription', function () {
  return this._alo.isSubscription.apply(this._alo, arguments);
});
var dependencyRelation = new _objectRelation2.default('member', 'dependency', function () {
  return this._alo.isDependency.apply(this._alo, arguments);
});

var Member = function Member() {
  this._dependency = {};
  this._function = null;
  this._enabled = true;
  this._lastData = null;

  subscriptionRelation.constructParent(this);
  dependencyRelation.constructParent(this);
  member.apply(this, arguments);
};
var member = u.createPolymorphic();
member.signature('function', function (func) {
  this.setFunction(func);
});
member.signature('object', function (dependencies) {
  this.addDependency(dependencies);
});
member.signature('object, function', function (dependencies, func) {
  this.addDependency(dependencies);
  this.setFunction(func);
});

subscriptionRelation.registerParentPrototype(Member.prototype);
dependencyRelation.registerParentPrototype(Member.prototype);

Member.prototype._call = function _call(stores, computed) {
  var self = this;
  if (this.isEnabled()) {
    var func = self.getFunction();
    if (u.isFunction(func)) {
      return u.Promise.resolve().then(function () {
        var dependencies = self.getDependency(false);
        if (dependencies.length > 0) {
          var depsState = {
            state: stores,
            computed: {}
          };
          return dependencies[0].reduceRecursive(dependencies, self.getId(), depsState);
        } else {
          return computed;
        }
      }).then(function (computed) {
        var computedLength = u.values(computed).length;
        if (self._lastData === null || computedLength === 0 || computedLength > 0 && !u.isEqual(self._lastData, computed)) {
          self._lastData = computed;
          func(stores, computed);
        }
      });
    }
  }
  return this;
};

Member.prototype.createDependency = function createDependency() {
  var dependency = this._alo.createDependency.apply(this._alo, arguments);
  this.addDependency(dependency);

  return dependency;
};

Member.prototype.disable = function disable() {
  this._enabled = false;
  return this;
};

Member.prototype.enable = function enable() {
  this._enabled = true;
  return this;
};

Member.prototype.isEnabled = function isEnabled() {
  return this._enabled;
};

Member.prototype.getFunction = function getFunction() {
  return this._function;
};

Member.prototype.setFunction = function setFunction(func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given needs to be a function');
  } else {
    this._function = func;
  }

  return this;
};

Member.prototype.stop = function stop() {
  this.disable();
  this.removeSubscription();

  return this;
};

module.exports = Member;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _objectRelation = __webpack_require__(6);

var _objectRelation2 = _interopRequireDefault(_objectRelation);

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Customizer = __webpack_require__(51);

var u = new _util2.default();

var customizer = new Customizer(true);
var middlewareRelation = new _objectRelation2.default('middleware', 'parentMiddleware', function () {
  return this._alo.isMiddleware.apply(this._alo, arguments);
});
var parentMiddlewareRelation = new _objectRelation2.default('parentMiddleware', 'middleware', function () {
  return this._alo.isMiddleware.apply(this._alo, arguments);
});
var storeRelation = new _objectRelation2.default('middleware', 'store', function () {
  return this._alo.isStore.apply(this._alo, arguments);
});

var Middleware = function Middleware() {
  customizer.constructParent(this);
  middlewareRelation.constructParent(this);
  parentMiddlewareRelation.constructParent(this);
  storeRelation.constructParent(this);
  customizer.constructParent(this);

  middleware.apply(this, arguments);
};
var middleware = u.createPolymorphic();
middleware.signature('', function () {});
middleware.signature('function', function (prepareFunction) {
  this.setCustomizer(prepareFunction, 'prepare');
});
middleware.signature('array', function (middlewares) {
  this.addMiddleware(middlewares);
});
middleware.signature('function, function', function (prepareFunction, finalizeFunction) {
  this.setCustomizer(prepareFunction, 'prepare');
  this.setCustomizer(finalizeFunction);
});
middleware.signature('function, array', function (prepareFunction, middlewares) {
  this.setCustomizer(prepareFunction, 'prepare');
  this.addMiddleware(middlewares);
});
middleware.signature('function, function, array', function (prepareFunction, finalizeFunction, middlewares) {
  this.setCustomizer(prepareFunction, 'prepare');
  this.setCustomizer(finalizeFunction);
  this.addMiddleware(middlewares);
});

customizer.registerParentPrototype(Middleware.prototype);
middlewareRelation.registerParentPrototype(Middleware.prototype);
parentMiddlewareRelation.registerParentPrototype(Middleware.prototype);
storeRelation.registerParentPrototype(Middleware.prototype);

Middleware.prototype.createMiddleware = function createMiddleware() {
  var middleware = this._alo.createMiddleware.apply(this._alo, arguments);
  this.addMiddleware(middleware);

  return middleware;
};

/*
 * The middleware handling is done in a recursive manner
 */
Middleware.prototype.meddleRecursive = function meddleRecursive(middlewares, args) {
  var self = this;
  args = u.values(args);
  // First argument is always the store
  var store = args[0];

  if (!u.isArray(middlewares)) {
    throw new Error('Argument given should be an array');
  } else if (middlewares.length === 0) {
    // store needs to be removed at the end of the recursion
    return args.slice(1);
  } else {
    return u.Promise.resolve().then(function () {
      if (self._alo.isMiddleware(middlewares[0])) {
        return middlewares[0].meddle(args);
      } else {
        return args.slice(1);
      }
    }).then(function (resultArgs) {
      resultArgs = u.values(resultArgs);
      if (resultArgs[0] === undefined) {
        resultArgs = args;
      } else {
        resultArgs.unshift(store);
      }
      args = resultArgs;
      middlewares = middlewares.slice(1);
      return self.meddleRecursive(middlewares, resultArgs);
    });
  }
};

Middleware.prototype.meddle = function meddle(args) {
  var self = this;
  args = u.values(args);
  var store = args[0];
  args = args.slice(1);

  var argsToArray = function argsToArray(resultArgs) {
    if (resultArgs === undefined) {
      resultArgs = args;
    } else if (!u.isArray(resultArgs)) {
      resultArgs = [resultArgs];
    }
    args = u.cloneDeep(resultArgs);

    return resultArgs;
  };

  return u.Promise.resolve().then(function () {
    var newArgs = u.cloneDeep(args);
    newArgs.unshift(store);
    newArgs.unshift('prepare');
    return self.callCustomizer.apply(self, newArgs);
  }).then(function (resultArgs) {
    return u.Promise.all(argsToArray(resultArgs));
  }).then(function (resultArgs) {
    resultArgs.unshift(store);
    return self.meddleRecursive(self.getMiddleware(false), resultArgs);
  }).then(function (resultArgs) {
    return u.Promise.all(argsToArray(resultArgs));
  }).then(function (resultArgs) {
    resultArgs.unshift(store);
    resultArgs.unshift('finalize');
    return self.callCustomizer.apply(self, resultArgs);
  }).then(function (resultArgs) {
    return u.Promise.all(argsToArray(resultArgs));
  }).then(function (resultArgs) {
    return resultArgs;
  });
};
module.exports = Middleware;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _objectRelation = __webpack_require__(6);

var _objectRelation2 = _interopRequireDefault(_objectRelation);

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Customizer = __webpack_require__(51);

var u = new _util2.default();
var customizer = new Customizer(false);

var storeRelation = new _objectRelation2.default('reducer', 'store', function () {
  return this._alo.isStore.apply(this._alo, arguments);
});
var reducerRelation = new _objectRelation2.default('reducer', 'parentReducer', function () {
  return this._alo.isReducer.apply(this._alo, arguments);
});
var parentReducerRelation = new _objectRelation2.default('parentReducer', 'reducer', function () {
  return this._alo.isReducer.apply(this._alo, arguments);
});

/**
 * Reducer class
 * TODO: Describe what this class is all about
 *
 * @class
 */
var Reducer = function Reducer() {
  /**
   * Is this reducer enabled?
   *
   * @name _enabled
   * @memberof Reducer
   * @private
   */
  this._enabled = true;

  /**
   * Unique ID of this reducer
   *
   * @name _id
   * @memberof Reducer
   * @private
   */
  this._id = null;

  /**
   * Array of registered reducers
   *
   * @name _reducers
   * @memberof Reducer
   * @private
   */
  this._reducerRelations = null;

  /**
   * Object of registered stores
   *
   * @name _stores
   * @memberof Reducer
   * @private
   */
  this._storeRelations = null;

  customizer.constructParent(this);
  storeRelation.constructParent(this);
  reducerRelation.constructParent(this);
  parentReducerRelation.constructParent(this);

  reducer.apply(this, arguments);
};
var reducer = u.createPolymorphic();
reducer.signature('', function () {});
reducer.signature('function', function (prepareFunction) {
  this.setCustomizer(prepareFunction, 'prepare');
});
reducer.signature('array', function (reducers) {
  this.addReducer(reducers);
});
reducer.signature('function, function', function (prepareFunction, finalizeFunction) {
  this.setCustomizer(prepareFunction, 'prepare');
  this.setCustomizer(finalizeFunction);
});
reducer.signature('function, array', function (prepareFunction, reducers) {
  this.setCustomizer(prepareFunction, 'prepare');
  this.addReducer(reducers);
});
reducer.signature('function, function, array', function (prepareFunction, finalizeFunction, reducers) {
  this.setCustomizer(prepareFunction, 'prepare');
  this.setCustomizer(finalizeFunction);
  this.addReducer(reducers);
});

/**
 * Get id of this reducer
 *
 * @return {string} Unique ID of this reducer
 */
Reducer.prototype.getId = null;

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
Reducer.prototype.addStore = null;

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
Reducer.prototype.removeStore = null;

customizer.registerParentPrototype(Reducer.prototype);
storeRelation.registerParentPrototype(Reducer.prototype);
reducerRelation.registerParentPrototype(Reducer.prototype);
parentReducerRelation.registerParentPrototype(Reducer.prototype);

Reducer.prototype.createReducer = function () {
  var reducer = this._alo.createReducer.apply(this._alo, arguments);
  this.addReducer(reducer);

  return reducer;
};

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
Reducer.prototype.reduce = function reduce(state, action) {
  if (this.isEnabled()) {
    var customizerResult = this.callCustomizer('prepare', u.cloneDeep(state), action);
    if (customizerResult !== undefined) {
      state = customizerResult;
    }
    u.forEach(this.getReducer(false), function (item) {
      state = item.reduce(u.cloneDeep(state), action);
    });
    customizerResult = this.callCustomizer('finalize', u.cloneDeep(state), action);
    if (customizerResult !== undefined) {
      state = customizerResult;
    }
  }

  return state;
};

/**
 * Disables this reducer
 *
 * @return {Reducer} this
 */
Reducer.prototype.disable = function disable() {
  this._enabled = false;

  return this;
};

/**
 * Enables this reducer
 *
 * @return {Reducer} this
 */
Reducer.prototype.enable = function enable() {
  this._enabled = true;

  return this;
};

Reducer.prototype.isEnabled = function isEnabled() {
  return this._enabled;
};

/**
 * Stops this reducer: it will be disabled and removed from all stores
 *
 * @return {Reducer} this
 */
Reducer.prototype.stop = function stop() {
  this.removeStore();
  this.disable();
  return this;
};

module.exports = Reducer;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typecheck = __webpack_require__(85);

var _objectRelation = __webpack_require__(6);

var _objectRelation2 = _interopRequireDefault(_objectRelation);

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var u = new _util2.default();

var reducerRelation = new _objectRelation2.default('store', 'reducer', function () {
  return this._alo.isReducer.apply(this._alo, arguments);
});
var subscriptionRelation = new _objectRelation2.default('store', 'subscription', function () {
  return this._alo.isSubscription.apply(this._alo, arguments);
});
var middlewareRelation = new _objectRelation2.default('store', 'middleware', function () {
  return this._alo.isMiddleware.apply(this._alo, arguments);
});
var computedPropertyRelation = new _objectRelation2.default('store', 'computedProperty', function () {
  return this._alo.isDependency.apply(this._alo, arguments);
});

/**
 * The core of Alo. A store is the central place for application state
 *
 * @class
 *
 * @param {Object} state - Optional object to set as a start state
 */
var Store = function Store(state, id) {
  if (state === undefined || state === null) {
    state = {};
  }
  state = {
    state: state,
    computed: {},
    action: { type: null, payload: null }
  };

  /**
   * @private
   */

  /*
   * TODO: Document members
   */

  this._id = null;
  if (id != null && (0, _typecheck.isString)(id)) {
    id = id.trim();
    if (id !== '') {
      this._id = id;
    }
  }

  /**
   * Stream
   */
  this._stream = u.createStream(state);

  /**
   * Reducers
   */
  this._reducerRelations = null;

  /**
   * Middlewares
   */
  this._middlewareRelations = null;

  /**
   * Subscriptions
   */
  this._subscriptionRelations = null;

  this._computedProperty = {};

  reducerRelation.constructParent(this);
  middlewareRelation.constructParent(this);
  subscriptionRelation.constructParent(this);
  computedPropertyRelation.constructParent(this);
};

/*
 * Setup relations
 */

/**
 * Returns the id of the store
 *
 * @function
 */
Store.prototype.getId = null;

/**
 * Returns the registered reducers
 *
 * @function
 * @return {array} Array of reducers
 */
Store.prototype.getReducer = null;

/**
 * Adds a reducer object to the registered reducers
 *
 * @function
 * @param {Reducer} reducer
 *
 * @return {Store} this
 */
Store.prototype.addReducer = null;

/**
 * Removes a reducer from the currently registered reducers
 *
 * @function
 * @param {int|Reducer} reducer id or Reducer
 *
 * @return {Store} this
 */
Store.prototype.removeReducer = null;

/**
 * Returns the registered middlewares
 *
 * @function
 * @param {string} [id] The id is optional
 *
 * @return {array|Middleware|false} Array of middlewares, middleware with id, or false if middleware with id wasn't found
 */
Store.prototype.getMiddleware = null;

/**
 * Registers one or multible middlewares on this store
 *
 * @function
 * @return {Store} this
 */
Store.prototype.addMiddleware = null;

/**
 * Removes a middleware
 *
 * @function
 * @param {id|Middleware} id of middleware or middleware
 *
 * @return {Store} this
 */
Store.prototype.removeMiddleware;

/**
 * Get a registered subscription by id
 *
 * @function
 */
Store.prototype.getSubscription = null;

/**
 * Registers a subscription
 *
 * @function
 */
Store.prototype.addSubscription = null;

/**
 * Removes a subscription
 *
 * @function
 */
Store.prototype.removeSubscription = null;

reducerRelation.registerParentPrototype(Store.prototype);
middlewareRelation.registerParentPrototype(Store.prototype);
subscriptionRelation.registerParentPrototype(Store.prototype);
computedPropertyRelation.registerParentPrototype(Store.prototype);

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
Store.prototype.createReducer = function createReducer() {
  var reducer = this._alo.createReducer.apply(this._alo, arguments);
  this.addReducer(reducer);

  return reducer;
};

Store.prototype.mapState = function mapState(func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given should be a function');
  } else {
    return u.map(this.getState(), func);
  }
};

Store.prototype.mapData = function mapData(func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given should be a function');
  } else {
    return u.map(this.getData(), func);
  }
};

Store.prototype.mapStream = function mapStream(func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given should be a function');
  } else {
    return u.mapStream(func, this.getStream());
  }
};

/**
 * Returns the stream of this store
 *
 * @return {stream} flyd stream
 */
Store.prototype.getStream = function getStream() {
  // TODO: Implement Stream Combine
  return this._stream;
};

/**
 * Returns the current state
 *
 * @return {object} current state
 */
Store.prototype.getData = function getData() {
  return u.cloneDeep(this.getStream()());
};

Store.prototype.getState = function getState() {
  return this.getData().state;
};

Store.prototype.createComputedProperty = function createComputedProperty() {
  var dependency = this._alo.createDependency.apply(this._alo, arguments);
  this.addComputedProperty(dependency);

  return dependency;
};

Store.prototype.createSubscription = function createSubscription() {
  var subscription = this._alo.createSubscription.apply(this._alo, arguments);
  this.addSubscription(subscription);
  return subscription;
};
Store.prototype.subscribe = Store.prototype.createSubscription;

/**
 * Dispatches an action
 *
 * @function
 * @param {function|object} action An untyped action function that returns payload, or an action object
 *
 * @return {Store} this
 */
Store.prototype.dispatch = function () {
  var self = this;
  var dispatchArguments = u.values(arguments);

  var formatAction = function formatAction(action) {
    // Set the type to null if it is undefined
    if (action.type === undefined) {
      action.type = null;
    }
    if (action.payload === undefined) {
      action.payload = null;
    }
    return action;
  };

  return u.Promise.resolve().then(function () {
    /*
     * Start with middleware logic
     */
    var middlewares = self.getMiddleware(false);
    if (middlewares.length > 0 && self._alo.isMiddleware(middlewares[0])) {
      dispatchArguments.unshift(self);
      return u.Promise.resolve().then(function () {
        return middlewares[0].meddleRecursive(middlewares, dispatchArguments);
      }).then(function (resultArgs) {
        if (u.isArray(resultArgs)) {
          return resultArgs[0];
        } else {
          return resultArgs;
        }
      });
    } else {
      return dispatchArguments[0];
    }
  }).then(function (action) {
    /*
     * Here is the final commit part
     */
    if (!u.isPlainObject(action)) {
      return false;
    } else {
      action = formatAction(action);
      var state = self.getData();
      var newState = state.state;
      u.forEach(self.getReducer(false), function (reducer) {
        if (self._alo.isReducer(reducer)) {
          newState = reducer.reduce(u.cloneDeep(newState), action);
        }
      });

      newState = {
        state: newState,
        computed: {},
        action: action
      };

      return u.Promise.resolve().then(function () {
        /*
         * Add the computed properties into the mix
         */
        var computedProperties = self.getComputedProperty(false);
        if (computedProperties.length > 0) {
          return computedProperties[0].reduceRecursive(computedProperties, self.getId(), u.cloneDeep(newState));
        } else {
          return newState.computed;
        }
      }).then(function (computed) {
        newState.computed = computed;

        // Apply the changed state
        var stream = self.getStream();
        stream(newState);
      });
    }
  });
};

module.exports = Store;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _objectRelation = __webpack_require__(6);

var _objectRelation2 = _interopRequireDefault(_objectRelation);

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var u = new _util2.default();

var storeRelation = new _objectRelation2.default('subscription', 'store', function () {
  return this._alo.isStore.apply(this._alo, arguments);
});
var memberRelation = new _objectRelation2.default('subscription', 'member', function () {
  return this._alo.isMember.apply(this._alo, arguments);
});
var dependencyRelation = new _objectRelation2.default('subscription', 'dependency', function () {
  return this._alo.isDependency.apply(this._alo, arguments);
});

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
var Subscription = function Subscription() {
  this._id = null;

  this._storeRelations = null;
  this._memberRelations = null;
  this._dependencyRelations = null;

  this._events = {
    'beforePublish': [],
    'afterPublish': []
  };

  this._subscriptionStream = null;
  this._stream = null;
  this._lastData = null;

  this._muted = false;

  storeRelation.constructParent(this);
  memberRelation.constructParent(this);
  dependencyRelation.constructParent(this);

  subscription.apply(this, arguments);
};

var subscription = u.createPolymorphic();
subscription.signature('', function () {});
subscription.signature('object, array', function (dependencies, members) {
  this.setDependency(dependencies);
  this.addMember(members);
});
subscription.signature('object', function (dependencies) {
  this.setDependency(dependencies);
});
subscription.signature('array', function (members) {
  this.addMember(members);
});
subscription.signature('function', function (func) {
  this.createMember(func);
});

Subscription.prototype.addMember = null;
Subscription.prototype.getMember = null;

var afterChange = function afterChange() {
  var self = this;

  if (u.isStream(this._stream)) {
    this._stream.end(true);
    this._stream = null;
  }
  if (u.isStream(this._subscriptionStream)) {
    this._subscriptionStream.end(true);
    this._subscriptionStream = null;
  }

  var streams = [];
  var stores = u.values(this.getStore());
  u.forEach(stores, function (store) {
    streams.push(store.getStream());
  });
  this._stream = u.combineStreams(function () {
    var streamState = {};
    u.forEach(u.values(arguments), function (stream, idx) {
      if (self._alo.isStore(stores[idx])) {
        streamState[stores[idx].getId()] = stream();
      }
    });
    return u.Promise.resolve().then(function () {
      var dependencies = self.getDependency(false);
      if (dependencies.length > 0) {
        var depsState = {
          state: streamState,
          computed: {}
        };
        return dependencies[0].reduceRecursive(dependencies, self.getId(), depsState);
      } else {
        return {};
      }
    }).then(function (computed) {
      return { stores: streamState, computed: computed };
    });
  }, streams);
  this._subscriptionStream = u.streamOn(function (data) {
    var computedLength = u.values(data.computed).length;
    if (self._lastData === null || computedLength === 0 && !u.isEqual(self._lastData.stores, data.stores) || computedLength > 0 && !u.isEqual(self._lastData.computed, data.computed)) {
      self._lastData = data;
      self._publish(data);
    }
  }, this._stream);
};

storeRelation.after('add', afterChange);
storeRelation.after('remove', afterChange);

storeRelation.registerParentPrototype(Subscription.prototype);
memberRelation.registerParentPrototype(Subscription.prototype);
dependencyRelation.registerParentPrototype(Subscription.prototype);

Subscription.prototype.createMember = function createMember() {
  var member = this._alo.createMember.apply(this._alo, arguments);
  this.addMember(member);

  return member;
};

Subscription.prototype._callEvent = function (name, state) {
  var promises = this._events[name].map(function (func) {
    return u.Promise.resolve(state).then(func);
  });
  return u.Promise.all(promises).then(function (results) {
    var result = results.indexOf(false) === -1;
    return result;
  });
};

Subscription.prototype._publish = function (state) {
  var self = this;
  if (self._muted === false) {
    self._muted = true;
    var promise = u.Promise.resolve().then(function () {
      return self._callEvent('beforePublish', state);
    }).then(function (runPublish) {
      self._muted = false;
      if (runPublish !== false) {
        var state = self.getData();
        var promises = [];
        u.forEach(self.getMember(false), function (member) {
          promises.push(member._call(state.stores, state.computed));
        });
        return u.Promise.all(promises);
      } else {
        return false;
      }
    }).then(function (runPublish) {
      if (runPublish !== false) {
        self._muted = true;
        return self._callEvent('afterPublish', state);
      }
    }).then(function () {
      self._muted = false;
      return null;
    });
    return promise;
  }
};

Subscription.prototype.enable = null;
Subscription.prototype.disable = null;

Subscription.prototype.remember = function remember() {
  var self = this;

  var data = self.getData();

  return self._publish(data);
};

Subscription.prototype.stop = function stop() {
  this.disable();
  this.removeStore();

  return this;
};

Subscription.prototype.getStream = function getStream() {
  return this._stream;
};

Subscription.prototype.getData = function getData() {
  return u.cloneDeep(this.getStream()());
};

Subscription.prototype.createDependency = function createDependency() {
  var dependency = this._alo.createDependency.apply(this._alo, arguments);
  this.addDependency(dependency);

  return dependency;
};

Subscription.prototype.on = u.createPolymorphic();
var on = Subscription.prototype.on;
on.signature('string, function', function (type, func) {
  if (!u.isArray(this._events[type])) {
    throw new Error('Argument type is not a valid type');
  } else {
    var idx = this._events[type].length;
    this._events[type].push(func);
  }
  return {
    stop: function stop() {
      delete this._events[type][idx];
    }
  };
});

module.exports = Subscription;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

var _objectRelation = __webpack_require__(6);

var _objectRelation2 = _interopRequireDefault(_objectRelation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var u = new _util2.default();

var functions = {
  getCustomizer: {},
  setCustomizer: {},
  unsetCustomizer: {},
  callCustomizer: {}
};

var customizerTypes = ['prepare', 'finalize'];

var Customizer = function Customizer(async) {
  var self = this;

  this.async = async === true;

  this.functions = {};
  u.forEach(functions, function (func, funcName) {
    self.functions[funcName] = {
      after: []
    };
  });
};

Customizer.prototype.constructParent = function (parent) {
  parent._customizers = {};
  u.forEach(customizerTypes, function (type) {
    parent._customizers[type] = false;
  });
};

Customizer.prototype.registerParentPrototype = function (proto) {
  return _objectRelation2.default.prototype.registerParentPrototype.call(this, proto);
};

/**
 *
 */
Customizer.prototype.setCustomizerFunction = u.createPolymorphic();
var set = Customizer.prototype.setCustomizerFunction;
set.signature('object, function, string b=finalize', function (config, func, type) {
  if (customizerTypes.indexOf(type) === -1) {
    throw new Error('Argument for type is invalid');
  } else {
    this._customizers[type] = func;
  }

  return this;
});

Customizer.prototype.unsetCustomizerFunction = function (config, type) {
  var self = this;

  if (type !== undefined && customizerTypes.indexOf(type) === -1) {
    throw new Error('Argument for type should be prepare or finalize');
  } else {
    if (type === undefined) {
      u.forEach(this._customizers, function (func, type) {
        self.unsetCustomizer(type);
      });
    } else {
      this._customizers[type] = false;
    }
  }

  return this;
};

Customizer.prototype.getCustomizerFunction = u.createPolymorphic();
var get = Customizer.prototype.getCustomizerFunction;
get.signature('object, string a=finalize', function (config, type) {
  if (customizerTypes.indexOf(type) === -1) {
    throw new Error('Argument for type is invalid');
  } else {
    return this._customizers[type];
  }
});

Customizer.prototype.callCustomizerFunction = function (config, type) {
  if (!u.isString(type)) {
    throw new Error('Argument for type should be a string');
  } else {
    var func = this.getCustomizer(type);
    if (!u.isFunction(func)) {
      return undefined;
    } else {
      var args = u.values(arguments);
      /*
       * The config argument is prepended to the function by the customizer - not by the user
       * This error is done for the enduser which doenst know about config
       */
      if (args.length <= 2) {
        throw new Error('Atleast two arguments are required');
      }
      args = args.slice(2);
      if (config.async === true) {
        return u.Promise.resolve().then(function () {
          return func.apply(null, args);
        });
      } else {
        return func.apply(null, args);
      }
    }
  }
};

module.exports = Customizer;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ },
/* 53 */
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
/* 54 */
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(121),
    isArguments = __webpack_require__(39),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(21),
    isIndex = __webpack_require__(35),
    isTypedArray = __webpack_require__(41);

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
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(28),
    eq = __webpack_require__(12);

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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(28),
    eq = __webpack_require__(12);

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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(138);

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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(64),
    toKey = __webpack_require__(19);

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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(56),
    isArray = __webpack_require__(0);

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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

var baseMatches = __webpack_require__(113),
    baseMatchesProperty = __webpack_require__(114),
    identity = __webpack_require__(20),
    isArray = __webpack_require__(0),
    property = __webpack_require__(198);

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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(0),
    isKey = __webpack_require__(36),
    stringToPath = __webpack_require__(183),
    toString = __webpack_require__(81);

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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(3);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)(module)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(31);

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
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(92),
    arraySome = __webpack_require__(97),
    cacheHas = __webpack_require__(126);

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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(62),
    getSymbols = __webpack_require__(33),
    keys = __webpack_require__(8);

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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(56),
    getPrototype = __webpack_require__(32),
    getSymbols = __webpack_require__(33),
    stubArray = __webpack_require__(80);

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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(101),
    getPrototype = __webpack_require__(32),
    isPrototype = __webpack_require__(37);

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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);

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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    getPrototype = __webpack_require__(32),
    isObjectLike = __webpack_require__(4);

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
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(123);

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
/* 82 */
/***/ function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

var _isPlaceholder = __webpack_require__(42);


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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.isString = exports.createTypecheck = undefined;

var _util = __webpack_require__(2);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = new _util2.default();

/**
 * Creates a typecheck function which throws an error if the typechecker returns false
 */


var createTypecheck = exports.createTypecheck = function createTypecheck(isType, type) {
  return function (value) {
    if (!isType(value)) {
      throw new Error('Type of argument should be a ' + type);
    } else {
      return true;
    }
  };
};

/**
 * Throws an error of type is not a string
 */
var isString = exports.isString = function isString(value) {
  return createTypecheck(util.isString, 'string')(value);
};

var isArray = exports.isArray = function isArray(value) {
  return createTypecheck(util.isArray, 'array')(value);
};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, setImmediate) {/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2015 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.4.7
 * Features enabled: core
 * Features disabled: race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Promise=t()}}(function(){var t,e,n;return function r(t,e,n){function i(a,s){if(!e[a]){if(!t[a]){var c="function"==typeof _dereq_&&_dereq_;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return i(n?n:e)},u,u.exports,r,t,e,n)}return e[a].exports}for(var o="function"==typeof _dereq_&&_dereq_,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(t,e,n){"use strict";function r(){this._customScheduler=!1,this._isTickUsed=!1,this._lateQueue=new u(16),this._normalQueue=new u(16),this._haveDrainedQueues=!1,this._trampolineEnabled=!0;var t=this;this.drainQueues=function(){t._drainQueues()},this._schedule=l}function i(t,e,n){this._lateQueue.push(t,e,n),this._queueTick()}function o(t,e,n){this._normalQueue.push(t,e,n),this._queueTick()}function a(t){this._normalQueue._pushOne(t),this._queueTick()}var s;try{throw new Error}catch(c){s=c}var l=t("./schedule"),u=t("./queue"),p=t("./util");r.prototype.setScheduler=function(t){var e=this._schedule;return this._schedule=t,this._customScheduler=!0,e},r.prototype.hasCustomScheduler=function(){return this._customScheduler},r.prototype.enableTrampoline=function(){this._trampolineEnabled=!0},r.prototype.disableTrampolineIfNecessary=function(){p.hasDevTools&&(this._trampolineEnabled=!1)},r.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues},r.prototype.fatalError=function(t,e){e?(process.stderr.write("Fatal "+(t instanceof Error?t.stack:t)+"\n"),process.exit(2)):this.throwLater(t)},r.prototype.throwLater=function(t,e){if(1===arguments.length&&(e=t,t=function(){throw e}),"undefined"!=typeof setTimeout)setTimeout(function(){t(e)},0);else try{this._schedule(function(){t(e)})}catch(n){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")}},p.hasDevTools?(r.prototype.invokeLater=function(t,e,n){this._trampolineEnabled?i.call(this,t,e,n):this._schedule(function(){setTimeout(function(){t.call(e,n)},100)})},r.prototype.invoke=function(t,e,n){this._trampolineEnabled?o.call(this,t,e,n):this._schedule(function(){t.call(e,n)})},r.prototype.settlePromises=function(t){this._trampolineEnabled?a.call(this,t):this._schedule(function(){t._settlePromises()})}):(r.prototype.invokeLater=i,r.prototype.invoke=o,r.prototype.settlePromises=a),r.prototype._drainQueue=function(t){for(;t.length()>0;){var e=t.shift();if("function"==typeof e){var n=t.shift(),r=t.shift();e.call(n,r)}else e._settlePromises()}},r.prototype._drainQueues=function(){this._drainQueue(this._normalQueue),this._reset(),this._haveDrainedQueues=!0,this._drainQueue(this._lateQueue)},r.prototype._queueTick=function(){this._isTickUsed||(this._isTickUsed=!0,this._schedule(this.drainQueues))},r.prototype._reset=function(){this._isTickUsed=!1},e.exports=r,e.exports.firstLineError=s},{"./queue":17,"./schedule":18,"./util":21}],2:[function(t,e,n){"use strict";e.exports=function(t,e,n,r){var i=!1,o=function(t,e){this._reject(e)},a=function(t,e){e.promiseRejectionQueued=!0,e.bindingPromise._then(o,o,null,this,t)},s=function(t,e){0===(50397184&this._bitField)&&this._resolveCallback(e.target)},c=function(t,e){e.promiseRejectionQueued||this._reject(t)};t.prototype.bind=function(o){i||(i=!0,t.prototype._propagateFrom=r.propagateFromFunction(),t.prototype._boundValue=r.boundValueFunction());var l=n(o),u=new t(e);u._propagateFrom(this,1);var p=this._target();if(u._setBoundTo(l),l instanceof t){var f={promiseRejectionQueued:!1,promise:u,target:p,bindingPromise:l};p._then(e,a,void 0,u,f),l._then(s,c,void 0,u,f),u._setOnCancel(l)}else u._resolveCallback(p);return u},t.prototype._setBoundTo=function(t){void 0!==t?(this._bitField=2097152|this._bitField,this._boundTo=t):this._bitField=-2097153&this._bitField},t.prototype._isBound=function(){return 2097152===(2097152&this._bitField)},t.bind=function(e,n){return t.resolve(n).bind(e)}}},{}],3:[function(t,e,n){"use strict";function r(){try{Promise===o&&(Promise=i)}catch(t){}return o}var i;"undefined"!=typeof Promise&&(i=Promise);var o=t("./promise")();o.noConflict=r,e.exports=o},{"./promise":15}],4:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){var o=t("./util"),a=o.tryCatch,s=o.errorObj,c=e._async;e.prototype["break"]=e.prototype.cancel=function(){if(!i.cancellation())return this._warn("cancellation is disabled");for(var t=this,e=t;t._isCancellable();){if(!t._cancelBy(e)){e._isFollowing()?e._followee().cancel():e._cancelBranched();break}var n=t._cancellationParent;if(null==n||!n._isCancellable()){t._isFollowing()?t._followee().cancel():t._cancelBranched();break}t._isFollowing()&&t._followee().cancel(),t._setWillBeCancelled(),e=t,t=n}},e.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--},e.prototype._enoughBranchesHaveCancelled=function(){return void 0===this._branchesRemainingToCancel||this._branchesRemainingToCancel<=0},e.prototype._cancelBy=function(t){return t===this?(this._branchesRemainingToCancel=0,this._invokeOnCancel(),!0):(this._branchHasCancelled(),this._enoughBranchesHaveCancelled()?(this._invokeOnCancel(),!0):!1)},e.prototype._cancelBranched=function(){this._enoughBranchesHaveCancelled()&&this._cancel()},e.prototype._cancel=function(){this._isCancellable()&&(this._setCancelled(),c.invoke(this._cancelPromises,this,void 0))},e.prototype._cancelPromises=function(){this._length()>0&&this._settlePromises()},e.prototype._unsetOnCancel=function(){this._onCancelField=void 0},e.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled()},e.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled()},e.prototype._doInvokeOnCancel=function(t,e){if(o.isArray(t))for(var n=0;n<t.length;++n)this._doInvokeOnCancel(t[n],e);else if(void 0!==t)if("function"==typeof t){if(!e){var r=a(t).call(this._boundValue());r===s&&(this._attachExtraTrace(r.e),c.throwLater(r.e))}}else t._resultCancelled(this)},e.prototype._invokeOnCancel=function(){var t=this._onCancel();this._unsetOnCancel(),c.invoke(this._doInvokeOnCancel,this,t)},e.prototype._invokeInternalOnCancel=function(){this._isCancellable()&&(this._doInvokeOnCancel(this._onCancel(),!0),this._unsetOnCancel())},e.prototype._resultCancelled=function(){this.cancel()}}},{"./util":21}],5:[function(t,e,n){"use strict";e.exports=function(e){function n(t,n,s){return function(c){var l=s._boundValue();t:for(var u=0;u<t.length;++u){var p=t[u];if(p===Error||null!=p&&p.prototype instanceof Error){if(c instanceof p)return o(n).call(l,c)}else if("function"==typeof p){var f=o(p).call(l,c);if(f===a)return f;if(f)return o(n).call(l,c)}else if(r.isObject(c)){for(var h=i(p),_=0;_<h.length;++_){var d=h[_];if(p[d]!=c[d])continue t}return o(n).call(l,c)}}return e}}var r=t("./util"),i=t("./es5").keys,o=r.tryCatch,a=r.errorObj;return n}},{"./es5":10,"./util":21}],6:[function(t,e,n){"use strict";e.exports=function(t){function e(){this._trace=new e.CapturedTrace(r())}function n(){return i?new e:void 0}function r(){var t=o.length-1;return t>=0?o[t]:void 0}var i=!1,o=[];return t.prototype._promiseCreated=function(){},t.prototype._pushContext=function(){},t.prototype._popContext=function(){return null},t._peekContext=t.prototype._peekContext=function(){},e.prototype._pushContext=function(){void 0!==this._trace&&(this._trace._promiseCreated=null,o.push(this._trace))},e.prototype._popContext=function(){if(void 0!==this._trace){var t=o.pop(),e=t._promiseCreated;return t._promiseCreated=null,e}return null},e.CapturedTrace=null,e.create=n,e.deactivateLongStackTraces=function(){},e.activateLongStackTraces=function(){var n=t.prototype._pushContext,o=t.prototype._popContext,a=t._peekContext,s=t.prototype._peekContext,c=t.prototype._promiseCreated;e.deactivateLongStackTraces=function(){t.prototype._pushContext=n,t.prototype._popContext=o,t._peekContext=a,t.prototype._peekContext=s,t.prototype._promiseCreated=c,i=!1},i=!0,t.prototype._pushContext=e.prototype._pushContext,t.prototype._popContext=e.prototype._popContext,t._peekContext=t.prototype._peekContext=r,t.prototype._promiseCreated=function(){var t=this._peekContext();t&&null==t._promiseCreated&&(t._promiseCreated=this)}},e}},{}],7:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,e){return{promise:e}}function i(){return!1}function o(t,e,n){var r=this;try{t(e,n,function(t){if("function"!=typeof t)throw new TypeError("onCancel must be a function, got: "+I.toString(t));r._attachCancellationCallback(t)})}catch(i){return i}}function a(t){if(!this._isCancellable())return this;var e=this._onCancel();void 0!==e?I.isArray(e)?e.push(t):this._setOnCancel([e,t]):this._setOnCancel(t)}function s(){return this._onCancelField}function c(t){this._onCancelField=t}function l(){this._cancellationParent=void 0,this._onCancelField=void 0}function u(t,e){if(0!==(1&e)){this._cancellationParent=t;var n=t._branchesRemainingToCancel;void 0===n&&(n=0),t._branchesRemainingToCancel=n+1}0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function p(t,e){0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function f(){var t=this._boundTo;return void 0!==t&&t instanceof e?t.isFulfilled()?t.value():void 0:t}function h(){this._trace=new x(this._peekContext())}function _(t,e){if(H(t)){var n=this._trace;if(void 0!==n&&e&&(n=n._parent),void 0!==n)n.attachExtraTrace(t);else if(!t.__stackCleaned__){var r=E(t);I.notEnumerableProp(t,"stack",r.message+"\n"+r.stack.join("\n")),I.notEnumerableProp(t,"__stackCleaned__",!0)}}}function d(t,e,n,r,i){if(void 0===t&&null!==e&&X){if(void 0!==i&&i._returnedNonUndefined())return;if(0===(65535&r._bitField))return;n&&(n+=" ");var o="",a="";if(e._trace){for(var s=e._trace.stack.split("\n"),c=C(s),l=c.length-1;l>=0;--l){var u=c[l];if(!V.test(u)){var p=u.match(Q);p&&(o="at "+p[1]+":"+p[2]+":"+p[3]+" ");break}}if(c.length>0)for(var f=c[0],l=0;l<s.length;++l)if(s[l]===f){l>0&&(a="\n"+s[l-1]);break}}var h="a promise was created in a "+n+"handler "+o+"but was not returned from it, see http://goo.gl/rRqMUw"+a;r._warn(h,!0,e)}}function v(t,e){var n=t+" is deprecated and will be removed in a future version.";return e&&(n+=" Use "+e+" instead."),y(n)}function y(t,n,r){if(ot.warnings){var i,o=new U(t);if(n)r._attachExtraTrace(o);else if(ot.longStackTraces&&(i=e._peekContext()))i.attachExtraTrace(o);else{var a=E(o);o.stack=a.message+"\n"+a.stack.join("\n")}tt("warning",o)||k(o,"",!0)}}function g(t,e){for(var n=0;n<e.length-1;++n)e[n].push("From previous event:"),e[n]=e[n].join("\n");return n<e.length&&(e[n]=e[n].join("\n")),t+"\n"+e.join("\n")}function m(t){for(var e=0;e<t.length;++e)(0===t[e].length||e+1<t.length&&t[e][0]===t[e+1][0])&&(t.splice(e,1),e--)}function b(t){for(var e=t[0],n=1;n<t.length;++n){for(var r=t[n],i=e.length-1,o=e[i],a=-1,s=r.length-1;s>=0;--s)if(r[s]===o){a=s;break}for(var s=a;s>=0;--s){var c=r[s];if(e[i]!==c)break;e.pop(),i--}e=r}}function C(t){for(var e=[],n=0;n<t.length;++n){var r=t[n],i="    (No stack trace)"===r||q.test(r),o=i&&nt(r);i&&!o&&(M&&" "!==r.charAt(0)&&(r="    "+r),e.push(r))}return e}function w(t){for(var e=t.stack.replace(/\s+$/g,"").split("\n"),n=0;n<e.length;++n){var r=e[n];if("    (No stack trace)"===r||q.test(r))break}return n>0&&"SyntaxError"!=t.name&&(e=e.slice(n)),e}function E(t){var e=t.stack,n=t.toString();return e="string"==typeof e&&e.length>0?w(t):["    (No stack trace)"],{message:n,stack:"SyntaxError"==t.name?e:C(e)}}function k(t,e,n){if("undefined"!=typeof console){var r;if(I.isObject(t)){var i=t.stack;r=e+G(i,t)}else r=e+String(t);"function"==typeof L?L(r,n):("function"==typeof console.log||"object"==typeof console.log)&&console.log(r)}}function j(t,e,n,r){var i=!1;try{"function"==typeof e&&(i=!0,"rejectionHandled"===t?e(r):e(n,r))}catch(o){B.throwLater(o)}"unhandledRejection"===t?tt(t,n,r)||i||k(n,"Unhandled rejection "):tt(t,r)}function F(t){var e;if("function"==typeof t)e="[function "+(t.name||"anonymous")+"]";else{e=t&&"function"==typeof t.toString?t.toString():I.toString(t);var n=/\[object [a-zA-Z0-9$_]+\]/;if(n.test(e))try{var r=JSON.stringify(t);e=r}catch(i){}0===e.length&&(e="(empty array)")}return"(<"+T(e)+">, no stack trace)"}function T(t){var e=41;return t.length<e?t:t.substr(0,e-3)+"..."}function P(){return"function"==typeof it}function R(t){var e=t.match(rt);return e?{fileName:e[1],line:parseInt(e[2],10)}:void 0}function S(t,e){if(P()){for(var n,r,i=t.stack.split("\n"),o=e.stack.split("\n"),a=-1,s=-1,c=0;c<i.length;++c){var l=R(i[c]);if(l){n=l.fileName,a=l.line;break}}for(var c=0;c<o.length;++c){var l=R(o[c]);if(l){r=l.fileName,s=l.line;break}}0>a||0>s||!n||!r||n!==r||a>=s||(nt=function(t){if(D.test(t))return!0;var e=R(t);return e&&e.fileName===n&&a<=e.line&&e.line<=s?!0:!1})}}function x(t){this._parent=t,this._promisesCreated=0;var e=this._length=1+(void 0===t?0:t._length);it(this,x),e>32&&this.uncycle()}var O,A,L,N=e._getDomain,B=e._async,U=t("./errors").Warning,I=t("./util"),H=I.canAttachTrace,D=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,V=/\((?:timers\.js):\d+:\d+\)/,Q=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,q=null,G=null,M=!1,W=!(0==I.env("BLUEBIRD_DEBUG")||!I.env("BLUEBIRD_DEBUG")&&"development"!==I.env("NODE_ENV")),$=!(0==I.env("BLUEBIRD_WARNINGS")||!W&&!I.env("BLUEBIRD_WARNINGS")),z=!(0==I.env("BLUEBIRD_LONG_STACK_TRACES")||!W&&!I.env("BLUEBIRD_LONG_STACK_TRACES")),X=0!=I.env("BLUEBIRD_W_FORGOTTEN_RETURN")&&($||!!I.env("BLUEBIRD_W_FORGOTTEN_RETURN"));e.prototype.suppressUnhandledRejections=function(){var t=this._target();t._bitField=-1048577&t._bitField|524288},e.prototype._ensurePossibleRejectionHandled=function(){0===(524288&this._bitField)&&(this._setRejectionIsUnhandled(),B.invokeLater(this._notifyUnhandledRejection,this,void 0))},e.prototype._notifyUnhandledRejectionIsHandled=function(){j("rejectionHandled",O,void 0,this)},e.prototype._setReturnedNonUndefined=function(){this._bitField=268435456|this._bitField},e.prototype._returnedNonUndefined=function(){return 0!==(268435456&this._bitField)},e.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var t=this._settledValue();this._setUnhandledRejectionIsNotified(),j("unhandledRejection",A,t,this)}},e.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=262144|this._bitField},e.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=-262145&this._bitField},e.prototype._isUnhandledRejectionNotified=function(){return(262144&this._bitField)>0},e.prototype._setRejectionIsUnhandled=function(){this._bitField=1048576|this._bitField},e.prototype._unsetRejectionIsUnhandled=function(){this._bitField=-1048577&this._bitField,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},e.prototype._isRejectionUnhandled=function(){return(1048576&this._bitField)>0},e.prototype._warn=function(t,e,n){return y(t,e,n||this)},e.onPossiblyUnhandledRejection=function(t){var e=N();A="function"==typeof t?null===e?t:I.domainBind(e,t):void 0},e.onUnhandledRejectionHandled=function(t){var e=N();O="function"==typeof t?null===e?t:I.domainBind(e,t):void 0};var K=function(){};e.longStackTraces=function(){if(B.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if(!ot.longStackTraces&&P()){var t=e.prototype._captureStackTrace,r=e.prototype._attachExtraTrace;ot.longStackTraces=!0,K=function(){if(B.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");e.prototype._captureStackTrace=t,e.prototype._attachExtraTrace=r,n.deactivateLongStackTraces(),B.enableTrampoline(),ot.longStackTraces=!1},e.prototype._captureStackTrace=h,e.prototype._attachExtraTrace=_,n.activateLongStackTraces(),B.disableTrampolineIfNecessary()}},e.hasLongStackTraces=function(){return ot.longStackTraces&&P()};var J=function(){try{if("function"==typeof CustomEvent){var t=new CustomEvent("CustomEvent");return I.global.dispatchEvent(t),function(t,e){var n=new CustomEvent(t.toLowerCase(),{detail:e,cancelable:!0});return!I.global.dispatchEvent(n)}}if("function"==typeof Event){var t=new Event("CustomEvent");return I.global.dispatchEvent(t),function(t,e){var n=new Event(t.toLowerCase(),{cancelable:!0});return n.detail=e,!I.global.dispatchEvent(n)}}var t=document.createEvent("CustomEvent");return t.initCustomEvent("testingtheevent",!1,!0,{}),I.global.dispatchEvent(t),function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t.toLowerCase(),!1,!0,e),!I.global.dispatchEvent(n)}}catch(e){}return function(){return!1}}(),Y=function(){return I.isNode?function(){return process.emit.apply(process,arguments)}:I.global?function(t){var e="on"+t.toLowerCase(),n=I.global[e];return n?(n.apply(I.global,[].slice.call(arguments,1)),!0):!1}:function(){return!1}}(),Z={promiseCreated:r,promiseFulfilled:r,promiseRejected:r,promiseResolved:r,promiseCancelled:r,promiseChained:function(t,e,n){return{promise:e,child:n}},warning:function(t,e){return{warning:e}},unhandledRejection:function(t,e,n){return{reason:e,promise:n}},rejectionHandled:r},tt=function(t){var e=!1;try{e=Y.apply(null,arguments)}catch(n){B.throwLater(n),e=!0}var r=!1;try{r=J(t,Z[t].apply(null,arguments))}catch(n){B.throwLater(n),r=!0}return r||e};e.config=function(t){if(t=Object(t),"longStackTraces"in t&&(t.longStackTraces?e.longStackTraces():!t.longStackTraces&&e.hasLongStackTraces()&&K()),"warnings"in t){var n=t.warnings;ot.warnings=!!n,X=ot.warnings,I.isObject(n)&&"wForgottenReturn"in n&&(X=!!n.wForgottenReturn)}if("cancellation"in t&&t.cancellation&&!ot.cancellation){if(B.haveItemsQueued())throw new Error("cannot enable cancellation after promises are in use");e.prototype._clearCancellationData=l,e.prototype._propagateFrom=u,e.prototype._onCancel=s,e.prototype._setOnCancel=c,e.prototype._attachCancellationCallback=a,e.prototype._execute=o,et=u,ot.cancellation=!0}return"monitoring"in t&&(t.monitoring&&!ot.monitoring?(ot.monitoring=!0,e.prototype._fireEvent=tt):!t.monitoring&&ot.monitoring&&(ot.monitoring=!1,e.prototype._fireEvent=i)),e},e.prototype._fireEvent=i,e.prototype._execute=function(t,e,n){try{t(e,n)}catch(r){return r}},e.prototype._onCancel=function(){},e.prototype._setOnCancel=function(t){},e.prototype._attachCancellationCallback=function(t){},e.prototype._captureStackTrace=function(){},e.prototype._attachExtraTrace=function(){},e.prototype._clearCancellationData=function(){},e.prototype._propagateFrom=function(t,e){};var et=p,nt=function(){return!1},rt=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;I.inherits(x,Error),n.CapturedTrace=x,x.prototype.uncycle=function(){var t=this._length;if(!(2>t)){for(var e=[],n={},r=0,i=this;void 0!==i;++r)e.push(i),i=i._parent;t=this._length=r;for(var r=t-1;r>=0;--r){var o=e[r].stack;void 0===n[o]&&(n[o]=r)}for(var r=0;t>r;++r){var a=e[r].stack,s=n[a];if(void 0!==s&&s!==r){s>0&&(e[s-1]._parent=void 0,e[s-1]._length=1),e[r]._parent=void 0,e[r]._length=1;var c=r>0?e[r-1]:this;t-1>s?(c._parent=e[s+1],c._parent.uncycle(),c._length=c._parent._length+1):(c._parent=void 0,c._length=1);for(var l=c._length+1,u=r-2;u>=0;--u)e[u]._length=l,l++;return}}}},x.prototype.attachExtraTrace=function(t){if(!t.__stackCleaned__){this.uncycle();for(var e=E(t),n=e.message,r=[e.stack],i=this;void 0!==i;)r.push(C(i.stack.split("\n"))),i=i._parent;b(r),m(r),I.notEnumerableProp(t,"stack",g(n,r)),I.notEnumerableProp(t,"__stackCleaned__",!0)}};var it=function(){var t=/^\s*at\s*/,e=function(t,e){return"string"==typeof t?t:void 0!==e.name&&void 0!==e.message?e.toString():F(e)};if("number"==typeof Error.stackTraceLimit&&"function"==typeof Error.captureStackTrace){Error.stackTraceLimit+=6,q=t,G=e;var n=Error.captureStackTrace;return nt=function(t){return D.test(t)},function(t,e){Error.stackTraceLimit+=6,n(t,e),Error.stackTraceLimit-=6}}var r=new Error;if("string"==typeof r.stack&&r.stack.split("\n")[0].indexOf("stackDetection@")>=0)return q=/@/,G=e,M=!0,function(t){t.stack=(new Error).stack};var i;try{throw new Error}catch(o){i="stack"in o}return"stack"in r||!i||"number"!=typeof Error.stackTraceLimit?(G=function(t,e){return"string"==typeof t?t:"object"!=typeof e&&"function"!=typeof e||void 0===e.name||void 0===e.message?F(e):e.toString()},null):(q=t,G=e,function(t){Error.stackTraceLimit+=6;try{throw new Error}catch(e){t.stack=e.stack}Error.stackTraceLimit-=6})}([]);"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(L=function(t){console.warn(t)},I.isNode&&process.stderr.isTTY?L=function(t,e){var n=e?"[33m":"[31m";console.warn(n+t+"[0m\n")}:I.isNode||"string"!=typeof(new Error).stack||(L=function(t,e){console.warn("%c"+t,e?"color: darkorange":"color: red")}));var ot={warnings:$,longStackTraces:!1,cancellation:!1,monitoring:!1};return z&&e.longStackTraces(),{longStackTraces:function(){return ot.longStackTraces},warnings:function(){return ot.warnings},cancellation:function(){return ot.cancellation},monitoring:function(){return ot.monitoring},propagateFromFunction:function(){return et},boundValueFunction:function(){return f},checkForgottenReturns:d,setBounds:S,warn:y,deprecated:v,CapturedTrace:x,fireDomEvent:J,fireGlobalEvent:Y}}},{"./errors":9,"./util":21}],8:[function(t,e,n){"use strict";e.exports=function(t){function e(){return this.value}function n(){throw this.reason}t.prototype["return"]=t.prototype.thenReturn=function(n){return n instanceof t&&n.suppressUnhandledRejections(),this._then(e,void 0,void 0,{value:n},void 0)},t.prototype["throw"]=t.prototype.thenThrow=function(t){return this._then(n,void 0,void 0,{reason:t},void 0)},t.prototype.catchThrow=function(t){if(arguments.length<=1)return this._then(void 0,n,void 0,{reason:t},void 0);var e=arguments[1],r=function(){throw e};return this.caught(t,r)},t.prototype.catchReturn=function(n){if(arguments.length<=1)return n instanceof t&&n.suppressUnhandledRejections(),this._then(void 0,e,void 0,{value:n},void 0);var r=arguments[1];r instanceof t&&r.suppressUnhandledRejections();var i=function(){return r};return this.caught(n,i)}}},{}],9:[function(t,e,n){"use strict";function r(t,e){function n(r){return this instanceof n?(p(this,"message","string"==typeof r?r:e),p(this,"name",t),void(Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):Error.call(this))):new n(r)}return u(n,Error),n}function i(t){return this instanceof i?(p(this,"name","OperationalError"),p(this,"message",t),this.cause=t,this.isOperational=!0,void(t instanceof Error?(p(this,"message",t.message),p(this,"stack",t.stack)):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor))):new i(t)}var o,a,s=t("./es5"),c=s.freeze,l=t("./util"),u=l.inherits,p=l.notEnumerableProp,f=r("Warning","warning"),h=r("CancellationError","cancellation error"),_=r("TimeoutError","timeout error"),d=r("AggregateError","aggregate error");try{o=TypeError,a=RangeError}catch(v){o=r("TypeError","type error"),a=r("RangeError","range error")}for(var y="join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "),g=0;g<y.length;++g)"function"==typeof Array.prototype[y[g]]&&(d.prototype[y[g]]=Array.prototype[y[g]]);s.defineProperty(d.prototype,"length",{value:0,configurable:!1,writable:!0,enumerable:!0}),d.prototype.isOperational=!0;var m=0;d.prototype.toString=function(){var t=Array(4*m+1).join(" "),e="\n"+t+"AggregateError of:\n";m++,t=Array(4*m+1).join(" ");for(var n=0;n<this.length;++n){for(var r=this[n]===this?"[Circular AggregateError]":this[n]+"",i=r.split("\n"),o=0;o<i.length;++o)i[o]=t+i[o];r=i.join("\n"),e+=r+"\n"}return m--,e},u(i,Error);var b=Error.__BluebirdErrorTypes__;b||(b=c({CancellationError:h,TimeoutError:_,OperationalError:i,RejectionError:i,AggregateError:d}),s.defineProperty(Error,"__BluebirdErrorTypes__",{value:b,writable:!1,enumerable:!1,configurable:!1})),e.exports={Error:Error,TypeError:o,RangeError:a,CancellationError:b.CancellationError,OperationalError:b.OperationalError,TimeoutError:b.TimeoutError,AggregateError:b.AggregateError,Warning:f}},{"./es5":10,"./util":21}],10:[function(t,e,n){var r=function(){"use strict";return void 0===this}();if(r)e.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:r,propertyIsWritable:function(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return!(n&&!n.writable&&!n.set)}};else{var i={}.hasOwnProperty,o={}.toString,a={}.constructor.prototype,s=function(t){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e},c=function(t,e){return{value:t[e]}},l=function(t,e,n){return t[e]=n.value,t},u=function(t){return t},p=function(t){try{return Object(t).constructor.prototype}catch(e){return a}},f=function(t){try{return"[object Array]"===o.call(t)}catch(e){return!1}};e.exports={isArray:f,keys:s,names:s,defineProperty:l,getDescriptor:c,freeze:u,getPrototypeOf:p,isES5:r,propertyIsWritable:function(){return!0}}}},{}],11:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,e,n){this.promise=t,this.type=e,this.handler=n,this.called=!1,this.cancelPromise=null}function i(t){this.finallyHandler=t}function o(t,e){return null!=t.cancelPromise?(arguments.length>1?t.cancelPromise._reject(e):t.cancelPromise._cancel(),t.cancelPromise=null,!0):!1}function a(){return c.call(this,this.promise._target()._settledValue())}function s(t){return o(this,t)?void 0:(p.e=t,p)}function c(t){var r=this.promise,c=this.handler;if(!this.called){this.called=!0;var l=this.isFinallyHandler()?c.call(r._boundValue()):c.call(r._boundValue(),t);if(void 0!==l){r._setReturnedNonUndefined();var f=n(l,r);if(f instanceof e){if(null!=this.cancelPromise){if(f._isCancelled()){var h=new u("late cancellation observer");return r._attachExtraTrace(h),p.e=h,p}f.isPending()&&f._attachCancellationCallback(new i(this))}return f._then(a,s,void 0,this,void 0)}}}return r.isRejected()?(o(this),p.e=t,p):(o(this),t)}var l=t("./util"),u=e.CancellationError,p=l.errorObj;return r.prototype.isFinallyHandler=function(){return 0===this.type},i.prototype._resultCancelled=function(){o(this.finallyHandler)},e.prototype._passThrough=function(t,e,n,i){return"function"!=typeof t?this.then():this._then(n,i,void 0,new r(this,e,t),void 0)},e.prototype.lastly=e.prototype["finally"]=function(t){return this._passThrough(t,0,c,c)},e.prototype.tap=function(t){return this._passThrough(t,1,c)},r}},{"./util":21}],12:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,a){var s=t("./util");s.canEvaluate,s.tryCatch,s.errorObj;e.join=function(){var t,e=arguments.length-1;if(e>0&&"function"==typeof arguments[e]){t=arguments[e];var r}var i=[].slice.call(arguments);t&&i.pop();var r=new n(i).promise();return void 0!==t?r.spread(t):r}}},{"./util":21}],13:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){var a=t("./util"),s=a.tryCatch;e.method=function(t){if("function"!=typeof t)throw new e.TypeError("expecting a function but got "+a.classString(t));return function(){var r=new e(n);r._captureStackTrace(),r._pushContext();var i=s(t).apply(this,arguments),a=r._popContext();return o.checkForgottenReturns(i,a,"Promise.method",r),r._resolveFromSyncValue(i),r}},e.attempt=e["try"]=function(t){if("function"!=typeof t)return i("expecting a function but got "+a.classString(t));var r=new e(n);r._captureStackTrace(),r._pushContext();var c;if(arguments.length>1){o.deprecated("calling Promise.try with more than 1 argument");var l=arguments[1],u=arguments[2];c=a.isArray(l)?s(t).apply(u,l):s(t).call(u,l)}else c=s(t)();var p=r._popContext();return o.checkForgottenReturns(c,p,"Promise.try",r),r._resolveFromSyncValue(c),r},e.prototype._resolveFromSyncValue=function(t){t===a.errorObj?this._rejectCallback(t.e,!1):this._resolveCallback(t,!0)}}},{"./util":21}],14:[function(t,e,n){"use strict";function r(t){return t instanceof Error&&u.getPrototypeOf(t)===Error.prototype}function i(t){var e;if(r(t)){e=new l(t),e.name=t.name,e.message=t.message,e.stack=t.stack;for(var n=u.keys(t),i=0;i<n.length;++i){var o=n[i];p.test(o)||(e[o]=t[o])}return e}return a.markAsOriginatingFromRejection(t),t}function o(t,e){return function(n,r){if(null!==t){if(n){var o=i(s(n));t._attachExtraTrace(o),t._reject(o)}else if(e){var a=[].slice.call(arguments,1);t._fulfill(a)}else t._fulfill(r);t=null}}}var a=t("./util"),s=a.maybeWrapAsError,c=t("./errors"),l=c.OperationalError,u=t("./es5"),p=/^(?:name|message|stack|cause)$/;e.exports=o},{"./errors":9,"./es5":10,"./util":21}],15:[function(t,e,n){"use strict";e.exports=function(){function n(){}function r(t,e){if("function"!=typeof e)throw new g("expecting a function but got "+h.classString(e));if(t.constructor!==i)throw new g("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n")}function i(t){this._bitField=0,this._fulfillmentHandler0=void 0,this._rejectionHandler0=void 0,this._promise0=void 0,this._receiver0=void 0,t!==b&&(r(this,t),this._resolveFromExecutor(t)),this._promiseCreated(),this._fireEvent("promiseCreated",this)}function o(t){this.promise._resolveCallback(t)}function a(t){this.promise._rejectCallback(t,!1)}function s(t){var e=new i(b);e._fulfillmentHandler0=t,e._rejectionHandler0=t,e._promise0=t,e._receiver0=t}var c,l=function(){return new g("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")},u=function(){return new i.PromiseInspection(this._target())},p=function(t){return i.reject(new g(t))},f={},h=t("./util");c=h.isNode?function(){var t=process.domain;return void 0===t&&(t=null),t}:function(){return null},h.notEnumerableProp(i,"_getDomain",c);var _=t("./es5"),d=t("./async"),v=new d;_.defineProperty(i,"_async",{value:v});var y=t("./errors"),g=i.TypeError=y.TypeError;i.RangeError=y.RangeError;var m=i.CancellationError=y.CancellationError;i.TimeoutError=y.TimeoutError,i.OperationalError=y.OperationalError,i.RejectionError=y.OperationalError,i.AggregateError=y.AggregateError;var b=function(){},C={},w={},E=t("./thenables")(i,b),k=t("./promise_array")(i,b,E,p,n),j=t("./context")(i),F=(j.create,t("./debuggability")(i,j)),T=(F.CapturedTrace,t("./finally")(i,E)),P=t("./catch_filter")(w),R=t("./nodeback"),S=h.errorObj,x=h.tryCatch;return i.prototype.toString=function(){return"[object Promise]"},i.prototype.caught=i.prototype["catch"]=function(t){var e=arguments.length;if(e>1){var n,r=new Array(e-1),i=0;for(n=0;e-1>n;++n){var o=arguments[n];if(!h.isObject(o))return p("expecting an object but got A catch statement predicate "+h.classString(o));r[i++]=o}return r.length=i,t=arguments[n],this.then(void 0,P(r,t,this))}return this.then(void 0,t)},i.prototype.reflect=function(){return this._then(u,u,void 0,this,void 0)},i.prototype.then=function(t,e){if(F.warnings()&&arguments.length>0&&"function"!=typeof t&&"function"!=typeof e){var n=".then() only accepts functions but was passed: "+h.classString(t);arguments.length>1&&(n+=", "+h.classString(e)),this._warn(n)}return this._then(t,e,void 0,void 0,void 0)},i.prototype.done=function(t,e){var n=this._then(t,e,void 0,void 0,void 0);n._setIsFinal()},i.prototype.spread=function(t){return"function"!=typeof t?p("expecting a function but got "+h.classString(t)):this.all()._then(t,void 0,void 0,C,void 0)},i.prototype.toJSON=function(){var t={isFulfilled:!1,isRejected:!1,fulfillmentValue:void 0,rejectionReason:void 0};return this.isFulfilled()?(t.fulfillmentValue=this.value(),t.isFulfilled=!0):this.isRejected()&&(t.rejectionReason=this.reason(),t.isRejected=!0),t},i.prototype.all=function(){return arguments.length>0&&this._warn(".all() was passed arguments but it does not take any"),new k(this).promise();
},i.prototype.error=function(t){return this.caught(h.originatesFromRejection,t)},i.getNewLibraryCopy=e.exports,i.is=function(t){return t instanceof i},i.fromNode=i.fromCallback=function(t){var e=new i(b);e._captureStackTrace();var n=arguments.length>1?!!Object(arguments[1]).multiArgs:!1,r=x(t)(R(e,n));return r===S&&e._rejectCallback(r.e,!0),e._isFateSealed()||e._setAsyncGuaranteed(),e},i.all=function(t){return new k(t).promise()},i.cast=function(t){var e=E(t);return e instanceof i||(e=new i(b),e._captureStackTrace(),e._setFulfilled(),e._rejectionHandler0=t),e},i.resolve=i.fulfilled=i.cast,i.reject=i.rejected=function(t){var e=new i(b);return e._captureStackTrace(),e._rejectCallback(t,!0),e},i.setScheduler=function(t){if("function"!=typeof t)throw new g("expecting a function but got "+h.classString(t));return v.setScheduler(t)},i.prototype._then=function(t,e,n,r,o){var a=void 0!==o,s=a?o:new i(b),l=this._target(),u=l._bitField;a||(s._propagateFrom(this,3),s._captureStackTrace(),void 0===r&&0!==(2097152&this._bitField)&&(r=0!==(50397184&u)?this._boundValue():l===this?void 0:this._boundTo),this._fireEvent("promiseChained",this,s));var p=c();if(0!==(50397184&u)){var f,_,d=l._settlePromiseCtx;0!==(33554432&u)?(_=l._rejectionHandler0,f=t):0!==(16777216&u)?(_=l._fulfillmentHandler0,f=e,l._unsetRejectionIsUnhandled()):(d=l._settlePromiseLateCancellationObserver,_=new m("late cancellation observer"),l._attachExtraTrace(_),f=e),v.invoke(d,l,{handler:null===p?f:"function"==typeof f&&h.domainBind(p,f),promise:s,receiver:r,value:_})}else l._addCallbacks(t,e,s,r,p);return s},i.prototype._length=function(){return 65535&this._bitField},i.prototype._isFateSealed=function(){return 0!==(117506048&this._bitField)},i.prototype._isFollowing=function(){return 67108864===(67108864&this._bitField)},i.prototype._setLength=function(t){this._bitField=-65536&this._bitField|65535&t},i.prototype._setFulfilled=function(){this._bitField=33554432|this._bitField,this._fireEvent("promiseFulfilled",this)},i.prototype._setRejected=function(){this._bitField=16777216|this._bitField,this._fireEvent("promiseRejected",this)},i.prototype._setFollowing=function(){this._bitField=67108864|this._bitField,this._fireEvent("promiseResolved",this)},i.prototype._setIsFinal=function(){this._bitField=4194304|this._bitField},i.prototype._isFinal=function(){return(4194304&this._bitField)>0},i.prototype._unsetCancelled=function(){this._bitField=-65537&this._bitField},i.prototype._setCancelled=function(){this._bitField=65536|this._bitField,this._fireEvent("promiseCancelled",this)},i.prototype._setWillBeCancelled=function(){this._bitField=8388608|this._bitField},i.prototype._setAsyncGuaranteed=function(){v.hasCustomScheduler()||(this._bitField=134217728|this._bitField)},i.prototype._receiverAt=function(t){var e=0===t?this._receiver0:this[4*t-4+3];return e===f?void 0:void 0===e&&this._isBound()?this._boundValue():e},i.prototype._promiseAt=function(t){return this[4*t-4+2]},i.prototype._fulfillmentHandlerAt=function(t){return this[4*t-4+0]},i.prototype._rejectionHandlerAt=function(t){return this[4*t-4+1]},i.prototype._boundValue=function(){},i.prototype._migrateCallback0=function(t){var e=(t._bitField,t._fulfillmentHandler0),n=t._rejectionHandler0,r=t._promise0,i=t._receiverAt(0);void 0===i&&(i=f),this._addCallbacks(e,n,r,i,null)},i.prototype._migrateCallbackAt=function(t,e){var n=t._fulfillmentHandlerAt(e),r=t._rejectionHandlerAt(e),i=t._promiseAt(e),o=t._receiverAt(e);void 0===o&&(o=f),this._addCallbacks(n,r,i,o,null)},i.prototype._addCallbacks=function(t,e,n,r,i){var o=this._length();if(o>=65531&&(o=0,this._setLength(0)),0===o)this._promise0=n,this._receiver0=r,"function"==typeof t&&(this._fulfillmentHandler0=null===i?t:h.domainBind(i,t)),"function"==typeof e&&(this._rejectionHandler0=null===i?e:h.domainBind(i,e));else{var a=4*o-4;this[a+2]=n,this[a+3]=r,"function"==typeof t&&(this[a+0]=null===i?t:h.domainBind(i,t)),"function"==typeof e&&(this[a+1]=null===i?e:h.domainBind(i,e))}return this._setLength(o+1),o},i.prototype._proxy=function(t,e){this._addCallbacks(void 0,void 0,e,t,null)},i.prototype._resolveCallback=function(t,e){if(0===(117506048&this._bitField)){if(t===this)return this._rejectCallback(l(),!1);var n=E(t,this);if(!(n instanceof i))return this._fulfill(t);e&&this._propagateFrom(n,2);var r=n._target();if(r===this)return void this._reject(l());var o=r._bitField;if(0===(50397184&o)){var a=this._length();a>0&&r._migrateCallback0(this);for(var s=1;a>s;++s)r._migrateCallbackAt(this,s);this._setFollowing(),this._setLength(0),this._setFollowee(r)}else if(0!==(33554432&o))this._fulfill(r._value());else if(0!==(16777216&o))this._reject(r._reason());else{var c=new m("late cancellation observer");r._attachExtraTrace(c),this._reject(c)}}},i.prototype._rejectCallback=function(t,e,n){var r=h.ensureErrorObject(t),i=r===t;if(!i&&!n&&F.warnings()){var o="a promise was rejected with a non-error: "+h.classString(t);this._warn(o,!0)}this._attachExtraTrace(r,e?i:!1),this._reject(t)},i.prototype._resolveFromExecutor=function(t){var e=this;this._captureStackTrace(),this._pushContext();var n=!0,r=this._execute(t,function(t){e._resolveCallback(t)},function(t){e._rejectCallback(t,n)});n=!1,this._popContext(),void 0!==r&&e._rejectCallback(r,!0)},i.prototype._settlePromiseFromHandler=function(t,e,n,r){var i=r._bitField;if(0===(65536&i)){r._pushContext();var o;e===C?n&&"number"==typeof n.length?o=x(t).apply(this._boundValue(),n):(o=S,o.e=new g("cannot .spread() a non-array: "+h.classString(n))):o=x(t).call(e,n);var a=r._popContext();i=r._bitField,0===(65536&i)&&(o===w?r._reject(n):o===S?r._rejectCallback(o.e,!1):(F.checkForgottenReturns(o,a,"",r,this),r._resolveCallback(o)))}},i.prototype._target=function(){for(var t=this;t._isFollowing();)t=t._followee();return t},i.prototype._followee=function(){return this._rejectionHandler0},i.prototype._setFollowee=function(t){this._rejectionHandler0=t},i.prototype._settlePromise=function(t,e,r,o){var a=t instanceof i,s=this._bitField,c=0!==(134217728&s);0!==(65536&s)?(a&&t._invokeInternalOnCancel(),r instanceof T&&r.isFinallyHandler()?(r.cancelPromise=t,x(e).call(r,o)===S&&t._reject(S.e)):e===u?t._fulfill(u.call(r)):r instanceof n?r._promiseCancelled(t):a||t instanceof k?t._cancel():r.cancel()):"function"==typeof e?a?(c&&t._setAsyncGuaranteed(),this._settlePromiseFromHandler(e,r,o,t)):e.call(r,o,t):r instanceof n?r._isResolved()||(0!==(33554432&s)?r._promiseFulfilled(o,t):r._promiseRejected(o,t)):a&&(c&&t._setAsyncGuaranteed(),0!==(33554432&s)?t._fulfill(o):t._reject(o))},i.prototype._settlePromiseLateCancellationObserver=function(t){var e=t.handler,n=t.promise,r=t.receiver,o=t.value;"function"==typeof e?n instanceof i?this._settlePromiseFromHandler(e,r,o,n):e.call(r,o,n):n instanceof i&&n._reject(o)},i.prototype._settlePromiseCtx=function(t){this._settlePromise(t.promise,t.handler,t.receiver,t.value)},i.prototype._settlePromise0=function(t,e,n){var r=this._promise0,i=this._receiverAt(0);this._promise0=void 0,this._receiver0=void 0,this._settlePromise(r,t,i,e)},i.prototype._clearCallbackDataAtIndex=function(t){var e=4*t-4;this[e+2]=this[e+3]=this[e+0]=this[e+1]=void 0},i.prototype._fulfill=function(t){var e=this._bitField;if(!((117506048&e)>>>16)){if(t===this){var n=l();return this._attachExtraTrace(n),this._reject(n)}this._setFulfilled(),this._rejectionHandler0=t,(65535&e)>0&&(0!==(134217728&e)?this._settlePromises():v.settlePromises(this))}},i.prototype._reject=function(t){var e=this._bitField;if(!((117506048&e)>>>16))return this._setRejected(),this._fulfillmentHandler0=t,this._isFinal()?v.fatalError(t,h.isNode):void((65535&e)>0?v.settlePromises(this):this._ensurePossibleRejectionHandled())},i.prototype._fulfillPromises=function(t,e){for(var n=1;t>n;n++){var r=this._fulfillmentHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._rejectPromises=function(t,e){for(var n=1;t>n;n++){var r=this._rejectionHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._settlePromises=function(){var t=this._bitField,e=65535&t;if(e>0){if(0!==(16842752&t)){var n=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,n,t),this._rejectPromises(e,n)}else{var r=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,r,t),this._fulfillPromises(e,r)}this._setLength(0)}this._clearCancellationData()},i.prototype._settledValue=function(){var t=this._bitField;return 0!==(33554432&t)?this._rejectionHandler0:0!==(16777216&t)?this._fulfillmentHandler0:void 0},i.defer=i.pending=function(){F.deprecated("Promise.defer","new Promise");var t=new i(b);return{promise:t,resolve:o,reject:a}},h.notEnumerableProp(i,"_makeSelfResolutionError",l),t("./method")(i,b,E,p,F),t("./bind")(i,b,E,F),t("./cancel")(i,k,p,F),t("./direct_resolve")(i),t("./synchronous_inspection")(i),t("./join")(i,k,E,b,v,c),i.Promise=i,i.version="3.4.7",h.toFastProperties(i),h.toFastProperties(i.prototype),s({a:1}),s({b:2}),s({c:3}),s(1),s(function(){}),s(void 0),s(!1),s(new i(b)),F.setBounds(d.firstLineError,h.lastLineError),i}},{"./async":1,"./bind":2,"./cancel":4,"./catch_filter":5,"./context":6,"./debuggability":7,"./direct_resolve":8,"./errors":9,"./es5":10,"./finally":11,"./join":12,"./method":13,"./nodeback":14,"./promise_array":16,"./synchronous_inspection":19,"./thenables":20,"./util":21}],16:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){function a(t){switch(t){case-2:return[];case-3:return{}}}function s(t){var r=this._promise=new e(n);t instanceof e&&r._propagateFrom(t,3),r._setOnCancel(this),this._values=t,this._length=0,this._totalResolved=0,this._init(void 0,-2)}var c=t("./util");c.isArray;return c.inherits(s,o),s.prototype.length=function(){return this._length},s.prototype.promise=function(){return this._promise},s.prototype._init=function l(t,n){var o=r(this._values,this._promise);if(o instanceof e){o=o._target();var s=o._bitField;if(this._values=o,0===(50397184&s))return this._promise._setAsyncGuaranteed(),o._then(l,this._reject,void 0,this,n);if(0===(33554432&s))return 0!==(16777216&s)?this._reject(o._reason()):this._cancel();o=o._value()}if(o=c.asArray(o),null===o){var u=i("expecting an array or an iterable object but got "+c.classString(o)).reason();return void this._promise._rejectCallback(u,!1)}return 0===o.length?void(-5===n?this._resolveEmptyArray():this._resolve(a(n))):void this._iterate(o)},s.prototype._iterate=function(t){var n=this.getActualLength(t.length);this._length=n,this._values=this.shouldCopyValues()?new Array(n):this._values;for(var i=this._promise,o=!1,a=null,s=0;n>s;++s){var c=r(t[s],i);c instanceof e?(c=c._target(),a=c._bitField):a=null,o?null!==a&&c.suppressUnhandledRejections():null!==a?0===(50397184&a)?(c._proxy(this,s),this._values[s]=c):o=0!==(33554432&a)?this._promiseFulfilled(c._value(),s):0!==(16777216&a)?this._promiseRejected(c._reason(),s):this._promiseCancelled(s):o=this._promiseFulfilled(c,s)}o||i._setAsyncGuaranteed()},s.prototype._isResolved=function(){return null===this._values},s.prototype._resolve=function(t){this._values=null,this._promise._fulfill(t)},s.prototype._cancel=function(){!this._isResolved()&&this._promise._isCancellable()&&(this._values=null,this._promise._cancel())},s.prototype._reject=function(t){this._values=null,this._promise._rejectCallback(t,!1)},s.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;return n>=this._length?(this._resolve(this._values),!0):!1},s.prototype._promiseCancelled=function(){return this._cancel(),!0},s.prototype._promiseRejected=function(t){return this._totalResolved++,this._reject(t),!0},s.prototype._resultCancelled=function(){if(!this._isResolved()){var t=this._values;if(this._cancel(),t instanceof e)t.cancel();else for(var n=0;n<t.length;++n)t[n]instanceof e&&t[n].cancel()}},s.prototype.shouldCopyValues=function(){return!0},s.prototype.getActualLength=function(t){return t},s}},{"./util":21}],17:[function(t,e,n){"use strict";function r(t,e,n,r,i){for(var o=0;i>o;++o)n[o+r]=t[o+e],t[o+e]=void 0}function i(t){this._capacity=t,this._length=0,this._front=0}i.prototype._willBeOverCapacity=function(t){return this._capacity<t},i.prototype._pushOne=function(t){var e=this.length();this._checkCapacity(e+1);var n=this._front+e&this._capacity-1;this[n]=t,this._length=e+1},i.prototype.push=function(t,e,n){var r=this.length()+3;if(this._willBeOverCapacity(r))return this._pushOne(t),this._pushOne(e),void this._pushOne(n);var i=this._front+r-3;this._checkCapacity(r);var o=this._capacity-1;this[i+0&o]=t,this[i+1&o]=e,this[i+2&o]=n,this._length=r},i.prototype.shift=function(){var t=this._front,e=this[t];return this[t]=void 0,this._front=t+1&this._capacity-1,this._length--,e},i.prototype.length=function(){return this._length},i.prototype._checkCapacity=function(t){this._capacity<t&&this._resizeTo(this._capacity<<1)},i.prototype._resizeTo=function(t){var e=this._capacity;this._capacity=t;var n=this._front,i=this._length,o=n+i&e-1;r(this,0,this,e,o)},e.exports=i},{}],18:[function(t,e,n){"use strict";var r,i=t("./util"),o=function(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")},a=i.getNativePromise();if(i.isNode&&"undefined"==typeof MutationObserver){var s=global.setImmediate,c=process.nextTick;r=i.isRecentNode?function(t){s.call(global,t)}:function(t){c.call(process,t)}}else if("function"==typeof a&&"function"==typeof a.resolve){var l=a.resolve();r=function(t){l.then(t)}}else r="undefined"==typeof MutationObserver||"undefined"!=typeof window&&window.navigator&&(window.navigator.standalone||window.cordova)?"undefined"!=typeof setImmediate?function(t){setImmediate(t)}:"undefined"!=typeof setTimeout?function(t){setTimeout(t,0)}:o:function(){var t=document.createElement("div"),e={attributes:!0},n=!1,r=document.createElement("div"),i=new MutationObserver(function(){t.classList.toggle("foo"),n=!1});i.observe(r,e);var o=function(){n||(n=!0,r.classList.toggle("foo"))};return function(n){var r=new MutationObserver(function(){r.disconnect(),n()});r.observe(t,e),o()}}();e.exports=r},{"./util":21}],19:[function(t,e,n){"use strict";e.exports=function(t){function e(t){void 0!==t?(t=t._target(),this._bitField=t._bitField,this._settledValueField=t._isFateSealed()?t._settledValue():void 0):(this._bitField=0,this._settledValueField=void 0)}e.prototype._settledValue=function(){return this._settledValueField};var n=e.prototype.value=function(){if(!this.isFulfilled())throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},r=e.prototype.error=e.prototype.reason=function(){if(!this.isRejected())throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},i=e.prototype.isFulfilled=function(){return 0!==(33554432&this._bitField)},o=e.prototype.isRejected=function(){return 0!==(16777216&this._bitField)},a=e.prototype.isPending=function(){return 0===(50397184&this._bitField)},s=e.prototype.isResolved=function(){return 0!==(50331648&this._bitField)};e.prototype.isCancelled=function(){return 0!==(8454144&this._bitField)},t.prototype.__isCancelled=function(){return 65536===(65536&this._bitField)},t.prototype._isCancelled=function(){return this._target().__isCancelled()},t.prototype.isCancelled=function(){return 0!==(8454144&this._target()._bitField)},t.prototype.isPending=function(){return a.call(this._target())},t.prototype.isRejected=function(){return o.call(this._target())},t.prototype.isFulfilled=function(){return i.call(this._target())},t.prototype.isResolved=function(){return s.call(this._target())},t.prototype.value=function(){return n.call(this._target())},t.prototype.reason=function(){var t=this._target();return t._unsetRejectionIsUnhandled(),r.call(t)},t.prototype._value=function(){return this._settledValue()},t.prototype._reason=function(){return this._unsetRejectionIsUnhandled(),this._settledValue()},t.PromiseInspection=e}},{}],20:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,r){if(u(t)){if(t instanceof e)return t;var i=o(t);if(i===l){r&&r._pushContext();var c=e.reject(i.e);return r&&r._popContext(),c}if("function"==typeof i){if(a(t)){var c=new e(n);return t._then(c._fulfill,c._reject,void 0,c,null),c}return s(t,i,r)}}return t}function i(t){return t.then}function o(t){try{return i(t)}catch(e){return l.e=e,l}}function a(t){try{return p.call(t,"_promise0")}catch(e){return!1}}function s(t,r,i){function o(t){s&&(s._resolveCallback(t),s=null)}function a(t){s&&(s._rejectCallback(t,p,!0),s=null)}var s=new e(n),u=s;i&&i._pushContext(),s._captureStackTrace(),i&&i._popContext();var p=!0,f=c.tryCatch(r).call(t,o,a);return p=!1,s&&f===l&&(s._rejectCallback(f.e,!0,!0),s=null),u}var c=t("./util"),l=c.errorObj,u=c.isObject,p={}.hasOwnProperty;return r}},{"./util":21}],21:[function(t,e,n){"use strict";function r(){try{var t=R;return R=null,t.apply(this,arguments)}catch(e){return P.e=e,P}}function i(t){return R=t,r}function o(t){return null==t||t===!0||t===!1||"string"==typeof t||"number"==typeof t}function a(t){return"function"==typeof t||"object"==typeof t&&null!==t}function s(t){return o(t)?new Error(v(t)):t}function c(t,e){var n,r=t.length,i=new Array(r+1);for(n=0;r>n;++n)i[n]=t[n];return i[n]=e,i}function l(t,e,n){if(!F.isES5)return{}.hasOwnProperty.call(t,e)?t[e]:void 0;var r=Object.getOwnPropertyDescriptor(t,e);return null!=r?null==r.get&&null==r.set?r.value:n:void 0}function u(t,e,n){if(o(t))return t;var r={value:n,configurable:!0,enumerable:!1,writable:!0};return F.defineProperty(t,e,r),t}function p(t){throw t}function f(t){try{if("function"==typeof t){var e=F.names(t.prototype),n=F.isES5&&e.length>1,r=e.length>0&&!(1===e.length&&"constructor"===e[0]),i=A.test(t+"")&&F.names(t).length>0;if(n||r||i)return!0}return!1}catch(o){return!1}}function h(t){function e(){}e.prototype=t;for(var n=8;n--;)new e;return t}function _(t){return L.test(t)}function d(t,e,n){for(var r=new Array(t),i=0;t>i;++i)r[i]=e+i+n;return r}function v(t){try{return t+""}catch(e){return"[no string representation]"}}function y(t){return null!==t&&"object"==typeof t&&"string"==typeof t.message&&"string"==typeof t.name}function g(t){try{u(t,"isOperational",!0)}catch(e){}}function m(t){return null==t?!1:t instanceof Error.__BluebirdErrorTypes__.OperationalError||t.isOperational===!0}function b(t){return y(t)&&F.propertyIsWritable(t,"stack")}function C(t){return{}.toString.call(t)}function w(t,e,n){for(var r=F.names(t),i=0;i<r.length;++i){var o=r[i];if(n(o))try{F.defineProperty(e,o,F.getDescriptor(t,o))}catch(a){}}}function E(t){return H?{"NODE_ENV":"production","APP_ENV":"browser"}[t]:void 0}function k(){if("function"==typeof Promise)try{var t=new Promise(function(){});if("[object Promise]"==={}.toString.call(t))return Promise}catch(e){}}function j(t,e){return t.bind(e)}var F=t("./es5"),T="undefined"==typeof navigator,P={e:{}},R,S="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void 0!==this?this:null,x=function(t,e){function n(){this.constructor=t,this.constructor$=e;for(var n in e.prototype)r.call(e.prototype,n)&&"$"!==n.charAt(n.length-1)&&(this[n+"$"]=e.prototype[n])}var r={}.hasOwnProperty;return n.prototype=e.prototype,t.prototype=new n,t.prototype},O=function(){var t=[Array.prototype,Object.prototype,Function.prototype],e=function(e){for(var n=0;n<t.length;++n)if(t[n]===e)return!0;return!1};if(F.isES5){var n=Object.getOwnPropertyNames;return function(t){for(var r=[],i=Object.create(null);null!=t&&!e(t);){var o;try{o=n(t)}catch(a){return r}for(var s=0;s<o.length;++s){var c=o[s];if(!i[c]){i[c]=!0;var l=Object.getOwnPropertyDescriptor(t,c);null!=l&&null==l.get&&null==l.set&&r.push(c)}}t=F.getPrototypeOf(t)}return r}}var r={}.hasOwnProperty;return function(n){if(e(n))return[];var i=[];t:for(var o in n)if(r.call(n,o))i.push(o);else{for(var a=0;a<t.length;++a)if(r.call(t[a],o))continue t;i.push(o)}return i}}(),A=/this\s*\.\s*\S+\s*=/,L=/^[a-z$_][a-z$_0-9]*$/i,N=function(){return"stack"in new Error?function(t){return b(t)?t:new Error(v(t))}:function(t){if(b(t))return t;try{throw new Error(v(t))}catch(e){return e}}}(),B=function(t){return F.isArray(t)?t:null};if("undefined"!=typeof Symbol&&Symbol.iterator){var U="function"==typeof Array.from?function(t){return Array.from(t)}:function(t){for(var e,n=[],r=t[Symbol.iterator]();!(e=r.next()).done;)n.push(e.value);return n};B=function(t){return F.isArray(t)?t:null!=t&&"function"==typeof t[Symbol.iterator]?U(t):null}}var I="undefined"!=typeof process&&"[object process]"===C(process).toLowerCase(),H="undefined"!=typeof process&&"undefined"!="object",D={isClass:f,isIdentifier:_,inheritedDataKeys:O,getDataPropertyOrDefault:l,thrower:p,isArray:F.isArray,asArray:B,notEnumerableProp:u,isPrimitive:o,isObject:a,isError:y,canEvaluate:T,errorObj:P,tryCatch:i,inherits:x,withAppended:c,maybeWrapAsError:s,toFastProperties:h,filledRange:d,toString:v,canAttachTrace:b,ensureErrorObject:N,originatesFromRejection:m,markAsOriginatingFromRejection:g,classString:C,copyDescriptors:w,hasDevTools:"undefined"!=typeof chrome&&chrome&&"function"==typeof chrome.loadTimes,isNode:I,hasEnvVariables:H,env:E,global:S,getNativePromise:k,domainBind:j};D.isRecentNode=D.isNode&&function(){var t=process.versions.node.split(".").map(Number);return 0===t[0]&&t[1]>10||t[0]>0}(),D.isNode&&D.toFastProperties(process);try{throw new Error}catch(V){D.lastLineError=V}e.exports=D},{"./es5":10}]},{},[3])(3)}),"undefined"!=typeof window&&null!==window?window.P=window.Promise:"undefined"!=typeof self&&null!==self&&(self.P=self.Promise);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82), __webpack_require__(43), __webpack_require__(212).setImmediate))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var curryN = __webpack_require__(208);

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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(147),
    hashDelete = __webpack_require__(148),
    hashGet = __webpack_require__(149),
    hashHas = __webpack_require__(150),
    hashSet = __webpack_require__(151);

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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(27),
    setCacheAdd = __webpack_require__(173),
    setCacheHas = __webpack_require__(174);

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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ },
/* 94 */
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
/* 95 */
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
/* 96 */
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
/* 97 */
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
/* 98 */
/***/ function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(11),
    keys = __webpack_require__(8);

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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(11),
    keysIn = __webpack_require__(24);

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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(14),
    arrayEach = __webpack_require__(53),
    assignValue = __webpack_require__(59),
    baseAssign = __webpack_require__(98),
    baseAssignIn = __webpack_require__(99),
    cloneBuffer = __webpack_require__(65),
    copyArray = __webpack_require__(67),
    copySymbols = __webpack_require__(133),
    copySymbolsIn = __webpack_require__(134),
    getAllKeys = __webpack_require__(71),
    getAllKeysIn = __webpack_require__(142),
    getTag = __webpack_require__(34),
    initCloneArray = __webpack_require__(152),
    initCloneByTag = __webpack_require__(153),
    initCloneObject = __webpack_require__(73),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(21),
    isObject = __webpack_require__(1),
    keys = __webpack_require__(8);

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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);

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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(29);

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
/* 103 */
/***/ function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(60),
    keys = __webpack_require__(8);

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
/* 104 */
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
/* 105 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(4);

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
/* 106 */
/***/ function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(14),
    equalArrays = __webpack_require__(69),
    equalByTag = __webpack_require__(140),
    equalObjects = __webpack_require__(141),
    getTag = __webpack_require__(34),
    isArray = __webpack_require__(0),
    isBuffer = __webpack_require__(21),
    isTypedArray = __webpack_require__(41);

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
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(14),
    baseIsEqual = __webpack_require__(30);

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
/* 108 */
/***/ function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(22),
    isMasked = __webpack_require__(156),
    isObject = __webpack_require__(1),
    toSource = __webpack_require__(78);

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
/* 109 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isLength = __webpack_require__(40),
    isObjectLike = __webpack_require__(4);

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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(37),
    nativeKeys = __webpack_require__(168);

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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1),
    isPrototype = __webpack_require__(37),
    nativeKeysIn = __webpack_require__(169);

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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

var baseEach = __webpack_require__(29),
    isArrayLike = __webpack_require__(9);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

module.exports = baseMap;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(107),
    getMatchData = __webpack_require__(143),
    matchesStrictComparable = __webpack_require__(75);

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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(30),
    get = __webpack_require__(188),
    hasIn = __webpack_require__(189),
    isKey = __webpack_require__(36),
    isStrictComparable = __webpack_require__(74),
    matchesStrictComparable = __webpack_require__(75),
    toKey = __webpack_require__(19);

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
/* 115 */
/***/ function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(14),
    assignMergeValue = __webpack_require__(58),
    baseFor = __webpack_require__(60),
    baseMergeDeep = __webpack_require__(116),
    isObject = __webpack_require__(1),
    keysIn = __webpack_require__(24);

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
/* 116 */
/***/ function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(58),
    cloneBuffer = __webpack_require__(65),
    cloneTypedArray = __webpack_require__(66),
    copyArray = __webpack_require__(67),
    initCloneObject = __webpack_require__(73),
    isArguments = __webpack_require__(39),
    isArray = __webpack_require__(0),
    isArrayLikeObject = __webpack_require__(190),
    isBuffer = __webpack_require__(21),
    isFunction = __webpack_require__(22),
    isObject = __webpack_require__(1),
    isPlainObject = __webpack_require__(79),
    isTypedArray = __webpack_require__(41),
    toPlainObject = __webpack_require__(204);

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
/* 117 */
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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(61);

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
/* 119 */
/***/ function(module, exports, __webpack_require__) {

var identity = __webpack_require__(20),
    overRest = __webpack_require__(172),
    setToString = __webpack_require__(176);

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
/* 120 */
/***/ function(module, exports, __webpack_require__) {

var constant = __webpack_require__(185),
    defineProperty = __webpack_require__(68),
    identity = __webpack_require__(20);

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
/* 121 */
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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(15);

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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10),
    arrayMap = __webpack_require__(15),
    isArray = __webpack_require__(0),
    isSymbol = __webpack_require__(23);

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
/* 124 */
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
/* 125 */
/***/ function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(15);

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
/* 126 */
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
/* 127 */
/***/ function(module, exports, __webpack_require__) {

var identity = __webpack_require__(20);

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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(31);

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
/* 129 */
/***/ function(module, exports, __webpack_require__) {

var addMapEntry = __webpack_require__(94),
    arrayReduce = __webpack_require__(57),
    mapToArray = __webpack_require__(38);

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
/* 130 */
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
/* 131 */
/***/ function(module, exports, __webpack_require__) {

var addSetEntry = __webpack_require__(95),
    arrayReduce = __webpack_require__(57),
    setToArray = __webpack_require__(77);

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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10);

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
/* 133 */
/***/ function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(11),
    getSymbols = __webpack_require__(33);

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
/* 134 */
/***/ function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(11),
    getSymbolsIn = __webpack_require__(72);

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
/* 135 */
/***/ function(module, exports, __webpack_require__) {

var root = __webpack_require__(3);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(119),
    isIterateeCall = __webpack_require__(154);

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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(9);

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
/* 138 */
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
/* 139 */
/***/ function(module, exports, __webpack_require__) {

var baseToPairs = __webpack_require__(122),
    getTag = __webpack_require__(34),
    mapToArray = __webpack_require__(38),
    setToPairs = __webpack_require__(175);

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
/* 140 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10),
    Uint8Array = __webpack_require__(52),
    eq = __webpack_require__(12),
    equalArrays = __webpack_require__(69),
    mapToArray = __webpack_require__(38),
    setToArray = __webpack_require__(77);

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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(71);

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
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
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
/* 142 */
/***/ function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(62),
    getSymbolsIn = __webpack_require__(72),
    keysIn = __webpack_require__(24);

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
/* 143 */
/***/ function(module, exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(74),
    keys = __webpack_require__(8);

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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(10);

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
/* 145 */
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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(64),
    isArguments = __webpack_require__(39),
    isArray = __webpack_require__(0),
    isIndex = __webpack_require__(35),
    isLength = __webpack_require__(40),
    toKey = __webpack_require__(19);

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
/* 147 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(18);

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
/* 148 */
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(18);

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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(18);

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
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(18);

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
/* 152 */
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(31),
    cloneDataView = __webpack_require__(128),
    cloneMap = __webpack_require__(129),
    cloneRegExp = __webpack_require__(130),
    cloneSet = __webpack_require__(131),
    cloneSymbol = __webpack_require__(132),
    cloneTypedArray = __webpack_require__(66);

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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

var eq = __webpack_require__(12),
    isArrayLike = __webpack_require__(9),
    isIndex = __webpack_require__(35),
    isObject = __webpack_require__(1);

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
/* 155 */
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
/* 156 */
/***/ function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(135);

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
/* 157 */
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
/* 158 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(16);

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
/* 159 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(16);

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
/* 160 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(16);

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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(16);

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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(89),
    ListCache = __webpack_require__(13),
    Map = __webpack_require__(26);

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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(17);

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
/* 164 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(17);

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
/* 165 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(17);

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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(17);

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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(196);

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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(76);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ },
/* 169 */
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
/* 170 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(70);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)(module)))

/***/ },
/* 171 */
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

var apply = __webpack_require__(96);

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
/* 174 */
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
/* 175 */
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
/* 176 */
/***/ function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(120),
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

var ListCache = __webpack_require__(13);

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
/* 179 */
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
/* 180 */
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
/* 181 */
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
/* 182 */
/***/ function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(13),
    Map = __webpack_require__(26),
    MapCache = __webpack_require__(27);

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
/* 183 */
/***/ function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(167);

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
/* 184 */
/***/ function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(100);

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
/* 185 */
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
/* 186 */
/***/ function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(54),
    baseFilter = __webpack_require__(102),
    baseIteratee = __webpack_require__(63),
    isArray = __webpack_require__(0);

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
/* 187 */
/***/ function(module, exports, __webpack_require__) {

var arrayEach = __webpack_require__(53),
    baseEach = __webpack_require__(29),
    castFunction = __webpack_require__(127),
    isArray = __webpack_require__(0);

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
/* 188 */
/***/ function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(61);

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
/* 189 */
/***/ function(module, exports, __webpack_require__) {

var baseHasIn = __webpack_require__(104),
    hasPath = __webpack_require__(146);

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
/* 190 */
/***/ function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(9),
    isObjectLike = __webpack_require__(4);

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
/* 191 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(4);

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
/* 192 */
/***/ function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(30);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
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
/* 193 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(201);

/**
 * Checks if `value` is an integer.
 *
 * **Note:** This method is based on
 * [`Number.isInteger`](https://mdn.io/Number/isInteger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
 * @example
 *
 * _.isInteger(3);
 * // => true
 *
 * _.isInteger(Number.MIN_VALUE);
 * // => false
 *
 * _.isInteger(Infinity);
 * // => false
 *
 * _.isInteger('3');
 * // => false
 */
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}

module.exports = isInteger;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isArray = __webpack_require__(0),
    isObjectLike = __webpack_require__(4);

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
/* 195 */
/***/ function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(15),
    baseIteratee = __webpack_require__(63),
    baseMap = __webpack_require__(112),
    isArray = __webpack_require__(0);

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

module.exports = map;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(27);

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
/* 197 */
/***/ function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(115),
    createAssigner = __webpack_require__(136);

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
/* 198 */
/***/ function(module, exports, __webpack_require__) {

var baseProperty = __webpack_require__(117),
    basePropertyDeep = __webpack_require__(118),
    isKey = __webpack_require__(36),
    toKey = __webpack_require__(19);

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
/* 199 */
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
/* 200 */
/***/ function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(202);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

var toFinite = __webpack_require__(200);

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1),
    isSymbol = __webpack_require__(23);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

var createToPairs = __webpack_require__(139),
    keys = __webpack_require__(8);

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
/* 204 */
/***/ function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(11),
    keysIn = __webpack_require__(24);

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
/* 205 */
/***/ function(module, exports, __webpack_require__) {

var toString = __webpack_require__(81);

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
/* 206 */
/***/ function(module, exports, __webpack_require__) {

var baseValues = __webpack_require__(125),
    keys = __webpack_require__(8);

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
/* 207 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


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
/* 208 */
/***/ function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(83);
var _curry1 = __webpack_require__(84);
var _curry2 = __webpack_require__(209);
var _curryN = __webpack_require__(210);


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
/* 209 */
/***/ function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__(84);
var _isPlaceholder = __webpack_require__(42);


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
/* 210 */
/***/ function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(83);
var _isPlaceholder = __webpack_require__(42);


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
/* 211 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43), __webpack_require__(82)))

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(211);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ },
/* 213 */,
/* 214 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var addExtras = function addExtras(Alo) {
  var extras = __webpack_require__(215);

  /**
  * Useful functions
  *
  * @memberof Alo
  *
  * @see extras
  */
  Alo.prototype.extras = extras;
  return Alo;
};

module.exports = addExtras;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


/**
 * Extras, but useful stuff
 */
var extras = {};

/**
 * Several included reducer examples
 */
extras.reducers = __webpack_require__(217);

/**
 */
extras.middlewares = __webpack_require__(216);

module.exports = extras;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Alo = __webpack_require__(25);
var alo = new Alo();
var u = alo.util;

var middlewares = {};

/**
 * A thunk middleware
 *
 * @memberof extras.middlewares
 */
middlewares.createThunk = function createThunk() {
  var middleware = alo.createMiddleware(function () {
    var args = u.values(arguments);
    var arg = args[1];
    var walk = function walk(args) {
      var arg = args[1];
      args.splice(1, 1);
      return u.Promise.resolve().then(function () {
        return arg.apply(null, args);
      }).then(function (arg) {
        if (u.isFunction(arg)) {
          args.splice(1, 0, arg);
          return walk(args);
        } else {
          args.splice(0, 1, arg);
          return args;
        }
      });
    };

    if (u.isFunction(arg)) {
      return walk(args);
    } else {
      args.splice(0, 1);
      return args;
    }
  });

  return middleware;
};

module.exports = middlewares;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Alo = __webpack_require__(25);
var alo = new Alo();
// var u = alo.util

var reducers = {};

/**
 * A basic reducer which just replaces state with payload of untyped actions
 *
 * @memberof extras.reducers
 */
reducers.createUntypedReplace = function () {
  var reduce = function reduce(state, action) {
    if (action.type === undefined || action.type === null || action.type === '') {
      if (action.payload !== undefined) {
        return action.payload;
      }
    }
    return state;
  };

  return alo.createReducer(reduce);
};

module.exports = reducers;

/***/ },
/* 218 */,
/* 219 */,
/* 220 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Alo = __webpack_require__(25);
var addExtras = __webpack_require__(214);

module.exports = addExtras(Alo);

/***/ }
/******/ ]);
});