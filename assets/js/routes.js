import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  { path: '/test1', component: resolve => require(['views/page-test1'], resolve) },

];

export default new VueRouter({
  mode: 'history',
  routes: routes
});
