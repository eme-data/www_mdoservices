import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Mail, Check, Users, Brain, Zap, Eye, ShieldCheck, AlertTriangle, Target } from "lucide-react"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import { Helmet } from "react-helmet"

export default function IronScalesDetails() {
  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - IronScales"
  }

  const ironscalesFeatures = [
    {
      icon: Brain,
      title: "Intelligence Artificielle",
      description: "IA et machine learning pour détecter les nouvelles menaces avant qu'elles n'atteignent vos utilisateurs.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Protection Anti-Phishing",
      description: "Défense multicouche contre phishing, spear-phishing et Business Email Compromise.",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Réponse Automatisée",
      description: "Quarantaine instantanée et suppression post-delivery des emails malveillants.",
      color: "green"
    },
    {
      icon: Users,
      title: "Formation Utilisateurs",
      description: "Simulations de phishing et sensibilisation continue pour votre équipe.",
      color: "orange"
    },
    {
      icon: Eye,
      title: "Visibilité Complète",
      description: "Tableaux de bord détaillés avec métriques et rapports de sécurité.",
      color: "red"
    },
    {
      icon: Target,
      title: "Détection Précise",
      description: "Analyse comportementale et reconnaissance des tentatives d'usurpation.",
      color: "yellow"
    }
  ]

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

        <main className="pt-0">
          <SolutionHeroTekup
            badge="IronScales"
            title="Protection anti-phishing <span class='bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>propulsée par IA</span>"
            description="Protégez votre organisation contre les attaques de phishing avancées avec l'intelligence artificielle d'IronScales. Détection, réponse automatisée et formation des utilisateurs."
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
              { value: "< 60s", label: "Temps de Réponse" },
              { value: "24/7", label: "Protection Active" },
              { value: "Auto", label: "Remediation" }
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Protection Email Intelligente
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Une sécurité email complète alimentée par l'IA pour bloquer toutes les attaques de phishing
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* IA & Machine Learning Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Brain className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Intelligence Artificielle</h3>
                    <p className="text-gray-600 mb-6">
                      Technologie d'IA qui apprend et s'améliore constamment pour détecter les nouvelles menaces.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Apprentissage automatique (ML)",
                        "Analyse comportementale avancée",
                        "Détection des anomalies",
                        "Amélioration continue",
                        "Reconnaissance des patterns",
                        "Adaptation temps réel"
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

                {/* Protection Anti-Phishing Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Défense Multicouche</h3>
                    <p className="text-gray-600 mb-6">
                      Protection complète contre toutes les formes d'attaques email ciblées.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Phishing & spear-phishing",
                        "Business Email Compromise (BEC)",
                        "Account takeover",
                        "Détection URL malveillantes",
                        "Analyse pièces jointes",
                        "Protection contre l'usurpation"
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

                {/* Réponse Automatisée Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Zap className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Réaction Instantanée</h3>
                    <p className="text-gray-600 mb-6">
                      Suppression automatique des menaces détectées sans intervention manuelle.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Quarantaine automatique",
                        "Suppression post-delivery",
                        "Remediation rapide",
                        "Alertes temps réel",
                        "Blocage instantané",
                        "Rapports automatisés"
                      ].map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                </motion.div>
              </div>

              {/* Highlight Section - Formation Utilisateurs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-20 max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-blue-200">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <div className="relative p-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-2xl">
                          <Users className="h-24 w-24 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full mb-4">
                        FORMATION & SENSIBILISATION
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">
                        Transformez Vos Utilisateurs en Première Ligne de Défense
                      </h3>
                      <p className="text-gray-700 mb-6 text-lg">
                        IronScales inclut des simulations de phishing et une formation continue pour sensibiliser vos équipes aux menaces réelles.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: Target, text: "Simulations réalistes", desc: "Campagnes de phishing" },
                          { icon: Users, text: "Formation interactive", desc: "Modules e-learning" },
                          { icon: Eye, text: "Métriques détaillées", desc: "Suivi de progression" },
                          { icon: ShieldCheck, text: "Sensibilisation continue", desc: "Amélioration permanente" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                            <item.icon className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
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
            title="Pourquoi choisir IronScales ?"
            subtitle="La protection anti-phishing la plus avancée du marché"
            features={ironscalesFeatures}
          />

          {/* Types d'Attaques Protégées */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Protection Contre Toutes les Menaces Email
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  IronScales détecte et bloque tous les types d'attaques par email
                </p>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {[
                  { name: "Phishing", desc: "Emails frauduleux", icon: Mail },
                  { name: "Spear-Phishing", desc: "Attaques ciblées", icon: Target },
                  { name: "BEC", desc: "Business Email Compromise", icon: AlertTriangle },
                  { name: "Account Takeover", desc: "Usurpation de compte", icon: Shield }
                ].map((threat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <threat.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-800">{threat.name}</h3>
                    <p className="text-sm text-slate-600">{threat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <CTASectionTekup
            badge="Protégez vos emails"
            title="Demandez une démonstration d'IronScales"
            description="Découvrez comment l'intelligence artificielle peut protéger votre organisation contre les attaques de phishing. Testez gratuitement IronScales avec nos experts."
            primaryCTA={{
              text: "Demander une Démo Gratuite",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir nos Solutions de Cybersécurité",
              link: "/cybersecurity"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}
