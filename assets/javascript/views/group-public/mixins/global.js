import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import _extend from 'lodash/extend';
import _cloneDeep from 'lodash/cloneDeep';
import { macros, device } from '../macros';


Vue.mixin({
  data: function () {
    return {
      DEBUG: app.debug,
      MACROS: _cloneDeep(_extend({}, app.macros, macros)),
      DEVICE: _cloneDeep(device),
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
    },
    /**
     * 中断当前全部请求
     */
    abortAllRequest: function () {
      axios.axiosSource.cancel();
      axios.axiosSource = axios.CancelToken.source();
    },
    /**
     * 设置导航栏标题
     * @param name
     */
    setNavigationTitle: function (name) {
      this.$store.commit('setNavigationTitle', name);
    },
    /**
     * 准备离开
     * @param cb
     */
    readyLeave: function (cb) {
      this.$loadingBar.start();
      setTimeout(() => cb(), 0);
    },
    /**
     * 重置页面（激活vue实例中的reset方法，需自行实现重置数据的逻辑）
     * @param urls
     * @param scene
     * @param data
     */
    resetPages: function (urls, scene = 'all', data) {
      this.$store.commit('resetPages', {
        urls: urls,
        reset: true,
        scene: scene,
        data: data,
      });
    },
    /**
     * 从历史页面中返回 (没有历史的话，刷新本页)
     */
    backFromHistory: function () {
      if(history.length <= 1) return;
      this.$router.back();
    },
    /**
     * 路由push
     * @param option
     * @param isReset
     * @param resetScene
     * @param resetData
     */
    routerPush: function (option, isReset, resetScene, resetData) {
      this.readyLeave(() => {
        if(isReset) this.resetPages([option.path], resetScene, resetData);
        this.$router.push(option);
      });
    },
    /**
     * 获取上一个路由路径
     */
    getLastRoutePath: function () {
      const paths = this.$store.state.navigationFlow;
      if(paths.length <= 1) return null;
      return paths[paths.length - 2]
    },


  }
});
