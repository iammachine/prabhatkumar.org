/*!
 * api.prabhatkumar.org® [v0.0.1]
 * @author    : Prabhat Kumar [http://prabhatkumar.org/]
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/]
 */


/* @Invoking strict mode */
"use strict";

/* API server for api.prabhatkumar.org/ */
var exec    = require('child_process').exec;
var path    = require('path');
var fs      = require('fs-extra');
var async   = require('async');
var app     = require('../app');
var webapps = app.get('config').webapps;

function onExec(callback) {
  return function(error, stdout, stderr) {
    if (stdout.length) {
      console.log(stdout);
    }
    if (stderr.length) {
      console.log(stderr);
    }
    callback(error ? error : null);
  };
}

function execSeries(command, cwd) {
  return function(callback) {
    console.log(command);
    exec(command, {cwd: cwd}, onExec(callback));
  };
}
