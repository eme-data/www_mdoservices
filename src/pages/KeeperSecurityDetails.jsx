import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Lock, Check, Users, Key } from "lucide-react"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"

export default function KeeperSecurityDetails() {
  const handleContact = () => {
    window.location.href = "mailto:mathieu@mdoservices.fr?subject=Demande de contact MDO SERVICES - Keeper Security"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Keeper Security</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Solution de gestion des mots de passe et de cybersécurité de niveau entreprise
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
                icon={<Shield className="h-12 w-12 text-blue-600" />}
                title="Sécurité Zero-Trust"
                description="Protection de niveau militaire"
                features={[
                  "Chiffrement AES-256 bits",
                  "Architecture Zero-Knowledge",
                  "MFA avancée",
                  "Conformité SOC 2 et ISO 27001"
                ]}
              />

              <SolutionCard
                icon={<Users className="h-12 w-12 text-blue-600" />}
                title="Gestion d'Entreprise"
                description="Administration centralisée"
                features={[
                  "Contrôle d'accès granulaire",
                  "Intégration SSO",
                  "Gestion des rôles",
                  "Politiques de sécurité"
                ]}
              />

              <SolutionCard
                icon={<Key className="h-12 w-12 text-blue-600" />}
                title="Fonctionnalités Avancées"
                description="Suite complète de sécurité"
                features={[
                  "Surveillance du Dark Web",
                  "Coffre-fort numérique",
                  "Rapports de conformité",
                  "BreachWatch"
                ]}
              />
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Caractéristiques Principales</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Sécurité Enterprise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Chiffrement de bout en bout</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Protection contre les cybermenaces</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Gestion des secrets privilégiés</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Audit et conformité avancés</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Administration Centralisée</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Console d'administration unifiée</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Déploiement et provisioning automatisés</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Intégration Active Directory/LDAP</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Support entreprise 24/7</span>
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
              <h2 className="text-3xl font-bold mb-6">Sécurisez Votre Entreprise avec Keeper</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une démonstration personnalisée de Keeper Security
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