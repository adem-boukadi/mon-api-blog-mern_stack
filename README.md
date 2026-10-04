MERN Stack - TP 1: Express API & JavaScript Fundamentals

Compte-rendu TP 1

Étudiant: Adem Boukadi

Classe: 5ème Info DS IA G1

Nom du projet: mon-api-blog

📖 Aperçu

Ce dépôt contient le travail pratique du TP 1 - MERN Stack. L'objectif de ce TP est de créer une API REST de base avec Express.js et Node.js, ainsi que de pratiquer les manipulations de tableaux et fonctions JavaScript modernes (ES6+).

📁 Structure du Projet

mon-api-blog/
├── node_modules/
├── exercices_js.js
├── log.txt
├── package.json
├── package-lock.json
└── server.js


🛠️ Prérequis et Installation

Prérequis

Node.js (v14 ou version supérieure recommandée)

VS Code avec l'extension Thunder Client (ou Postman) pour le test des API

Installation

Cloner le dépôt :

git clone <votre-url-de-depot>
cd mon-api-blog


Installer les dépendances :

npm install


Démarrer le serveur Express :

node server.js


Exécuter les exercices JavaScript :

node exercices_js.js


🚀 Exercice 1: API Express (server.js)

Le serveur backend écoute sur http://localhost:3000.

Résumé des Endpoints API

Méthode

Endpoint

Description

Code de statut

GET

/about

Renvoie les informations sur l'API et l'auteur

200 OK

GET

/api/users

Renvoie la liste des utilisateurs avec support de filtre (?name=)

200 OK

GET

/api/users/:id

Récupère un utilisateur spécifique par son ID

200 OK / 404 Not Found

POST

/contact

Reçoit le formulaire de contact (email, message)

201 Created / 400 Bad Request

Détail des Implémentations

1. Endpoint About (/about)

Route: GET /about

Description: Retourne le nom de l'application, l'auteur et la version.

app.get("/about", (req, res) => {
  res.json({
    application: "API du blog",
    nom: "Adem Boukadi",
    version: "1",
  });
});

app.listen(PORT, () => {
  console.log(`Serveur disponible sur http://localhost:${PORT}`);
});


Exemple de Réponse:

{
  "application": "API du blog",
  "nom": "Adem Boukadi",
  "version": "1"
}


2. Endpoint Liste des Utilisateurs & Filtrage (/api/users)

Route: GET /api/users

Paramètre de requête: ?name=<nom> (filtrage insensible à la casse)

Description: Renvoie tous les utilisateurs ou filtre selon le nom fourni.

const users = [
  { id: 1, name: 'Adem Boukadi', email: 'adem.boukadi@polytechnicien.com' },
  { id: 2, name: 'Aya', email: 'aya@polytechnicien.com' },
  { id: 3, name: 'abdel', email: 'abdel@polytechnicien.com' }
];

app.get("/api/users", (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.json(users);
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase() === name.toLowerCase()
  );
  res.json(filteredUsers);
});


3. Recherche d'Utilisateur par ID (/api/users/:id)

Route: GET /api/users/:id

Description: Recherche un utilisateur par son identifiant. Renvoie une erreur 404 si introuvable.

app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({
      error: `Utilisateur ${id} introuvable`
    });
  }
  res.json(user);
});


Exemple d'Erreur (404):

{
  "error": "Utilisateur 8 introuvable"
}


4. Endpoint Contact (/contact)

Route: POST /contact

Description: Valide les champs obligatoires email et message.

app.post('/contact', (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({
      error: "L'email et le message sont obligatoires"
    });
  }

  res.status(201).json({
    message: 'Merci, votre message a été reçu'
  });
});


Erreur de validation (400 Bad Request):

{
  "error": "L'email et le message sont obligatoires"
}


Réponse Réussie (201 Created):

{
  "message": "Merci, votre message a été reçu"
}


⚡ Exercice 2: Les Bases de JavaScript (exercices_js.js)

Manipulation des tableaux ES6 (.find(), .filter()) et création de fonctions d'aide.

Code Source (exercices_js.js)

const produits = [
  { nom: 'Clavier', prix: 45 },
  { nom: 'Ecran', prix: 320 },
  { nom: 'Souris', prix: 25 },
];

// Étape 1: Extraction du premier produit
const nom = produits[0].nom;
const prix = produits[0].prix;
console.log(nom);
console.log(prix);

// Étape 2: Recherche par nom
const produit = produits.find(p => p.nom === "Souris");
console.log(produit.prix);

// Étape 3: Filtrage par prix (< 100)
const produitsFiltres = produits.filter(p => p.prix < 100);
console.log(produitsFiltres);

// Étape 4: Application d'une remise de 10%
const ecran = produits.find(p => p.nom === "Ecran");
const avecRemise = (prix) => {
  return prix * ((100 - 10) / 100);
};
console.log(avecRemise(ecran.prix));


Sortie en Console

Clavier
45
25
[ { nom: 'Clavier', prix: 45 }, { nom: 'Souris', prix: 25 } ]
288


🧪 Tests

Tous les endpoints ont été testés localement avec l'extension Thunder Client sur VS Code ainsi qu'en navigateur web.
