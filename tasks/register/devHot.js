module.exports = function (gulp) {
  gulp.start([
    'copy-views',
    'copy-assets',
    'watch-copy-views-layout'
  ]);
};
