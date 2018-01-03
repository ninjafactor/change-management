'use strict';

require('rootpath')();
const models = require('server/api/models');
const validator = require('server/helpers/validator').validator;

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
      return res.status(500).json(err);
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
      return res.status(500).json(err);
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
      return res.status(500).json(err);
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
      return res.status(500).json(err);
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
      return res.status(500).json(err);
    });
};

/**
 * Get a list of users matching a query
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getUsers = function(req, res, next) {
  
  let stateScope = req.query.state || 'active';
  let orderByField = req.query.orderByField || 'modifiedDate';
  let orderBySort = req.query.orderBySort || 'desc';
  let orderByScope = {method: ['order', orderByField, orderBySort]};

  //maybe some param validations here
  try {
    stateScope = validator.isIn(stateScope, ['active', 'inactive']);
    orderByField = validator.isIn(orderByField, ['modifiedDate', 'firstName', 'lastName']);
    orderBySort = validator.isIn(orderBySort, ['asc', 'desc']);
  }
  catch(err) {
    return res.status(500).json(err);
  }

  models.users.scope(stateScope, orderByScope).findAndCountAll()
    .then((users) => {
      res.json(users);
      next();
    }).catch((err) => {
      return res.status(500).json(err);
    });
};

/**
 * Seed users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.seedUsers = function(req, res, next) {
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
    return res.status(500).json({ err });
  });
};