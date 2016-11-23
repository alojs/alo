var u = require('./../util/util.js')

/**
 * Handler class
 * TODO: Describe what this class is all about
 *
 * @class
 */
var Handler = function AloHandler () {
  /**
   * Private properties
   *
   * @namespace
   *
   * @private
   */
  this.protected = {}

  /**
   * Is this handler enabled?
   */
  this.protected.enabled = true

  /**
   * Unique ID of this handler
   */
  this.protected.id = u.uniqueId()

  /**
   * Array of registered reducers
   */
  this.protected.reducers = []

  /**
   * Object of registered stores
   */
  this.protected.stores = {}
}

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
  if (this.protected.enabled === true) {
    u.forEach(this.protected.reducers, function (item) {
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
Handler.prototype.addReducer = u.polymorphic()
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
      self.protected.reducers.push(reducer)
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
 * Connect one or multible stores to this handler
 *
 * @function
 *
 * @param {Store|array} store One store or array of stores
 * @param {boolean} fromStore Was this function called within a store
 *
 * @return {Handler} this
 */
Handler.prototype.addStore = u.polymorphic()
var addStore = Handler.prototype.addStore
var addStoreArray = function addStoreArray (stores, fromStore) {
  var self = this
  if (!u.isArray(stores)) {
    throw new Error('Argument given is not an array')
  }
  if (stores.length > 0) {
    var Store = require('./../store/store.js')
    u.forEach(stores, function (store) {
      if (!(store instanceof Store)) {
        throw new Error('Item in array given is not a store')
      } else {
        var id = store.getId()
        if (u.isString(id) && id !== '') {
          self.protected.stores[id] = store
          if (!u.isBoolean(fromStore) || fromStore !== true) {
            store.addHandler(self, true)
          }
        }
      }
    })
  }

  return this
}
addStore.signature('array, boolean b=false', addStoreArray)
addStore.signature('object, boolean b=false', function (store, fromStore) {
  return addStoreArray.call(this, [store], fromStore)
})

/**
 * Disables this handler
 *
 * @return {Handler} this
 */
Handler.prototype.disable = function disable () {
  this.protected.enabled = false

  return this
}

/**
 * Enables this handler
 *
 * @return {Handler} this
 */
Handler.prototype.enable = function enable () {
  this.protected.enabled = true

  return this
}

/**
 * Get id of this handler
 *
 * @return {string} Unique ID of this handler
 */
Handler.prototype.getId = function getId () {
  return this.protected.id
}

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
Handler.prototype.removeStore = u.polymorphic()
var removeStore = Handler.prototype.removeStore
var removeStoreById = function removeStoreById (id, fromStore) {
  if (!u.isString(id) || id !== '') {
    throw new Error('Provided id is not a valid string')
  } else {
    if (this.protected.stores[id] != null) {
      if (!u.isBoolean(fromStore) || fromStore !== true) {
        var Store = require('./../store/store.js')
        if (this.protected.stores[id] instanceof Store) {
          this.protected.stores[id].removeHandler(this.getId(), true)
        }
      }
      delete this.protected.stores[id]
    }
  }

  return this
}
removeStore.signature('string, boolean b=false', removeStoreById)
removeStore.signature('object, boolean b=false', function (store, fromStore) {
  var Store = require('./../store/store.js')
  if (!(store instanceof Store)) {
    throw new Error('Argument of type object is not a store')
  } else {
    return removeStoreById.call(this, store.getId(), fromStore)
  }
})
removeStore.signature('boolean a=false', function (fromStore) {
  var self = this

  u.forEach(this.protected.stores, function (store, idx) {
    removeStoreById.call(self, idx, fromStore)
  })

  return this
})

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
