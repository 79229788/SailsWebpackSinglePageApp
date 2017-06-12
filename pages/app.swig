{% extends 'layout/layout.swig' %}
{% block title %}<&= $options.title &>{% endblock %}
{% block description %}<&= $options.description &>{% endblock %}
{% block keywords %}<&= $options.keywords &>{% endblock %}
{% block stylesheets %}<&= $css &>{% endblock %}
{% block scripts %}<&= $js &>{% endblock %}
{% block content %}
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
{% endblock %}
