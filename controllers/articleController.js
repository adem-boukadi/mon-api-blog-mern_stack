const Article = require('../models/articleModel');
const User = require('../models/userModel');

// 1. Récupérer tous les articles avec les données de l'auteur (GET /api/articles)
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email role');
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Récupérer un article unique par son ID (GET /api/articles/:id)
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name email role');
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    return res.status(200).json(article);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Identifiant invalide (ObjectId attendu)'
      });
    }
    return res.status(500).json({ message: err.message });
  }
};

// 3. Créer un nouvel article (POST /api/articles) - Route protégée
const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Titre et contenu obligatoires' });
    }

    // L'auteur est extrait du token vérifié : usurpation impossible !
    const newArticle = await Article.create({
      title,
      content,
      author: req.user._id
    });

    const populated = await newArticle.populate('author', 'name email role');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Mettre à jour un article (PUT /api/articles/:id) - Protection auteur ou admin
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    // Vérification des droits de propriété
    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: "Action interdite : vous n'êtes pas l'auteur de cet article"
      });
    }

    article.title = req.body.title || article.title;
    article.content = req.body.content || article.content;

    const updated = await article.save();
    const populated = await updated.populate('author', 'name email role');
    res.status(200).json(populated);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant invalide' });
    }
    res.status(500).json({ message: err.message });
  }
};

// 5. Supprimer un article (DELETE /api/articles/:id) - Protection auteur ou admin
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    // Vérification des droits de propriété
    if (
      article.author.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        message: "Action interdite : vous n'êtes pas l'auteur de cet article"
      });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Article supprimé avec succès',
      id: req.params.id
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant invalide' });
    }
    res.status(500).json({ message: err.message });
  }
};
// Obtenir les articles de l'utilisateur connecté (GET /api/articles/my-articles)
const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllArticles,
  getMyArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};