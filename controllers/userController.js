const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Article = require('../models/articleModel');
const { estNonVide, estEmailValide } = require('../utils/validators');

// Utilitaire de génération de Token JWT (Déclaré UNE SEULE FOIS)
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// 1. Inscription / Création d'utilisateur (POST /api/users ou POST /api/users/register)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, bio, phone } = req.body;

    if (!estNonVide(name)) {
      return res.status(400).json({ message: 'Le nom est obligatoire et ne peut pas être vide.' });
    }
    if (!estEmailValide(email)) {
      return res.status(400).json({ message: "L'email est invalide." });
    }
    if (!estNonVide(password)) {
      return res.status(400).json({ message: 'Le mot de passe est obligatoire.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Cet email est déjà utilisé.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      role: 'user',
      bio,
      phone
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: err.message });
  }
};

// 2. Connexion d'un utilisateur (POST /api/users/login)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants invalides.' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Obtenir le profil de l'utilisateur connecté (GET /api/users/profile)
const getUserProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Obtenir tous les utilisateurs (GET /api/users)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. Obtenir un utilisateur par son identifiant (GET /api/users/:id)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    return res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Identifiant de ressource invalide (ObjectId attendu)' });
    }
    return res.status(500).json({ message: err.message });
  }
};

// 6. Supprimer un utilisateur (DELETE /api/users/:id)
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const hasArticles = await Article.findOne({ author: userId });
    if (hasArticles) {
      return res.status(400).json({ message: 'Impossible de supprimer un auteur avec des articles publiés.' });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: `Impossible de supprimer : utilisateur ${userId} introuvable` });
    }

    return res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 7. Mise à jour sécurisée du mot de passe (PUT /api/users/update-password)
const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Ancien et nouveau mot de passe requis.' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Ancien mot de passe incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    return res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// 8. Modifier le rôle d'un utilisateur (PUT /api/users/:id/role)
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide ('user' ou 'admin' attendu)." });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: `Rôle mis à jour avec succès : ${user.role}`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updatePassword,
  updateUserRole
};