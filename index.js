var express = require('express');
var config = require('./config');
var MongoClient = require('mongodb').MongoClient;

var middleware = require('./middleware')(config);

MongoClient.connect(config.mongo.url, function(err, db) {
  if (err) {
    console.log('Can not connect to MongoDB');
    throw err;
  }

  var service = require('./service')(config, db);

  var app = express();
  app.get('/', function (req, res) {
    res.send(200);
  });

  app.get('/api/:resource/:uuid', middleware.token, function(req, res) {

    if (!req.params.resource) {
      return res.send(400);
    }

    if (!req.params.uuid) {
      return res.send(400);
    }

    service.get(req.params.resource, req.params.uuid, function(err, data) {
      if (err) {
        return res.send(500, err);
      }
      return res.json(data);
    })
  });

  app.listen(config.port || 3000, function(err) {
    if (err) {
      throw err;
    }
    console.log('Frontend is running on ', config.port);
    console.log('Configuration ', config);
  });
});