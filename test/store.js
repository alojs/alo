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
 
  describe('dispatch', function() {
    it('should change state with returned state', function() {
      var newStore = new alo.Store();
      newStore.dispatch(function(state) {
        state.hello = 'world';
	return state;
      });
      assert.equal('world', newStore.yet().hello);
    });
    it('should not change state, when state was not returned', function() {
      var newStore = new alo.Store();
      newStore.dispatch(function(state) {
        state.hello = 'world';
      });
      assert.equal(null, newStore.yet().hello);
    });
    it('should change state with dispatcher function', function() {
      var newStore = new alo.Store();
      newStore.dispatch(function(state, dispatcher) {
        state.hello = 'world';
        dispatcher(state);
      });
      assert.equal('world', newStore.yet().hello);
    });
    it('should not change state, when no state is returned by dispatcher', function() {
      var newStore = new alo.Store();
      newStore.dispatch(function(state, dispatcher) {
        state.hello = 'world';
      });
      assert.equal(null, newStore.yet().hello);
    });
  });

  describe('subscribe', function() {
    it('should return an object of type Subscription', function() {
      var newStore = new alo.Store();
      var sub = newStore.subscribe(function() {});
      assert.equal(true, sub instanceof alo.Subscription);
    });
    describe('callback function', function() {	    
      it('should get called on dispatch', function() {
        var newStore = new alo.Store();
        var status = 0;
        newStore.subscribe(function() {
          status += 1;
        });
        newStore.dispatch();
        assert.equal(1, status);
	newStore.dispatch(function(){
	  return { hello: 'world'};
	});
	assert.equal(2, status);
	newStore.dispatch(function(state, dispatcher) {
	  dispatcher({ hello: 'world' });
	});
	assert.equal(3, status);
      });
      it('should not get called on incomplete dispatch', function() {
        var newStore = new alo.Store();
	var status = false;
	newStore.ss(function() {
	  status = true;
	});
	newStore.dp(function(state, dispatcher) {});
	assert.equal(false, status);
	newStore.dp(function(state) {});
	assert.equal(false, status);
	newStore.dp(function() {});
	assert.equal(false, status);
      });
      it('should get new state of dispatch', function() {
        var newStore = new alo.Store();
        var state = {};
        newStore.subscribe(function(newState) {
          state = newState;
        });
        newStore.dispatch(function(state) {
          state.hello = 'world';
          return state;
        });
        assert.equal('world', state.hello);
      });
    });
  });
});
