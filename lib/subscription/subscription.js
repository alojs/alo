import ObjectRelation from './../util/object-relation.js'
import Util from './../util/util.js'

var u = new Util()

var storeRelation = new ObjectRelation('subscription', 'store', function () {
  return this._alo.isStore.apply(this._alo, arguments)
})
var memberRelation = new ObjectRelation('subscription', 'member', function () {
  return this._alo.isMember.apply(this._alo, arguments)
})
var dependencyRelation = new ObjectRelation('subscription', 'dependency', function () {
  return this._alo.isDependency.apply(this._alo, arguments)
})

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
  this._lastData = null

  this._muted = false

  storeRelation.constructParent(this)
  memberRelation.constructParent(this)
  dependencyRelation.constructParent(this)

  subscription.apply(this, arguments)
}

var subscription = u.createPolymorphic()
subscription.signature('', function () {})
subscription.signature('object, array', function (dependencies, members) {
  this.setDependency(dependencies)
  this.addMember(members)
})
subscription.signature('object', function (dependencies) {
  this.setDependency(dependencies)
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
      if (self._alo.isStore(stores[idx])) {
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
        return dependencies[0].reduceRecursive(dependencies, self.getId(), depsState)
      } else {
        return {}
      }
    }).then(function (computed) {
      return {stores: streamState, computed: computed}
    })
  }, streams)
  this._subscriptionStream = u.streamOn(function (data) {
    var computedLength = u.values(data.computed).length
    if (self._lastData === null ||
      (computedLength === 0 && !u.isEqual(self._lastData.stores, data.stores)) ||
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
  var member = this._alo.createMember.apply(this._alo, arguments)
  this.addMember(member)

  return member
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
  if (state && self._muted === false) {
    self._muted = true
    var promise = u.Promise.resolve().then(function () {
      return self._callEvent('beforePublish', state)
    }).then(function (runPublish) {
      self._muted = false
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
        self._muted = true
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

Subscription.prototype.remember = function remember () {
  var self = this

  var data = self.getData()

  return self._publish(data)
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
  var dependency = this._alo.createDependency.apply(this._alo, arguments)
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

export default Subscription
