module.exports = function (gulp) {
  gulp.startTasks([
    'clearTmp',
    'copyViews',
    'copyAssets',
  ]);
};
