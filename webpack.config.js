var path = require('path')
var JsDocPlugin = require('jsdoc-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'main'),
  target: 'web',
  entry: {
    'alo': './alo.js',
    'alo.full': './alo.full.js'
  },
  output: {
    publicPath: '/dist/',
    library: 'alo',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new JsDocPlugin({
      conf: './jsdoc.conf'
    })
  ]
}
