const fs = require('fs');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const cheerio = require('cheerio');
const allCardData = require('./default-cards-20220413211623.json');
const cardSeederData = require('./cardSeeder.json');
const testData = require('./testtttt.json');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

const userSeederJSON = () => {
  const seedData = [];

  for (let i = 0; i < 100; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const username = faker.internet.userName(firstName, lastName);
    const email = faker.internet.email(firstName, lastName);

    seedData.push({
      username,
      email,
      roleId: 1,
      hashedPassword: bcrypt.hashSync(faker.internet.password())
    });
  }

  fs.writeFile('testtttt.json', JSON.stringify(seedData), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const test = () => {
  const missing = [];
  testData.forEach((card) => {
    if (Array.isArray(card.img)) {
      console.log(card)
    }
  });

  // console.log(missing.length);
};

const mergeData = () => {
  const missing = [];
  // allCardData.forEach((card) => {
  //   if (!card.image_uris) {
  //     console.log(card);
  //   }
  // });
  cardSeederData.forEach((card) => {
    const cardResult = allCardData.find((cardRef) => {
      const cardRefImgs = cardRef.image_uris;

      if (cardRefImgs) {
        if (Array.isArray(card.img)) {
          cardRefImgs.small === card.img[0].small
        } else {
          return cardRefImgs.small === card.img.small;
        }
      } else {
        let findResult;
        cardRef.card_faces.forEach((face) => {
          if (cardRef.image_status !== 'missing') {
            if (Array.isArray(card.img)) {
              if (face.image_uris.small === card.img[0].small) {
                findResult = face.image_uris.small;
              }
            } else {
              if (face.image_uris.small === card.img.small) {
                findResult = face.image_uris.small;
              }
            }
          }
        });
        if (Array.isArray(card.img)) {
          return findResult === card.img[0].small;
        } else {
          return findResult === card.img.small;
        }
      }
    });

    if (!cardResult) {
      missing.push(card.name);
    } else {
      card.legalities = cardResult.legalities;
    }
  });

  console.log(missing.length);
  console.log(cardSeederData[0]);
  console.log(cardSeederData[cardSeederData.length - 1]);

  fs.writeFile('testtttt.json', JSON.stringify(cardSeederData), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

const getAllCardData = async () => {
  const allCardData = [];

  for (let i = 0; i < deckList.length; i++) {
    await sleep(500);
    const response = await axios.get(deckList[i].deckLink);
    const html = response.data;
    const $ = cheerio.load(html);
    const cardContainer = $(".deck_card_wrapper > div");
    const deckData = {
      deckLink: deckList[i].deckLink,
      cards: []
    };

    cardContainer.each((i, elem) => {
      $(elem).find('ul').each((j, ulElem) => {
        let type = $(ulElem).prev().text().split('(')[0].trim().toLowerCase();
        const parentClass = $(ulElem).parent().attr('class');

        $(ulElem).find('li').each((k, liElem) => {
          const amount = parseInt($(liElem).text().split(' ')[0], 10);
          const cardName = $(liElem).find('a').text().trim();

          if (parentClass === 'deck_sideboard' || !type) type = 'sideboard';

          deckData.cards.push({
            name: cardName,
            count: amount,
            type
          });
        });
      });
    });

    console.log();
    console.log(`...on deck #${i}`);
    console.log();

    allCardData.push(deckData);
  }

  fs.writeFile('SCGScrapedCardData-10.json', JSON.stringify(allCardData), err => {
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

// getAllCardData();
// splitDeckListData();
// mergeData();
// test();
// userSeederJSON();
