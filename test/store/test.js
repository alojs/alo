/* global describe, it */

var alo = require('./../../src/main/alo.full.js')
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

        var promise = u.createPromise(function (resolve, reject) {
          store.createSubscription(function (state) {
            status += 1
            resolve()
          })
        })

        return store.dispatch({}).then(function () {
          return promise
        }).then(function () {
          assert.equal(1, status)
        })
      })
    })
    describe('with function', function () {
      it('should change state with returned state', function () {
        var store = new alo.Store()
        store.addReducer(alo.extras.reducers.createUntypedReplace())
        store.dispatch(function (state) {
          state.hello = 'world'
          return state
        }).then(function () {
          assert.equal('world', store.getState().hello)
        })
      })
      it('should not change state, when no state is returned', function () {
        var store = new alo.Store()
        store.addReducer(alo.extras.reducers.createUntypedReplace())

        store.dispatch(function (state) {
          state.hello = 'world'
        }).then(function () {
          assert.notEqual('world', store.getState().hello)
        })
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
      it('should call the subscriptions, when it not returns undefined', function () {
        var called = false
        var store = new alo.Store({}, 'myStore')
        store.addReducer(alo.extras.reducers.createUntypedReplace())
        var promise = u.createPromise(function (resolve, reject) {
          var sub1 = store.createSubscription(function (state) {
            called = true
            resolve(1)
          })
          sub1.on('beforePublish', function (state, resolve2, reject) {
            sub1.remember()
            return resolve2(true)
          })
          sub1.on('afterPublish', function (state, resolve2, reject) {
            sub1.remember()
            return resolve2()
          })
          return sub1
        }).then(function (result) {
          return assert.equal(1, result)
        }).catch(function (e) {
          return e
        })
        return store.dispatch(function () {
          return 'hello'
        }).then(function () {
          return promise
        }).then(function (resut) {
          assert.equal(true, called)
        })
      })
      it('should not call subscription when it returns undefined', function () {
        var store = new alo.Store()
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
      var newStore = new alo.Store()
      var sub = newStore.createSubscription(function () {})
      assert.equal(true, u.isSubscription(sub))
    })
  })
})
