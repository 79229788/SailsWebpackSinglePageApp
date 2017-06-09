<script id="config-script">
  var app = {};
  app.debug = {{ JSON.stringify(sails.debug) }};
  app.device = {{ JSON.stringify(device) }};
  app.macros = {{ JSON.stringify(sails.publicMacros) }};

  if(!app.debug) {
    const config = document.getElementById('config-script');
    config.parentNode.removeChild(config);
  }
</script>
