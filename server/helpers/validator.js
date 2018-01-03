'use strict';

require('rootpath')();
const validator = require('validator');
const InvalidParameter = require('server/classes/exceptions/invalidParameter');

/**
 * Validatir extension methods
 */

 module.exports.validator = {
  isIn: (needle, haystack) => {
    if(! validator.isIn(needle, haystack)) {
      throw new InvalidParameter(needle, haystack);
    }
    return needle;
  }
 }