"use strict";

var express = require('express');

var dotenv = require('dotenv');

var connectDB = require('./config/db');

var articleRoutes = require('./routes/articleRoutes');

var userRoutes = require('./routes/userRoutes'); // Chargement des variables d'environnement (.env)


dotenv.config();
var app = express();
var PORT = process.env.PORT || 3000; // Middleware pour parser le corps des requêtes en JSON

app.use(express.json()); // Montage des routeurs modulaires

app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes); // Connexion asynchrone à MongoDB Atlas puis démarrage de l'écoute

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(connectDB(process.env.MONGODB_URI));

        case 3:
          // 2. Démarrage de l'écoute du serveur HTTP
          app.listen(PORT, function () {
            console.log("Serveur MERN en \xE9coute sur http://localhost:".concat(PORT));
          });
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Erreur critique de démarrage du serveur :', _context.t0.message);
          process.exit(1);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
})();
//# sourceMappingURL=server.dev.js.map
