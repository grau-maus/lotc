const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Deck, Card, Deck_Card, Sequelize } = require('../../db/models');

const router = express.Router();

router.get('/mostplayed-standard', asyncHandler(async (req, res) => {
  /*
  SELECT "cardId", SUM("count") as "total", "cardType" FROM "Deck_Cards"
  WHERE "cardType" <> 'lands' AND "cardType" <> 'sideboard'
  GROUP BY "cardId", "count", "cardType"
  ORDER BY "total" DESC
  LIMIT 50;
  */
  const cards = await Deck_Card.findAll({
    include: [{
      model: Card,
      attributes: [],
      where: {
        standard: 'legal'
      }
    }],
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('count')), 'totalCount'],
      [Sequelize.col('Card.name'), 'name']
    ],
    where: {
      cardType: {
        [Op.and]: [
          {
            [Op.not]: 'lands'
          },
          {
            [Op.not]: 'sideboard'
          }
        ]
      }
    },
    group: ['name'],
    order: Sequelize.literal('"totalCount" DESC'),
    limit: 29
  });

  return res.json(cards);
}));

module.exports = router;
