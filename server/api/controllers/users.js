'use strict';

require('rootpath')();
const models = require('server/api/models');
const validate = require('server/helpers/validate');

/**
 * Get a user by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getUserById = (req, res, next) => {
  models.users.scope('single').findById(req.params.id)
    .then((user) => {
      res.json(user);
      next();
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Get a user by email address
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getUserByEmail = (req, res, next) => {
  models.users.scope('single', {method: ['email', req.params.email]}).find()
    .then((user) => {
      res.json(user);
      next();
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Update a user by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.putUser = (req, res, next) => {
  models.users.update(
    {
      firstName: req.body.firstName,
      lassName: req.body.firstName,
      email: req.body.email
    },
    {
      where: {id: req.params.id}
    })
    .then((user) => {
      res.json(user);
      next();
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Delete a user by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteUser = (req, res, next) => {
  models.users.destroy({
    where: {id: req.params.id}
  })
    .then((result) => {
      res.json(result);
      next();
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Create a user by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postUser = (req, res, next) => {
  models.users.create(
    {
      firstName: req.body.firstName,
      lassName: req.body.firstName,
      email: req.body.email,
      password: req.body.password
    })
    .then((user) => {
      res.json(user);
      next();
    })
    .catch((err) => {
      next(err);
    });
};

/**
 * Get a list of users matching a query
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getUsers = (req, res, next) =>  {
  let stateScope = req.query.state || 'active';
  let orderByField = req.query.orderByField || 'modifiedDate';
  let orderBySort = req.query.orderBySort || 'desc';
  let orderByScope = {method: ['order', orderByField, orderBySort]};
  
  validate.all([
    validate.isIn(stateScope, ['active', 'inactive']),
    validate.isIn(orderByField, ['modifiedDate', 'firstName', 'lastName']),
    validate.isIn(orderBySort, ['asc', 'desc'])
  ])
    .then(() => {
      return models.users.scope(stateScope, orderByScope).findAndCountAll()
    })
    .then((users) => {
      res.json(users);
      next();
    }).catch((err) => {
      console.log(err);
      next(err);
    });
};

/**
 * Seed users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.seedUsers = (req, res, next) =>  {
  let newUsers = [];

  for(let i = 0; i <= 10; i++) {
    let newUser = {
      firstName: `yay${i}` ,
      lastName: `yayers${i}`,
      email: `boop${i}@boopers.com`,
      password: `boop${i}`
    };
    newUsers.push(newUser);
  }

  models.users.bulkCreate(newUsers).then((users) => {
    res.json(users);
    next();
  }).catch((err) => { 
    next(err);
  });
};