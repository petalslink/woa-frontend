module.exports = function(config) {
  var route = require('./route')(config.routes);

  return {
    token: function (req, res, next) {
      console.log('Validating token : ', req.query.token);
      console.log('Configured token : ', config.token);
      if (!req.query.token || req.query.token !== config.token) {
	return res.status(403).end()
      }
      return next();
    },
    
    isAvailableRoute: function(req, res, next) {
      route.exists(req.path, function(found) {
        if (!found) {
          return res.send(404);
        }
        return next();
      });
    }
  };
};
