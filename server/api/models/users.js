'use strict';

require ('rootpath')();
const messages = require('server/helpers/messages');
const crypt = require('server/helpers/encrypt');

module.exports = function(sequelize, DataTypes) {
  /**
   * Field definitions
   */
  const fields = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      },
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      },
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: {
          args: true,
          msg: messages.get('validations.email')
        }
      },
      field: 'email'
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active'
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login_date'
    },
    createdDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_date'
    },
    modifiedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'modified_date'
    },
    //VIRTUAL
    password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
        this.setDataValue('password', val);
        this.setDataValue('passwordHash', crypt.hash(val));
      },
      validate: {
        len: {
          args: [5,50],
          msg: messages.get('validations.passwordLength')
        }
      },
      isChangingPassword: {
        type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN),
        get: (val) => {
          return false;
        }
      }
    }
  };

  /**
   * Table definition
   */
  const definition = {
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ],
    defaultScope: {
      attributes: {exclude: ['passwordHash']},
      where: {isActive: true}
    },
    scopes:{
      active: {where: {isActive: true}},
      inactive: {where: {isActive: false}},
      single: {
        include: [
          //{model: sequelize.models...}
        ]
      },
      email: (val) => {
        return {
          where: {email: val}
        }
      },
      order: (field, order) =>{
        return {
          order: [[field, order]]
        }
      }
    }
  };

  /**
   * Return resulting table
   */
  return sequelize.define('users', fields, definition);
};