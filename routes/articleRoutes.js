const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getMyArticles
} = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');

// 1. Route des articles personnels (IMPÉRATIVEMENT avant /:id)
router.get('/my-articles', protect, getMyArticles);

// 2. Routes de consultation
router.get('/', getAllArticles);
router.get('/:id', getArticleById);

// 3. Opérations d'écriture protégées par JWT
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);
router.get('/my-articles', protect, getMyArticles);

module.exports = router;