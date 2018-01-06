'use strict';

class Exception {
    
    /**
     * Base exception class
     * @param {exception} err 
     */
    constructor(err) {
        if(! err) {
            err = {};
        }

        this.name = err.name || 'Exception';
        this.message = err.message || 'An error has ocurred.';
        this.status = err.status || 500;
    }
}

module.exports = Exception;