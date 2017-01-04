var Alo = require('./../../dist/alo.full.dev.js')
var alo = new Alo()
var assert = require('assert')
import test from 'ava'

test('middlewares thunk should resolve the first dispatch argument if it is a function', function () {
  var store = alo.createStore('oldTest')
  store.addReducer(alo.extras.reducers.createUntypedReplace())
  store.addMiddleware(alo.extras.middlewares.createThunk())
  return store.dispatch(function () {
    return function (store2, arg1, arg2) {
      var dispatch = { payload: arg1 + arg2 }
      return dispatch
    }
  }, 'test1', 'test2').catch(alo.catchLongStack).then(function () {
    assert.equal('test1test2', store.getState())
  })
})