require('rootpath')();
const users = require('server/api/controllers/users');

module.exports = (app) => {

  app.route('/users/:id(\\d+)')
    .get(users.getUserById);
    
  app.route('/users/:email([\\d\\D]+[@]{1}[\\d\\D]+)')
    .get(users.getUserByEmail);  

  app.route('/users')
    .get(users.getUsers);

  app.route('/users/seed')
    .get(users.seedUsers);
}