<style lang="scss">
  @import "../../../../styles/source.scss";
  #module{

  }
</style>

<template>
  <section id="module1">

  </section>
</template>

<script>
  import Vue from 'vue';

  const sharedEvent = app.page.shares.<%=camelname%>Event;
  const sharedStore = app.page.shares.<%=camelname%>Store;
  export default {
    data: function () {
      return {
        sharedState: sharedStore.state,

      }
    },
    created: function () {
      sharedStore.setModule1(this);
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
