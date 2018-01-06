'use strict';

/**
 * Logger serializer for bunyan to log access requests
 * @param {bunyan} log 
 */
module.exports = (log) => {
  return (req, res, next) => {
    let request = {
      method: req.method,
      url: req.url,
      headers: req.headers
    }
    log.info(request, 'request');
    next();
  }
}