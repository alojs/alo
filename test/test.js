/* global describe, it */

var alo = require('../main/alo.full.js')
var assert = require('assert')

describe('Alo', function () {
  describe('isReducer', function () {
    it('should return true for reducers', function () {
      var reducer = alo.createReducer()
      assert.equal(true, alo.isReducer(reducer))
    })
    it('should return false for objects', function () {
      assert.equal(false, alo.isReducer({}))
    })
  })

  describe('isStore', function () {
    it('should return true for stores', function () {
      var store = alo.createStore()
      assert.equal(true, alo.isStore(store))
    })
    it('should return false for objects', function () {
      assert.equal(false, alo.isStore({}))
    })
  })

  describe('createReducer', function () {
    it('should return a reducer', function () {
      var reducer = alo.createReducer()
      assert.equal(true, alo.isReducer(reducer))
    })
  })

  describe('createStore', function () {
    it('should return a store', function () {
      var store = alo.createStore()
      assert.equal(true, alo.isStore(store))
    })
  })
})
