const headerSharedEvent = app.page.shares.layoutHeaderEvent;
export default {
  created: function () {
    if(!this.$route.meta.keepAlive) {
      this.initNavigationData();
    }
  },
  activated: function () {
    if(this.$route.meta.keepAlive) {
      this.initNavigationData();
    }
  },
  methods: {
    //**********初始化导航栏
    initNavigationData: function () {
      if(!this.$route.meta.title) return this.resetNavigationTitle();
      this.setNavigationTitle(this.$route.meta.title);
      this.$store.commit('setNavigationNone', false);
      this.$store.commit('setNavigationInvisible', false);
      if(headerSharedEvent) {
        headerSharedEvent.$off('tapLeftButton');
        headerSharedEvent.$off('tapRightButton');
      }
    },
  }
}
