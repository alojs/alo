# Subscriptions
Subscriptions get called each time the state on a related store changes. Therefore when a dispatched action doesn't lead to a state change via reducer, that dispatch will not lead to a subscription call either.

**When a subscription gets related to a new store it will be called!**

[Fiddle](https://jsfiddle.net/katywings/75fjhrbp/3/)
```js
var alo = new Alo();
var store = alo.createStore({n: 1}, 'number');
// This is a nice reducer for prototyping which just replaces store state with the whole dispatched action
store.addReducer(alo.extras.reducers.createUntypedReplace());

// Creating a subscription over the alo instance
var subscription1 = alo.createSubscription(function(stores) {
  console.log('stores', stores);
})
store.addSubscription(subscription1);

// Creating a subscription directly on a store
var subscription2 = store.subscribe(function(stores) {
  console.log('hello from subscription 2');
});
// or even store.createSubscription(fun...)

// Ways of removing a subscription:
// 1. Remove all related stores
subscription2.removeStore();
// 2. Remove a specific store
subscription2.removeStore(store);
// 3. Remove a subscription from a store (does the same as 2.)
store.removeSubscription(subscription2);

store.dispatch({n: 2});
```

The parameters of the subscription function are:

1. Stores: Object with every related store (by store name)
  - stores.storeName.state: State of the store
  - stores.storeName.computed: Computed properties of the store
2. Computed properties: Object with computed properties of this subscription

## Computed properties
Subscriptions can have own computed properties like [stores](http://www.alojs.com/getting_started/stores.html#computed-properties])! But keep in mind: **As soon as a subscription has its own computed properties, they will be used for the lazy subscription-call comparison and not the related stores of the subscription!**
