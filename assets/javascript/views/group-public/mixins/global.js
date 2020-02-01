import Vue from 'vue';
import _extend from 'lodash/extend';
import commonMethods from '../methods/common';
import { macros, device } from '../macros';


Vue.mixin({
  data: function () {
    return {
      debug: app.debug,
      macros: macros || app.macros,
      device: device,
    };
  },
  created: function () {},
  beforeRouteEnter: function (to, from, next) {
    next((vm) => {
      //对当前所有实例执行重设方法
      const resetData = vm.$store.state.resetPages[to.path] || [];
      resetData.forEach(item => {
        if(item && item.reset === true && vm._created === true) {
          (function call(vm) {
            if(vm.$options.reset) vm.$options.reset.call(vm, item.scene, item.data);
            if(vm.$children.length > 0) {
              vm.$children.forEach(($child) => call($child, item.scene, item.data));
            }
          })(vm);
        }
      });
      vm._created = true;
      vm.$store.commit('resetPages', {
        urls: vm.$route.path,
        reset: false
      });
    });
  },
  methods: _extend({
    /**
     * 提示加载错误，等待用户重试
     */
    alertLoadError: function (error, cb) {
      if(error && (error.code || error.message)) {
        //登录失效或无权限操作，不提示错误重试
        if(error.code === 403
          || error.code === 10001
          || error.code === 10002
          || error.code === 6001
        ) return;
        //用户若不存在，不提示错误重试
        if(error.message === 'currentUser not exist') return;
      }
      // this.$vux.confirm.show({
      //   title: '温馨提示',
      //   content: '网络出现异常，是否重试？',
      //   showCancelButton: false,
      //   onConfirm: () => {
      //     if(_isFunction(cb)) return cb();
      //     this.reloadCurrentPage();
      //   },
      // });
    },


  }, commonMethods)
});
