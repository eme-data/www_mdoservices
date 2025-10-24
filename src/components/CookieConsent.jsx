import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShow(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "cookie_consent_all"
    })
    setShow(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "cookie_consent_essential"
    })
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Politique de cookies</h3>
                <p className="text-sm text-gray-600">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre site. Les cookies nous permettent d'analyser notre trafic et de personnaliser le contenu et les publicités.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={acceptEssential}
                  className="whitespace-nowrap"
                >
                  Cookies essentiels uniquement
                </Button>
                <Button
                  onClick={acceptAll}
                  className="whitespace-nowrap premium-button"
                >
                  Accepter tout
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}