import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function WindshieldAcademy() {
  const [wipePosition, setWipePosition] = useState(0)
  const [showClosed, setShowClosed] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWipePosition(prev => (prev + 1) % 2)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (showClosed) {
    return (
      <aside id="fake-ad-windshield" className="max-w-[480px] mx-auto my-8 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-8 relative text-center"
        >
          <div className="text-white">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Impact, sans-serif' }}>
              FORMATION COMPLÈTE !
            </h3>
            <p className="text-lg mb-2">
              Devant le succès de la formation, nous avons clôturé ses portes.
            </p>
            <p className="text-xl font-bold text-yellow-400 mb-4">
              Revenez l'année prochaine !
            </p>
            <button
              onClick={() => setShowClosed(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors text-sm"
            >
              Retour
            </button>
          </div>
        </motion.div>
      </aside>
    )
  }
  
  return (
    <aside id="fake-ad-windshield" className="max-w-[480px] mx-auto my-8 relative overflow-hidden">
      <motion.div 
        className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 relative cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setShowClosed(true)}
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
            LAVEUR DE PARE-BRISE PRO EN 72H !
          </h3>
          <p className="text-sm mb-4">
            Devenez riche en lustrant tout ce qui bouge.
            Certification NFT incluse.
          </p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full inline-block"
          >
            Je passe la raclette ➜
          </motion.div>
          <div className="mt-4 text-xs opacity-70">
            Certifié par l'International Parbrigiste Institute™
          </div>
        </div>
      </motion.div>
    </aside>
  )
}

function EternalLandDrop() {
  const [showTumbleweed, setShowTumbleweed] = useState(false)
  const [viewerCount, setViewerCount] = useState(12847)
  const [streamTime, setStreamTime] = useState(() => {
    // Temps depuis 2019 (environ 5 ans)
    const startDate = new Date('2019-01-01');
    const elapsed = Date.now() - startDate.getTime();
    const hours = Math.floor(elapsed / (1000 * 60 * 60));
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  })
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Update viewer count randomly
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5)
      
      // Update stream time
      setStreamTime(prev => {
        let { hours, minutes, seconds } = prev
        seconds++
        if (seconds >= 60) {
          seconds = 0
          minutes++
          if (minutes >= 60) {
            minutes = 0
            hours++
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <aside id="fake-ad-landdrop" className="max-w-[480px] mx-auto my-8">
      <div className="bg-black rounded-lg overflow-hidden relative">
        {!showTumbleweed ? (
          <div 
            className="relative cursor-pointer"
            onClick={() => setShowTumbleweed(true)}
          >
            <div className="aspect-video bg-gray-900 relative">
              {/* LIVE badge and viewers */}
              <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
                <div className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                  <span className="font-bold text-sm">LIVE</span>
                </div>
                <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                  👁 {viewerCount.toLocaleString()} spectateurs
                </div>
              </div>
              
              {/* Stream timer */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded font-mono text-sm z-10">
                {streamTime.hours.toLocaleString()}:{streamTime.minutes.toString().padStart(2, '0')}:{streamTime.seconds.toString().padStart(2, '0')}
              </div>
              
              {/* Main content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                    LIVRAISON DES LANDS EN DIRECT
                  </h3>
                  <p className="text-xl mb-4">Suivez l'événement historique !</p>
                </div>
              </div>
              
              {/* Watch button */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-4 py-2 text-sm md:px-8 md:py-3 md:text-base rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors"
                >
                  ▶️ Watch now
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-gradient-to-b from-orange-200 to-yellow-100 p-4">
            <div className="text-center mb-4">
              <p className="text-gray-600">Après {streamTime.hours.toLocaleString()} heures d'attente...</p>
            </div>
            <div className="aspect-video relative overflow-hidden flex items-center justify-center bg-black">
              <img 
                src="https://media.giphy.com/media/5x89XRx3sBZFC/giphy.gif" 
                alt="Tumbleweed" 
                className="w-full h-full object-cover"
              />
              
              {/* LIVE badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <span className="font-bold text-sm">LIVE</span>
              </div>
              
              {/* Viewer count */}
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm">
                👁 {viewerCount.toLocaleString()} spectateurs
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded">
                <p className="text-sm font-bold">Premières images exclusives des lands</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

function Penimaxi() {
  const [isClosing, setIsClosing] = useState(false)
  const [show404, setShow404] = useState(false)
  
  if (isClosing) return null
  
  if (show404) {
    return (
      <aside id="fake-ad-penimaxi" className="max-w-[300px] mx-auto my-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black text-white rounded-lg p-8 text-center"
        >
          <div className="text-6xl mb-4">404</div>
          <h3 className="text-2xl font-bold mb-4">NOT FOUND</h3>
          <p className="text-xl text-yellow-400 font-bold">Soon !</p>
          <button
            onClick={() => setShow404(false)}
            className="mt-6 text-gray-400 text-sm hover:text-white transition-colors"
          >
            Retour
          </button>
        </motion.div>
      </aside>
    )
  }
  
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
            AGRANDIS TON MINTPASS DE +300%*
          </h3>
          <div className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-full inline-block mb-3 transform -rotate-2">
            GARANTI*
          </div>
          <p className="text-sm mb-4">
            *Résultats non garantis
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-red-600 text-white font-bold px-6 py-3 rounded-full w-full"
            onClick={() => setShow404(true)}
          >
            J'en profite
          </motion.button>
          <div className="mt-3 flex items-center justify-center text-xs text-gray-600">
            <span className="mr-2">🔒</span>
            Vérifié par 137 000 satisfaits...
          </div>
        </div>
      </motion.div>
    </aside>
  )
}

function GrandMarabout() {
  const [rotation, setRotation] = useState(0)
  const [showGif, setShowGif] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  if (showGif) {
    return (
      <aside id="fake-ad-marabout" className="max-w-[480px] mx-auto my-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black rounded-lg p-4 text-center relative"
        >
          <img 
            src="/dieudo.gif" 
            alt="Marabout" 
            className="w-full h-auto rounded"
          />
          <button
            onClick={() => setShowGif(false)}
            className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors font-bold"
          >
            Retour
          </button>
        </motion.div>
      </aside>
    )
  }
  
  return (
    <aside id="fake-ad-marabout" className="max-w-[480px] mx-auto my-8">
      <div 
        className="bg-yellow-400 rounded-lg p-6 relative overflow-hidden cursor-pointer"
        onClick={() => setShowGif(true)}
      >
        <div className="absolute inset-0">
          {['💰', '🎰', '🏠', '💖', '🎲', '📈', '🌍', '💸'].map((emoji, i) => (
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
              {emoji}
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
            Monsieur N'GOLO
          </h3>
          <p className="text-xl text-purple-700 mb-3 font-bold">Grand Marabout</p>
          
          <div className="bg-white rounded-lg p-3 mb-4 text-left">
            <ul className="text-sm space-y-1">
              <li>• Retour de l'être aimé</li>
              <li>• Chiffres du loto</li>
              <li>• Market-making</li>
              <li>• Choix terrain & voisinage idéal</li>
            </ul>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-green-500 text-white font-bold px-6 py-3 rounded-full inline-block"
          >
            WhatsApp +229 69 42 01 337
          </motion.div>
          
        </div>
      </div>
    </aside>
  )
}

function ElPatronVideo() {
  const [isHovered, setIsHovered] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  
  const handleClick = () => {
    setShowWarning(true);
  }
  
  if (showWarning) {
    return (
      <aside id="fake-ad-elpatron" className="max-w-[480px] mx-auto my-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-red-900 to-black rounded-lg p-8 text-center"
        >
          <div className="text-white">
            <div className="text-6xl mb-4">🔞</div>
            <h3 className="text-2xl font-bold mb-4">
              Demi-tour Galac ! Faut être majeur
            </h3>
            <div className="space-y-3 mt-6">
              <button
                onClick={() => setShowWarning(false)}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-700 transition-colors"
              >
                Je suis galac
              </button>
              <button
                onClick={() => window.open('https://www.crosstheages.com/fr-fr/news/cta/token-generation-event/', '_blank')}
                className="w-full bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors"
              >
                Je suis majeur
              </button>
            </div>
          </div>
        </motion.div>
      </aside>
    )
  }
  
  return (
    <aside id="fake-ad-elpatron" className="max-w-[480px] mx-auto my-8">
      <div 
        className="bg-black rounded-lg overflow-hidden relative cursor-pointer group"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Blurred/clear thumbnail based on hover */}
          <div className="aspect-video relative overflow-hidden bg-black">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-pink-400 via-red-400 to-purple-400 transition-all duration-300"
              style={{
                filter: isHovered ? 'blur(5px)' : 'blur(40px)',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
              }}
            />
            <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'bg-opacity-10' : 'bg-opacity-40'}`} />
            
            {/* Play button overlay - always visible */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="bg-white bg-opacity-90 rounded-full w-20 h-20 flex items-center justify-center shadow-xl"
              >
                <div className="w-0 h-0 border-l-[30px] border-l-red-600 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent ml-2" />
              </motion.div>
            </div>
            
            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="text-white">
                <h3 className="text-lg font-bold mb-1">Gangbang : ils démontent toute une communauté</h3>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-red-400 font-bold">⭐ VERIFIED</span>
                  <span>•</span>
                  <span>El Patron</span>
                  <span>•</span>
                  <span>2.3M vues</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-red-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
    </aside>
  )
}

function VideoEditingScam() {
  const [glitch, setGlitch] = useState(false)
  const [showBusy, setShowBusy] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  
  if (showBusy) {
    return (
      <aside id="fake-ad-video" className="max-w-[480px] mx-auto my-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 text-white rounded-lg p-8 text-center"
        >
          <div className="text-6xl mb-4">💩</div>
          <h3 className="text-2xl font-bold mb-4">Non dispo</h3>
          <p className="text-lg mb-2">Pour cause de caca nerveux</p>
          <button
            onClick={() => setShowBusy(false)}
            className="mt-6 text-gray-400 text-sm hover:text-white transition-colors"
          >
            Retour
          </button>
        </motion.div>
      </aside>
    )
  }
  
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
            <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse mb-2">
              🏆 EXPERT CERTIFIÉ 🏆
            </div>
            <p className="text-lg">
              Montage professionnel par des vrais pros du métier
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full text-xl"
            onClick={() => setShowBusy(true)}
          >
            JE VEUX MON DEVIS !
          </motion.button>
          
          <p className="mt-3 text-xs opacity-70">
            * Minimum 10 secondes facturées
          </p>
        </div>
      </motion.div>
    </aside>
  )
}

function RecruitmentStudio() {
  const [showDetail, setShowDetail] = useState(false)
  
  if (showDetail) {
    return (
      <aside id="fake-ad-recruitment" className="max-w-[480px] mx-auto my-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 rounded-lg p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">SOON STUDIO 🎮</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold text-xl mb-2">Profil recherché :</h3>
              <ul className="space-y-1 text-sm">
                <li>• Dev senior avec 10 ans d'XP sur React 19</li>
                <li>• Tu connais les design patterns ? C'est quoi ?</li>
                <li>• Git rebase interactif = sport extrême</li>
                <li>• Documentation allergique acceptée</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold text-xl mb-2">Avantages :</h3>
              <ul className="space-y-1 text-sm">
                <li>• Salaire en NFTs CTA (valeur variable)</li>
                <li>• Machine à café en panne depuis 2019</li>
                <li>• Baby-foot avec 3 joueurs sur 8</li>
                <li>• Crunch permanent = esprit de famille</li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold text-xl mb-2">Process de recrutement :</h3>
              <ul className="space-y-1 text-sm">
                <li>• 1 test technique de 48h non payé</li>
                <li>• 3 entretiens + 1 battle de push-ups</li>
                <li>• QI test + test de personnalité astrologique</li>
                <li>• Diplôme facultatif si tu viens des quartiers</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetail(false)}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Fermer l'annonce
          </button>
        </motion.div>
      </aside>
    )
  }
  
  return (
    <aside id="fake-ad-recruitment" className="max-w-[480px] mx-auto my-8">
      <motion.div 
        className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 rounded-lg p-6 cursor-pointer relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        onClick={() => setShowDetail(true)}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {['🎮', '💻', '🚀', '💀', '🔥'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${20 + i * 15}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                delay: i * 0.5
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10 text-white text-center">
          <motion.h3 
            className="text-3xl font-bold mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            REJOINS SOON STUDIO
          </motion.h3>
          
          <p className="text-xl mb-4 font-bold text-pink-300">
            On recrute des devs qui shipent dans le noir 🌙
          </p>
          
          <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-4">
            <p className="text-lg font-bold mb-2">Points bonus si :</p>
            <ul className="text-left space-y-1">
              <li>✅ Tu push en prod le vendredi soir</li>
              <li>✅ "Ça marche sur ma machine" = ta devise</li>
              <li>✅ Quartiers Nord = +50 points street cred</li>
              <li>✅ Tests ? On verra plus tard...</li>
            </ul>
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full inline-block"
          >
            POSTULER MAINTENANT
          </motion.div>
          
          <p className="text-xs mt-4 text-gray-300">
            *Stage non rémunéré avec possibilité d'embauche (peut-être)
          </p>
        </div>
      </motion.div>
    </aside>
  )
}

export function FakeAdPlaceholder({ type }: { type?: string }) {
  const ads = {
    windshield: WindshieldAcademy,
    landdrop: EternalLandDrop,
    penimaxi: Penimaxi,
    marabout: GrandMarabout,
    video: VideoEditingScam,
    elpatron: ElPatronVideo,
    recruitment: RecruitmentStudio
  }
  
  if (type && ads[type as keyof typeof ads]) {
    const Component = ads[type as keyof typeof ads]
    return <Component />
  }
  
  const adList = Object.values(ads)
  const RandomAd = adList[Math.floor(Math.random() * adList.length)]
  
  return <RandomAd />
}