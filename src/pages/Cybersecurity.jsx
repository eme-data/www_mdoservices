import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Lock, AlertTriangle, FileCheck, Eye, Server, ChevronRight, ShieldAlert, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"

export default function Cybersecurity() {
  const navigate = useNavigate()

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Cybersécurité"
  }

  return (
    <TekupPageLayout>
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
                Cybersécurité Avancée
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Protection complète et proactive de votre infrastructure numérique
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button onClick={handleContact} className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg px-8 py-3 text-lg">
                  Sécurisez votre entreprise
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SolutionCard
                  icon={<Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />}
                  title="Protection Endpoint"
                  description="Sécurité avancée pour tous vos postes de travail."
                  features={[
                    "Antivirus nouvelle génération",
                    "Protection contre les ransomwares",
                    "Détection des menaces avancées",
                    "Contrôle des applications"
                  ]}
                  className="bg-white dark:bg-slate-800 hover:shadow-blue-500/20"
                />
                
                <SolutionCard
                  icon={<Server className="h-10 w-10 text-green-600 dark:text-green-400" />}
                  title="Sécurité Réseau"
                  description="Protection périmétrique et surveillance du trafic."
                  features={[
                    "Pare-feu nouvelle génération",
                    "Détection d'intrusion (IDS/IPS)",
                    "Filtrage de contenu",
                    "VPN sécurisé"
                  ]}
                  className="bg-white dark:bg-slate-800 hover:shadow-green-500/20"
                />

                <SolutionCard
                  icon={<Lock className="h-10 w-10 text-purple-600 dark:text-purple-400" />}
                  title="Protection des Données"
                  description="Sécurisation et chiffrement de vos données sensibles."
                  features={[
                    "Chiffrement des données",
                    "Sauvegarde sécurisée",
                    "Gestion des accès",
                    "Protection DLP (Data Loss Prevention)"
                  ]}
                  className="bg-white dark:bg-slate-800 hover:shadow-purple-500/20"
                />
              </div>

              {/* SOC Section */}
              <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center">
                  <motion.div 
                    className="md:w-1/3 mb-8 md:mb-0 md:mr-12 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full inline-block shadow-lg">
                      <ShieldAlert className="h-20 w-20 text-white" />
                    </div>
                  </motion.div>
                  <motion.div 
                    className="md:w-2/3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">
                      Notre SOC : Surveillance 24/7 pour une Tranquillité d'Esprit Totale
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                      Notre Centre des Opérations de Sécurité (SOC) est votre première ligne de défense, opérant 24 heures sur 24, 7 jours sur 7, pour protéger activement votre entreprise contre les cybermenaces.
                    </p>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-200">
                      <li className="flex items-center">
                        <Clock className="h-6 w-6 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
                        <span>Surveillance continue et détection proactive des menaces.</span>
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
                        <span>Réponse rapide et coordonnée aux incidents de sécurité.</span>
                      </li>
                      <li className="flex items-center">
                        <Eye className="h-6 w-6 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
                        <span>Analyse approfondie des alertes et investigations.</span>
                      </li>
                       <li className="flex items-center">
                        <Shield className="h-6 w-6 text-red-500 dark:text-red-400 mr-3 flex-shrink-0" />
                        <span>Expertise dédiée pour une protection optimale de vos actifs numériques.</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>


              <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100">Notre Approche Sécurité</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { icon: AlertTriangle, title: "Prévention", text: "Identification proactive des vulnérabilités et mise en place de mesures préventives.", color: "text-red-500 dark:text-red-400" },
                    { icon: Eye, title: "Détection", text: "Surveillance continue et détection en temps réel des menaces potentielles.", color: "text-yellow-500 dark:text-yellow-400" },
                    { icon: Shield, title: "Protection", text: "Mise en place de solutions de protection multicouches adaptées.", color: "text-blue-500 dark:text-blue-400" },
                    { icon: FileCheck, title: "Conformité", text: "Respect des normes et réglementations en vigueur (RGPD, etc.).", color: "text-green-500 dark:text-green-400" }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.title}
                      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg text-center hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <item.icon className={`h-10 w-10 ${item.color} mx-auto mb-4`} />
                      <h3 className="text-xl font-semibold mb-2 text-slate-700 dark:text-slate-200">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{item.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-slate-100">Services Complémentaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Audit de Sécurité</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {[ "Tests d'intrusion", "Analyse des vulnérabilités", "Évaluation de la conformité", "Recommandations détaillées" ].map(feat => (
                        <li key={feat} className="flex items-center"><Shield className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0" /><span>{feat}</span></li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Formation et Sensibilisation</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {[ "Formations sur la sécurité", "Simulations de phishing", "Bonnes pratiques RGPD", "Guides et documentation" ].map(feat => (
                        <li key={feat} className="flex items-center"><Shield className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" /><span>{feat}</span></li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                className="mt-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">Prêt à Sécuriser Votre Entreprise ?</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Contactez-nous pour une évaluation personnalisée de vos besoins en sécurité.
                </p>
                <Button onClick={handleContact} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg px-8 py-3 text-lg">
                  Demander un audit
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </TekupPageLayout>
  )
}