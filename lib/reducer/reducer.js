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
  this.set('prepare', prepareFunction)
})
reducer.signature('array', function (reducers) {
  this.addReducer(reducers)
})
reducer.signature('function, function', function (prepareFunction, finalizeFunction) {
  this.set('prepare', prepareFunction)
  this.set(finalizeFunction)
})
reducer.signature('function, array', function (prepareFunction, reducers) {
  this.set('prepare', prepareFunction)
  this.addReducer(reducers)
})
reducer.signature('function, function, array', function (prepareFunction, finalizeFunction, reducers) {
  this.set('prepare', prepareFunction)
  this.set(finalizeFunction)
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
Reducer.prototype.set = u.createPolymorphic()
var set = Reducer.prototype.set
set.signature('string a=finalize, function', function (type, func) {
  switch (type) {
    case 'prepare':
      this._prepareFunction = func
      break
    case 'finalize':
      this._finalizeFunction = func
      break
    default:
      throw new Error('Argument for type should be prepare or finalize')
  }

  return this
})

Reducer.prototype.has = u.createPolymorphic()
var has = Reducer.prototype.has
has.signature('string a=finalize', function (type) {
  switch (type) {
    case 'prepare':
      return u.isFunction(this.get(type))
    case 'finalize':
      return u.isFunction(this.get(type))
    default:
      throw new Error('Argument for type should be prepare or finalize')
  }
})

Reducer.prototype.get = u.createPolymorphic()
var get = Reducer.prototype.get
get.signature('string a=finalize', function get (type) {
  switch (type) {
    case 'prepare':
      return this._prepareFunction
    case 'finalize':
      return this._finalizeFunction
    default:
      throw new Error('Argument for type should be prepare or finalize')
  }
})

Reducer.prototype.unset = function (type) {
  if (type !== undefined && ['prepare', 'finalize'].indexOf(type) === -1) {
    throw new Error('Argument for type should be prepare or finalize')
  } else {
    if (type === undefined || type === 'prepare') {
      this._prepareFunction = false
    }
    if (type === undefined || type === 'finalize') {
      this._finalizeFunction = false
    }
  }

  return this
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
    var preparer = this.get('prepare')
    if (u.isFunction(preparer)) {
      state = preparer(u.cloneDeep(state), action)
    }
    u.forEach(this.getReducer(false), function (item) {
      state = item.reduce(u.cloneDeep(state), action)
    })
    var finalizer = this.get('finalize')
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
