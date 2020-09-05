# SailsWebpackSPA

An Empty Sails Single Page Application [sails文档请点击查看](https://0.12.sailsjs.com/documentation/concepts)

### 1. 清单

> * sails + art ------------------ //node框架、模板引擎
> * webpack4 ----------------- //构建、模块化、打包工具
> * vue -------------------------- //前端框架
> * vue-router ----------------- //前端路由
> * iconfont -------------------- //阿里妈妈图标库 [查看](https://www.iconfont.cn/)

### 2. 全局安装项目

> * nodejs(推荐官网下载包安装，简单方便)
> * npm -g install bower ------------- //js包管理（推荐用npm安装到node，只是npm没有的库再考虑bower安装到前端使用）
> * npm -g install sails@0.12.4 --------------- //nodejs框架

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

### 5. 生成器

```
sails generate page <groupName> <pageName> <moduleName>              //生成新页面文件
sails generate page-module <groupName> <pageName> <moduleName>        //生成页面模块
sails generate ...                                 //sails自带生成器，省略..
```
###### [浏览官方文档--自带生成器，点击查看](https://0.12.sailsjs.com/documentation/reference/command-line-interface/sails-generate)

### 6. 相关配置

1. config/pages.js

    ```javascript
    module.exports.pages = {
      //定义公共的第三方库模块（每一行可为数组并合并打包，并单独加载，此处仅为声明，页面如需使用，请在下面pages中otherJs指定）
      libraries: {
        'libs': ['vue', 'vue-router'],
      },
      //页面配置列表(一组单页视为一个group，可以有无限个子页面，也可以实现多组单页兼并，则在下面数组进行其它页面配置)
      pages: [
        {
          name: 'group-app',                   //页面名
          mainHtml: '/group-app.art',          //页面主html文件 (pages 目录下)
          mainJs: '/views/group-app/main.js',  //页面主js文件 (assets/javascript 目录下)
          otherJs: ['libs'],                   //所需的公共模块（一组libs生成一个引用文件，因此建议一个页面只用一组libs，每组内允许添加多个库）
          isStatic: false,                     //该页面是否为静态页面 (①静态页面则以html格式输出到.tmp/public/pages；②动态页面则输出到views中，可在config/routes中使用)
          title: '单页',                        //页面标题
          keywords: [],                        //页面SEO关键词
          description: '',                     //页面SEO描述
        }
      ]
    }
    ```
2. config/macros.js ------> 全局宏配置（支持前后端共享）

3. config/webpack-loaders.js ------> webpack 加载器配置

4. config/webpack-paths.js ------> webpack 模块别名(路径)配置

5. config/webpack-plugins.js ------> webpack 插件配置

6. 根目录创建.devlaunch，可配置开发时仅启动的页面组
    ```json
      {
        "pages": [
          "group-auth",
          "group-app",
          ""
        ]
      }
    ```


