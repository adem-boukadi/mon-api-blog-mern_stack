const User = require('../models/userModel');
const Article = require('../models/articleModel');
const { estNonVide, estEmailValide } = require('../utils/validators');

// 1. Créer un utilisateur (POST /api/users)
const createUser = async (req, res) => {
  try {
    const { name, email, age, role, bio, phone } = req.body;

    if (!estNonVide(name)) {
      return res.status(400).json({ message: "Le nom est obligatoire et ne peut pas être vide." });
    }
    if (!estEmailValide(email)) {
      return res.status(400).json({ message: "L'email est invalide (doit contenir '@' et '.')." });
    }
    if (!estNonVide(role)) {
      return res.status(400).json({ message: "Le rôle est obligatoire." });
    }

    // Vérification de doublon d'email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Cet email est déjà utilisé" });
    }

    const user = await User.create({ name, email, age, role, bio, phone });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Obtenir tous les utilisateurs (GET /api/users)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Obtenir un utilisateur par son identifiant (GET /api/users/:id)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    return res.status(200).json(user);
  } catch (err) {
    // Vérification si l'erreur est liée à un ID invalide (CastError)
    if (err.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid resource identifier (ObjectId expected)'
      });
    }
    // Autre type d'erreur serveur
    return res.status(500).json({ message: err.message });
  }
};

// 4. Supprimer un utilisateur avec contrôle d'intégrité (DELETE /api/users/:id)
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Vérification de l'intégrité référentielle
    const hasArticles = await Article.findOne({ author: userId });
    if (hasArticles) {
      return res.status(400).send('Impossible to delete an author with published articles');
    }

    // Suppression si aucun article n'est trouvé
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        message: `Impossible de supprimer : utilisateur ${userId} introuvable`
      });
    }

    return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser
};