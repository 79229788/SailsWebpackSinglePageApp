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
  const sharedEvent = app.page.shares.groupAppOtherEvent = new Vue();
  const sharedStore = app.page.shares.groupAppOtherStore = {
    state: {}
  };

  export default {
    mixins: [
      require('views/group-public/mixins/page').default,
    ],
    //**********************************************************************注册页面模块
    //**************************************************************
    //**************************************************************
    components: {
      'module-module1': require('./modules/module1').default,
    },
    data: function () {
      return {
        sharedEvent: sharedEvent,
        sharedState: sharedStore.state,
      }
    },
    destroyed: function () {
      sharedEvent.$off();
    },
  }

</script>

