/**
 * gulp hook
 */
const gulp = require('gulp');
gulp.tasks = {};
gulp.watchs = {};
gulp.startTasks = function (seriesNames, parallelNames) {
  const seriesTasks = [], parallelTasks = [];
  (seriesNames || []).forEach(name => {
    if(gulp.tasks[name]) seriesTasks.push(gulp.tasks[name]);
    if(gulp.watchs[name]) gulp.watchs[name]();
  });
  (parallelNames || []).forEach(name => {
    if(gulp.tasks[name]) parallelTasks.push(gulp.tasks[name]);
    if(gulp.watchs[name]) gulp.watchs[name]();
  });
  if(seriesTasks.length > 0 && parallelTasks.length === 0) {
    return gulp.series(...seriesTasks)();
  }
  if(parallelTasks.length > 0 && seriesTasks.length === 0) {
    return gulp.parallel(...parallelTasks)();
  }
  if(seriesTasks.length > 0 && parallelTasks.length > 0) {
    return gulp.series(...seriesTasks, gulp.parallel(...parallelTasks))();
  }
};
module.exports = function (sails) {
  return {
    initialize: function (next) {
      sails.after('lifted', () => {
        let runGulp = gulp;
        FileUtils.getFilePathList(
          sails.paths.root + '/tasks/action'
        ).then(paths => {
          paths.forEach((path) => {
            const data = require(path)(runGulp, sails);
            Object.assign(gulp.tasks, data.tasks);
            Object.assign(gulp.watchs, data.watchs);
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
