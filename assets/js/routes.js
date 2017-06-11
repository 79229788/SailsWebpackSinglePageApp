import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'home', component: r => require.ensure([], () => r(require('./views/page-home')), 'page-home') },
  { path: '/other', name: 'other', component: r => require.ensure([], () => r(require('./views/page-other')), 'page-other') }
];

export default new VueRouter({
  mode: 'history',
  routes: routes
});

