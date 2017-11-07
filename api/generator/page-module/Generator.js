/**
 * Module dependencies
 */

const sails = require('sails');
const util = require('util');
const _ = require('lodash');
_.defaults = require('merge-defaults');


/**
 * sails-generate-page-module
 *
 * Usage:
 * `sails generate page module`
 *
 * @description Generates a page module
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */
  before: function (scope, cb) {
    if (!scope.args[0]) return cb( new Error('Please provide a name for this page module.') );
    if (!scope.rootPath) return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    _.defaults(scope, {createdAt: new Date()});
    //设置模板变量
    scope.groupName = scope.args[0];
    scope.pageName = scope.args[1];
    scope.moduleName = (scope.args[2] || 'name');
    scope.pageFullName = `${scope.groupName}-${scope.pageName}`;
    scope.moduleFullName = `${scope.pageFullName}-${scope.moduleName}`;

    //页面名驼峰命名
    const pageSections = scope.pageFullName.split('-').map(function (section, index) {
      if(index > 0) {
        return section.substring(0, 1).toUpperCase() + section.substring(1);
      }
      return section;
    });
    scope.pageCamelName = pageSections.join('');
    //模块名驼峰命名
    const moduleSections = scope.moduleFullName.split('-').map(function (section, index) {
      if(index > 0) {
        return section.substring(0, 1).toUpperCase() + section.substring(1);
      }
      return section;
    });
    scope.moduleCamelName = moduleSections.join('');
    //模块名驼峰命名(首字母也大写)
    scope.moduleFullCamelName = scope.moduleCamelName.substring(0, 1).toUpperCase() + scope.moduleCamelName.substring(1);

    cb();
  },


  /**
   * The files/folders to generate.
   * @type {Object}
   */
  targets: {
    './assets/javascript/views/:groupName/pages/:pageName/modules/:moduleName.vue': { template: 'module.template.js' },
  },


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};



/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  const DEFAULT_MESSAGE =
  'Issue encountered in generator "page":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-page`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}



