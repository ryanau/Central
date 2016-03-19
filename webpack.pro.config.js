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
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js',
    library: ['Example', '[name]'],
    pathInfo: true
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html'
    }),
  ],
  resolve: {
    root: srcPath,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'client']
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
}