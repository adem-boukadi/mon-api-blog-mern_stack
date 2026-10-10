const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, deleteUser } = require('../controllers/userController');

// Association des 4 verbes HTTP
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);

// Export du routeur
module.exports = router;