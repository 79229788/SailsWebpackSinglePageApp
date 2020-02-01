import _extend from 'lodash/extend';
import _isArray from 'lodash/isArray';

export default {
  /**
   * 设置导航栏不显示
   * @param state
   * @param boolean
   */
  setNavigationNone: function (state, boolean) {
    state.navigationNone = boolean;
  },
  /**
   * 设置导航栏不可见[位置还在]
   * @param state
   * @param boolean
   */
  setNavigationInvisible: function (state, boolean) {
    state.navigationInvisible = boolean;
  },
  /**
   * 设置导航栏标题
   * @param state
   * @param name
   */
  setNavigationTitle: function (state, name) {
    state.navigationTitle = name;
  },
  /**
   * 添加导航流水
   * @param state
   * @param path
   */
  pushNavigationFlow: function (state, path) {
    if(state.navigationFlow.indexOf(path) >= 0) {
      const flow = [];
      for(let i = 0; i < state.navigationFlow.length; i ++) {
        const item = state.navigationFlow[i];
        flow.push(item);
        if(item === path) break;
      }
      app.log('@navigation:', '正在后退页面');
      state.navigationBackward = true;
      state.navigationForward = false;
      state.navigationFlow = flow;
    }else {
      app.log('@navigation:', '正在前进页面');
      state.navigationForward = true;
      state.navigationBackward = false;
      state.navigationFlow.push(path);
    }
  },
  /**
   * 设置页面的重置状态
   * @param state
   * @param options
   */
  resetPages: function (state, options) {
    const opts =_extend({
      urls: [],
      reset: true,
      scene: 'all',
      data: null,
    }, options || {});
    const urls = _isArray(opts.urls)
      ? opts.urls
      : [opts.urls];
    urls.forEach((url) => {
      if(url) {
        if(!opts.reset) {
          delete state.resetPages[url];
        }else {
          if(!state.resetPages[url]) state.resetPages[url] = [];
          state.resetPages[url].push({
            reset: opts.reset,
            scene: opts.scene,
            data: opts.data,
          });
        }
      }
    });
  },
  /**
   * 上个页面路由信息
   * @param state
   * @param route
   */
  prevRoute: function (state, route) {
    state.prevRoute = route;
  },
  /**
   * 上个页面的滚动位置
   * @param state
   * @param option
   */
  prevPosition: function (state, option) {
    state.prevPosition[option.from] = { x: option.x, y: option.y };
  },
}
