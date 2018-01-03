const merge = require('merge');
const envSettings = require('./envSettings.json');
const version = require('./version.json');
const path = require('path');

const defaultSettings = {
  app: {
    name: 'app_name'
  },
  healthcheck: {
    applicationName: 'app_name',
    version: version,
    checks: {}
  },
  default: {
    timezone: 'UTC'
  },
  client: {
    timezone: 'UTC'
  },
  logging: {
    path: path.dirname(require.main.filename) + '/../log/',
    rotatingPeriod: '1d', //daily
    rotatingCount: 3, //keep n copies back
  },
  sequelize: {
    options: {
      dialect: 'mysql',
      operatorsAliases: false, //Using Sequelize without any aliases improves security
      define: { //Default options for model definitions. See sequelize.define for options
        engine: 'InnoDB',
        timestamps: false,
        underscored: true,
        underscoredAll: true,
        createdAt: 'createdDate',
        updatedAt: 'updatedDate'
      }
    }
  }
};

module.exports = (settingsOptions) => {
  return merge.recursive(true, defaultSettings, envSettings);
}