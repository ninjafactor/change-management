const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const api = require('./api/app');

/**
 * All apps 
 * @param {*} settings 
 */
function wrapper (settings) {
  const secrets = require('../config/secrets');
  const helmet = require('helmet');
  const cookieParser = require('cookie-parser');
  const csurf = require('csurf');
  /*let session = require('express-session');
  let RedisStore = require('connect-redis')(session);*/

  const app = express();
  app.set('nodeEnv', settings.env);
  app.set('settings', settings);

  // Security
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  /*app.use(session({
    proxy: settings.useSecureCookie,
    secret: secrets.secretKeyBase,
    cookie: {
      httpOnly: true,
      secure: settings.useSecureCookie
    },
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      host: settings.redis.hostName,
      port: settings.redis.port
    })
  }));

  app.use(csurf());
  app.use(function (req, res, next) {
    let acceptHeader = req.get('accept');
    if (typeof acceptHeader === 'string' && acceptHeader.indexOf('text/html') === 0) {
      res.cookie('XSRF-TOKEN', req.csrfToken(), { path: settings.appMountPath, secure: settings.useSecureCookie });
    }
    next();
  });*/
  

  settings.standalone = false;
  app.use(settings.apiAppMountPath, api(settings));
  
  /**
   * Middlewares
   */


  return app;
}

module.exports = wrapper;