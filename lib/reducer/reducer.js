var Alo = require('./../alo.js')
var alo = new Alo()
var u = alo.util

var storeRelation = u.createObjectRelation('reducer', 'store', alo.isStore)
var reducerRelation = u.createObjectRelation('reducer', 'parentReducer', alo.isReducer)
var parentReducerRelation = u.createObjectRelation('parentReducer', 'reducer', alo.isReducer)

/**
 * Reducer class
 * TODO: Describe what this class is all about
 *
 * @class
 */
var Reducer = function Reducer () {
  /**
   * Is this reducer enabled?
   *
   * @name _enabled
   * @memberof Reducer
   * @private
   */
  this._enabled = true

  /**
   * Unique ID of this reducer
   *
   * @name _id
   * @memberof Reducer
   * @private
   */
  this._id = null

  this._prepareFunction = false
  this._finalizeFunction = false

  /**
   * Array of registered reducers
   *
   * @name _reducers
   * @memberof Reducer
   * @private
   */
  this._reducerRelations = null

  /**
   * Object of registered stores
   *
   * @name _stores
   * @memberof Reducer
   * @private
   */
  this._storeRelations = null

  storeRelation.constructParent(this)
  reducerRelation.constructParent(this)
  parentReducerRelation.constructParent(this)

  reducer.apply(this, arguments)
}
var reducer = u.createPolymorphic()
reducer.signature('', function () {})
reducer.signature('function', function (prepareFunction) {
  this.setPrepare(prepareFunction)
})
reducer.signature('array', function (reducers) {
  this.addReducer(reducers)
})
reducer.signature('function, function', function (prepareFunction, finalizeFunction) {
  this.setPrepare(prepareFunction)
  this.setFinalize(finalizeFunction)
})
reducer.signature('function, array', function (prepareFunction, reducers) {
  this.setPrepare(prepareFunction)
  this.addReducer(reducers)
})
reducer.signature('function, function, array', function (prepareFunction, finalizeFunction, reducers) {
  this.setPrepare(prepareFunction)
  this.setFinalize(finalizeFunction)
  this.addReducer(reducers)
})

/**
 * Get id of this reducer
 *
 * @return {string} Unique ID of this reducer
 */
Reducer.prototype.getId = null

/**
 * Connect one or multible stores to this reducer
 *
 * @function
 *
 * @param {Store|array} store One store or array of stores
 * @param {boolean} fromStore Was this function called within a store
 *
 * @return {Reducer} this
 */
Reducer.prototype.addStore = null

/**
 * Remove a store or all stores from this reducer
 *
 * @function
 *
 * @param {integer|Store|boolean} store|fromStore
 * @param {boolean} fromStore Was this called within a store?
 *
 * @return {Reducer} this
 */
Reducer.prototype.removeStore = null

storeRelation.registerParentPrototype(Reducer.prototype)
reducerRelation.registerParentPrototype(Reducer.prototype)
parentReducerRelation.registerParentPrototype(Reducer.prototype)

/**
 *
 */
Reducer.prototype.setPrepare = function setReduce (func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument for setReduce should be a function')
  } else {
    this._prepareFunction = func
  }
}

Reducer.prototype.hasPrepare = function hasPrepare () {
  return u.isFunction(this.getPrepare())
}

Reducer.prototype.getPrepare = function getPrepare () {
  return this._prepareFunction
}

Reducer.prototype.setFinalize = function setFinalize (func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument for setReduce should be a function')
  } else {
    this._finalizeFunction = func
  }
}

Reducer.prototype.hasFinalize = function hasFinalize () {
  return u.isFunction(this.getFinalize())
}

Reducer.prototype.getFinalize = function getFinalize () {
  return this._finalizeFunction
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
Reducer.prototype.reduce = function reduce (state, action) {
  if (this.isEnabled()) {
    var preparer = this.getPrepare()
    if (u.isFunction(preparer)) {
      state = preparer(u.cloneDeep(state), action)
    }
    u.forEach(this.getReducer(false), function (item) {
      state = item.reduce(u.cloneDeep(state), action)
    })
    var finalizer = this.getFinalize()
    if (u.isFunction(finalizer)) {
      state = finalizer(u.cloneDeep(state), action)
    }
  }

  return state
}

/**
 * Disables this reducer
 *
 * @return {Reducer} this
 */
Reducer.prototype.disable = function disable () {
  this._enabled = false

  return this
}

/**
 * Enables this reducer
 *
 * @return {Reducer} this
 */
Reducer.prototype.enable = function enable () {
  this._enabled = true

  return this
}

Reducer.prototype.isEnabled = function isEnabled () {
  return this._enabled
}

/**
 * Stops this reducer: it will be disabled and removed from all stores
 *
 * @return {Reducer} this
 */
Reducer.prototype.stop = function stop () {
  this.removeStore()
  this.disable()
  return this
}

module.exports = Reducer
