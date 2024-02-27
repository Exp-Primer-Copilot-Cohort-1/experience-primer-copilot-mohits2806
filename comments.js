// Create web server and listen for requests
// Use express and body-parser
// Use the comments API to manage comments
// Use the comments API to manage comments

var express = require('express');
var bodyParser = require('body-parser');
var comments = require('./comments-api');

var app = express();
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  comments.getAll(function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/comments', function(req, res) {
  comments.add(req.body, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});