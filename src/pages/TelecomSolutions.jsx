import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Video, MessageSquare, Users, Globe, Shield, PhoneForwarded, Headphones as Headset, Code, Share2, CheckCircle, Zap, Cloud } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import BackButton from "@/components/BackButton"

export default function TelecomSolutions() {
  const navigate = useNavigate()

  const telecomFeatures = [
    {
      icon: Phone,
      title: "Téléphonie Cloud",
      description: "Solutions de téléphonie IP hébergées dans le cloud pour une flexibilité maximale.",
      color: "blue"
    },
    {
      icon: Video,
      title: "Visioconférence HD",
      description: "Réunions virtuelles en haute définition intégrées à votre système de téléphonie.",
      color: "purple"
    },
    {
      icon: MessageSquare,
      title: "Messagerie Unifiée",
      description: "Chat, SMS et messagerie vocale centralisés dans une seule interface.",
      color: "green"
    },
    {
      icon: Users,
      title: "Collaboration d'Équipe",
      description: "Outils collaboratifs pour améliorer la communication interne de vos équipes.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Chiffrement des communications et conformité aux normes de sécurité.",
      color: "red"
    },
    {
      icon: Zap,
      title: "Déploiement Rapide",
      description: "Installation et configuration en quelques jours avec formation incluse.",
      color: "yellow"
    }
  ]

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Solutions Télécom"
            title="Communication professionnelle <span class='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>nouvelle génération</span>"
            description="Modernisez votre système de téléphonie avec nos solutions cloud : 3CX et Wazo. Téléphonie IP, visioconférence, et messagerie unifiée pour booster la productivité de vos équipes."
            primaryCTA={{
              text: "Demander une Démo",
              link: "/contact"
            }}
            secondaryCTA={{
              text: "Comparer les Solutions",
              link: "#solutions"
            }}
            stats={[
              { value: "100+", label: "Lignes Déployées" },
              { value: "99.9%", label: "Disponibilité" },
              { value: "< 1j", label: "Installation" },
              { value: "24/7", label: "Support Technique" }
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nos Solutions de Téléphonie Cloud
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Deux solutions professionnelles adaptées à vos besoins : 3CX pour la simplicité, Wazo pour la personnalisation
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* 3CX Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <PhoneForwarded className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">Solution Pro</div>
                        <div className="text-2xl font-bold">3CX</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Téléphonie Simplifiée</h3>
                    <p className="text-blue-100">
                      Solution complète, facile à déployer et à gérer pour les PME et ETI.
                    </p>
                  </div>

                  <div className="p-8">
                    <div className="mb-8">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        Fonctionnalités Principales
                      </h4>
                      <ul className="space-y-3">
                        {[
                          { icon: Phone, text: "Standard téléphonique IP complet" },
                          { icon: Video, text: "Visioconférence HD illimitée" },
                          { icon: MessageSquare, text: "Chat et présence en temps réel" },
                          { icon: Cloud, text: "Cloud ou on-premise au choix" },
                          { icon: Headset, text: "Centre d'appels intégré" },
                          { icon: Globe, text: "Applications mobile et web" }
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <item.icon className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => navigate("/solutions-telecom/3cx")}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      En savoir plus sur 3CX
                    </Button>
                  </div>
                </motion.div>

                {/* Wazo Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Share2 className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">Open Source</div>
                        <div className="text-2xl font-bold">Wazo</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Plateforme Programmable</h3>
                    <p className="text-green-100">
                      Communication unifiée flexible et entièrement personnalisable via API.
                    </p>
                  </div>

                  <div className="p-8">
                    <div className="mb-8">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Fonctionnalités Principales
                      </h4>
                      <ul className="space-y-3">
                        {[
                          { icon: Code, text: "API REST complète pour intégrations" },
                          { icon: Shield, text: "Souveraineté et contrôle des données" },
                          { icon: Users, text: "Collaboration d'équipe avancée" },
                          { icon: Phone, text: "Téléphonie IP professionnelle" },
                          { icon: Globe, text: "Multi-sites et multi-tenants" },
                          { icon: Zap, text: "Automatisation et workflows" }
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <item.icon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => navigate("/solutions-telecom/wazo")}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    >
                      En savoir plus sur Wazo
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-20 max-w-4xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">
                  Quelle solution choisir ?
                </h3>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="text-left p-4 text-slate-700">Critère</th>
                        <th className="text-center p-4 text-blue-600 font-bold">3CX</th>
                        <th className="text-center p-4 text-green-600 font-bold">Wazo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-4 font-medium text-slate-700">Facilité de déploiement</td>
                        <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                        <td className="p-4 text-center">⭐⭐⭐</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-4 font-medium text-slate-700">Personnalisation</td>
                        <td className="p-4 text-center">⭐⭐⭐</td>
                        <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-slate-700">Visioconférence</td>
                        <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                        <td className="p-4 text-center">⭐⭐⭐⭐</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-4 font-medium text-slate-700">Intégrations API</td>
                        <td className="p-4 text-center">⭐⭐⭐⭐</td>
                        <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium text-slate-700">Prix</td>
                        <td className="p-4 text-center text-sm text-slate-600">Moyen</td>
                        <td className="p-4 text-center text-sm text-slate-600">Flexible</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Pourquoi choisir nos solutions télécom ?"
            subtitle="Des fonctionnalités professionnelles pour moderniser votre communication"
            features={telecomFeatures}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Modernisez votre téléphonie"
            title="Demandez une démonstration gratuite"
            description="Nos experts vous présentent la solution la mieux adaptée à vos besoins et vous accompagnent dans votre migration."
            primaryCTA={{
              text: "Demander une Démo",
              link: "/contact"
            }}
            secondaryCTA={{
              text: "Comparer les Prix",
              link: "/contact"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}
