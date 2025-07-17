import { useState } from 'react'
import { motion } from 'framer-motion'
import { AddressForm } from './components/AddressForm'
import { NftTable } from './components/NftTable'
import { LoadingSpinner } from './components/LoadingSpinner'
import { FakeAdPlaceholder } from './components/FakeAdPlaceholder'
import { useImxNfts } from './hooks/useImxNfts'

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const { nfts, loading, error, hasMore, loadMore } = useImxNfts(walletAddress)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CTA to XLS
          </h1>
          <p className="text-lg text-gray-600">
            Export your Cross The Ages NFTs from Immutable X to Excel
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
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </motion.div>
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mt-8 text-center"
          >
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">
              Fetching Cross The Ages NFTs...
            </p>
            {nfts.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {nfts.length} NFTs loaded so far...
              </p>
            )}
          </motion.div>
        )}

        {!loading && nfts.length > 0 && (
          <NftTable
            nfts={nfts}
            hasMore={hasMore}
            onLoadMore={loadMore}
            isLoading={loading}
          />
        )}

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-sm text-gray-500"
        >
          <p>Made with ❤️ for Cross The Ages community</p>
          <p className="mt-2">
            Contract: 0xa04bcac09a3ca810796c9e3deee8fdc8c9807166
          </p>
        </motion.footer>
      </div>
    </div>
  )
}