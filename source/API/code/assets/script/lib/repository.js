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

function noop(callback) {
  process.nextTick(function() {
    callback(null);
  });
}

function clean(outputPath) {
  return function(callback) {
    fs.exists(outputPath, function(exists) {
      if (!exists) {
        callback(null);
        return;
      }
      fs.remove(outputPath, function(err) {
        if (err) {
          callback(err);
          return;
        }
        callback(null);
      });
    });
  };
}

function copy(cwd, outputPath) {
  return function(callback) {
    fs.copy(cwd, outputPath, function(err) {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  };
}

function build(repository, outputPath) {
  console.log('Building [prabhatkumar.org]' + repository + '...');
  var dir = path.resolve(process.cwd(), repository);
  fs.exists(dir + '/bower.json', function(bower) {
    async.series([
      execSeries('git checkout .', dir),
      bower ? execSeries('bower prune --allow-root', dir) : noop,
      execSeries('npm prune', dir),
      bower ? execSeries('bower install --allow-root', dir) : noop,
      execSeries('npm install', dir),
      execSeries('grunt', dir),
      clean(outputPath),
      copy(dir + '/dist', outputPath)
    ], function(err) {
      if (err) {
        console.log(err);
      }
    });
  });
}

exports.build = build;

exports.onPostReceive = function(repository, callback) {
  console.log('Updating [prabhatkumar.org]' + repository + '...');
  var dir = path.resolve(process.cwd(), repository);
  fs.exists(dir, function(exists) {
    if (!exists) {
      callback(new Error('Not Found!'));
      return;
    }
    async.series([
      execSeries('git checkout .', dir),
      execSeries('git pull -v --no-rebase --progress  "origin"', dir)
      ], function(err) {
        if (err) {
          callback(err);
          return;
        }
      for (var i = 0; i < webapps.length; i++) {
        if (repository === webapps[i]) {
          var outputPath = 'prabhatkumar.org/' + repository;
          dir = path.resolve(process.cwd(), outputPath);
          build(repository, dir);
        }
      }
      callback(null);
    });
  });
};
