var Alo = require('./../../dist/alo.js')
var alo = new Alo()
var assert = require('assert')
import test from 'ava'

test('constructor should take an array of reducers', function () {
  var reducers = [
    alo.createReducer(),
    alo.createReducer(),
    alo.createReducer()
  ]
  var reducer = alo.createReducer(reducers)
  assert.equal(3, reducer.getReducer(false).length)
})

test('addReducer should run the reducer', function () {
  var reducerDone = false
  var store = alo.createStore({
    value: false
  })
  store.addReducer(alo.createReducer(function (state) {
    reducerDone = true
    return state
  }))
  return store.dispatch({ payload: 'test' }).then(function () {
    assert.equal(true, reducerDone)
  })
})
