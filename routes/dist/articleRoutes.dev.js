"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/articleController'),
    getAllArticles = _require.getAllArticles,
    getArticleById = _require.getArticleById,
    createArticle = _require.createArticle,
    updateArticle = _require.updateArticle,
    deleteArticle = _require.deleteArticle,
    getMyArticles = _require.getMyArticles;

var _require2 = require('../middlewares/authMiddleware'),
    protect = _require2.protect; // 1. Route des articles personnels (IMPÉRATIVEMENT avant /:id)


router.get('/my-articles', protect, getMyArticles); // 2. Routes de consultation

router.get('/', getAllArticles);
router.get('/:id', getArticleById); // 3. Opérations d'écriture protégées par JWT

router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router["delete"]('/:id', protect, deleteArticle);
router.get('/my-articles', protect, getMyArticles);
module.exports = router;
//# sourceMappingURL=articleRoutes.dev.js.map
