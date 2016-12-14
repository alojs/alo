/* global describe, it */

var Alo = require('./../../main/alo.full.dev.js')
var alo = new Alo()
var u = alo.util

var assert = require('assert')

describe('Subscription', function () {
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

  it('should be the correct string', function () {
    return promise.then(function (result) {
      assert.equal('correct string', result)
    })
  })

  store.dispatch({ type: 'test' })
})
