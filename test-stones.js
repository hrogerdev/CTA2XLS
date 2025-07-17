// Test script for stone calculations
import { calculateStoneValue } from './src/utils/stonesValues.ts';

// Test data for specific tokens
const testTokens = [
  {
    tokenId: '2610935',
    faction: 'Arkhante',
    rarity: 'Rare',
    foil: true,
    advancement: 'Standard',
    rank: 4
  },
  {
    tokenId: '1969305',
    faction: 'Arkhante',
    rarity: 'Common',
    foil: true,
    advancement: 'Standard',
    rank: 3
  },
  {
    tokenId: '2609980',
    faction: 'Unknown', // We'll need to check this
    rarity: 'Unknown',
    foil: false,
    advancement: 'Standard',
    rank: 1
  }
];

// Calculate stones for each token
testTokens.forEach(token => {
  const stones = calculateStoneValue(
    token.faction,
    token.rarity,
    token.foil,
    token.advancement,
    'C', // default grade
    token.rank
  );
  
  console.log(`Token ${token.tokenId}: ${stones} stones`);
  console.log(`  - Faction: ${token.faction}`);
  console.log(`  - Rarity: ${token.rarity}`);
  console.log(`  - Foil: ${token.foil}`);
  console.log(`  - Rank: ${token.rank}`);
  console.log('---');
});

// Manual calculations to verify:
console.log('\nManual verification:');
console.log('Arkhante Rare Foil Rank 4:');
console.log('  - Rift base: 28 stones');
console.log('  - Arkhante multiplier: x3');
console.log('  - Expected: 28 x 3 = 84 stones');

console.log('\nArkhante Common Foil Rank 3:');
console.log('  - Rift base: 4 stones');
console.log('  - Arkhante multiplier: x3');
console.log('  - Expected: 4 x 3 = 12 stones');