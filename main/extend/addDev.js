var addDev = function addDev (AloOrig) {
  var catchLongStack = function (reason) {
    console.error(reason.longStack)
  }

  class Alo extends AloOrig {
    constructor(id) {
      super(id)
      this.util.Promise.enableLongStackTrace()
      this.util.Promise.unhandledRejection = catchLongStack
      this.util.createAlo = function createAlo () {
        var alo = Object.create(Alo.prototype)
        Alo.apply(alo, arguments)
        return alo
      }
      this.dev = true
    }
  }
  Alo.prototype.catchLongStack = catchLongStack
  return Alo
}

module.exports = addDev
