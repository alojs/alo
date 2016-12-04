var Alo = require('./../alo.js')
var alo = new Alo()
var u = alo.util

var storeRelation = u.createObjectRelation('subscription', 'store', alo.isStore)
var memberRelation = u.createObjectRelation('subscription', 'member', alo.isMember)
var dependencyRelation = u.createObjectRelation('subscription', 'dependency', alo.isDependency)

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
  this._dependencyRelations = null

  this._events = {
    'beforePublish': [],
    'afterPublish': []
  }

  this._subscriptionStream = null
  this._stream = null
  this._lastData = {}

  this._muted = false

  storeRelation.constructParent(this)
  memberRelation.constructParent(this)
  dependencyRelation.constructParent(this)

  subscription.apply(this, arguments)
}

// TODO: Implement additional signatures
var subscription = u.createPolymorphic()
subscription.signature('', function () {})
subscription.signature('object, array', function (dependencies, members) {
  this._dependencyCache.setDependency(dependencies)
  this.addMember(members)
})
subscription.signature('object', function (dependencies) {
  this._dependencyCache.setDependency(dependencies)
})
subscription.signature('array', function (members) {
  this.addMember(members)
})
subscription.signature('function', function (func) {
  this.createMember(func)
})

Subscription.prototype.addMember = null
Subscription.prototype.getMember = null

var afterChange = function () {
  var self = this

  if (u.isStream(this._stream)) {
    this._stream.end(true)
    this._stream = null
  }
  if (u.isStream(this._subscriptionStream)) {
    this._subscriptionStream.end(true)
    this._subscriptionStream = null
  }

  var streams = []
  var stores = u.values(this.getStore())
  u.forEach(stores, function (store) {
    streams.push(store.getStream())
  })
  this._stream = u.combineStreams(function () {
    var streamState = {}
    u.forEach(u.values(arguments), function (stream, idx) {
      if (alo.isStore(stores[idx])) {
        streamState[stores[idx].getId()] = stream()
      }
    })
    return u.Promise.resolve().then(function () {
      var dependencies = self.getDependency(false)
      if (dependencies.length > 0) {
        var depsState = {
          state: streamState,
          computed: {}
        }
        var idx = 0
        var walker = function () {
          if (dependencies[idx] !== undefined) {
            if (alo.isDependency(dependencies[idx])) {
              return u.Promise.resolve().then(function () {
                return dependencies[idx].reduce(depsState)
              }).then(function (computed) {
                depsState.computed = computed
                idx++
                return walker()
              })
            } else {
              idx++
              return walker()
            }
          } else {
            return depsState.computed
          }
        }
        return walker()
      } else {
        return {}
      }
    }).then(function (computed) {
      return {stores: streamState, computed: computed}
    })
  }, streams)
  this._subscriptionStream = u.streamOn(function (data) {
    var computedLength = u.values(data.computed).length
    if ((computedLength === 0 && !u.isEqual(self._lastData.stores, data.stores)) ||
      (computedLength > 0 && !u.isEqual(self._lastData.computed, data.computed))
    ) {
      self._lastData = data
      self._publish(data)
    }
  }, this._stream)
}

storeRelation.after('add', afterChange)
storeRelation.after('remove', afterChange)

storeRelation.registerParentPrototype(Subscription.prototype)
memberRelation.registerParentPrototype(Subscription.prototype)
dependencyRelation.registerParentPrototype(Subscription.prototype)

Subscription.prototype.createMember = function createMember () {
  var member = alo.createMember.apply(null, arguments)
  this.addMember(member)

  return this
}

Subscription.prototype._callEvent = function (name, state) {
  var promises = this._events[name].map(function (func) {
    return u.Promise.resolve(state).then(func)
  })
  return u.Promise.all(promises).then(function (results) {
    var result = (results.indexOf(false) === -1)
    return result
  })
}

Subscription.prototype._publish = function (state) {
  var self = this
  if (self._muted === false) {
    self._muted = true
    var promise = u.Promise.resolve().then(function () {
      return self._callEvent('beforePublish', state)
    }).then(function (runPublish) {
      if (runPublish !== false) {
        var state = self.getData()
        var promises = []
        u.forEach(self.getMember(false), function (member) {
          promises.push(member._call(state.stores, state.computed))
        })
        return u.Promise.all(promises)
      } else {
        return false
      }
    }).then(function (runPublish) {
      if (runPublish !== false) {
        return self._callEvent('afterPublish', state)
      }
    }).then(function () {
      self._muted = false
      return null
    })
    return promise
  }
}

Subscription.prototype.enable = null
Subscription.prototype.disable = null

// TODO: Rewrite
Subscription.prototype.remember = function remember () {
  var self = this

  var promises = []

  u.forEach(this.getStore(), function (store) {
    promises.push(self._publish(store, store.getData()))
  })

  return u.Promise.all(promises)
}

Subscription.prototype.stop = function stop () {
  this.disable()
  this.removeStore()

  return this
}

Subscription.prototype.getStream = function getStream () {
  return this._stream
}

Subscription.prototype.getData = function getData () {
  return u.cloneDeep(this.getStream()())
}

Subscription.prototype.createDependency = function createDependency () {
  var dependency = alo.createDependency.apply(null, arguments)
  this.addDependency(dependency)

  return dependency
}

Subscription.prototype.on = u.createPolymorphic()
var on = Subscription.prototype.on
on.signature('string, function', function (type, func) {
  if (!u.isArray(this._events[type])) {
    throw new Error('Argument type is not a valid type')
  } else {
    var idx = this._events[type].length
    this._events[type].push(func)
  }
  return {
    stop: function () {
      delete this._events[type][idx]
    }
  }
})

module.exports = Subscription
