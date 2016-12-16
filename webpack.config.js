var path = require('path')
var webpack = require('webpack')
var JsDocPlugin = require('jsdoc-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'main'),
  target: 'web',
  entry: {
    'alo': './alo.js',
    'alo.dev': './alo.dev.js',
    'alo.full': './alo.full.js',
    'alo.full.dev': './alo.full.dev.js'
  },
  output: {
    publicPath: '/dist/',
    library: 'alo',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
  preLoaders: [{
    test: /\.js?$/,
    loader: "remove-flow-types",
    include: path.join(__dirname, "lib")
  }],
  plugins: [
    new JsDocPlugin({
      conf: './jsdoc.conf'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify('browser')
      }
    })
  ]
}
