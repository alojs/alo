var util = require('./../lib/util/util.js')

/**
 * alo Modul
 * @module alo
 */
var alo = util.createAlo()

/**
 * Access to the util namespace
 *
 * @see util
 */
alo.util = util

module.exports = alo
