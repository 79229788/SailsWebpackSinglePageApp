/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a classic and effective way to get your app up
 * and running. Views are normally served from controllers.  Below, you can
 * configure your templating language/framework of choice and configure
 * Sails' layout support.
 *
 * For more information on views and layouts, check out:
 * http://sailsjs.org/#!/documentation/concepts/Views
 */
const template = require('art-template');
const MobileDetect = require('mobile-detect');
const _ = require('lodash');

module.exports.views = {

  /****************************************************************************
  *                                                                           *
  * View engine (aka template language) to use for your app's *server-side*   *
  * views                                                                     *
  *                                                                           *
  * Sails+Express supports all view engines which implement TJ Holowaychuk's  *
  * `consolidate.js`, including, but not limited to:                          *
  *                                                                           *
  * ejs, jade, handlebars, mustache underscore, hogan, haml, haml-coffee,     *
  * dust atpl, eco, ect, jazz, jqtpl, JUST, liquor, QEJS, swig, templayed,    *
  * toffee, walrus, & whiskers                                                *
  *                                                                           *
  * For more options, check out the docs:                                     *
  * https://github.com/balderdashy/sails-wiki/blob/0.9/config.views.md#engine *
  *                                                                           *
  ****************************************************************************/

  engine: {
    /* Template File Extension */
    ext: 'art',

    /* Function to handle render request */
    fn: function (path, data, cb) {
      // 设置模板选项
      template.defaults.escape = false;
      template.defaults.debug = false;
      template.defaults.compileDebug = false;
      template.defaults.cache = !sails.debug;
      template.defaults.minimize = !sails.debug;
      // 设置模板变量
      template.defaults.imports.stringify = JSON.stringify;
      // 绑定设备判断
      const userAgent = data.req.headers['user-agent'];
      const mobileDetect = new MobileDetect(userAgent);
      data.device = {
        isMobile: !!mobileDetect.mobile(),
        isMobilePhone: mobileDetect.mobile() && !mobileDetect.tablet(),
        isMobileTablet: !!mobileDetect.tablet(),
        isIos: mobileDetect.is('iOS'),
        isAndroid: mobileDetect.is('AndroidOS'),
        isIPhone: mobileDetect.is('iPhone'),
        isIPad: mobileDetect.is('iPad'),
        isWeChat: userAgent.indexOf('MicroMessenger') > 0,
        isWeChatDevTool: userAgent.indexOf('wechatdevtools') > 0,
        isWeChatPC: userAgent.indexOf('WindowsWechat') > 0 || userAgent.indexOf('MacWechat') > 0,
        isWeChatPC_Win: userAgent.indexOf('WindowsWechat') > 0 && userAgent.indexOf('MacWechat') < 0,
        isWeChatPC_Mac: userAgent.indexOf('MacWechat') > 0,
        isQQBrowser: userAgent.indexOf('MQQBrowser') > 0,
        isDingTalk: userAgent.indexOf('DingTalk') > 0,
        androidVersion: mobileDetect.version('Android') || -1,
        iosVersion: mobileDetect.version('iOS') || -1,
        webKitVersion: mobileDetect.version('Webkit'),
      };
      cb(null, template(path, data));
    }
  },


  /****************************************************************************
  *                                                                           *
  * Layouts are simply top-level HTML templates you can use as wrappers for   *
  * your server-side views. If you're using ejs or jade, you can take         *
  * advantage of Sails' built-in `layout` support.                            *
  *                                                                           *
  * When using a layout, when one of your views is served, it is injected     *
  * into the `body` partial defined in the layout. This lets you reuse header *
  * and footer logic between views.                                           *
  *                                                                           *
  * NOTE: Layout support is only implemented for the `ejs` view engine!       *
  *       For most other engines, it is not necessary, since they implement   *
  *       partials/layouts themselves. In those cases, this config will be    *
  *       silently ignored.                                                   *
  *                                                                           *
  * The `layout` setting may be set to one of the following:                  *
  *                                                                           *
  * If `false`, layouts will be disabled. Otherwise, if a string is           *
  * specified, it will be interpreted as the relative path to your layout     *
  * file from `views/` folder. (the file extension, ".ejs", should be         *
  * omitted)                                                                  *
  *                                                                           *
  ****************************************************************************/

  /****************************************************************************
  *                                                                           *
  * Using Multiple Layouts                                                    *
  *                                                                           *
  * If you're using the default `ejs` or `handlebars` Sails supports the use  *
  * of multiple `layout` files. To take advantage of this, before rendering a *
  * view, override the `layout` local in your controller by setting           *
  * `res.locals.layout`. (this is handy if you parts of your app's UI look    *
  * completely different from each other)                                     *
  *                                                                           *
  * e.g. your default might be                                                *
  * layout: 'layouts/public'                                                  *
  *                                                                           *
  * But you might override that in some of your controllers with:             *
  * layout: 'layouts/internal'                                                *
  *                                                                           *
  ****************************************************************************/

  layout: 'layout',

  /****************************************************************************
  *                                                                           *
  * Partials are simply top-level snippets you can leverage to reuse template *
  * for your server-side views. If you're using handlebars, you can take      *
  * advantage of Sails' built-in `partials` support.                          *
  *                                                                           *
  * If `false` or empty partials will be located in the same folder as views. *
  * Otherwise, if a string is specified, it will be interpreted as the        *
  * relative path to your partial files from `views/` folder.                 *
  *                                                                           *
  ****************************************************************************/

  partials: false


};
