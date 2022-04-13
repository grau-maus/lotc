const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/standard-decklists', asyncHandler(async (req, res) => {
  const response = await axios.get("https://old.starcitygames.com/content/decklists/");
  const html = response.data;
  const $ = cheerio.load(html);
  const decklists = [];
  const allStandardDecksLink = $("#content_decks_standard > div a:nth-child(1)").attr('href');

  $("#content_decks_standard").find('li > a').each((i, elem) => {
    const decklist = $(elem).text().split(",")[0];
    const queryLink = $(elem).attr('href');

    decklists.push({ decklist, queryLink });
  });

  return res.json({ decklists, allStandardDecksLink });
}));

module.exports = router;
