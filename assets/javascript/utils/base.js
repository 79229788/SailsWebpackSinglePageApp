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
  /**
   * 对比版本
   * @param v1
   * @param v2
   * @return {number}
   */
  compareVersion: function(v1, v2) {
    if(!v1 || !v2) return -1;
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);
    while(v1.length < len) v1.push('0');
    while(v2.length < len) v2.push('0');
    for(let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])
      if(num1 > num2) return 1;
      if(num1 < num2) return -1;
    }
    return 0;
  },
  /**
   * 检查身份证格式是否合法
   * @param idCard
   * @return {boolean}
   */
  checkIdCard: function(idCard) {
    // 15位和18位身份证号码的正则表达式
    const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    // 如果通过该验证，说明身份证格式正确，但准确性还需计算
    if(regIdCard.test(idCard)) {
      if(idCard.length === 18) {
        // 将前17位加权因子保存在数组里
        const idCardWi = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
        // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
        const idCardY = new Array(1,0,10,9,8,7,6,5,4,3,2);
        // 用来保存前17位各自乖以加权因子后的总和
        let idCardWiSum = 0;
        for(let i = 0; i < 17; i++) {
          idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
        }
        const idCardMod = idCardWiSum % 11;// 计算出校验码所在数组的位置
        const idCardLast = idCard.slice(-1);// 得到最后一位身份证号码
        // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if(idCardMod === 2) {
          return idCardLast === 'X' || idCardLast === 'x';
        }else {
          // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          return Number(idCardLast) === idCardY[idCardMod];
        }
      }
      return true;
    }
    return false;
  },
};
