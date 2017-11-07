<style lang="scss">
  @import "../../../../styles/source.scss";
  .<%=name%>-<%=modulename%>{

  }
</style>

<template>
  <section class="<%=name%>-<%=modulename%> <%=modulename%>">

  </section>
</template>

<script>
  import Vue from 'vue';

  const sharedEvent = app.page.shares.<%=fileCamelName%>Event;
  const sharedStore = app.page.shares.<%=fileCamelName%>Store;
  export default {
    data: function () {
      return {
        sharedState: sharedStore.state,

      }
    },
    created: function () {
      this.initData();
    },
    mounted: function () {},
    methods: {
      //*********************************内置方法
      //***************************
      //**********初始数据
      initData: function () {

      },
      //**********重置数据
      resetData: function () {

        this.initData();
      },

      //*********************************内置事件
      //***************************

    }
  }
</script>
