'use strict';

const Exception = require('./exception');

class InvalidParameter extends Exception {
  
  constructor(parameter, allowedParameters) {
    super();
    this.parameter = parameter;
    this.allowedParameters = allowedParameters;
    this.message = this.getMessage();
    this.exception = 'InvalidParameter';
  }

  getMessage() {
    return `Given parameter {${this.parameter}} is not in defined list of allowed parameters {${this.allowedParameters}}.`;
  }
}

module.exports = InvalidParameter;