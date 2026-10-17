const express = require('express');
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUser } = require('../controllers/userController');

// Association des 4 verbes HTTP
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);

// Export du routeur
module.exports = router;