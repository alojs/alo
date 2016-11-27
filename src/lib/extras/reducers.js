var u = require('./../util/util.js')

var reducers = {}

/**
 * A basic reducer which just replaces state with payload of untyped actions
 *
 * @memberof extras
 */
reducers.createUntypedReplace = function () {
  return function (state, action) {
    if (action.type === undefined || action.type === null || action.type === '') {
      if (action.payload != null && u.isObject(action.payload)) {
        return action.payload
      }
    }
    return state
  }
}

module.exports = reducers
