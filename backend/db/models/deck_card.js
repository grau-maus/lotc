'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck_Card = sequelize.define('Deck_Card', {
    deckId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Decks' }
    },
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Cards' }
    },
    cardType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Deck_Card.associate = function (models) {
    Deck_Card.belongsTo(models.Deck, { foreignKey: 'deckId' });
    Deck_Card.belongsTo(models.Card, { foreignKey: 'cardId' });
  };
  return Deck_Card;
};
