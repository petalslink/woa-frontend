
module.exports = function(config, db) {
  var cache = require('./cache')(db);
  var client = require('./client');

  var getData = function(resource, uuid, callback) {
    // TODO : Real service call in client without timeout
    console.log('Getting data from remote service...');
    setTimeout(function() {
      client.get(config.petals.url + '/' + uuid, function(err, response) {
        return callback(err, response);
      });
    }, 5000);
  };

  return {
    get: function(resource, uuid, callback) {
      console.log('Getting data for UUID ', uuid);

      cache.get(resource, uuid, function(err, data) {
        if (data) {
          console.log('Data found in cache', data);
          return callback(null, data);
        }

        console.log('Data not found in cache');

        if (err || !data) {
          getData(resource, uuid, function(err, result) {
            if (err) {
              console.log('Error while getting data from remote service');
              return callback(err);
            }

            cache.put(resource, uuid, result, function(err, saved) {
              if (err) {
                console.log('Can not put in cache, send back response directly');
                return callback(null, data);
              }
              return callback(null, saved[0]);
            });
          });
        }
      });
    }
  }
};