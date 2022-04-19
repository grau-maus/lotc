'use strict';
const { faker } = require('@faker-js/faker');
const { User, Article } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const NUM_COMMENTS = 500;
    const seederData = [];
    const numUsers = await User.count();
    const numArticles = await Article.count();

    for (let i = 0; i < NUM_COMMENTS; i++) {
      seederData.push({
        text: faker.lorem.words(),
        articleId: faker.datatype.number({ min: 1, max: numArticles }),
        userId: faker.datatype.number({ min: 1, max: numUsers })
      });
    }

    return queryInterface.bulkInsert('Comments', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
