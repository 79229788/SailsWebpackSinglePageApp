const clean = require('gulp-clean');
module.exports = function (gulp, sails) {
  gulp.task('clear-tmp', function() {
    return gulp.src([sails.paths.tmp, sails.paths.www], {read: false}).pipe(clean());
  });
  return gulp;
};
