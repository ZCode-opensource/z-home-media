const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './run'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'static/'),
      staticOptions: {},
      serveIndex: true,
      watch: true,
    },
    devMiddleware: {
      publicPath: 'http://localhost:8080/',
    },
  },
});
