import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wifi, Shield, Zap, Signal, CheckCircle2, Home } from "lucide-react"
import BackButton from "@/components/BackButton"
import { PageLayout } from "@/components/layout/PageLayout"

export default function InternetAccess() {
  return (
    <PageLayout>
      <div className="pt-24"> {/* Added padding top for fixed Navigation */}
        <BackButton to="/solutions" /> {/* Assuming this page is a sub-page of solutions */}

        <main className="pt-0"> {/* Removed pt-20, handled by outer div */}
          <section className="py-16 md:py-20 hero-gradient text-white"> {/* Adjusted padding */}
            <div className="container mx-auto px-4 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Accès Internet Professionnel
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Des solutions de connectivité fibre optique haute performance avec redondance 4G
              </motion.p>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full inline-block">
                      <Home className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-slate-800 dark:text-slate-100">Fibre FTTH</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                    Une connexion fibre optique jusqu'à votre entreprise pour des performances optimales.
                  </p>
                  <div className="space-y-3 text-slate-700 dark:text-slate-200">
                    <div className="flex items-center"><Zap className="h-5 w-5 text-blue-500 mr-3" /><span>Débits jusqu'à 2 Gb/s</span></div>
                    <div className="flex items-center"><Shield className="h-5 w-5 text-blue-500 mr-3" /><span>Installation professionnelle incluse</span></div>
                    <div className="flex items-center"><Signal className="h-5 w-5 text-blue-500 mr-3" /><span>Supervision et maintenance</span></div>
                    <div className="flex items-center"><CheckCircle2 className="h-5 w-5 text-blue-500 mr-3" /><span>Support technique prioritaire</span></div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="mb-6 flex justify-center">
                     <div className="p-4 bg-gradient-to-br from-green-500 to-lime-400 rounded-full inline-block">
                      <Wifi className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-slate-800 dark:text-slate-100">Fibre Optique Dédiée</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                    Une connexion ultra-rapide et symétrique pour votre entreprise.
                  </p>
                  <div className="space-y-3 text-slate-700 dark:text-slate-200">
                    <div className="flex items-center"><Zap className="h-5 w-5 text-green-500 mr-3" /><span>Débits garantis jusqu'à 1 Gb/s</span></div>
                    <div className="flex items-center"><Shield className="h-5 w-5 text-green-500 mr-3" /><span>Garantie de temps de rétablissement (GTR)</span></div>
                    <div className="flex items-center"><Signal className="h-5 w-5 text-green-500 mr-3" /><span>Supervision proactive 24/7</span></div>
                    <div className="flex items-center"><CheckCircle2 className="h-5 w-5 text-green-500 mr-3" /><span>Support technique dédié</span></div>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full inline-block">
                      <Signal className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-center text-slate-800 dark:text-slate-100">Redondance 4G</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                    Une solution de secours automatique pour une continuité de service garantie.
                  </p>
                  <div className="space-y-3 text-slate-700 dark:text-slate-200">
                    <div className="flex items-center"><CheckCircle2 className="h-5 w-5 text-purple-500 mr-3" /><span>Basculement automatique</span></div>
                    <div className="flex items-center"><Shield className="h-5 w-5 text-purple-500 mr-3" /><span>Continuité de service assurée</span></div>
                    <div className="flex items-center"><Zap className="h-5 w-5 text-purple-500 mr-3" /><span>Débit 4G optimal</span></div>
                    <div className="flex items-center"><Signal className="h-5 w-5 text-purple-500 mr-3" /><span>Multi-opérateurs</span></div>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Pourquoi choisir notre solution ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                    <Shield className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-200">Fiabilité maximale</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Double connexion pour une disponibilité optimale de vos services.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                    <Zap className="h-10 w-10 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-200">Performance garantie</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Débits symétriques et garantis pour tous vos usages.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                    <Signal className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-200">Support expert</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Accompagnement personnalisé et supervision 24/7.
                    </p>
                  </div>
                </div>
                 <Button 
                    onClick={() => window.location.href = "mailto:contact@mdoservices.fr?subject=Demande d'information Accès Internet"} 
                    className="mt-12 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg px-8 py-3 text-lg"
                  >
                    Contactez-nous pour un devis
                  </Button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  )
}