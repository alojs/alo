var u = require('./../util/util.js')
var ObjectRelation = require('./../object_relation/object_relation.js')

var subscriptionRelation = new ObjectRelation('member', 'subscription', u.isSubscription)

var Member = function Member (func) {
  this._function = null
  this._enabled = true
  this._id = null

  subscriptionRelation.constructParent(this)
  this.setFunction(func)
}

subscriptionRelation.registerParentPrototype(Member.prototype)

Member.prototype._call = function _call () {
  if (this.isEnabled()) {
    this.getFunction().apply(null, arguments)
  }
  return this
}

Member.prototype.disable = function disable () {
  this._enabled = false
  return this
}

Member.prototype.enable = function enable () {
  this._enabled = true
  return this
}

Member.prototype.isEnabled = function isEnabled () {
  return this._enabled
}

Member.prototype.getFunction = function getFunction () {
  return this._function
}

Member.prototype.setFunction = function setFunction (func) {
  if (!u.isFunction(func)) {
    throw new Error('Argument given needs to be a function')
  } else {
    this._function = func
  }
  return this
}

module.exports = Member
