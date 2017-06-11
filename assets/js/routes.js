import Vue from 'vue';
import VueRouter from 'vue-router';
import _map from 'lodash/map';
Vue.use(VueRouter);

const routes = {
   '/'              : {view: 'page-home'},
   '/other'         : {view: 'page-other'},
};

export default new VueRouter({
  mode: 'history',
  routes: _map(routes, function (value, key) {
    const name = key.replace('/', '');
    return {
      path: key,
      name: name,
      component: function (resolve) {
        import(
          /* webpackChunkName: "[request]" */
          `./views/${value.view}/index`
        ).then(function (data) {
          resolve(data);
        });
      }
    };
  })
});

