<style lang="scss" scoped>
  @import "assets/styles/source.scss";
  #module1{
    em{color: #00bcd4;font-style: normal;}
  }
</style>

<template>
  <section id="module1">
    <p>this is moduleB content from <em>other</em> page</p>
    <p>timer: {{ count }}</p>
  </section>
</template>

<script>
  import Vue from 'vue';

  const sharedEvent = app.page.shares.groupAppOtherEvent;
  const sharedState = app.page.shares.groupAppOtherStore.state;
  export default {
    data: function () {
      return {
        sharedState: sharedState,
        count: 0
      }
    },
    created: function () {
      (async () => {
        setInterval(() => {
          this.count++;
        }, 1000);
      })();
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
