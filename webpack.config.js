var path = require("path");

module.exports = {
  target: 'web',
  entry: './src/main.js',
  output: {
    publicPath: '/dist/',
    library: 'alo',
    path: path.resolve(__dirname, 'dist'),
    filename: 'alo.js'
  }
}
