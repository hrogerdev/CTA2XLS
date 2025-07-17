import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function WindshieldAcademy() {
  const [wipePosition, setWipePosition] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWipePosition(prev => (prev + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <aside id="fake-ad-windshield" className="max-w-[480px] mx-auto my-8 relative overflow-hidden">
      <motion.div 
        className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 relative"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-white opacity-20"
            animate={{ x: wipePosition === 0 ? '-100%' : '100%' }}
            transition={{ duration: 1.5 }}
          />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-30"
              style={{
                width: Math.random() * 40 + 20,
                height: Math.random() * 40 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 text-center text-white">
          <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded-full mb-4 transform rotate-3">
            ⭐ Formation 3 JOURS ⭐
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
            DEVENEZ PARBRIGISTE PRO EN 72H !
          </h3>
          <p className="text-sm mb-4">
            Décrochez votre <em>Squeegee Master Badge</em> et frottez plus vite que la lumière. 
            Certification NFT incluse.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full"
          >
            Je passe la raclette ➜
          </motion.button>
          <div className="mt-4 text-xs opacity-70">
            Certifié par l'International Parbrigiste Institute™
          </div>
        </div>
      </motion.div>
      <p className="text-[10px] text-gray-500 text-center mt-1">
        Parodie, non contractuel - Publicité parodique, aucun produit réel
      </p>
    </aside>
  )
}

function EternalLandDrop() {
  const [showTumbleweed, setShowTumbleweed] = useState(false)
  
  return (
    <aside id="fake-ad-landdrop" className="max-w-[480px] mx-auto my-8">
      <div className="bg-black rounded-lg overflow-hidden relative">
        {!showTumbleweed ? (
          <div 
            className="relative cursor-pointer"
            onClick={() => setShowTumbleweed(true)}
          >
            <div className="bg-gray-800 p-4">
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                ● LIVE
              </div>
              <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-80" />
                <div className="text-white text-center z-10">
                  <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                    UNBOXING DES LANDS
                  </h3>
                  <p className="text-xl mb-2">EN DIRECT DEPUIS 2019</p>
                  <div className="text-4xl font-mono text-yellow-400">
                    1 234 567h 42m 19s
                  </div>
                </div>
              </div>
              <div className="mt-2 text-white text-xs overflow-hidden">
                <motion.div
                  animate={{ x: [0, -100 + '%'] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="whitespace-nowrap"
                >
                  ⏰ 1 234 567 h de hype cumulée • 0 terrain livré • Mais on y croit ! • ⏰ 1 234 567 h de hype cumulée • 0 terrain livré • Mais on y croit !
                </motion.div>
              </div>
              <p className="text-center text-gray-400 mt-2">
                Abonne-toi pour un autre refresh
              </p>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-b from-orange-200 to-yellow-100 flex items-center justify-center">
            <motion.div
              animate={{ x: [0, 400], rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-6xl"
            >
              🌵
            </motion.div>
          </div>
        )}
      </div>
      <p className="text-[10px] text-gray-500 text-center mt-1">
        Parodie, non contractuel - Publicité parodique, aucun produit réel
      </p>
    </aside>
  )
}

function Penimaxi() {
  const [isClosing, setIsClosing] = useState(false)
  
  if (isClosing) return null
  
  return (
    <aside id="fake-ad-penimaxi" className="max-w-[300px] mx-auto my-8">
      <motion.div 
        className="relative bg-white border-4 border-red-500 rounded-lg p-4"
        animate={{ 
          boxShadow: [
            '0 0 0 0 rgba(255, 0, 0, 0.7)',
            '0 0 20px 10px rgba(255, 0, 0, 0.3)',
            '0 0 0 0 rgba(255, 0, 0, 0.7)'
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <button
          onClick={() => setIsClosing(true)}
          className="absolute top-1 right-1 text-gray-400 text-xs hover:text-gray-600"
        >
          ❌
        </button>
        
        <div className="text-center">
          <div className="text-6xl mb-2">⬆️</div>
          <h3 className="text-2xl font-bold text-red-600 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            AGRANDIS TON ÉPÉE DE +300%*
          </h3>
          <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-full inline-block mb-3 transform -rotate-2">
            GARANTI*
          </div>
          <p className="text-sm mb-4">
            *Résultats non garantis, mais ta confiance oui.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-red-600 text-white font-bold px-6 py-3 rounded-full w-full"
          >
            Je clique avant d'y penser
          </motion.button>
          <div className="mt-3 flex items-center justify-center text-xs text-gray-600">
            <span className="mr-2">🔒</span>
            Vérifié par 137 000 satisfaits...
          </div>
        </div>
      </motion.div>
      <p className="text-[10px] text-gray-500 text-center mt-1">
        Parodie, non contractuel - Publicité parodique, aucun produit réel
      </p>
    </aside>
  )
}

function GrandMarabout() {
  const [rotation, setRotation] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <aside id="fake-ad-marabout" className="max-w-[480px] mx-auto my-8">
      <div className="bg-yellow-400 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              💖
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-4 relative">
            <div className="w-32 h-32 bg-black rounded-full mx-auto relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-60"
                animate={{ rotate: rotation }}
              />
              <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center text-white text-4xl">
                🔮
              </div>
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-purple-800 mb-3" style={{ fontFamily: 'Impact, sans-serif' }}>
            AMOUR PERDU ? RETOUR 24H GARANTI !
          </h3>
          
          <div className="bg-white rounded-lg p-3 mb-4 text-left">
            <p className="font-bold text-purple-800 mb-2">Grand Marabout N'Golo résout :</p>
            <ul className="text-sm space-y-1">
              <li>• Ligature mystique</li>
              <li>• Poudre de succès</li>
              <li>• Crypto-désenvoûtement</li>
              <li>• Retour de l'être aimé en 24h</li>
              <li>• Chance aux examens CTA</li>
            </ul>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-green-500 text-white font-bold px-6 py-3 rounded-full inline-block"
          >
            WhatsApp +229 69 42 01 337
          </motion.div>
          
          <div className="mt-3 text-xs text-purple-800">
            Ton cœur n'attend pas
          </div>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 text-center mt-1">
        Parodie, non contractuel - Publicité parodique, aucun produit réel
      </p>
    </aside>
  )
}

function VideoEditingScam() {
  const [glitch, setGlitch] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <aside id="fake-ad-video" className="max-w-[480px] mx-auto my-8">
      <motion.div 
        className="bg-gradient-to-r from-purple-900 via-pink-600 to-red-600 rounded-lg p-6 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <div className="absolute inset-0 bg-black opacity-20" />
        {glitch && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-pink-500 opacity-50 mix-blend-screen" />
        )}
        
        <div className="relative z-10 text-white text-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 rounded mb-4 transform -rotate-3"
          >
            🎬 PROMO FLASH 🎬
          </motion.div>
          
          <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
            MONTAGE VIDÉO PRO
          </h3>
          <div className="text-5xl font-bold mb-2 text-yellow-400">
            6000€/HEURE
          </div>
          <p className="text-xl line-through opacity-70 mb-4">
            Prix normal : 12000€/heure
          </p>
          
          <div className="bg-black bg-opacity-50 rounded-lg p-3 mb-4">
            <p className="font-bold mb-2">✨ Services Premium :</p>
            <ul className="text-sm space-y-1 text-left">
              <li>• Effets Windows Movie Maker 2003</li>
              <li>• Transitions PowerPoint incluses</li>
              <li>• Musique libre de droits (Darude - Sandstorm)</li>
              <li>• Export en 240p pour économiser la bande passante</li>
              <li>• Filigrane "UNREGISTERED HYPERCAM 2" offert</li>
            </ul>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full text-xl"
          >
            JE VEUX MON DEVIS !
          </motion.button>
          
          <p className="mt-3 text-xs opacity-70">
            * Minimum 10 secondes facturées
          </p>
        </div>
      </motion.div>
      <p className="text-[10px] text-gray-500 text-center mt-1">
        Parodie, non contractuel - Publicité parodique, aucun produit réel
      </p>
    </aside>
  )
}

export function FakeAdPlaceholder({ type }: { type?: string }) {
  const ads = {
    windshield: WindshieldAcademy,
    landdrop: EternalLandDrop,
    penimaxi: Penimaxi,
    marabout: GrandMarabout,
    video: VideoEditingScam
  }
  
  if (type && ads[type as keyof typeof ads]) {
    const Component = ads[type as keyof typeof ads]
    return <Component />
  }
  
  const adList = Object.values(ads)
  const RandomAd = adList[Math.floor(Math.random() * adList.length)]
  
  return <RandomAd />
}