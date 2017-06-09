<style lang="scss">
  @import "../../../styles/source.scss";
  #module{

  }
</style>

<template>
  <section id="module1">

  </section>
</template>

<script>
  import Vue from 'vue';

  const sharedEvent = app.shares.<%=camelname%>Event;
  const sharedState = app.shares.<%=camelname%>Store.state;
  export default {
    data: function () {
      return {
        sharedState: sharedState,

      }
    },
    created: function () {},
    mounted: function () {},
    methods: {
      //*********************************内置方法
      //***************************


      //*********************************内置事件
      //***************************

    }
  }
</script>
