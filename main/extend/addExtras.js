var addExtras = function addExtras (Alo) {
  var extras = require('./../../lib/extras/extras.js')

  /**
  * Useful functions
  *
  * @memberof Alo
  *
  * @see extras
  */
  Alo.prototype.extras = extras
  return Alo
}

module.exports = addExtras
