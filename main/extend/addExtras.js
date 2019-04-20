import extras from './../../lib/extras/extras.js'

var addExtras = function addExtras (AloOrig) {
  class Alo extends AloOrig {
    constructor(id) {
      super(id)
      /**
      * Useful functions
      *
      * @memberof Alo
      *
      * @see extras
      */
      this.extras = extras
    }
  }
  return Alo
}

export default addExtras
