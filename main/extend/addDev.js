var addDev = function addDev (AloOld) {
  var catchLongStack = function (reason) {
    console.error(reason.longStack)
  }

  var AloDev = function Alo () {
    AloOld.apply(this, arguments)
//    this.util.Promise.enableLongStackTrace()
    this.util.Promise.unhandledRejection = catchLongStack
    this.util.createAlo = function createAlo () {
      var alo = Object.create(AloDev.prototype)
      AloDev.apply(alo, arguments)
      return alo
    }
    this.dev = true
  }
  AloDev.prototype = AloOld.prototype
  AloDev.prototype.catchLongStack = catchLongStack
  return AloDev
}

module.exports = addDev
