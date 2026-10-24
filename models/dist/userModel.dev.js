"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true
  },
  email: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Format d'email invalide (ex: aya@polytechnique.tn)"]
  },
  password: {
    type: String,
    required: [true, 'le mot de passe est obligatoire'],
    minlenghth: [6, 'le mot de pass doit comoprter au mois 6 caracteres']
  },
  age: {
    type: Number,
    min: [4, "L'âge minimum autorisé est de 4 ans"]
  },
  role: {
    type: String,
    "enum": {
      values: ['user', 'admin'],
      message: "{VALUE} n'est pas un rôle autorisé"
    },
    "default": 'user'
  },
  bio: {
    type: String,
    maxlength: [200, 'Bio cannot exceed 200 characters']
  },
  phone: {
    type: String,
    match: [/^\d{8}$/, '8-digit phone number required']
  }
}, {
  timestamps: true
} // Ajoute automatiquement createdAt et updatedAt
);
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=userModel.dev.js.map
