const router = require('express').Router();
const asyncHandler = require('express-async-handler');
// const queryRouter = require('./query.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const articlesRouter = require('./articles.js');
const decksRouter = require('./decks.js');
const cardsRouter = require('./cards.js');

/********************* ROUTE SETUP ***************************/
// router.use('/query', queryRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/decks', decksRouter);
router.use('/cards', cardsRouter);

module.exports = router;
