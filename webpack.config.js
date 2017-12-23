const debug = process.env.NODE_ENV !== "production"
const webpack = require('webpack')
const path = require('path')

const SRC_DIR = path.resolve(__dirname, './src/')
const DIST_DIR = path.resolve(__dirname, '.')

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-source-map' : null,
  cache: true,
  entry: SRC_DIR + '/index.jsx',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'env']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=public/fonts/[name].[ext]'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: DIST_DIR,
    filename: 'app.min.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
}