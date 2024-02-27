// Create a web server that listens for requests and serves up a web page
// with a form for adding comments and a list of comments. The comments are
// stored in a file on the server. When the page is requested, the server reads
// the file and includes the comments in the page. When a comment is submitted,
// the server appends it to the file and sends a redirect to the client so the
// client can request the page again and see the new comment.

var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');

var COMMENTS_FILE = path.join(__dirname, 'comments.txt');

function handleRequest(req, res) {
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      var post = qs.parse(body);
      fs.appendFile(COMMENTS_FILE, post.comment + '\n', function (err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.writeHead(302, { 'Location': '/' });
        res.end();
      });
    });
  } else {
    fs.readFile(COMMENTS_FILE, function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><head><title>Comments</title></head><body>' +
              '<h1>Comments</h1>' +
              '<ul>' +
              data.toString().split('\n').map(function (comment) {
                return '<li>' + comment + '</li>';
              }).join('') +
              '</ul>' +
              '<form method="post" action="/">' +
              '<input type="text" name="comment">' +
              '<input type="submit" value="Add comment">' +
              '</form>' +
              '</body></html>');
    });
  }
}

var server = http.createServer(handleRequest);
server.listen(3000, function () {
  console.log('Listening on port 3000');
});