import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ProcessingAnimationProps {
  nftCount: number
  totalStones: number
  onComplete: () => void
}

const sarcasticMessages = [
  "Oh wow, another wallet to check... thrilling 🙄",
  "Calculating your virtual cardboard value... 📦",
  "Converting JPEGs to Excel cells... revolutionary! 🚀",
  "Summoning the blockchain spirits... 👻",
  "Asking IMX nicely for your precious cards... 🎴",
  "Counting pixels one by one... 🔍",
  "Translating ape language to Excel... 🦍",
  "Your NFTs are probably worth less than this Excel file... 💸",
  "Processing... just like your therapist 🛋️",
  "Making your accountant cry... 😢",
  "Converting hopium to stones... ⚗️",
  "Ctrl+C, Ctrl+V your way to riches... 💰"
]

export function ProcessingAnimation({ nftCount, totalStones, onComplete }: ProcessingAnimationProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % sarcasticMessages.length)
    }, 2000)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto"
        >
          <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-4xl">
            📊
          </div>
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">
            Generating Your Precious Excel
          </h3>
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-gray-400 italic"
          >
            {sarcasticMessages[currentMessage]}
          </motion.p>
        </div>

        <div className="space-y-2">
          <div className="bg-gray-800 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {Math.round(progress)}% - {progress < 100 ? 'Still cooking...' : 'Ready to serve! 🍽️'}
          </p>
        </div>

        {nftCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-400 space-y-1"
          >
            <p>Found {nftCount} digital dust collectors</p>
            <p className="text-purple-400 font-semibold">
              Total: {totalStones.toLocaleString()} magic internet stones 💎
            </p>
          </motion.div>
        )}

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-gray-600"
        >
          Pro tip: These stones won't help you in real life
        </motion.div>
      </div>
    </motion.div>
  )
}