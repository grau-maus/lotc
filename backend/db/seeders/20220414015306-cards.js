'use strict';
const cards = require('../../utils/cardSeeder.json');
const cardSeederData = [];

cards.forEach((card, idx) => {
  // for DFC (dual-faced cards)
  if (Array.isArray(card.img)) {
    card.img.forEach((face) => {
      cardSeederData.push({
        name: card.name,
        face: face.name,
        imgSmall: face.small,
        imgNormal: face.normal,
        imgLarge: face.large,
        imgPng: face.png,
        artCrop: face.art_crop,
        borderCrop: face.border_crop
      });
    });
  } else {
    cardSeederData.push({
      name: card.name,
      face: null,
      imgSmall: card.img.small,
      imgNormal: card.img.normal,
      imgLarge: card.img.large,
      imgPng: card.img.png,
      artCrop: card.img.art_crop,
      borderCrop: card.img.border_crop
    });
  }
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cards', cardSeederData, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cards', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
