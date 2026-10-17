"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/articleController'),
    getAllArticles = _require.getAllArticles,
    getArticleById = _require.getArticleById,
    createArticle = _require.createArticle,
    updateArticle = _require.updateArticle,
    deleteArticle = _require.deleteArticle;

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router["delete"]('/:id', deleteArticle);
module.exports = router;
//# sourceMappingURL=articleRoutes.dev.js.map
