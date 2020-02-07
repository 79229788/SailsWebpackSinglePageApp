//https://webpack.js.org/configuration/
const _ = require('lodash');
const HtmlWebpackInjectPlugin = require('../node_plugins/html-webpack-inject-plugin');

module.exports.webpack = function (sails) {
  const plugins = sails.config['webpack-plugins'](sails);
  const loaders = sails.config['webpack-loaders'](sails);
  const paths = sails.config['webpack-paths'](sails);
  const isDev = sails.config.environment === 'development' && !sails.config.hot;
  const isHotDev = sails.config.environment === 'development' && !!sails.config.hot;
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
  //设置入口项和页面配置
  const webpackEntryPages = {};
  sails.config.pages.pages.forEach(function (obj) {
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
        templatePath: sails.paths.pages + obj.mainHtml,
        parseTemplate: obj.isStatic,
        output: templateOutput,
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
          sails: {},
          device: {},
        }
      })
    );
  });

  //入口文件
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
      minSize: 10 * 1000,
      maxSize: 500 * 1000,
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
        output: {
          path: isDeploy ? sails.paths.wwwAssets : sails.paths.tmpAssets,
          filename: isHotDev ? 'javascript/[name].[hash:8].js' : 'javascript/[name].[chunkHash:8].js',
          chunkFilename: isHotDev ? 'javascript/[name].chunk.[hash:8].js' : 'javascript/[name].chunk.[chunkHash:8].js',
          publicPath: isDeploy ? (sails.macros.KCdnUrl + '/assets/') : '/',
          crossOriginLoading: 'anonymous',
        },
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

