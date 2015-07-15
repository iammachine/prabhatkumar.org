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
