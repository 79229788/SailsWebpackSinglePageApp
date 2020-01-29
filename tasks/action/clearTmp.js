const del = require('del');
module.exports = function (gulp, sails) {
  return {
    tasks: {
      clearTmp: function (cb) {
        if(sails.debug) console.log('gulp执行任务[clearTmp]');
        del([
          sails.paths.tmpAssets,
          sails.paths.www,
          `${sails.paths.www}-pages`
        ]).then(() => {
          cb();
        }).catch(error => {
          throw error;
        });
      }
    },
  }
};
