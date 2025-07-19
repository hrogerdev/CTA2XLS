import { calculateStoneValue, calculateStoneValueWithComment } from './src/utils/stonesValues';

// Test Kunesh MYTHIC MANTRIS Alternative A non-foil
console.log("Testing Kunesh MYTHIC MANTRIS Alternative A non-foil:\n");

const value = calculateStoneValue("MANTRIS", "MYTHIC", false, "Alternative", "A", undefined, "Kunesh");
const result = calculateStoneValueWithComment("MANTRIS", "MYTHIC", false, "Alternative", "A", undefined, "Kunesh");

console.log("Calculation details:");
console.log("- Faction: MANTRIS (multiplier x2)");
console.log("- Rarity: MYTHIC");
console.log("- Advancement: Alternative");
console.log("- Grade: A");
console.log("- Foil: false");
console.log("\nBase value for MYTHIC Alternative A (RIFT): 600 stones");
console.log("With MANTRIS multiplier (x2): 600 × 2 = 1200 stones");
console.log(`\nCalculated value: ${value} stones`);
console.log(`Comment: ${result.comment || 'None'}`);
console.log(`\nResult: ${value === 1200 ? '✓ CORRECT' : '✗ INCORRECT'}`);

// Also test the values in the actual data file
console.log("\n\nChecking actual data file for Kunesh cards:");
console.log("(Note: Run 'grep -E \"Kunesh.*MYTHIC|Kunesh.*EXCLUSIVE\" cta-cards-with-stones-multiseasons.json' to see all Kunesh variants)");