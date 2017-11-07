const _ = require('lodash');
module.exports = function sendError(code, message) {
  let _code = 500;
  let _message = '未知错误';
  if(_.isObject(code)) {
    if(code.code) _code = code.code;
    if(code.message) _message = code.message;
  }else {
    if(message) {
      _code = code;
      _message = message;
    }else {
      _message = code;
    }
  }
  return this.res.send(500, RewriteError(_code, _message));
};


