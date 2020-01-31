import Vue from 'vue';
import VueRouter from 'vue-router';
import _map from 'lodash/map';
Vue.use(VueRouter);

const routes = {
  '/'                  : { title: '首页', view: 'home' },
  '/app/home'          : { title: '首页', view: 'home'},
  '/app/other'         : { title: '其它', view: 'other', keepAlive: true},
};

export default new VueRouter({
  mode: 'history',
  routes: _map(routes, function (value, key) {
    const name = key.replace('/', '');
    const meta = {};
    meta.title = value.title;
    meta.view = value.view;
    meta.keepAlive = value.keepAlive || false;
    return {
      path: key,
      name: name,
      component: function (resolve) {
        import(
          /* webpackChunkName: "[request]" */
          `./pages/${value.view}/index`
          ).then(function (data) {
          resolve(data);
        });
      },
      meta: meta,
    };
  }),
});

