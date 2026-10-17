"use strict";

var User = require('../models/userModel');

var Article = require('../models/articleModel');

var _require = require('../utils/validators'),
    estNonVide = _require.estNonVide,
    estEmailValide = _require.estEmailValide; // 1. Créer un utilisateur (POST /api/users)


var createUser = function createUser(req, res) {
  var _req$body, name, email, age, role, bio, phone, exists, user;

  return regeneratorRuntime.async(function createUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, age = _req$body.age, role = _req$body.role, bio = _req$body.bio, phone = _req$body.phone;

          if (estNonVide(name)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Le nom est obligatoire et ne peut pas être vide."
          }));

        case 4:
          if (estEmailValide(email)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "L'email est invalide (doit contenir '@' et '.')."
          }));

        case 6:
          if (estNonVide(role)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Le rôle est obligatoire."
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 10:
          exists = _context.sent;

          if (!exists) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            message: "Cet email est déjà utilisé"
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            age: age,
            role: role,
            bio: bio,
            phone: phone
          }));

        case 15:
          user = _context.sent;
          res.status(201).json(user);
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; // 2. Obtenir tous les utilisateurs (GET /api/users)


var getUsers = function getUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context2.sent;
          res.status(200).json(users);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // 3. Obtenir un utilisateur par son identifiant (GET /api/users/:id)


var getUserById = function getUserById(req, res) {
  var user;
  return regeneratorRuntime.async(function getUserById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Utilisateur non trouvé'
          }));

        case 6:
          return _context3.abrupt("return", res.status(200).json(user));

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);

          if (!(_context3.t0.name === 'CastError')) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: 'Invalid resource identifier (ObjectId expected)'
          }));

        case 13:
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // 4. Supprimer un utilisateur avec contrôle d'intégrité (DELETE /api/users/:id)


var deleteUser = function deleteUser(req, res) {
  var userId, hasArticles, user;
  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.params.id; // Vérification de l'intégrité référentielle

          _context4.next = 4;
          return regeneratorRuntime.awrap(Article.findOne({
            author: userId
          }));

        case 4:
          hasArticles = _context4.sent;

          if (!hasArticles) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.status(400).send('Impossible to delete an author with published articles'));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

        case 9:
          user = _context4.sent;

          if (user) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "Impossible de supprimer : utilisateur ".concat(userId, " introuvable")
          }));

        case 12:
          return _context4.abrupt("return", res.status(200).json({
            message: 'Utilisateur supprimé avec succès'
          }));

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  getUserById: getUserById,
  deleteUser: deleteUser
};
//# sourceMappingURL=userController.dev.js.map
