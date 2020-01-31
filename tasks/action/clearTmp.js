const FileUtils = require('../utils/FileUtils');
const del = require('del');
const _ = require('lodash');
module.exports = function (gulp, sails) {
  return {
    tasks: {
      clearTmp: function (cb) {
        if(sails.debug) console.log('gulp执行任务[clearTmp]');
        (async () => {
          const pageFiles = (await FileUtils.getFilePathList(sails.paths.pages))
            .map(item => item.replace('/pages/', '/views/'));
          const tmpPageFiles = await FileUtils.getFilePathList(sails.paths._pages);
          const diffPages = _.difference(tmpPageFiles, pageFiles);
          await del([
            sails.paths.tmpAssets,
            sails.paths.www,
            sails.paths.wwwPages,
          ].concat(diffPages));
          cb();
        })().catch(error => {
          throw error;
        });
      }
    },
  }
};
