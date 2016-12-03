/* global describe, it */

var alo = require('./../../main/alo.js')
var assert = require('assert')

describe('Reducer', function () {
  describe('constructor', function () {
    it('should take an array of reducers', function () {
      var reducers = [
        alo.createReducer(),
        alo.createReducer(),
        alo.createReducer()
      ]
      var reducer = alo.createReducer(reducers)
      assert.equal(3, reducer.getReducer(false).length)
    })
  })
  describe('addReducer', function () {
    it('should run the reducer', function () {
      var reducerDone = false
      var store = alo.createStore({
        value: false
      })
      store.addReducer(alo.createReducer(function () {
        reducerDone = true
      }))
      store.dispatch(function (state) {
        state.value = true
        return state
      }).then(function () {
        assert.equal(true, reducerDone)
      })
    })
  })
})
