module.exports = function(db) {
  return {
    get: function(name, id, callback) {
      db.collection(name).findOne({woa_id: id}, function(err, data) {
        console.log(err);
        console.log(data);
        return callback(err, data);
      });
    },

    put: function(name, id, data, callback) {
      data.woa_id = id;
      console.log('PUT in cache, name:', name);
      console.log('PUT in cache, id:', id);

      db.collection(name).insert(data, callback);
    }
  }
};