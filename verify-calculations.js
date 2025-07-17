// Vérification des calculs inverses

console.log('Si les valeurs attendues sont :');
console.log('- Arkhante Rare Foil Rank 4 = 83 stones');
console.log('- Arkhante Common Foil Rank 3 = 14 stones');
console.log('- Arkhante Uncommon Non-Foil Rank 4 = 24 stones');
console.log('');
console.log('Alors les valeurs Rift de base devraient être :');
console.log('- Rare Foil Rank 4 = 83 / 3 = 27.67 (arrondi à 28 actuellement)');
console.log('- Common Foil Rank 3 = 14 / 3 = 4.67 (4 actuellement)');
console.log('- Uncommon Non-Foil Rank 4 = 24 / 3 = 8 (correct)');
console.log('');
console.log('Il semble que les valeurs Rift de base soient arrondies, causant des erreurs.');
console.log('');
console.log('Alternative : peut-être que les multiplicateurs ne sont pas exactement x3 pour Arkhante ?');
console.log('- Pour obtenir 83 à partir de 28 : 83/28 = 2.96');
console.log('- Pour obtenir 14 à partir de 4 : 14/4 = 3.5');
console.log('');
console.log('Ou alors les valeurs de base Rift sont fausses dans notre tableau.');