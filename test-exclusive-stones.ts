import { calculateStoneValue, calculateStoneValueWithComment } from './src/utils/stonesValues';

// Test cases for EXCLUSIVE cards
const testCases = [
  { name: "Kunesh EXCLUSIVE Alternative A non-foil", faction: "MANTRIS", rarity: "EXCLUSIVE", foil: false, advancement: "Alternative", grade: "A", cardName: "Kunesh" },
  { name: "Kunesh EXCLUSIVE Alternative S non-foil", faction: "MANTRIS", rarity: "EXCLUSIVE", foil: false, advancement: "Alternative", grade: "S", cardName: "Kunesh" },
  { name: "Kunesh EXCLUSIVE Alternative B non-foil", faction: "MANTRIS", rarity: "EXCLUSIVE", foil: false, advancement: "Alternative", grade: "B", cardName: "Kunesh" },
  { name: "Kunesh EXCLUSIVE Standard rank 2", faction: "MANTRIS", rarity: "EXCLUSIVE", foil: false, advancement: "Standard", evolution: 2, cardName: "Kunesh" },
  { name: "Any EXCLUSIVE card", faction: "RIFT", rarity: "EXCLUSIVE", foil: true, advancement: "Alternative", grade: "S", cardName: "Test" }
];

console.log("Testing EXCLUSIVE cards stone values:\n");

testCases.forEach(test => {
  const value = calculateStoneValue(test.faction, test.rarity, test.foil, test.advancement, test.grade, test.evolution, test.cardName);
  const result = calculateStoneValueWithComment(test.faction, test.rarity, test.foil, test.advancement, test.grade, test.evolution, test.cardName);
  
  console.log(`${test.name}:`);
  console.log(`  Value: ${value} stones`);
  console.log(`  Comment: ${result.comment || 'None'}`);
  console.log(`  Expected: 0 stones`);
  console.log(`  Result: ${value === 0 ? '✓ PASS' : '✗ FAIL'}\n`);
});