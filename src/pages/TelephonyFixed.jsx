import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Video, MessageSquare, Users, Globe, Shield, CheckCircle, Zap, Cloud, PhoneForwarded, Headphones, Code, Share2 } from "lucide-react"
import { Helmet } from "react-helmet"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import BackButton from "@/components/BackButton"

export default function TelephonyFixed() {
  const features = [
    {
      icon: Phone,
      title: "Standard Téléphonique IP",
      description: "Gestion complète des appels avec transferts, conférences et files d'attente intelligentes.",
      color: "blue"
    },
    {
      icon: Video,
      title: "Visioconférence HD",
      description: "Réunions virtuelles en haute définition avec partage d'écran et enregistrement.",
      color: "purple"
    },
    {
      icon: MessageSquare,
      title: "Messagerie Unifiée",
      description: "Chat d'entreprise, SMS et messagerie vocale centralisés dans une interface unique.",
      color: "green"
    },
    {
      icon: Users,
      title: "Collaboration d'Équipe",
      description: "Outils collaboratifs pour améliorer la productivité et la communication interne.",
      color: "orange"
    },
    {
      icon: Cloud,
      title: "Déploiement Flexible",
      description: "Cloud hébergé ou on-premise selon vos besoins de sécurité et d'infrastructure.",
      color: "cyan"
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Chiffrement des communications, conformité RGPD et protection contre les intrusions.",
      color: "red"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Téléphonie Fixe"
  }

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Téléphonie Fixe IP Professionnelle - 3CX & Wazo | MDO Services</title>
        <meta
          name="description"
          content="Solutions de téléphonie fixe IP pour entreprises en Occitanie. Standard téléphonique cloud avec 3CX et Wazo. Visioconférence, messagerie unifiée et collaboration d'équipe."
        />
        <meta
          name="keywords"
          content="téléphonie fixe IP, standard téléphonique, 3CX, Wazo, VoIP, visioconférence, Toulouse, Occitanie, Ariège"
        />
        <link rel="canonical" href="https://mdoservices.fr/solutions-telecom/telephonie-fixe" />
      </Helmet>

      <div className="pt-24">
        <BackButton to="/solutions-telecom" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Téléphonie Fixe IP"
            title="Modernisez votre <span class='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>téléphonie d'entreprise</span>"
            description="Standard téléphonique IP professionnel avec visioconférence HD, messagerie unifiée et collaboration d'équipe. Solutions 3CX et Wazo adaptées à vos besoins."
            primaryCTA={{
              text: "Demander une Démo",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir nos Solutions",
              link: "#solutions"
            }}
            stats={[
              { value: "100+", label: "Lignes Déployées" },
              { value: "99.9%", label: "Disponibilité" },
              { value: "< 1j", label: "Installation" },
              { value: "24/7", label: "Support" }
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
                  Nos Solutions de Téléphonie Fixe
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Deux plateformes professionnelles pour répondre à tous vos besoins de communication
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
                {/* 3CX Solution */}
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
                        <PhoneForwarded className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">Solution Pro</div>
                        <div className="text-2xl font-bold">3CX</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">Simplicité & Performance</h3>
                    <p className="text-blue-100">
                      Solution complète, facile à déployer et à gérer. Idéale pour PME et ETI.
                    </p>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-8 flex-grow">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                        Fonctionnalités Clés
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Standard téléphonique IP complet",
                          "Visioconférence HD illimitée intégrée",
                          "Chat d'entreprise et présence temps réel",
                          "Applications mobiles iOS & Android",
                          "Centre d'appels avec file d'attente",
                          "Interface web intuitive & moderne"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">À partir de</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">12€</div>
                          <div className="text-xs text-slate-500">/utilisateur/mois</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      >
                        En savoir plus sur 3CX
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Wazo Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col"
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
                    <h3 className="text-3xl font-bold mb-3">Flexibilité & Personnalisation</h3>
                    <p className="text-green-100">
                      Plateforme programmable pour des besoins spécifiques et intégrations avancées.
                    </p>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-8 flex-grow">
                      <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        Fonctionnalités Clés
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "API REST complète pour intégrations",
                          "Souveraineté et contrôle total des données",
                          "Téléphonie IP professionnelle avancée",
                          "Multi-sites et multi-tenants",
                          "Workflows et automatisation personnalisés",
                          "Solution 100% open-source"
                        ].map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-200 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-600 text-sm">Sur devis</span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-800">Sur mesure</div>
                          <div className="text-xs text-slate-500">selon vos besoins</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                      >
                        En savoir plus sur Wazo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 max-w-4xl mx-auto"
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
                        <td className="p-4 font-medium text-slate-700">Recommandé pour</td>
                        <td className="p-4 text-center text-sm text-slate-600">PME/ETI classiques</td>
                        <td className="p-4 text-center text-sm text-slate-600">Besoins spécifiques</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Tous les avantages de la téléphonie IP"
            subtitle="Une communication moderne et performante pour votre entreprise"
            features={features}
          />

          {/* CTA Section */}
          <CTASectionTekup
            badge="Passez à la téléphonie IP"
            title="Demandez une démonstration gratuite"
            description="Nos experts vous présentent nos solutions de téléphonie fixe et vous accompagnent dans votre migration sans interruption de service."
            primaryCTA={{
              text: "Demander une Démo",
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
