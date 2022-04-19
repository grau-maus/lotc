const fs = require('fs');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { Deck, Card, Deck_Card, Sequelize } = require('../../db/models');
const scgCards = require('../../utils/SCGCardDataAll_20210101-20220331.json');
const dualEffectCards = require('../../utils/dualEffectCardsList.json');

const router = express.Router();

router.get('/homepage', asyncHandler(async (req, res) => {
  const decks = await Deck.findAll({
    where: {
      format: 'Standard'
    },
    attributes: ['date', 'event', 'location'],
    group: ['date', 'event', 'location'],
    order: [['date', 'DESC']],
    limit: 27
  });

  return res.json(decks);
}));



// // route for pulling deckId and cardId, used for local debugging only
// router.get('/test', asyncHandler(async (req, res) => {
//   const allDeckCards = [];
//   const missingCards = new Set();

//   for (let i = 0; i < scgCards.length; i++) {
//     const deckDBRef = await Deck.findOne({
//       where: {
//         link: scgCards[i].deckLink
//       }
//     });

//     for (let j = 0; j < scgCards[i].cards.cards.length; j++) {
//       const cardName = scgCards[i].cards.cards[j].name;
//       const refacName = dualEffectCards.includes(cardName) ? `${cardName} //` : cardName === "Hall of the Storm Giants" ? "Hall of Storm Giants" : cardName;
//       let cardDBRef;

//       if (!refacName.includes(" //")) {
//         cardDBRef = await Card.findOne({
//           where: {
//             [Op.or]: [
//               { name: refacName },
//               { face: scgCards[i].cards.cards[j].name }
//             ]
//           }
//         });
//       } else {
//         cardDBRef = await Card.findOne({
//           where: {
//             [Op.or]: [
//               {
//                 name: {
//                   [Op.iLike]: `%${refacName}%`
//                 }
//               },
//               { face: scgCards[i].cards.cards[j].name }
//             ]
//           }
//         });
//       }

//       if (!cardDBRef) {
//         missingCards.add(scgCards[i].cards.cards[j].name);
//       } else {
//         scgCards[i].cards.cards[j].cardId = cardDBRef.id;
//         scgCards[i].cards.cards[j].deckId = deckDBRef.id;
//       }
//     }

//     allDeckCards.push(scgCards[i].cards.cards);
//   }

//   console.log();
//   console.log();
//   console.log(scgCards[0]);
//   console.log(scgCards[0].cards.cards);
//   console.log();
//   console.log();

//   const splitDecks = [];

//   allDeckCards.forEach((deck, idx) => {
//     if (idx < 1000) {
//       if (!splitDecks[0]) {
//         splitDecks.push([]);
//       }
//       splitDecks[0].push(deck);
//     } else if (idx >= 1000 && idx < 2000) {
//       if (!splitDecks[1]) {
//         splitDecks.push([]);
//       }
//       splitDecks[1].push(deck);
//     } else if (idx >= 2000 && idx < 3000) {
//       if (!splitDecks[2]) {
//         splitDecks.push([]);
//       }
//       splitDecks[2].push(deck);
//     } else if (idx >= 3000 && idx < 4000) {
//       if (!splitDecks[3]) {
//         splitDecks.push([]);
//       }
//       splitDecks[3].push(deck);
//     } else if (idx >= 4000 && idx < 5000) {
//       if (!splitDecks[4]) {
//         splitDecks.push([]);
//       }
//       splitDecks[4].push(deck);
//     } else if (idx >= 5000 && idx < 6000) {
//       if (!splitDecks[5]) {
//         splitDecks.push([]);
//       }
//       splitDecks[5].push(deck);
//     } else if (idx >= 6000 && idx < 7000) {
//       if (!splitDecks[6]) {
//         splitDecks.push([]);
//       }
//       splitDecks[6].push(deck);
//     } else if (idx >= 7000 && idx < 8000) {
//       if (!splitDecks[7]) {
//         splitDecks.push([]);
//       }
//       splitDecks[7].push(deck);
//     } else if (idx >= 8000) {
//       if (!splitDecks[8]) {
//         splitDecks.push([]);
//       }
//       splitDecks[8].push(deck);
//     }
//   });

//   splitDecks.forEach((splitDeck, idx) => {
//     const idxVal = idx < 10 ? `0${idx}` : idx;
//     fs.writeFile(`deckCardSeeder-${idxVal}.json`, JSON.stringify(splitDeck), err => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//     });
//   });


//   return res.json({ result: Array.from(missingCards) });
// }));

module.exports = router;
