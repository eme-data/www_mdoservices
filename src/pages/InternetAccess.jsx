import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wifi, Shield, Zap, Signal, CheckCircle2, Home, Network, TrendingUp, Clock, HeadphonesIcon, Award, Satellite } from "lucide-react"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function InternetAccess() {
  const internetFeatures = [
    {
      icon: Zap,
      title: "Débits Ultra-Rapides",
      description: "Connexions fibre optique jusqu'à 10 Gb/s symétriques pour vos besoins les plus exigeants.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Haute Disponibilité",
      description: "Garantie de temps de rétablissement (GTR) avec redondance 4G automatique.",
      color: "purple"
    },
    {
      icon: Network,
      title: "Infrastructure Professionnelle",
      description: "Équipements de qualité professionnelle avec supervision proactive 24/7.",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Scalabilité Garantie",
      description: "Évoluez facilement selon vos besoins avec nos offres modulaires et évolutives.",
      color: "orange"
    },
    {
      icon: HeadphonesIcon,
      title: "Support Dédié",
      description: "Assistance technique prioritaire disponible 24/7 pour une continuité maximale.",
      color: "red"
    },
    {
      icon: Award,
      title: "Qualité Certifiée",
      description: "Partenaires des principaux opérateurs télécom pour une qualité de service optimale.",
      color: "yellow"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande d'information Accès Internet"
  }

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Accès Internet Professionnel"
            title="Connectivité <span class='bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent'>ultra-rapide</span> pour votre entreprise"
            description="Bénéficiez d'une connexion internet professionnelle fiable et performante. Fibre optique dédiée, FTTH pro, internet satellite pour zones isolées, et redondance 4G pour garantir la continuité de votre activité."
            primaryCTA={{
              text: "Demander un Devis",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir les Offres",
              link: "#offres"
            }}
            stats={[
              { value: "10 Gb/s", label: "Débit Maximum" },
              { value: "99.9%", label: "Disponibilité" },
              { value: "< 4h", label: "GTR Disponible" },
              { value: "24/7", label: "Supervision" }
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Nos Offres de Connectivité
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Choisissez la solution adaptée à vos besoins : de la fibre FTTH économique à la fibre dédiée haute performance, en passant par l'internet satellite pour les zones isolées
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {/* FTTH Pro Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-8 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Home className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Fibre FTTH Pro</h3>
                    <p className="text-blue-100 mb-4">
                      Connexion fibre optique professionnelle directe
                    </p>
                    <div className="text-4xl font-bold">Jusqu'à</div>
                    <div className="text-5xl font-bold mt-2">2 Gb/s</div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Débits jusqu'à 2 Gb/s",
                        "Installation professionnelle incluse",
                        "IP fixe disponible en option",
                        "Supervision et maintenance",
                        "Support technique prioritaire",
                        "Engagement flexible"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <p className="text-center text-sm text-slate-600 mb-4">
                        Idéal pour PME et TPE
                      </p>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Fibre Dédiée Card - Highlighted */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-2 border-green-500 transform md:scale-105 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white relative">
                    <div className="absolute top-4 right-4 bg-yellow-400 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                      RECOMMANDÉ
                    </div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Wifi className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Fibre Dédiée</h3>
                    <p className="text-green-100 mb-4">
                      Connexion ultra-rapide symétrique garantie
                    </p>
                    <div className="text-4xl font-bold">Jusqu'à</div>
                    <div className="text-5xl font-bold mt-2">10 Gb/s</div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Débits symétriques garantis jusqu'à 10 Gb/s",
                        "Garantie de temps de rétablissement (GTR)",
                        "Bande passante dédiée 100%",
                        "Supervision proactive 24/7",
                        "Support technique dédié",
                        "IP fixes incluses",
                        "SLA 99.9% garanti"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <p className="text-center text-sm text-slate-600 mb-4">
                        Idéal pour entreprises exigeantes
                      </p>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                      >
                        Demander un devis
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Redondance 4G Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Signal className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Redondance 4G</h3>
                    <p className="text-purple-100 mb-4">
                      Solution de secours automatique
                    </p>
                    <div className="text-3xl font-bold">Continuité</div>
                    <div className="text-4xl font-bold mt-2">Garantie</div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Basculement automatique instantané",
                        "Continuité de service assurée",
                        "Débit 4G jusqu'à 300 Mb/s",
                        "Multi-opérateurs pour fiabilité",
                        "Monitoring en temps réel",
                        "Compatible toutes offres fibre"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <p className="text-center text-sm text-slate-600 mb-4">
                        Option recommandée pour sécurité
                      </p>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Ajouter la redondance
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Internet par Satellite Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <Satellite className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Internet Satellite</h3>
                    <p className="text-orange-100 mb-4">
                      Solution pour zones isolées ou sans fibre
                    </p>
                    <div className="text-3xl font-bold">Jusqu'à</div>
                    <div className="text-4xl font-bold mt-2">150 Mb/s</div>
                  </div>

                  <div className="p-8 flex flex-col h-full">
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Connexion disponible partout",
                        "Installation rapide (48-72h)",
                        "Débits jusqu'à 150 Mb/s",
                        "Idéal pour zones blanches",
                        "Solution Starlink disponible",
                        "Sans engagement de durée"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <p className="text-center text-sm text-slate-600 mb-4">
                        Parfait pour lieux isolés
                      </p>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white"
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
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12 border border-blue-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
                    Pourquoi choisir notre connectivité ?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-slate-800">Fiabilité Maximale</h4>
                      <p className="text-slate-600 text-sm">
                        Double connexion avec basculement automatique pour une disponibilité optimale
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-slate-800">Performance Garantie</h4>
                      <p className="text-slate-600 text-sm">
                        Débits symétriques garantis et bande passante dédiée pour tous vos usages
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <HeadphonesIcon className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-slate-800">Support Expert</h4>
                      <p className="text-slate-600 text-sm">
                        Accompagnement personnalisé et supervision 24/7 par nos équipes
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Tous les avantages de notre connectivité"
            subtitle="Une infrastructure professionnelle pour garantir la performance de votre entreprise"
            features={internetFeatures}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Boostez votre connectivité"
            title="Demandez votre audit réseau gratuit"
            description="Nos experts analysent vos besoins en connectivité et vous proposent la solution la plus adaptée avec un devis détaillé et transparent."
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
