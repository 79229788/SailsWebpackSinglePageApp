{% extends 'layout/layout.swig' %}
{% block title %}单页{% endblock %}
{% block description %}{% endblock %}
{% block keywords %}{% endblock %}
{% block stylesheets %}
{% endblock %}
{% block scripts %}
<script src="/javascript/_lib.js" type="text/javascript"></script>
<script src="/javascript/pub.js" type="text/javascript"></script>
<script src="/javascript/chunk-group-app.js" type="text/javascript"></script>
{% endblock %}

{% block content %}
<div id="page">
  {% if !hideHeader %}<layout-header></layout-header>{% endif %}
  <div id="content">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
  {% if !hideFooter %}<layout-footer></layout-footer>{% endif %}
</div>
{% endblock %}
