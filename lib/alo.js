var Alo = function Alo (id) {
  var Util = require('./util/util.js')

  /**
   * Access to the util namespace
   *
   * @see util
   */
  this.util = new Util()
  this._id = (this.util.isString(id) && id !== '') ? id : this.util.uniqueId()
}

Alo.prototype.createSubscription = function createSubscription () {
  var Subscription = require('./subscription/subscription.js')
  var subscription = Object.create(Subscription.prototype)
  Subscription.apply(subscription, arguments)
  return subscription
}

Alo.prototype.isSubscription = function isSubscription (subscription) {
  var Subscription = require('./subscription/subscription.js')
  return (subscription instanceof Subscription)
}

Alo.prototype.createDependency = function createDependency () {
  var Dependency = require('./dependency/dependency.js')
  var dependency = Object.create(Dependency.prototype)
  Dependency.apply(dependency, arguments)
  return dependency
}

Alo.prototype.isDependency = function isDependency (dependency) {
  var Dependency = require('./dependency/dependency.js')
  return (dependency instanceof Dependency)
}

Alo.prototype.createMember = function createMember () {
  var Member = require('./member/member.js')
  var member = Object.create(Member.prototype)
  Member.apply(member, arguments)
  return member
}

Alo.prototype.isMember = function isMember (member) {
  var Member = require('./member/member.js')
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
  var Reducer = require('./reducer/reducer.js')
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
  var Reducer = require('./reducer/reducer.js')
  return (reducer instanceof Reducer)
}

/**
 * Same as new Store
 * @see Store
 */
Alo.prototype.createStore = function createStore () {
  var Store = require('./store/store.js')
  var store = Object.create(Store.prototype)
  Store.apply(store, arguments)
  store._alo = this
  return store
}

/**
 * Instanceof check for stores
 *
 * @param {*} store Argument to check if it is a store
 *
 * @return {boolean} true of it is a store, false in the other case
 */
Alo.prototype.isStore = function isStore (store, validateId) {
  validateId = (validateId === true)
  var Store = require('./store/store.js')
  var isStore = (store instanceof Store)
  var idValid = !validateId || (store._alo && store._alo._id === this._id)
  return isStore && idValid
}

Alo.prototype.isMiddleware = function isMiddleware (middleware) {
  var Middleware = require('./middleware/middleware.js')
  return (middleware instanceof Middleware)
}

Alo.prototype.createMiddleware = function createMiddleware () {
  var Middleware = require('./middleware/middleware.js')
  var middleware = Object.create(Middleware.prototype)
  Middleware.apply(middleware, arguments)
  return middleware
}

module.exports = Alo
