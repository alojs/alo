# Installation

## Versions
There are different main files available for use in the [dist](https://github.com/alojs/alo/tree/master/dist) folder.

The files are constructed with a combination of these postfixes:

* full: includes extras (helpers like some basic reducers and middleware)
* dev: enables long stacktraces in promises and will (as of 3.0) add the debug console to the Alo class

## CDN's
You can use Alo with NPM or Bower or even straight from a CDN. There are couple browser builds available in the dist folder

### Development (unminified and with devtools) (see <a href="#versions">Versions</a>)

* Core: https://cdn.rawgit.com/alojs/alo/v2.8.3/dist/alo.dev.js
* Full: https://cdn.rawgit.com/alojs/alo/v2.8.3/dist/alo.full.dev.js

### Production (minified)

* Core: https://cdn.rawgit.com/alojs/alo/v2.8.3/dist/alo.min.js
* Full: https://cdn.rawgit.com/alojs/alo/v2.8.3/dist/alo.full.min.js

### More?
Please have a look at [RawGit](https://rawgit.com). It allows you to use basically any file from Github repos (and therefore also all the files from https://cdn.rawgit.com/alojs/alo/v2.8.3/dist/)

## Use (CJS)

* Core: `require('alo/dist/alo.js')`
* Core *Dev*: `require('alo/dist/alo.dev.js')`
* Full: `require('alo')`
* Full *Dev*: `require('alo/dist/alo.full.dev.js')`
