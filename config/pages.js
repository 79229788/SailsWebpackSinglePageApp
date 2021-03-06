/**
 * *****libraries 第三方库模块，每一行可为数组并合并打包，并单独加载，此处仅为声明，页面如需使用，请在下面pages中otherJs指定
 *
 * *****pages 页面配置 (一组单页视为一个group，可以有无限个子页面，也可以实现多组单页兼并，则在下面数组进行其它页面配置)
 *  name              : 页面名
 *  mainHtml          : 页面主html文件 (pages 目录下)
 *  mainJs            : 页面主js文件 (assets/javascript 目录下)
 *  otherJs           : 页面其它js模块文件（一组libs生成一个引用文件，因此建议一个页面只用一组libs，每组内允许添加多个库）
 *  isStatic          : 页面是否为静态页面 (①静态页面则以html格式输出到.tmp/public/pages；②动态页面则输出到views中，可在config/routes中使用)
 *  title             : 页面标题名
 *  keywords          : 页面SEO关键词
 *  description       : 页面SEO描述
 */
module.exports.pages = {
  libraries: {
    'libs': ['vue', 'vue-router', 'vuex'],
  },
  pages: [
    {
      name: 'group-app',
      mainHtml: '/group-app.art',
      mainJs: '/views/group-app/main.js',
      otherJs: ['libs'],
      isStatic: false,
      title: '单页',
      keywords: [],
      description: '',
    }
  ]
};
