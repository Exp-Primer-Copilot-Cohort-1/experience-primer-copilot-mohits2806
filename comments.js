// Create web server and listen on port 8080
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json()); // for parsing application/json

app.get('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Server error');
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Server error');
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Server error');
        return;
      }
      res.send('Success');
    });
  });
});

app.listen(8080, function() {
  console.log('Server started: http://localhost:8080/');
});
```

##