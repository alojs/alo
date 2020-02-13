# Stores
As earlier mentioned stores hold the state of your application and redirect actions to reducers.

They can be created like this:

```js
var alo = new Alo();
var store = alo.createStore("state", "storeName");
```

The constructor parameters are:

1. Initial state of the store, (can be any type but generally will be an object)
2. Optional: An unique name for the store (this name will be used as store identifier in the subscription!)

## Dispatch
Dispatches are the way to notify a store about a state change:

```js
var action = {
  type: 'changeState',
  payload: 'newState'
}
store.dispatch(action);
```

*Atleast if you are not using a middleware to change this behaviour, you **always**
need to dispatch action objects atleast with a type field.*

The dispatch will however not do anything, as long as the store doesn't have a related reducer!
If the store has any reducers, they will decide what should happen with your action.

## Get the current state
- Only the state:
```js
store.getState();
```

- State and computed properties
```js
store.getData();
```

## Computed properties
Alo has built-in support for computed properties. They are only recalculated, when their dependencies change (plusThree is only called, when plusTwo changes). Look at the following example to get a feel for them:

[Fiddle](https://jsfiddle.net/katywings/w4q6242q/4/)
```js
var alo = new Alo();
var store = alo.createStore(1, 'number');
store.createReducer(function(state, action) {
  if (action.type == 'add') {
    state += 1;
  }

  return state;
});

// Creates 3 computed properties, plusThree is especially dependent on plusTwo
store.createComputedProperty({
  'plusOne': function(store) {
    return store + 1;
  },
  'plusTwo': function(store) {
    return store + 2;
  },
  'plusThree': [['plusTwo'], function(store, computed) {
    return computed.plusTwo + 1;
  }]
});

store.subscribe(function(stores) {
  // Computed
  console.log('state', stores.number.state);
  console.log('computed properties', stores.number.computed);
});

store.dispatch({ type: 'add' });
```

**At the moment computed properties will (as lazy as they are) only be called after a dispatch with state change, as an example you could have a "initialize" action which sets the initial store state**:

```js
var alo = new Alo();
var store = alo.createStore({}, 'number');
store.createReducer(function(state, action) {
  if (action.type == 'initialize') {
    state = action.payload;
  }

  return state;
});
// store.createComputedProperty...
store.dispatch({ type: 'initialize', payload: 1});
```
