var u = require('./../util/util.js')

var storeRelation = u.createObjectRelation('handler', 'store', u.isStore)

/**
 * Handler class
 * TODO: Describe what this class is all about
 *
 * @class
 */
var Handler = function Handler () {
  handler.apply(this, arguments)
}
var handler = u.createPolymorphic()
handler.signature('array', function (reducers) {
  /**
   * Is this handler enabled?
   *
   * @name _enabled
   * @memberof Handler
   * @private
   */
  this._enabled = true

  /**
   * Unique ID of this handler
   *
   * @name _id
   * @memberof Handler
   * @private
   */
  this._id = null

  /**
   * Array of registered reducers
   *
   * @name _reducers
   * @memberof Handler
   * @private
   */
  this._reducers = []

  /**
   * Object of registered stores
   *
   * @name _stores
   * @memberof Handler
   * @private
   */
  this._stores = null

  storeRelation.constructParent(this)

  if (!u.isArray(reducers)) {
    throw new Error('Argument given is not an array')
  } else {
    this.addReducer(reducers)
  }
})
handler.signature('...', handler)
handler.signature('function', function (func) {
  handler.call(this, [func])
})
handler.signature('', function () {
  handler.call(this, [])
})

/**
 * Get id of this handler
 *
 * @return {string} Unique ID of this handler
 */
Handler.prototype.getId = null

/**
 * Connect one or multible stores to this handler
 *
 * @function
 *
 * @param {Store|array} store One store or array of stores
 * @param {boolean} fromStore Was this function called within a store
 *
 * @return {Handler} this
 */
Handler.prototype.addStore = null

/**
 * Remove a store or all stores from this handler
 *
 * @function
 *
 * @param {integer|Store|boolean} store|fromStore
 * @param {boolean} fromStore Was this called within a store?
 *
 * @return {Handler} this
 */
Handler.prototype.removeStore = null

storeRelation.registerParentPrototype(Handler.prototype)

/**
 * Calls the registered reducers with the provided state and action
 * This is automatically started after a successfull dispatch on the Store
 *
 * @private
 *
 * @param {object} state
 * @param {object} action
 *
 * @return {object} state Returns the changed state
 */

Handler.prototype._handle = function _handle (state, action) {
  if (this.isEnabled()) {
    u.forEach(this._reducers, function (item) {
      state = item.call(this, state, action)
    })
  }

  return state
}

/**
 * Add reducer functions to the handler
 *
 * @function
 *
 * @param {array|function} reducer Array of reducers or single reducer function
 * @param {...function} reducers More reducers
 *
 * @return {Handler} this
 */
Handler.prototype.addReducer = u.createPolymorphic()
var addReducer = Handler.prototype.addReducer
var addReducerArray = function addReducerArray (reducers) {
  var self = this

  if (!u.isArray(reducers)) {
    throw new Error('Argument given is not an array')
  }
  u.forEach(reducers, function (reducer) {
    if (!u.isFunction(reducer)) {
      throw new Error('Item in array is not a function')
    } else {
      self._reducers.push(reducer)
    }
  })

  return this
}
addReducer.signature('array', addReducerArray)
addReducer.signature('...', addReducerArray)
addReducer.signature('function', function (reducer) {
  return addReducerArray.call(this, [reducer])
})

/**
 * Disables this handler
 *
 * @return {Handler} this
 */
Handler.prototype.disable = function disable () {
  this._enabled = false

  return this
}

/**
 * Enables this handler
 *
 * @return {Handler} this
 */
Handler.prototype.enable = function enable () {
  this._enabled = true

  return this
}

Handler.prototype.isEnabled = function isEnabled () {
  return this._enabled
}

/**
 * Get registered reducers
 *
 * @private
 *
 * @return {array} reducers
 */
Handler.prototype._getReducers = function _getReducers () {
  return this._reducers
}

/**
 * Stops this handler: it will be disabled and removed from all stores
 *
 * @return {Handler} this
 */
Handler.prototype.stop = function stop () {
  this.removeStore()
  this.disable()
  return this
}

module.exports = Handler
