/* jshint esversion: 6 */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");

app.use(express.static(__dirname + "/static"));
console.log(__dirname);
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'encryptionstring'}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index', {title: "My Express Project"});
});

app.get('/users', function(request, response) {
    var users_array = [
        {name: "Mike", email: "mike@codingdojo.com"},
        {name: "Jay", email: "jay@codingdojo.com"},
        {name: "Maki", email: "maki@maki.com"},
        {name: "Potato Ken", email: "spud@spud.com"}
    ];
    response.render('users', {users: users_array});
});

app.get('/users/:id', function(request, response) {
    console.log("The user ID requested is: ", request.params.id);
    response.send("You requested the user with id: " + request.params.id);
});

app.post('/users/add', function(request, response) {
    request.session.name = request.body.name;
    request.session.email = request.body.email;
    console.log("Post Data \n\n", request.session);
    response.redirect('/');
});

app.listen(8000, function() {
    console.log("Listening on port 8000.");
});