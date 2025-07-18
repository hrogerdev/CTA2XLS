const { calculateStoneValue, calculateStoneValueWithComment } = require('./dist/utils/stonesValues.js');

console.log('Testing combo calculations:\n');

const testCombos = [
  { name: 'Hanzo & ValRed', faction: 'ARKHANTE', rarity: 'RARE', grade: 'A', foil: true },
  { name: 'Shakti & Kora', faction: 'MANTRIS', rarity: 'MYTHIC', grade: 'B', foil: false },
  { name: 'Ruby & Ronan', faction: 'ARKHANTE', rarity: 'RARE', grade: 'C', foil: false },
  { name: 'Sassaki & His Disciples', faction: 'MANTRIS', rarity: 'MYTHIC', grade: 'C', foil: false },
];

for (const combo of testCombos) {
  const result = calculateStoneValueWithComment(
    combo.faction,
    combo.rarity,
    combo.foil,
    'COMBO',
    combo.grade,
    undefined,
    combo.name
  );
  
  console.log(`${combo.name} (${combo.grade} ${combo.foil ? 'Foil' : 'Non-Foil'}):`);
  console.log(`  Value: ${result.value} stones`);
  console.log(`  Comment: ${result.comment}\n`);
}