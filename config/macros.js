/**
 * 项目的常用全局数据
 */
const path = require('path');
const _ = require('lodash');
module.exports.macros = function (sails) {
  const rootPath = path.resolve(__dirname, '../');
  sails.debug = sails.config.environment !== 'production';
  sails.deploy = sails.config.deploy;
  sails.env = sails.config.environment === 'production' ? 'prod' : 'dev';
  sails.paths = {
    root: rootPath,
    www: rootPath + '/www',             //网站部署目录（--deploy 状态生成）
    wwwPages: rootPath + '/www-pages',  //网站静态页部署目录（--deploy 状态生成）
    wwwAssets: rootPath + '/www/assets',
    tmpPages: rootPath + '/.tmp/public/pages',
    tmpAssets: rootPath + '/.tmp/public',
    assets: rootPath + '/assets',
    assetJs: rootPath + '/assets/javascript',
    assetJsView: rootPath + '/assets/javascript/views',
    assetLib: rootPath + '/assets/library',
    pages: rootPath + '/pages',
    _pages: rootPath + '/views',
    config: rootPath + '/config',
  };
  //**********全局宏，前端、后端共享(不支持方法) -- 在前端使用app.macros调用
  sails.publicMacros = {
    //网站域名
    KWebUrl: sails.debug ? 'http://dev.net' : 'https://.net',
    //cdn域名
    KCdnUrl: 'http://cdn.com',
    //调试域名
    KDebugUrl: 'http://localhost:1337',
  };
  //**********全局宏，仅仅用于后端(支持方法，存放敏感信息)
  sails.privateMacros = {
    //调试主机地址（仅在webpack热更新时使用，端口为3000）
    KDebugHostUrl: 'http://localhost',
  };
  sails.macros = sails.config.macros = _.extend({}, sails.publicMacros, sails.privateMacros);


};
