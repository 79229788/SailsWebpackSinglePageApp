<!DOCTYPE HTML>
<html>
<head>
  <title>{% block title %}{% endblock %}-{{ sails.macros.KWebsiteName }}</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  <meta name="format-detection" content="telephone=no,email=no">
  {% if device.isMobile %}
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  {% endif %}
  <meta name="description" content="{% block description %}{% endblock %}">
  <meta name="keywords" content="{% block keywords %}{% endblock %}">
  {# 引入公共css文件 #}
  {% include "stylesheets.swig" %}
  {# 引入模块css文件 #}
  {% block stylesheets %}{% endblock %}
</head>
<body id="app">
  <div id="page">
    {% if !hideHeader %}<layout-header></layout-header>{% endif %}
    <div id="content">
      {# 引入内容部分 #}
      {% block content %}{% endblock %}
    </div>
    {% if !hideFooter %}<layout-footer></layout-footer>{% endif %}
  </div>
  {# 引入公共脚本 #}
  {% include "scripts.swig" %}
  {# 引入模块脚本 #}
  {% block scripts %}{% endblock %}
</body>
</html>
