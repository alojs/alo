var Alo = require('./../alo.js')
var alo = new Alo()
var u = alo.util

var dependencyRelation = u.createObjectRelation('dependency', 'parentDependency', alo.isDependency)
var parentDependencyRelation = u.createObjectRelation('parentDependency', 'dependency', alo.isDependency)
var storeRelation = u.createObjectRelation('dependency', 'store', alo.isStore)
var subscriptionRelation = u.createObjectRelation('dependency', 'subscription', alo.isSubscription)
var memberRelation = u.createObjectRelation('dependency', 'member', alo.isMember)

var Dependency = function Dependency () {
  this._beforeDependencies = {}
  this._afterDependencies = {}

  // TODO: Implement Cache Class
  this._cache = {}

  dependencyRelation.constructParent(this)
  parentDependencyRelation.constructParent(this)
  storeRelation.constructParent(this)
  subscriptionRelation.constructParent(this)
  memberRelation.constructParent(this)

  this.add.apply(this, arguments)
}

dependencyRelation.registerParentPrototype(Dependency.prototype)
parentDependencyRelation.registerParentPrototype(Dependency.prototype)
storeRelation.registerParentPrototype(Dependency.prototype)
subscriptionRelation.registerParentPrototype(Dependency.prototype)
memberRelation.registerParentPrototype(Dependency.prototype)

Dependency.prototype.get = u.createPolymorphic()
var get = Dependency.prototype.get
get.signature('string a=after', function (type) {
  switch (type) {
    case 'before':
      return this._beforeDependencies
    case 'after':
      return this._afterDependencies
    default:
      throw new Error('Argument for type should be before or after')
  }
})

Dependency.prototype.add = u.createPolymorphic()
var add = Dependency.prototype.add
add.signature('', function () {})
add.signature('object, string b=after', function (dependencies, type) {
  var self = this
  if (['before', 'after'].indexOf(type) === -1) {
    throw new Error('Argument type should be before or after')
  } else {
    u.forEach(dependencies, function (dependency, name) {
      if (u.isArray(dependency)) {
        self.add(name, dependency[0], dependency[1], type)
      } else {
        self.add(name, dependency, type)
      }
    })
  }

  return this
})
add.signature('string, array, function, string a=after', function (name, dependencies, func, type) {
  u.forEach(dependencies, function (dependency) {
    if (!u.isString(dependency) || dependency === '') {
      throw new Error('Dependency should be a string and not empty')
    }
  })
  switch (type) {
    case 'before':
      this._beforeDependencies[name] = [dependencies, func]
      break
    case 'after':
      this._afterDependencies[name] = [dependencies, func]
      break
    default:
      throw new Error('Type should be before or after')
  }

  return this
})
add.signature('string, function, string a=after', function (name, func, type) {
  return add.call(this, name, [], func, type)
})

Dependency.prototype.remove = function remove (name, type) {
  if (type !== undefined && ['before', 'after'].indexOf(type) === -1) {
    throw new Error('Argument for type should be before or after')
  } else {
    if (type === undefined || type === 'before') {
      this._beforeDependencies = false
    }
    if (type === undefined || type === 'after') {
      this._afterDependencies = false
    }
  }

  return this
}

Dependency.prototype.reduce = function reduce (state) {
  var self = this

  var walkDependencies = function (dependencies, called) {
    var pairs = u.toPairs(dependencies)
    if (called === undefined) {
      called = []
    }
    var idx = 0
    var walker = function () {
      if (pairs[idx] !== undefined) {
        return u.Promise.resolve().then(function () {
          return walkDependency(called, pairs[idx], dependencies)
        }).then(function (newCalled) {
          called = newCalled
          idx++
          return walker()
        })
      } else {
        return called
      }
    }
    return walker()
  }

  var walkDependency = function (called, properties, dependencies) {
    var name = properties[0]
    var deps = properties[1][0]
    var func = properties[1][1]
    if (called.indexOf(name) === -1) {
      return u.Promise.resolve().then(function () {
        if (deps.length > 0) {
          var filteredDeps = u.filter(deps, function (name) {
            return (state.computed[name] === undefined)
          })
          var preparedDeps = {}
          u.forEach(filteredDeps, function (name) {
            preparedDeps[name] = dependencies[name]
          })
          return walkDependencies(preparedDeps, called)
        } else {
          return called
        }
      }).then(function (called) {
        var recalculate = true
        if (deps.length > 0) {
          recalculate = false
          u.forEach(deps, function (name) {
            if (!u.isEqual(state.computed[name], self._cache[name])) {
              recalculate = true
              return false
            }
          })
        }
        if (recalculate) {
          if (u.isFunction(func)) {
            return func(state.state, state.computed, state.action)
          } else {
            return null
          }
        } else {
          return self._cache[name]
        }
      }).then(function (result) {
        if (result === undefined) {
          result = null
        }
        state.computed[name] = result
        called.push(name)
        return called
      })
    } else {
      return called
    }
  }

  var nextDependencies = {
    before: this.get('before'),
    after: this.get('after')
  }

  return u.Promise.resolve().then(function () {
    return walkDependencies(nextDependencies.before, [])
  }).then(function (called) {
    var idx = 0
    var relationDependencies = self.getDependency(false)
    var walker = function () {
      if (relationDependencies[idx] !== undefined) {
        if (alo.isDependency(relationDependencies[idx])) {
          return u.Promise.resolve().then(function () {
            return relationDependencies[idx].reduce(state)
          }).then(function (computed, called) {
            state.computed = computed
            idx++
            return walker()
          })
        } else {
          idx++
          return walker()
        }
      } else {
        return true
      }
    }
    return walker()
  }).then(function () {
    return walkDependencies(nextDependencies.after, [])
  }).then(function () {
    self._cache = state.computed
    return state.computed
  })
}

module.exports = Dependency
