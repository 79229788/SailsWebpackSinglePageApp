{% extends 'layout/layout.swig' %}
{% block title %}单页{% endblock %}
{% block description %}{% endblock %}
{% block keywords %}{% endblock %}
{% block stylesheets %}
{% endblock %}
{% block scripts %}
<script src="/javascript/_lib.283f0516.js" type="text/javascript"></script>
<script src="/javascript/pub.b032b5b3.js" type="text/javascript"></script>
<script src="/javascript/chunk-app.e215e0af.js" type="text/javascript"></script>
{% endblock %}
{% block content %}
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
{% endblock %}
