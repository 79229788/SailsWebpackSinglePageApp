const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports['webpack-plugins'] = function (sails) {
  return [
    {
      res: new webpack.HotModuleReplacementPlugin(),
      env: ['hot-dev'],
      enabled: true
    },
    {
      res: new VueLoaderPlugin(),
      env: ['hot-dev', 'dev', 'prod', 'deploy'],
      enabled: true
    },
    {
      //分离CSS样式文件
      res: new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash:8].css',
        ignoreOrder: true
      }),
      env: ['prod', 'deploy'],
      enabled: true
    },
  ]
};
