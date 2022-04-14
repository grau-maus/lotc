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
    borderCrop: DataTypes.TEXT
  }, {});
  Card.associate = function (models) {
    Card.hasMany(models.Deck_Card, { foreignKey: 'cardId', onDelete: 'CASCADE' })
  };
  return Card;
};
