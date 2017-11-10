<style lang="scss">
  @import "assets/styles/source.scss";

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
  const sharedEvent = app.page.shares.homeEvent = new Vue();
  const sharedState = app.page.shares.homeStore = {
    state: {}
  };

  export default {
    //**********************************************************************注册页面模块
    //**************************************************************
    //**************************************************************
    components: {
      'module-module1': require('./modules/module1')
    }
  }

</script>

