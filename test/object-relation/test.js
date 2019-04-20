var Alo = require('./../../dist/alo.js')

var alo = new Alo()
var u = alo.util
var assert = require('assert')
import test from 'ava'

test('addFunction with valid object should register that object', function () {
  var store = alo.createStore()
  var subscription = alo.createSubscription()

  store.addSubscription(subscription)
  assert.equal(1, u.values(store._subscriptionRelations).length)
})

test('removeFunction without argument should remove all objects', function () {
  var store = alo.createStore()
  var subscription = alo.createSubscription()

  store.addSubscription(subscription)
  store.removeSubscription()
  assert.equal(0, u.values(store._subscriptionRelations).length)
})

test('relatedToFunction should return true for related objects', function () {
  var store = alo.createStore()
  var sub = store.createSubscription()

  assert.equal(true, store.relatedToSubscription(sub))
  assert.equal(true, store.relatedToSubscription(sub.getId()))
})

test('relatedToFunction should return false for unrelated objects', function () {
  var store = alo.createStore()
  var sub = alo.createSubscription()
  assert.equal(false, store.relatedToSubscription(sub))
  assert.equal(false, store.relatedToSubscription(sub.getId()))
})

test('indexOf should return the correct index', function () {
  var store = alo.createStore()
  var sub1 = store.createSubscription()
  var sub2 = store.createSubscription()
  var sub3 = store.createSubscription()
  assert.equal(1, store.indexOfSubscription(sub2.getId()))
  assert.equal(2, store.indexOfSubscription(sub3))
})

test('setIndexOf should set a new index', function () {
  var store = alo.createStore()
  var sub1 = store.createSubscription()
  var sub2 = store.createSubscription()
  var sub3 = store.createSubscription()
  store.setIndexOfSubscription(sub3, 1)
  assert.equal(1, store.indexOfSubscription(sub3))
  assert.equal(2, store.indexOfSubscription(sub2.getId()))
  assert.equal(-1, store.indexOfSubscription('test'))
})
