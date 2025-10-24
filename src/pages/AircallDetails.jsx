import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Video, MessageSquare, Users, Globe, Shield, Check, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { PageLayout } from "@/components/layout/PageLayout" // Importer PageLayout
import BackButton from "@/components/BackButton" // Importer BackButton

export default function AircallDetails() {
  const navigate = useNavigate()

  return (
    <PageLayout> {/* Utiliser PageLayout ici */}
      <div className="pt-24"> {/* Ajuster le padding pour la barre de navigation fixe */}
        <Helmet>
          <title>Aircall - Centre de Contact Cloud Nouvelle Génération | MDO SERVICES</title>
          <meta name="description" content="Découvrez Aircall, la solution de centre de contact cloud innovante. Gestion d'appels intelligente, intégrations CRM et analytics en temps réel. Expert Aircall en Occitanie." />
          <meta name="keywords" content="Aircall, centre d'appels, cloud, CRM, analytics, Toulouse, Occitanie" />
          <link rel="canonical" href="https://mdoservices.fr/solutions-telecom/aircall" />
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
                Aircall - Centre de Contact Cloud
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                La solution de téléphonie cloud conçue pour les équipes modernes
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
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Fonctionnalités Clés</h2>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Gestion d'appels intelligente: distribution, file d'attente, transferts.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Intégrations CRM natives avec vos outils préférés.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Analytics en temps réel: tableaux de bord et rapports détaillés.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Sécurité avancée avec chiffrement et conformité RGPD.</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Bénéfices pour votre entreprise</h2>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Productivité améliorée grâce à l'automatisation et aux workflows.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Expérience client optimisée par la personnalisation et le suivi.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Évolutivité pour adapter vos ressources à vos besoins.</span>
                      </li>
                       <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Collaboration facilitée entre vos équipes, où qu'elles soient.</span>
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
                    Prêt à transformer votre centre de contact avec Aircall ?
                  </p>
                  <Button size="lg" onClick={() => navigate("/contact")} className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Contactez-nous pour une démo
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