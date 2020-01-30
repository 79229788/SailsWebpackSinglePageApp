<style lang="scss">
  @import "assets/styles/source";

</style>

<template>
  <div class="modules">
    <module-module1></module-module1>
  </div>
</template>

<script>
  import Vue from 'vue';

  //**********************************************************************页面模块共享状态
  //**************************************************************
  //**************************************************************
  const sharedEvent = app.page.shares.groupAppHomeEvent = new Vue();
  const sharedStore = app.page.shares.groupAppHomeStore = {
    state: {}
  };

  export default {
    //**********************************************************************注册页面模块
    //**************************************************************
    //**************************************************************
    components: {
      'module-module1': require('./modules/module1').default
    },
    data: function () {
      return {
        sharedEvent: sharedEvent,
        sharedState: sharedStore.state,
      }
    },
    created: function () {

    },
    destroyed: function () {
      sharedEvent.$off();
    },
  }

</script>

