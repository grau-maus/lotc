'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      face: {
        type: Sequelize.STRING
      },
      imgSmall: {
        type: Sequelize.TEXT
      },
      imgNormal: {
        type: Sequelize.TEXT
      },
      imgLarge: {
        type: Sequelize.TEXT
      },
      imgPng: {
        type: Sequelize.TEXT
      },
      artCrop: {
        type: Sequelize.TEXT
      },
      borderCrop: {
        type: Sequelize.TEXT
      },
      standard: {
        type: Sequelize.STRING
      },
      future: {
        type: Sequelize.STRING
      },
      historic: {
        type: Sequelize.STRING
      },
      gladiator: {
        type: Sequelize.STRING
      },
      pioneer: {
        type: Sequelize.STRING
      },
      modern: {
        type: Sequelize.STRING
      },
      legacy: {
        type: Sequelize.STRING
      },
      pauper: {
        type: Sequelize.STRING
      },
      vintage: {
        type: Sequelize.STRING
      },
      penny: {
        type: Sequelize.STRING
      },
      commander: {
        type: Sequelize.STRING
      },
      brawl: {
        type: Sequelize.STRING
      },
      historicbrawl: {
        type: Sequelize.STRING
      },
      alchemy: {
        type: Sequelize.STRING
      },
      paupercommander: {
        type: Sequelize.STRING
      },
      duel: {
        type: Sequelize.STRING
      },
      oldschool: {
        type: Sequelize.STRING
      },
      premodern: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cards');
  }
};
