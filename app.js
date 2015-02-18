/*
 * Author: Colin Mackey
 * Name: CoralStore API
 * Version: 0.0
 * 
 * Special thanks to http://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
 *   for guidance
 *
 */




var application_root = __dirname,
    express = require("express"),
    path = require("path"),
    mongoose = require("mongoose");

var app = express.createServer();

// Database

mongoose.connect('mongodb://localhost/coral_database');

// Config

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/api', function (req, res) {
    res.send('Coral API is running');
});

// Launch Server

app.listen(6969);