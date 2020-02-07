//**********核心库
import Vue from 'vue';
import FastClick from 'fastclick';
import axios from 'axios';

//**********
import './app';
import './mixins/global';

export default {
  /**
   * 初始化配置
   */
  initConfig: function (vm) {
    FastClick.attach(document.body);
    Vue.config.devtools = vm.debug;
  },
  /**
   * 初始化数据
   */
  initData: function (rootVm) {
    //记录导航信息
    const rootPath = location.hash.indexOf('#/') === 0
      ? location.hash.split('?')[0].slice(1)
      : location.pathname;
    rootVm.$store.commit('pushNavigationFlow', rootPath);
  },
  /**
   * 处理全局路由afterEach
   * @param rootVm
   * @param to
   * @param from
   */
  handleRouterAfterEach: function (rootVm, to, from) {
    //rootVm.$loadingBar.finish();
    //恢复页面滚动位置
    const prevPosition = rootVm.$store.state.prevPosition[to.path];
    const recoverLeft = rootVm.$store.state.navigationBackward
      && prevPosition && prevPosition.x || 0;
    const recoverTop = rootVm.$store.state.navigationBackward
      && prevPosition && prevPosition.y || 0;
    setTimeout(() => {
      window.scrollTo(recoverLeft, recoverTop);
    }, 50);
  },
  /**
   * 处理全局路由beforeEach
   * @param rootVm
   * @param to
   * @param from
   * @param next
   */
  handleRouterBeforeEach: function (rootVm, to, from, next) {
    //rootVm.$loadingBar.start();
    rootVm.$store.commit('pushNavigationFlow', to.path);
    rootVm.$store.commit('prevRoute', from);
    rootVm.$store.commit('prevPosition', {
      from: from.path,
      x: app.page.getScrollLeft(),
      y: app.page.getScrollTop(),
    });
    next();
  },
  /**
   * 处理Ajax全局请求
   */
  handleAjaxRequest: function (vm) {
    this.requestRetry = {};
    //***请求拦截器
    axios.interceptors.request.use(config => {
      //vm.$loadingBar.start();
      if(!this.requestRetry[config.url]) {
        this.requestRetry[config.url] = 0;
      }
      return config;
    }, (error) => {
      //vm.$loadingBar.error();
      return Promise.reject(error);
    });
    //***响应拦截器
    axios.interceptors.response.use(response => {
      //vm.$loadingBar.finish();
      delete this.requestRetry[response.config.url];
      return response;
    }, (error) => {
      //vm.$loadingBar.error();
      const config = error.config;
      const code = error.code;
      const message = error.message;
      const response = error.response;
      //***指定特殊请求忽略拦截操作
      if(config.url.indexOf('/log/post') >= 0
        || config.url.indexOf('/auth/is_auth') >= 0) {
        return Promise.reject(error);
      }
      //***网络连接失败，进行少许无感知重试
      if(code === 'ECONNABORTED' || message === 'Network Error') {
        if(this.requestRetry[config.url] < 3) {
          this.requestRetry[config.url] ++;
          app.log(`网络连接失败，即将自动无感知重试，第${this.requestRetry[config.url]}次`);
          if(message === 'Network Error') {
            return new Promise(ok => {
              setTimeout(() => {
                ok(axios.request(config));
              }, 1000);
            });
          }else {
            return axios.request(config);
          }
        }
        //if(code === 'ECONNABORTED') vm.$message.error(`网络连接超时，请重试一次`);
        //if(message === 'Network Error') vm.$message.error(`网络连接超时，请重试一次`);
        delete this.requestRetry[config.url];
      }
      //***网络请求成功，对服务器错误进行全局处理
      else if(response) {
        if(response.status === 403 || response.status === 500) {
          const errorInfo = {code: -1, message: '未知错误！'};
          errorInfo.code = response.data.code || response.status;
          errorInfo.message = response.message;
          if(response.data) {
            if(response.data.stack) errorInfo.message = response.data.message;
            if(response.data.stack) errorInfo.stack = response.data.stack;
          }
          //action
          switch (errorInfo.code) {
            case 10001:

              break;
            default:
              //vm.$message.error(`[${errorInfo.code}] ${errorInfo.message}`);
              break;
          }
        }
      }
      return Promise.reject(error);
    });
  },
}

