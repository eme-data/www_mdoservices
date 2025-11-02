import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Network, Wifi, Cable, Server, Shield, Zap, CheckCircle, Users, Lock, TrendingUp, Globe, Activity } from "lucide-react"
import { Helmet } from "react-helmet"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import BackButton from "@/components/BackButton"

export default function NetworkInfrastructure() {
  const features = [
    {
      icon: Network,
      title: "Architecture Réseau",
      description: "Conception et déploiement d'infrastructures réseau performantes et évolutives.",
      color: "blue"
    },
    {
      icon: Wifi,
      title: "WiFi Professionnel",
      description: "Réseaux sans fil haute performance avec couverture optimale et roaming transparent.",
      color: "purple"
    },
    {
      icon: Cable,
      title: "Câblage Structuré",
      description: "Installation de câblage cuivre et fibre optique conforme aux normes professionnelles.",
      color: "green"
    },
    {
      icon: Shield,
      title: "Sécurité Réseau",
      description: "Firewall, VPN, segmentation VLAN et protection contre les cybermenaces.",
      color: "red"
    },
    {
      icon: Server,
      title: "Équipements Pro",
      description: "Switches, routeurs et points d'accès de marques professionnelles reconnues.",
      color: "orange"
    },
    {
      icon: Activity,
      title: "Supervision 24/7",
      description: "Monitoring proactif de votre infrastructure avec alertes et interventions rapides.",
      color: "cyan"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Infrastructure Réseaux & WiFi"
  }

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Infrastructure Réseaux & WiFi Professionnel | MDO Services</title>
        <meta
          name="description"
          content="Conception, installation et maintenance d'infrastructures réseaux professionnelles en Occitanie. WiFi entreprise, câblage structuré, sécurité réseau et supervision 24/7."
        />
        <meta
          name="keywords"
          content="infrastructure réseau, wifi professionnel, câblage structuré, switch, routeur, firewall, VPN, Toulouse, Occitanie, Ariège"
        />
        <link rel="canonical" href="https://mdoservices.fr/infrastructure-reseaux" />
      </Helmet>

      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Infrastructure Réseaux & WiFi"
            title="Réseau d'entreprise <span class='bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent'>haute performance</span>"
            description="Conception, installation et maintenance de votre infrastructure réseau complète : WiFi professionnel, câblage structuré, équipements actifs et sécurité réseau. Des solutions fiables pour connecter votre entreprise."
            primaryCTA={{
              text: "Demander une Étude",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Nos Solutions",
              link: "#solutions"
            }}
            stats={[
              { value: "200+", label: "Sites Équipés" },
              { value: "99.9%", label: "Disponibilité" },
              { value: "< 2h", label: "Temps d'intervention" },
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
                  Nos Solutions Réseaux & WiFi
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Une infrastructure réseau complète et performante pour votre entreprise
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* WiFi Professionnel Card */}
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
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">WiFi Professionnel</h3>
                    <p className="text-gray-600 mb-6">
                      Réseau sans fil haute performance avec couverture optimale.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Points d'accès WiFi 6 dernière génération",
                        "Couverture optimale et roaming transparent",
                        "SSID multiples et portail captif",
                        "Contrôle d'accès et authentification",
                        "QoS pour prioriser les applications",
                        "Étude de couverture radio incluse"
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
                          <div className="text-2xl font-bold text-slate-800">990€</div>
                          <div className="text-xs text-slate-500">installation</div>
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

                {/* Infrastructure Réseau Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-cyan-200 flex flex-col relative"
                >
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAIRE
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Network className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Infrastructure Réseau</h3>
                    <p className="text-gray-600 mb-6">
                      Architecture réseau complète avec équipements professionnels.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Switches managés gigabit/10G",
                        "Routeurs et firewall professionnels",
                        "Segmentation VLAN et sécurité",
                        "Redondance et haute disponibilité",
                        "VPN site-to-site et remote access",
                        "Documentation réseau complète",
                        "Garantie et support constructeur"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0 mt-0.5" />
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
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                      >
                        Demander une étude
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                </motion.div>

                {/* Câblage Structuré Card */}
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
                        <Cable className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Câblage Structuré</h3>
                    <p className="text-gray-600 mb-6">
                      Installation professionnelle de câblage réseau certifié.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Câblage cuivre Cat6/Cat6a/Cat7",
                        "Fibre optique monomode/multimode",
                        "Baies de brassage et organizers",
                        "Certification et recette des liens",
                        "Plan de câblage et étiquetage",
                        "Garantie 25 ans sur installation",
                        "Conformité normes ISO/IEC"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">À partir de</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">80€</div>
                          <div className="text-xs text-slate-500">/point RJ45</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
                </motion.div>
              </div>

              {/* Marques et Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 max-w-6xl mx-auto"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-800">
                  Marques et technologies que nous déployons
                </h3>
                <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 rounded-3xl p-8 md:p-12 border border-blue-200">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: Network, title: "Cisco / Meraki", desc: "Switches, routeurs et WiFi professionnels", color: "blue" },
                      { icon: Wifi, title: "Ubiquiti / UniFi", desc: "Solutions WiFi et réseau haute performance", color: "cyan" },
                      { icon: Shield, title: "Fortinet / pfSense", desc: "Firewalls et sécurité réseau avancée", color: "red" },
                      { icon: Cable, title: "Panduit / Legrand", desc: "Câblage structuré certifié", color: "green" }
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

              {/* Services Inclus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-20 max-w-5xl mx-auto"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200">
                  <h3 className="text-2xl font-bold text-center mb-8 text-slate-800">
                    Services inclus dans nos projets
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { icon: Globe, text: "Étude et audit réseau existant" },
                      { icon: Network, text: "Conception architecture réseau" },
                      { icon: Cable, text: "Installation et câblage professionnel" },
                      { icon: Server, text: "Configuration équipements actifs" },
                      { icon: Shield, text: "Sécurisation et segmentation VLAN" },
                      { icon: Activity, text: "Tests de performance et recette" },
                      { icon: Users, text: "Formation des équipes IT" },
                      { icon: TrendingUp, text: "Documentation technique complète" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center p-4 bg-slate-50 rounded-xl">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-slate-700 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Pourquoi choisir notre expertise réseaux ?"
            subtitle="Une infrastructure réseau fiable et performante pour votre entreprise"
            features={features}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Modernisez votre réseau"
            title="Demandez un audit réseau gratuit"
            description="Nos experts réseau analysent votre infrastructure actuelle et vous proposent des solutions adaptées à vos besoins : WiFi, câblage, sécurité et performance."
            primaryCTA={{
              text: "Demander un Audit",
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
