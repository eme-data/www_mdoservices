import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail, Calendar, Users, Check, FileText, Video, Cloud, Shield, Zap, HardDrive, Lock, BarChart } from "lucide-react"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function Microsoft365Details() {
  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Microsoft 365"
  }

  const m365Features = [
    {
      icon: Mail,
      title: "Email Professionnel",
      description: "Messagerie Exchange Online avec 50 Go par boîte mail et protection anti-spam avancée.",
      color: "blue"
    },
    {
      icon: FileText,
      title: "Suite Office Complète",
      description: "Word, Excel, PowerPoint, Outlook sur 5 appareils avec mises à jour automatiques.",
      color: "purple"
    },
    {
      icon: Users,
      title: "Microsoft Teams",
      description: "Collaboration en temps réel avec chat, visioconférence et partage de fichiers.",
      color: "green"
    },
    {
      icon: Cloud,
      title: "Stockage Cloud 1 To",
      description: "OneDrive Business avec 1 To de stockage sécurisé par utilisateur.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Sécurité Intégrée",
      description: "Protection avancée contre les menaces avec Microsoft Defender.",
      color: "red"
    },
    {
      icon: Zap,
      title: "Mises à Jour Continues",
      description: "Toujours à jour avec les dernières fonctionnalités et corrections de sécurité.",
      color: "yellow"
    }
  ]

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/cloud-services" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Microsoft 365"
            title="Suite collaborative <span class='bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>professionnelle</span>"
            description="Boostez la productivité de votre entreprise avec Microsoft 365 : Office, Teams, Exchange Online, OneDrive et bien plus. Installation, migration et support inclus."
            primaryCTA={{
              text: "Demander un Devis",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir les Applications",
              link: "#applications"
            }}
            stats={[
              { value: "50 Go", label: "Email par Utilisateur" },
              { value: "1 To", label: "Stockage Cloud" },
              { value: "5", label: "Appareils / Licence" },
              { value: "99.9%", label: "Disponibilité SLA" }
            ]}
          />

          {/* Applications Principales */}
          <section id="applications" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Applications Incluses
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Tous les outils dont votre entreprise a besoin pour communiquer, collaborer et produire
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Exchange Online Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Mail className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Exchange Online</h3>
                    <p className="text-gray-600 mb-6">
                      Messagerie professionnelle avec calendrier et contacts partagés.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Email professionnel @votreentreprise.fr",
                        "Boîte mail 50 Go par utilisateur",
                        "Calendrier et contacts partagés",
                        "Protection anti-spam et anti-malware",
                        "Accès mobile (iOS, Android)",
                        "Archivage et rétention des emails"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                </motion.div>

                {/* Office Apps Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Office Apps</h3>
                    <p className="text-gray-600 mb-6">
                      Suite bureautique complète installable sur tous vos appareils.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Word, Excel, PowerPoint, Outlook",
                        "Installation sur 5 PC/Mac",
                        "5 tablettes et 5 smartphones",
                        "Applications web (Office Online)",
                        "Mises à jour automatiques",
                        "Co-édition en temps réel"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                </motion.div>

                {/* Teams Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Microsoft Teams</h3>
                    <p className="text-gray-600 mb-6">
                      Plateforme de collaboration et communication pour vos équipes.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Chat et messagerie instantanée",
                        "Visioconférence jusqu'à 300 participants",
                        "Partage d'écran et enregistrement",
                        "Partage de fichiers intégré",
                        "Canaux et équipes organisés",
                        "Intégrations applications tierces"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                </motion.div>
              </div>

              {/* Applications Additionnelles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
                    Applications Supplémentaires Incluses
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: Cloud, name: "OneDrive", desc: "1 To de stockage cloud" },
                      { icon: FileText, name: "SharePoint", desc: "Intranet collaboratif" },
                      { icon: BarChart, name: "Planner", desc: "Gestion de projets" },
                      { icon: Video, name: "Stream", desc: "Vidéos d'entreprise" },
                      { icon: Lock, name: "Microsoft Defender", desc: "Protection avancée" },
                      { icon: HardDrive, name: "Forms", desc: "Formulaires en ligne" }
                    ].map((app, i) => (
                      <div key={i} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <app.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 mb-1">{app.name}</h4>
                          <p className="text-sm text-slate-600">{app.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Tous les avantages de Microsoft 365"
            subtitle="Une solution complète pour moderniser votre environnement de travail"
            features={m365Features}
          />

          {/* Plans Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Plans Microsoft 365
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Choisissez la licence adaptée à vos besoins professionnels
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Business Basic */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
                >
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">Business Basic</h3>
                  <p className="text-gray-600 mb-6">Pour les TPE et PME</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-800">5.60€</span>
                    <span className="text-gray-600">/utilisateur/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Applications web uniquement",
                      "Teams, Exchange, OneDrive",
                      "1 To stockage cloud",
                      "Réunions jusqu'à 300 personnes"
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleContact} className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                    Choisir Basic
                  </Button>
                </motion.div>

                {/* Business Standard - Recommandé */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white transform md:scale-105"
                >
                  <div className="absolute top-4 right-4 bg-yellow-400 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMANDÉ
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Business Standard</h3>
                  <p className="text-blue-100 mb-6">Le plus populaire</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold">11.70€</span>
                    <span className="text-blue-100">/utilisateur/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Suite Office complète (desktop)",
                      "Teams, Exchange, OneDrive, SharePoint",
                      "1 To stockage cloud",
                      "Installation sur 5 appareils",
                      "Webinaires jusqu'à 1000 participants"
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleContact} className="w-full bg-white text-blue-600 hover:bg-blue-50">
                    Choisir Standard
                  </Button>
                </motion.div>

                {/* Business Premium */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
                >
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">Business Premium</h3>
                  <p className="text-gray-600 mb-6">Protection maximale</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-800">20€</span>
                    <span className="text-gray-600">/utilisateur/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Tout Business Standard +",
                      "Microsoft Defender avancé",
                      "Protection des informations",
                      "Gestion des appareils mobiles",
                      "Sécurité renforcée"
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleContact} className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                    Choisir Premium
                  </Button>
                </motion.div>
              </div>

              <p className="text-center text-sm text-gray-600 mt-8">
                Prix HT - Engagement annuel - Installation et migration incluses
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <CTASectionTekup
            badge="Passez à Microsoft 365"
            title="Demandez votre devis personnalisé"
            description="Nos experts Microsoft vous accompagnent dans la migration, l'installation et la formation de vos équipes. Devis gratuit et sans engagement."
            primaryCTA={{
              text: "Demander un Devis Gratuit",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir toutes nos Solutions Cloud",
              link: "/cloud-services"
            }}
            variant="gradient"
          />
        </main>
      </div>
    </TekupPageLayout>
  )
}
