/**
 * 项目的常用全局数据
 */
const path = require('path');
const _ = require('lodash');
module.exports.macros = function (sails) {
  const rootPath = path.resolve(__dirname, '../');
  sails.debug = sails.config.environment !== 'production';
  sails.paths = {
    root: rootPath,
    www: rootPath + '/www',
    tmp: rootPath + '/.tmp/public',
    tmpAssets: rootPath + '/.tmp/public/assets',
    tmpPages: rootPath + '/.tmp/public/pages',
    assets: rootPath + '/assets',
    assetJs: rootPath + '/assets/js',
    assetJsView: rootPath + '/assets/js/views',
    assetLib: rootPath + '/assets/libs',
    pages: rootPath + '/pages',
    _pages: rootPath + '/views',
    config: rootPath + '/config',
  };
  //**********全局宏，前端、后端共享(不支持方法) -- 在前端使用app.macros调用
  sails.publicMacros = {
    //站点名称
    KWebsiteName: "Sails App",
    //调试主机地址（一般不要用）
    KDebugHostUrl: 'http://localhost',
    //CDN url
    KCdnUrl: 'http://cdn.com',
  };
  //**********全局宏，仅仅用于后端(支持方法，存放敏感信息)
  sails.privateMacros = {

  };
  sails.macros = sails.config.macros = _.extend({}, sails.publicMacros, sails.privateMacros);


};
