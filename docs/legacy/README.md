What follows is a backup of the original Alo v2.8.3 documentation.

Alo is a state management library, helping you to organize frontend application state in a productive way, giving you ways to handle side effects, and allowing you, to stay in control of whats going on. There are many libraries to manage state: [Redux](https://github.com/reactjs/redux), [Mobx](https://github.com/mobxjs/mobx), [Vuex](https://github.com/vuejs/vuex), and a countless number more. Although I like the ideas behind them, I wasn't quite happy how they introduce many necessary extra steps to get started, require dozens of extra plugins to get you your job done, or introduce new babel build tools, just to write pragmatic code.

## Features

* State managed with [flyd](https://github.com/paldepind/flyd) streams (therefore being able to access the state stream directly if needed)
* All the features of a basic state management library (stores, dispatch, subscriptions, middleware)
* Computed properties with dependencies on the state (only computed if dependencies change)
* Dependency-handling for subscriptions (allowing to call subscriptions only if specific dependencies change)
* Before and after events for subscriptions
* Flexible object oriented classes for stores, subscriptions, reducers, etc.
* Promise Support based on [yaku](https://github.com/ysmood/yaku) for dispatches, dependencies and middleware

## And how?
The [getting started](http://www.alojs.com/getting_started/first_steps.html) section will provide you with additional information, but here is Alo at first glance:

([Fiddle](https://jsfiddle.net/katywings/tr1vexgp/))
```js
var Alo = require('alo');
// Alo building blocks are always assigned to a specific Alo instance
var alo = new Alo();

// Stores hold the state of your app and are the main building block of Alo
var counterStore = alo.createStore({ count: 0 }, 'counter');

var increase = function(amount) { return { type: 'increase', payload: amount || 1 }}

// Reducers define how actions are applied to the state
var reducer = counterStore.createReducer(function(state, action) {
  if (action.type === "increase") {
      state.count += action.payload;
  }

  return state
});

// Subscribe to state changes
var subscription = counterStore.subscribe(function(stores) {
  console.log('count', stores.counter.state.count);
});

// Apply the increase action to the store, you always will get a promise from this
var promise = counterStore.dispatch(increase(3));

// -> count 0
// -> count 3
```

## Roadmap
- Documentation of Todo example
- Writing a changelog
- Extending the documentation
- Promise code refactoring
- Where possible, reduce the library size

### Long-term
Subject to change and open for discussion!

- 100% Test coverage
- Dev-tools
- Remove utility dependencies
- Remove flyd streams: they didn't really bring an advantage and just added weight
- Remove subscription members: like with the flyd integration, my experience with them was, that they don't provide a lot of advantages
- Reducers just as functions
- Probably for 4.0: Subscriptions should not be called on addStore / removeStore - one can manually call remember if such behaviour is needed
- Probably for 4.0: Remove polymorphism, extend API with separate functions

