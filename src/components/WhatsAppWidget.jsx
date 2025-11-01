import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)

  // Numéro WhatsApp (0750743628 → +33750743628 format international)
  const phoneNumber = "33750743628"

  // Message pré-rempli
  const defaultMessage = "Bonjour, je souhaiterais obtenir des informations sur vos services."

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Bouton Principal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
        >
          {/* Badge de notification (pulse) */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          )}

          {/* Bouton */}
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 group-hover:shadow-green-500/50">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-7 w-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="whatsapp"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="h-7 w-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </motion.div>

      {/* Popup de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-80"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">MDO Services</h3>
                    <div className="flex items-center text-sm opacity-90">
                      <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
                      En ligne
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="p-6 bg-gradient-to-b from-slate-50 to-white">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-4">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    👋 Bonjour ! Comment pouvons-nous vous aider ?
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    Cliquez ci-dessous pour démarrer une conversation WhatsApp
                  </p>
                </div>

                {/* Bouton WhatsApp */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/50 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Démarrer la conversation</span>
                </button>

                {/* Info */}
                <p className="text-center text-xs text-slate-500 mt-4">
                  Réponse rapide • Support personnalisé
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay (ferme au clic en dehors) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30"
          />
        )}
      </AnimatePresence>
    </>
  )
}
