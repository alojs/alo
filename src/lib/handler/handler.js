var u = require('./../util/util.js')

/**
 * Handler class
 * TODO: Describe what this class is all about
 *
 * @class
 */
var Handler = function Handler () {
  handler.apply(this, arguments)
}
var handler = u.polymorphic()
var handlerWithReducerArray = function handlerWithReducerArray (reducers) {
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
  this._id = u.uniqueId()

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
  this._stores = {}

  if (!u.isArray(reducers)) {
    throw new Error('Argument given is not an array')
  } else {
    this.addReducer(reducers)
  }
}
handler.signature('array', handlerWithReducerArray)
handler.signature('...', handlerWithReducerArray)
handler.signature('function', function (func) {
  handlerWithReducerArray.call(this, [func])
})
handler.signature('', function () {
  handlerWithReducerArray.call(this, [])
})

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
  if (this._enabled === true) {
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
    u.forEach(stores, function (store) {
      if (!u.isStore(store)) {
        throw new Error('Item in array given is not a store')
      } else {
        var id = store.getId()
        if (u.isString(id) && id !== '') {
          self._stores[id] = store
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

/**
 * Get id of this handler
 *
 * @return {string} Unique ID of this handler
 */
Handler.prototype.getId = function getId () {
  return this._id
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
    if (this._stores[id] != null) {
      if (!u.isBoolean(fromStore) || fromStore !== true) {
        if (u.isStore(this._stores[id])) {
          this._stores[id].removeHandler(this.getId(), true)
        }
      }
      delete this._stores[id]
    }
  }

  return this
}
removeStore.signature('string, boolean b=false', removeStoreById)
removeStore.signature('object, boolean b=false', function (store, fromStore) {
  if (!u.isStore(store)) {
    throw new Error('Argument of type object is not a store')
  } else {
    return removeStoreById.call(this, store.getId(), fromStore)
  }
})
removeStore.signature('boolean a=false', function (fromStore) {
  var self = this

  u.forEach(this._stores, function (store, idx) {
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
