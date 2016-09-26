#!/usr/bin/env node

var winston = require('winston');
/**
 * Module dependencies.
 */
var app = require('./api');
var debug = require('debug')('nodejs-test-project:server');
var http = require('http');
/**
 * Normalize a port into a number, string, or false.
 */
var normalizePort = function (val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};
/**
 * Get port from config first, then environment or default
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Event listener for HTTP server "error" event.
 */
var onError = function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winston.log('error', '%s requires elevated privileges', bind);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winston.log('error', '%s is already in use', bind);
      process.exit(1);
      break;
    default:
      throw error;
  }
};
/**
 * Event listener for HTTP server "listening" event.
 */
var onListening = function () {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Uncaught exceptions handler
 */
process.on('uncaughtException', function (err) {
  console.error(err);
});