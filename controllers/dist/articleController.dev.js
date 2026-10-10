"use strict";

var articles = [{
  id: 1,
  title: 'Bienvenue sur le blog',
  author: 'Admin'
}, {
  id: 2,
  title: 'Mon premier serveur Express',
  author: 'Aya'
}, {
  id: 3,
  title: 'Tester une API avec Postman',
  author: 'Aya'
}];
var prochainId = 4; // 1. Récupérer tous les articles (avec filtre optionnel ?author=...)

var getAllArticles = function getAllArticles(req, res) {
  var author = req.query.author;
  var resultat = articles;

  if (author) {
    resultat = articles.filter(function (a) {
      return a.author === author;
    });
  }

  res.status(200).json({
    total: resultat.length,
    articles: resultat
  });
}; // 2. Récupérer un article par son ID unique


var getArticleById = function getArticleById(req, res) {
  var id = Number(req.params.id);
  var article = articles.find(function (a) {
    return a.id === id;
  });

  if (!article) {
    return res.status(404).json({
      error: "Article ".concat(id, " introuvable")
    });
  }

  res.status(200).json(article);
}; // 3. Créer un nouvel article


var createArticle = function createArticle(req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      author = _req$body.author;

  if (!title || !author) {
    return res.status(400).json({
      error: "Le titre et l'auteur sont obligatoires"
    });
  }

  var nouvelArticle = {
    id: prochainId++,
    title: title,
    author: author
  };
  articles.push(nouvelArticle);
  res.status(200).json({
    message: 'Article créé',
    article: nouvelArticle
  });
}; // 4. Mettre à jour un article existant (PUT /api/articles/:id)


var updateArticle = function updateArticle(req, res) {
  var id = Number(req.params.id);
  var _req$body2 = req.body,
      title = _req$body2.title,
      author = _req$body2.author; // On recherche l’index de l’article dans le tableau

  var index = articles.findIndex(function (a) {
    return a.id === id;
  });

  if (index === -1) {
    return res.status(404).json({
      error: "Article ".concat(id, " introuvable")
    });
  } // Mise à jour partielle ou totale


  if (title) articles[index].title = title;
  if (author) articles[index].author = author;
  res.status(200).json({
    message: 'Article mis à jour',
    article: articles[index]
  });
}; // 5. Supprimer un article (DELETE /api/articles/:id)


var deleteArticle = function deleteArticle(req, res) {
  var id = Number(req.params.id);
  var articleExiste = articles.some(function (a) {
    return a.id === id;
  });

  if (!articleExiste) {
    return res.status(404).json({
      error: "Impossible de supprimer : article ".concat(id, " introuvable")
    });
  } // On filtre pour ne garder que les articles ayant un ID différent


  articles = articles.filter(function (a) {
    return a.id !== id;
  });
  res.status(200).json({
    message: 'Article supprimé'
  });
}; // Exportation CommonJS : on rend ces fonctions publiques


module.exports = {
  getAllArticles: getAllArticles,
  getArticleById: getArticleById,
  createArticle: createArticle,
  updateArticle: updateArticle,
  deleteArticle: deleteArticle
};
//# sourceMappingURL=articleController.dev.js.map
