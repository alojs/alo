// @flow

import Util from './util.js'
var util = new Util()

/**
 * Creates a typecheck function which throws an error if the typechecker returns false
 */
export var createTypecheck = function createTypecheck (isType: (value:any) => boolean, type:string): (value:any) => boolean|void {
  return function (value:any):(boolean|void) {
    if (!isType(value)) {
      throw new Error(`Type of argument should be a ${type}`)
    } else {
      return true
    }
  }
}

/**
 * Throws an error of type is not a string
 */
export var isString = function isString (value:any):boolean|void {
  return createTypecheck(util.isString, 'string')(value)
}

export var isArray = function isArray (value:any):boolean|void {
  return createTypecheck(util.isArray, 'array')(value)
}
