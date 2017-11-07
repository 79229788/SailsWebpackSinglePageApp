<script>
  /**
   * 获取URL参数
   * @param key         参数名
   * @param urlSearch   指定url参数部分
   * @returns string
   */
  app.getUrlParam = function (key, urlSearch) {
    var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
    var match = (urlSearch ? urlSearch : window.location.search).substr(1).match(reg);

    if(match != null) return match[2]; return null;
  };
  /**
   * 设置URL参数(会放入history中)
   * @param key     参数名
   * @param value   参数值
   * @param state   状态对象
   */
  app.pushUrlParam = function (key, value, state) {
    var search = window.location.search;
    if(search.indexOf(key) < 0) {
      search += (search.indexOf('?') < 0 ? '?' : '&') + key + '=' + value;
    }else {
      var reg = new RegExp('([\?&]'+ key +'=)([\s\S]*[^\?&])*([\?&]?)');
      search = search.replace(reg, '$1'+ value +'$3');
    }
    window.history.pushState(state, '', search);
  };
  /**
   * 设置URL(会放入history中)
   * @param url     url
   * @param state   状态对象
   */
  app.pushUrl = function (url, state) {
    window.history.pushState(state, '', url);
  };
  /**
   * 替换URL参数
   * @param key     参数名
   * @param value   参数值
   * @param state   状态对象
   */
  app.replaceUrlParam = function (key, value, state) {
    var search = window.location.search;
    if(search.indexOf(key) < 0) {
      search += (search.indexOf('?') < 0 ? '?' : '&') + key + '=' + value;
    }else {
      var reg = new RegExp('([\?&]'+ key +'=)([\s\S]*[^\?&])*([\?&]?)');
      search = search.replace(reg, '$1'+ value +'$3');
    }
    window.history.replaceState(state, '', search);
  };
  /**
   * 删除URL参数
   * @param key 参数名
   */
  app.deleteUrlParam = function (key) {
    var reg = new RegExp('([\?&]'+ key +'=)([\s\S]*[^\?&])*([\?&]?)');
    var search = window.location.search.replace(reg, '$3').replace(/^&/, '?');
    window.history.replaceState({}, '', search ? search : window.location.pathname);
  };
  /**
   * 删除URL字符串参数
   * @param url URL字符串
   * @param key 参数名
   * @return URL
   */
  app.deleteUrlStringParam = function(url, key) {
    var urlArr = url.split('?');
    var origin = urlArr[0];
    var search = urlArr.length > 1 ? '?' + urlArr[1] : '';
    var reg = new RegExp('([\?&]'+ key +'=)([\s\S]*[^\?&])*([\?&]?)');
    return origin + search.replace(reg, '$3').replace(/^&/, '?')
  };
  /**
   * 拼接url参数
   * @param url url
   * @param paramsObj 参数对象
   * @returns {string}  完整url
   */
  app.joinUrlParam = function (url, paramsObj) {
    //Tool
    function merge_options(obj1,obj2){
      var obj3 = {};
      for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
    }
    //通过url，生成旧参数对象
    var oldObj = {};
    var urlArr = url.split('?');
    var paramStrArr = urlArr.length > 1 ? urlArr[1].split('&') : [];
    if (paramStrArr.length > 0) {
      for(var index in paramStrArr) {
        var paramArr = paramStrArr[index].split('=');
        oldObj[paramArr[0]] = paramArr[1];
      }
    }
    //新参数对象，去掉无用数据
    var newObj = {};
    if(paramsObj) {
      for(var key in paramsObj) {
        var value = paramsObj[key];
        if(value !== "" && value !== null && value !== undefined && value !== 'undefined' && value !== 'null') {
          newObj[key] = value;
        }
      }
    }
    //新旧对象合并。有重复则新覆盖旧
    var resObj = merge_options(oldObj, newObj);
    var urlSearchArr = [];
    for(var key in resObj) {
      var value = resObj[key];
      urlSearchArr.push(key + "=" + value);
    }
    return urlArr[0] + (urlSearchArr.length > 0 ? "?" + urlSearchArr.join('&') : '');
  };


</script>
