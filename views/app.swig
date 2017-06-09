{% extends 'layout/layout.swig' %}
{% block title %}单页{% endblock %}
{% block description %}{% endblock %}
{% block keywords %}{% endblock %}
{% block stylesheets %}
{% endblock %}
{% block scripts %}
<script src="/assets/js/_lib.js" type="text/javascript"></script>
<script src="/assets/js/pub.js" type="text/javascript"></script>
<script src="/assets/js/app.js" type="text/javascript"></script>
{% endblock %}
{% block content %}
<router-view></router-view>
{% endblock %}
