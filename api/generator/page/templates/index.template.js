<style lang="scss">
  @import "../../../../../styles/source.scss";

</style>

<template>
  <div id="wrapper">
    <div class="modules <%=pageFullName%>">
      <div class="wrapper">
        <module-<%=moduleName%>></module-<%=moduleName%>>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

//**********************************************************************页面模块共享状态
//**************************************************************
//**************************************************************
const sharedEvent = app.page.shares.<%=pageCamelName%>Event = new Vue();
const sharedStore = app.page.shares.<%=pageCamelName%>Store = {
  state: {

  }
};

export default {
  data: function () {
    return {
      sharedEvent: sharedEvent,
      sharedState: sharedStore.state,
    }
  },
  //**********************************************************************注册页面模块
  //**************************************************************
  //**************************************************************
  components: {
    'module-<%=moduleName%>': require('./modules/<%=moduleName%>')
  }
}

</script>

