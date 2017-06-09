import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  { path: '/', component: resolve => require(['views/page-home'], resolve) },

];

export default new VueRouter({
  mode: 'history',
  routes: routes
});
