const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const apiApp = require('./api/app');

/**
 * All apps 
 * @param {*} settings 
 */
function wrapper (settings) {
  const secrets = require('../config/secrets');
  const helmet = require('helmet');
  const cookieParser = require('cookie-parser');
  const csurf = require('csurf');

  const app = express();
  app.set('nodeEnv', settings.env);
  app.set('settings', settings);

  // Security
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  
  settings.standalone = false;
  app.use(settings.apiAppMountPath, apiApp(settings));
  
  /**
   * Middlewares
   */
  
  return app;
}

module.exports = wrapper;