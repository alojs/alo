var isObject = require('lodash/isObject')

var reducers = {}

/**
 * A basic reducer which just dispatches untyped actions
 *
 * @memberof extras
 */
reducers.basic = function (state, action) {
  /*
  if (action.payload != null && isObject(action.payload)) {
    return action.payload
  }
  */
}

module.exports = reducers
