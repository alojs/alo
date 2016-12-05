var Cache = function () {
  this._cache = {}
}
Cache.prototype.register = function (name, proto) {
  var self = this

  this._cache[name] = {}
  proto._setCache = function (data) {
    return self.set(name, data)
  }
  proto._deleteCache = function () {
    return self.unset(name)
  }
  proto._getCache = function () {
    return self.get(name)
  }
}
Cache.prototype.get = function (name) {
  return this._cache[name]
}
Cache.prototype.set = function (name, data) {
  this._cache[name] = data
}
Cache.prototype.unset = function (name) {
  delete this._cache[name]
}

module.exports = Cache
