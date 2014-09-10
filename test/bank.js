var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/bank/account/:uuid/amount', function(req, res) {
  console.log('Bank called for ', req.params.uuid);

  var wait = 1;
  if (req.params.uuid === '123') {
    wait = 5000;
  }

  setTimeout(function() {
    console.log('Send back result for uuid', req.params.uuid);
    return res.json(200, {uuid: req.params.uuid, amount: 9999999999});
  }, wait);

});

app.listen(3001, function(err) {
  if (err) {
    throw err;
  }
  console.log('Bank service started');
});