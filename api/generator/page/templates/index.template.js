<style lang="scss">
  @import "../../../styles/source.scss";

</style>

<template>
  <div class="modules">
    <module-<%=modulename%>></module-<%=modulename%>>
  </div>
</template>

<script>
import Vue from 'vue';

//**********************************************************************页面模块共享状态
//**************************************************************
//**************************************************************
app.page.shares.<%=fileCamelName%>Event = new Vue();
app.page.shares.<%=fileCamelName%>Store = {
  state: {
    <%=moduleCamelName%>: null,
  },
  set<%=moduleFullCamelName%>: function (vm) {
    this.state.<%=moduleCamelName%> = vm;
  }
};

export default {
  data: function () {
    return {
      sharedState: app.page.shares.<%=fileCamelName%>Store.state
    }
  },
  //**********************************************************************注册页面模块
  //**************************************************************
  //**************************************************************
  components: {
    'module-<%=modulename%>': require('views/<%=filename%>/modules/<%=modulename%>')
  }
}

</script>

