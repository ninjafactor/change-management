'use strict';

require('rootpath')();
const fs = require('fs');
const path = require('path');
const Exception = require('server/classes/exceptions/exception');
const internalExceptions = getExceptionNames();

/**
 * Exception handler with logging to uniformly return and log
 * exceptions. 
 * @param {bunyan} log 
 */
module.exports = (log) => {
  return (err, req, res, next) => {
    
    if(! internalExceptions.includes(err.name)) {
      err = new Exception(err);
    }

    //log the exception
    log.error(err);
        
    //return exception
    res.status(err.status || 500);
    res.json(err);

    next();
  }
}

/**
 * Read all exception classes and add exception names to the internal 
 * names array
 */
function getExceptionNames() {

  let exceptions = [];
  const exceptionsPath = path.resolve(__dirname, '../classes/exceptions');
  fs.readdirSync(exceptionsPath)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        let exception = require(exceptionsPath + '/' + file);
        exceptions.push(exception.name);
    });

    return exceptions;
}