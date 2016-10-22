/**
 * Subscription
 * @module alo/subscription
 * @see module:alo/store
 */

var Store = require('./store.js')

/**
 * Subscription Constructor, is used in the Store Class to create Subscriptions to state
 *
 * @function
 * @extends {alo/store}
 
 * @param {number} id
 * @param {Object} storeProtected
 * @param {string | Array} namespace
 */
var Subscription = function AloSubscription(id, storeProtected, namespace) {
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
