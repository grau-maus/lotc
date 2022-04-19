'use strict';
const { faker } = require('@faker-js/faker');
const { User, Article } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const numUsers = await User.count();
    const numArticles = await Article.count();
    const seederData = [];
    const totalDislikes = faker.datatype.number({ min: 1, max: numUsers * numArticles });
    const duplicateChecker = new Set();

    for (let i = 0; i < totalDislikes; i++) {
      let candidUserId = faker.datatype.number({ min: 1, max: numUsers });
      let candidArticleId = faker.datatype.number({ min: 1, max: numArticles });
      let key = `${candidUserId}-${candidArticleId}`;

      while (duplicateChecker.has(key)) {
        candidUserId = faker.datatype.number({ min: 1, max: numUsers });
        candidArticleId = faker.datatype.number({ min: 1, max: numArticles });
        key = `${candidUserId}-${candidArticleId}`;
      }

      duplicateChecker.add(key);

      seederData.push({
        userId: candidUserId,
        articleId: candidArticleId
      });
    }

    return queryInterface.bulkInsert('Dislikes', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Dislikes', null, {});
  }
};
