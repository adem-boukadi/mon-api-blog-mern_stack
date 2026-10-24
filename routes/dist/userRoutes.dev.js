"use strict";

var express = require('express');

var router = express.Router(); // Importation de TOUTES les fonctions du contrôleur (updateUserRole inclus)

var _require = require('../controllers/userController'),
    registerUser = _require.registerUser,
    loginUser = _require.loginUser,
    getUserProfile = _require.getUserProfile,
    getUsers = _require.getUsers,
    getUserById = _require.getUserById,
    deleteUser = _require.deleteUser,
    updatePassword = _require.updatePassword,
    updateUserRole = _require.updateUserRole,
    generateToken = _require.generateToken;

var _require2 = require('../middlewares/authMiddleware'),
    protect = _require2.protect,
    adminOnly = _require2.adminOnly; // Routes d'authentification publiques


router.post('/register', registerUser);
router.post('/login', loginUser); // Routes privées (utilisateur connecté)

router.get('/profile', protect, getUserProfile);
router.put('/update-password', protect, updatePassword); // Routes d'administration

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUserById);
router["delete"]('/:id', protect, adminOnly, deleteUser);
router.put('/:id/role', protect, adminOnly, updateUserRole);
module.exports = router;
//# sourceMappingURL=userRoutes.dev.js.map
