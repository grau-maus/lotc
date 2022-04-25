const express = require('express');
const asyncHandler = require('express-async-handler');
const { Article, User, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


router.get('/all', asyncHandler(async (req, res) => {
    const allArticles = await Article.findAll();

    return res.json(allArticles);
}));

router.get('/homepage', asyncHandler(async (req, res) => {
    const articles = await Article.findAll({
        order: [['id', 'DESC']],
        limit: 4,
        include: [User],
        attributes: {
            exclude: ['text']
        }
    });

    return res.json(articles);
}));

router.get('/getArticle/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const article = await Article.findByPk(id);
    const comments = await Comment.findAll({
        where: {
            articleId: id
        }
    });
    return res.json({ article, comments });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { text, userId } = req.body;
    const addArticle = await Article.create({
        text,
        userId
    });

    return res.json({ msg: 'success' });
}));

module.exports = router;
