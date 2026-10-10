"use strict";

var express = require('express');

var router = express.Router();

var articleController = require('../controllers/articleController'); // GET /api/articles -> tous les articles


router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById); // POST /api/articles -> crée un article avec { "title": "...", "author": "..." }

router.post('/', articleController.createArticle);
module.exports = router;
router.put('/:id', articleController.updateArticle);
router["delete"]('/:id', articleController.deleteArticle);
//# sourceMappingURL=articleRoutes.dev.js.map
