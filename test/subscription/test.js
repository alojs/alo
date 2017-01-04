var Alo = require('./../../dist/alo.full.dev.js')
var alo = new Alo()
var u = alo.util

var assert = require('assert')
import test from 'ava'

test('remember should call the subscription with the last data', function () {
  var store = alo.createStore('old', 'store')
  store.addReducer(alo.extras.reducers.createUntypedReplace())
  return u.createPromise(function (resolve) {
    store.dispatch({ payload: 'new' }).then(function () {
      store.subscribe(function (stores) {
        resolve(stores.store.state)
      }).remember()
    })
  }).then(function (result) {
    assert.equal('new', result)
  })
})

var store = alo.createStore({test: 'wrong string'}, 'store')

store.createReducer(function (state, action) {
  if (action.type === 'test') {
    state.test = 'correct string'
  }
  return state
})

var promise = u.createPromise(function (resolve) {
  store.createSubscription(function (stores) {
    if (stores.store.action && stores.store.action.type === 'test') {
      resolve(stores.store.state.test)
    }
  })
})

test('should be the correct string', function () {
  return promise.then(function (result) {
    assert.equal('correct string', result)
  })
})

store.dispatch({ type: 'test' })
