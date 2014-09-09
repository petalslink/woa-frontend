module.exports = function(config) {
  return {
    token: function (req, res, next) {
      console.log('Validating token : ', req.query.token);
      if (!req.query.token || req.query.token !== config.token) {
        return res.send(403);
      }
      return next();
    }
  };
};