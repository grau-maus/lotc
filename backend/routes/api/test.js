const express = require('express');
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/decklists/', asyncHandler(async (req, res) => {
  const response = await axios.get("https://old.starcitygames.com/content/decklists/");
  const html = response.data;
  const $ = cheerio.load(html);
  console.log();
  console.log();
  console.log('IN HERE', $("#content_decks_standard").children().html());
  console.log();
  console.log();
  return res.json({ message: 'hello world' });
}));

module.exports = router;
