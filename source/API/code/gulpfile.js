/*!
 * api.prabhatkumar.org® [v0.0.1]
 * _____________________________________________________
 * Gulp: The streaming build system.
 * https://github.com/gulpjs/gulp | http://gulpjs.com/
 * @author    : Prabhat Kumar [http://prabhatkumar.org/]
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/]
 * @date      : 15-July-2015
 * _____________________________________________________
 * @require   : Node.js®
 * @require   : Gulp
 * _____________________________________________________
 */




/* @Invoking strict mode */
"use strict";

// main module.
var gulp                   = require('gulp');
var coffee          = require('gulp-coffee');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var beautify      = require('gulp-beautify');
var sourcemaps  = require('gulp-sourcemaps');
// utility modules.
var path                   = require('path');
var gutil             = require('gulp-util');
var gulpif              = require('gulp-if');
var size              = require('gulp-size');
var del                     = require('del');
var notify          = require("gulp-notify");
var rename          = require("gulp-rename");
var replace        = require('gulp-replace');
var bytediff      = require('gulp-bytediff');
var chmod            = require('gulp-chmod');
