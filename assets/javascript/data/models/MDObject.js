import Comber from 'comber';

const MDObject = Comber.Model.extend({
  idAttribute: 'objectId',

});

const MCObject = Comber.Collection.extend({
  model: MDObject,
});

/**
 * 清理所有缓存
 * @param type
 */
MDObject.clearAllStorage = function (type) {
  const storage = new Comber.Storage();
  storage.clearStorage(type);
};

/**
 * 是否已经授权
 */
MDObject.isAuthed = function () {
  return new Promise((ok, no) => {
    if(!app.isLogined()) return ok(false);
    (new MDObject()).fetch({
      url: '/auth/is_auth',
      originData: true,
    }).then(data => {
      ok(data);
    }).catch(error => {
      no(error);
    });
  });
};


export { MDObject, MCObject };
