/* global describe, it */

var alo = require('./../../src/main/alo.js')
var assert = require('assert')

describe('Store', function () {
  describe('Constructor', function () {
    it('should instantiate a store with an empty state when no state is provided', function () {
      var newStore = new alo.Store()
      assert.deepEqual({}, newStore.yet())
    })
    it('should instantiate a store with a state when a state is provided', function () {
      var newStore = new alo.Store({hello: 'world'})
      assert.equal('world', newStore.yet().hello)
    })
  })

  describe('dispatch', function () {
    it('should change state with returned state', function () {
      var newStore = new alo.Store()
      newStore.dispatch(function (state) {
        state.hello = 'world'
        return state
      })
      assert.equal('world', newStore.yet().hello)
    })
    it('should change state with dispatcher function', function () {
      var newStore = new alo.Store()
      newStore.dispatch(function (state, dispatcher) {
        state.hello = 'world'
        dispatcher(state)
      })
      assert.equal('world', newStore.yet().hello)
    })
    it('should not change state, when no state is returned', function () {
      var newStore = new alo.Store()

      newStore.dispatch(function (state) {
        state.hello = 'world'
      })
      assert.notEqual('world', newStore.yet().hello)
      newStore.dispatch(function (state, dispatcher) {
        state.hello2 = 'world'
      })
      assert.notEqual('world', newStore.yet().hello)
    })
    it('should not change state, when incorrent state was returned', function () {
      var newStore = new alo.Store()
      // TODO: Hier weitermachen
      newStore.dispatch(function (state) {
        state = 'world'
        return state
      })
      assert.notEqual('world', newStore.yet())
    })
  })

  describe('subscribe', function () {
    it('should return an object of type Subscription', function () {
      var newStore = new alo.Store()
      var sub = newStore.subscribe(function () {})
      assert.equal(true, sub instanceof alo.Subscription)
    })
    describe('callback function', function () {
      it('should get called on dispatch', function () {
        var newStore = new alo.Store()
        var status = 0
        newStore.subscribe(function () {
          status += 1
        })
        newStore.dispatch()
        assert.equal(1, status)
        newStore.dispatch(function () {
          return {hello: 'world'}
        })
        assert.equal(2, status)
        newStore.dispatch(function (state, dispatcher) {
          dispatcher({ hello: 'world' })
        })
        assert.equal(3, status)
      })
      it('should not get called on incomplete dispatch', function () {
        var newStore = new alo.Store()
        var status = false
        newStore.subscribe(function () {
          status = true
        })
        newStore.dispatch(function (state, dispatcher) {})
        assert.equal(false, status)
        newStore.dispatch(function (state) {})
        assert.equal(false, status)
        newStore.dispatch(function () {})
        assert.equal(false, status)
      })
      it('should get new state of dispatch', function () {
        var newStore = new alo.Store()
        var state = {}
        newStore.subscribe(function (newState) {
          state = newState
        })
        newStore.dispatch(function (state) {
          state.hello = 'world'
          return state
        })
        assert.equal('world', state.hello)
      })
    })
  })
})
