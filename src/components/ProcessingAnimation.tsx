import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ProcessingAnimationProps {
  nftCount: number
  totalStones: number
  onComplete: () => void
  isLoading?: boolean
}

const sarcasticMessages = [
  "Oh wow, encore un wallet à vérifier... passionnant 🙄",
  "Pourquoi t'as été foutre toute cette merde sur une blockchain... 📦",
  "Conversion de JPEGs en cellules Excel... révolutionnaire ! 🚀",
  "J'invoque les esprits de la blockchain... 👻",
  "Je demande gentiment à IMX tes précieuses cartes... 🎴",
  "Je compte les pixels un par un... 🔍",
  "Traduction du langage singe vers Excel... 🦍",
  "Tes NFTs valent probablement moins que ce fichier Excel... 💸",
  "Traitement en cours... comme chez ton psy 🛋️",
  "Je fais pleurer ton comptable... 😢",
  "Conversion d'hopium en stones... ⚗️",
  "Ctrl+C, Ctrl+V vers la richesse... 💰"
]

export function ProcessingAnimation({ nftCount, totalStones, onComplete, isLoading = false }: ProcessingAnimationProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [startTime] = useState(Date.now())
  const [canComplete, setCanComplete] = useState(false)

  // Ensure minimum 6 seconds duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanComplete(true)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % sarcasticMessages.length)
    }, 2000)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime
        const minProgress = (elapsed / 6000) * 100 // Progress based on 6 seconds minimum
        
        if (!isLoading && canComplete && prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        
        if (isLoading) {
          // Progress slowly while loading, but respect minimum time
          const targetProgress = Math.min(minProgress, 85)
          return Math.min(prev + Math.random() * 5, targetProgress)
        }
        
        // When done loading but not 6 seconds yet
        if (!canComplete) {
          const targetProgress = Math.min(minProgress, 95)
          return Math.min(prev + Math.random() * 10, targetProgress)
        }
        
        // Complete quickly after 6 seconds and loading done
        return Math.min(prev + Math.random() * 20, 100)
      })
    }, 200)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete, isLoading, startTime, canComplete])

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
            Génération de ton précieux Excel
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
            {Math.round(progress)}% - {progress < 100 ? 'Ça mijote...' : 'C\'est prêt ! 🍽️'}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-400 space-y-1"
        >
          {isLoading ? (
            <p className="text-yellow-400">
              NFTs récupérés : {nftCount} et ça continue...
            </p>
          ) : (
            <>
              <p>J'ai trouvé {nftCount} ramasse-poussières numériques</p>
              <p className="text-purple-400 font-semibold">
                Total : {totalStones.toLocaleString()} cailloux magiques d'internet 💎
              </p>
            </>
          )}
        </motion.div>

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-gray-600"
        >
          Astuce de pro : Ces stones ne t'aideront pas dans la vraie vie
        </motion.div>
      </div>
    </motion.div>
  )
}