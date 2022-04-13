const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const queryRouter = require('./query.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const articlesRouter = require('./articles.js');

/********************* ROUTE SETUP ***************************/
router.use('/query', queryRouter);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

module.exports = router;
