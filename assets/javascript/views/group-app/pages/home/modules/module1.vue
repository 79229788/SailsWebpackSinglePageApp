<style lang="scss" scoped>
  @import "assets/styles/source.scss";
  #module1{
    em{color: #de0000;font-style: normal;}
  }
</style>

<template>
  <section id="module1">
    <p>this is module1 content from <em>home</em> page</p>
    <p>timer: {{ count }}</p>
  </section>
</template>

<script>
  import Vue from 'vue';

  const sharedEvent = app.page.shares.groupAppHomeEvent;
  const sharedState = app.page.shares.groupAppHomeStore.state;
  export default {
    data: function () {
      return {
        sharedState: sharedState,
        count: 0
      }
    },
    created: function () {
      setInterval(() => {
        this.count++;
      }, 1000);
    },
    methods: {
      //*********************************内置方法
      //***************************

      //*********************************内置事件
      //***************************

    }
  }
</script>
