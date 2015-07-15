/*!
 * api.prabhatkumar.org® [v0.0.1]
 * @author    : Prabhat Kumar [http://prabhatkumar.org/]
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/]
 */
 


/* @Invoking strict mode */
"use strict";

/* API server for api.prabhatkumar.org/ */
var http          = require('http');
var https         = require('https');
var fs            = require('fs');
var express       = require('express');
var passport      = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var forceSSL      = require('express-force-ssl');
var bodyParser    = require('body-parser');
/* API Server Options. */
var options = {
 key:  fs.readFileSync('keys/api.key'),
 cert: fs.readFileSync('keys/api_prabhatkumar_org.crt')
};

var app          = express();
module.exports   = app;

app.set('config', require('./config'));

// @passport.use
passport.use(new BasicStrategy(function(username, password, done) {
 var config = app.get('config');
 if (config.accounts) {
  for (var i = 0; i < config.accounts.length; i++) {
   var account = config.accounts[i];
   if (account.username === username && account.password === password) {
    return done(null, account);
   }
  }
 }
 return done(null, false);
}));
