"use strict";

var User = require('../models/userModel'); // 1. Récupérer tous les articles avec les données complètes de l'auteur


var getAllArticles = function getAllArticles(req, res) {
  var articles;
  return regeneratorRuntime.async(function getAllArticles$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Article.find().populate('author', 'name email'));

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
}; // 2. Récupérer un article unique par son ID


var getArticleById = function getArticleById(req, res) {
  var article;
  return regeneratorRuntime.async(function getArticleById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Article.findById(req.params.id));

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
            message: 'Invalid resource identifier (ObjectId expected)'
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
}; // 3. Créer un nouvel article lié à un auteur


var createArticle = function createArticle(req, res) {
  var _req$body, title, content, authorId, author, newArticle, populatedArticle;

  return regeneratorRuntime.async(function createArticle$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, title = _req$body.title, content = _req$body.content, authorId = _req$body.authorId;

          if (!(!title || !content || !authorId)) {
            _context3.next = 4;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'title, content et authorId sont obligatoires'
          }));

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.findById(authorId));

        case 6:
          author = _context3.sent;

          if (author) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Auteur non trouvé (identifiant authorId invalide)'
          }));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(Article.create({
            title: title,
            content: content,
            author: authorId
          }));

        case 11:
          newArticle = _context3.sent;
          _context3.next = 14;
          return regeneratorRuntime.awrap(newArticle.populate('author', 'name email'));

        case 14:
          populatedArticle = _context3.sent;
          res.status(201).json(populatedArticle);
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
}; // 4. Mettre à jour un article (PUT /api/articles/:id)


var updateArticle = function updateArticle(req, res) {
  var article, populated;
  return regeneratorRuntime.async(function updateArticle$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Article.findByIdAndUpdate(req.params.id, req.body, {
            "new": true,
            runValidators: true
          } // Renvoie le doc mis à jour et applique les validations Mongoose
          ));

        case 3:
          article = _context4.sent;

          if (article) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Article introuvable pour la mise à jour'
          }));

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(article.populate('author', 'name email'));

        case 8:
          populated = _context4.sent;
          res.status(200).json(populated);
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // 5. Supprimer un article (DELETE /api/articles/:id)


var deleteArticle = function deleteArticle(req, res) {
  var article;
  return regeneratorRuntime.async(function deleteArticle$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Article.findByIdAndDelete(req.params.id));

        case 3:
          article = _context5.sent;

          if (article) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: "Impossible de supprimer : article ".concat(req.params.id, " introuvable")
          }));

        case 6:
          res.status(200).json({
            message: 'Article supprimé avec succès'
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  getAllArticles: getAllArticles,
  getArticleById: getArticleById,
  createArticle: createArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle
};
//# sourceMappingURL=articleController.dev.js.map
