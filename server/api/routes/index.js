require('rootpath')();
const index = require('server/api/controllers/index');

module.exports = (app) => {
  
  /**
   * All nested routes
   */
  require('./users')(app);
  
  /**
   * Root - List all APIs
   */ 
  app.route('/')
    .get(index.getAllRoutes('/api', app._router.stack));
}