/* jshint esversion: 6 */

var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var counter = 0;

app.use(express.static(path.join(__dirname + "/static")));
app.use(session({secret: 'SecretString'}));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    counter++;
    request.session.counter = counter;
    response.render('index', {counter: request.session.counter});
});

app.listen(7000, function() {
    console.log("Listening on port 7000.");
});