<script>
  /**
   * cookies 缓存操作
   *
   */
  app.cookies = {
    //设置cookie
    set: function(key, value, time) {
      var expires = "";
      if (time) {
        var date = new Date();
        date.setTime(date.getTime() + time);
        expires = "; expires=" + date.toGMTString();
      }
      document.cookie = key + "=" + value + expires +"; path=/";
    },
    //获取cookie
    get: function(key) {
      var keyX = key + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(keyX) == 0) return c.substring(keyX.length, c.length);
      }
      return null;
    },
    //删除cookie
    del: function(key) {
      this.set(key, "", -1);
    }
  };

</script>
