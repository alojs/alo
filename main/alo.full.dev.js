import Alo from './../lib/alo.js'
import addExtras from './extend/addExtras'
import addDev from './extend/addDev.js'

var AloDev = addDev(Alo)
var AloFullDev = addExtras(AloDev)
export default AloFullDev
