const FileUtils = require('./utils/FileUtils');
const artTemplate = require('art-template');
const path = require('path');
const _ = require('lodash');
const currentJSFileMap = {};

function HtmlWebpackInjectPlugin(options) {
  this.options = _.extend({
    development: false,
    templatePath: '',
    parseTemplate: '',
    templateOptions: {},
    templateData: {},
    output: '',
    publicPath: '/',
    title: '',
    keywords: '',
    description: '',
    chunks: [],
    evaluate: /{%(.*?)%}/g,
    interpolate: /{%(.*?)%}/g,
    escape: /{%-(.*?)%}/g,
  }, options || {});
  const imports = this.options.templateOptions.imports;
  delete this.options.templateOptions.imports;
  Object.assign(artTemplate.defaults, this.options.templateOptions);
  Object.assign(artTemplate.defaults.imports, imports);
  _.templateSettings = {
    evaluate: this.options.evaluate,
    interpolate: this.options.interpolate,
    escape: this.options.escape,
  };
}

Object.assign(HtmlWebpackInjectPlugin.prototype, {
  //**********插件初始化
  apply: function (compiler) {
    compiler.hooks.emit.tapAsync(
      'HtmlWebpackInjectPlugin',
      (compilation, callback) => {
        (async () => {
          const chunks = compilation.chunks.filter(chunk => {
            return chunk.name && this.options.chunks.indexOf(chunk.name.split('~')[0]) >= 0
          });
          const chunksMap = {}, cssFiles = [], jsFiles = [];
          chunks.forEach(chunk => {
            const name = chunk.name.split('~')[0];
            if(!chunksMap[name]) chunksMap[name] = [];
            chunk.files.forEach(file => chunksMap[name].push(file));
            currentJSFileMap[name]
          });
          this.options.chunks.forEach(name => {
            chunksMap[name].forEach(file => {
              if(/.*?.css$/.test(file)) cssFiles.push(this.options.publicPath + file);
              if(/.*?.js$/.test(file)) jsFiles.push(this.options.publicPath + file);
            });
          });
          let templateContent = '';
          if(this.options.parseTemplate) {
            templateContent = artTemplate(this.options.templatePath, this.options.templateData);
          }else {
            templateContent = await FileUtils.readFile(this.options.templatePath);
          }
          let cssString = '\n', jsString = '\n';
          cssFiles.forEach(file => {
            cssString += `<link href="${file}" rel="stylesheet">\n`;
          });
          jsFiles.forEach(file => {
            const version = this.options.development
              ? `?t=${Date.parse(new Date()) / 1000}` : '';
            jsString += `<script src="${file + version}" type="text/javascript" crossorigin="anonymous"></script>\n`
          });
          const compiled = _.template(templateContent);
          templateContent = compiled({
            options: this.options,
            css: cssString,
            js: jsString,
          });
          await FileUtils.writeFile(this.options.output, '', templateContent);
        })().catch(error => {
          throw error;
        }).finally(() => {
          callback();
        });
      }
    );
  },
});


module.exports = HtmlWebpackInjectPlugin;
