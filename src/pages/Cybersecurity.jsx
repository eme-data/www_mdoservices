import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Lock, AlertTriangle, FileCheck, Eye, Server, ChevronRight, ShieldAlert, Clock, Network, Radar, ShieldCheck } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function Cybersecurity() {
  const navigate = useNavigate()

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Cybersécurité"
  }

  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "Protection Multicouche",
      description: "Sécurité endpoint, réseau et cloud pour une défense complète contre toutes les menaces.",
      color: "blue"
    },
    {
      icon: Radar,
      title: "Détection Proactive",
      description: "Surveillance 24/7 avec intelligence artificielle pour anticiper les cyberattaques.",
      color: "purple"
    },
    {
      icon: Network,
      title: "SOC Expert",
      description: "Centre opérationnel de sécurité avec analyse approfondie et réponse rapide aux incidents.",
      color: "red"
    },
    {
      icon: FileCheck,
      title: "Conformité RGPD",
      description: "Respect des normes et réglementations pour protéger vos données sensibles.",
      color: "green"
    },
    {
      icon: Lock,
      title: "Chiffrement Avancé",
      description: "Protection des données au repos et en transit avec les dernières technologies de chiffrement.",
      color: "orange"
    },
    {
      icon: AlertTriangle,
      title: "Réponse aux Incidents",
      description: "Équipe dédiée disponible en permanence pour intervenir rapidement en cas d'alerte.",
      color: "yellow"
    }
  ]

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section with Stats */}
          <SolutionHeroTekup
            badge="Cybersécurité Avancée"
            title="Protection complète de votre <span class='bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent'>infrastructure numérique</span>"
            description="Sécurisez votre entreprise avec nos solutions de cybersécurité de pointe : protection endpoint, supervision SOC 24/7, et conformité RGPD garantie."
            primaryCTA={{
              text: "Demander un Audit Sécurité",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Découvrir nos Solutions",
              link: "#solutions"
            }}
            stats={[
              { value: "50+", label: "Entreprises Protégées" },
              { value: "24/7", label: "Surveillance SOC" },
              { value: "< 2h", label: "Temps de Réponse" },
              { value: "99.9%", label: "Protection Garantie" }
            ]}
          />

          {/* Solutions Section */}
          <section id="solutions" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nos Solutions de Cybersécurité
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Une protection complète et adaptée à vos besoins, de l'endpoint au cloud
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Protection Endpoint Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Protection Endpoint</h3>
                    <p className="text-gray-600 mb-6">
                      Sécurité avancée pour tous vos postes de travail avec détection intelligente.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Antivirus nouvelle génération avec IA",
                        "Protection anti-ransomware en temps réel",
                        "Détection des menaces avancées (EDR)",
                        "Contrôle applicatif et isolation"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <ShieldCheck className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                </motion.div>

                {/* Sécurité Réseau Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Server className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Sécurité Réseau</h3>
                    <p className="text-gray-600 mb-6">
                      Protection périmétrique et surveillance continue du trafic réseau.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Pare-feu nouvelle génération (NGFW)",
                        "Détection et prévention d'intrusion (IDS/IPS)",
                        "Filtrage de contenu et antivirus réseau",
                        "VPN sécurisé pour accès distant"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <ShieldCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                </motion.div>

                {/* Protection Données Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Protection des Données</h3>
                    <p className="text-gray-600 mb-6">
                      Sécurisation et chiffrement de vos données sensibles et critiques.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Chiffrement des données (AES-256)",
                        "Sauvegarde sécurisée automatique",
                        "Gestion des accès et identités (IAM)",
                        "Protection DLP anti-fuite de données"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <ShieldCheck className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-4">

              {/* SOC Section - Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-red-100"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                      <div className="relative p-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-2xl">
                        <ShieldAlert className="h-24 w-24 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <div className="inline-block px-4 py-1 bg-red-500 text-white text-sm font-semibold rounded-full mb-4">
                      SOC 24/7
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                      Centre Opérationnel de Sécurité
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      Notre SOC surveille votre infrastructure 24h/24 et 7j/7 pour détecter, analyser et neutraliser les menaces en temps réel.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Clock className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">Surveillance Continue</h4>
                          <p className="text-sm text-gray-600">Détection proactive 24/7</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">Réponse Rapide</h4>
                          <p className="text-sm text-gray-600">Intervention en moins de 2h</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Eye className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">Analyse Approfondie</h4>
                          <p className="text-sm text-gray-600">Investigation complète</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Shield className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">Expertise Dédiée</h4>
                          <p className="text-sm text-gray-600">Équipe certifiée ANSSI</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section - Notre Approche */}
          <FeaturesSectionTekup
            title="Notre Approche Sécurité en 4 Piliers"
            subtitle="Une méthodologie éprouvée pour protéger efficacement votre entreprise"
            features={securityFeatures}
          />

          {/* Services Complémentaires */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Services Complémentaires
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Renforcez votre posture de sécurité avec nos services d'accompagnement
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">Audit de Sécurité</h3>
                  <p className="text-gray-700 mb-6">Évaluation complète de votre infrastructure pour identifier les vulnérabilités.</p>
                  <ul className="space-y-3">
                    {["Tests d'intrusion (pentesting)", "Analyse des vulnérabilités", "Évaluation de la conformité RGPD", "Recommandations détaillées et plan d'action"].map((feat, i) => (
                      <li key={i} className="flex items-start">
                        <ShieldCheck className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">Formation & Sensibilisation</h3>
                  <p className="text-gray-700 mb-6">Formez vos équipes aux bonnes pratiques de cybersécurité.</p>
                  <ul className="space-y-3">
                    {["Formations personnalisées en sécurité", "Campagnes de phishing simulé", "Bonnes pratiques RGPD", "Documentation et guides de sécurité"].map((feat, i) => (
                      <li key={i} className="flex items-start">
                        <ShieldCheck className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <CTASectionTekup
            badge="Sécurisez votre entreprise"
            title="Demandez votre audit de sécurité gratuit"
            description="Nos experts analysent votre infrastructure et vous proposent un plan d'action personnalisé pour renforcer votre cybersécurité."
            primaryCTA={{
              text: "Demander un Audit Gratuit",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Découvrir nos Solutions",
              link: "/solutions"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}