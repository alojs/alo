var Alo = require('./../lib/alo.js')
var addExtras = require('./extend/addExtras')
var addDev = require('./extend/addDev.js')

module.exports = addDev(addExtras(Alo))
