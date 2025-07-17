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
  const [konami, setKonami] = useState(0)
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

  // Easter egg: Konami code
  useEffect(() => {
    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let current = 0;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === sequence[current]) {
        current++;
        if (current === sequence.length) {
          setKonami(prev => prev + 1);
          current = 0;
        }
      } else {
        current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Auto download when NFTs are loaded
  useEffect(() => {
    if (!loading && nfts.length > 0 && walletAddress) {
      setShowProcessing(true);
    }
  }, [loading, nfts.length, walletAddress]);

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
      'Total Stone Value': totalStones,
      'Wallet Address': walletAddress,
      'Generated Date': new Date().toLocaleString(),
      'Reality Check': 'These are still just JPEGs'
    }]);
    XLSX.utils.book_append_sheet(wb, summary, 'Summary');
    
    const fileName = `cta-nfts-${walletAddress?.slice(0, 8)}-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    setShowProcessing(false);
    setWalletAddress(null);
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${konami > 0 ? 'rainbow-bg' : ''}`}>
      <AnimatePresence>
        {showProcessing && (
          <ProcessingAnimation
            nftCount={nfts.length}
            totalStones={totalStones}
            onComplete={generateExcel}
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
            CTA to XLS {konami > 0 && '🌈'}
          </h1>
          <p className="text-lg text-gray-600">
            Because nothing says "I made it" like an Excel file of your JPEGs
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Turning your digital cardboard into spreadsheet gold since 2024
          </p>
        </motion.header>

        <AddressForm onSubmit={setWalletAddress} isLoading={loading} />

        <FakeAdPlaceholder />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            <p className="font-medium">Oopsie! 🤡</p>
            <p>{error}</p>
            <p className="text-sm mt-2">Maybe try a real wallet address next time?</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 space-y-8"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">How it works (for smooth brains)</h2>
            <div className="max-w-2xl mx-auto space-y-4 mt-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">1️⃣</span>
                <span className="text-gray-700">Paste your wallet address (the long scary number)</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">2️⃣</span>
                <span className="text-gray-700">Click the shiny button (you can do it!)</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">3️⃣</span>
                <span className="text-gray-700">Get your Excel file (wow, such technology!)</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <span className="text-3xl mr-3">4️⃣</span>
                <span className="text-gray-700">Cry over your "investments" 😭</span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="text-center text-xs text-gray-400 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>* Not financial advice (obviously)</p>
            <p>* Your NFTs are probably worthless</p>
            <p>* This Excel file won't make them worth more</p>
            <p>* But at least you'll have a nice spreadsheet</p>
          </motion.div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-sm text-gray-500"
        >
          <p>Made with 🤡 for degens who need spreadsheets</p>
          <p className="mt-2">
            Contract: 0xa04bcac09a3ca810796c9e3deee8fdc8c9807166
          </p>
          <p className="text-xs mt-4 text-gray-400">
            {konami > 0 ? '🎮 Konami code activated! You found the rainbow mode!' : 'Try the Konami code... if you remember it'}
          </p>
        </motion.footer>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .rainbow-bg {
          animation: rainbow 10s ease infinite;
          background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff);
          background-size: 400% 400%;
        }
        
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  )
}