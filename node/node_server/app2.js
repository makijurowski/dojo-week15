/* jshint esversion: 6 */

const fs = require('fs'), http = require('http'), port = 5000;

const server = http.createServer(function server(req, res){
    let file;
    switch (req.url) {
        case "/":
            file = 'index.html';
            break;
        case "/ninjas":
            file = 'ninjas.html';
            break;
        case "/dojos/new":
            file = 'dojos.html';
            break;
        default:
            file = null;
            break;
    }

    if (file !== null) {
        fs.readFile(`${file}`, 'utf8', function(err, contents){ if (err) { console.log(err); }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(contents);
            res.end();
        });
    } 
    else { 
        res.writeHead(404);
        res.end("File not found!");
    }
});

server.listen(port, function(){
console.log("Running on port: ", port);
});