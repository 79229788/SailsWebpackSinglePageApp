<style lang="scss">
  @import "../../../styles/source.scss";

</style>

<template>
  <div class="modules">
    <module-module1></module-module1>
  </div>
</template>

<script>
import Vue from 'vue';

//**********************************************************************页面模块共享状态
//**************************************************************
//**************************************************************
app.page.shares.<%=camelname%>Event = new Vue();
app.page.shares.<%=camelname%>Store = {
  state: {}
};

export default {
  //**********************************************************************注册页面模块
  //**************************************************************
  //**************************************************************
  components: {
    'module-module1': require('views/<%=filename%>/module1')
  }
}

</script>

