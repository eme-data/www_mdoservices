import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Smartphone, Users, Globe, Shield, CheckCircle, Zap, Wifi, BarChart, Lock, Settings, HeadphonesIcon, TrendingUp } from "lucide-react"
import { Helmet } from "react-helmet"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import BackButton from "@/components/BackButton"

export default function TelephonyMobile() {
  const features = [
    {
      icon: Users,
      title: "Gestion de Flotte",
      description: "Administrez l'ensemble de vos lignes mobiles depuis une interface centralisée unique.",
      color: "blue"
    },
    {
      icon: BarChart,
      title: "Suivi des Consommations",
      description: "Analysez et optimisez vos coûts avec des rapports détaillés en temps réel.",
      color: "purple"
    },
    {
      icon: Lock,
      title: "Sécurité Mobile (MDM)",
      description: "Protégez vos données avec une gestion des appareils mobiles professionnelle.",
      color: "red"
    },
    {
      icon: Globe,
      title: "Couverture Nationale",
      description: "Forfaits illimités avec la meilleure couverture réseau en France.",
      color: "green"
    },
    {
      icon: Settings,
      title: "Configurateur en Ligne",
      description: "Créez des forfaits sur mesure adaptés aux besoins de chaque collaborateur.",
      color: "orange"
    },
    {
      icon: HeadphonesIcon,
      title: "Support Dédié",
      description: "Une équipe à votre écoute pour tous vos besoins de téléphonie mobile.",
      color: "cyan"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Téléphonie Mobile"
  }

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Téléphonie Mobile Professionnelle - Forfaits & Gestion de Flotte | MDO Services</title>
        <meta
          name="description"
          content="Solutions de téléphonie mobile pour entreprises en Occitanie. Forfaits professionnels, gestion de flotte et MDM. Optimisez vos coûts et sécurisez vos données mobiles."
        />
        <meta
          name="keywords"
          content="téléphonie mobile, forfait pro, gestion flotte mobile, MDM, mobile entreprise, Toulouse, Occitanie, Ariège"
        />
        <link rel="canonical" href="https://mdoservices.fr/solutions-telecom/telephonie-mobile" />
      </Helmet>

      <div className="pt-24">
        <BackButton to="/solutions-telecom" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Téléphonie Mobile"
            title="Forfaits mobiles pro avec <span class='bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>gestion de flotte</span>"
            description="Offres téléphonie mobile adaptées aux besoins de votre entreprise. Gérez votre flotte, contrôlez vos coûts et sécurisez vos données avec nos solutions professionnelles."
            primaryCTA={{
              text: "Demander un Devis",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir nos Offres",
              link: "#offres"
            }}
            stats={[
              { value: "500+", label: "Lignes Gérées" },
              { value: "-30%", label: "Économies Moyennes" },
              { value: "99%", label: "Couverture France" },
              { value: "24/7", label: "Support Dédié" }
            ]}
          />

          {/* Offres Section */}
          <section id="offres" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nos Offres de Téléphonie Mobile
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Des forfaits professionnels adaptés à chaque usage et des outils de gestion performants
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Forfait Essentiel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Smartphone className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Forfait Essentiel</h3>
                    <p className="text-gray-600 mb-6">
                      Pour une utilisation mobile classique et économique.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Appels & SMS illimités en France",
                        "20 à 50 Go de data 4G/5G",
                        "Europe & DOM inclus",
                        "Sans engagement",
                        "Portabilité du numéro gratuite"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">À partir de</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">9,99€</div>
                          <div className="text-xs text-slate-500">/ligne/mois</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                </motion.div>

                {/* Forfait Business */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-purple-200 flex flex-col relative"
                >
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAIRE
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Forfait Business</h3>
                    <p className="text-gray-600 mb-6">
                      L'offre complète pour les professionnels mobiles.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Appels & SMS illimités France & International",
                        "100 à 200 Go de data 4G/5G",
                        "Europe, DOM, USA, Canada inclus",
                        "Roaming international premium",
                        "Hotspot mobile inclus",
                        "Support prioritaire 24/7"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">À partir de</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">24,99€</div>
                          <div className="text-xs text-slate-500">/ligne/mois</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </motion.div>

                {/* Gestion de Flotte */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Settings className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Gestion de Flotte</h3>
                    <p className="text-gray-600 mb-6">
                      Outils professionnels pour gérer l'ensemble de votre parc mobile.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Interface de gestion centralisée",
                        "Suivi des consommations en temps réel",
                        "Facturation détaillée par service",
                        "Gestion MDM (Mobile Device Management)",
                        "Alertes de dépassement personnalisables",
                        "API d'intégration disponible"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">Inclus dès</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">10 lignes</div>
                          <div className="text-xs text-slate-500">gratuit</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                      >
                        Demander une démo
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
                </motion.div>
              </div>

              {/* Avantages Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 max-w-6xl mx-auto"
              >
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-blue-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-800">
                    Pourquoi choisir nos forfaits mobiles professionnels ?
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: TrendingUp, title: "Économies garanties", desc: "Jusqu'à 30% d'économies vs forfaits grand public", color: "blue" },
                      { icon: Shield, title: "Sécurité renforcée", desc: "MDM et protection des données incluses", color: "purple" },
                      { icon: BarChart, title: "Contrôle total", desc: "Suivi et analyse des consommations en temps réel", color: "green" },
                      { icon: HeadphonesIcon, title: "Support dédié", desc: "Équipe dédiée disponible 24/7", color: "orange" }
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-slate-800">{item.title}</h4>
                        <p className="text-slate-600 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Tous les avantages de nos forfaits mobiles"
            subtitle="Des solutions professionnelles pour optimiser votre mobilité"
            features={features}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Optimisez votre téléphonie mobile"
            title="Demandez un audit gratuit de votre flotte mobile"
            description="Nos experts analysent vos besoins et vos consommations actuelles pour vous proposer les forfaits les plus adaptés et vous faire réaliser des économies."
            primaryCTA={{
              text: "Demander un Audit",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir toutes nos Solutions",
              link: "/solutions-telecom"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}
