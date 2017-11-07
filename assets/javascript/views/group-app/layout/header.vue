<style lang="scss">
  @import "../../../../styles/source.scss";
  #header{
    width: 100%;height:150px;background: #f5f5f5;@include m-box-center;
    p{font-size: 24px;}
  }
</style>

<template>
  <div id="header">
    <div>
      <p>a public header</p>
      <p>timer: {{ count }}</p>
      <p>
        <router-link to="/app/home">home</router-link>
        <router-link to="/app/other">other</router-link>
      </p>
    </div>
  </div>
</template>

<script>

  export default {
    data: function () {
      return {
        count: 0,
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
