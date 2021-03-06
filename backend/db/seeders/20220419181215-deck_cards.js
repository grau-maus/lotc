'use strict';
const jsonData = require('../../utils/deckCardSeeder_20210101-20220331.json');

const seederData = [];

jsonData.forEach((card) => {
  const parsedCard = {
    deckId: card.deckId,
    cardId: card.cardId,
    cardType: card.type,
    count: card.count
  };

  seederData.push(parsedCard);
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Deck_Cards', seederData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Deck_Cards', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
