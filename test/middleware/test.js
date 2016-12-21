/* global describe, it */

var Alo = require('./../../main/alo.dev.js')
var alo = new Alo()

var u = alo.util
var assert = require('assert')

describe('Middleware', function () {
  // Returns the value after some time (testing promises)
  var timeout = function (arg) {
    return u.createPromise(function (resolve) {
      setTimeout(function () {
        resolve(arg)
      }, 50)
    })
  }

  var store = alo.createStore()
  var result = false

  store.createReducer(function (state, action) {
    result = action.payload
  })

  var middleware = alo.createMiddleware()
  var prepareCustomizerCalled = false
  var finalizeCustomizerCalled = false
  middleware.setCustomizer(function (store, arg1, arg2, arg3) {
    prepareCustomizerCalled = true
    return [2 * arg1, timeout(2 * arg2), 2 * arg3]
  }, 'prepare')
  middleware.setCustomizer(function (store, arg1, arg2, arg3) {
    finalizeCustomizerCalled = true
    return timeout({ type: arg3, payload: [arg1, arg2, arg3] })
  })

  var middleware2 = alo.createMiddleware()
  var middleware2called = false
  middleware2.setCustomizer(function (store, arg1, arg2, arg3) {
    middleware2called = true
    return [arg1 * arg1, arg2 * arg2, timeout(arg3 * arg3)]
  }, 'prepare')

  // A middleware which just does nothing (so the argument chain should not be manipulated)
  middleware2.setCustomizer(function () {})

  var middleware3 = alo.createMiddleware()
  var middleware3called = false
  var middleware3store = false
  middleware3.setCustomizer(function (store, arg1, arg2, arg3) {
    middleware3called = true
    middleware3store = alo.isStore(store)
    return [timeout(arg1), arg1 + arg2, arg1 + arg2 + arg3]
  }, 'finalize')
  middleware3.createMiddleware(function (store, arg1, arg2, arg3) {
    return [timeout(arg1), timeout(arg2), timeout(arg3)]
  })

  middleware.addMiddleware(middleware2)
  middleware.addMiddleware(middleware3)
  middleware.addStore(store)

  describe('meddle', function () {
    var dispatchResult = store.dispatch(2, 3, 4).catch(alo.catchLongStack)
    it('should call the customizers', function () {
      dispatchResult.then(function () {
        assert.equal(true, prepareCustomizerCalled)
        assert.equal(true, finalizeCustomizerCalled)
      })
    })

    it('should provide the store to the customizers', function () {
      dispatchResult.then(function () {
        assert.equal(true, middleware3store)
      })
    })

    it('should call the related middlewares', function () {
      dispatchResult.then(function () {
        assert.equal(true, middleware2called)
        assert.equal(true, middleware3called)
      })
    })

    it('should meddle by taking the dispatch arguments and throwing them through the chained middlewares', function () {
      dispatchResult.then(function () {
        assert.deepEqual([16, 52, 116], result)
      })
    })
  })
})
