/**
 * alo Modul
 * @module alo
 */

/**
 * public object with access to the different constructors
 */
module.exports = {
  /**
   * Access to the store constructor
   *
   * @see Store
   */
  Store: require('./../lib/store/store.js'),

  /**
   * Access to the handler constructor
   *
   * @see Handler
   */
  Handler: require('./../lib/handler/handler.js'),

  /**
   * Access to the subscription constructor
   *
   * @see Subscription
   */
  Subscription: require('./../lib/subscription/subscription.js'),

  /**
   * Access to the util namespace
   *
   * @see util
   */
  util: require('./../lib/util/util.js')
}
