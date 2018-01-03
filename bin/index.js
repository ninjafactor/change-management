#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */
require('rootpath')();
const settingsOptions = {};
const settings = require('config/settings')(settingsOptions);
const apps = require('server/wrapper')(settings);
const debug = require('debug')('dsa:server');
const http = require('http');
const models = require('server/api/models');

/**
 * Get port and store in express
 */
const port = normalizePort(settings.server.port || 3000);
apps.set('port', port);

/**
 * Create HTTP server.
 * Listen on provided port, on all network interfaces.
 */
const server = http.createServer(apps);
// .sync({force: true}) will drop the table if it already exists
models.sequelize.sync({force: true}).then(function() {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
