/* jshint esversion: 6 */

var http = require('http');
var fs = require('fs');
var port = 6789;

// Create web server
var server = http.createServer(function (request, response) {
    console.log('client request URL:', request.url);
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', function (errors, contents) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else if(request.url === '/ninjas') {
        fs.readFile('ninjas.html', 'utf8', function (errors, contents) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else if(request.url === '/dojos/new') {
        fs.readFile('dojos.html', 'utf8', function (errors, contents) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents);
            response.end();
        });
    }
    else {
        response.writeHead(404);
        response.end('File not found!');
    }
});

server.listen(port);
console.log("Running in localhost at port 6789");