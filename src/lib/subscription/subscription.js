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

  this._events = {
    'beforePublish': [],
    'afterPublish': []
  }

  this._subscriptionStream = null
  this._stream = null

  // While binding the publish function to the streams of the registered stores
  this._binding_publish = false
  this._muted = false

  storeRelation.constructParent(this)
  memberRelation.constructParent(this)

  this.addFunction.apply(this, arguments)
}

// TODO: Implement additional signatures
/*var subscription = u.createPolymorphic()
subscription.signature('function', function (func) {
  this.addFunction(func)
})*/

Subscription.prototype.addMember = null
Subscription.prototype.getMember = null

storeRelation.after('add', function () {
  var self = this

  // TODO: Utility isStream
  if (u.isStream(this._stream)) {
    this._stream.end(true)
    this._stream = null
  }
  if (u.isStream(this._subscriptionStream)) {
    this._subscriptionStream.end(true)
    this._subscriptionStream = null
  }

  this._binding_publish = true
  var streams = []
  var stores = u.values(this.getStore())
  u.forEach(stores, function (store) {
    streams.push(store.getStream())
  })
  this._stream = u.combineStreams(function () {
    var streamState = {}
    u.forEach(u.values(arguments), function (stream, idx) {
      if (u.isStore(stores[idx])) {
        streamState[stores[idx].getId()] = stream()
      }
    })
    return streamState
  }, streams)
  this._subscriptionStream = u.streamOn(function (state) {
    self._publish(state)
  }, this._stream)
  this._binding_publish = false
})

storeRelation.registerParentPrototype(Subscription.prototype)
memberRelation.registerParentPrototype(Subscription.prototype)

Subscription.prototype.addFunction = u.createPolymorphic()
var addFunction = Subscription.prototype.addFunction
addFunction.signature('function', function (func) {
  return this.addFunction({}, func)
})
addFunction.signature('object, function', function (dependency, func) {
  var Member = require('./member.js')
  var member = new Member(dependency, func)
  this.addMember(member)

  return member
})
addFunction.signature('array', function (functions) {
  var self = this

  u.forEach(functions, function (func) {
    if (u.isArray(func)) {
      self.addFunction.apply(this, func)
    } else {
      self.addFunction(func)
    }
  })

  return this
})

Subscription.prototype._callEvent = function (name, state, resolve, reject) {
  var promises = this._events[name].map(function (func) {
    return u.createPromise(function (resolve2, reject2) {
      func(state, resolve2, reject2)
    })
  })
  return u.Promise.all(promises).then(function (results) {
    var result = (results.indexOf(false) === -1)
    return resolve(result)
  })
}

Subscription.prototype._publish = function (state) {
  var self = this
  if (self._muted === false && this._binding_publish === false) {
    self._muted = true
    var promise = u.createPromise(function (resolve, reject) {
      return self._callEvent('beforePublish', state, resolve, reject)
    }).then(function (runPublish) {
      return u.createPromise(function (resolve, reject) {
        if (runPublish !== false) {
          var state = self.getState()
          u.forEach(self.getMember(), function (member) {
            member._call(state)
          })
          return self._callEvent('afterPublish', state, resolve, reject)
        } else {
          return resolve()
        }
      })
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

  u.forEach(this.getStore(), function (store) {
    self._publish(store, store.getState())
  })

  return this
}

Subscription.prototype.stop = function stop () {
  this.disable()
  this.removeStore()

  return this
}

Subscription.prototype.getStream = function getStream () {
  return this._stream
}

Subscription.prototype.getState = function getState () {
  return u.cloneDeep(this.getStream()())
}

Subscription.prototype.setDependency = function setDependency (dependency) {
  u.forEach(this.getMember(), function (member) {
    member.setDependency(dependency)
  })

  return this
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
