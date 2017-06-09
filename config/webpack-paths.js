module.exports['webpack-paths'] = function (sails) {
  return {
    //libs
    'vue$': 'vue/dist/vue.common.js',

    //custom
    'libs': sails.paths.assets + '/libs',
    'js': sails.paths.assets + '/js',
    'views': sails.paths.assets + '/js/views',
    'models': sails.paths.assets + '/js/datas/models',
    'database': sails.paths.assets + '/js/datas/database',
    'configs': sails.paths.assets + '/js/datas/configs',
    'tools': sails.paths.assets + '/js/tools',
    'styles': sails.paths.assets + '/styles',
    'images': sails.paths.assets + '/images',
    'fonts': sails.paths.assets + '/fonts',
    'templates': sails.paths.assets + '/templates',
  };
};
