module.exports['webpack-paths'] = function (sails) {
  return {
    //libs
    'vue$': 'vue/dist/vue.common.js',
    'vue-router': 'vue-router/dist/vue-router.js',

    //custom
    'assets': sails.paths.assets,
    'library': sails.paths.assets + '/library',
    'libs': sails.paths.assets + '/javascript/libs',
    'js': sails.paths.assets + '/javascript',
    'views': sails.paths.assets + '/javascript/views',
    'models': sails.paths.assets + '/javascript/data/models',
    'database': sails.paths.assets + '/javascript/data/database',
    'configs': sails.paths.assets + '/javascript/data/configs',
    'utils': sails.paths.assets + '/javascript/utils',
    'styles': sails.paths.assets + '/styles',
    'images': sails.paths.assets + '/images',
    'fonts': sails.paths.assets + '/fonts',
    'templates': sails.paths.assets + '/templates',
    'statics': sails.paths.assets + '/statics',
  };
};
