<style lang="scss">
  @import "../../../styles/source.scss";

</style>

<template>
  <div id="wrapper">
    <div class="modules <%=filename%>">
      <div class="wrapper">
        <module-<%=modulename%>></module-<%=modulename%>>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

//**********************************************************************页面模块共享状态
//**************************************************************
//**************************************************************
const sharedEvent = app.page.shares.<%=fileCamelName%>Event = new Vue();
const sharedStore = app.page.shares.<%=fileCamelName%>Store = {
  state: {

  }
};

export default {
  data: function () {
    return {
      sharedState: sharedStore.state,
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

