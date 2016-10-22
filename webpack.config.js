var path = require("path");
var JsDocPlugin = require('jsdoc-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src', 'main'),
  target: 'web',
  entry: './alo.js',
  output: {
    publicPath: '/dist/',
    library: 'alo',
    path: path.resolve(__dirname, 'dist'),
    filename: 'alo.js'
  },
  plugins: [
    new JsDocPlugin({
      conf: './jsdoc.conf'
    })
  ]
}
