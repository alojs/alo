// @flow

import Util from './util/util.js'
import Subscription from './subscription/subscription.js'
import Dependency from './dependency/dependency.js'
import Member from './member/member.js'
import Reducer from './reducer/reducer.js'
import Store from './store/store.js'
import Middleware from './middleware/middleware.js'

var Alo = function Alo (id) {
  /**
   * Access to the util namespace
   *
   * @see util
   */
  this.util = new Util()
  this._id = (this.util.isString(id) && id !== '') ? id : this.util.uniqueId()
}

Alo.prototype.createSubscription = function createSubscription () {
  var subscription = Object.create(Subscription.prototype)
  subscription._alo = this
  Subscription.apply(subscription, arguments)
  return subscription
}

Alo.prototype.isSubscription = function isSubscription (subscription) {
  return (subscription instanceof Subscription)
}

Alo.prototype.createDependency = function createDependency () {
  var dependency = Object.create(Dependency.prototype)
  dependency._alo = this
  Dependency.apply(dependency, arguments)
  return dependency
}

Alo.prototype.isDependency = function isDependency (dependency) {
  return (dependency instanceof Dependency)
}

Alo.prototype.createMember = function createMember () {
  var member = Object.create(Member.prototype)
  member._alo = this
  Member.apply(member, arguments)
  return member
}

Alo.prototype.isMember = function isMember (member) {
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
  var reducer = Object.create(Reducer.prototype)
  reducer._alo = this
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
  return (reducer instanceof Reducer)
}

/**
 * Same as new Store
 * @see Store
 */
Alo.prototype.createStore = function createStore () {
  var store = Object.create(Store.prototype)
  store._alo = this
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
Alo.prototype.isStore = function isStore (store, validateId) {
  validateId = (validateId === true)
  var isStore = (store instanceof Store)
  var idValid = !validateId || (store._alo && store._alo._id === this._id)
  return isStore && idValid
}

Alo.prototype.isMiddleware = function isMiddleware (middleware) {
  return (middleware instanceof Middleware)
}

Alo.prototype.createMiddleware = function createMiddleware () {
  var middleware = Object.create(Middleware.prototype)
  middleware._alo = this
  Middleware.apply(middleware, arguments)
  return middleware
}

export default Alo
