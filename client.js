var request = require('request');

module.exports.get = function(url, callback) {
  console.log('GET ', url);
  return callback(null, {amount: 123456789});
};