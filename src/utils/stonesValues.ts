import { EXCLUSIVE_COMBOS, HARDCODED_COMBO_VALUES } from './knownCards';
import { getCardInfo } from './cardDatabase';

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

// Valeurs de base (RIFT) - utiliser les nouvelles valeurs fournies
const BASE_VALUES: CollectionValues = {
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

// Coefficients de saison
const SEASON_MULTIPLIERS = {
  RIFT: { NonFoil: 1, Foil: 1 },     // Foil est déjà x2 dans les valeurs de base
  MANTRIS: { NonFoil: 2, Foil: 2 },  // x2 sur les valeurs foil de base
  ARKHANTE: { NonFoil: 3, Foil: 3 }  // x3 sur les valeurs foil de base
};

const rarityMap: Record<string, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'special rare': 'Special Rare',
  special_rare: 'Special Rare',
  'ultra rare': 'Ultra Rare',
  ultra_rare: 'Ultra Rare',
  mythic: 'Mythic',
  exclusive: 'Mythic' // Traiter EXCLUSIVE comme MYTHIC pour les valeurs
};

interface StoneCalculationResult {
  value: number;
  comment?: string;
}

// Nouvelle fonction pour calculer la valeur d'un combo avec multi-saisons
function calculateComboValueMultiSeason(
  cardName: string,
  grade: string,
  isFoil: boolean
): { value: number; details: string } {
  const foilKey = isFoil ? 'Foil' : 'NonFoil';
  // Parser les noms de cartes du combo
  let cardNames: string[] = [];
  
  // Vérifier les cas spéciaux d'abord
  const specialCombos: Record<string, string[]> = {
    'sassaki & his disciples': ['sassaki', 'valred', 'ruby', 'hanzo', 'ronan'],
    'division 0': ['judith', 'seifer', 'hilde', 'b380'],
  };
  
  const lowerCardName = cardName.toLowerCase();
  if (specialCombos[lowerCardName]) {
    cardNames = specialCombos[lowerCardName];
  } else if (cardName.includes(' & ')) {
    cardNames = cardName.split(' & ').map(name => name.trim().toLowerCase());
  }
  
  if (cardNames.length === 0) {
    return { value: 0, details: 'No cards found' };
  }
  
  let totalValue = 0;
  const details: string[] = [];
  
  // Pour chaque carte du combo
  cardNames.forEach((singleCardName) => {
    const cardInfo = getCardInfo(singleCardName);
    
    if (cardInfo) {
      // Utiliser la rareté de la carte (éviter EXCLUSIVE si possible)
      const rarity = cardInfo.allRarities.find(r => r !== 'EXCLUSIVE') || cardInfo.rarity;
      const normalizedRarity = rarityMap[rarity.toLowerCase()] || rarity;
      
      // Obtenir la valeur de base
      const baseValues = BASE_VALUES[foilKey][normalizedRarity as keyof FoilValues];
      if (baseValues && baseValues.Combo) {
        const baseValue = baseValues.Combo[grade as keyof typeof baseValues.Combo] || 0;
        
        // Appliquer le multiplicateur de la saison de cette carte
        const multiplier = SEASON_MULTIPLIERS[cardInfo.season as keyof typeof SEASON_MULTIPLIERS]?.[foilKey] || 1;
        const cardValue = baseValue * multiplier;
        
        totalValue += cardValue;
        details.push(`${singleCardName}(${cardInfo.season}:${cardValue})`);
      }
    }
  });
  
  return { value: totalValue, details: details.join(' + ') };
}

export function calculateStoneValue(
  faction: string,
  rarity: string,
  foil: string | boolean,
  advancement: string,
  grade?: string,
  evolution?: string | number,
  cardName?: string
): number {
  // Check if it's an EXCLUSIVE rarity card (no stones value)
  if (rarity.toUpperCase() === 'EXCLUSIVE') {
    return 0;
  }

  // Normalize inputs
  const normalizedFaction = faction || 'RIFT';
  const normalizedRarity = rarityMap[rarity.toLowerCase()] || rarity;
  const normalizedAdvancement = advancement.charAt(0).toUpperCase() + advancement.slice(1).toLowerCase();
  const normalizedGrade = (grade || 'C').toUpperCase();
  const isFoil = typeof foil === 'string' ? foil.toLowerCase() === 'true' : foil;
  const foilKey = isFoil ? 'Foil' : 'NonFoil';

  // Check for exclusive combos (no stones value)
  if (normalizedAdvancement === 'Combo' && cardName) {
    const isExclusive = EXCLUSIVE_COMBOS.some(combo => 
      cardName.toLowerCase().includes(combo.toLowerCase())
    );
    if (isExclusive) {
      return 0;
    }
  }

  // Get base values
  const baseValues = BASE_VALUES[foilKey][normalizedRarity as keyof FoilValues];
  if (!baseValues) {
    return 0;
  }

  let baseValue = 0;

  // Calculate based on advancement type
  if (normalizedAdvancement === 'Standard') {
    const rankIndex = evolution ? Math.min(Math.max(Number(evolution) - 1, 0), 4) : 0;
    baseValue = baseValues.Standard[rankIndex] || baseValues.Standard[0] || 0;
  } else if (normalizedAdvancement === 'Alternative') {
    baseValue = baseValues.Alternative[normalizedGrade as keyof typeof baseValues.Alternative] || 0;
  } else if (normalizedAdvancement === 'Combo') {
    if (cardName) {
      // Utiliser la nouvelle logique multi-saisons
      const comboResult = calculateComboValueMultiSeason(cardName, normalizedGrade, isFoil);
      return Math.round(comboResult.value);
    } else {
      // Fallback
      baseValue = baseValues.Combo[normalizedGrade as keyof typeof baseValues.Combo] || 0;
    }
  }

  // Pour non-combo, appliquer le multiplicateur de faction normalement
  const multiplier = SEASON_MULTIPLIERS[normalizedFaction as keyof typeof SEASON_MULTIPLIERS]?.[foilKey] || 1;
  return Math.round(baseValue * multiplier);
}

export function calculateStoneValueWithComment(
  faction: string,
  rarity: string,
  foil: string | boolean,
  advancement: string,
  grade?: string,
  evolution?: string | number,
  cardName?: string
): StoneCalculationResult {
  // Check if it's an EXCLUSIVE rarity card (no stones value)
  if (rarity.toUpperCase() === 'EXCLUSIVE') {
    return { value: 0, comment: 'Exclusive rarity (no stones value)' };
  }

  // Check if it's an exclusive card (no stones value)
  if (advancement.toLowerCase() === 'combo' && cardName) {
    const isExclusive = EXCLUSIVE_COMBOS.some(combo => 
      cardName.toLowerCase().includes(combo.toLowerCase())
    );
    if (isExclusive) {
      return { value: 0, comment: 'Exclusive combo (no stones value)' };
    }

    // Check for hardcoded SR combo values
    if (rarity.toLowerCase().includes('special') && grade) {
      const key = `${cardName.toLowerCase()}|${grade.toLowerCase()}`;
      const hardcodedValue = HARDCODED_COMBO_VALUES[key];
      if (hardcodedValue !== undefined) {
        return { value: hardcodedValue, comment: 'SR combo with hardcoded value' };
      }
    }
  }

  const value = calculateStoneValue(faction, rarity, foil, advancement, grade, evolution, cardName);
  
  let comment = '';
  if (advancement.toLowerCase() === 'combo' && cardName) {
    const isFoil = typeof foil === 'string' ? foil.toLowerCase() === 'true' : foil;
    const comboResult = calculateComboValueMultiSeason(cardName, grade || 'C', isFoil);
    comment = `Combo: ${comboResult.details}`;
  }

  return { value, comment };
}