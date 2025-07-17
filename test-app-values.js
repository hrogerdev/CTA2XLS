import { calculateStoneValue } from './src/utils/stonesValues.js';

// Test the actual calculation function
const tests = [
  {
    name: 'Token 2610935',
    faction: 'ARKHANTE',
    rarity: 'RARE', 
    foil: true,
    advancement: 'STANDARD',
    rank: 4,
    expected: 83
  },
  {
    name: 'Token 1969305',
    faction: 'ARKHANTE',
    rarity: 'COMMON',
    foil: true, 
    advancement: 'STANDARD',
    rank: 3,
    expected: 14
  },
  {
    name: 'Token 2609980',
    faction: 'ARKHANTE',
    rarity: 'UNCOMMON',
    foil: false,
    advancement: 'STANDARD', 
    rank: 4,
    expected: 24
  }
];

tests.forEach(test => {
  const result = calculateStoneValue(
    test.faction,
    test.rarity,
    test.foil,
    test.advancement,
    'C',
    test.rank
  );
  
  console.log(`${test.name}:`);
  console.log(`  Expected: ${test.expected} stones`);
  console.log(`  Got: ${result} stones`);
  console.log(`  ${result === test.expected ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
});