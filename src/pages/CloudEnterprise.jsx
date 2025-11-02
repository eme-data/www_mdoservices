import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Server, Cloud, Shield, Database, Network, Zap, Lock, TrendingUp, HeadphonesIcon, Award, CheckCircle } from "lucide-react"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function CloudEnterprise() {
  const cloudFeatures = [
    {
      icon: Server,
      title: "Infrastructure Scalable",
      description: "Ressources cloud évolutives qui s'adaptent automatiquement à vos besoins croissants.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Protection avancée contre les cybermenaces avec chiffrement et conformité RGPD.",
      color: "purple"
    },
    {
      icon: Network,
      title: "Haute Disponibilité",
      description: "Infrastructure redondante avec uptime de 99.9% garanti par SLA.",
      color: "green"
    },
    {
      icon: Zap,
      title: "Performance Optimale",
      description: "Serveurs haute performance avec stockage SSD NVMe pour des temps de réponse minimaux.",
      color: "orange"
    },
    {
      icon: HeadphonesIcon,
      title: "Support 24/7",
      description: "Équipe technique disponible en permanence pour vous assister et résoudre vos problèmes.",
      color: "red"
    },
    {
      icon: Lock,
      title: "Sauvegarde Automatique",
      description: "Backups quotidiens automatiques avec rétention personnalisable de vos données critiques.",
      color: "yellow"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Solutions Cloud Enterprise"
  }

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Solutions Cloud Enterprise"
            title="Transformez votre infrastructure avec le <span class='bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent'>cloud professionnel</span>"
            description="Déployez vos applications critiques sur une infrastructure cloud haute performance, sécurisée et supervisée 24/7. Migration, hébergement et infogérance par nos experts certifiés."
            primaryCTA={{
              text: "Demander une Consultation",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Découvrir nos Services",
              link: "#services"
            }}
            stats={[
              { value: "99.9%", label: "Uptime Garanti" },
              { value: "< 15min", label: "Déploiement VM" },
              { value: "24/7", label: "Support & Supervision" },
              { value: "100%", label: "Infogéré" }
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Nos Services Cloud Enterprise
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Solutions cloud sur mesure pour héberger, migrer et optimiser votre infrastructure
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Serveurs Infogérés Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Server className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Serveurs Cloud Infogérés</h3>
                    <p className="text-gray-600 mb-6">
                      Infrastructure cloud haute performance avec support complet et supervision 24/7.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Supervision proactive 24/7",
                        "Maintenance préventive incluse",
                        "Sauvegardes automatisées quotidiennes",
                        "Support technique dédié prioritaire",
                        "Scalabilité à la demande"
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
                          <div className="text-2xl font-bold text-slate-800">49€</div>
                          <div className="text-xs text-slate-500">/mois</div>
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

                {/* Migration Cloud Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Cloud className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Migration Cloud</h3>
                    <p className="text-gray-600 mb-6">
                      Transition en douceur de vos serveurs existants vers le cloud sans interruption.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Audit infrastructure existante",
                        "Plan de migration personnalisé",
                        "Migration sans interruption de service",
                        "Tests et validation complète",
                        "Formation des équipes IT"
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
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        Planifier une migration
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                </motion.div>

                {/* Solutions Hybrides Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Database className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Solutions Hybrides</h3>
                    <p className="text-gray-600 mb-6">
                      Le meilleur des deux mondes : combinez cloud et infrastructure on-premise.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Intégration cloud-onprem transparente",
                        "Optimisation des coûts IT",
                        "Haute disponibilité garantie",
                        "Plan de reprise d'activité (PRA)",
                        "Gestion unifiée simplifiée"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">Architecture</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">Sur mesure</div>
                          <div className="text-xs text-slate-500">selon besoins</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                      >
                        Étudier mon projet
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
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
                    Pourquoi choisir nos solutions cloud ?
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { icon: Shield, title: "Sécurité maximale", desc: "Protection avancée, conformité RGPD, chiffrement des données", color: "blue" },
                      { icon: Network, title: "Performance optimale", desc: "Infrastructure haute performance, temps de réponse minimal, disponibilité 99.9%", color: "green" },
                      { icon: TrendingUp, title: "Évolutivité garantie", desc: "Ressources adaptables à vos besoins, scalabilité instantanée, flexibilité totale", color: "purple" },
                      { icon: HeadphonesIcon, title: "Support expert", desc: "Équipe dédiée 24/7, maintenance proactive, conseil personnalisé", color: "orange" }
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
            title="Tous les avantages de notre cloud"
            subtitle="Une infrastructure professionnelle pour héberger vos applications critiques en toute sérénité"
            features={cloudFeatures}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Passez au cloud"
            title="Demandez votre audit cloud gratuit"
            description="Nos experts analysent votre infrastructure actuelle et vous proposent un plan de migration vers le cloud adapté à vos besoins et votre budget."
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
