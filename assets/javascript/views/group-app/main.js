import 'views/group-public/styles/page.scss';
import 'views/group-public/page.js';
//**********核心库
import Vue from 'vue';
//**********其它
import router from './routes';
import store from './store';
import publicMethods from '../group-public/main';

//**********设置全局内置组件
Vue.component('layout-header', require('../group-public/layout/header').default);
Vue.component('layout-footer', require('../group-public/layout/footer').default);

new Vue({
  router,
  store,
  el: '#page',
  delimiters: ['${', '}'],
  created: function () {
    publicMethods.initData(this);
    publicMethods.initConfig(this);
    publicMethods.handleAjaxRequest(this);
    router.afterEach((to, from) => {
      publicMethods.handleRouterAfterEach(this, to, from);
    });
    router.beforeEach((to, from, next) => {
      publicMethods.handleRouterBeforeEach(this, to, from, next);
    });
  },
  methods: {

  }
});
