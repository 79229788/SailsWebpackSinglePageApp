export default {
  /**
   * 用于template中调试打印
   * @param value
   */
  print: function (value) {
    console.log(value);
  },
  /**
   * 用于template中调试弹窗
   * @param value
   */
  alert: function (value) {
    alert(value);
  },
  /**
   * 设置导航栏标题
   * @param name
   */
  setNavigationTitle: function (name) {
    this.$store.commit('setNavigationTitle', name);
  },
  /**
   * 准备离开
   * @param cb
   */
  readyLeave: function (cb) {
    this.$loadingBar.start();
    setTimeout(() => cb(), 0);
  },
  /**
   * 重置页面（激活vue实例中的reset方法，需自行实现重置数据的逻辑）
   * @param urls
   * @param scene
   * @param data
   */
  resetPages: function (urls, scene = 'all', data) {
    this.$store.commit('resetPages', {
      urls: urls,
      reset: true,
      scene: scene,
      data: data,
    });
  },
  /**
   * 重新加载当前页面(兼容写法)
   */
  reloadCurrentPage: function (url) {
    location.replace(
      app.joinUrlParam(
        url || location.href,
        {
          t: Date.parse(new Date()) / 1000
        }, false)
    );
  },
  /**
   * 从历史页面中返回 (没有历史的话，刷新本页)
   */
  backFromHistory: function () {
    if(history.length <= 1) return;
    this.$router.back();
  },
  /**
   * 路由push
   * @param option
   * @param isReset
   * @param resetScene
   * @param resetData
   */
  routerPush: function (option, isReset, resetScene, resetData) {
    this.readyLeave(() => {
      if(isReset) this.resetPages([option.path], resetScene, resetData);
      this.$router.push(option);
    });
  },
  /**
   * 获取上一个路由路径
   */
  getLastRoutePath: function () {
    const paths = this.$store.state.navigationFlow;
    if(paths.length <= 1) return null;
    return paths[paths.length - 2]
  },

}
