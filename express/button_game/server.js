/* jshint esversion: 6 */

const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./node_modules")));
app.use(express.static(path.join(__dirname, "./bower_components")));

app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('index');
});

let clicker = 0;

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = require("socket.io").listen(server);

io.sockets.on("connection", (socket) => {
    console.log("New connection established:", socket.id);
    socket.on("load", () => {
        console.log("Page loaded.");
        io.emit("count", clicker);
    });
    socket.on("click", () => {
        console.log("Click to Count");
        clicker++;
        console.log(clicker);
        io.emit("count", clicker);
    });
    socket.on("clear", () => {
        console.log("Reset Count");
        clicker = 0;
        console.log(clicker);
        io.emit("count", clicker);
    });
});