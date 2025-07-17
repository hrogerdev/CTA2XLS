import { motion, AnimatePresence } from 'framer-motion'
import { ImxNft } from '../types'
import * as XLSX from 'xlsx'
import { calculateStoneValue } from '../utils/stonesValues'

interface NftTableProps {
  nfts: ImxNft[]
}

// Helper function to extract metadata attributes
function getMetadataValue(metadata: any, key: string): string {
  if (!metadata) return 'N/A'
  
  // Check if metadata has attributes array (common format)
  if (metadata.attributes && Array.isArray(metadata.attributes)) {
    const attr = metadata.attributes.find((a: any) => 
      a.trait_type?.toLowerCase() === key.toLowerCase() || 
      a.key?.toLowerCase() === key.toLowerCase()
    )
    return attr?.value?.toString() || 'N/A'
  }
  
  // Check direct properties
  if (metadata[key] !== undefined) {
    return metadata[key].toString()
  }
  
  // Check various case variations
  const lowerKey = key.toLowerCase()
  const found = Object.keys(metadata).find(k => k.toLowerCase() === lowerKey)
  return found ? metadata[found].toString() : 'N/A'
}

export function NftTable({ nfts }: NftTableProps) {
  // Calculate total stones value
  const totalStones = nfts.reduce((total, nft) => {
    const stoneValue = calculateStoneValue(
      getMetadataValue(nft.metadata, 'faction'),
      getMetadataValue(nft.metadata, 'rarity'),
      getMetadataValue(nft.metadata, 'foil'),
      getMetadataValue(nft.metadata, 'advancement'),
      getMetadataValue(nft.metadata, 'grade'),
      getMetadataValue(nft.metadata, 'evolution')
    );
    return total + stoneValue;
  }, 0);

  const exportToExcel = () => {
    const data = nfts.map(nft => {
      const stoneValue = calculateStoneValue(
        getMetadataValue(nft.metadata, 'faction'),
        getMetadataValue(nft.metadata, 'rarity'),
        getMetadataValue(nft.metadata, 'foil'),
        getMetadataValue(nft.metadata, 'advancement'),
        getMetadataValue(nft.metadata, 'grade'),
        getMetadataValue(nft.metadata, 'evolution')
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
        'Contract Address': nft.token_address,
        'Status': nft.status,
        'Created At': nft.created_at || 'N/A',
        'URI': nft.uri || 'N/A'
      };
    })

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Cross The Ages NFTs')
    
    const fileName = `cta-nfts-${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(wb, fileName)
  }

  if (nfts.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-6xl mx-auto mt-8"
    >
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Found {nfts.length} Cross The Ages NFTs
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Total value: <span className="font-semibold text-purple-600">{totalStones.toLocaleString()} stones</span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          Export to Excel
        </motion.button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Token ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Numbering
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Rarity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Faction
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Element
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Grade
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Advancement
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Foil
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Stones
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {nfts.map((nft, index) => (
                  <motion.tr
                    key={`${nft.token_address}-${nft.token_id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.01, 0.5) }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {nft.token_id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {nft.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {getMetadataValue(nft.metadata, 'numbering')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getMetadataValue(nft.metadata, 'rarity').toLowerCase() === 'legendary' ? 'bg-purple-100 text-purple-800' :
                        getMetadataValue(nft.metadata, 'rarity').toLowerCase() === 'epic' ? 'bg-orange-100 text-orange-800' :
                        getMetadataValue(nft.metadata, 'rarity').toLowerCase() === 'rare' ? 'bg-blue-100 text-blue-800' :
                        getMetadataValue(nft.metadata, 'rarity').toLowerCase() === 'uncommon' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getMetadataValue(nft.metadata, 'rarity')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {getMetadataValue(nft.metadata, 'faction')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {getMetadataValue(nft.metadata, 'element')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {getMetadataValue(nft.metadata, 'rank')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {getMetadataValue(nft.metadata, 'grade')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getMetadataValue(nft.metadata, 'advancement').toLowerCase() === 'combo' ? 'bg-red-100 text-red-800' :
                        getMetadataValue(nft.metadata, 'advancement').toLowerCase() === 'alternative' ? 'bg-indigo-100 text-indigo-800' :
                        getMetadataValue(nft.metadata, 'advancement').toLowerCase() === 'exclusive' || 
                        getMetadataValue(nft.metadata, 'advancement').toLowerCase() === 'exclu' ? 'bg-black text-white' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {getMetadataValue(nft.metadata, 'advancement')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        getMetadataValue(nft.metadata, 'foil').toLowerCase() === 'true' || 
                        getMetadataValue(nft.metadata, 'foil').toLowerCase() === 'yes' ? 
                        'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {getMetadataValue(nft.metadata, 'foil')}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-purple-600">
                      {calculateStoneValue(
                        getMetadataValue(nft.metadata, 'faction'),
                        getMetadataValue(nft.metadata, 'rarity'),
                        getMetadataValue(nft.metadata, 'foil'),
                        getMetadataValue(nft.metadata, 'advancement'),
                        getMetadataValue(nft.metadata, 'grade'),
                        getMetadataValue(nft.metadata, 'evolution')
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        nft.status === 'imx' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {nft.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

      </div>
    </motion.div>
  )
}