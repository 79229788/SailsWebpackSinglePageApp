const fs = require('fs');
const pathUtils = require('path');
const _ = require('lodash');

module.exports = {
  /**
   * 判断文件/目录是否存在
   * @param path
   */
  existFile: async function (path) {
    try {
      return fs.existsSync(path);
    }catch (error) {
      throw error;
    }
  },
  /**
   * 创建目录
   * @param dirPath
   * @param mode
   * @return {Promise.<void>}
   */
  createDir: async function (dirPath, mode) {
    try {
      mode = mode || 0o777;
      if(!fs.existsSync(dirPath)) {
        let pathTmp = '';
        const dirNames = dirPath.split('/');
        dirNames.shift();
        dirNames.forEach(dirName => {
          if(pathTmp) {
            pathTmp = pathUtils.join(pathTmp, dirName);
          }else {
            pathTmp = dirName;
          }
          if(!fs.existsSync('/' + pathTmp)) {
            fs.mkdirSync('/' + pathTmp, mode);
          }
        })
      }
    }catch (error) {
      throw error;
    }
  },
  /**
   * 读取文件内容
   * @param dirPath   目录路径
   * @param filename  文件名
   * @return {Promise.<string>}
   */
  readFile: async function (dirPath, filename = '') {
    try {
      const filePath = pathUtils.join(dirPath, filename);
      if(!fs.existsSync(dirPath)) return '';
      return fs.readFileSync(filePath, 'utf-8');
    }catch (error) {
      throw error;
    }
  },
  /**
   * 写入文件
   * @param dirPath     目录路径
   * @param filename    文件名
   * @param text        写入文本
   * @param isOverride  是否覆盖重写
   * @return {Promise.<void>}
   */
  writeFile: async function (dirPath, filename, text, isOverride = true) {
    try {
      const filePath = pathUtils.join(dirPath, filename);
      if(!fs.existsSync(dirPath)) {
        await this.createDir(dirPath);
        return fs.writeFileSync(filePath, text);
      }
      if(isOverride) fs.writeFileSync(filePath, text);
    }catch (error) {
      throw error;
    }
  },
  /**
   * 追加内容到文件
   *
   * @param dirPath   目录路径
   * @param filename  文件名
   * @param text      写入文本
   * @return {Promise.<*>}
   */
  appendFile: async function (dirPath, filename, text) {
    try {
      const filePath = pathUtils.join(dirPath, filename);
      if(!fs.existsSync(dirPath)) {
        await this.createDir(dirPath);
        return fs.appendFileSync(filePath, text);
      }
      if(isOverride) fs.appendFileSync(filePath, text);
    }catch (error) {
      throw error;
    }
  },
  /**
   * 获取文件列表
   * @param dirPath
   * @return {Promise.<Array>}
   */
  getFileList: async function (dirPath) {
    const files = [];
    const filePaths = await this.getFilePathList(dirPath);
    for(let path of filePaths) {
      files.push({
        path: path,
        file: fs.readFileSync(path)
      });
    }
    return files;
  },
  /**
   * 获取文件本地路径列表
   * @param dirPath 目录路径
   */
  getFilePathList: async function (dirPath) {
    const paths = [];
    (function getList(dirPath) {
      const files = fs.readdirSync(dirPath);
      for(let file of files) {
        if(typeof file === 'string' && file.indexOf('.') === 0 || typeof file === 'function') continue;
        const filePath = pathUtils.join(dirPath, file);
        if(fs.lstatSync(filePath).isDirectory()) {
          getList(filePath);
        }else {
          paths.push(filePath);
        }
      }
    })(dirPath);
    return paths;
  },

};

