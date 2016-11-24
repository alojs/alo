/**
 * alo Modul
 * @module alo
 */

var util = require('./../lib/util/util.js')

/**
 * public object with access to the different constructors
 */
module.exports = {
  /**
   * Same as new Handler
   * @see Handler
   */
  createHandler: util.createHandler,

  /**
   * Same as new Store
   * @see Store
   */
  createStore: util.createStore,

  /**
   * Access to the util namespace
   *
   * @see util
   */
  util: util,

  /**
   * Access to the handler constructor
   *
   * @see Handler
   */
  Handler: require('./../lib/handler/handler.js'),

  /**
   * Access to the store constructor
   *
   * @see Store
   */
  Store: require('./../lib/store/store.js'),

  /**
   * Access to the subscription constructor
   *
   * @see Subscription
   */
  Subscription: require('./../lib/subscription/subscription.js')
}
