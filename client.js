var request = require('request');
var url = require('url');
var pathToRegexp = require('path-to-regexp');

module.exports.get = function(urlPattern, params, callback) {
  console.log('GET ', urlPattern);

  var parameters = [];
  var parsed = url.parse(urlPattern, true);
  pathToRegexp(parsed.path, parameters);

  parameters.forEach(function(parameter) {
    urlPattern = urlPattern.replace(':' + parameter.name, params[parameter.name]);
    console.log(urlPattern);
  });

  console.log('CALLING URL', urlPattern);

  request.get(urlPattern, {json: true}, function(err, response, body) {
    return callback(err, body);
  });
};