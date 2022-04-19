'use strict';
const bcrypt = require('bcryptjs');
const userSeeder100 = require('../../utils/userSeeder100.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'demoAdmin',
        email: 'demo@demo.com',
        roleId: 3,
        hashedPassword: bcrypt.hashSync('password')
      },
      ...userSeeder100
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
