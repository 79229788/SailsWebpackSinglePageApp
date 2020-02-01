import _random from 'lodash/random';
import _isDate from 'lodash/isDate';

export default {
  /**
   * 函数执行一次 (可随时重置)
   * @param fn
   * @return {f}
   * @private
   */
  once: function(fn) {
    const f = function() {
      if(f.reset === false) return;
      f.reset = false;
      return fn.apply(f, arguments);
    };
    return f;
  },
  /**
   * 获取随机字符串
   * @param length
   * @return {string}
   */
  getRandomString: function(length) {
    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let s = "";
    for(let i = 0; i < length; i++){
      const rand = Math.floor(Math.random() * str.length);
      s += str.charAt(rand);
    }
    return s;
  },
  /**
   * 获取格式化的日期
   * @param format
   * @param date 指定带格式化的日期
   * @return {*}
   */
  getDate: function(format, date) {
    date = date || new Date();
    if(!_isDate(date)) {
      date = date.replace(/-/g, '/');
      const dateSplit = date.split('/');
      if(dateSplit.length === 2) date += this.getDate('/DD');
      if(dateSplit.length === 1) date += this.getDate('/MM/DD');
      if(dateSplit.length === 0) date = `${this.getDate('YYYY/MM/DD')} ` + date;
      date = new Date(date);
    }
    if(!format) return date;
    const o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    };
    const week = {
      '0': '\u65e5',
      '1': '\u4e00',
      '2': '\u4e8c',
      '3': '\u4e09',
      '4': '\u56db',
      '5': '\u4e94',
      '6': '\u516d'
    };
    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(format)) {
      format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return format
  },
  /**
   * 获取指定间隔[天]今天的日期
   * @param format
   * @param interval
   * @param type
   * @return {*}
   */
  getDateFromNowWithInterval: function (format, interval, type) {
    const date = new Date();
    switch (type) {
      case 'minutes':
        date.setMinutes(date.getMinutes() + interval);
        break;
      case 'hours':
        date.setHours(date.getHours() + interval);
        break;
      case 'days':
        date.setDate(date.getDate() + interval);
        break;
      case 'months':
        date.setMonth(date.getMonth() + interval);
        break;
      case 'years':
        date.setFullYear(date.getFullYear() + interval);
        break;
    }

    return format ? this.getDate(format, date) : date;
  },
  /**
   * 获取指定间隔[天]今天的日期
   * @param format
   * @param intervalDay
   * @return {*}
   */
  getDateFromNowWithDay: function (format, intervalDay) {
    return this.getDateFromNowWithInterval(format, intervalDay, 'days');
  },
  /**
   * 获取指定间隔[月]今天的日期
   * @param format
   * @param intervalMonth
   * @return {*}
   */
  getDateFromNowWithMonth: function (format, intervalMonth) {
    return this.getDateFromNowWithInterval(format, intervalMonth, 'months');
  },
  /**
   * 获取指定间隔[年]今天的日期
   * @param format
   * @param intervalYear
   * @return {*}
   */
  getDateFromNowWithYear: function (format, intervalYear) {
    return this.getDateFromNowWithInterval(format, intervalYear, 'years');
  },
  /**
   * 获取2个时间的间隔天数
   * @param fromDate
   * @param toDate
   */
  getIntervalDays: function (fromDate, toDate) {
    return this.getDatesInterval(fromDate, toDate, 'days');
  },
  /**
   * 获取2个时间的间隔时间
   * @param fromDate
   * @param toDate
   * @param type
   */
  getDatesInterval: function (fromDate, toDate, type = 'days') {
    if(!fromDate || !toDate) return 0;
    const fromDateTimestamp = _isDate(fromDate) ? fromDate.getTime() : Date.parse(fromDate.replace(/-/g, '/'));
    const toDateTimestamp = _isDate(toDate) ? toDate.getTime() : Date.parse(toDate.replace(/-/g, '/'));
    const milliseconds = toDateTimestamp - fromDateTimestamp;
    let time = 0;
    if(type === 'days') time = 1000 * 60 * 60 * 24;
    if(type === 'hours') time = 1000 * 60 * 60;
    if(type === 'minutes') time = 1000 * 60;
    if(type === 'seconds') time = 1000;
    return Math.floor(milliseconds / time);
  },
  /**
   * 解析隐式换行
   * @param text
   * @return {*}
   */
  decodeImplicitWrap: function (text) {
    if(!text) return null;
    return text
      .replace(/\r\n/g, '<br/>')
      .replace(/\n/g, '<br/>')
      .replace(/\s/g, '&nbsp;');
  },
  /**
   * 编译隐式换行
   * @param text
   * @return {*}
   */
  encodeImplicitWrap: function (text) {
    if(!text) return null;
    return text
      .replace(/\<br\/\>/g, '\n')
      .replace(/&nbsp;/g, ' ');
  },
  /**
   * 简单加密字符串
   * @param code
   * @return {string}
   */
  compileStr: function (code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for(let i = 1; i< code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
  },
  /**
   * 简单解密字符串
   * @param code
   * @return {string}
   */
  decompileStr: function (code) {
    code = unescape(code);
    let c=String.fromCharCode(code.charCodeAt(0) - code.length);
    for(let i = 1; i< code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  },
  /**
   * 获取唯一时间编码（弱并发，用于简单简单场景）
   * @return {string}
   */
  getUniqueTimeCode: function() {
    const date = new Date();
    return ''
      + (date.getFullYear() + '').slice(2)
      + ((date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1))
      + ((date.getDate() < 10 ? '0' : '') + date.getDate())
      + ((date.getHours() < 10 ? '0' : '') + date.getHours())
      + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes())
      + ((date.getSeconds() < 10 ? '0' : '') + date.getSeconds())
      + _random(1000, 9999);
  },
  /**
   * 颜色16进制转RGB
   * @param hexColor
   * @param opacity
   * @return {string}
   */
  toRGB: function (hexColor, opacity = 1) {
    let hex = hexColor.replace('#', '');
    if([3, 6].indexOf(hex.length) < 0) return console.error('toRGB中出现错误的颜色值!');
    if(hex.length === 3) hex += hex;
    const values = [];
    for(let i = 0; i < 3; i ++) {
      const sec = hex.slice(i * 2, i * 2 + 2);
      values.push(parseInt(sec, 16));
    }
    return `rgba(${values.join(',')}, ${opacity})`;
  },
  /**
   * 判断当前是否为PC浏览器
   */
  isPC: function () {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = [
      'android', 'iphone', 'midp', 'rv:1.2.3.4',
      'ucweb', 'windows ce', 'windows mobile',
      'symbianos', 'windows phone', 'ipad', 'ipod'
    ];
    var flag = true;
    for(var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  },
};
