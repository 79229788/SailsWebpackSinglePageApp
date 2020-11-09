<style lang="scss">
  @import "assets/styles/source";
  .<%=moduleFullName%>{

  }
</style>

<template>
  <section class="<%=moduleFullName%>">

  </section>
</template>

<script>
  import Vue from 'vue';

  const sharedEvent = app.page.shares.<%=pageCamelName%>Event;
  const sharedStore = app.page.shares.<%=pageCamelName%>Store;
  export default {
    data: function () {
      return {
        sharedState: sharedStore.state,

      }
    },
    created: function () {
      this.initData();
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
