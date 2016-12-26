var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, 'main'),
  target: 'web',
  entry: {
    'alo': './alo.js',
    'alo.dev': './alo.dev.js',
    'alo.full': './alo.full.js',
    'alo.full.dev': './alo.full.dev.js'
  },
  module: {
    rules: [
// documentation-loader currently not supported with webpack 2
/*      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre',
        use: [
          {
            loader: 'documentation-loader',
            options: {
              documentation: {
                output: path.join(__dirname, 'docs', 'api'),
                entry: [
                  path.join(__dirname, 'main', 'alo.full.dev.js')
                ],
                github: true,
                format: 'html'
              }
            }
          }
        ]
      },
*/
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  output: {
    publicPath: '/dist/',
    library: 'Alo',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify('browser')
      }
    })
  ],
}
