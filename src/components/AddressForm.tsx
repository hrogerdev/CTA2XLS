import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

interface AddressFormProps {
  onSubmit: (address: string) => void
  isLoading: boolean
}

export function AddressForm({ onSubmit, isLoading }: AddressFormProps) {
  const [address, setAddress] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      onSubmit(address.trim())
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Immutable X wallet address..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading || !address.trim()}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Loading...' : 'View NFTs'}
        </motion.button>
      </div>
    </motion.form>
  )
}