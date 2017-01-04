// @flow

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
import cloneDeep from 'lodash/cloneDeep'
Util.prototype.cloneDeep = cloneDeep

import filter from 'lodash/filter'
Util.prototype.filter = filter

/**
 * Lodash values, can be used
 *
 * @function
 */
import values from 'lodash/values'
Util.prototype.values = values

/**
 * Lodash forEach, can be used
 *
 * @function
 */
import forEach from 'lodash/forEach'
Util.prototype.forEach = forEach

/**
 * Lodash isFunction, can be used
 *
 * @function
 */
import isFunction from 'lodash/isFunction'
Util.prototype.isFunction = isFunction

/**
 * Lodash isString, can be used
 *
 * @function
 */
import isString from 'lodash/isString'
Util.prototype.isString = isString

/**
 * Lodash isObject, can be used
 *
 * @function
 */
import isObject from 'lodash/isObject'
Util.prototype.isObject = isObject

import merge from 'lodash/merge'
Util.prototype.merge = merge

/**
 * Lodash isEqual, can be used
 *
 * @function
 */
import isEqual from 'lodash/isEqual'
Util.prototype.isEqual = isEqual

/**
 * Lodash isPlainObject, can be used
 *
 * @function
 */
import isPlainObject from 'lodash/isPlainObject'
Util.prototype.isPlainObject = isPlainObject

/**
 * Lodash isArray, can be used
 *
 * @function
 */
import isArray from 'lodash/isArray'
Util.prototype.isArray = isArray

import map from 'lodash/map'
Util.prototype.map = map

/**
 * Lodash isBoolean, can be used
 *
 * @function
 */
import isBoolean from 'lodash/isBoolean'
Util.prototype.isBoolean = isBoolean

import isInteger from 'lodash/isInteger'
Util.prototype.isInteger = isInteger

/**
 * Lodash uniqueId, can be used
 *
 * @function
 */
import uniqueId from 'lodash/uniqueId'
Util.prototype.uniqueId = uniqueId

import toPairs from 'lodash/toPairs'
Util.prototype.toPairs = toPairs

import flyd from 'flyd'
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
import polymorphic from 'polymorphic'
Util.prototype.createPolymorphic = polymorphic

import Yaku from 'yaku'
Util.prototype.Promise = Yaku

// TODO: yaku 0.17.4 uses setTimeout for nextTick in the browser, next-tick is a faster polyfill. Remove the polyfill, if yaku decides to implement/integrate one itsself
import nextTick from 'next-tick'
Util.prototype.Promise.nextTick = fn => nextTick(fn)

Util.prototype.createPromise = function createPromise (resolve, reject) {
  return new this.Promise(resolve, reject)
}

import Alo from './../alo.js'

/**
 * Same as new Alo
 * @see Alo
 */
Util.prototype.createAlo = function createAlo () {
  var alo = Object.create(Alo.prototype)
  Alo.apply(alo, arguments)
  return alo
}

export default Util
