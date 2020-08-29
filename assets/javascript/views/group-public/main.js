//**********核心库
import Vue from 'vue';
import FastClick from 'fastclick';
import axios from 'axios';
import Comber from 'comber';

//**********
import './app';
import './mixins/global';

export default {
  /**
   * 初始化配置
   */
  initConfig: function (vm) {
    FastClick.attach(document.body);
    Vue.config.devtools = vm.DEBUG;
    Comber.config = {
      apiUrl: '',
      debug: vm.DEBUG,
      storage: {
        maxSize: 2000,
        clearSize: 1700
      },
      alert: function (text) {
        return alert(text);
      },
      beforeGetHandler: function (opts) {
        return opts;
      },
      beforePostHandler: function (opts) {
        return opts;
      },
      dataHandler: function (data) {
        return data;
      }
    };
  },
  /**
   * 初始化数据
   */
  initData: function (vm) {
    //记录导航信息
    const rootPath = location.hash.indexOf('#/') === 0
      ? location.hash.split('?')[0].slice(1)
      : location.pathname;
    vm.$store.commit('pushNavigationFlow', rootPath);
  },
  /**
   * 处理全局路由afterEach
   * @param vm
   * @param to
   * @param from
   */
  handleRouterAfterEach: function (vm, to, from) {
    //vm.$loadingBar.finish();
    //恢复页面滚动位置
    const prevPosition = vm.$store.state.prevPosition[to.path];
    const recoverLeft = vm.$store.state.navigationBackward
      && prevPosition && prevPosition.x || 0;
    const recoverTop = vm.$store.state.navigationBackward
      && prevPosition && prevPosition.y || 0;
    setTimeout(() => {
      window.scrollTo(recoverLeft, recoverTop);
    }, 50);
  },
  /**
   * 处理全局路由beforeEach
   * @param vm
   * @param to
   * @param from
   * @param next
   */
  handleRouterBeforeEach: function (vm, to, from, next) {
    //vm.$loadingBar.start();
    vm.$store.commit('pushNavigationFlow', to.path);
    vm.$store.commit('prevRoute', from);
    vm.$store.commit('prevPosition', {
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
            if(response.data.message) errorInfo.message = response.data.message;
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

