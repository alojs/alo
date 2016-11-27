var u = require('./../util/util.js')

var functions = {
  get: {
    relation: true
  },
  add: {
    relation: true
  },
  remove: {
    relation: true
  },
  getId: {}
}

var formatFunctionName = function (action, name) {
  return action + u.startCase(name)
}

var ObjectRelation = function ObjectRelation () {
  objectRelation.apply(this, arguments)
}
var objectRelation = u.createPolymorphic()
objectRelation.signature('string, string, function', function (parentName, relationName, isRelationObject) {
  var self = this
  if (parentName === '' || relationName === '') {
    throw new Error('Argument given should not be empty')
  } else {
    this.idPropertyName = '_id'
    this.parentName = parentName
    this.relationName = relationName
    this.relationPropertyName = '_' + relationName + 's'
    this.isRelationObject = isRelationObject

    this.functions = {}
    u.forEach(functions, function (func, funcName) {
      self.functions[funcName] = {
        after: []
      }
      if (func.relation === true) {
        self.functions[funcName].parent = formatFunctionName(funcName, parentName)
        self.functions[funcName].relation = formatFunctionName(funcName, relationName)
      }
    })
  }
})

/**
 * Should be called in the constructor of the parent
 */
ObjectRelation.prototype.constructParent = function (parent) {
  if (parent[this.idPropertyName] === null) {
    var id = u.uniqueId()
    parent[this.idPropertyName] = id
  }
  parent[this.relationPropertyName] = {}
}

ObjectRelation.prototype.registerParentPrototype = function (prototype) {
  var self = this
  var createCaller = function (funcName, func) {
    return function () {
      var parent = this
      var args = u.values(arguments)
      args.unshift(self)
      var result = func.apply(parent, args)
      u.forEach(self.functions[funcName].after, function (afterFunc) {
        afterFunc.call(parent)
      })
      return result
    }
  }

  u.forEach(self.functions, function (func, funcName) {
    var prototypeFunctionName = funcName
    if (u.isString(func.relation) && func.relation !== '') {
      prototypeFunctionName = func.relation
    }
    prototype[prototypeFunctionName] = createCaller(funcName, self[funcName + 'Function'])
  })
}

ObjectRelation.prototype.getIdFunction = function getId (config) {
  return this[config.idPropertyName]
}

ObjectRelation.prototype.getFunction = function get (config, id) {
  if (u.isString(id)) {
    if (id === '') {
      throw new Error('Argument given should not be an empty string')
    } else {
      if (this[config.relationPropertyName][id] !== null) {
        return this[config.relationPropertyName][id]
      } else {
        return false
      }
    }
  }
  return this[config.relationPropertyName]
}

ObjectRelation.prototype.addFunction = u.createPolymorphic()
var add = ObjectRelation.prototype.addFunction
add.signature('object, object, boolean b=false', function (config, relationObject, fromRelation) {
  if (!config.isRelationObject(relationObject)) {
    throw new Error('Argument given is not a ' + config.relationName)
  } else {
    var id = relationObject.getId()
    if (!u.isString(id) || id === '') {
      throw new Error('Id is not a string or empty')
    } else {
      if (fromRelation !== true) {
        relationObject[config.functions.add.parent](this, true)
      }
      this[config.relationPropertyName][id] = relationObject
    }
  }

  return this
})
add.signature('object, array', function (config, relationObjects) {
  var self = this

  u.forEach(relationObjects, function (relationObject) {
    add.call(self, config, relationObject)
  })

  return this
})
add.signature('object, object, object, ...', function (config, relationObject1, relationObject2, rest) {
  var relationObjects = [relationObject1, relationObject2]

  return add.call(this, config, relationObjects.concat(rest))
})

ObjectRelation.prototype.removeFunction = u.createPolymorphic()
var remove = ObjectRelation.prototype.removeFunction
remove.signature('object, string, boolean b=false', function (config, id, fromRelation) {
  if (id === '') {
    throw new Error('Argument given should not be empty')
  } else {
    if (!u.isBoolean(fromRelation) || fromRelation !== true) {
      if (config.isRelation(this[config.relationPropertyName][id])) {
        this[config.relationPropertyName][id][config.functions.remove.parent](this.getId(), true)
      }
    }
    delete this[config.relationPropertyName][id]
  }

  return this
})
remove.signature('object, object, boolean b=false', function (config, relationObject, fromRelation) {
  if (!config.isRelation(relationObject)) {
    throw new Error('Argument given is not a ' + config.relationName)
  } else {
    var id = relationObject.getId()
    return remove.call(this, config, id, fromRelation)
  }
})
remove.signature('object', function (config) {
  var self = this

  u.forEach(this[config.relationPropertyName], function (relationObject, id) {
    remove.call(self, config, id)
  })

  return this
})

ObjectRelation.prototype.after = u.createPolymorphic()
var after = ObjectRelation.prototype.after
after.signature('string, function', function (functionName, func) {
  this.functions[functionName].after.push(func)
})

module.exports = ObjectRelation
