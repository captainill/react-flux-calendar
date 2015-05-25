var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebackGrowlErrorPlugin = require('./js/lib/WebackGrowlErrorPlugin')


module.exports = {
  entry: [
    './js/client.js',
  ],
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'public/assets'),
    filename: 'client.js',
    publicPath: '/public/assets',
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new WebackGrowlErrorPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: [ '', '.js' ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'js'),
        loader: 'babel'
      },
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap'        
        )
      }      
    ]
  }
};
