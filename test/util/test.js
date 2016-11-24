/* global describe, it */

var alo = require('./../../src/main/alo.js')
var assert = require('assert')

describe('util', function () {
  describe('isHandler', function () {
    it('should return true for handlers', function () {
      var handler = new alo.Handler()
      assert.equal(true, alo.util.isHandler(handler))
    })
    it('should return false for objects', function () {
      assert.equal(false, alo.util.isHandler({}))
    })
  })

  describe('isStore', function () {
    it('should return true for stores', function () {
      var store = new alo.Store()
      assert.equal(true, alo.util.isStore(store))
    })
    it('should return false for objects', function () {
      assert.equal(false, alo.util.isStore({}))
    })
  })

  describe('createHandler', function () {
    it('should return a handler', function () {
      var handler = alo.util.createHandler()
      assert.equal(true, alo.util.isHandler(handler))
    })
  })

  describe('createStore', function () {
    it('should return a store', function () {
      var store = alo.util.createStore()
      assert.equal(true, alo.util.isStore(store))
    })
  })
})
