const _ = require('lodash');
module.exports = function sendError(data, code, message) {
  let _code = 500;
  let _message = '未知错误';
  if(_.isObject(data)) {
    if(data.code) _code = data.code;
    if(data.message) _message = data.message;
  }else {
    _message = data + '';
  }
  if(code) _code = code;
  if(message) _message = message;
  return this.res.send(500, { code: _code, message: _message });
};

