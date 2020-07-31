define(function () {
  return {
    /**
     * 判断有无class
     * @param el
     * @param cls
     * @return {boolean}
     */
    hasClass: function (el, cls) {
      cls = cls || '';
      if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
      return new RegExp(' ' + cls + ' ').test(' ' + el.className + ' ');
    },
    /**
     * 添加class
     * @param el
     * @param cls
     */
    addClass: function(el, cls) {
      if (!this.hasClass(el, cls)) {
        el.className = el.className === '' ? cls : el.className + ' ' + cls;
      }
    },
    /**
     * 移除class
     * @param el
     * @param cls
     */
    removeClass: function(el, cls) {
      if (this.hasClass(el, cls)) {
        let newClass = ' ' + el.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
          newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        el.className = newClass.replace(/^\s+|\s+$/g, '');
      }
    },
    /**
     * 移除元素
     * @param element
     */
    removeElement: function (element){
      try {
        const parentElement = element.parentNode;
        if(parentElement) parentElement.removeChild(element);
      } catch (error) {}
    },
    /**
     * 通过className获取元素
     * @param className
     * @param scopeId
     * @return {*}
     */
    getElements: function (className, scopeId) {
      const classObj = [];
      const scope = scopeId ? document.getElementById(scopeId) : document;
      const tags = scope.getElementsByTagName('*');
      let classIndex = 0;
      for(let i = 0; i < tags.length; i++) {
        if(tags[i].nodeType === 1){
          const elClass = tags[i].getAttribute('class');
          if(elClass && elClass.split(' ').indexOf(className) >= 0){
            classObj[classIndex] = tags[i];
            classIndex++;
          }
        }
      }
      return classObj;
    },
    /**
     * 获取内尺寸[不含border和padding]
     * @param selector
     * @return {{width: number, height: number}}
     */
    getInnerSizeWithSelector: function (selector) {
      let width = 0, height = 0;
      const $element = document.querySelector(selector);
      if($element) {
        const elementStyle = document.defaultView.getComputedStyle($element);
        width = $element.clientWidth - elementStyle.paddingLeft.replace('px', '') - elementStyle.paddingRight.replace('px', '');
        height = $element.clientHeight - elementStyle.paddingTop.replace('px', '') - elementStyle.paddingBottom.replace('px', '');
      }
      return {
        width: width,
        height: height
      }
    },
    /**
     * 获取外尺寸[包含border和margin]
     * @param selector
     * @return {{width: number, height: number}}
     */
    getOuterSizeWithSelector: function (selector) {
      let width = 0, height = 0;
      const $element = document.querySelector(selector);
      if($element) {
        const elementStyle = document.defaultView.getComputedStyle($element);
        width = $element.offsetWidth + elementStyle.marginLeft.replace('px', '') * 1 + elementStyle.marginRight.replace('px', '') * 1;
        height = $element.offsetHeight + elementStyle.marginTop.replace('px', '') * 1 + elementStyle.marginBottom.replace('px', '') * 1;
      }
      return {
        width: width,
        height: height
      }
    },
    /**
     * 检查元素是否在可视区域
     * @param el
     * @return {boolean}
     */
    checkElementVisible: function (el) {
      if(!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < document.documentElement.clientHeight;
    },
    /**
     * 文档中插入样式文件
     * @param url
     * @param document
     */
    insertStyleFile: function (url, document = window.document) {
      const $style = document.createElement('link');
      $style.setAttribute('rel', 'stylesheet');
      $style.setAttribute('href', url);
      document.head.appendChild($style);
    },
    /**
     * 文档中插入脚本文件
     * @param url
     * @param document
     * @return {Promise<unknown>}
     */
    insertScriptFile: function (url, document = window.document) {
      return new Promise((ok) => {
        const $script = document.createElement('script');
        $script.setAttribute('type', 'text/javascript');
        $script.setAttribute('src', url);
        $script.onload = () => ok();
        document.body.appendChild($script);
      });
    },

  };
});
