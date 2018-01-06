'use strict';

require('rootpath')();
const express = require('express');
const bunyan = require('bunyan');
const requestLogger = require('server/middlewares/requestLogger');
const exceptionHandler = require('server/middlewares/exceptionHandler');

/**
 * The api app
 * @param {*} settings 
 */
function api(settings) {
  
  /**
   * Setup and init logging
   */
  const log = bunyan.createLogger({
      name: settings.app.name,
      serializers: {
        req: requestLogger
      },
      streams: [
        {
          level: 'trace', //log trace and debug,
          stream: process.stdout
        },
        {
          level: 'info', //log warn and info
          type: 'rotating-file',
          path: settings.logging.path + 'api-info.log',
          period: settings.logging.rotatingPeriod,
          count: settings.logging.rotatingCount
        },
        {
          level: 'error', //log fatal and error
          type: 'rotating-file',
          path: settings.logging.path + 'api-error.log',
          period: settings.logging.rotatingPeriod,
          count: settings.logging.rotatingCount
        }
      ]
    });
  log.info('Initializing');
  log.debug({ settings: settings }, 'with settings');

  /**
   * App setup
   */
  const app = express();
  app.set('nodeEnv', settings.env);
  app.set('settings', settings);
  
  /**
   * Define parent route
   * All other routes exist in routes/index
   */
  require('./routes')(app);

  /**
   * Exception handling
   */
  app.use(exceptionHandler(log));
  
  return app;
}

module.exports = api;
