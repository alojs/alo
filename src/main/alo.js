/**
 * alo Modul
 * @module alo
 */

var Store = require('./../lib/store.js');

/**
 * public object with access to the different constructors
 */
module.exports = {
  /**
   * Access to the store constructor
   * @see module:alo/store
   */
  Store: Store,
  /**
   * Access to the subscription constructor
   * @see module:alo/subscription
   */
  Subscription: require('./../lib/subscription.js')
}
