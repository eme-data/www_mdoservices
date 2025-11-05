import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Ticket, ArrowRight, Lock, CheckCircle } from "lucide-react"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"

export default function Support() {
  const navigate = useNavigate()

  // Vérifier si l'utilisateur est connecté et le rediriger automatiquement
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("client-authenticated")
    if (isAuthenticated === "true") {
      navigate("/client/tickets")
    }
  }, [navigate])

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <main>
          <section className="hero-gradient text-white py-16 md:py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <Ticket className="h-16 w-16 mx-auto mb-6 text-blue-200" />
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Client</h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                  Notre système de tickets de support est désormais intégré à votre espace client
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8 text-center">
                <Lock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  Connectez-vous pour ouvrir un ticket
                </h2>
                <p className="text-gray-600 mb-6">
                  Pour créer une demande de support, veuillez vous connecter à votre espace client.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Suivi en temps réel de vos tickets</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Historique complet de vos échanges</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Notifications par email</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-700">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Réponse rapide de notre équipe</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/client")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Se connecter à l'espace client
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </TekupPageLayout>
  )
}