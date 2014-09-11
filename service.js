
module.exports = function(config, db) {

  var cache = require('./cache')(db);
  var client = require('./client');
  var routes = require('./route')(config.route);

  return {
    call: function(route, request, callback) {

      routes.getParams(request.path, route, function(err, params) {
        if (err) {
          return callback(err);
        }

        var id = params[route.resource.id] || route.resource.id;
        var resource = route.resource.name;

        console.log('ID:', id);
        console.log('RESOURCE:', resource);

        cache.get(resource, id, function(err, data) {
          if (data) {
            console.log('Data found in cache', data);
            return callback(null, data);
          }

          console.log('Data not found in cache');

          if (err || !data) {
            client.get(route.out, params, function(err, result) {
              if (err) {
                console.log('Error while getting data from remote service');
                return callback(err);
              }

              cache.put(resource, id, result, function(err, saved) {
                if (err) {
                  console.log('Can not put in cache, send back response directly', data);
                  return callback(null, result);
                }
                return callback(null, saved[0].data);
              });
            });
          }
        });
      });
    }
  }
};
