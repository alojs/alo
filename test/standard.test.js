var standard = require('mocha-standard')
import test from 'ava'

test('Coding style conforms to standard', function() {
  return standard.files([
    'lib/**/*.js'
  ])
})
