interface RarityValues {
  Standard: number[];
  Alternative: { C: number; B: number; A: number; S: number };
  Combo: { C: number; B: number; A: number; S: number };
}

interface FoilValues {
  Common: RarityValues;
  Uncommon: RarityValues;
  Rare: RarityValues;
  'Special Rare': RarityValues;
  'Ultra Rare': RarityValues;
  Mythic: RarityValues;
}

interface CollectionValues {
  NonFoil: FoilValues;
  Foil: FoilValues;
}

const RIFT_VALUES: CollectionValues = {
  NonFoil: {
    Common: {
      Standard: [1, 2, 2, 3, 4],
      Alternative: { C: 8, B: 21, A: 42, S: 69 },
      Combo: { C: 12, B: 33, A: 66, S: 109 }
    },
    Uncommon: {
      Standard: [5, 6, 7, 8, 9],
      Alternative: { C: 15, B: 35, A: 65, S: 105 },
      Combo: { C: 21, B: 53, A: 101, S: 165 }
    },
    Rare: {
      Standard: [10, 11, 13, 14, 15],
      Alternative: { C: 23, B: 50, A: 89, S: 142 },
      Combo: { C: 31, B: 74, A: 137, S: 222 }
    },
    'Special Rare': {
      Standard: [20, 22, 24, 26, 28],
      Alternative: { C: 39, B: 77, A: 135, S: 211 },
      Combo: { C: 51, B: 112, A: 204, S: 326 }
    },
    'Ultra Rare': {
      Standard: [35, 38, 40, 43, 45],
      Alternative: { C: 60, B: 110, A: 185, S: 285 },
      Combo: { C: 75, B: 155, A: 275, S: 435 }
    },
    Mythic: {
      Standard: [150, 158, 165, 173, 180],
      Alternative: { C: 225, B: 375, A: 600, S: 900 },
      Combo: { C: 270, B: 510, A: 870, S: 1350 }
    }
  },
  Foil: {
    Common: {
      Standard: [2, 4, 4, 6, 8],
      Alternative: { C: 16, B: 42, A: 84, S: 138 },
      Combo: { C: 24, B: 66, A: 132, S: 218 }
    },
    Uncommon: {
      Standard: [10, 12, 14, 16, 18],
      Alternative: { C: 30, B: 70, A: 130, S: 210 },
      Combo: { C: 42, B: 106, A: 202, S: 330 }
    },
    Rare: {
      Standard: [20, 22, 26, 28, 30],
      Alternative: { C: 46, B: 100, A: 178, S: 284 },
      Combo: { C: 62, B: 148, A: 274, S: 444 }
    },
    'Special Rare': {
      Standard: [40, 44, 48, 52, 56],
      Alternative: { C: 78, B: 154, A: 270, S: 422 },
      Combo: { C: 102, B: 224, A: 408, S: 652 }
    },
    'Ultra Rare': {
      Standard: [70, 76, 80, 86, 90],
      Alternative: { C: 120, B: 220, A: 370, S: 570 },
      Combo: { C: 150, B: 310, A: 550, S: 870 }
    },
    Mythic: {
      Standard: [300, 316, 330, 346, 360],
      Alternative: { C: 450, B: 750, A: 1200, S: 1800 },
      Combo: { C: 540, B: 1020, A: 1740, S: 2700 }
    }
  }
};

// Helper function to multiply values
function multiplyValues(values: CollectionValues, multiplier: number): CollectionValues {
  const result: any = { NonFoil: {}, Foil: {} };
  
  for (const foilType of ['NonFoil', 'Foil'] as const) {
    for (const rarity in values[foilType]) {
      result[foilType][rarity] = {
        Standard: values[foilType][rarity as keyof FoilValues].Standard.map(v => v * multiplier),
        Alternative: Object.fromEntries(
          Object.entries(values[foilType][rarity as keyof FoilValues].Alternative).map(([k, v]) => [k, v * multiplier])
        ),
        Combo: Object.fromEntries(
          Object.entries(values[foilType][rarity as keyof FoilValues].Combo).map(([k, v]) => [k, v * multiplier])
        )
      };
    }
  }
  
  return result;
}

// Generate Mantris values (Rift × 2 for NonFoil, Rift × 4 for Foil)
const MANTRIS_VALUES: CollectionValues = {
  NonFoil: multiplyValues({ NonFoil: RIFT_VALUES.NonFoil, Foil: RIFT_VALUES.NonFoil }, 2).NonFoil,
  Foil: multiplyValues({ NonFoil: RIFT_VALUES.NonFoil, Foil: RIFT_VALUES.NonFoil }, 4).NonFoil
};

// Generate Arkhante values (Rift × 3 for NonFoil, Rift × 6 for Foil)
const ARKHANTE_VALUES: CollectionValues = {
  NonFoil: multiplyValues({ NonFoil: RIFT_VALUES.NonFoil, Foil: RIFT_VALUES.NonFoil }, 3).NonFoil,
  Foil: multiplyValues({ NonFoil: RIFT_VALUES.NonFoil, Foil: RIFT_VALUES.NonFoil }, 6).NonFoil
};

export const STONES_VALUES: Record<string, CollectionValues> = {
  Rift: RIFT_VALUES,
  Mantris: MANTRIS_VALUES,
  Arkhante: ARKHANTE_VALUES
};

export function calculateStoneValue(
  faction: string,
  rarity: string,
  foil: string | boolean,
  advancement: string,
  grade?: string,
  evolution?: string | number
): number {
  // Normalize inputs
  const normalizedFaction = faction || 'Rift';
  const normalizedRarity = rarity || 'Common';
  const isFoil = foil === true || foil === 'true' || foil === 'True' || foil === 'Yes';
  const foilKey = isFoil ? 'Foil' : 'NonFoil';
  const normalizedAdvancement = advancement || 'Standard';
  const normalizedGrade = grade || 'C';
  
  // Get collection values
  const collectionValues = STONES_VALUES[normalizedFaction] || STONES_VALUES.Rift;
  
  // Get rarity values
  const rarityValues = collectionValues[foilKey][normalizedRarity as keyof FoilValues];
  if (!rarityValues) return 0;
  
  // Calculate based on advancement type
  if (normalizedAdvancement === 'Standard') {
    // For Standard, use evolution index (1-5) or default to middle value
    const evoIndex = evolution ? Math.min(Math.max(Number(evolution) - 1, 0), 4) : 2;
    return rarityValues.Standard[evoIndex] || rarityValues.Standard[2];
  } else if (normalizedAdvancement === 'Alternative' || normalizedAdvancement === 'Combo') {
    const advancementValues = rarityValues[normalizedAdvancement as 'Alternative' | 'Combo'];
    return advancementValues[normalizedGrade as keyof typeof advancementValues] || 0;
  }
  
  return 0;
}