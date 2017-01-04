import Util from './util.js'
import ObjectRelation from './object-relation.js'

var u = new Util()

var functions = {
  getCustomizer: {},
  setCustomizer: {},
  unsetCustomizer: {},
  callCustomizer: {}
}

var customizerTypes = ['prepare', 'finalize']

var Customizer = function (async) {
  var self = this

  this.async = (async === true)

  this.functions = {}
  u.forEach(functions, function (func, funcName) {
    self.functions[funcName] = {
      after: []
    }
  })
}

Customizer.prototype.constructParent = function (parent) {
  parent._customizers = {}
  u.forEach(customizerTypes, function (type) {
    parent._customizers[type] = false
  })
}

Customizer.prototype.registerParentPrototype = function (proto) {
  return ObjectRelation.prototype.registerParentPrototype.call(this, proto)
}

/**
 *
 */
Customizer.prototype.setCustomizerFunction = u.createPolymorphic()
var set = Customizer.prototype.setCustomizerFunction
set.signature('object, function, string b=finalize', function (config, func, type) {
  if (customizerTypes.indexOf(type) === -1) {
    throw new Error('Argument for type is invalid')
  } else {
    this._customizers[type] = func
  }

  return this
})

Customizer.prototype.unsetCustomizerFunction = function (config, type) {
  var self = this

  if (type !== undefined && customizerTypes.indexOf(type) === -1) {
    throw new Error('Argument for type should be prepare or finalize')
  } else {
    if (type === undefined) {
      u.forEach(this._customizers, function (func, type) {
        self.unsetCustomizer(type)
      })
    } else {
      this._customizers[type] = false
    }
  }

  return this
}

Customizer.prototype.getCustomizerFunction = u.createPolymorphic()
var get = Customizer.prototype.getCustomizerFunction
get.signature('object, string a=finalize', function (config, type) {
  if (customizerTypes.indexOf(type) === -1) {
    throw new Error('Argument for type is invalid')
  } else {
    return this._customizers[type]
  }
})

Customizer.prototype.callCustomizerFunction = function (config, type) {
  if (!u.isString(type)) {
    throw new Error('Argument for type should be a string')
  } else {
    var func = this.getCustomizer(type)
    if (!u.isFunction(func)) {
      return undefined
    } else {
      var args = u.values(arguments)
      /*
       * The config argument is prepended to the function by the customizer - not by the user
       * This error is done for the enduser which doenst know about config
       */
      if (args.length <= 2) {
        throw new Error('Atleast two arguments are required')
      }
      args = args.slice(2)
      if (config.async === true) {
        return u.Promise.resolve().then(function () {
          return func.apply(null, args)
        })
      } else {
        return func.apply(null, args)
      }
    }
  }
}

export default Customizer
