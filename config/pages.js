/**
 * *****libs 第三方库模块
 *
 * *****scripts 自定义js脚本，每一行可为数组并合并打包，并单独加载，此处仅为声明，页面如需使用，请在下面pages中otherJs指定
 *
 * *****pages 页面配置
 *  name              : 页面名
 *  mainHtml          : 页面主html文件 pages 目录下
 *  mainJs            : 页面主js文件 assets/js 目录下
 *  otherJs           : 页面其它js模块文件
 *  loadLibs          : 页面加载公共库[热更新模式下，至少必须加载一个公共库]
 *  isStatic          : 页面是否为静态页面，①静态页面则以html格式输出到.tmp/public/pages；②动态页面则输出到views中，可在config/routes中使用
 *  title             : 页面标题名
 *  keywords          : 页面SEO关键词
 *  description       : 页面SEO描述
 */
module.exports.pages = {
  libs: ['vue', 'vue-router'],
  scripts: {
    'pub': ['./assets/javascript/views/page.js'],
  },
  pages: [
    {
      name: 'group-app',
      mainHtml: '/group-app.swig',
      mainJs: '/views/group-app/main.js',
      otherJs: ['pub'],
      loadLibs: true,
      isStatic: false,
      title: '单页',
      keywords: [],
      description: '',
    }
  ]
};
