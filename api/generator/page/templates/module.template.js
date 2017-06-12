<style lang="scss" scoped>
  @import "../../../../styles/source.scss";
  #<%=modulename%>{

  }
</style>

<template>
  <section id="<%=modulename%>">

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
      sharedStore.set<%=moduleFullCamelName%>(this);
    },
    mounted: function () {},
    methods: {
      //*********************************内置方法
      //***************************


      //*********************************内置事件
      //***************************

    }
  }
</script>
