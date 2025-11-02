import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Camera, Shield, Eye, Monitor, Cloud, CheckCircle2, AlertTriangle, Clock, Smartphone, Lock, HardDrive, Wifi } from "lucide-react"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function Videosurveillance() {
  const videoFeatures = [
    {
      icon: Eye,
      title: "Surveillance 24/7",
      description: "Surveillance continue de vos locaux avec enregistrement haute définition et consultation à distance.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Protégez vos biens et vos équipes avec des systèmes de vidéosurveillance professionnels dernière génération.",
      color: "purple"
    },
    {
      icon: Cloud,
      title: "Stockage Cloud Sécurisé",
      description: "Sauvegarde automatique dans le cloud avec accès depuis n'importe où et conservation longue durée.",
      color: "green"
    },
    {
      icon: Smartphone,
      title: "Accès Mobile",
      description: "Consultez vos caméras en temps réel depuis votre smartphone, tablette ou ordinateur où que vous soyez.",
      color: "orange"
    },
    {
      icon: AlertTriangle,
      title: "Détection Intelligente",
      description: "Alertes instantanées en cas de mouvement suspect avec intelligence artificielle et analyse comportementale.",
      color: "red"
    },
    {
      icon: Lock,
      title: "Conformité RGPD",
      description: "Installation conforme à la réglementation RGPD et protection des données personnelles garantie.",
      color: "indigo"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande d'information Vidéosurveillance"
  }

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Vidéosurveillance Professionnelle"
            title="Sécurisez vos locaux avec des <span class='bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent'>systèmes de surveillance</span> intelligents"
            description="Solutions de vidéosurveillance sur mesure pour entreprises : caméras IP haute définition, enregistrement cloud, détection intelligente et accès à distance. Protégez votre activité 24h/24."
            primaryCTA={{
              text: "Demander un Devis",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir les Solutions",
              link: "#solutions"
            }}
            stats={[
              { value: "4K", label: "Résolution Ultra HD" },
              { value: "24/7", label: "Surveillance Continue" },
              { value: "30j", label: "Conservation Cloud" },
              { value: "100%", label: "Conforme RGPD" }
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Nos Solutions de Vidéosurveillance
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Des systèmes adaptés à tous les besoins : commerce, bureaux, entrepôt, industrie
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Caméras IP Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Caméras IP</h3>
                    <p className="text-indigo-100 mb-4">
                      Caméras connectées haute définition
                    </p>
                    <div className="text-4xl font-bold">Jusqu'à</div>
                    <div className="text-5xl font-bold mt-2">4K</div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Résolution 4K Ultra HD",
                        "Vision nocturne infrarouge",
                        "Détection de mouvement IA",
                        "Accès réseau sécurisé",
                        "Installation professionnelle",
                        "Compatible tous réseaux"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <p className="text-center text-sm text-slate-600 mb-4">
                        Idéal pour commerce et bureaux
                      </p>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Système Cloud Card - Highlighted */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-purple-500 transform md:scale-105 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white relative">
                    <div className="absolute top-4 right-4 bg-yellow-400 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
                      RECOMMANDÉ
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Cloud className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Solution Cloud</h3>
                    <p className="text-purple-100 mb-4">
                      Enregistrement et accès cloud illimité
                    </p>
                    <div className="text-4xl font-bold">Stockage</div>
                    <div className="text-4xl font-bold mt-2">Sécurisé</div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Enregistrement cloud automatique",
                        "Conservation 30 jours minimum",
                        "Accès depuis n'importe où",
                        "Sauvegarde redondante",
                        "Aucun serveur local requis",
                        "Mises à jour automatiques",
                        "Application mobile incluse"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <p className="text-center text-sm text-slate-600 mb-4">
                        Solution moderne sans contrainte
                      </p>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Système NVR Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <HardDrive className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Système NVR</h3>
                    <p className="text-emerald-100 mb-4">
                      Enregistreur réseau local haute capacité
                    </p>
                    <div className="text-3xl font-bold">Jusqu'à</div>
                    <div className="text-4xl font-bold mt-2">32 caméras</div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Enregistreur professionnel",
                        "Capacité jusqu'à 32 caméras",
                        "Stockage local sécurisé (HDD)",
                        "Consultation à distance",
                        "Redondance RAID disponible",
                        "Intégration contrôle d'accès"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <p className="text-center text-sm text-slate-600 mb-4">
                        Pour sites étendus et industrie
                      </p>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Avantages Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
                    Pourquoi choisir nos solutions de vidéosurveillance ?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-slate-800">Installation Certifiée</h4>
                      <p className="text-slate-600 text-sm">
                        Techniciens certifiés et conformité totale aux normes RGPD et sécurité
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Monitor className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-slate-800">Supervision 24/7</h4>
                      <p className="text-slate-600 text-sm">
                        Surveillance continue avec alertes en temps réel et support technique réactif
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Wifi className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-slate-800">Technologies Avancées</h4>
                      <p className="text-slate-600 text-sm">
                        IA, détection faciale, analyse comportementale et intégration domotique
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Tous les avantages de nos systèmes de vidéosurveillance"
            subtitle="Une protection complète pour sécuriser votre entreprise et vos équipes"
            features={videoFeatures}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Sécurisez votre entreprise"
            title="Demandez votre audit sécurité gratuit"
            description="Nos experts analysent vos besoins en vidéosurveillance et vous proposent une solution sur mesure avec un devis détaillé et transparent."
            primaryCTA={{
              text: "Demander un Audit Gratuit",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir toutes nos Solutions",
              link: "/solutions"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}
