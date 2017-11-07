<style lang="scss" scoped>
  @import "../../../../../../styles/source.scss";
  #module1{
    em{color: #00bcd4;font-style: normal;}
  }
</style>

<template>
  <section id="module1">
    <p>this is module1 content from <em>other</em> page</p>
    <p>timer: {{ count }}</p>
  </section>
</template>

<script>
  import Vue from 'vue';

  const sharedEvent = app.page.shares.otherEvent;
  const sharedState = app.page.shares.otherStore.state;
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
    mounted: function () {},
    methods: {
      //*********************************内置方法
      //***************************


      //*********************************内置事件
      //***************************

    }
  }
</script>
