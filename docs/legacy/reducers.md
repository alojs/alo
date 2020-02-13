# Reducers
Reducers apply actions to store states:

[Fiddle](https://jsfiddle.net/katywings/z2hheeuj/1/)
```js
var alo = new Alo();
var store = alo.createStore(0, 'number');

// Create a reducer on alo instance level
var reducerPlus = alo.createReducer(function(state, action) {
  if (action.type == '+') {
    state += 1;
  }

  return state;
});
// Add the reducer to the store
store.addReducer(reducerPlus);

// This creates and adds a new reducer to the store in one step
var reducerMinus = store.createReducer(function(state, action) {
  if (action.type == '-') {
    state -= 1;
  }

  return state;
});

alo.util.Promise.resolve()
  .then(function() {
    return store.dispatch({ type: '-' });
  })
  .then(function() {
    return store.dispatch({ type: '-' });
  })
  .then(function() {
    return store.dispatch({ type: '+' });
  })
  .then(function() {
    return store.dispatch({ type: '-' });
  })
  .then(function() {
    console.log(store.getState());
    // -2
  })
```
