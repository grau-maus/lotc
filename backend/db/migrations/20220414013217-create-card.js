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
