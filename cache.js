module.exports = function(db) {
  return {
    get : function(name, id, callback) {
      db.collection(name).findOne({
        woa_id : id
      }, function(err, entry) {
        if (!entry) {
          return callback(err, null);
        } else {
          return callback(err, entry.data);
        }
      });
    },

    put : function(name, id, data, callback) {
      var entry = {
        woa_id : id,
        data : data
      };
      console.log('PUT in cache, name:', name);
      console.log('PUT in cache, id:', id);
      console.log('PUT in cache, entry:', entry);

      db.collection(name).insert(entry, callback);
    }
  };
};
