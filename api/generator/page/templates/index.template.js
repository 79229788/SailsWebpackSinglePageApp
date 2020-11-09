<style lang="scss">
  @import "assets/styles/source";
  .<%=pageFullName%>{

  }
</style>

<template>
  <div id="wrapper">
    <div class="modules <%=pageFullName%>">
      <div class="wrapper">
        <module-<%=moduleName%> class="module <%=moduleName%>"></module-<%=moduleName%>>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  //**********************************************************************页面模块共享状态
  //**************************************************************
  //**************************************************************
  const sharedEvent = app.page.shares.<%=pageCamelName%>Event = new Vue();
  const sharedStore = app.page.shares.<%=pageCamelName%>Store = {
    state: {

    }
  };

  export default {
    mixins: [
      require('views/group-public/mixins/page').default,
    ],
    //**********************************************************************注册页面模块
    //**************************************************************
    //**************************************************************
    components: {
      'module-<%=moduleName%>': require('./modules/<%=moduleName%>').default,
    },
    data: function () {
      return {
        sharedEvent: sharedEvent,
        sharedState: sharedStore.state,
      }
    },
    created: function () {
      this.initData();
    },
    destroyed: function () {
      sharedEvent.$off();
    },
    reset: function (scene, data) {
      this.resetData(scene, data);
    },
    methods: {
      //*********************************内置方法
      //***************************
      //**********初始数据
      initData: function () {

      },
      //**********重置数据
      resetData: function (scene, data) {

        this.initData();
      },

      //*********************************内置事件
      //***************************

    }
  }

</script>

