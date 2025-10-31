import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Monitor, Settings, Activity, Check, BarChart, Zap } from "lucide-react"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"

export default function NinjaRMMDetails() {
  const handleContact = () => {
    window.location.href = "mailto:mathieu@mdoservices.fr?subject=Demande de contact MDO SERVICES - NinjaRMM"
  }

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />
        
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">NinjaRMM</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Solution de gestion et supervision à distance nouvelle génération
              </p>
              <Button onClick={handleContact} className="premium-button text-white">
                Demander un devis
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <SolutionCard
                icon={<Monitor className="h-12 w-12 text-blue-600" />}
                title="Supervision Avancée"
                description="Surveillance complète de votre parc"
                features={[
                  "Monitoring en temps réel",
                  "Alertes personnalisées",
                  "Tableaux de bord intuitifs",
                  "Rapports détaillés"
                ]}
              />

              <SolutionCard
                icon={<Settings className="h-12 w-12 text-blue-600" />}
                title="Gestion Centralisée"
                description="Administration simplifiée"
                features={[
                  "Déploiement automatisé",
                  "Gestion des correctifs",
                  "Inventaire automatique",
                  "Scripts automatisés"
                ]}
              />

              <SolutionCard
                icon={<Activity className="h-12 w-12 text-blue-600" />}
                title="Support Proactif"
                description="Intervention rapide et efficace"
                features={[
                  "Accès à distance",
                  "Résolution automatique",
                  "Maintenance préventive",
                  "Support 24/7"
                ]}
              />
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités Principales</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Supervision Complète</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Monitoring serveurs et postes de travail</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Surveillance réseau et applications</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Gestion des sauvegardes</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Antivirus intégré</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Automatisation</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Scripts et tâches automatisées</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Gestion des mises à jour Windows</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Déploiement de logiciels</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Maintenance programmée</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Optimisez votre IT</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une démonstration personnalisée de NinjaRMM
              </p>
              <Button onClick={handleContact} className="premium-button text-white">
                Demander un devis
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </TekupPageLayout>
  )
}