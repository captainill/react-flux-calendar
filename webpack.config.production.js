/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './js/client.js',
  output: {
    path: path.join(__dirname, 'public/assets'),
    filename: 'client.js',
    publicPath: '/public/assets'
  },
  resolve: {
    extensions: [ '', '.js' ]
  },
  plugins: [
  new ExtractTextPlugin('style.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'js')
    },
    { 
      test: /\.scss$/, 
      loader: ExtractTextPlugin.extract(
        // activate source maps via loader query
        'css?sourceMap!' +
        'sass?sourceMap'        
      )
    }]
  }
};
