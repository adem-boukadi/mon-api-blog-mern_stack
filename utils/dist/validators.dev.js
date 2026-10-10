"use strict";

// utils/validators.js
var estNonVide = function estNonVide(chaine) {
  return typeof chaine === 'string' && chaine.trim().length > 0;
};

var estEmailValide = function estEmailValide(email) {
  return typeof email === 'string' && email.includes('@') && email.includes('.');
};

module.exports = {
  estNonVide: estNonVide,
  estEmailValide: estEmailValide
};
//# sourceMappingURL=validators.dev.js.map
