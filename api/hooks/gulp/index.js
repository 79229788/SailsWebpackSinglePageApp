/**
 * gulp hook
 */
const gulp = require('gulp');
module.exports = function (sails) {
  return {
    initialize: function (next) {
      sails.after('lifted', () => {
        let runGulp = gulp;
        File.getFilePathList(sails.paths.root + '/tasks/action').then(paths => {
          paths.forEach(function (path) {
            runGulp = require(path)(runGulp, sails);
          });
          if(sails.config.prod && sails.config.fast) {
            require(sails.paths.root + '/tasks/register/prodFast.js')(runGulp, sails);
          }else if(sails.config.prod && sails.config.deploy) {
            require(sails.paths.root + '/tasks/register/prodDeploy.js')(runGulp, sails);
          }else if(sails.config.only && sails.config.deploy) {
            require(sails.paths.root + '/tasks/register/onlyDeploy.js')(runGulp, sails);
          }else if(sails.config.prod) {
            require(sails.paths.root + '/tasks/register/prod.js')(runGulp, sails);
          }else if(sails.config.environment === 'development' && sails.config.hot) {
            require(sails.paths.root + '/tasks/register/devHot.js')(runGulp, sails);
          }else if(sails.config.environment === 'development'){
            require(sails.paths.root + '/tasks/register/dev.js')(runGulp, sails);
          }
        }).catch(error => {
          sails.log.error(error);
        });
      });
      return next();
    }

  };
};
