"use strict";

var mongoose = require('mongoose');

function connectDB(uri) {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (uri) {
            _context.next = 2;
            break;
          }

          throw new Error("L'URI MongoDB est manquant dans les variables d'environnement (.env)");

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(mongoose.connect(uri, {
            autoIndex: true // Génère automatiquement les index (ex: unique) en développement

          }));

        case 4:
          console.log('Connexion à MongoDB Atlas réussie avec succès !');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = connectDB;
//# sourceMappingURL=db.dev.js.map
