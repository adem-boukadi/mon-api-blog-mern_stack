"use strict";

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../models/userModel');

var Article = require('../models/articleModel');

var _require = require('../utils/validators'),
    estNonVide = _require.estNonVide,
    estEmailValide = _require.estEmailValide; // Utilitaire de génération de Token JWT (Déclaré UNE SEULE FOIS)


var generateToken = function generateToken(id, role) {
  return jwt.sign({
    id: id,
    role: role
  }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
}; // 1. Inscription / Création d'utilisateur (POST /api/users ou POST /api/users/register)


var registerUser = function registerUser(req, res) {
  var _req$body, name, email, password, age, bio, phone, userExists, salt, hashedPassword, user;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, age = _req$body.age, bio = _req$body.bio, phone = _req$body.phone;

          if (estNonVide(name)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Le nom est obligatoire et ne peut pas être vide.'
          }));

        case 4:
          if (estEmailValide(email)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "L'email est invalide."
          }));

        case 6:
          if (estNonVide(password)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Le mot de passe est obligatoire.'
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 10:
          userExists = _context.sent;

          if (!userExists) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            message: 'Cet email est déjà utilisé.'
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 15:
          salt = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 18:
          hashedPassword = _context.sent;
          _context.next = 21;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: hashedPassword,
            age: age,
            role: 'user',
            bio: bio,
            phone: phone
          }));

        case 21:
          user = _context.sent;
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
          });
          _context.next = 30;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.name === 'ValidationError')) {
            _context.next = 29;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: _context.t0.message
          }));

        case 29:
          res.status(500).json({
            message: _context.t0.message
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 25]]);
}; // 2. Connexion d'un utilisateur (POST /api/users/login)


var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, user, isMatch;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: 'Email et mot de passe requis.'
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 6:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: 'Identifiants invalides.'
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            message: 'Identifiants invalides.'
          }));

        case 14:
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
          });
          _context2.next = 20;
          break;

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 17]]);
}; // 3. Obtenir le profil de l'utilisateur connecté (GET /api/users/profile)


var getUserProfile = function getUserProfile(req, res) {
  return regeneratorRuntime.async(function getUserProfile$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            res.status(200).json(req.user);
          } catch (err) {
            res.status(500).json({
              message: err.message
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // 4. Obtenir tous les utilisateurs (GET /api/users)


var getUsers = function getUsers(req, res) {
  var users;
  return regeneratorRuntime.async(function getUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.find().select('-password'));

        case 3:
          users = _context4.sent;
          res.status(200).json(users);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: _context4.t0.message
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // 5. Obtenir un utilisateur par son identifiant (GET /api/users/:id)


var getUserById = function getUserById(req, res) {
  var user;
  return regeneratorRuntime.async(function getUserById$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.params.id).select('-password'));

        case 3:
          user = _context5.sent;

          if (user) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            message: 'Utilisateur non trouvé.'
          }));

        case 6:
          return _context5.abrupt("return", res.status(200).json(user));

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);

          if (!(_context5.t0.name === 'CastError')) {
            _context5.next = 13;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: 'Identifiant de ressource invalide (ObjectId attendu)'
          }));

        case 13:
          return _context5.abrupt("return", res.status(500).json({
            message: _context5.t0.message
          }));

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // 6. Supprimer un utilisateur (DELETE /api/users/:id)


var deleteUser = function deleteUser(req, res) {
  var userId, hasArticles, user;
  return regeneratorRuntime.async(function deleteUser$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Article.findOne({
            author: userId
          }));

        case 4:
          hasArticles = _context6.sent;

          if (!hasArticles) {
            _context6.next = 7;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            message: 'Impossible de supprimer un auteur avec des articles publiés.'
          }));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

        case 9:
          user = _context6.sent;

          if (user) {
            _context6.next = 12;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "Impossible de supprimer : utilisateur ".concat(userId, " introuvable")
          }));

        case 12:
          return _context6.abrupt("return", res.status(200).json({
            message: 'Utilisateur supprimé avec succès.'
          }));

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(500).json({
            message: _context6.t0.message
          }));

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 15]]);
}; // 7. Mise à jour sécurisée du mot de passe (PUT /api/users/update-password)


var updatePassword = function updatePassword(req, res) {
  var _req$body3, oldPassword, newPassword, user, isMatch, salt;

  return regeneratorRuntime.async(function updatePassword$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword;

          if (!(!oldPassword || !newPassword)) {
            _context7.next = 4;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            message: 'Ancien et nouveau mot de passe requis.'
          }));

        case 4:
          _context7.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 6:
          user = _context7.sent;

          if (user) {
            _context7.next = 9;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: 'Utilisateur non trouvé'
          }));

        case 9:
          _context7.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(oldPassword, user.password));

        case 11:
          isMatch = _context7.sent;

          if (isMatch) {
            _context7.next = 14;
            break;
          }

          return _context7.abrupt("return", res.status(401).json({
            message: 'Ancien mot de passe incorrect'
          }));

        case 14:
          _context7.next = 16;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 16:
          salt = _context7.sent;
          _context7.next = 19;
          return regeneratorRuntime.awrap(bcrypt.hash(newPassword, salt));

        case 19:
          user.password = _context7.sent;
          _context7.next = 22;
          return regeneratorRuntime.awrap(user.save());

        case 22:
          return _context7.abrupt("return", res.status(200).json({
            message: 'Mot de passe mis à jour avec succès'
          }));

        case 25:
          _context7.prev = 25;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(500).json({
            message: _context7.t0.message
          }));

        case 28:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 25]]);
}; // 8. Modifier le rôle d'un utilisateur (PUT /api/users/:id/role)


var updateUserRole = function updateUserRole(req, res) {
  var role, user;
  return regeneratorRuntime.async(function updateUserRole$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          role = req.body.role;

          if (!(!role || !['user', 'admin'].includes(role))) {
            _context8.next = 4;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            message: "Rôle invalide ('user' ou 'admin' attendu)."
          }));

        case 4:
          _context8.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.params.id));

        case 6:
          user = _context8.sent;

          if (user) {
            _context8.next = 9;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            message: 'Utilisateur non trouvé.'
          }));

        case 9:
          user.role = role;
          _context8.next = 12;
          return regeneratorRuntime.awrap(user.save());

        case 12:
          res.status(200).json({
            message: "R\xF4le mis \xE0 jour avec succ\xE8s : ".concat(user.role),
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
          _context8.next = 18;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: _context8.t0.message
          });

        case 18:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  getUserProfile: getUserProfile,
  getUsers: getUsers,
  getUserById: getUserById,
  deleteUser: deleteUser,
  updatePassword: updatePassword,
  updateUserRole: updateUserRole
};
//# sourceMappingURL=userController.dev.js.map
