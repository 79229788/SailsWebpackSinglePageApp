import _element from 'utils/element';

//设置页面的滚动偏移量
window.addEventListener('scroll', function() {
  window.scrollTop = this.scrollY;
  window.scrollLeft = this.scrollX;
}, false);

app.page = {
  shares: {},
  state: {
    isFixPageBody: false,
    scrollTop: 0,
    scrollLeft: 0,
  },
  /**
   * 获取宽度
   * @return {number}
   */
  getWidth: function () {
    return document.documentElement.clientWidth;
  },
  /**
   * 获取高度
   * @return {number}
   */
  getHeight: function () {
    return document.documentElement.clientHeight;
  },
  /**
   * 获取滚动条位置
   * @return {number}
   */
  getScrollLeft: function () {
    if(this.state.isFixPageBody) {
      return this.state.scrollLeft
    }
    return window.scrollLeft || 0;
  },
  /**
   * 获取滚动条位置
   * @return {number}
   */
  getScrollTop: function () {
    if(this.state.isFixPageBody) {
      return this.state.scrollTop;
    }
    return window.scrollTop || 0;
  },
  /**
   * 固定页面body
   * @param isFixed
   */
  fixPageBody: function (isFixed) {
    this.state.isFixPageBody = isFixed;
    if(isFixed) {
      this.state.scrollTop = window.scrollTop;
      this.state.scrollLeft = window.scrollLeft;
      _element.addClass(document.body, 'page-fixed');
    }else {
      _element.removeClass(document.body, 'page-fixed');
    }
    if(isFixed) {
      document.body.style.top = -this.state.scrollTop + 'px';
      document.body.style.left = -this.state.scrollLeft + 'px';
    }else {
      window.scrollTo(this.state.scrollLeft, this.state.scrollTop);
      document.body.style.top = '';
      document.body.style.left = '';
    }
  },
};

/**
 * 重新加载当前页面(兼容写法)
 */
app.reloadCurrentPage = function (url) {
  location.replace(app.joinUrlParam(url || location.href, {
    t: new Date().getTime()
  }, false));
};
