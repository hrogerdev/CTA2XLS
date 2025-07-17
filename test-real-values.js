// Test avec les vraies valeurs des cartes
const RIFT_VALUES = {
  Foil: {
    Common: {
      Standard: [2, 4, 4, 6, 8]  // rank 1-5
    },
    Uncommon: {
      Standard: [10, 12, 14, 16, 18]
    },
    Rare: {
      Standard: [20, 22, 26, 28, 30]
    }
  },
  NonFoil: {
    Uncommon: {
      Standard: [5, 6, 7, 8, 9]
    }
  }
};

// Token 2610935: Arkhante Rare Foil Rank 4
console.log('Token 2610935 (Arkhante Rare Foil Rank 4):');
console.log('  Rift base value (Rare Foil Rank 4):', RIFT_VALUES.Foil.Rare.Standard[3], 'stones');
console.log('  Arkhante multiplier: x3');
console.log('  Expected:', RIFT_VALUES.Foil.Rare.Standard[3] * 3, 'stones');

// Token 1969305: Arkhante Common Foil Rank 3
console.log('\nToken 1969305 (Arkhante Common Foil Rank 3):');
console.log('  Rift base value (Common Foil Rank 3):', RIFT_VALUES.Foil.Common.Standard[2], 'stones');
console.log('  Arkhante multiplier: x3');
console.log('  Expected:', RIFT_VALUES.Foil.Common.Standard[2] * 3, 'stones');

// Token 2609980: Arkhante Uncommon Non-Foil Rank 4
console.log('\nToken 2609980 (Arkhante Uncommon Non-Foil Rank 4):');
console.log('  Rift base value (Uncommon Non-Foil Rank 4):', RIFT_VALUES.NonFoil.Uncommon.Standard[3], 'stones');
console.log('  Arkhante multiplier: x3');
console.log('  Expected:', RIFT_VALUES.NonFoil.Uncommon.Standard[3] * 3, 'stones');