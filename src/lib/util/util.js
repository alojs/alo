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
util.cloneDeep = require('lodash/cloneDeep')

/**
 * Lodash forEach, can be used
 */
util.forEach = require('lodash/forEach')

/**
 * Lodash isFunction, can be used
 */
util.isFunction = require('lodash/isFunction')

/**
 * Lodash isString, can be used
 */
util.isString = require('lodash/isString')

/**
 * Lodash isObject, can be used
 */
util.isObject = require('lodash/isObject')

/**
 * Lodash isArray, can be used
 */
util.isArray = require('lodash/isArray')

/**
 * Lodash isBoolean, can be used
 */
util.isBoolean = require('lodash/isBoolean')

/**
 * Lodash uniqueId, can be used
 */
util.uniqueId = require('lodash/uniqueId')

/**
 * Flyd streams: Might change!
 */
util.flyd = require('flyd')

/**
 * Polymorphic helper: Might change!
 */
util.polymorphic = require('polymorphic')

/**
 * Several included reducer examples
 */
util.reducers = require('./reducers.js')

module.exports = util
