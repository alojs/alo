/* global describe, it */

var Alo = require('./../../main/alo.js')
var alo = new Alo()
var u = alo.util
var assert = require('assert')

describe('ObjectRelation', function () {
  var objectRelation1 = u.createObjectRelation('tree', 'leaf', function (leaf) {
    return (leaf instanceof Leaf)
  })
  var objectRelation2 = u.createObjectRelation('leaf', 'tree', function (tree) {
    return (tree instanceof Tree)
  })
  var Tree = function Tree () {
    objectRelation1.constructParent(this)
  }
  Tree.prototype.getId = null
  objectRelation1.registerParentPrototype(Tree.prototype)
  var Leaf = function Leaf () {
    objectRelation2.constructParent(this)
  }
  Leaf.prototype.getId = null
  objectRelation2.registerParentPrototype(Leaf.prototype)
  describe('addFunction', function () {
    describe('with valid object', function () {
      it('should register that object', function () {
        var tree = new Tree()
        var leaf = new Leaf()
        tree.addLeaf(leaf)
        assert.equal(1, u.values(tree._leafRelations).length)
      })
    })
  })
  describe('removeFunction', function () {
    describe('without argument', function () {
      it('should remove all objects', function () {
        var tree = new Tree()
        var leaf = new Leaf()
        tree.addLeaf(leaf)
        tree.removeLeaf()
        assert.equal(0, u.values(tree._leafRelations).length)
      })
    })
  })
})
