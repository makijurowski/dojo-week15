/* jshint esversion: 6 */

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./node_modules")));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.get('/', function(request, response) {
    response.render('index');
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

require('./routes/index.js')(app, server);