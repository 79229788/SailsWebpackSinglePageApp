const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
module.exports = function (gulp, sails) {
  const destPath = sails.config.deploy
    ? sails.paths.wwwAssets
    : sails.paths.tmpAssets;
  const handleAssetsStaticJS = function () {
    if(sails.debug) console.log('gulp执行任务[handleAssetsStaticJS]');
    return gulp.src(`${sails.paths.assets}/statics/js/**/*`)
      .pipe(babel({
        presets: ['@babel/env'],
        plugins: ['@babel/syntax-dynamic-import']
      }))
      .pipe(gulpIf(() => sails.config.prod && sails.config.deploy, uglify()))
      .pipe(gulp.dest(`${destPath}/statics/js`));
  };
  const handleAssetsStaticCSS = function () {
    if(sails.debug) console.log('gulp执行任务[handleAssetsStaticCSS]');
    return gulp.src(`${sails.paths.assets}/statics/css/**/*`)
      .pipe(gulpIf(file => file.extname === '.scss', sass()))
      .pipe(gulpIf(file => file.extname === '.less', less()))
      .pipe(gulpIf(() => sails.config.prod && sails.config.deploy, cleanCSS()))
      .pipe(gulp.dest(`${destPath}/statics/css`));
  };
  return {
    tasks: {
      copyAssets: gulp.series(
        function () {
          if(sails.debug) console.log('gulp执行任务[copyAssets]');
          return gulp.src([
            `${sails.paths.assets}/**/*`,
            //排除以下webpack打包使用的目录
            `!${sails.paths.assets}/{fonts,fonts/**}`,
            `!${sails.paths.assets}/{images,images/**}`,
            `!${sails.paths.assets}/{javascript,javascript/**}`,
            `!${sails.paths.assets}/{library,library/**}`,
            `!${sails.paths.assets}/{styles,styles/**}`,
            //排除以下资源文件
            `!${sails.paths.assets}/{templates,templates/**}`,
            `!${sails.paths.assets}/statics/**/*.{scss,less}`,
          ]).pipe(gulp.dest(destPath));
        },
        handleAssetsStaticJS,
        handleAssetsStaticCSS,
      ),
    },
    watchs: {
      watchCopyAssetsStatic: function () {
        gulp.watch(`${sails.paths.assets}/statics/**/*`, gulp.series(
          function () {
            return gulp.src(`${sails.paths.assets}/statics/**/*`)
              .pipe(gulp.dest(`${destPath}/statics`));
          },
          handleAssetsStaticJS,
          handleAssetsStaticCSS,
        ));
      }
    }
  }
};
