const express = require('express');
const router = express.Router();

// Importation de TOUTES les fonctions du contrôleur (updateUserRole inclus)
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updatePassword,
  updateUserRole,
  generateToken

} = require('../controllers/userController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Routes d'authentification publiques
router.post('/register', registerUser);
router.post('/login', loginUser);

// Routes privées (utilisateur connecté)
router.get('/profile', protect, getUserProfile);
router.put('/update-password', protect, updatePassword);

// Routes d'administration
router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.delete('/:id', protect, adminOnly, deleteUser);
router.put('/:id/role', protect, adminOnly, updateUserRole);

module.exports = router;