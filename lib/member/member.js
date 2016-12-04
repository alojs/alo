var Alo = require('./../alo.js')
var alo = new Alo()
var u = alo.util

var subscriptionRelation = u.createObjectRelation('member', 'subscription', alo.isSubscription)

var Member = function Member () {
  this._dependency = {}
  this._function = null
  this._enabled = true

  subscriptionRelation.constructParent(this)
  member.apply(this, arguments)
}
var member = u.createPolymorphic()
member.signature('function', function (func) {
  return member.call(this, {}, func)
})
member.signature('object, function', function (dependency, func) {
  this.addDependency(dependency)
  this.setFunction(func)
})

subscriptionRelation.registerParentPrototype(Member.prototype)

Member.prototype._call = function _call (stores, computed) {
  if (this.isEnabled()) {
    var func = this.getFunction()
    if (u.isFunction(func)) {
      func(stores, computed)
    }
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

Member.prototype.getDependency = function getDependency () {
  return this._dependency
}

Member.prototype.addDependency = u.createPolymorphic()
var addDependency = Member.prototype.addDependency
addDependency.signature('string, function', function (name, func) {
  if (name === '') {
    throw new Error('Dependency name should not be empty')
  } else {
    this._dependency[name] = func
  }

  return this
})
addDependency.signature('object', function addDependency (dependency) {
  var self = this

  u.forEach(dependency, function (func, name) {
    self.addDependency(name, func)
  })

  return this
})

Member.prototype.stop = function stop () {
  this.disable()
  this.removeSubscription()

  return this
}

module.exports = Member
