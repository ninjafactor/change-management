'use strict';

require('rootpath')();
const express = require('express');

/**
 * The api app
 * @param {*} settings 
 */
function api(settings) {
  
  /**
   * Logging
   */
  const loggingStreams = [];
  loggingStreams.push({
    type: 'rotating-file',
    path: settings.logging.path +  'api.log',
    period: settings.logging.rotatingPeriod,
    count: settings.logging.rotatingCount
  });

  const log = require('bunyan')
    .createLogger({
        name: 'DSA',
        streams: loggingStreams
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

  return app;
}

module.exports = api;
