// const express = require('express'); // 1. Charger la bibliothèque Express

// const app = express(); // 2. Créer l'application : c'est notre serveur

// const PORT = 3000;

// app . use( express . json () ) ; // lit le corps JSON et le range dans req. body

// // 3. Une route : quand un client demande GET /, Express exécute cette fonction
// app.get('/', (req, res) => {
//   res.json({
//     message: "Bonjour, je suis l'API du blog"
//   });
// });

// // Nos données. Elles reviennent à l’état initial à chaque redémarrage.
// // MongoDB les rendra permanentes à la séance 3.

// const articles = [
//   { id: 1, title: 'Bienvenue sur le blog', author: 'Admin' },
//   { id: 2, title: 'Mon premier serveur Express', author: 'Aya' },
//   { id: 3, title: 'Tester une API avec Postman', author: 'Aya' }
// ];

// // GET /api/articles -> tous les articles
// app.get('/api/articles', (req, res) => {
//   res.json({
//     total: articles.length,
//     articles: articles
//   });
// });

// // GET /api/articles/2 -> l’article dont l’id vaut 2
// app.get('/api/articles/:id', (req, res) => {
//   const id = Number(req.params.id); // "2" -> 2

//   const article = articles.find(a => a.id === id);

//   if (!article) {
//     return res.status(404).json({
//       error: `Article ${id} introuvable`
//     });
//   }

//   res.json(article);
// });

// // GET /api/articles -> tous les articles
// // GET /api/articles?author=Aya -> seulement ceux d’Aya

// app.get('/api/articles', (req, res) => {
//   const { author } = req.query;

//   let resultat = articles;

//   if (author) {
//     // Si le client a précisé ?author=...
//     resultat = articles.filter(a => a.author === author);
//   }

//   res.json({
//     total: resultat.length,
//     articles: resultat
//   });
// });

// let prochainId = 4; // le prochain id à attribuer (les ids 1, 2 et 3 existent déjà)

// // POST /api/articles -> crée un article avec { "title": "...", "author": "..." }

// app.post('/api/articles', (req, res) => {
//   const { title, author } = req.body; // déstructuration

//   if (!title || !author) {
//     return res.status(400).json({
//       error: "Le titre et l’auteur sont obligatoires"
//     });
//   }

//   const nouvelArticle = {
//     id: prochainId,
//     title: title,
//     author: author
//   };

//   prochainId = prochainId + 1;

//   articles.push(nouvelArticle);

//   res.status(201).json({
//     message: 'Article créé',
//     article: nouvelArticle
//   });
// });

// app.get("/about", (req, res) => {
//     res.json({
//         application: "API du blog",
//         nom : "Adem Boukadi",
//         version: "1",
//     });
// });

// const users = [
//     { id: 1, name: 'Adem Boukadi', email: 'adem.boukadi@polytechnicien.com' },
//     { id: 2, name: 'Aya', email: 'aya@polytechnicien.com'},
//     { id: 3, name: 'abdel', email: 'abdel@polytechnicien.com'}
// ];
// app.get("/api/users", (req, res) => {
//     const name = req.query.name;

//     if (!name) {
//         return res.json(users);
//     }

//     const filteredUsers = users.filter(user =>
//         user.name.toLowerCase() === name.toLowerCase()
//     );

//     res.json(filteredUsers);
// });

// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(u => u.id === id);
//     if (!user) {
//         return res.status(404).json({
//             error: `Utilisateur ${id} introuvable`
//         });
//     }
//     res.json(user);
// });

// app.post('/contact', (req, res) => {
//     const { email, message } = req.body;
//     if (!email || !message) {
//         return res.status(400).json({
//             error: "L'email et le message sont obligatoires"
//         });
//     }
//     res.status(200).json({
//         message: 'Merci, votre message a été reçu',
       
//     });
// });


// // 4. Démarrer le serveur : il attend les requêtes sur le port 3000
// app.listen(PORT, () => {
//   console.log(`Serveur disponible sur http://localhost:${PORT}`);
// });