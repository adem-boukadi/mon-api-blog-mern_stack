// Initialisation du tableau users avec 2 utilisateurs fictifs (id, name, email, role)
let users = [
  { id: 1, name: "Adem Dupont", email: "Adem@example.com", role: "admin" },
  { id: 2, name: "abdel", email: "abdel@example.com", role: "user" }
]; 

let prochainId = 3;

const getAllUsers = (req, res) => {
  const { author } = req.query;
  let resultat = users;

  if (author) {
    resultat = users.filter(u => u.author === author);
  }

  res.status(200).json({
    total: resultat.length,
    users: resultat
  });
};
const getUserById = (req,res) =>{
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  res.status(200).json(user);
};
const createUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!estNonVide(name)) {
    return res.status(400).json({ 
      message: "Le nom est obligatoire et ne peut pas être vide." 
    });
  }

  // 2. Validation de l'email (doit contenir '@' et '.')
  if (!estEmailValide(email)) {
    return res.status(400).json({ 
      message: "L'email est invalide (doit contenir '@' et '.')." 
    });
  }

  // 3. Validation du rôle (doit être renseigné)
  if (!estNonVide(role)) {
    return res.status(400).json({ 
      message: "Le rôle est obligatoire." 
    });
  }

  // Si tout est valide, on crée l'utilisateur
  const nouvelUser = {
    id: prochainId++,
    name,
    email,
    role
  };

  users.push(nouvelUser);
  res.status(201).json(nouvelUser);
};
const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  const userExiste = users.some(u => u.id === id);

  if (!userExiste) {
    return res.status(404).json({
      error: `Impossible de supprimer : utilisateur ${id} introuvable`
    });
  }

  // On filtre pour ne garder que les utilisateurs ayant un ID différent
  users = users.filter(u => u.id !== id);

  res.status(201).json({
    message: 'Utilisateur supprimé'
  });
};
const {estNonVide, estEmailValide} = require('../utils/validators');


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
}