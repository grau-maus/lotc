'use strict';
const deckList = require('../../utils/SCGCardDataAll_20210101-20220331.json');
const deckListSeeder = [];

deckList.forEach((deck) => {
  deckListSeeder.push({
    name: deck.deckName,
    place: deck.deckFinish,
    player: deck.deckPlayer,
    event: deck.event,
    format: deck.eventFormat,
    date: new Date(deck.eventDate),
    location: deck.eventLocation,
    link: deck.deckLink
  });
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Decks', deckListSeeder, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Decks', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
