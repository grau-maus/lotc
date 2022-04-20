'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    face: DataTypes.STRING,
    imgSmall: DataTypes.TEXT,
    imgNormal: DataTypes.TEXT,
    imgLarge: DataTypes.TEXT,
    imgPng: DataTypes.TEXT,
    artCrop: DataTypes.TEXT,
    borderCrop: DataTypes.TEXT,
    standard: DataTypes.STRING,
    future: DataTypes.STRING,
    historic: DataTypes.STRING,
    gladiator: DataTypes.STRING,
    pioneer: DataTypes.STRING,
    modern: DataTypes.STRING,
    legacy: DataTypes.STRING,
    pauper: DataTypes.STRING,
    vintage: DataTypes.STRING,
    penny: DataTypes.STRING,
    commander: DataTypes.STRING,
    brawl: DataTypes.STRING,
    historicbrawl: DataTypes.STRING,
    alchemy: DataTypes.STRING,
    paupercommander: DataTypes.STRING,
    duel: DataTypes.STRING,
    oldschool: DataTypes.STRING,
    premodern: DataTypes.STRING,
  }, {});
  Card.associate = function (models) {
    Card.hasMany(models.Deck_Card, { foreignKey: 'cardId', onDelete: 'CASCADE' })
  };
  return Card;
};
