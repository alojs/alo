<h1>
  <img width="100px" src="https://cdn.rawgit.com/alojs/alo/e512ce4ef2fca64120d74942519b4a9cea8959de/logo/logo.png" /> 
  &nbsp; Welcome to Alo
</h1>

[![license](https://img.shields.io/github/license/alojs/alo.svg)](https://github.com/alojs/alo/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/alo.svg)](https://www.npmjs.com/package/alo)
[![Bower](https://img.shields.io/bower/v/alo.svg)](https://bower.io/search/?q=alo)
[![Travis](https://img.shields.io/travis/alojs/alo.svg)](https://travis-ci.org/alojs/alo)
[![Coveralls](https://img.shields.io/coveralls/alojs/alo.svg)](https://coveralls.io/github/alojs/alo)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm](https://img.shields.io/npm/dm/alo.svg)](https://www.npmjs.com/package/alo)
[![David](https://img.shields.io/david/alojs/alo.svg)](https://github.com/alojs/alo)
[![David](https://img.shields.io/david/dev/alojs/alo.svg)](https://github.com/alojs/alo)

## Intro
Alo is a state management library, helping you to organize frontend application state in a productive way, giving you ways to handle side effects, and allowing you, to stay in control of whats going on. There are many libraries to manage state: [Redux](https://github.com/reactjs/redux), [Mobx](https://github.com/mobxjs/mobx), [Vuex](https://github.com/vuejs/vuex), and a countless number more. Although I like the ideas behind them, I wasnt quite happy how they introduce many necessary extra steps to get started, require dozens of extra plugins do get you your job done, or introduce new babel build tools, just to write usable code. As an example, i just can't stand the magic behind code like this (code from mobx):

```js
class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```

Yeah its readable and one can probably guess, what this code is doing. But is it *really* a benefit to a plain ES5 solution? I am not that sure. But I am maybe just a little bit oldscool. Know I am not here to prove you my point and to *sell* you Alo. But surely I would love to see that you and others enjoy Alo. But at the end everyone must choose the tools which work best for him and her.

### Features

* State managed with [flyd](https://github.com/paldepind/flyd) streams (therefore being able to access the state stream direcly if needed)
* All the features of a basic state management library (stores, dispatch, subscriptions, middleware)
* Computed properties with dependencies on the state (only computed if dependencies change)
* Dependency-handling for subscriptions (allowing to call subscriptions only if specific dependencies change)
* Before and after events for subscriptions
* Flexible object oriented classes for stores, subscriptions, reducers, etc.
* Promise Support for dispatches, dependencies and middleware

### But what is Alo?
Now I actually need to work on this paragraph AWWW! But here is a small code snippet, just introducing the basics:

```js
var Alo = require('alo')
var alo = new Alo();

// Stores are objects on top of flyd streams https://github.com/paldepind/flyd
var myCoolStore = alo.createStore({test: 'tired string :('}, 'coolStore')

// Reducers are actually objects too!
var myReducer = myCoolStore.createReducer(function(state, action) {
  if (action.type === "hello") {
      state.test = "FANCY STRING! Wohoo lets dance!"
  }
  // I will change the state
  return state
})

// This is a subscription, it can be subscribed to multible stores!
var sub = myCoolStore.subscribe(function(stores) {
  console.log('message', stores.coolStore.state)
})

var promise = myCoolStore.dispatch({ type: 'hello' });
// A dispatch always returns a promise
promise.then(function() {
  console.log('dispatch done, yeah!');
})
```

## Getting started
Currently in the works...

## API
http://www.alojs.com/docs/api/ Currently in the works!

## Installation

* NPM: `npm install --save-dev alo`
* Bower: `bower install --save-dev alo`

### Use

* Core: `require('alo/dist/alo.js')`
* Core *Dev*: `require('alo/dist/alo.dev.js')`
* Full: `require('alo')`
* Full *Dev*: `require('alo/dist/alo.full.dev.js')`

### Versions
There are different main files available for use in the [dist](https://github.com/alojs/alo/tree/master/dist) folder.

The files are constructed with a combination of these postfixes:

* full: includes extras (helpers like some basic reducers and middleware)
* dev: enables long stacktraces in promises and will (as of 3.0) add the debug console to the Alo class

### CDN's
You can use Alo with NPM or Bower or even straight from a CDN. There are couple browser builds available in the dist folder

#### Development (unminified and with devtools) (see <a href="#versions">Versions</a>)

* Core: https://cdn.rawgit.com/alojs/alo/v2.8.0/dist/alo.dev.js
* Full: https://cdn.rawgit.com/alojs/alo/v2.8.0/dist/alo.full.dev.js

#### Production (minified)

* Core: https://cdn.rawgit.com/alojs/alo/v2.8.0/dist/alo.min.js
* Full: https://cdn.rawgit.com/alojs/alo/v2.8.0/dist/alo.full.min.js

#### More?
Please have a look at [RawGit](https://rawgit.com). It allows you to use basically any file from Github repos (and therefore also all the files from https://cdn.rawgit.com/alojs/alo/v2.8.0/dist/)

## FAQ
1. *Is this library ready to use for production?*
API-wise there are not many open changes planned, however the library is quite young and I don't want to feature freeze the library yet. So if I see a huge optimization potential or get useful feedback I am open for API changes. (But even if that happens I will try to minimize the required changes for users). Then there is also just the chance to find nasty bugs as an early adopter - this chance just can't be eliminated 100%.

2. *Where is the documentation?*
I am working on it.

3. *What are your future plans?*
Trying to add examples, test the software, add more extras, work on the dev-tools. My goal is to ship an as stable as possible 3.0 in the next couple of months (End of Q1(17) / Start of Q2(17))



