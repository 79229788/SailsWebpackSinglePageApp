module.exports = function (gulp, sails) {
  return {
    tasks: {
      copyViews: function () {
        if(sails.debug) console.log('gulp执行任务[copyViews]');
        return gulp.src(sails.paths.pages + '/**/*')
          .pipe(gulp.dest(sails.paths._pages));
      },
    },
    watchs: {
      watchCopyViewsLayout: function () {
        gulp.watch(sails.paths.pages + '/layout/**/*', function () {
          gulp.src(sails.paths.pages + '/layout/**/*')
            .pipe(gulp.dest(sails.paths._pages + '/layout'));
        });
      },
    },
  }
};
