'use strict';

const { ValidatorsImpl } = require("express-validator/src/chain");
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: { model: 'Roles' }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'roleId']
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ['hashedPassword', 'roleId']
          },
        },
        loginUser: {
          attributes: {},
        },
      },
    });

  User.prototype.toSafeObject = function () {
    const { id, username, email, createdAt, updatedAt } = this;
    const user = { id, username, email, createdAt, updatedAt };
    return user;
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function (models) {
    User.hasMany(models.Article, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
  };

  return User;
};
