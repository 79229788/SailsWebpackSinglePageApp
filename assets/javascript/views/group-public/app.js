import _each from 'lodash/each';
import _isObject from 'lodash/isObject';
import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _base from 'utils/base';

/**
 * 打印日志
 * @param data
 */
app.log = function (...data) {
  if(app.debug) {
    data.unshift(_base.getDate('HH:mm:ss'));
    try {
      throw new Error('');
    } catch (error) {
      const stacks = (error.stack || '').split('\n');
      let reposition = 0;
      if(stacks.length >= 3) reposition = 2;
      if(stacks.length < 3) reposition = stacks.length - 1;
      const lastStack = stacks[reposition].trim();
      data.push('\n' + lastStack);
    }
    console.log.apply(console, data);
  }
};
/**
 * 打印错误
 * @param name
 * @param error
 */
app.logError = function (name, error) {
  if(!error) return;
  try {
    throw new Error('');
  } catch (e) {
    try {
      error.message = `[${_base.getDate('HH:mm:ss')}] ${name}:` + (error.message || '');
      const stackSplit = (e.stack || '').split('\n');
      let reposition = 0;
      if(stackSplit.length >= 3) reposition = 2;
      if(stackSplit.length < 3) reposition = stackSplit.length - 1;
      const realStack = stackSplit.slice(reposition, stackSplit.length);
      if(!error.stack) {
        realStack.unshift(error.message);
        error.stack = realStack.join('\n');
      }else {
        error.stack = error.message + '\n' + error.stack + '\n' + realStack.join('\n');
      }
    }catch (e) {}
  }
  if(app.debug) console.error(error);
  if(app.logger) app.logger.uploadPrintedError(error);
};
/**
 * 检查是否为本地网络访问
 * @return {boolean}
 */
app.localhostAccess = function () {
  return app.debug
    && (location.hostname === 'localhost'
      || location.hostname.replace(/\./g, '').match(/^\d*$/)
    );
};
/**
 * 对象转url参数
 * @param object
 * @return {string}
 */
app.object2urlParams = function (object) {
  const params = [];
  _each(object, (value, key) => {
    params.push(`${key}=${value}`);
  });
  return params.join('&');
};
/**
 * url参数转对象
 * @param urlParams
 * @return {string}
 */
app.urlParams2object = function (urlParams) {
  const object = {};
  const params = urlParams.split('&');
  params.forEach(param => {
    const data = param.split('=');
    object[data[0]] = data[1];
  });
  return object;
};
/**
 * 图片链接或对象中http转https
 * @param url
 * @return {*}
 */
app.http2https = function (url) {
  if(!url) return null;
  if(_isObject(url) && url.url) {
    url.url = url.url.replace(/^http:/, 'https:');
    return url;
  }
  if(_isString(url)) {
    return url.replace(/^http:/, 'https:');
  }
  if(_isArray(url)) {
    const urls = [];
    url.forEach(item => {
      urls.push(app.http2https(item));
    });
    return urls;
  }
  return url;
};

