/* global describe, it */

var alo = require('./../../src/main/alo.js')
var assert = require('assert')

describe('Handler', function () {
  describe('constructor', function () {
    it('should take an array of reducer functions', function () {
      var handler = alo.createHandler([
        function () {},
        function () {},
        function () {}
      ])
      assert.equal(3, handler._getReducers().length)
    })
    it('should take multible reducer functions', function () {
      var handler = alo.createHandler(
        function () {},
        function () {},
        function () {}
      )
      assert.equal(3, handler._getReducers().length)
    })
  })
  describe('addReducer', function () {
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
      }).then(function () {
        assert.equal(true, reducerDone)
      })
    })
  })
})
