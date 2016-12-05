/* global describe, it */

var Alo = require('./../../main/alo.full.js')
var alo = new Alo()
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

  describe('addComputedProperty', function () {
    it('should be added to the computed properties', function () {
      var store = alo.createStore({
        val1: 1,
        val6: 2,
        val7: 3
      }, 'myStore')
      store.createReducer(function (state, action) {
        if (action.type === 'test') {
          state = u.merge(state, action.payload)
          state.test = true
        }
        return state
      })
      var prop1 = store.createComputedProperty({
        'val6': function (state) {
          return state.val6
        },
        'val5': [['val4', 'val6'], function (state, comp) {
          return comp.val4 * comp.val6
        }],
        'val4': function (state, computed, action) {
          return computed.val3 * 4
        }
      })
      prop1.add({
        'val7': function (state) {
          return state.val7
        }
      }, 'before')

      var prop2 = alo.createDependency({
        'val3': [['val2'], function (state, computed) {
          return computed.val2 * 3
        }],
        'val2': function (state) {
          return state.val1
        }
      })
      prop1.addDependency(prop2)

      var prom = u.createPromise(function (resolve, reject) {
        store.dispatch({}).then(function () {
          var sub = store.createSubscription()
          var memb = sub.createMember(function (stores, computed) {
            if (stores.myStore.state.test === true) {
              resolve(stores.myStore)
            }
          })
          memb.createDependency({
            'val8': function (stores) {
              return alo.util.uniqueId()
            }
          })
          sub.createDependency({
            'val8': function (stores) {
              return stores.myStore.computed.val3
            }
          })
          store.dispatch({}).then(function () {
            store.dispatch({ type: 'test', payload: { val6: 3, val1: 2 } })
          })
        })
      }).then(function (state) {
        assert.equal(72, state.computed.val5)
      })
      return prom
    })
  })

  describe('dispatch', function () {
    describe('with promise', function () {
      it('should use the returned value in the reducer', function () {
        var store = alo.createStore()
        var promise = u.createPromise(function (res, rej) {
          store.createReducer(function (state, action) {
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

        var sub = store.createSubscription()
        sub.createMember(function () {
          status++
        })

        return store.dispatch({}).then(function () {
          return setTimeout(function () {
            assert.equal(1, status)
          }, 100)
        })
      })
    })
  /*
  describe('with function', function () {
    it('should change state with returned state', function () {
      var store = alo.createStore()
      store.addReducer(alo.extras.reducers.createUntypedReplace())
      return store.dispatch(function (state) {
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
      var sub = store.createSubscription()
      sub.createMember(function (state) {
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
      var sub = store.createSubscription()
      sub.createMember(function () {
        status = true
      })
      store.dispatch(function (state) {})
      assert.equal(false, status)
    })
  })*/
  })

  describe('subscribe', function () {
    it('should return an object of type Subscription', function () {
      var newStore = alo.createStore()
      var sub = newStore.createSubscription()
      assert.equal(true, alo.isSubscription(sub))
    })
  })
})
