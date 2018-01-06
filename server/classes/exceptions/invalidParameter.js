'use strict';

const Exception = require('./exception');

class InvalidParameter extends Exception {
  
  constructor(parameter, allowedParameters) {
    super();
    
    this.name = 'InvalidParameter';
    this.message = this.getMessage(parameter, allowedParameters);
    this.status = 400;
    this.param = parameter;
    this.allowedParams = allowedParameters;
  }

  getMessage(param, allowedParams) {
    return `Given parameter {${param}} is not in defined list of allowed parameters {${allowedParams}}.`;
  }
}

module.exports = InvalidParameter;