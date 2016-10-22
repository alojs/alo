var alo = require('./../src/main/alo.js');
var assert = require('assert');

describe('Store', function() {
  describe('Constructor', function() {
    it('should instantiate a store with an empty state when no state is provided', function() {
      var newStore = new alo.Store()
      assert.deepEqual({}, newStore.yet())
    });
    it('should instantiate a store with a state when a state is provided', function() {
      var newStore = new alo.Store({ hello: 'world'});
      assert.equal('world', newStore.yet().hello);
    });
  });
});
