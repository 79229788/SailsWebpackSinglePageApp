const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports['webpack-plugins'] = function (sails) {
  return [
    {
      res: new webpack.HotModuleReplacementPlugin(),
      env: ['webpack-dev'],
      enabled: true
    },
    {
      //分离CSS样式文件
      res: new ExtractTextPlugin({
        filename: 'styles/[name].[contenthash:8].css',
        allChunks: true
      }),
      env: ['dev', 'pro', 'deploy'],
      enabled: true
    },
    {
      //压缩js模块
      res: new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        }
      }),
      env: ['pro', 'deploy'],
      enabled: true
    },
  ]
};
