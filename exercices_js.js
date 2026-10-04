
const produits = [
    {   nom: 'Clavier', prix: 45 },
    {   nom: 'Ecran', prix: 320 },
    {   nom: 'Souris', prix: 25 },
];
const nom = produits[0].nom;
const prix = produits[0].prix;

console.log(nom);
console.log(prix);

const produit = produits.find(p => p.nom === "Souris");
console.log(produit.prix);

const produitsFiltres = produits.filter(p => p.prix < 100);
console.log(produitsFiltres); 
const ecran = produits.find(p => p.nom === "Ecran");

const avecRemise = (prix) => {
    return prix * ((100 - 10) / 100);
};
console.log(avecRemise(ecran.prix));
