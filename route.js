var pathToRegexp = require('path-to-regexp');

function decode_param(val){
  if (typeof val !== 'string') {
    return val;
  }

  try {
    var result = decodeURIComponent(val);
    if (result && result[result.length - 1] === '?') {
      result = result.substr(0, result.length - 1);
    }
    return result;
  } catch (e) {
    console.log('Failed to decode value');
    return val;
  }
}

module.exports = function(routes) {

  /**
   * Get route from path
   * 
   * @param path
   */
  function getRoute(path, callback) {
    var result = routes.filter(function(route) {
      var params = [];
      var re = pathToRegexp(route.in, params);

      var m = re.exec(path);
      return m !== undefined;
    });

    if (result && result.length > 0) {
      return callback(null, result[0]);
    }
    return callback(new Error('No matching route found'));
  }

  function exists(path, callback) {
    getRoute(path, function(err, route) {
      if (err || !route) {
        return callback(false);
      }
      return callback(true);
    });
  }

  function getParams(path, route, callback) {
    var params = [];
    var re = pathToRegexp(route.in, params);
    var m = re.exec(path);

    var result = {};
    var keys = re.keys;
    var n = 0;
    var key;
    var val;

    for (var i = 1, len = m.length; i < len; ++i) {
      key = keys[i - 1];
      val = decode_param(m[i]);

      if (key) {
        result[key.name] = val;
      } else {
        result[n++] = val;
      }
    }
    return callback(null, result);
  }

  return {
    exists: exists,
    getParams: getParams,
    getRoute: getRoute,
  };
};