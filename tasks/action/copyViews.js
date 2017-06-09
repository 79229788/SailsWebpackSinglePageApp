module.exports = function (gulp, sails) {
  gulp.task('copy-views', function() {
    return gulp.src(sails.paths.pages + '/**/*').pipe(gulp.dest(sails.paths._pages));
  });
  gulp.task('watch-copy-views-layout', function() {
    return gulp.watch(sails.paths.pages + '/layout/**/*', function () {
      gulp.src(sails.paths.pages + '/layout/**/*').pipe(gulp.dest(sails.paths._pages + '/layout'));
    });
  });
  return gulp;
};
