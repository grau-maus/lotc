const fs = require('fs');
const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const cheerio = require('cheerio');
const { Card, Deck } = require('../../db/models');
const { toUSCentralDate } = require('../../utils/dateParser');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  return res.send("nothing here");
}));

// router.get('/check-cards', asyncHandler(async (req, res) => {
//   const allCardData = [];

//   for (let i = 0; i < deckList.length; i++) {
//     const response = await axios.get(deckList[i].deckLink);
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const cardContainer = $(".deck_card_wrapper");
//     const creatureCards = cardContainer.find("div:nth-child(1) > :nth-child(2) > li");
//     const landCards = cardContainer.find("div:nth-child(1) > :nth-child(4) > li");
//     const spellCards = cardContainer.find("div:nth-child(2) > ul > li");
//     const sideboardCards = cardContainer.find("div:nth-child(2) > div > ul > li");

//     creatureCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       allCardData.push(cardName);
//     });
//     landCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       allCardData.push(cardName);
//     });
//     spellCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       allCardData.push(cardName);
//     });
//     sideboardCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       allCardData.push(cardName);
//     });
//     console.log();
//     console.log(`...on deck #${i}`);
//     console.log();
//   }

//   fs.writeFile('SCGCardData.json', JSON.stringify(allCardData), err => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });

//   return res.json({ message: "done" });
// }));

// router.get('/', asyncHandler(async (req, res) => {
//   const deckCardSeederData = [];

//   for (let i = 0; i < deckList.length; i++) {
//     const deck = await Deck.findOne({
//       where: {
//         name: deckList[i].deckName,
//         place: deckList[i].deckFinish,
//         player: deckList[i].deckPlayer,
//         event: deckList[i].event,
//         format: deckList[i].eventFormat,
//         date: new Date(deckList[i].eventDate),
//         location: deckList[i].eventLocation
//       }
//     });
//     const response = await axios.get(deckList[i].deckLink);
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const cardContainer = $(".deck_card_wrapper");
//     const creatureCards = cardContainer.find("div:nth-child(1) > :nth-child(2) > li");
//     const landCards = cardContainer.find("div:nth-child(1) > :nth-child(4) > li");
//     const spellCards = cardContainer.find("div:nth-child(2) > ul > li");
//     const sideboardCards = cardContainer.find("div:nth-child(2) > div > ul > li");
//     const creatureCardAmtName = [];
//     const creatureCardNames = [];
//     const SFCreatureCardNames = [];
//     const DFCreatureCardNames = [];
//     const landCardAmtName = [];
//     const landCardNames = [];
//     const SFLandCardNames = [];
//     const DFLandCardNames = [];
//     const spellCardAmtName = [];
//     const spellCardNames = [];
//     const SFSpellCardNames = [];
//     const DFSpellCardNames = [];
//     const sideboardCardAmtName = [];
//     const sideboardCardNames = [];
//     const SFSideboardCardNames = [];
//     const DFSideboardCardNames = [];

//     creatureCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       creatureCardNames.push(cardName);
//       creatureCardAmtName.push([amount, cardName]);
//     });
//     landCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       landCardNames.push(cardName);
//       landCardAmtName.push([amount, cardName]);
//     });
//     spellCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       spellCardNames.push(cardName);
//       spellCardAmtName.push([amount, cardName]);
//     });
//     sideboardCards.each((i, elem) => {
//       const amount = parseInt($(elem).text().split(" ")[0], 10);
//       const cardName = $(elem).find("a").text().trim();
//       sideboardCardNames.push(cardName);
//       sideboardCardAmtName.push([amount, cardName]);
//     });

//     const SFCreatureCardData = await Card.findAll({
//       where: {
//         name: creatureCardNames
//       }
//     });
//     const SFLandCardData = await Card.findAll({
//       where: {
//         name: landCardNames
//       }
//     });
//     const SFSpellCardData = await Card.findAll({
//       where: {
//         name: spellCardNames
//       }
//     });
//     const SFSideboardCardData = await Card.findAll({
//       where: {
//         name: sideboardCardNames
//       }
//     });

//     SFCreatureCardData.forEach(card => SFCreatureCardNames.push(card.name));
//     creatureCardNames.forEach(cardName => {
//       if (!SFCreatureCardNames.includes(cardName)) {
//         DFCreatureCardNames.push(cardName);
//       }
//     });
//     SFLandCardData.forEach(card => SFLandCardNames.push(card.name));
//     landCardNames.forEach(cardName => {
//       if (!SFLandCardNames.includes(cardName)) {
//         DFLandCardNames.push(cardName);
//       }
//     });
//     SFSpellCardData.forEach(card => SFSpellCardNames.push(card.name));
//     spellCardNames.forEach(cardName => {
//       if (!SFSpellCardNames.includes(cardName)) {
//         DFSpellCardNames.push(cardName);
//       }
//     });
//     SFSideboardCardData.forEach(card => SFSideboardCardNames.push(card.name));
//     sideboardCardNames.forEach(cardName => {
//       if (!SFSideboardCardNames.includes(cardName)) {
//         DFSideboardCardNames.push(cardName);
//       }
//     });

//     const DFCreatureCardData = await Card.findAll({
//       where: {
//         face: DFCreatureCardNames
//       }
//     });
//     const DFLandCardData = await Card.findAll({
//       where: {
//         face: DFLandCardNames
//       }
//     });
//     const DFSpellCardData = await Card.findAll({
//       where: {
//         face: DFSpellCardNames
//       }
//     });
//     const DFSideboardCardData = await Card.findAll({
//       where: {
//         face: DFSideboardCardNames
//       }
//     });

//     const deckCardData = {
//       deckId: deck.id,
//       creatureCards: [],
//       landCards: [],
//       spellCards: [],
//       sideboard: []
//     };

//     creatureCardAmtName.forEach((amtName) => {
//       const [amt, name] = amtName;
//       let cardRef = SFCreatureCardData.find((card) => card.name === name);

//       if (!cardRef) {
//         cardRef = DFCreatureCardData.find((card) => card.face === name);
//       }

//       deckCardData.creatureCards.push({
//         cardId: cardRef.id,
//         cardType: "creature",
//         count: amt
//       });
//     });
//     landCardAmtName.forEach((amtName) => {
//       const [amt, name] = amtName;
//       let cardRef = SFLandCardData.find((card) => card.name === name);

//       if (!cardRef) {
//         cardRef = DFLandCardData.find((card) => card.face === name);
//       }

//       deckCardData.landCards.push({
//         cardId: cardRef.id,
//         cardType: "land",
//         count: amt
//       });
//     });
//     spellCardAmtName.forEach((amtName) => {
//       const [amt, name] = amtName;
//       let cardRef = SFSpellCardData.find((card) => card.name === name);

//       if (!cardRef) {
//         cardRef = DFSpellCardData.find((card) => card.face === name);
//       }

//       deckCardData.spellCards.push({
//         cardId: cardRef.id,
//         cardType: "spell",
//         count: amt
//       });
//     });
//     sideboardCardAmtName.forEach((amtName) => {
//       const [amt, name] = amtName;
//       let cardRef = SFSideboardCardData.find((card) => card.name === name);

//       if (!cardRef) {
//         cardRef = DFSideboardCardData.find((card) => card.face === name);
//       }

//       deckCardData.sideboard.push({
//         cardId: cardRef.id,
//         cardType: "sideboard",
//         count: amt
//       });
//     });
//     deckCardSeederData.push(deckCardData);
//   }

//   fs.writeFile('newTest.json', JSON.stringify(deckCardSeederData), err => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });

//   return res.json({ message: 'mass', deckCardSeederData });
// }));

// router.get('/standard-decklists', asyncHandler(async (req, res) => {
//   const response = await axios.get("https://old.starcitygames.com/content/decklists/");
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const decklists = [];
//   const allStandardDecksLink = $("#content_decks_standard > div a:nth-child(1)").attr('href');

//   $("#content_decks_standard").find('li > a').each((i, elem) => {
//     const decklist = $(elem).text().split(",")[0];
//     const queryLink = $(elem).attr('href');

//     decklists.push({ decklist, queryLink });
//   });

//   return res.json({ decklists, allStandardDecksLink });
// }));



// router.get('/test', asyncHandler(async (req, res) => {
//   let nextUrl = "https://old.starcitygames.com/decks/results/format/1-70-28/start_date/01-01-2021/end_date/31-03-2022/start/1/finish/100/w_perc/0/g_perc/0/r_perc/0/b_perc/0/u_perc/0/a_perc/0/order_1/date%20desc/order_2/last_name/limit/100/start_num/0/";
//   const decklists = [];
//   const dupeCheck = new Set();

// while (nextUrl) {
//   const response = await axios.get(nextUrl);
//   const html = response.data;
//   const $ = cheerio.load(html);
//   const tableData = $("#content > table > tbody").find('tr');

//   tableData.each((i, elem) => {
//     const tableRow = $(elem);

//     if (tableRow.children().length > 1) {
//       const deckLink = tableRow.find("td:nth-child(1) > a").attr("href");
//       const deckName = tableRow.find("td:nth-child(1) strong").text();
//       const deckFinish = tableRow.find("td:nth-child(2) > span").text();
//       const deckPlayer = tableRow.find("td:nth-child(3)").text();
//       const event = tableRow.find("td:nth-child(4)").text();
//       const eventFormat = tableRow.find("td:nth-child(5)").text();
//       const eventDate = toUSCentralDate(
//         "America/Indiana/Knox",
//         tableRow.find("td:nth-child(6) a").text()
//       );
//       const eventLocation = tableRow.find("td:nth-child(7) a").text();
//       const deckInfo = {
//         deckLink,
//         deckName,
//         deckFinish,
//         deckPlayer,
//         event,
//         eventFormat,
//         eventDate,
//         eventLocation
//       };
//       const key = Object.values(deckInfo).join();

//       if (!dupeCheck.has(key)) {
//         decklists.push(deckInfo);
//       }
//       dupeCheck.add(key);
//     }
//   });

//   const nextLink = tableData.find("td:last-child > a:last-child");
//   if (nextLink.text().toLowerCase().includes("next")) {
//     nextUrl = nextLink.attr("href");
//   } else {
//     nextUrl = null;
//   }
// }


// fs.writeFile('newTest.json', JSON.stringify(decklists), err => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

//   return res.json({ message: 'hi planet' });
// }));

module.exports = router;
