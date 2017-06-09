const _ = require('lodash');

function HtmlWebpackInjectPlugin(options) {
  this.options = _.extend({
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g,
  }, options || {});
}
HtmlWebpackInjectPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
      _.templateSettings = {
        evaluate: this.options.evaluate,
        interpolate: this.options.interpolate,
        escape: this.options.escape,
      };
      let cssString = '\n', jsString = '\n';
      _.each(htmlPluginData.assets.css, (url) => {
        cssString += '<link href="'+ url +'" rel="stylesheet">\n';
      });
      _.each(htmlPluginData.assets.js, (url) => {
        jsString += '<script src="'+ url +'" type="text/javascript"></script>\n'
      });
      const compiled = _.template(htmlPluginData.html);
      htmlPluginData.html = compiled({
        $options: htmlPluginData.plugin.options,
        $css: cssString,
        $js: jsString,
      });
      callback(null, htmlPluginData);
    });
  });
};

module.exports = HtmlWebpackInjectPlugin;
