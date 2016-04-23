require('dotenv').config({silent: true});

var mongo = process.env.MONGO_URI;
if (!mongo) {
    console.log("Missing configuration. Exiting.");
    process.exit();
}

var env = process.env.NODE_ENV || "development";
console.log("Env: " + env);
    
var path = require('path');
var compression = require("compression");

var mongoose = require("mongoose");
mongoose.connect(mongo);

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("etag", false);

require('./server/routes').register(app);

app.use(compression());
app.use(express.static(path.resolve(__dirname, 'client')));

require("./server/start-http").start(app);
