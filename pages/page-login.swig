{% extends 'layout/layout.swig' %}
{% set hideHeader = true %}
{% set hideFooter = true %}
{% block title %}<&= $options.title &>{% endblock %}
{% block description %}<&= $options.description &>{% endblock %}
{% block keywords %}<&= $options.keywords &>{% endblock %}
{% block stylesheets %}<&= $css &>{% endblock %}
{% block scripts %}<&= $js &>{% endblock %}
{% block content %}

{% endblock %}
