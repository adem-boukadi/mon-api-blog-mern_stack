"use strict";

// Initialisation du tableau users avec 2 utilisateurs fictifs (id, name, email, role)
var users = [{
  id: 1,
  name: "Adem Dupont",
  email: "Adem@example.com",
  role: "admin"
}, {
  id: 2,
  name: "abdel",
  email: "abdel@example.com",
  role: "user"
}];
var prochainId = 3;

var getAllUsers = function getAllUsers(req, res) {
  var author = req.query.author;
  var resultat = users;

  if (author) {
    resultat = users.filter(function (u) {
      return u.author === author;
    });
  }

  res.status(200).json({
    total: resultat.length,
    users: resultat
  });
};

var getUserById = function getUserById(req, res) {
  var id = Number(req.params.id);
  var user = users.find(function (u) {
    return u.id === id;
  });

  if (!user) {
    return res.status(404).json({
      message: "Utilisateur non trouvé"
    });
  }

  res.status(200).json(user);
};

var createUser = function createUser(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      role = _req$body.role;

  if (!estNonVide(name)) {
    return res.status(400).json({
      message: "Le nom est obligatoire et ne peut pas être vide."
    });
  } // 2. Validation de l'email (doit contenir '@' et '.')


  if (!estEmailValide(email)) {
    return res.status(400).json({
      message: "L'email est invalide (doit contenir '@' et '.')."
    });
  } // 3. Validation du rôle (doit être renseigné)


  if (!estNonVide(role)) {
    return res.status(400).json({
      message: "Le rôle est obligatoire."
    });
  } // Si tout est valide, on crée l'utilisateur


  var nouvelUser = {
    id: prochainId++,
    name: name,
    email: email,
    role: role
  };
  users.push(nouvelUser);
  res.status(201).json(nouvelUser);
};

var deleteUser = function deleteUser(req, res) {
  var id = Number(req.params.id);
  var userExiste = users.some(function (u) {
    return u.id === id;
  });

  if (!userExiste) {
    return res.status(404).json({
      error: "Impossible de supprimer : utilisateur ".concat(id, " introuvable")
    });
  } // On filtre pour ne garder que les utilisateurs ayant un ID différent


  users = users.filter(function (u) {
    return u.id !== id;
  });
  res.status(201).json({
    message: 'Utilisateur supprimé'
  });
};

var _require = require('../utils/validators'),
    estNonVide = _require.estNonVide,
    estEmailValide = _require.estEmailValide;

module.exports = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createUser: createUser,
  deleteUser: deleteUser
};
//# sourceMappingURL=userController.dev.js.map
