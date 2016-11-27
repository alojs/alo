var u = require('./../util/util.js')

var storeRelation = u.createObjectRelation('subscription', 'store', u.isStore)
var memberRelation = u.createObjectRelation('subscription', 'member', u.isMember)

/**
 * Subscription Constructor, is used in the Store Class to create Subscriptions to state
 *
 * @class
 * @extends {Store}
 * @see Store
 * @param {number} id
 * @param {Object} storeProtected
 * @param {string | Array} namespace
 */
var Subscription = function Subscription () {
  this._id = null

  this._storeRelations = null
  this._memberRelations = null

  this._streams = []

  // While binding the publish function to the streams of the registered stores
  this._binding_publish = false

  storeRelation.constructParent(this)
  memberRelation.constructParent(this)

  subscription.apply(this, arguments)
}
var subscription = u.createPolymorphic()
subscription.signature('function', function (func) {
  this.addFunction(func)
})

Subscription.prototype.addMember = null
Subscription.prototype.getMember = null

storeRelation.after('add', function () {
  var self = this

  u.forEach(this._streams, function (stream) {
    stream.end(true)
  })
  this._streams = []

  this._binding_publish = true
  u.forEach(this.getStore(), function (store) {
    var onStream = u.streamOn(function (state) {
      self._publish(store, state)
    }, store.getStream())
    self._streams.push(onStream)
  })
  this._binding_publish = false
})

storeRelation.registerParentPrototype(Subscription.prototype)
memberRelation.registerParentPrototype(Subscription.prototype)

Subscription.prototype.addFunction = u.createPolymorphic()
var addFunction = Subscription.prototype.addFunction
addFunction.signature('function', function (func) {
  var Member = require('./member.js')
  var member = new Member(func)
  this.addMember(member)

  return member
})
addFunction.signature('array', function (functions) {
  var self = this

  u.forEach(functions, function (func) {
    self.addFunction(func)
  })

  return this
})

Subscription.prototype._publish = function (store, state) {
  if (this._binding_publish === false) {
    u.forEach(this.getMember(), function (member) {
      member._call(state)
    })
  }
}

Subscription.prototype.before = null
Subscription.prototype.after = null

Subscription.prototype.enable = null
Subscription.prototype.disable = null

Subscription.prototype.remember = function remember () {
  var self = this

  u.forEach(this.getStore(), function (store) {
    self._publish(store, store.getState())
  })

  return this
}

module.exports = Subscription
