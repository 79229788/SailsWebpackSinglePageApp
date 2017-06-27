//https://webpack.js.org/configuration/
const webpack = require('webpack');
const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackInjectPlugin = require('../node_plugins/html-webpack-inject-plugin');

module.exports.webpack = function (sails) {
  const plugins = sails.config['webpack-plugins'](sails);
  const loaders = sails.config['webpack-loaders'](sails);
  const paths = sails.config['webpack-paths'](sails);
  const isDev = sails.config.environment === 'development' && !sails.config.hot;
  const isWebpackDev = sails.config.environment === 'development' && !!sails.config.hot;
  const isPro = sails.config.environment === 'production' && !sails.config.deploy;
  const isDeploy = sails.config.environment === 'production' && !!sails.config.deploy;
  let webpackPlugins = [];
  let webpackLoaders = [];
  plugins.forEach(function (plugin) {
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isWebpackDev && plugin.env.indexOf('webpack-dev') > -1) webpackPlugins.push(plugin.res);
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isDev && plugin.env.indexOf('dev') > -1) webpackPlugins.push(plugin.res);
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isPro && plugin.env.indexOf('pro') > -1) webpackPlugins.push(plugin.res);
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isDeploy && plugin.env.indexOf('deploy') > -1) webpackPlugins.push(plugin.res);
  });
  loaders.forEach(function (loader) {
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isWebpackDev && loader.env.indexOf('webpack-dev') > -1) webpackLoaders.push(loader.res);
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isDev && loader.env.indexOf('dev') > -1) webpackLoaders.push(loader.res);
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isPro && loader.env.indexOf('pro') > -1) webpackLoaders.push(loader.res);
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isDeploy && loader.env.indexOf('deploy') > -1) webpackLoaders.push(loader.res);
  });
  //设置入口项和页面配置
  const webpackEntryPages = {};
  const commonChunks = [];
  sails.config.pages.pages.forEach(function (obj) {
    webpackEntryPages[obj.name] = sails.paths.assetJs + obj.mainJs;
    webpackPlugins.push(
      new HtmlWebpackPlugin({
        template: sails.paths.pages + obj.mainHtml,
        filename: obj.isStatic ? (sails.paths.tmpPages + obj.mainHtml.replace('.swig', '.html')) : (sails.paths._pages + obj.mainHtml),
        inject: false,
        title: obj.title || 'Sails App',
        keywords: (obj.keywords || []).join(','),
        description: obj.description || '',
        chunks: _.union(['_lib'], obj.otherJs || [], [obj.name]),
        alwaysWriteToDisk: true
      })
    );
    webpackPlugins.push(
      new HtmlWebpackInjectPlugin({
        evaluate: /<&([\s\S]+?)&>/g,
        interpolate: /<&=([\s\S]+?)&>/g,
        escape: /<&-([\s\S]+?)&>/g,
      })
    );
    webpackLoaders.push(
      {
        test: new RegExp(obj.name + '\.swig$'),
        use: [{
          loader: obj.isStatic ? 'swig-loader' : 'html-loader'
        }],
      }
    );
    _.each(sails.config.pages.scripts, function (value, key) {
      if(obj.otherJs.indexOf(key) >-1) {
        commonChunks.push(obj.name);
      }
    });
  });
  //添加强制写入磁盘插件（防止webpack dev server仅在内存中生成文件）
  webpackPlugins.push(new HtmlWebpackHarddiskPlugin());
  //抽离自定义公共模块
  _.each(sails.config.pages.scripts, function (value, key) {
    webpackPlugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: key,
        chunks: commonChunks,
        minChunks: 2,
      })
    );
  });
  //抽离第三方库模块
  webpackPlugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: '_lib',
      chunks: _.keys(sails.config.pages.scripts),
      minChunks: Infinity,
    })
  );
  //入口文件
  const webpackEntry = _.extend({}, {'_lib': sails.config.pages.libs}, sails.config.pages.scripts || {}, webpackEntryPages);

  if(isWebpackDev) {
    webpackEntry['_lib'].unshift('webpack/hot/dev-server');
    webpackEntry['_lib'].unshift(`webpack-dev-server/client?${sails.macros.KDebugHostUrl}:3000/`);
  }

  return {
    config: {
      options: {
        resolve: {
          extensions: [".js", ".json", ".jsx", ".css", ".scss", ".hbs", ".vue"],
          alias: paths,
        },
        entry: webpackEntry,
        output: {
          path: sails.config.deploy ? sails.paths.wwwAssets : sails.paths.tmpAssets,
          filename: isWebpackDev ? 'js/[name].js' : 'js/[name].[chunkHash:8].js',
          chunkFilename: isWebpackDev ? 'js/[name].chunk.js' : 'js/[name].chunk.[chunkHash:8].js',
          publicPath: isDeploy ?  sails.macros.KCdnUrl + '/assets/' : '/assets/',
        },
        module: {
          rules: webpackLoaders
        },
        plugins: webpackPlugins
      }
    },
    development: {
      webpack: {},
      config: {
        hot: true,
        port: 3000,
        contentBase: sails.paths.tmpAssets,
        publicPath: '/assets/',
        noInfo: true,
        disableHostCheck: true,
        inline: true,
        proxy: {
          '*': {
            target: `${sails.macros.KDebugHostUrl}:1337`
          }
        }
      },
    },
  }
};

