import ObjectRelation from './../util/object-relation.js'
import Util from './../util/util.js'

var u = new Util()

var subscriptionRelation = new ObjectRelation('member', 'subscription', function () {
  return this._alo.isSubscription.apply(this._alo, arguments)
})
var dependencyRelation = new ObjectRelation('member', 'dependency', function () {
  return this._alo.isDependency.apply(this._alo, arguments)
})

var Member = function Member () {
  this._dependency = {}
  this._function = null
  this._enabled = true
  this._lastData = null

  subscriptionRelation.constructParent(this)
  dependencyRelation.constructParent(this)
  member.apply(this, arguments)
}
var member = u.createPolymorphic()
member.signature('function', function (func) {
  this.setFunction(func)
})
member.signature('object', function (dependencies) {
  this.addDependency(dependencies)
})
member.signature('object, function', function (dependencies, func) {
  this.addDependency(dependencies)
  this.setFunction(func)
})

subscriptionRelation.registerParentPrototype(Member.prototype)
dependencyRelation.registerParentPrototype(Member.prototype)

Member.prototype._call = function _call (stores, computed) {
  var self = this
  if (this.isEnabled()) {
    var func = self.getFunction()
    if (u.isFunction(func)) {
      return u.Promise.resolve().then(function () {
        var dependencies = self.getDependency(false)
        if (dependencies.length > 0) {
          var depsState = {
            state: stores,
            computed: {}
          }
          return dependencies[0].reduceRecursive(dependencies, self.getId(), depsState)
        } else {
          return computed
        }
      }).then(function (computed) {
        var computedLength = u.values(computed).length
        if (self._lastData === null ||
          (computedLength === 0) ||
          (computedLength > 0 && !u.isEqual(self._lastData, computed))
        ) {
          self._lastData = computed
          func(stores, computed)
        }
      })
    }
  }
  return this
}

Member.prototype.createDependency = function createDependency () {
  var dependency = this._alo.createDependency.apply(this._alo, arguments)
  this.addDependency(dependency)

  return dependency
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

Member.prototype.stop = function stop () {
  this.disable()
  this.removeSubscription()

  return this
}

export default Member
