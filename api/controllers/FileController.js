/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');
const _path = require('path');
const _ = require('lodash');

module.exports = {
  /**
   * 判断文件/目录是否存在
   * @param path
   * @param cb
   */
  existFile: function (path, cb) {
    fs.exists(path, cb);
  },
  /**
   * 创建目录
   * @param dirPath   将创建的目录路径
   * @param mode      目录权限
   * @param cb        err
   */
  createDir: function (dirPath, mode, cb) {
    mode = mode || 0o777;
    this.existFile(dirPath, (exist) => {
      if(exist) {
        if (cb) cb();
      }else {
        this.createDir(_path.dirname(dirPath), mode, () => {
          fs.mkdir(dirPath, mode, cb);
        });
      }
    });
  },
  /**
   * 读取文件内容
   * @param dirPath   目录路径
   * @param filename  文件名
   * @param options   回调选项
   */
  readFile: function(dirPath, filename, options) {
    const opts = _.extend({
      success: function(data){},
      error: function(error){}
    }, options || {});
    const filePath = _path.join(dirPath, filename);
    this.existFile(filePath, (exist) => {
      if(exist) {
        fs.readFile(filePath, 'utf-8', (error, data) => {
          if(!error){
            opts.success(data);
          }else{
            opts.error(error);
          }
        });
      }else {
        opts.success('');
      }
    });
  },
  /**
   * 写入文件
   *
   * @param dirPath   目录路径
   * @param filename  文件名
   * @param text      写入文本
   * @param options   选项
   */
  writeFile: function(dirPath, filename, text, options) {
    const opts = _.extend({
      isOverride: true, //如果文件已存在，是否覆盖重写
      success: function(){},
      error: function(error){}
    }, options || {});
    const filePath = _path.join(dirPath, filename);
    this.existFile(filePath, (exist) => {
      if(!exist) {
        this.createDir(dirPath, null, (error) => {
          if(!error) {
            fs.writeFile(filePath, text, (error) => {
              if(!error) {
                opts.success()
              }else {
                opts.error(error);
              }
            });
          }else {
            opts.error(error);
          }
        });
      }else {
        if(opts.isOverride) {
          fs.writeFile(filePath, text, (error) => {
            if(!error) {
              opts.success()
            }else {
              opts.error(error);
            }
          });
        }else {
          opts.success()
        }
      }
    });
  },
  /**
   * 追加内容到文件
   *
   * @param dirPath   目录路径
   * @param filename  文件名
   * @param text      写入文本
   * @param options   选项
   */
  appendFile: function (dirPath, filename, text, options) {
    const opts = _.extend({
      success: function(){},
      error: function(error){}
    }, options || {});
    const filePath = _path.join(dirPath, filename);
    this.existFile(filePath, (exist) => {
      if(!exist) {
        this.createDir(dirPath, null, (error) => {
          if(!error) {
            fs.appendFile(filePath, text, (error) => {
              if(!error) {
                opts.success()
              }else {
                opts.error(error);
              }
            });
          }else {
            opts.error(error);
          }
        });
      }else {
        fs.appendFile(filePath, text, (error) => {
          if(!error) {
            opts.success()
          }else {
            opts.error(error);
          }
        });
      }
    });
  },
  /**
   * 获取文件列表
   * @param dirPath 目录路径
   * @param options
   */
  getFileList: function (dirPath, options) {
    const opts = _.extend({
      success: function(){},
      error: function(error){}
    }, options || {});
    const list = [];
    _.defer(function () {
      try {
        getList(dirPath);
        opts.success(list);
      }catch (error) {
        opts.error(error);
      }
    });
    function getList(dirPath) {
      const files = fs.readdirSync(dirPath);
      for(let index in files) {
        const file = files[index];
        if(typeof file === 'string' && file.indexOf('.') === 0 || typeof file === 'function') continue;
        const filePath = _path.join(dirPath, file);
        if(fs.lstatSync(filePath).isDirectory()) {
          getList(filePath);
        }else {
          list.push(filePath);
        }
      }
    }
  },

};

