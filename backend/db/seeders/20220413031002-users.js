'use strict';
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_USERS = 100;
const seederData = [];

for (let i = 0; i < NUM_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  seederData.push({
    username: faker.internet.userName(firstName, lastName),
    email: faker.internet.email(firstName, lastName),
    roleId: 1,
    hashedPassword: bcrypt.hashSync(faker.internet.password())
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'demoAdmin',
        email: 'demo@demo.com',
        roleId: 3,
        hashedPassword: bcrypt.hashSync('password')
      },
      ...seederData
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
