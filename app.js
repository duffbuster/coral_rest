/*
 * Author: Colin Mackey
 * Name: CoralStore API
 * Version: 0.0.1
 * 
 * Special thanks to http://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
 *   for guidance
 *
 */

var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();

// Database

var Schema = mongoose.Schema;

var Coral = new Schema({
    title: String,
    description: { type: String, default: null },
    modified: { type: Date, default: Date.now }
});

var coralModel = mongoose.model('Coral', Coral);

mongoose.connect('mongodb://localhost/coral_database');

// App

app.use(express.static('public'));

// List corals
app.get('/corals', function (req, res) {
    return coralModel.find(function (err, corals) {
        if (!err)
            return res.send(corals);
        else
            return res.send(err);
    })
});

// Launch Server

app.listen(6969);