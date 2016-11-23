/* global describe, it */

var alo = require('./../../src/main/alo.js')
var assert = require('assert')

describe('Handler functions', function () {
  describe('addReducers', function () {
    it('should run the reducer', function () {
      var reducerDone = false
      var store = new alo.Store({
        value: false
      })
      store.addReducer(function () {
        reducerDone = true
      })
      store.dispatch(function (state) {
        state.value = true
        return state
      })
      assert.equal(true, reducerDone)
    })
  })
})
