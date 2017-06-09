module.exports = function (gulp, sails) {
  gulp.task('copy-assets', ['clear-tmp'], function() {
    return gulp.src([
      `${sails.paths.assets}/**/*`,
      //排除以下webpack打包使用的目录
      `!${sails.paths.assets}/{fonts,fonts/**}`,
      `!${sails.paths.assets}/{images,images/**}`,
      `!${sails.paths.assets}/{js,js/**}`,
      `!${sails.paths.assets}/{libs,libs/**}`,
      `!${sails.paths.assets}/{styles,styles/**}`,
      `!${sails.paths.assets}/{templates,templates/**}`
    ]).pipe(gulp.dest(sails.config.deploy ? sails.paths.www : sails.paths.tmpAssets));
  });
  return gulp;
};
