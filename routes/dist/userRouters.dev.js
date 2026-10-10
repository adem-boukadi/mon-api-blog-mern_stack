"use strict";

var express = require('express');

var router = express.Router(); // Importation des 4 fonctions du contrôleur

var _require = require('../controllers/userController'),
    getAllUsers = _require.getAllUsers,
    getUserById = _require.getUserById,
    createUser = _require.createUser,
    deleteUser = _require.deleteUser; // Association des 4 verbes HTTP


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router["delete"]('/:id', deleteUser); // Export du routeur

module.exports = router;
//# sourceMappingURL=userRouters.dev.js.map
