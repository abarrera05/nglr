#!/usr/bin/env node
/* global require, console, __dirname */
var path = require("path");
var express = require('express');
var stubGenerator = require('./stub-generator');

var app = express();
app.set("PORT", 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());


// What stubs do we have?
var entities = [];

// Setup routes with fixtures.
var stub = function(name, fixtures) {
    console.log("Stubbing: " + name);
    stubGenerator.initializeEntity(name, fixtures);
    app.get('/' + name, stubGenerator.findAll(name));
    app.get('/' + name + '/:id', stubGenerator.findById(name));
    app.post('/' + name, stubGenerator.create(name));

    var update = stubGenerator.update(name);
    app.post('/' + name + '/:id', update);
    app.put('/' + name + '/:id', update);
    app.delete('/' + name + '/:id', stubGenerator.delete(name));
    entities.push(name);
};

// Stubs for the contact app.
stub("contact", [
    {"first":"Joe","last":"Smith","email":"joe@gmail.com","id":1,
        company_id:"xyz", lotteryWinner : false },
    {"first":"Joe2","last":"Smith2","email":"joe2@gmail.com","id":2,
        company_id:"abc", lotteryWinner : false },
    {"first":"Joe3","last":"Smith3","email":"joe3@gmail.com","phone":"555-1212",
        "id":3, company_id:"xyz", lotteryWinner : false}
]);

app.get("/stub-*", function(req, res) {
    var ent = (req.path.substr(1).split("/")[0]).split("-")[1];
    if (ent && entities.indexOf(ent)==-1 && ent.indexOf(".")==-1) {
        stub(ent);
        res.end();
    }
});

// Fall through to static file serving.
app.use(express.static(path.join(__dirname, '/public')));

app.listen(app.get("PORT"), function() {
    console.log('Server running at http://localhost:%s/', app.get("PORT"));
});

