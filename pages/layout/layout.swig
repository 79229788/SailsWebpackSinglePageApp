<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="chrome=1">
  <meta name="renderer" content="webkit">
  <meta name="format-detection" content="telephone=no,email=no">
  {% if device.isMobilePhone %}<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">{% endif %}
  <title>{% block title %}{% endblock %}</title>
  <meta name="description" content="{% block description %}{% endblock %}">
  <meta name="keywords" content="{% block keywords %}{% endblock %}">
  {# 引入公共css文件 #}
  {% include "stylesheets.swig" %}
  {# 引入模块css文件 #}
  {% block stylesheets %}{% endblock %}
</head>
<body>
  {# 引入内容部分 #}
  {% block content %}{% endblock %}

  {# 引入公共脚本 #}
  {% include "./script-main.swig" %}
  {% include "./script-url.swig" %}
  {% include "./script-cookie.swig" %}
  {# 引入模块脚本 #}
  {% block scripts %}{% endblock %}
</body>
</html>
