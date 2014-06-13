/* global require, console, __dirname */
var http = require('http');
var express = require('express');
var morgan  = require('morgan')
var bodyParser = require('body-parser')
var path = require('path');
var app = express();

app.set('port', 8080);
app.use(morgan('dev'));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded());
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var notes = [
    "Wax on, wax off.",
    "Sand the floor.",
    "Paint the house.",
];

http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
    app.get('/api', function(req, res) {
        res.send(notes);
    });
    app.post('/api', function(req, res) {
        var note = req.param("note");
        if (note) {
            notes.push(note);
            // Simple: on success resend notes.
            setTimeout(function() {
                res.send(notes);    
            }, 1000);
        }
        else {
            res.send(500, {error: "Code not process value of 'note' param of " + note});
        }
    });
}).listen(process.env.PORT);


app.use(express.static(path.join(__dirname, 'public')));


app.listen(process.env.PORT, function(){
  console.log('Express server listening on port ' + app.get('port'));
});


