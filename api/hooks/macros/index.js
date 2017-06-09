/**
 * macros hook
 */

module.exports = function (sails) {
  return {
    configure: function () {
      sails.config.macros(sails);
    },
    initialize: function (next) {
      return next();
    }
  };
};
