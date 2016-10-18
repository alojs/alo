var PocketStore = function(state) {
  var pocketStoreThis = this
  this.$state = {}
  if (typeof(state) !== 'object') {
    state = {}
  }
  
  this.protected = {
    state: state,
    subscriptions: [],
    synchronize: function synchronize() {
      pocketStoreThis.$state = this.state
    },
    publish: function publish() {
      var self = this
      self.synchronize()
      self.subscriptions.forEach(function(subscription){
        self.callSubscription(subscription)
      })
    },
    callSubscription: function callSubscription(subscription) {
      subscription.callbackFunction.call(null, pocketStoreThis.$state)
    }
  }
  this.protected.synchronize()
}

PocketStore.prototype.subscribe = function subscribe(func, namespaces) {
  var self = this
  var idx = self.protected.subscriptions.push({ callbackFunction: func, namespaces: namespaces})
  idx--
  return {
    remember: function() {
      self.protected.callSubscription(self.protected.subscriptions[idx])
    }
  }
}

PocketStore.prototype.dispatch = function dispatch(func) {
  var self = this
  func.call(null, self.protected.state, function(newState) {
    self.protected.state = newState
    self.protected.publish()
  })
}
