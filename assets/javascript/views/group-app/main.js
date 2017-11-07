import 'styles/page.scss';
import 'views/page.js';
//**********核心库
import Vue from 'vue';
//**********其它
import router from './routes';
import publicMethods from '../group-public/main';


//**********config
Vue.config.devtools = false;
//**********设置全局内置组件
Vue.component('layout-header', require('./layout/header'));
Vue.component('layout-footer', require('./layout/footer'));


new Vue({
  router,
  el: '#page',
  delimiters: ['${', '}'],
  created: function () {
    publicMethods.initConfig(this);
    publicMethods.handleAjaxRequest(this);
  },
  methods: {

  }
});
