//https://webpack.js.org/configuration/
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const HtmlWebpackInjectPlugin = require('../node_plugins/html-webpack-inject-plugin');

module.exports.webpack = function (sails) {
  const plugins = sails.config['webpack-plugins'](sails);
  const loaders = sails.config['webpack-loaders'](sails);
  const paths = sails.config['webpack-paths'](sails);
  const isDev = sails.config.environment === 'development' && !sails.config.hot;
  const isHotDev = sails.config.environment === 'development' && !!sails.config.hot;
  const isChildDev = sails.config.environment === 'development' && !!sails.config.child;
  const isProd = sails.config.environment === 'production' && !sails.config.deploy;
  const isDeploy = sails.config.environment === 'production' && !!sails.config.deploy;
  let webpackPlugins = [];
  let webpackLoaders = [];
  plugins.forEach(function (plugin) {
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isHotDev && plugin.env.indexOf('hot-dev') > -1) webpackPlugins.push(plugin.res);
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isDev && plugin.env.indexOf('dev') > -1) webpackPlugins.push(plugin.res);
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isProd && plugin.env.indexOf('prod') > -1) webpackPlugins.push(plugin.res);
    if((_.isUndefined(plugin.enabled) || plugin.enabled === true) && isDeploy && plugin.env.indexOf('deploy') > -1) webpackPlugins.push(plugin.res);
  });
  loaders.forEach(function (loader) {
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isHotDev && loader.env.indexOf('hot-dev') > -1) webpackLoaders.push(loader.res);
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isDev && loader.env.indexOf('dev') > -1) webpackLoaders.push(loader.res);
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isProd && loader.env.indexOf('prod') > -1) webpackLoaders.push(loader.res);
    if((_.isUndefined(loader.enabled) || loader.enabled === true) && isDeploy && loader.env.indexOf('deploy') > -1) webpackLoaders.push(loader.res);
  });
  //配置出口信息
  const webpackOutput = {
    path: sails.paths.tmpAssets,
    filename: 'javascript/[name].[chunkHash:8].js',
    chunkFilename: 'javascript/[name].chunk.[chunkHash:8].js',
    publicPath: '/',
    crossOriginLoading: 'anonymous'
  };
  if(isDeploy) webpackOutput.path = sails.paths.wwwAssets;
  if(isDeploy) webpackOutput.publicPath = sails.macros.KCdnUrl + '/assets/';
  if(isDev || isHotDev) webpackOutput.filename = 'javascript/[name].js';
  if(isDev || isHotDev) webpackOutput.chunkFilename = 'javascript/[name].chunk.js';
  if(isChildDev) webpackOutput.publicPath = '/childName/';
  //获取开发启动页配置数据
  const devLaunchConfigPath = path.join(__dirname, '../.devlaunch');
  let devLaunchPages = [];
  if((isDev || isHotDev) && fs.existsSync(devLaunchConfigPath)) {
    const devLaunchConfigData = JSON.parse(
      fs.readFileSync(devLaunchConfigPath, 'utf-8') || '{}');
    if(devLaunchConfigData.pages) {
      devLaunchPages = _.uniq(_.compact(devLaunchConfigData.pages));
    }
  }
  //设置入口项和页面配置
  const webpackEntryPages = {};
  sails.config.pages.pages.forEach(function (obj) {
    if(devLaunchPages.length > 0 && devLaunchPages.indexOf(obj.name) < 0) return;
    if(obj.mainJs) webpackEntryPages['chunk-' + obj.name] = sails.paths.assetJs + obj.mainJs;
    const chunks = _.union(obj.otherJs || [], ['chunk-' + obj.name]);
    let templateOutput = sails.paths._pages + obj.mainHtml;
    if(obj.isStatic) {
      const dirPath = isDeploy
        ? sails.paths.wwwPages
        : sails.paths.tmpPages;
      templateOutput = dirPath + '/' + obj.name + '.html';
    }
    webpackPlugins.push(
      new HtmlWebpackInjectPlugin({
        development: isDev || isHotDev,
        templatePath: sails.paths.pages + obj.mainHtml,
        parseTemplate: obj.isStatic,
        output: templateOutput,
        publicPath: webpackOutput.publicPath,
        title: obj.title || 'Sails App',
        keywords: (obj.keywords || []).join(','),
        description: obj.description || '',
        chunks: chunks,
        templateOptions: {
          escape: false,
          debug: false,
          minimize: true,
          imports: {
            stringify: JSON.stringify,
          },
        },
        templateData: {
          sails: {
            env: sails.env,
            debug: sails.debug,
            publicMacros: sails.publicMacros,
          },
          device: {},
        }
      })
    );
  });

  //设置入口文件
  const webpackEntry = _.extend(
    {},
    sails.config.pages.libraries || {},
    webpackEntryPages
  );
  if(isHotDev) {
    webpackEntry['libs'].unshift('webpack/hot/dev-server');
    webpackEntry['libs'].unshift('webpack-dev-server/client?'+ sails.macros.KDebugHostUrl +':3000/');
  }
  const optimization = {};
  if(isDeploy || isProd) {
    optimization.splitChunks = {
      chunks: 'all',
      minChunks: 2,
      minSize: 1000 * 1000,
      maxSize: 1000 * 1000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        common: {
          name: 'libs',
          chunks: 'all',
          priority: 10,
          minChunks: 2,
        },
      }
    }
  }
  return {
    config: {
      options: {
        mode: sails.config.environment,
        resolve: {
          extensions: [".js", ".json", ".jsx", ".css", ".scss", ".hbs", ".vue"],
          alias: paths,
        },
        entry: webpackEntry,
        output: webpackOutput,
        devtool: isDev || isHotDev ? 'none' : 'source-map',
        performance: {
          hints: false,
        },
        module: {
          rules: webpackLoaders
        },
        plugins: webpackPlugins,
        optimization: optimization,
      }
    },
    hotMode: {
      webpack: null,
      config: {
        hot: true,
        port: 3000,
        lazy: true,
        filename: 'bundle.js',
        contentBase: sails.paths.tmpAssets,
        publicPath: '/',
        noInfo: true,
        disableHostCheck: true,
        writeToDisk: true,
        inline: true,
        proxy: {
          '*': {
            target: sails.macros.KDebugHostUrl + ':1337'
          }
        }
      },
    },
  }
};

