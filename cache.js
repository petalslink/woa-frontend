module.exports = function(db) {
  return {
    get: function(name, id, callback) {
      db.collection(name).findOne({id: id}, function(err, data) {
        console.log(err);
        console.log(data);
        return callback(err, data);
      });
    },
    put: function(name, id, data, callback) {
      data = data || {};
      data.id = id;
      db.collection(name).insert(data, function(err, saved) {
        console.log(err);
        console.log(saved);
        return callback(err, saved);
      });
    }
  }
};