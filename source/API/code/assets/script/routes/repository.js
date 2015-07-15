/*!
 * api.prabhatkumar.org® [v0.0.1]
 * @author    : Prabhat Kumar [http://prabhatkumar.org/]
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/]
 */


/* @Invoking strict mode */
"use strict";

/* API server for api.prabhatkumar.org/ */
var app        = require('../app');
var passport   = require('passport');
var repository = require('../lib/repository');

app.post('/repository/:name', passport.authenticate('basic', { session: false }), function(req, res) {
  var name = req.params.name;
  if (!name) {
    res.sendStatus(400);
    return;
  }
  // @onPostReceive...
  repository.onPostReceive(name, function(err) {
    if (err) {
      switch (err.message) {
        case 'Not Found!':
          res.sendStatus(404);
          break;
      }
      return;
    }
    res.sendStatus(200);
  });
});

