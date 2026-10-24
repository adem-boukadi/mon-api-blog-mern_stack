"use strict";

var Article = require('../models/articleModel');

var User = require('../models/userModel'); // 1. Récupérer tous les articles avec les données de l'auteur (GET /api/articles)


var getAllArticles = function getAllArticles(req, res) {
  var articles;
  return regeneratorRuntime.async(function getAllArticles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Article.find().populate('author', 'name email role'));

        case 3:
          articles = _context.sent;
          res.status(200).json(articles);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // 2. Récupérer un article unique par son ID (GET /api/articles/:id)


var getArticleById = function getArticleById(req, res) {
  var article;
  return regeneratorRuntime.async(function getArticleById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Article.findById(req.params.id).populate('author', 'name email role'));

        case 3:
          article = _context2.sent;

          if (article) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Article non trouvé'
          }));

        case 6:
          return _context2.abrupt("return", res.status(200).json(article));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);

          if (!(_context2.t0.name === 'CastError')) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Identifiant invalide (ObjectId attendu)'
          }));

        case 13:
          return _context2.abrupt("return", res.status(500).json({
            message: _context2.t0.message
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // 3. Créer un nouvel article (POST /api/articles) - Route protégée


var createArticle = function createArticle(req, res) {
  var _req$body, title, content, newArticle, populated;

  return regeneratorRuntime.async(function createArticle$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, title = _req$body.title, content = _req$body.content;

          if (!(!title || !content)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Titre et contenu obligatoires'
          }));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(Article.create({
            title: title,
            content: content,
            author: req.user._id
          }));

        case 6:
          newArticle = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(newArticle.populate('author', 'name email role'));

        case 9:
          populated = _context3.sent;
          res.status(201).json(populated);
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // 4. Mettre à jour un article (PUT /api/articles/:id) - Protection auteur ou admin


var updateArticle = function updateArticle(req, res) {
  var article, updated, populated;
  return regeneratorRuntime.async(function updateArticle$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Article.findById(req.params.id));

        case 3:
          article = _context4.sent;

          if (article) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Article non trouvé'
          }));

        case 6:
          if (!(article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(403).json({
            message: "Action interdite : vous n'êtes pas l'auteur de cet article"
          }));

        case 8:
          article.title = req.body.title || article.title;
          article.content = req.body.content || article.content;
          _context4.next = 12;
          return regeneratorRuntime.awrap(article.save());

        case 12:
          updated = _context4.sent;
          _context4.next = 15;
          return regeneratorRuntime.awrap(updated.populate('author', 'name email role'));

        case 15:
          populated = _context4.sent;
          res.status(200).json(populated);
          _context4.next = 24;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](0);

          if (!(_context4.t0.name === 'CastError')) {
            _context4.next = 23;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: 'Identifiant invalide'
          }));

        case 23:
          res.status(500).json({
            message: _context4.t0.message
          });

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; // 5. Supprimer un article (DELETE /api/articles/:id) - Protection auteur ou admin


var deleteArticle = function deleteArticle(req, res) {
  var article;
  return regeneratorRuntime.async(function deleteArticle$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Article.findById(req.params.id));

        case 3:
          article = _context5.sent;

          if (article) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Article non trouvé'
          }));

        case 6:
          if (!(article.author.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(403).json({
            message: "Action interdite : vous n'êtes pas l'auteur de cet article"
          }));

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(Article.findByIdAndDelete(req.params.id));

        case 10:
          res.status(200).json({
            message: 'Article supprimé avec succès',
            id: req.params.id
          });
          _context5.next = 18;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](0);

          if (!(_context5.t0.name === 'CastError')) {
            _context5.next = 17;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: 'Identifiant invalide'
          }));

        case 17:
          res.status(500).json({
            message: _context5.t0.message
          });

        case 18:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; // Obtenir les articles de l'utilisateur connecté (GET /api/articles/my-articles)


var getMyArticles = function getMyArticles(req, res) {
  var articles;
  return regeneratorRuntime.async(function getMyArticles$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Article.find({
            author: req.user._id
          }));

        case 3:
          articles = _context6.sent;
          res.status(200).json(articles);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: _context6.t0.message
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  getAllArticles: getAllArticles,
  getMyArticles: getMyArticles,
  getArticleById: getArticleById,
  createArticle: createArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle
};
//# sourceMappingURL=articleController.dev.js.map
