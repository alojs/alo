var Util = require('./../util/util.js')
var u = new Util()

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
  relatedTo: {
    relation: true
  },
  indexOf: {
    relation: true
  },
  setIndexOf: {
    relation: true
  },
  getId: {}
}

var formatFunctionName = function (action, name) {
  name = name.split('')
  name[0] = name[0].toUpperCase()
  name = name.join('')
  return action + name
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
    this.relationByIdPropertyName = '_' + relationName + 'RelationsById'
    this.relationPropertyName = '_' + relationName + 'Relations'
    this.isRelationObject = isRelationObject

    this.functions = {}
    u.forEach(functions, function (func, funcName) {
      self.functions[funcName] = {
        before: [],
        after: []
      }
      if (func.relation === true) {
        self.functions[funcName].parentName = formatFunctionName(funcName, parentName)
        self.functions[funcName].relationName = formatFunctionName(funcName, relationName)
      }
    })
  }
})

/**
 * Should be called in the constructor of the parent
 */
ObjectRelation.prototype.constructParent = function (parentObject) {
  if (parentObject[this.idPropertyName] === null || parentObject[this.idPropertyName] === undefined) {
    var id = u.uniqueId()
    parentObject[this.idPropertyName] = id
  }
  parentObject[this.relationByIdPropertyName] = {}
  parentObject[this.relationPropertyName] = []
}

ObjectRelation.prototype.registerParentPrototype = function (prototype) {
  var self = this
  var createCaller = function (funcName, func) {
    return function () {
      var parent = this
      var args = u.values(arguments)
      args.unshift(self)
      u.forEach(self.functions[funcName].before, function (beforeFunc) {
        beforeFunc.call(parent)
      })
      var result = func.apply(parent, args)
      u.forEach(self.functions[funcName].after, function (afterFunc) {
        afterFunc.call(parent)
      })
      return result
    }
  }

  u.forEach(self.functions, function (func, funcName) {
    var prototypeFunctionName = funcName
    if (u.isString(func.relationName) && func.relationName !== '') {
      prototypeFunctionName = func.relationName
    }
    prototype[prototypeFunctionName] = createCaller(funcName, self[funcName + 'Function'])
  })
}

ObjectRelation.prototype.getIdFunction = function getId (config) {
  return this[config.idPropertyName]
}

ObjectRelation.prototype.getFunction = u.createPolymorphic()
var get = ObjectRelation.prototype.getFunction
get.signature('object, boolean b=true', function (config, byId) {
  var self = this

  if (byId) {
    return this[config.relationByIdPropertyName]
  } else {
    var result = []
    u.forEach(this[config.relationPropertyName], function (item) {
      result.push(get.call(self, config, item))
    })
    return result
  }
})
get.signature('object, string', function (config, id) {
  if (id === '') {
    throw new Error('Argument given should not be an empty string')
  } else {
    if (this[config.relationByIdPropertyName][id] !== null) {
      return this[config.relationByIdPropertyName][id]
    } else {
      return false
    }
  }
})

ObjectRelation.prototype.addFunction = u.createPolymorphic()
var add = ObjectRelation.prototype.addFunction
add.signature('object, object, integer a=-1, boolean b=false', function (config, relationObject, index, fromRelation) {
  if (!config.isRelationObject(relationObject)) {
    throw new Error('Argument given is not a ' + config.relationName)
  } else {
    var id = relationObject.getId()
    if (!u.isString(id) || id === '') {
      throw new Error('Id is not a string or empty')
    } else {
      if (fromRelation !== true) {
        relationObject[config.functions.add.parentName](this, -1, true)
      }
      this[config.relationByIdPropertyName][id] = relationObject
      if (index >= 0) {
        this[config.relationPropertyName].splice(index, 0, id)
      } else {
        this[config.relationPropertyName].push(id)
      }
    }
  }

  return this
})
add.signature('object, array', function (config, relationObjects) {
  var self = this

  u.forEach(relationObjects, function (relationObject) {
    add.call(self, config, relationObject, -1)
  })

  return this
})
add.signature('object, object, object, ...', function (config, relationObject1, relationObject2, rest) {
  var relationObjects = [relationObject1, relationObject2]

  return add.call(this, config, relationObjects.concat(rest), -1)
})

ObjectRelation.prototype.removeFunction = u.createPolymorphic()
var remove = ObjectRelation.prototype.removeFunction
remove.signature('object, string, boolean b=false', function (config, id, fromRelation) {
  if (id === '') {
    throw new Error('Argument given should not be empty')
  } else {
    if (!u.isBoolean(fromRelation) || fromRelation !== true) {
      if (config.isRelationObject(this[config.relationPropertyName][id])) {
        this[config.relationByIdPropertyName][id][config.functions.remove.parentName](this.getId(), true)
      }
    }
    delete this[config.relationByIdPropertyName][id]
    var position = this[config.relationPropertyName].indexOf(id)
    if (position > -1) {
      this[config.relationPropertyName].splice(position, 1)
    }
  }

  return this
})
remove.signature('object, object, boolean b=false', function (config, relationObject, fromRelation) {
  if (!config.isRelationObject(relationObject)) {
    throw new Error('Argument given is not a ' + config.relationName)
  } else {
    var id = relationObject.getId()
    return remove.call(this, config, id, fromRelation)
  }
})
remove.signature('object', function (config) {
  var self = this

  u.forEach(this[config.relationPropertyName], function (id) {
    remove.call(self, config, id)
  })

  return this
})

ObjectRelation.prototype.relatedToFunction = function (config, relationObj) {
  return indexOf.apply(this, arguments) > -1
}

ObjectRelation.prototype.indexOfFunction = function (config, relationObj) {
  var id = null

  if (u.isString(relationObj) || u.isInteger(relationObj)) {
    id = relationObj
  } else if (!config.isRelationObject(relationObj)) {
    throw new Error('Argument given should be an id or a ' + config.relationName)
  } else {
    id = relationObj.getId()
  }

  return this[config.relationPropertyName].indexOf(id)
}
var indexOf = ObjectRelation.prototype.indexOfFunction

ObjectRelation.prototype.setIndexOfFunction = function (config, relationObj, index) {
  if (!u.isInteger(index)) {
    throw new Error('Argument for index should be an integer')
  } else {
    var id = null

    if (u.isString(relationObj) || u.isInteger(relationObj)) {
      id = relationObj
    } else if (!config.isRelationObject(relationObj)) {
      throw new Error('Argument given should be an id or a ' + config.relationName)
    } else {
      id = relationObj.getId()
    }

    var oldIndex = this[config.relationPropertyName].indexOf(id)
    if (oldIndex !== -1 && oldIndex !== index) {
      delete this[config.relationPropertyName][oldIndex]
      this[config.relationPropertyName].splice(index, 0, id)
    }

    return index
  }
}

ObjectRelation.prototype.before = u.createPolymorphic()
var before = ObjectRelation.prototype.before
before.signature('string, function', function (functionName, func) {
  this.functions[functionName].before.push(func)
})

ObjectRelation.prototype.after = u.createPolymorphic()
var after = ObjectRelation.prototype.after
after.signature('string, function', function (functionName, func) {
  this.functions[functionName].after.push(func)
})

module.exports = ObjectRelation
