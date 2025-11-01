import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Calendar, Users, Check, FileText, Video, Cloud, Shield, Zap, HardDrive, Globe, MessageSquare } from "lucide-react"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function GoogleWorkspaceDetails() {
  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Google Workspace"
  }

  const workspaceFeatures = [
    {
      icon: Mail,
      title: "Gmail Professionnel",
      description: "Messagerie professionnelle avec 30 Go à 5 To de stockage selon votre plan.",
      color: "blue"
    },
    {
      icon: FileText,
      title: "Suite Bureautique",
      description: "Docs, Sheets, Slides avec édition collaborative en temps réel.",
      color: "purple"
    },
    {
      icon: Video,
      title: "Google Meet",
      description: "Visioconférence jusqu'à 500 participants avec enregistrement inclus.",
      color: "green"
    },
    {
      icon: Cloud,
      title: "Google Drive",
      description: "Stockage cloud sécurisé de 30 Go à 5 To par utilisateur.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Sécurité Google",
      description: "Protection avancée avec authentification à deux facteurs et chiffrement.",
      color: "red"
    },
    {
      icon: Zap,
      title: "Simplicité d'Usage",
      description: "Interface intuitive accessible partout, sur tous vos appareils.",
      color: "yellow"
    }
  ]

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/cloud-services" />

        <main className="pt-0">
          <SolutionHeroTekup
            badge="Google Workspace"
            title="Suite collaborative <span class='bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent'>Google</span>"
            description="Transformez votre façon de travailler avec Google Workspace : Gmail, Drive, Docs, Meet et bien plus. Solution cloud complète pour PME et grandes entreprises."
            primaryCTA={{
              text: "Demander un Devis",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir les Applications",
              link: "#applications"
            }}
            stats={[
              { value: "30 Go-5 To", label: "Stockage Gmail" },
              { value: "500", label: "Participants Meet" },
              { value: "100%", label: "Applications Web" },
              { value: "99.9%", label: "Disponibilité" }
            ]}
          />

          {/* Applications Section */}
          <section id="applications" className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Applications Google Workspace
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Tous les outils Google pour communiquer, collaborer et innover
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Gmail Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Mail className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Gmail Professionnel</h3>
                    <p className="text-gray-600 mb-6">
                      Email professionnel puissant avec recherche Google intégrée.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Email @votreentreprise.com",
                        "30 Go à 5 To de stockage",
                        "Protection anti-spam avancée",
                        "Recherche Google puissante",
                        "Accès mobile et hors ligne",
                        "Intégration Calendar et Contacts"
                      ].map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
                </motion.div>

                {/* Drive & Docs Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Drive & Docs</h3>
                    <p className="text-gray-600 mb-6">
                      Suite bureautique collaborative dans le cloud.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Google Docs, Sheets, Slides",
                        "Édition collaborative temps réel",
                        "Stockage cloud sécurisé",
                        "Partage de fichiers facile",
                        "Historique des versions",
                        "Compatible Microsoft Office"
                      ].map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                </motion.div>

                {/* Meet & Chat Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100"
                >
                  <div className="p-8">
                    <div className="mb-6 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Video className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Meet & Chat</h3>
                    <p className="text-gray-600 mb-6">
                      Communication vidéo et messagerie d'équipe intégrées.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Visio jusqu'à 500 participants",
                        "Enregistrement des réunions",
                        "Partage d'écran en HD",
                        "Chat d'équipe Google Chat",
                        "Intégration Gmail et Calendar",
                        "Sous-titres automatiques (IA)"
                      ].map((f, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                </motion.div>
              </div>

              {/* Apps Additionnelles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-20 max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 md:p-12 border border-blue-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-slate-800">
                    Applications Supplémentaires
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { icon: Calendar, name: "Calendar", desc: "Agendas partagés" },
                      { icon: MessageSquare, name: "Chat", desc: "Messagerie d'équipe" },
                      { icon: Globe, name: "Sites", desc: "Intranet et sites web" },
                      { icon: HardDrive, name: "Forms", desc: "Formulaires en ligne" },
                      { icon: Shield, name: "Admin", desc: "Console d'administration" },
                      { icon: Users, name: "Groups", desc: "Listes de diffusion" }
                    ].map((app, i) => (
                      <div key={i} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
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

          <FeaturesSectionTekup
            title="Tous les avantages de Google Workspace"
            subtitle="Une solution cloud complète pour transformer votre façon de travailler"
            features={workspaceFeatures}
          />

          {/* Plans */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Plans Google Workspace
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Choisissez la formule adaptée à la taille de votre entreprise
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Business Starter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
                >
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">Business Starter</h3>
                  <p className="text-gray-600 mb-6">Pour démarrer</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-800">5.75€</span>
                    <span className="text-gray-600">/utilisateur/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Gmail professionnel 30 Go",
                      "Meet jusqu'à 100 participants",
                      "Drive partagé 30 Go/utilisateur",
                      "Support standard"
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleContact} className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                    Choisir Starter
                  </Button>
                </motion.div>

                {/* Business Standard - Recommandé */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white transform md:scale-105 relative"
                >
                  <div className="absolute top-4 right-4 bg-yellow-400 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMANDÉ
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Business Standard</h3>
                  <p className="text-blue-100 mb-6">Le plus populaire</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold">11.50€</span>
                    <span className="text-blue-100">/utilisateur/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Gmail professionnel 2 To",
                      "Meet jusqu'à 150 participants + enregistrement",
                      "Drive partagé 2 To/utilisateur",
                      "Support prioritaire",
                      "Contrôles de sécurité avancés"
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

                {/* Business Plus */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8"
                >
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">Business Plus</h3>
                  <p className="text-gray-600 mb-6">Sécurité renforcée</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-slate-800">17.25€</span>
                    <span className="text-gray-600">/utilisateur/mois</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Gmail professionnel 5 To",
                      "Meet jusqu'à 500 participants",
                      "Drive partagé 5 To/utilisateur",
                      "Vault (archivage et eDiscovery)",
                      "Sécurité et conformité avancées"
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleContact} className="w-full bg-slate-700 hover:bg-slate-600 text-white">
                    Choisir Plus
                  </Button>
                </motion.div>
              </div>

              <p className="text-center text-sm text-gray-600 mt-8">
                Prix HT - Engagement annuel - Migration et formation incluses
              </p>
            </div>
          </section>

          <CTASectionTekup
            badge="Passez à Google Workspace"
            title="Demandez votre essai gratuit 14 jours"
            description="Testez Google Workspace gratuitement pendant 14 jours. Nos experts vous accompagnent dans la migration depuis votre solution actuelle."
            primaryCTA={{
              text: "Demander un Essai Gratuit",
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
