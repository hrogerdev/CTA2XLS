// Test de debug pour les combos
import { getCardInfo } from './src/utils/cardDatabase.js';
import { calculateComboValueMultiSeason } from './src/utils/stonesValues.js';

console.log('=== Test de la base de données ===');
console.log('hanzo:', getCardInfo('hanzo'));
console.log('valred:', getCardInfo('valred'));
console.log('Hanzo:', getCardInfo('Hanzo'));
console.log('ValRed:', getCardInfo('ValRed'));

console.log('\n=== Test du parsing ===');
const testCombo = 'Hanzo & ValRed';
const cardNames = testCombo.split(' & ').map(name => name.trim().toLowerCase());
console.log('Parsed names:', cardNames);

cardNames.forEach(name => {
  const info = getCardInfo(name);
  console.log(`${name}:`, info);
});