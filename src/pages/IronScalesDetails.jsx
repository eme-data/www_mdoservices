import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Shield, Mail, Check, Users, Brain, Zap, Eye } from "lucide-react"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { Helmet } from "react-helmet"

export default function IronScalesDetails() {
  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - IronScales"
  }

  return (
    <TekupPageLayout>
      <Helmet>
        <title>IronScales - Protection Anti-Phishing par IA | MDO Services</title>
        <meta
          name="description"
          content="IronScales : solution de cybersécurité email propulsée par intelligence artificielle. Détection et réponse automatisée aux attaques de phishing avancées."
        />
        <meta
          name="keywords"
          content="IronScales, anti-phishing, cybersécurité email, intelligence artificielle, protection email, Toulouse, Occitanie"
        />
        <link rel="canonical" href="https://mdoservices.fr/solutions/ironscales" />
      </Helmet>

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">IronScales</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Protection anti-phishing propulsée par intelligence artificielle et machine learning
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
                icon={<Brain className="h-12 w-12 text-blue-600" />}
                title="Intelligence Artificielle"
                description="Détection propulsée par IA et machine learning"
                features={[
                  "Apprentissage automatique",
                  "Analyse comportementale",
                  "Détection des anomalies",
                  "Amélioration continue"
                ]}
              />

              <SolutionCard
                icon={<Shield className="h-12 w-12 text-blue-600" />}
                title="Protection Anti-Phishing"
                description="Défense multicouche contre les attaques ciblées"
                features={[
                  "Phishing & spear-phishing",
                  "Business Email Compromise",
                  "Account takeover",
                  "Protection 24/7"
                ]}
              />

              <SolutionCard
                icon={<Zap className="h-12 w-12 text-blue-600" />}
                title="Réponse Automatisée"
                description="Réaction instantanée aux menaces détectées"
                features={[
                  "Quarantaine automatique",
                  "Suppression post-delivery",
                  "Alertes temps réel",
                  "Remediation rapide"
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
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Eye className="h-6 w-6 text-blue-600 mr-2" />
                    Détection Avancée
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Analyse en temps réel des emails entrants</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Détection des URL et domaines malveillants</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Analyse des pièces jointes suspectes</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Reconnaissance des tentatives d'usurpation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Protection contre le spear-phishing</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Users className="h-6 w-6 text-blue-600 mr-2" />
                    Formation & Sensibilisation
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Simulation d'attaques de phishing</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Formation interactive des utilisateurs</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Tableaux de bord et métriques</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Rapports de sécurité détaillés</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Sensibilisation continue des équipes</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Avantages IronScales */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Choisir IronScales ?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-lg"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">IA de Pointe</h3>
                  <p className="text-gray-700">
                    Technologie d'intelligence artificielle qui apprend et s'améliore constamment pour détecter les nouvelles menaces avant qu'elles n'atteignent vos utilisateurs.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg"
                >
                  <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Réponse Instantanée</h3>
                  <p className="text-gray-700">
                    Suppression automatique des emails malveillants déjà délivrés (post-delivery remediation) et quarantaine en temps réel des menaces détectées.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-lg"
                >
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Équipe Protégée</h3>
                  <p className="text-gray-700">
                    Transformez vos utilisateurs en première ligne de défense avec des simulations de phishing et une formation continue adaptée aux menaces réelles.
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Protégez Votre Organisation du Phishing</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une démonstration personnalisée d'IronScales et découvrez comment l'IA peut protéger vos emails professionnels
              </p>
              <Button onClick={handleContact} className="premium-button text-white">
                Demander une démo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </TekupPageLayout>
  )
}
