"use strict";

var produits = [{
  nom: 'Clavier',
  prix: 45
}, {
  nom: 'Ecran',
  prix: 320
}, {
  nom: 'Souris',
  prix: 25
}];
var nom = produits[0].nom;
var prix = produits[0].prix;
console.log(nom);
console.log(prix);
var produit = produits.find(function (p) {
  return p.nom === "Souris";
});
console.log(produit.prix);
var produitsFiltres = produits.filter(function (p) {
  return p.prix < 100;
});
console.log(produitsFiltres);
var ecran = produits.find(function (p) {
  return p.nom === "Ecran";
});

var avecRemise = function avecRemise(prix) {
  return prix * ((100 - 10) / 100);
};

console.log(avecRemise(ecran.prix));
//# sourceMappingURL=exercices_js.dev.js.map
