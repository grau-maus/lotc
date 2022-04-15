const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const deckList = require('./SCGCardData-0.5.json');

const getAllCardData = async () => {
  const allCardData = [];

  for (let i = 0; i < deckList.length; i++) {
    const response = await axios.get(deckList[i].deckLink);
    const html = response.data;
    const $ = cheerio.load(html);
    const cardContainer = $(".deck_card_wrapper");
    const creatureCards = cardContainer.find("div:nth-child(1) > :nth-child(2) > li");
    const landCards = cardContainer.find("div:nth-child(1) > :nth-child(4) > li");
    const spellCards = cardContainer.find("div:nth-child(2) > ul > li");
    const sideboardCards = cardContainer.find("div:nth-child(2) > div > ul > li");
    const deckData = {
      deckLink: deckList[i].deckLink,
      cards: []
    };

    creatureCards.each((i, elem) => {
      const amount = parseInt($(elem).text().split(" ")[0], 10);
      const cardName = $(elem).find("a").text().trim();
      deckData.cards.push([amount, cardName]);
    });
    landCards.each((i, elem) => {
      const amount = parseInt($(elem).text().split(" ")[0], 10);
      const cardName = $(elem).find("a").text().trim();
      deckData.cards.push([amount, cardName]);
    });
    spellCards.each((i, elem) => {
      const amount = parseInt($(elem).text().split(" ")[0], 10);
      const cardName = $(elem).find("a").text().trim();
      deckData.cards.push([amount, cardName]);
    });
    sideboardCards.each((i, elem) => {
      const amount = parseInt($(elem).text().split(" ")[0], 10);
      const cardName = $(elem).find("a").text().trim();
      deckData.cards.push([amount, cardName]);
    });

    console.log();
    console.log(`...on deck #${i}`);
    console.log();

    allCardData.push(deckData);
  }

  fs.writeFile('SCGDeckCardsData-0.5.json', JSON.stringify(allCardData), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const splitDeckListData = () => {
  const splitDecks = [];

  deckList.forEach((deck, idx) => {
    if (idx < 500) {
      if (!splitDecks[0]) {
        splitDecks[0] = [];
      }
      splitDecks[0].push(deck);
    } else if (idx >= 500) {
      if (!splitDecks[1]) {
        splitDecks[1] = [];
      }
      splitDecks[1].push(deck);
    }
    // if (idx < 1000) {
    //   if (!splitDecks[0]) {
    //     splitDecks[0] = [];
    //   }
    //   splitDecks[0].push(deck);
    // } else if (idx >= 1000 && idx < 2000) {
    //   if (!splitDecks[1]) {
    //     splitDecks[1] = [];
    //   }
    //   splitDecks[1].push(deck);
    // } else if (idx >= 2000 && idx < 3000) {
    //   if (!splitDecks[2]) {
    //     splitDecks[2] = [];
    //   }
    //   splitDecks[2].push(deck);
    // } else if (idx >= 3000 && idx < 4000) {
    //   if (!splitDecks[3]) {
    //     splitDecks[3] = [];
    //   }
    //   splitDecks[3].push(deck);
    // } else if (idx >= 4000 && idx < 5000) {
    //   if (!splitDecks[4]) {
    //     splitDecks[4] = [];
    //   }
    //   splitDecks[4].push(deck);
    // } else if (idx >= 5000 && idx < 6000) {
    //   if (!splitDecks[5]) {
    //     splitDecks[5] = [];
    //   }
    //   splitDecks[5].push(deck);
    // } else if (idx >= 6000 && idx < 7000) {
    //   if (!splitDecks[6]) {
    //     splitDecks[6] = [];
    //   }
    //   splitDecks[6].push(deck);
    // } else if (idx >= 7000 && idx < 8000) {
    //   if (!splitDecks[7]) {
    //     splitDecks[7] = [];
    //   }
    //   splitDecks[7].push(deck);
    // } else if (idx >= 8000) {
    //   if (!splitDecks[8]) {
    //     splitDecks[8] = [];
    //   }
    //   splitDecks[8].push(deck);
    // }
  });

  splitDecks.forEach((subDeckList, idx) => {
    fs.writeFile(`SCGCardDataSPLIT-${idx}.json`, JSON.stringify(subDeckList), err => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
};

getAllCardData();
// splitDeckListData();
