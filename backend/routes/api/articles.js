const express = require('express');
const asyncHandler = require('express-async-handler');
const { Article, User, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


router.get('/all', asyncHandler (async (req, res) => {
    const allArticles = await Article.findAll();
    return res.json(allArticles)
}));



module.exports = router;