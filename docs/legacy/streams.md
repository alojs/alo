# Streams
Alo uses [Flyd](https://github.com/paldepind/flyd) streams in the background. The API provides you with a direct way to access underlying streams:

```js
var alo = new Alo();
var store = alo.createStore('state', 'storeName');
var subscription = alo.createSubscription(function() {});

// This is the flyd stream and you can use it with the many flyd modules
var stream = store.getStream();

// Use this very careful: Subscription streams are overwritten with new streams, each time when the relation between the subscription and its stores is changed. If you only add / remove stores to the subscription at the beginning of your app, then the usage of this should be fine
var subscriptionStream = subscription.getStream();
```
