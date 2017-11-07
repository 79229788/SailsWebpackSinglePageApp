//**********核心库
import Vue from 'vue';
import FastClick from 'fastclick';
import xhook from 'xhook';

//**********config
Vue.config.devtools = false;

//**********全局vue
Vue.mixin({
  data: function () {
    return {
      macros: app.macros,
      device: app.device,
    };
  },
  created: function () {

  },
  activated: function () {

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
  }
});

export default {
  /**
   * 初始化配置
   */
  initConfig: function (vm) {
    FastClick.attach(document.body);
  },
  /**
   * 处理BeforeRouteEnter
   * @param to
   * @param from
   * @param next
   */
  handleBeforeRouteEnter: function (to, from, next) {

  },
  /**
   * 处理Ajax全局请求
   */
  handleAjaxRequest: function (vm) {
    xhook.before((req) => {

    });
    xhook.after((req, res) => {
      if(res.status === 403 || res.status === 500) {
        const errorInfo = {code: -1, message: '未知错误！'};
        try{
          const data = new Function("return " + res.data)();
          if(data.code === 0 || data.code) errorInfo.code = data.code;
          if(data.message) errorInfo.message = data.message;
          if(!data.message) console.error(data);
        }catch(error) {
          errorInfo.message = res.data;
        }
        //action
        switch (errorInfo.code) {
          case 10001:

            break;
        }
      }
    });
  },
}

