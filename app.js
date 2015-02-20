/*
 * Author: Colin Mackey
 * Name: CoralStore API
 * Version: 0.1.0
 * 
 * Special thanks to http://pixelhandler.com/posts/develop-a-restful-api-using-nodejs-with-express-and-mongoose
 *   for guidance
 *
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();

// Database
var Schema = mongoose.Schema;

var Coral = new Schema({
    title: String,
    price: Number,
    modified: { type: Date, default: Date.now }
});

var coralModel = mongoose.model('Coral', Coral);

mongoose.connect('mongodb://localhost/coral_database');

// App
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// List corals
app.get('/corals', function (req, res) {
    return coralModel.find(function (err, corals) {
        if (!err)
            return res.send(corals);
        else
            return res.send(err);
    });
});

// Get by title
app.get('/corals/:title', function (req, res) {
    return coralModel.findOne({ 'title': req.params.title }, function (err, coral) {
        if (!err) {
            if (coral)
                return res.send(coral);
            else
                return res.status(404).send('Not Found');
        }
        else
            return res.send(err);
    });
});

// Add coral
app.put('/corals/:title', function (req, res) {
    return coralModel.find({ 'title': req.params.title }, function (err, coral) {
        // if the coral exists
        if (coral.length) {
            return res.status(409).send('Coral Conflict');
        }
        else {
            var coral = new coralModel({
                title: req.params.title,
                price: req.body.price
            });
            coral.save(function (err) {
                if (!err)
                    console.log("created")
                else
                    res.send(err);
            });
            return res.send(coral);
        }
    });
});

// Delete coral
app.delete('/corals/:title', function (req, res){
    return coralModel.findOne({ 'title': req.params.title }, function (err, coral) {
        if (coral) {
            return coral.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            }
            else
                console.log(err);
            });
        }
        else
            return res.status(404).send('Not Found');
    });
});

// Launch Server

app.listen(80);