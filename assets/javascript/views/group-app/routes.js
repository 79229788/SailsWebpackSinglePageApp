import Vue from 'vue';
import VueRouter from 'vue-router';
import _map from 'lodash/map';
Vue.use(VueRouter);

const routes = {
   '/'                  : {view: 'home'},
   '/app/home'          : {view: 'home'},
   '/app/other'         : {view: 'other', meta: {keepAlive: true}},
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
          `./pages/${value.view}/index`
        ).then(function (data) {
          resolve(data);
        });
      },
      meta: value.meta,
    };
  })
});

