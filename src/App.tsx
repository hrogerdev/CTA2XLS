import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { AddressForm } from './components/AddressForm'
import { FakeAdPlaceholder } from './components/FakeAdPlaceholder'
import { ProcessingAnimation } from './components/ProcessingAnimation'
import { useImxNfts } from './hooks/useImxNfts'
import * as XLSX from 'xlsx-js-style'
import { calculateStoneValueWithComment } from './utils/stonesValues'
import { EXCLUSIVE_COMBOS } from './utils/knownCards'

function getMetadataValue(metadata: any, key: string): string {
  if (!metadata) return 'N/A'
  
  if (metadata.attributes && Array.isArray(metadata.attributes)) {
    const attr = metadata.attributes.find((a: any) => 
      a.trait_type?.toLowerCase() === key.toLowerCase() || 
      a.key?.toLowerCase() === key.toLowerCase()
    )
    return attr?.value?.toString() || 'N/A'
  }
  
  if (metadata[key] !== undefined) {
    return metadata[key].toString()
  }
  
  const lowerKey = key.toLowerCase()
  const found = Object.keys(metadata).find(k => k.toLowerCase() === lowerKey)
  return found ? metadata[found].toString() : 'N/A'
}

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [showProcessing, setShowProcessing] = useState(false)
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const { nfts, loading, error } = useImxNfts(walletAddress)
  
  const adTypes = ['windshield', 'landdrop', 'penimaxi', 'marabout', 'video', 'elpatron']
  
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x > swipeThreshold) {
      setCurrentAdIndex((prev) => (prev - 1 + adTypes.length) % adTypes.length)
    } else if (info.offset.x < -swipeThreshold) {
      setCurrentAdIndex((prev) => (prev + 1) % adTypes.length)
    }
  }

  // Calculate total stones and count exclusives
  let exclusiveCount = 0;
  const totalStones = nfts.reduce((total, nft) => {
    const stoneResult = calculateStoneValueWithComment(
      getMetadataValue(nft.metadata, 'faction'),
      getMetadataValue(nft.metadata, 'rarity'),
      getMetadataValue(nft.metadata, 'foil'),
      getMetadataValue(nft.metadata, 'advancement'),
      getMetadataValue(nft.metadata, 'grade'),
      getMetadataValue(nft.metadata, 'rank') || getMetadataValue(nft.metadata, 'evolution'),
      nft.name
    );
    
    // Check if it's an exclusive combo
    if (nft.name && EXCLUSIVE_COMBOS.some(combo => nft.name!.toLowerCase().includes(combo.toLowerCase()))) {
      exclusiveCount++;
    }
    
    return total + stoneResult.value;
  }, 0);


  // Show processing animation when wallet is submitted
  useEffect(() => {
    if (walletAddress && loading) {
      setShowProcessing(true);
    }
  }, [walletAddress, loading]);

  const generateExcel = () => {
    const data = nfts.map(nft => {
      const stoneResult = calculateStoneValueWithComment(
        getMetadataValue(nft.metadata, 'faction'),
        getMetadataValue(nft.metadata, 'rarity'),
        getMetadataValue(nft.metadata, 'foil'),
        getMetadataValue(nft.metadata, 'advancement'),
        getMetadataValue(nft.metadata, 'grade'),
        getMetadataValue(nft.metadata, 'rank') || getMetadataValue(nft.metadata, 'evolution'),
        nft.name
      );
      
      // Ajouter commentaire pour Mint Pass
      let comment = stoneResult.comment || '';
      if (nft.name && nft.name.toLowerCase().includes('mint pass')) {
        comment = comment ? comment + ' - La Retraite !' : 'La Retraite !';
      }
      
      return {
        'Token ID': nft.token_id,
        'Name': nft.name || 'N/A',
        'Numbering': getMetadataValue(nft.metadata, 'numbering'),
        'Rarity': getMetadataValue(nft.metadata, 'rarity'),
        'Faction': getMetadataValue(nft.metadata, 'faction'),
        'Element': getMetadataValue(nft.metadata, 'element'),
        'Rank': getMetadataValue(nft.metadata, 'rank'),
        'Grade': getMetadataValue(nft.metadata, 'grade'),
        'Advancement': getMetadataValue(nft.metadata, 'advancement'),
        'Evolution': getMetadataValue(nft.metadata, 'evolution'),
        'Foil': getMetadataValue(nft.metadata, 'foil'),
        'Stone Value': stoneResult.value,
        'Commentaire': comment,
        'Description': nft.description || 'N/A',
        'Created At': nft.created_at || 'N/A'
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cross The Ages NFTs');
    
    // Count NFTs by rarity
    const rarityCount: Record<string, number> = {};
    data.forEach(row => {
      const rarity = row.Rarity || 'N/A';
      rarityCount[rarity] = (rarityCount[rarity] || 0) + 1;
    });
    
    // Create rarity table
    const rarityData = Object.entries(rarityCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([rarity, count]) => ({
        'Rareté': rarity,
        'Quantité': count
      }));
    
    // Create valuation table
    const valuationData = [];
    
    // Prix spécial à 0.06 avec "LOOL"
    valuationData.push({
      'Prix Stone ($)': '0,060 LOOL',
      'Valeur Portefeuille ($)': (totalStones * 0.060).toFixed(2)
    });
    
    // De 0.025 à 0.012 par pas de 0.001
    for (let price = 0.025; price >= 0.012; price -= 0.001) {
      valuationData.push({
        'Prix Stone ($)': price.toFixed(3),
        'Valeur Portefeuille ($)': (totalStones * price).toFixed(2)
      });
    }
    
    // Create summary sheet with custom layout
    const summary = XLSX.utils.aoa_to_sheet([
      // First row with headers
      ['Total NFTs', 'Valeur Totale en Stones', 'Adresse Wallet', 'Date de Génération', 'Rappel à la réalité'],
      // Second row with values
      [nfts.length, totalStones, walletAddress, new Date().toLocaleString('fr-FR'), 'Ce ne sont toujours que des JPEGs'],
      [],
      [],
      // Rarity table header at A5
      ['RÉPARTITION PAR RARETÉ', '', '', '', 'VALORISATION DU PORTEFEUILLE'],
      ['Rareté', 'Quantité', '', '', 'Prix Stone ($)', 'Valeur Portefeuille ($)']
    ]);
    
    // Add rarity data starting at A7
    rarityData.forEach((row, index) => {
      const rowIndex = 6 + index;
      XLSX.utils.sheet_add_aoa(summary, [[row['Rareté'], row['Quantité']]], { origin: `A${rowIndex + 1}` });
    });
    
    // Add valuation data starting at E7
    valuationData.forEach((row, index) => {
      const rowIndex = 6 + index;
      const price = row['Prix Stone ($)'].replace('.', ',');
      const value = row['Valeur Portefeuille ($)'].replace('.', ',');
      XLSX.utils.sheet_add_aoa(summary, [[price, value]], { origin: `E${rowIndex + 1}` });
    });
    
    // Apply styles
    const headerStyle = {
      fill: { fgColor: { rgb: "4472C4" } },
      font: { color: { rgb: "FFFFFF" }, bold: true },
      alignment: { horizontal: "center", vertical: "center" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } }
      }
    };
    
    const dataStyle = {
      border: {
        top: { style: "thin", color: { rgb: "D9D9D9" } },
        bottom: { style: "thin", color: { rgb: "D9D9D9" } },
        left: { style: "thin", color: { rgb: "D9D9D9" } },
        right: { style: "thin", color: { rgb: "D9D9D9" } }
      }
    };
    
    const titleStyle = {
      font: { bold: true, sz: 14 },
      fill: { fgColor: { rgb: "E7E6E6" } },
      alignment: { horizontal: "center" }
    };
    
    // Apply styles to headers (row 1)
    ['A1', 'B1', 'C1', 'D1', 'E1'].forEach(cell => {
      if (!summary[cell]) summary[cell] = {};
      summary[cell].s = headerStyle;
    });
    
    // Apply styles to data (row 2)
    ['A2', 'B2', 'C2', 'D2', 'E2'].forEach(cell => {
      if (!summary[cell]) summary[cell] = {};
      summary[cell].s = dataStyle;
    });
    
    // Apply styles to table titles
    if (!summary['A5']) summary['A5'] = {};
    summary['A5'].s = titleStyle;
    if (!summary['E5']) summary['E5'] = {};
    summary['E5'].s = titleStyle;
    
    // Apply styles to table headers
    ['A6', 'B6', 'E6', 'F6'].forEach(cell => {
      if (!summary[cell]) summary[cell] = {};
      summary[cell].s = headerStyle;
    });
    
    // Set column widths
    summary['!cols'] = [
      { wpx: 120 }, // A
      { wpx: 120 }, // B
      { wpx: 280 }, // C
      { wpx: 150 }, // D
      { wpx: 120 }, // E
      { wpx: 150 }  // F
    ];
    
    XLSX.utils.book_append_sheet(wb, summary, 'Résumé');
    
    const fileName = `cta-nfts-${walletAddress?.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Mobile-friendly download method
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
    
    setShowProcessing(false);
    setWalletAddress(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {showProcessing && (
          <ProcessingAnimation
            nftCount={nfts.length}
            totalStones={totalStones}
            onComplete={generateExcel}
            isLoading={loading}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CTA to XLS 🚀
          </h1>
          <p className="text-lg text-gray-600">
            Tes JPEGs dans un tableur
          </p>
        </motion.header>

        <AddressForm onSubmit={setWalletAddress} isLoading={loading} />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            <p className="font-medium">Oups ! 🤡</p>
            <p>{error}</p>
            <p className="text-sm mt-2">Essaie peut-être avec une vraie adresse wallet la prochaine fois ?</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Mode d'emploi (pour les QI de bulot)</h2>
            <div className="max-w-2xl mx-auto space-y-4 mt-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">1️⃣</span>
                <span className="text-gray-700">Colle ton adresse wallet (le long truc qui fait peur)</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">2️⃣</span>
                <span className="text-gray-700">Clique sur le bouton brillant (tu peux le faire !)</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">3️⃣</span>
                <span className="text-gray-700">Récupère ton fichier Excel (wow, quelle technologie !)</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">4️⃣</span>
                <span className="text-gray-700">Pleure sur tes "investissements" 😭</span>
              </motion.div>
            </div>
          </div>


        </motion.div>

        {/* Carousel de pubs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAdIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
              >
                <FakeAdPlaceholder type={adTypes[currentAdIndex]} />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons - hidden on mobile */}
            <button
              onClick={() => setCurrentAdIndex((prev) => (prev - 1 + adTypes.length) % adTypes.length)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-gray-800 text-white rounded-full w-10 h-10 items-center justify-center hover:bg-gray-700 transition-colors"
              aria-label="Publicité précédente"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentAdIndex((prev) => (prev + 1) % adTypes.length)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-gray-800 text-white rounded-full w-10 h-10 items-center justify-center hover:bg-gray-700 transition-colors"
              aria-label="Publicité suivante"
            >
              →
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {adTypes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentAdIndex ? 'bg-gray-800' : 'bg-gray-400'
                }`}
                aria-label={`Aller à la publicité ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* Footer avec messages selon le nombre */}

    </div>
  )
}