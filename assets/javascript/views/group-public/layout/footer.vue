<style lang="scss">
  @import "assets/styles/source";
  @import "assets/styles/ui/ui-border";
  #footer{
    width: 100%;height:150px;background: #f5f5f5;@include m-box-center;
    @include ui-border;@include ui-border-top;
    p{font-size: 24px;}
  }
</style>

<template>
  <div id="footer">
    <p>a public footer</p>
  </div>
</template>

<script>

  export default {
    data: function () {
      return {

      }
    },
    created: function () {

    },
    methods: {
      //*********************************内置方法
      //***************************

      //*********************************内置事件
      //***************************

    }
  }
</script>
