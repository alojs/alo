/* global describe, it */

var alo = require('./../../src/main/alo.js')
var u = alo.util
var assert = require('assert')

describe('Store', function () {
  describe('Constructor', function () {
    it('should instantiate a store with an empty state when no state is provided', function () {
      var newStore = new alo.Store()
      assert.deepEqual({}, newStore.getState())
    })
    it('should instantiate a store with a state when a state is provided', function () {
      var newStore = new alo.Store({hello: 'world'})
      assert.equal('world', newStore.getState().hello)
    })
  })

  describe('dispatch', function () {
    describe('with object', function () {
      it('should call the subscriptions', function () {
        var store = new alo.Store()
        var status = 0

        store.subscribe(function (state) {
          status += 1
        })

        store.dispatch({})
        assert.equal(1, status)
      })
    })
    describe('with function', function () {
      it('should change state with returned state', function () {
        var store = new alo.Store()
        store.addReducer(alo.extras.reducers.createUntypedReplace())
        store.dispatch(function (state) {
          state.hello = 'world'
          return state
        })
        assert.equal('world', store.getState().hello)
      })
      it('should not change state, when no state is returned', function () {
        var store = new alo.Store()
        store.addReducer(alo.extras.reducers.createUntypedReplace())

        store.dispatch(function (state) {
          state.hello = 'world'
        })
        assert.notEqual('world', store.getState().hello)
      })
      it('should not change state, when incorrect state was returned', function () {
        var newStore = new alo.Store()
        // TODO: Hier weitermachen
        newStore.dispatch(function (state) {
          state = 'world'
          return state
        })
        assert.notEqual('world', newStore.getState())
      })
      it('should call the subscriptions, when it returns not undefined', function () {
        var store = new alo.Store()
        var status = 0

        store.subscribe(function (state) {
          status += 1
        })

        store.dispatch(function () {
          return null
        })
        assert.equal(1, status)
      })
      it('should not call subscription when it returns undefined', function () {
        var store = new alo.Store()
        var status = false
        store.subscribe(function () {
          status = true
        })
        store.dispatch(function (state) {})
        assert.equal(false, status)
      })
    })
  })

  describe('subscribe', function () {
    it('should return an object of type Subscription', function () {
      var newStore = new alo.Store()
      var sub = newStore.subscribe(function () {})
      assert.equal(true, u.isSubscription(sub))
    })
  })
})
