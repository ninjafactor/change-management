'use strict';

require('rootpath')();
const validator = require('validator');
const InvalidParameter = require('server/classes/exceptions/invalidParameter');

/**
 * Validations
 */
 module.exports = {
  all: (validations) => {
    return Promise.all(validations);
  },
  isIn: (needle, haystack) => {
    return new Promise(function (resolve, reject) {
      if(! validator.isIn(needle, haystack)) {
        reject(new InvalidParameter(needle, haystack));
      }
      resolve();
    });
  }
 }