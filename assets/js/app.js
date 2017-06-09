import Vue from 'vue';
import _throttle from 'lodash/throttle';

import HeaderLayout from 'views/layout/header';
import FooterLayout from 'views/layout/footer';

import router from './routes';

//**********全局状态
app.page = {
  state: {},
  shares: {},
  getWidth: function () {
    return document.body.offsetWidth;
  },
  getHeight: function () {
    return document.body.offsetHeight;
  }
};

//**********config
Vue.config.devtools = false;
//**********设置全局内置组件
Vue.component('layout-header', HeaderLayout);
Vue.component('layout-footer', FooterLayout);

//**********Page
Vue.mixin({
  data: function () {
    return app.page.state;
  },
  mounted: function () {
    this.$options.resize.call(this, false);
    window.onresize = _throttle(() => {
      this.$options.resize.call(this, true);
    }, 200);
  },
  //当窗口尺寸改变时调用次方法（窗口首次显示时也会调用）
  resize: function (changed) {},
  methods: {
    /**
     * 用于template中调试打印
     * @param value
     */
    print: function (value) {
      console.log(value);
    },
    /**
     * 用于template中调试弹窗
     * @param value
     */
    alert: function (value) {
      alert(value);
    }
  }
});

new Vue({
  router
}).$mount('#page');
