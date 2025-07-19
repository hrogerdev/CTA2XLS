// Mapping des cartes connues pour résoudre les combos rapidement
// Sans avoir besoin de charger toute la base de données

export const KNOWN_CARDS: Record<string, string> = {
  // Format: nom -> rareté
  'brinhold': 'MYTHIC',
  'amrok': 'RARE',
  // Mythics populaires
  'anubis': 'MYTHIC',
  'odin': 'MYTHIC',
  'zeus': 'MYTHIC',
  'hades': 'MYTHIC',
  'thor': 'MYTHIC',
  'loki': 'MYTHIC',
  'ra': 'MYTHIC',
  'poseidon': 'MYTHIC',
  // Rares populaires
  'medusa': 'RARE',
  'phoenix': 'RARE',
  'cerberus': 'RARE',
  'hydra': 'RARE',
  'kraken': 'RARE',
  'sphinx': 'RARE',
  // Cartes pour cas particuliers et combos
  'the ordonator': 'MYTHIC',
  'sathyne': 'MYTHIC',
  'judith': 'RARE',
  'seifer': 'RARE',
  'hilde': 'RARE',
  'b380': 'RARE',
  'sassaki': 'MYTHIC',
  'valred': 'RARE',
  'ruby': 'RARE',
  'hanzo': 'RARE',
  'ronan': 'RARE',
  // Cartes additionnelles pour les combos
  'locke': 'MYTHIC',
  'astrid': 'MYTHIC',
  'jün': 'MYTHIC',
  'ligtali': 'MYTHIC',
  'orchid': 'MYTHIC',
  'pazzu': 'MYTHIC',
  'troll': 'MYTHIC',
  'giant': 'MYTHIC',
  'sasha': 'MYTHIC',
  'wini': 'MYTHIC',
  'kunesh': 'MYTHIC',
  'gamar': 'MYTHIC',
  'giant eagle': 'MYTHIC',
  'griffin': 'MYTHIC',
  'julian': 'MYTHIC',
  'jade': 'MYTHIC',
  'olisol': 'MYTHIC',
  'ravix': 'MYTHIC',
  'nox': 'MYTHIC',
  'skeleton': 'MYTHIC',
  'leviathan': 'MYTHIC',
  'argonath': 'MYTHIC',
  'the secular one': 'MYTHIC',
  'atros': 'MYTHIC',
  'samsa': 'MYTHIC',
  'precilla': 'MYTHIC',
  'katk': 'MYTHIC',
  'onyx': 'MYTHIC',
  'seth': 'MYTHIC',
  'krukeln': 'MYTHIC',
  'pegasus': 'MYTHIC',
  'nephesh': 'MYTHIC',
  'nelliel': 'MYTHIC',
  'dusèche': 'MYTHIC',
  'theran': 'MYTHIC',
  'ifrit': 'MYTHIC',
  'fei': 'MYTHIC',
  'chang': 'MYTHIC',
  'solis': 'MYTHIC',
  'isalys': 'MYTHIC',
  'shado': 'MYTHIC',
  'arhax': 'MYTHIC',
  'ezio': 'MYTHIC',
  'al': 'MYTHIC',
  'aurelius': 'MYTHIC',
  'shakti': 'MYTHIC',
  'kora': 'MYTHIC',
  'pollen': 'MYTHIC',
  'ash': 'MYTHIC',
  'palmer': 'MYTHIC',
  'solonia': 'MYTHIC',
  'ludwis': 'MYTHIC',
  'hannibal': 'MYTHIC',
  'hassan': 'MYTHIC',
  'nyopé': 'MYTHIC',
  "sig'nam": 'MYTHIC',
  'ouribo': 'MYTHIC',
  // Special Rares pour les combos SR
  'zia': 'SPECIAL RARE',
  'gaumry': 'SPECIAL RARE',
  'lyle': 'SPECIAL RARE',
  'marcus': 'SPECIAL RARE',
  'bly': 'SPECIAL RARE',
  'laurie': 'SPECIAL RARE',
  'archer': 'SPECIAL RARE',
  'oji': 'SPECIAL RARE',
  'lo': 'SPECIAL RARE',
  'kassius': 'SPECIAL RARE',
  'alokah': 'SPECIAL RARE',
  'monkigh': 'SPECIAL RARE',
  'oak': 'SPECIAL RARE',
  'division vii': 'SPECIAL RARE',
  'terak': 'SPECIAL RARE',
  'lynn': 'SPECIAL RARE',
  'psychard': 'SPECIAL RARE',
  'raven': 'SPECIAL RARE',
  'seelung': 'SPECIAL RARE',
  'sit': 'SPECIAL RARE',
  'souleiman': 'SPECIAL RARE',
  'drone': 'SPECIAL RARE',
  'criarunes': 'SPECIAL RARE',
  'class i utility drone': 'SPECIAL RARE',
  'jackie': 'SPECIAL RARE',
  'mantrix council': 'SPECIAL RARE',
  'the no': 'SPECIAL RARE',
  'ricred': 'SPECIAL RARE',
  'lylini': 'SPECIAL RARE',
  'chaka': 'SPECIAL RARE',
  'taki': 'SPECIAL RARE',
  'arjjuna': 'SPECIAL RARE',
  'nyvenn': 'SPECIAL RARE',
  'galile': 'SPECIAL RARE',
  'bou': 'SPECIAL RARE',
  'kahi & khennan': 'SPECIAL RARE',
  'phosphene': 'SPECIAL RARE',
  'sollale': 'SPECIAL RARE',
  'garth': 'SPECIAL RARE',
  // Cartes pour les combos spéciaux
  'dog robot': 'RARE',
  'tiger robot': 'RARE',
  'cyber-scorpion': 'RARE',
  'meca bird': 'RARE',
  'zanger serie': 'RARE',
  'class iii utility robot': 'RARE',
  'skar': 'RARE',
  'sylphio': 'RARE',
  'diane': 'RARE',
  // Ajouter d'autres cartes au fur et à mesure qu'on les découvre
};

// Mapping des noms de combos spéciaux vers leurs cartes composantes
export const SPECIAL_COMBO_NAMES: Record<string, string[]> = {
  'ezio & sathyne': ['the ordonator', 'sathyne'],
  'division 0': ['judith', 'seifer', 'hilde', 'b380'],
  'sassaki & his disciples': ['sassaki', 'valred', 'ruby', 'hanzo', 'ronan'],
  // Combos SR (13 cartes chacun)
  'arkhel': ['zia', 'gaumry', 'lyle', 'marcus', 'bly', 'laurie', 'archer', 'oji', 'lo', 'kassius', 'alokah', 'monkigh', 'oak'],
  'riona': ['division vii', 'terak', 'lynn', 'psychard', 'raven', 'seelung', 'sit', 'souleiman', 'drone', 'criarunes', 'class i utility drone', 'jackie', 'mantrix council'],
  'sijin': ['the no', 'ricred', 'lylini', 'chaka', 'taki', 'arjjuna', 'nyvenn', 'galile', 'bou', 'kahi & khennan', 'phosphene', 'sollale', 'garth'],
  // Autres combos spéciaux qui ne suivent pas le format A & B
  'robotic chimera': ['dog robot', 'tiger robot', 'cyber-scorpion', 'meca bird'],
  'zanger restoration': ['zanger serie', 'class iii utility robot'],
  'the wandering triad': ['skar', 'sylphio', 'diane']
};

// Liste des combos EXCLUSIVE (pas de valeur stones)
export const EXCLUSIVE_COMBOS = [
  'gryffin & muders',
  'kunesh & gamar', 
  'giant eagle & griffin'
];

// Valeurs hardcodées pour certains combos SR qui ne suivent pas la logique
export const HARDCODED_COMBO_VALUES: Record<string, number> = {
  // Format: "nom_combo|grade" -> valeur
  // Hannibal & Honora
  'hannibal & honora|c': 304,
  'hannibal & honora|b': 670,
  'hannibal & honora|a': 1220,
  'hannibal & honora|s': 1950,
  
  // Erika & Tiger Robot
  'erika & tiger robot|c': 202,
  'erika & tiger robot|b': 445,
  'erika & tiger robot|a': 810,
  'erika & tiger robot|s': 1296,
  
  // Wini & Galile
  'wini & galile|c': 102,
  'wini & galile|b': 224,
  'wini & galile|a': 408,
  'wini & galile|s': 653,
  
  // Sijin (RIFT)
  'sijin|c': 713,
  'sijin|b': 1456,
  'sijin|a': 2652,
  'sijin|s': 4243
};

export function getCardRarity(cardName: string): string | null {
  return KNOWN_CARDS[cardName.toLowerCase()] || null;
}

export function parseComboRarities(comboName: string): string[] {
  const lowerComboName = comboName.toLowerCase();
  
  // Vérifier d'abord les cas spéciaux
  if (SPECIAL_COMBO_NAMES[lowerComboName]) {
    const specialCards = SPECIAL_COMBO_NAMES[lowerComboName];
    const rarities: string[] = [];
    
    for (const cardName of specialCards) {
      const rarity = getCardRarity(cardName);
      if (rarity) {
        rarities.push(rarity);
      }
    }
    
    return rarities;
  }
  
  // Sinon, parser normalement avec le format "Card A & Card B"
  const cardNames = comboName.split(' & ').map(name => name.trim());
  const rarities: string[] = [];
  
  for (const cardName of cardNames) {
    const rarity = getCardRarity(cardName);
    if (rarity) {
      rarities.push(rarity);
    }
  }
  
  return rarities;
}