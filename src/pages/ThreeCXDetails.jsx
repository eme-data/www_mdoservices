import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Video, MessageSquare, Users, Globe, Shield, Check, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { PageLayout } from "@/components/layout/PageLayout" // Importer PageLayout
import BackButton from "@/components/BackButton" // Importer BackButton

export default function ThreeCXDetails() {
  const navigate = useNavigate()

  return (
    <PageLayout> {/* Utiliser PageLayout ici */}
      <div className="pt-24"> {/* Ajuster le padding pour la barre de navigation fixe */}
        <Helmet>
          <title>3CX - Solution de Téléphonie IP Professionnelle | MDO SERVICES</title>
          <meta name="description" content="Découvrez 3CX, la solution de téléphonie IP complète pour votre entreprise. Visioconférence HD, messagerie instantanée et gestion des appels avancée. Expert 3CX en Occitanie." />
          <meta name="keywords" content="3CX, téléphonie IP, visioconférence, communications unifiées, Toulouse, Occitanie" />
          <link rel="canonical" href="https://mdoservices.fr/solutions-telecom/3cx" />
        </Helmet>
        
        <BackButton to="/solutions-telecom" /> {/* Utiliser BackButton */}

        <main className="pt-0">
          <section className="py-16 md:py-20 hero-gradient text-white">
            <div className="container mx-auto px-4 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                3CX - Solution de Communication Unifiée
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Une plateforme complète pour gérer toutes vos communications d'entreprise
              </motion.p>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                  <motion.div 
                    className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Fonctionnalités Principales</h2>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Téléphonie IP: gestion avancée des appels, transferts, conférences.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Visioconférence HD avec partage d'écran et enregistrement.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Messagerie instantanée d'entreprise avec historique.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Solution web accessible depuis n'importe quel navigateur.</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Avantages Clés</h2>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Réduction significative des coûts de communication.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Flexibilité de déploiement: sur site ou dans le cloud.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Augmentation de la productivité et de la collaboration.</span>
                      </li>
                       <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Applications mobiles pour iOS et Android.</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-xl text-slate-700 dark:text-slate-200 mb-6">
                    Intéressé par la puissance et la flexibilité de 3CX ?
                  </p>
                  <Button size="lg" onClick={() => navigate("/contact")} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Discutons de votre projet 3CX
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  )
}