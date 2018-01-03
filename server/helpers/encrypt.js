'use strict';

const bCrypt = require('bcrypt-nodejs');

module.exports = {
  /**
   * Synchronously generate an encrypted password 
   * @param {*} string 
   */
  hash: (string) => {
    return bCrypt.hashSync(string, bCrypt.genSaltSync(10), null);
  },

  /**
   * Synchronously compare a plain text string to an encrypted hash
   * @param {*} string 
   * @param {*} hash 
   */
  compareHash: (string, hash) => {
    bCrypt.compare(string, hash);
  }
}