import Alo from './../alo.js'
var alo = new Alo()

var reducers = {}

/**
 * A basic reducer which just replaces state with payload of untyped actions
 *
 * @memberof extras.reducers
 */
reducers.createUntypedReplace = function () {
  var reduce = function (state, action) {
    if (action.type === undefined || action.type === null || action.type === '') {
      if (action.payload !== undefined) {
        return action.payload
      }
    }
    return state
  }

  return alo.createReducer(reduce)
}

export default reducers
