/*!
 * api.prabhatkumar.org® [v0.0.1]
 * @author    : Prabhat Kumar [http://prabhatkumar.org/]
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/]
 */


/* @Invoking strict mode */
"use strict";

/* API server for api.prabhatkumar.org/ */
var io    = global.socket;
var usage = require('usage');
var os    = require('os');
var merge = require('utils-merge');

// @nsp.on - socket status...
var nsp = io.of('/status');

nsp.on('connection', function(socket) {
  /*! Emit status. */
  function emitStatus() {
    var pid = process.pid;
    var options = {
      keepHistory: true
    };
    var status = {
      loadAvg: os.loadavg()
    };
    usage.lookup(pid, options, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      merge(status, result);
      socket.emit('status', status);
    });
  }
  emitStatus();
  var intervalID = setInterval(emitStatus, 1000 * 5);
  // @disconnect...
  socket.on('disconnect', function() {
    clearInterval(intervalID);
  });
});
