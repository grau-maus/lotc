'use strict';
const { faker } = require('@faker-js/faker');

const NUM_ARTICLES = 30;
const seederData = [];

for (let i = 0; i < NUM_ARTICLES; i++) {
  seederData.push({
    text: faker.lorem.paragraphs(5),
    title: faker.lorem.words(faker.datatype.number({ min: 6, max: 16 })),
    summary: faker.lorem.words(faker.datatype.number({ min: 6, max: 20 })),
    userId: 1
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
