/* global test */

var Alo = require('../dist/alo.full.dev.js')
var alo = new Alo()
var assert = require('assert')
import test from 'ava';

test('Alo isReducer should return true for reducers', function () {
  var reducer = alo.createReducer()
  assert.equal(true, alo.isReducer(reducer))
})
test('Alo isReducer should return false for objects', function () {
  assert.equal(false, alo.isReducer({}))
})

test('Alo isStore should return true for stores', function () {
  var store = alo.createStore()
  assert.equal(true, alo.isStore(store))
})
test('Alo isStore should return false for objects', function () {
  assert.equal(false, alo.isStore({}))
})

test('Alo createReducer should return a reducer', function () {
  var reducer = alo.createReducer()
  assert.equal(true, alo.isReducer(reducer))
})

test('Alo createStore should return a store', function () {
  var store = alo.createStore()
  assert.equal(true, alo.isStore(store))
})
