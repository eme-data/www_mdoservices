import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, AlertCircle, Check, Activity, Brain, Lock, Zap, Eye, Server, ShieldCheck, ShieldAlert, Radio } from "lucide-react"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function SentinelOneDetails() {
  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Sentinel One"
  }

  const sentinelFeatures = [
    {
      icon: Brain,
      title: "IA Autonome",
      description: "Intelligence artificielle qui détecte et neutralise automatiquement les menaces sans intervention humaine.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Protection Endpoint",
      description: "Sécurité avancée pour tous vos postes de travail, serveurs et appareils mobiles.",
      color: "purple"
    },
    {
      icon: Activity,
      title: "EDR & XDR",
      description: "Détection et réponse étendue avec visibilité complète sur toutes les menaces.",
      color: "green"
    },
    {
      icon: Zap,
      title: "Réponse Automatique",
      description: "Remédiation instantanée des menaces sans impact sur la productivité.",
      color: "orange"
    },
    {
      icon: Eye,
      title: "Visibilité Totale",
      description: "Console centralisée avec analyse comportementale et forensique complète.",
      color: "red"
    },
    {
      icon: ShieldCheck,
      title: "Protection Ransomware",
      description: "Blocage automatique des ransomwares avec restauration instantanée des fichiers.",
      color: "yellow"
    }
  ]

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/cybersecurite" />

        <main className="pt-0">
          <SolutionHeroTekup
            badge="SentinelOne"
            title="Protection endpoint <span class='bg-gradient-to-r from-red-400 to-purple-600 bg-clip-text text-transparent'>nouvelle génération</span>"
            description="Sécurisez tous vos endpoints avec l'intelligence artificielle de SentinelOne. Détection, prévention et réponse automatique contre toutes les cybermenaces."
            primaryCTA={{
              text: "Demander une Démo",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir les Fonctionnalités",
              link: "#fonctionnalites"
            }}
            stats={[
              { value: "99.9%", label: "Taux de Détection" },
              { value: "< 1s", label: "Temps de Réponse" },
              { value: "0", label: "Faux Positifs" },
              { value: "24/7", label: "Protection Active" }
            ]}
          />

          {/* Fonctionnalités Section */}
          <section id="fonctionnalites" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  Protection Endpoint Autonome
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Une sécurité endpoint complète alimentée par l'IA pour arrêter toutes les menaces
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* IA Autonome Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Brain className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">IA Autonome</h3>
                    <p className="text-gray-600 mb-6">
                      Intelligence artificielle qui apprend et s'adapte continuellement aux nouvelles menaces.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Détection comportementale avancée",
                        "Apprentissage automatique (ML)",
                        "Analyse prédictive des menaces",
                        "Zéro dépendance aux signatures",
                        "Réponse automatisée instantanée",
                        "Protection sans connexion cloud"
                      ].map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                </motion.div>

                {/* Protection Complète Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Protection Multicouche</h3>
                    <p className="text-gray-600 mb-6">
                      Défense en profondeur contre toutes les cybermenaces modernes.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Anti-ransomware avec rollback",
                        "Prévention des exploits zero-day",
                        "Contrôle des applications",
                        "Protection de la mémoire (kernel)",
                        "Blocage des attaques fileless",
                        "Détection des scripts malveillants"
                      ].map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
                </motion.div>

                {/* EDR/XDR Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Activity className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">EDR & XDR</h3>
                    <p className="text-gray-600 mb-6">
                      Détection et réponse étendue avec visibilité complète.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Visibilité complète des endpoints",
                        "Hunting de menaces avancé",
                        "Analyse forensique approfondie",
                        "Corrélation multi-sources (XDR)",
                        "Timeline complète des attaques",
                        "Rapports détaillés et alertes"
                      ].map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                </motion.div>
              </div>

              {/* Highlight Section - Protection Ransomware */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-20 max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-3xl p-8 md:p-12 border border-red-200">
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
                        PROTECTION RANSOMWARE
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">
                        Bloquez 100% des Ransomwares
                      </h3>
                      <p className="text-gray-700 mb-6 text-lg">
                        SentinelOne arrête les ransomwares avant qu'ils ne chiffrent vos données et restaure automatiquement les fichiers affectés.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: ShieldCheck, text: "Détection instantanée", desc: "IA comportementale" },
                          { icon: Zap, text: "Blocage automatique", desc: "Zéro intervention" },
                          { icon: Radio, text: "Restauration rapide", desc: "Rollback automatique" },
                          { icon: Lock, text: "Protection continue", desc: "24/7 sans cloud" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                            <item.icon className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-semibold text-slate-800">{item.text}</h4>
                              <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <FeaturesSectionTekup
            title="Pourquoi choisir SentinelOne ?"
            subtitle="La protection endpoint la plus avancée du marché"
            features={sentinelFeatures}
          />

          {/* Plateformes Supportées */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                  Compatibilité Universelle
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Protection pour tous vos endpoints, quelle que soit la plateforme
                </p>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { name: "Windows", desc: "7, 8, 10, 11, Server" },
                  { name: "macOS", desc: "10.13 et supérieur" },
                  { name: "Linux", desc: "Toutes distributions" },
                  { name: "Mobile", desc: "iOS & Android" }
                ].map((platform, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 text-center border border-slate-200"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Server className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{platform.name}</h3>
                    <p className="text-sm text-slate-600">{platform.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <CTASectionTekup
            badge="Protégez vos endpoints"
            title="Demandez une démonstration de SentinelOne"
            description="Testez gratuitement SentinelOne pendant 30 jours sur vos endpoints. Nos experts vous accompagnent dans le déploiement et la configuration."
            primaryCTA={{
              text: "Demander une Démo Gratuite",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir nos Solutions de Cybersécurité",
              link: "/cybersecurite"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}
