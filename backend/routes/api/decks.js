const fs = require('fs');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Deck, Card } = require('../../db/models');
const scgCards = require('../../utils/SCGCardDataAll_20210101-20220331.json');

const router = express.Router();

router.get('/test', asyncHandler(async (req, res) => {
  const allCardData = [];
  const missingCards = new Set();
  console.log()
  console.log()
  Card.count().then((res) => console.log(res));
  console.log()
  console.log()

  const dualEffectCards = [
    "Bonecrusher Giant",
    "Fae of Wishes",
    "Giant Killer",
    "Brazen Borrower",
    "Dead",
    "Fire",
    "Crime",
    "Wear",
    "Claim",
    "Murderous Rider",
    "Embereth Shieldbreaker",
    "Commit",
    "Merfolk Secretkeeper",
    "Boom",
    "Dusk",
    "Lovestruck Beast",
    "Hall of the Storm Giants",
    "Rimrock Knight",
    "Hide",
    "Heaven",
    "Shepherd of the Flock",
    "Beanstalk Giant",
    "Assault",
    "Failure",
    "Cut",
    "Faerie Guidemother",
    "Merchant of the Vale",
    "Foulmire Knight",
    "Order of Midnight",
    "Expansion",
    "Driven",
    "Far",
    "Warrant",
    "Rough",
    "Curious Pair"
  ];

  // for (let i = 0; i < scgCards.length; i++) {
  //   const cardRefactor = [];
  //   for (let j = 0; j < scgCards[i].cards.cards.length; j++) {
  //     const cardDBRef = await Card.findOne({
  //       where: {
  //         [Op.or]: [
  //           { name: scgCards[i].cards.cards[j][1] },
  //           { face: scgCards[i].cards.cards[j][1] }
  //         ]
  //       }
  //     });

  //     if (!cardDBRef) {
  //       missingCards.add(scgCards[i].cards.cards[j][1]);
  //     } else {
  //       const cardData = {
  //         count: scgCards[i].cards.cards[j][0],
  //         name: scgCards[i].cards.cards[j][1]
  //       };
  //     }
  //   }

  //   // const deck = await Deck.findOne({
  //   //   where: {
  //   //     name: scgCards[i].deckName,
  //   //     place: scgCards[i].deckFinish,
  //   //     player: scgCards[i].deckPlayer,
  //   //     event: scgCards[i].event,
  //   //     format: scgCards[i].eventFormat,
  //   //     date: new Date(scgCards[i].eventDate),
  //   //     location: scgCards[i].eventLocation
  //   //   }
  //   // });
  // }

  console.log();
  console.log();
  console.log(scgCards[0]);
  console.log(scgCards[0].cards.cards);
  console.log();
  console.log();

  // fs.writeFile('SCGDecklistDataAll_20210101-20220331.json', JSON.stringify(allCardData), err => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  // });

  return res.json({ result: Array.from(missingCards) });
}));

module.exports = router;
