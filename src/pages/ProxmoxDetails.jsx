import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Server, Shield, Gauge, Check, Cloud } from "lucide-react"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { PageLayout } from "@/components/layout/PageLayout"

export default function ProxmoxDetails() {
  const handleContact = () => {
    window.location.href = "mailto:mathieu@mdoservices.fr?subject=Demande de contact MDO SERVICES - Proxmox"
  }

  return (
    <PageLayout>
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Proxmox</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Solution de virtualisation open source pour entreprise
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
                icon={<Server className="h-12 w-12 text-blue-600" />}
                title="Virtualisation Complète"
                description="Infrastructure virtualisée"
                features={[
                  "Virtualisation KVM",
                  "Conteneurs LXC",
                  "Haute disponibilité",
                  "Migration en direct"
                ]}
              />

              <SolutionCard
                icon={<Shield className="h-12 w-12 text-blue-600" />}
                title="Sécurité Intégrée"
                description="Protection avancée"
                features={[
                  "Pare-feu intégré",
                  "Authentification 2FA",
                  "Gestion des rôles",
                  "Sauvegardes sécurisées"
                ]}
              />

              <SolutionCard
                icon={<Gauge className="h-12 w-12 text-blue-600" />}
                title="Performance Optimale"
                description="Gestion des ressources"
                features={[
                  "Monitoring en temps réel",
                  "Allocation dynamique",
                  "Optimisation CPU/RAM",
                  "Stockage ZFS"
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
                  <h3 className="text-xl font-bold mb-4">Infrastructure Virtualisée</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Gestion centralisée des VM et conteneurs</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Clustering et haute disponibilité</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Migration à chaud des machines virtuelles</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Sauvegarde et restauration intégrées</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Administration Simplifiée</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Interface web intuitive</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>API REST complète</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Monitoring des ressources</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Support entreprise disponible</span>
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
              <h2 className="text-3xl font-bold mb-6">Virtualisez Votre Infrastructure</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une démonstration personnalisée de Proxmox
              </p>
              <Button onClick={handleContact} className="premium-button text-white">
                Demander un devis
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}