import _extend from 'lodash/extend';
const Comber = {};

Comber.KComberStorageType = {
  localStorage: 'localStorage',
  sessionStorage: 'sessionStorage'
};

Comber.getConfig = function () {
  return _extend({
    apiUrl: '',
    debug: false,
    getTimeout: 10,
    postTimeout: 60,
    requestVersion: false,
    storage: {},
    alert: () => {},
    beforeGetHandler: (options, from) => {},
    beforePostHandler: (options, from) => {},
    dataHandler: (options, from) => {},
  }, Comber.config);
};

export default Comber;
