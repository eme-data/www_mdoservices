import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Mail, Check, Users } from "lucide-react"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { PageLayout } from "@/components/layout/PageLayout"

export default function MailInBlackDetails() {
  const handleContact = () => {
    window.location.href = "mailto:mathieu@mdoservices.fr?subject=Demande de contact MDO SERVICES - MailInBlack"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">MailInBlack</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Protection email avancée avec intelligence artificielle
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
                title="Protection Anti-Spam"
                description="Filtrage intelligent des emails indésirables"
                features={[
                  "Intelligence artificielle",
                  "Apprentissage continu",
                  "Mise à jour en temps réel",
                  "Taux de détection > 99.9%"
                ]}
              />

              <SolutionCard
                icon={<Mail className="h-12 w-12 text-blue-600" />}
                title="Sécurité Email"
                description="Protection contre les menaces avancées"
                features={[
                  "Anti-phishing",
                  "Anti-malware",
                  "Protection ransomware",
                  "Analyse des pièces jointes"
                ]}
              />

              <SolutionCard
                icon={<Users className="h-12 w-12 text-blue-600" />}
                title="Gestion Simplifiée"
                description="Administration centralisée intuitive"
                features={[
                  "Console d'administration",
                  "Rapports détaillés",
                  "Configuration facile",
                  "Support dédié"
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
                  <h3 className="text-xl font-bold mb-4">Protection Avancée</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Détection des menaces en temps réel</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Protection contre le phishing ciblé</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Analyse comportementale</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Filtrage des pièces jointes</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Gestion et Rapports</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Interface d'administration intuitive</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Rapports de sécurité détaillés</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Tableaux de bord personnalisables</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Alertes en temps réel</span>
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
              <h2 className="text-3xl font-bold mb-6">Protégez Vos Emails Professionnels</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une démonstration personnalisée de MailInBlack
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