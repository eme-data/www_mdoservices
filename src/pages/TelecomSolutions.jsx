import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Smartphone, Wifi, Video, MessageSquare, Users, Globe, Shield, CheckCircle, Zap, MapPin, Activity } from 'lucide-react'
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
            description="Modernisez votre infrastructure télécom avec nos solutions professionnelles : téléphonie fixe IP, forfaits mobiles et IoT M2M. Des services complets pour toutes vos communications."
            primaryCTA={{
              text: "Demander une Démo",
              link: "/contact"
            }}
            secondaryCTA={{
              text: "Découvrir nos Services",
              link: "#services"
            }}
            stats={[
              { value: "600+", label: "Lignes Actives" },
              { value: "99.9%", label: "Disponibilité" },
              { value: "< 1j", label: "Déploiement" },
              { value: "24/7", label: "Support Technique" }
            ]}
          />

          {/* Services Section */}
          <section id="services" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Nos Services Télécom
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Des solutions complètes pour tous vos besoins de communication professionnelle
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                {/* Téléphonie Fixe Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Phone className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">VoIP Pro</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Téléphonie Fixe</h3>
                    <p className="text-blue-100">
                      Standard téléphonique IP avec visioconférence et messagerie unifiée.
                    </p>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-8 flex-grow">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        Services Inclus
                      </h4>
                      <ul className="space-y-3">
                        {[
                          { icon: Phone, text: "Standard téléphonique IP complet" },
                          { icon: Video, text: "Visioconférence HD illimitée" },
                          { icon: MessageSquare, text: "Messagerie unifiée & chat" },
                          { icon: Users, text: "Collaboration d'équipe" },
                          { icon: Globe, text: "Applications mobile & web" },
                          { icon: Shield, text: "Solutions 3CX et Wazo" }
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <item.icon className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => navigate("/solutions-telecom/telephonie-fixe")}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-auto"
                    >
                      En savoir plus
                    </Button>
                  </div>
                </motion.div>

                {/* Téléphonie Mobile Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-green-200 flex flex-col relative"
                >
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAIRE
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Smartphone className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">Forfaits Pro</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Téléphonie Mobile</h3>
                    <p className="text-green-100">
                      Forfaits professionnels avec gestion de flotte et MDM intégré.
                    </p>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-8 flex-grow">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Services Inclus
                      </h4>
                      <ul className="space-y-3">
                        {[
                          { icon: Smartphone, text: "Forfaits illimités France & International" },
                          { icon: Users, text: "Gestion de flotte centralisée" },
                          { icon: Activity, text: "Suivi des consommations temps réel" },
                          { icon: Shield, text: "MDM - Mobile Device Management" },
                          { icon: Globe, text: "Roaming international inclus" },
                          { icon: Zap, text: "Activation en moins de 24h" }
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <item.icon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => navigate("/solutions-telecom/telephonie-mobile")}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white mt-auto"
                    >
                      En savoir plus
                    </Button>
                  </div>
                </motion.div>

                {/* IoT M2M Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Wifi className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">Objets Connectés</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">IoT & M2M</h3>
                    <p className="text-cyan-100">
                      Solutions pour connecter et superviser vos équipements et capteurs.
                    </p>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-8 flex-grow">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-cyan-500 mr-2" />
                        Services Inclus
                      </h4>
                      <ul className="space-y-3">
                        {[
                          { icon: Wifi, text: "Cartes SIM M2M multi-opérateurs" },
                          { icon: Globe, text: "Plateforme cloud de gestion" },
                          { icon: MapPin, text: "Géolocalisation GPS temps réel" },
                          { icon: Activity, text: "Capteurs connectés (température, etc.)" },
                          { icon: Zap, text: "LoRaWAN, Sigfox, NB-IoT, LTE-M" },
                          { icon: Shield, text: "Sécurité & chiffrement des données" }
                        ].map((item, i) => (
                          <li key={i} className="flex items-start">
                            <item.icon className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => navigate("/solutions-telecom/iot-m2m")}
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white mt-auto"
                    >
                      En savoir plus
                    </Button>
                  </div>
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
                <div className="bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-blue-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-800">
                    Pourquoi choisir nos solutions télécom ?
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: Shield, title: "Fiabilité garantie", desc: "Disponibilité 99.9% avec SLA, infrastructure redondante", color: "blue" },
                      { icon: Zap, title: "Déploiement rapide", desc: "Mise en service en moins de 24h, formation incluse", color: "green" },
                      { icon: Users, title: "Support expert", desc: "Équipe technique dédiée disponible 24/7", color: "purple" },
                      { icon: CheckCircle, title: "Tout-en-un", desc: "Gestion centralisée de toutes vos communications", color: "cyan" }
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
            title="Tous les avantages de nos solutions télécom"
            subtitle="Des fonctionnalités professionnelles pour moderniser votre communication"
            features={telecomFeatures}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Modernisez votre télécom"
            title="Demandez une consultation gratuite"
            description="Nos experts analysent vos besoins et vous proposent la solution télécom la mieux adaptée à votre entreprise : fixe, mobile ou IoT."
            primaryCTA={{
              text: "Demander une Consultation",
              link: "/contact"
            }}
            secondaryCTA={{
              text: "Découvrir toutes nos Solutions",
              link: "/solutions"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}
