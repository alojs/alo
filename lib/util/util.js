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
 *
 * @function
 */
util.cloneDeep = require('lodash/cloneDeep')

/**
 * Lodash values, can be used
 *
 * @function
 */
util.values = require('lodash/values')

/**
 * Lodash forEach, can be used
 *
 * @function
 */
util.forEach = require('lodash/forEach')

/**
 * Lodash isFunction, can be used
 *
 * @function
 */
util.isFunction = require('lodash/isFunction')

/**
 * Lodash isString, can be used
 *
 * @function
 */
util.isString = require('lodash/isString')

/**
 * Lodash isObject, can be used
 *
 * @function
 */
util.isObject = require('lodash/isObject')

/**
 * Lodash isArray, can be used
 *
 * @function
 */
util.isArray = require('lodash/isArray')

/**
 * Lodash isBoolean, can be used
 *
 * @function
 */
util.isBoolean = require('lodash/isBoolean')

/**
 * Lodash uniqueId, can be used
 *
 * @function
 */
util.uniqueId = require('lodash/uniqueId')

/**
 * Lodash startCase, can be used
 *
 * @function
 */
util.startCase = require('lodash/startCase')

var flyd = require('flyd')
/**
 * Flyd stream: Might change!
 *
 * @function
 */
util.createStream = flyd.stream

/**
 * Flyd stream: Might change!
 *
 * @function
 */
util.combineStreams = flyd.combine

/**
 * Flyd isStream: Might change!
 *
 * @function
 */
util.isStream = flyd.isStream

/**
 * Flyd immediate: Might change!
 *
 * @function
 */
util.immediateStream = flyd.immediate

/**
 * Flyd endsOn: Might change!
 *
 * @function
 */
util.streamEndsOn = flyd.endsOn

/**
 * Flyd map: Might change!
 *
 * @function
 */
util.mapStream = flyd.map

/**
 * Flyd on: Might change!
 *
 * @function
 */
util.streamOn = flyd.on

/**
 * Flyd scan: Might change!
 *
 * @function
 */
util.scanStream = flyd.scan

/**
 * Flyd merge: Might change!
 *
 * @function
 */
util.mergeStream = flyd.merge

/**
 * Flyd transduce: Might change!
 *
 * @function
 */
util.transduceStream = flyd.transduce

/**
 * Flyd curryN: Might change!
 *
 * @function
 */
util.curryN = flyd.curryN

/**
 * Polymorphic helper: Might change!
 *
 * @function
 */
util.createPolymorphic = require('polymorphic')

util.Promise = require('yaku')

util.createPromise = function createPromise (resolve, reject) {
  return new util.Promise(resolve, reject)
}

/**
 * Alo specific functions
 */

util.createSubscription = function createSubscription () {
  var Subscription = require('./../subscription/subscription.js')
  var subscription = Object.create(Subscription.prototype)
  Subscription.apply(subscription, arguments)
  return subscription
}

util.createMember = function createMember () {
  var Member = require('./../subscription/member.js')
  var member = Object.create(Member.prototype)
  Member.apply(member, arguments)
  return member
}

/**
 * Same as new Handler
 * @see Handler
 */
util.createHandler = function createHandler () {
  var Handler = require('./../handler/handler.js')
  var handler = Object.create(Handler.prototype)
  Handler.apply(handler, arguments)
  return handler
}

/**
 * Same as new Store
 * @see Store
 */
util.createStore = function createStore () {
  var Store = require('./../store/store.js')
  var store = Object.create(Store.prototype)
  Store.apply(store, arguments)
  return store
}

util.createObjectRelation = function createObjectRelation () {
  var ObjectRelation = require('./../object-relation/object-relation.js')
  var objectRelation = Object.create(ObjectRelation.prototype)
  ObjectRelation.apply(objectRelation, arguments)
  return objectRelation
}

/**
 * Instanceof check for handlers
 *
 * @param {*} handler Argument to check if it is a handler
 *
 * @return {boolean} true of it is a handler, false in the other case
 */
util.isHandler = function isHandler (handler) {
  var Handler = require('./../handler/handler.js')
  return (handler instanceof Handler)
}

/**
 * Instanceof check for stores
 *
 * @param {*} store Argument to check if it is a store
 *
 * @return {boolean} true of it is a store, false in the other case
 */
util.isStore = function isStore (store) {
  var Store = require('./../store/store.js')
  return (store instanceof Store)
}

util.isMiddleware = function isMiddleware (middleware) {
  var Middleware = require('./../middleware/middleware.js')
  return (middleware instanceof Middleware)
}

util.isMember = function isMember (member) {
  var Member = require('./../subscription/member.js')
  return (member instanceof Member)
}

util.isSubscription = function isSubscription (subscription) {
  var Subscription = require('./../subscription/subscription.js')
  return (subscription instanceof Subscription)
}

module.exports = util
