/* globals it */

var standard = require('mocha-standard')

describe('Coding style', function() {
  this.timeout(5000)
  it('conforms to standard', standard.files([
    'lib/**/*.js'
  ]))
})
