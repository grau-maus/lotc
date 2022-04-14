'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    name: DataTypes.STRING,
    place: DataTypes.STRING,
    player: DataTypes.STRING,
    event: DataTypes.STRING,
    format: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING
  }, {});
  Deck.associate = function (models) {
    Deck.hasMany(models.Deck_Card, { foreignKey: 'deckId', onDelete: 'CASCADE' });
  };
  return Deck;
};
