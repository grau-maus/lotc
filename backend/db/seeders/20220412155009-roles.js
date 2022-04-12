'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        userRole: 'user'
      },
      {
        userRole: 'moderator'
      },
      {
        userRole: 'admin'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
