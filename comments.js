// create a web server that listens on port 3000
// when a request comes in for /comments
// send back a JSON object with some comments

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  console.log('request was made: ' + req.url);
  res.writeHead(200, {'Content-Type': 'application/json'});
  var myObj = {
    name: 'Ryu',
    job: 'Ninja',
    age: 29
  };
  res.end(JSON.stringify(myObj));
});

server.listen(3000, '')