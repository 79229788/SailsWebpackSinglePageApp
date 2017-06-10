# SailsWebpackSinglePageApp

An Empty Sails Application [sails文档请点击查看](http://sailsjs.org)

### 1. 清单

> * sails + swig -------------- //node框架、模板引擎
> * webpack ----------------- //构建、模块化、打包工具
> * vue ------------------------ //前端框架
> * vue-router --------------- //前端路由

### 2. 全局安装项目

> * nodejs(推荐官网下载包安装，简单方便)
> * npm -g install bower ------------- //js包管理（推荐用npm安装到后端，只是npm没有的库再考虑bower安装到前端使用）
> * npm -g install sails --------------- //nodejs框架

### 3. 初始化项目

```
npm install
```

### 4. 项目启动

```
sails lift                  //普通开发模式    (请访问http://localhost:1337，host地址可在config/macros.js中更改)
sails lift --hot            //热加载开发模式 （webpack hot reload）(请访问http://localhost:3000)
sails lift --prod           //普通生产模式   （webpack打包所有资源）
sails lift --prod --fast    //极速生产模式   (webpack不进行打包，.tmp网站目录不会生成任何文件，需要结合cdn部署，cdn源站地址请在config/macros.js中设置)
sails lift --prod --deploy  //生产部署模式   （webpack打包所有资源至www文件夹 + cdn网络部署(需自行在api/deploy/index.js中实现上传整个www目录文件至cdn源站)））
sails lift --only --deploy  //仅仅部署       （一般当生产部署模式中cdn上传失败时，才使用此命令，仅重新执行了api/deploy/index.js）
```

### 4. 生成器

```
sails generagte page        //生成新页面文件(单页面的content部分)
sails generagte ...         //sails自带生成器，[浏览官方文档](http://sailsjs.com/documentation/reference/command-line-interface/sails-generate)
```

### 5. 相关配置

1. config/pages.js

    ```javascript
    module.exports.pages = {
      //定义公共的第三方库模块（自动合并数组内的库，合并后每个页面均会自动单独加载）
      libs: ['vue'],
      //自定义js脚本（每一行可为数组并合并打包，并单独加载，此处仅为声明，页面如需使用，请在下面pages中otherJs指定）
      scripts: {
        'pub': ['./assets/js/app.js'],
      },
      //页面配置列表(一般情况下单页只需一个主page，如需单页和多页兼并，则在下面数组进行其它页面配置)
      pages: [
        {
          name: 'app',                 //页面名
          mainHtml: '/app.swig',       //页面主html文件
          mainJs: 'app.js',            //页面主js文件
          otherJs: ['pub'],            //所需的公共模块
          isStatic: false,             //该页面是否为静态页面。①静态页面则以html格式输出到.tmp/public/pages；②动态页面则输出到views中，可在config/routes中使用
          title: '单页',                //页面标题
          keywords: null,              //页面SEO关键词
          description: null,           //页面SEO描述
        }
      ]
    }
    ```
2. config/macros.js ------> 全局宏配置（支持前后端共享）

3. config/webpack-loaders.js ------> webpack 加载器配置

4. config/webpack-paths.js ------> webpack 模块别名(路径)配置

5. config/webpack-plugins.js ------> webpack 组件配置

