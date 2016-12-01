/* global describe, it */

var alo = require('./../../main/alo.full.js')
var u = alo.util
var assert = require('assert')

// u.Promise.longStackTraces()

describe('Store', function () {
  describe('Constructor', function () {
    it('should instantiate a store with an empty state when no state is provided', function () {
      var newStore = alo.createStore()
      assert.deepEqual({}, newStore.getState())
    })
    it('should instantiate a store with a state when a state is provided', function () {
      var newStore = alo.createStore({hello: 'world'})
      assert.equal('world', newStore.getState().hello)
    })
  })

  describe('dispatch', function () {
    describe('with promise', function () {
      it('should use the returned value in the reducer', function () {
        var store = alo.createStore()
        var promise = u.createPromise(function (res, rej) {
          store.addReducer(function (state, action) {
            res(action)
          })
        }).then(function (action) {
          assert.equal('test', action.type)
        })
        store.dispatch(u.Promise.resolve({ type: 'test' }))
        return promise
      })
    })
    describe('with object', function () {
      it('should call the subscriptions', function () {
        var store = alo.createStore()
        var status = 0

        store.createSubscription(function (state) {
          status += 1
        })

        return store.dispatch({}).then(function () {
          return setTimeout(function () {
            assert.equal(1, status)
          }, 100)
        })
      })
    })
    describe('with function', function () {
      it('should change state with returned state', function () {
        var store = alo.createStore()
        store.addReducer(alo.extras.reducers.createUntypedReplace())
        store.dispatch(function (state) {
          state.hello = 'world'
          return state
        }).then(function () {
          assert.equal('world', store.getState().hello)
        })
      })
      it('should not change state, when no state is returned', function () {
        var store = alo.createStore()
        store.addReducer(alo.extras.reducers.createUntypedReplace())

        store.dispatch(function (state) {
          state.hello = 'world'
        }).then(function () {
          assert.notEqual('world', store.getState().hello)
        })
      })
      it('should not change state, when incorrect state was returned', function () {
        var newStore = alo.createStore()
        // TODO: Hier weitermachen
        newStore.dispatch(function (state) {
          state = 'world'
          return state
        })
        assert.notEqual('world', newStore.getState())
      })
      it('should call the subscriptions, when it not returns undefined', function () {
        var called = 0
        var store = alo.createStore({}, 'myStore')
        store.addReducer(alo.extras.reducers.createUntypedReplace())
        var sub = store.createSubscription(function (state) {
          called++
        })
        sub.on('beforePublish', function (state) {
          called++
          return true
        })
        var prom = u.createPromise(function (resolve, reject) {
          sub.on('afterPublish', function (state) {
            called++
            return resolve()
          })
        }).then(function () {
          assert.equal(3, called)
        })
        store.dispatch(function () {
          return 'hello'
        })
        return prom
      })
      it('should not call subscription when it returns undefined', function () {
        var store = alo.createStore()
        var status = false
        store.createSubscription(function () {
          status = true
        })
        store.dispatch(function (state) {})
        assert.equal(false, status)
      })
    })
  })

  describe('subscribe', function () {
    it('should return an object of type Subscription', function () {
      var newStore = alo.createStore()
      var sub = newStore.createSubscription(function () {})
      assert.equal(true, u.isSubscription(sub))
    })
  })
})
