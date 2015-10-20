module.exports = function(routes, db) {

  var cache = require('./cache')(db);
  var client = require('./client');

  return {
    call : function(route, request, callback) {

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

              console.log('Data received from remote service', result);

              // TODO why not send back directly the answer and store in parallel?
              cache.put(resource, id, result, function(err, saved) {
                if (err) {
                  console.log('Can not put in cache, send back response directly', data);
                  return callback(null, result);
                }
                return callback(null, saved.ops[0].data);
              });
            });
          }
        });
      });
    }
  };
};
