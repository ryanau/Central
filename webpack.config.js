'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'client');

module.exports = {
  target: 'web',
  cache: true,
  entry: {
    module: path.join(srcPath, 'module.js'),
    common: ['react', 'react-router', 'alt']
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'client']
  },
  output: {
    path: './client',
    publicPath: '/',
    filename: '[name].js',
    library: ['Example', '[name]'],
    pathInfo: true
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/, 
        loader: 'babel?cacheDirectory',
      },
      {
        test: /\.css$/,
        include: /assets/,
        loader: "style-loader!css-loader",
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'client/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ],

  debug: true,
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './tmp',
    historyApiFallback: true
  }
};
