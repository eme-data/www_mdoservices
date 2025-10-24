import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Video, MessageSquare, Users, Globe, Shield, ArrowLeft, PhoneForwarded, Headphones as Headset, Code, Share2 } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/components/layout/PageLayout"

export default function TelecomSolutions() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <div className="pt-24"> {/* Adjusted padding top to account for fixed Navigation */}
        <Button 
          onClick={() => navigate("/solutions")} 
          className="absolute top-28 left-4 z-10" /* Adjusted top for Nav */
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux Solutions
        </Button>

        <main className="pt-0">
          <section className="hero-gradient text-white py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Solutions Télécom
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Des solutions de communication professionnelles adaptées à vos besoins
              </motion.p>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* 3CX Section */}
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-2xl dark:hover:shadow-blue-500/30 transition-shadow duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-4 shadow-md">
                      <PhoneForwarded size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200">3CX</h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                    Solution de téléphonie professionnelle complète, hébergée dans le cloud ou sur site.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                      <span className="text-slate-700 dark:text-slate-300">Téléphonie IP professionnelle</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                      <span className="text-slate-700 dark:text-slate-300">Visioconférence HD intégrée</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3" />
                      <span className="text-slate-700 dark:text-slate-300">Messagerie instantanée</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto"
                    onClick={() => navigate("/solutions-telecom/3cx")}
                  >
                    En savoir plus sur 3CX
                  </Button>
                </motion.div>

                {/* Wazo Section */}
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-2xl dark:hover:shadow-green-500/30 transition-shadow duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                   <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-teal-400 text-white mr-4 shadow-md">
                      <Share2 size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-200">Wazo</h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                    Plateforme de communication unifiée open-source et programmable.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center">
                      <Code className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
                      <span className="text-slate-700 dark:text-slate-300">Approche API-first pour l'intégration</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
                      <span className="text-slate-700 dark:text-slate-300">Contrôle et souveraineté des données</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-green-500 dark:text-green-400 mr-3" />
                      <span className="text-slate-700 dark:text-slate-300">Flexibilité et personnalisation</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto"
                    onClick={() => navigate("/solutions-telecom/wazo")}
                  >
                    En savoir plus sur Wazo
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