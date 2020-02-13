# First steps

Alo is very similar to the [flux pattern](https://medium.com/hacking-and-gonzo/flux-vs-mvc-design-patterns-57b28c0f71b7).

The main building blocks are:

- Stores: Are boxes of data, this data can be anything - from booleans to objects
- Reducers: They describe how an action should be synchronously applied to data
- Dependencies: Computations which are derived from data
- Subscriptions: Are reactions after the data in one or multiple stores has changed
- Middlewares: They can change an action - (even asynchronously), before it will be redirected to reducers

Except a more object oriented approach, there is one *essential difference* compared implementations like [Redux](http://redux.js.org/): Alo doesn't try to enforce the use of only one central store for your data, therefore subscriptions can be attached to multible stores. That is, you still can use it with a single store model if you want.

Alo's primary goal is not performance, but to minimize data mutation bugs. Therefore reducers will always get a clone and not the reference of the dispatched action and payload.

The data flow is as follow:
`dispatch on store -> middlewares -> reducers -> subscriptions`

## Relations
Thanks to the object oriented nature, the API consists of many helper functions. As an example stores and subscriptions are related [m:n](https://stackoverflow.com/questions/3397349/meaning-of-nm-and-1n-in-database-design#3397384):

([Fiddle](https://jsfiddle.net/katywings/oogL9bnr/1/))
```js
var makeLogState = function(storeName) {
  return function(stores) {
    console.log(stores[storeName].state);
  };
};

var alo = new Alo();
var store = alo.createStore('initial state', 'store1');
var logStateStore1 = makeLogState('store1');
var subscription = store.subscribe(logStateStore1);
store.removeSubscription(subscription);
var subscription2 = alo.createSubscription(logStateStore1);
subscription2.addStore(store);

var store2 = alo.createStore(true, 'store2');
var logStateStore2 = makeLogState('store2');
var subscription3 = alo.createSubscription(logStateStore2);
store2.addSubscription(subscription3);
```

## Alo instances
As Alo follows a relational model, its building blocks are related to each other but they are also related to a Alo instance!

```js
// A single Alo instance
var alo = new Alo();
// This store is related to the alo instance above
var store = alo.createStore('state', 'storeName');
```

**This implementation detail was added, so that [debugging and tooling](https://github.com/alojs/alo/issues/9) of your apps can be achieved at a later moment - currently the alo instances are just here because they are here.**

If you are creating an app with Alo you should create the Alo instance at one place and use [dependency injection](https://youtu.be/6YBV1cKRqzU), to enable its use in multible parts of your software:

```js
var createAppStore = function(alo) {
  return alo.createStore({}, 'app');
}
var App = function() {
  var alo = new Alo();
  var appStore = createAppStore(alo);
}
```

### When to use multible instances
[Debugging and tooling](https://github.com/alojs/alo/issues/9) will be per instance, therefore if you are developing an "App in app" solution you could create an instance per App. Use multible Alo instances when you want to completely separate specific components for debugging.


## Utilities
In the example code you probably will find many uses of the `alo.util` property. Use these with precaution! There are plans to remove many of them in a future major release.
