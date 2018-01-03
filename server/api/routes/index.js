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
    .get(function(req, res, next) {
        let routes = index.getAllRoutes('/api', app._router.stack);
        res.status(200).json(routes);
    });
}