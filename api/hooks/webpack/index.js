const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

module.exports = function (sails) {
  return {
    initialize: function (next) {
      sails.after('lifted', () => {
        if(sails.config.prod && sails.config.fast) return;
        if(sails.config.deploy && sails.config.only) return require('../../deploy/index').deploy(sails);
        const sailsWebpack = sails.config.webpack(sails);
        this.webpackConfig = sailsWebpack.config;
        this.webpackHotMode = sailsWebpack.hotMode;
        this.compiler = webpack(
          Object.assign(this.webpackConfig.options, this.webpackHotMode.webpack),
          (err, stats) => {
            if(err) throw err;
            sails.log.info('sails-webpack: compiler loaded.');
            sails.log.silly('sails-webpack: ', stats.toString());
            if(sails.config.environment === 'development') {
              sails.log.info('sails-webpack: watching...');
              this.compiler.watch(this.webpackConfig.watchOptions || {}, this.afterBuild);
            }else {
              sails.log.info('sails-webpack: running...');
              this.compiler.run(this.afterBuild);
            }
          });
        if(sails.config.hot
          && sails.config.environment === 'development') {
          this.hotModeStart();
        }
      });
      return next();
    },
    //**********热模式启动
    hotModeStart: function () {
      this.webpackHotMode.config = Object.assign({
        hot: true,
        port: 3000,
      }, this.webpackHotMode.config);
      this.devServer = new WebpackDevServer(
        this.compiler,
        this.webpackHotMode.config
      );
      this.devServer.listen(this.webpackHotMode.config.port);
    },
    //**********构建完成
    afterBuild: function (err, rawStats) {
      if(err) return sails.log.error('sails-webpack: FATAL ERROR', err);
      const stats = rawStats.toJson();
      if(sails.debug && !sails.config.deploy) {
        sails.log.info('sails-webpack: Build Info\n' + rawStats.toString({
          colors: true,
          chunks: false
        }));
      }else {
        sails.log.info('sails-webpack: Build Completion!');
      }
      if(stats.errors.length > 0) {
        sails.log.error('sails-webpack:', stats.errors);
      }
      if(stats.warnings.length > 0) {
        sails.log.warn('sails-webpack:', stats.warnings);
      }
      //如果为部署启动，则进行部署操作(一般是进行上传至cdn源站的操作，请在api/deploy/index.js中实现上传逻辑)
      if(sails.config.prod && sails.config.deploy) {
        require('../../deploy/index').deploy(sails);
      }
    }
  };
};
