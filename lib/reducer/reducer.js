import ObjectRelation from './../util/object-relation.js'
import Util from './../util/util.js'
var Customizer = require('./../util/customizer.js')

var u = new Util()
var customizer = new Customizer(false)

var storeRelation = new ObjectRelation('reducer', 'store', function () {
  return this._alo.isStore.apply(this._alo, arguments)
})
var reducerRelation = new ObjectRelation('reducer', 'parentReducer', function () {
  return this._alo.isReducer.apply(this._alo, arguments)
})
var parentReducerRelation = new ObjectRelation('parentReducer', 'reducer', function () {
  return this._alo.isReducer.apply(this._alo, arguments)
})

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

  customizer.constructParent(this)
  storeRelation.constructParent(this)
  reducerRelation.constructParent(this)
  parentReducerRelation.constructParent(this)

  reducer.apply(this, arguments)
}
var reducer = u.createPolymorphic()
reducer.signature('', function () {})
reducer.signature('function', function (prepareFunction) {
  this.setCustomizer(prepareFunction, 'prepare')
})
reducer.signature('array', function (reducers) {
  this.addReducer(reducers)
})
reducer.signature('function, function', function (prepareFunction, finalizeFunction) {
  this.setCustomizer(prepareFunction, 'prepare')
  this.setCustomizer(finalizeFunction)
})
reducer.signature('function, array', function (prepareFunction, reducers) {
  this.setCustomizer(prepareFunction, 'prepare')
  this.addReducer(reducers)
})
reducer.signature('function, function, array', function (prepareFunction, finalizeFunction, reducers) {
  this.setCustomizer(prepareFunction, 'prepare')
  this.setCustomizer(finalizeFunction)
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

customizer.registerParentPrototype(Reducer.prototype)
storeRelation.registerParentPrototype(Reducer.prototype)
reducerRelation.registerParentPrototype(Reducer.prototype)
parentReducerRelation.registerParentPrototype(Reducer.prototype)

Reducer.prototype.createReducer = function () {
  var reducer = this._alo.createReducer.apply(this._alo, arguments)
  this.addReducer(reducer)

  return reducer
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
    var customizerResult = this.callCustomizer('prepare', u.cloneDeep(state), action)
    if (customizerResult !== undefined) {
      state = customizerResult
    }
    u.forEach(this.getReducer(false), function (item) {
      state = item.reduce(u.cloneDeep(state), action)
    })
    customizerResult = this.callCustomizer('finalize', u.cloneDeep(state), action)
    if (customizerResult !== undefined) {
      state = customizerResult
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
