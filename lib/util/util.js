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
Util.prototype.cloneDeep = require('lodash/cloneDeep')

Util.prototype.filter = require('lodash/filter')

/**
 * Lodash values, can be used
 *
 * @function
 */
Util.prototype.values = require('lodash/values')

/**
 * Lodash forEach, can be used
 *
 * @function
 */
Util.prototype.forEach = require('lodash/forEach')

/**
 * Lodash isFunction, can be used
 *
 * @function
 */
Util.prototype.isFunction = require('lodash/isFunction')

/**
 * Lodash isString, can be used
 *
 * @function
 */
Util.prototype.isString = require('lodash/isString')

/**
 * Lodash isObject, can be used
 *
 * @function
 */
Util.prototype.isObject = require('lodash/isObject')

Util.prototype.merge = require('lodash/merge')

/**
 * Lodash isEqual, can be used
 *
 * @function
 */
Util.prototype.isEqual = require('lodash/isEqual')

/**
 * Lodash isPlainObject, can be used
 *
 * @function
 */
Util.prototype.isPlainObject = require('lodash/isPlainObject')

/**
 * Lodash isArray, can be used
 *
 * @function
 */
Util.prototype.isArray = require('lodash/isArray')

Util.prototype.map = require('lodash/map')

/**
 * Lodash isBoolean, can be used
 *
 * @function
 */
Util.prototype.isBoolean = require('lodash/isBoolean')

Util.prototype.isInteger = require('lodash/isInteger')

/**
 * Lodash uniqueId, can be used
 *
 * @function
 */
Util.prototype.uniqueId = require('lodash/uniqueId')

Util.prototype.toPairs = require('lodash/toPairs')

var flyd = require('flyd')
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
 * Polymorphic helper: Might change!
 *
 * @function
 */
Util.prototype.createPolymorphic = require('polymorphic')

Util.prototype.Promise = require('yaku')

Util.prototype.createPromise = function createPromise (resolve, reject) {
  return new this.Promise(resolve, reject)
}

/**
 * Same as new Alo
 * @see Alo
 */
Util.prototype.createAlo = function createAlo () {
  var Alo = require('./../alo.js')
  var alo = Object.create(Alo.prototype)
  Alo.apply(alo, arguments)
  return alo
}

Util.prototype.createObjectRelation = function createObjectRelation () {
  var ObjectRelation = require('./object-relation.js')
  var objectRelation = Object.create(ObjectRelation.prototype)
  ObjectRelation.apply(objectRelation, arguments)
  return objectRelation
}

module.exports = Util
