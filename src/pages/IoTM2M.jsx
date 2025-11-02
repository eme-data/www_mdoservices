import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wifi, Radio, Gauge, MapPin, Bell, Shield, CheckCircle, Zap, Cloud, Database, Activity, TrendingUp } from "lucide-react"
import { Helmet } from "react-helmet"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import BackButton from "@/components/BackButton"

export default function IoTM2M() {
  const features = [
    {
      icon: Wifi,
      title: "Connectivité Multi-Réseaux",
      description: "Cartes SIM M2M multi-opérateurs pour une couverture optimale en France et à l'international.",
      color: "blue"
    },
    {
      icon: Cloud,
      title: "Plateforme IoT Cloud",
      description: "Interface de gestion centralisée pour superviser et piloter vos objets connectés.",
      color: "purple"
    },
    {
      icon: Database,
      title: "Collecte de Données",
      description: "Récupération et stockage sécurisé des données de vos capteurs et équipements.",
      color: "green"
    },
    {
      icon: Bell,
      title: "Alertes Intelligentes",
      description: "Notifications en temps réel basées sur vos seuils et règles métier personnalisés.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Chiffrement des communications et authentification sécurisée de vos devices.",
      color: "red"
    },
    {
      icon: TrendingUp,
      title: "Analytiques Avancées",
      description: "Tableaux de bord et rapports pour optimiser vos processus métier.",
      color: "cyan"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - IoT M2M"
  }

  return (
    <TekupPageLayout>
      <Helmet>
        <title>IoT & M2M - Solutions pour Objets Connectés | MDO Services</title>
        <meta
          name="description"
          content="Solutions IoT et M2M pour entreprises en Occitanie. Connectivité multi-réseaux, plateforme cloud et capteurs connectés. Télémétrie, monitoring et automatisation."
        />
        <meta
          name="keywords"
          content="IoT, M2M, objets connectés, capteurs, télémétrie, monitoring, LoRaWAN, SigFox, Toulouse, Occitanie, Ariège"
        />
        <link rel="canonical" href="https://mdoservices.fr/solutions-telecom/iot-m2m" />
      </Helmet>

      <div className="pt-24">
        <BackButton to="/solutions-telecom" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="IoT & M2M"
            title="Connectez vos <span class='bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent'>objets et équipements</span>"
            description="Solutions complètes pour vos projets IoT et M2M : cartes SIM multi-opérateurs, plateforme cloud de gestion, capteurs connectés et télémétrie professionnelle."
            primaryCTA={{
              text: "Démarrer un Projet",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Nos Solutions",
              link: "#solutions"
            }}
            stats={[
              { value: "1000+", label: "Objets Connectés" },
              { value: "99.9%", label: "Disponibilité" },
              { value: "Multi", label: "Opérateurs" },
              { value: "24/7", label: "Supervision" }
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Nos Solutions IoT & M2M
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  De la connectivité à l'analyse des données, nous accompagnons vos projets de bout en bout
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Cartes SIM M2M */}
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
                        <Wifi className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Cartes SIM M2M</h3>
                    <p className="text-gray-600 mb-6">
                      Connectivité cellulaire multi-opérateurs pour vos objets connectés.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Multi-opérateurs France & International",
                        "Formats: Mini, Micro, Nano, eSIM",
                        "Forfaits data de 1 Mo à illimité",
                        "IP fixe ou dynamique disponible",
                        "Activation/désactivation à distance",
                        "Facturation à l'usage ou forfait"
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
                          <div className="text-2xl font-bold text-slate-800">2€</div>
                          <div className="text-xs text-slate-500">/carte/mois</div>
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

                {/* Plateforme IoT Cloud */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-cyan-200 flex flex-col relative"
                >
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMANDÉ
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Cloud className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Plateforme IoT Cloud</h3>
                    <p className="text-gray-600 mb-6">
                      Interface complète pour gérer et superviser vos devices.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Dashboard temps réel personnalisable",
                        "Gestion centralisée des SIM M2M",
                        "Historique et export des données",
                        "API REST pour intégrations",
                        "Alertes et notifications configurables",
                        "Rapports et analytics avancés",
                        "Multi-utilisateurs et permissions"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">À partir de</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">49€</div>
                          <div className="text-xs text-slate-500">/mois</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                      >
                        Demander une démo
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                </motion.div>

                {/* Solutions Capteurs */}
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
                        <Activity className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Capteurs Connectés</h3>
                    <p className="text-gray-600 mb-6">
                      Gamme complète de capteurs pour vos besoins métier.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Capteurs température & humidité",
                        "GPS et géolocalisation temps réel",
                        "Détecteurs de mouvement & présence",
                        "Compteurs d'énergie et consommation",
                        "Qualité de l'air et environnement",
                        "LoRaWAN, Sigfox, NB-IoT, LTE-M",
                        "Installation et configuration incluses"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">Sur devis</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">Sur mesure</div>
                          <div className="text-xs text-slate-500">selon projet</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                      >
                        Discuter de mon projet
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
                </motion.div>
              </div>

              {/* Cas d'usage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 max-w-6xl mx-auto"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-800">
                  Cas d'usage IoT & M2M
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: MapPin, title: "Tracking & Géolocalisation", desc: "Suivi de flottes, assets, livraisons", color: "blue" },
                    { icon: Gauge, title: "Monitoring Industriel", desc: "Supervision machines, production", color: "purple" },
                    { icon: Activity, title: "Smart Building", desc: "Bâtiments intelligents, énergie", color: "green" },
                    { icon: Radio, title: "Télémétrie", desc: "Relevés à distance, compteurs", color: "orange" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                        <item.icon className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="text-lg font-bold mb-2 text-slate-800">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Tous les avantages de nos solutions IoT"
            subtitle="Une infrastructure complète pour vos projets d'objets connectés"
            features={features}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Lancez votre projet IoT"
            title="Discutons de votre projet d'objets connectés"
            description="Nos experts IoT vous accompagnent de l'étude de faisabilité au déploiement : choix des technologies, capteurs, connectivité et plateforme de gestion."
            primaryCTA={{
              text: "Démarrer un Projet",
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
