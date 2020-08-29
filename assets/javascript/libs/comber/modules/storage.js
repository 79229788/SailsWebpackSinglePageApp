import Comber from "../cb";
import utils from '../utils/common';
import _extend from 'lodash/extend';
import _isObject from 'lodash/isObject';

//********************************定义缓存类
//********************************
//********************************
const Storage = function() {
  this.config = _extend({
    maxSize: 2000,
    clearSize: 1800,
    separator: '@CACHE',
  }, Comber.Storage.config);
};
_extend(Storage.prototype, {
  /**
   * 自动清理缓存数据(清理浏览时间最早的数据)
   * @param type    存储类型(localStorage、sessionStorage)
   */
  autoClearStorage: function (type) {
    const currSize = utils.getStorageSize(type);
    console.log(
      '当前缓存空间---' + Math.round(currSize) + 'KB',
      this.config.clearSize + 'KB时将要自动清理!'
    );
    if(currSize > this.config.clearSize) {
      console.log('开始清理缓存');
      let objects = [];
      const storage = utils.getStorage(type);
      for(let key in storage) {
        const valueArr = storage[key].split(this.config.separator);
        if(valueArr.length > 1) {
          objects.push({
            key: key,
            value: valueArr[1],
            time: valueArr[0],
          });
        }
      }
      //时间从早到晚排列
      objects = objects.sort(function (a, b) {
        return b.time - a.time;
      });
      //删除溢出的数据
      while (utils.getStorageSize(type) > this.config.clearSize) {
        const delObj = objects.pop();
        const delKey = delObj.key;
        console.log('清理缓存---' + delKey);
        storage.removeItem(delKey);
      }
    }
  },
  /**
   * 获取本地数据
   * @param key
   * @param type
   * @return {string}
   */
  getStorage: function (key, type) {
    const storageValue = utils.getStorage(type).getItem('@CB_' + key);
    if(storageValue) {
      const valueArr = storageValue.split(this.config.separator);
      return valueArr[valueArr.length > 1 ? 1 : 0];
    }
    return null;
  },
  /**
   * 获取本地数据（对象）
   * @param key
   * @param type
   * @return {object}
   */
  getObjectStorage: function (key, type) {
    try {
      return JSON.parse(this.getStorage('@CB_' + key, type)) || {};
    }catch (error) {
      return {};
    }
  },
  /**
   * 设置本地数据
   * @param key
   * @param value
   * @param type
   */
  setStorage: function (key, value, type) {
    value = _isObject(value) ? JSON.stringify(value) : value;
    value = (new Date()).getTime() + this.config.separator + value;
    utils.getStorage(type).setItem('@CB_' + key, value);
    this.autoClearStorage(type);
  },
  /**
   * 设置安全本地数据(不会被自动删除)
   * @param key
   * @param value
   * @param type
   */
  setSafeStorage: function (key, value, type) {
    utils.getStorage(type).setItem('@CB_' + key, value);
    this.autoClearStorage(type);
  },
  /**
   * 删除本地数据
   * @param key
   * @param type
   */
  deleteStorage: function (key, type) {
    utils.getStorage(type).removeItem('@CB_' + key);
  },
  /**
   * 删除本地数据(通过前缀进行批量删除)
   * @param keyPrefix
   * @param type
   */
  deleteStorageWithPrefix: function (keyPrefix, type) {
    const storage = utils.getStorage(type);
    for (let key in storage) {
      if(key.indexOf(keyPrefix) > -1) {
        storage.removeItem(key);
      }
    }
  },
  /**
   * 删除本地数据(排除指定前缀进行批量删除)
   * @param keyPrefix
   * @param type
   */
  deleteStorageExceptPrefix: function (keyPrefix, type) {
    const storage = utils.getStorage(type);
    for (let key in storage) {
      if(key.indexOf(keyPrefix) > -1) continue;
      storage.removeItem(key);
    }
  },
  /**
   * 清除所有缓存[仅仅删除通过本库创建的缓存]
   * @param type
   */
  clearStorage: function (type) {
    this.deleteStorageWithPrefix('@CB_', type);
  },

});

export default Storage;
