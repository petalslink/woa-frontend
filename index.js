var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var config = require('./config');
var route = require('./route')(config.routes);
var middleware = require('./middleware')(route, config);

MongoClient.connect(config.mongo.url, function(err, db) {
  if (err) {
    console.log('Can not connect to MongoDB');
    throw err;
  }

  var service = require('./service')(route, db);

  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended : true
  }));

  app.get('*', middleware.token, middleware.isAvailableRoute, function(req, res) {
    route.getRoute(req.path, function(err, route) {
      if (err) {
        return res.send(500);
      }

      if (!route) {
        return res.send(404);
      }

      service.call(route, req, function(err, data) {
        if (err) {
          return res.send(500, err);
        }
        return res.json(data);
      });
    });
  });

  app.listen(config.port || 3000, function(err) {
    if (err) {
      throw err;
    }
    console.log('WOA Cache Frontend is running on', config.port);
    console.log('Configured with', config);
  });
});
