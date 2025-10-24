import React, { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function TelegramWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = "33666030361" // Numéro de téléphone WhatsApp Business
  const message = encodeURIComponent("Bonjour, je vous contacte depuis votre site web concernant vos services.") // Message pré-rempli

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-xl">
              <div className="bg-green-500 -m-6 p-6 rounded-t-lg">
                <h2 className="text-xl font-semibold text-white mb-2">Discutez avec nous</h2>
                <p className="text-green-50">
                  Notre équipe est là pour vous aider. Commencez une conversation !
                </p>
              </div>
              
              <div className="mt-6">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-6"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Démarrer une conversation WhatsApp
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  Temps de réponse moyen : &lt; 5 minutes
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </AnimatePresence>
    </>
  )
}