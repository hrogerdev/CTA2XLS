import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AddressForm } from './components/AddressForm'
import { FakeAdPlaceholder } from './components/FakeAdPlaceholder'
import { ProcessingAnimation } from './components/ProcessingAnimation'
import { useImxNfts } from './hooks/useImxNfts'
import * as XLSX from 'xlsx'
import { calculateStoneValue } from './utils/stonesValues'

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
  const { nfts, loading, error } = useImxNfts(walletAddress)

  // Calculate total stones
  const totalStones = nfts.reduce((total, nft) => {
    const stoneValue = calculateStoneValue(
      getMetadataValue(nft.metadata, 'faction'),
      getMetadataValue(nft.metadata, 'rarity'),
      getMetadataValue(nft.metadata, 'foil'),
      getMetadataValue(nft.metadata, 'advancement'),
      getMetadataValue(nft.metadata, 'grade'),
      getMetadataValue(nft.metadata, 'rank') || getMetadataValue(nft.metadata, 'evolution')
    );
    return total + stoneValue;
  }, 0);


  // Show processing animation when wallet is submitted
  useEffect(() => {
    if (walletAddress && loading) {
      setShowProcessing(true);
    }
  }, [walletAddress, loading]);

  const generateExcel = () => {
    const data = nfts.map(nft => {
      const stoneValue = calculateStoneValue(
        getMetadataValue(nft.metadata, 'faction'),
        getMetadataValue(nft.metadata, 'rarity'),
        getMetadataValue(nft.metadata, 'foil'),
        getMetadataValue(nft.metadata, 'advancement'),
        getMetadataValue(nft.metadata, 'grade'),
        getMetadataValue(nft.metadata, 'rank') || getMetadataValue(nft.metadata, 'evolution')
      );
      
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
        'Stone Value': stoneValue,
        'Description': nft.description || 'N/A',
        'Status': nft.status,
        'Created At': nft.created_at || 'N/A',
        'URI': nft.uri || 'N/A'
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Cross The Ages NFTs');
    
    // Add summary sheet
    const summary = XLSX.utils.json_to_sheet([{
      'Total NFTs': nfts.length,
      'Valeur Totale en Stones': totalStones,
      'Adresse Wallet': walletAddress,
      'Date de Génération': new Date().toLocaleString('fr-FR'),
      'Rappel à la réalité': 'Ce ne sont toujours que des JPEGs'
    }]);
    XLSX.utils.book_append_sheet(wb, summary, 'Résumé');
    
    const fileName = `cta-nfts-${walletAddress?.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
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
            Parce que rien ne dit "j'ai réussi" comme un fichier Excel de tes JPEGs
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
          <FakeAdPlaceholder type="video" />
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Comment ça marche (pour les cerveaux lisses)</h2>
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

          <motion.div
            className="text-center text-xs text-gray-400 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>* Pas un conseil financier (évidemment)</p>
            <p>* Tes NFTs ne valent probablement rien</p>
            <p>* Ce fichier Excel ne les rendra pas plus précieux</p>
            <p>* Mais au moins t'auras un joli tableur</p>
          </motion.div>

          <FakeAdPlaceholder />
        </motion.div>

        <FakeAdPlaceholder type="landdrop" />

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-sm text-gray-500"
        >
          <p>Fait avec 🤡 pour les degens qui ont besoin de tableurs</p>
          <p className="mt-2">
            Contrat : 0xa04bcac09a3ca810796c9e3deee8fdc8c9807166
          </p>
        </motion.footer>
      </div>

    </div>
  )
}