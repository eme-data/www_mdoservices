import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Brain, Bot, Zap, Eye, MessageSquare, BarChart, CheckCircle, Sparkles, TrendingUp, Target, Workflow, Database } from "lucide-react"
import { Helmet } from "react-helmet"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import BackButton from "@/components/BackButton"

export default function AIIntegration() {
  const features = [
    {
      icon: Brain,
      title: "IA Conversationnelle",
      description: "Chatbots et assistants virtuels intelligents pour automatiser votre support client.",
      color: "blue"
    },
    {
      icon: Workflow,
      title: "Automatisation Processus",
      description: "Optimisation et automatisation de vos workflows métiers avec l'intelligence artificielle.",
      color: "purple"
    },
    {
      icon: BarChart,
      title: "Analyse Prédictive",
      description: "Exploitation de vos données avec machine learning pour anticiper et décider.",
      color: "green"
    },
    {
      icon: Eye,
      title: "Vision par Ordinateur",
      description: "Reconnaissance d'images, OCR et analyse visuelle pour vos processus industriels.",
      color: "orange"
    },
    {
      icon: MessageSquare,
      title: "Traitement du Langage",
      description: "Analyse de texte, synthèse vocale et traduction automatique pour votre communication.",
      color: "red"
    },
    {
      icon: Target,
      title: "Conseil & Accompagnement",
      description: "Audit de vos besoins et accompagnement sur-mesure dans votre transformation IA.",
      color: "cyan"
    }
  ]

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Intégration IA"
  }

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Intégration IA - Intelligence Artificielle pour l'Entreprise | MDO Services</title>
        <meta
          name="description"
          content="Intégrez l'intelligence artificielle au cœur de vos processus métiers. Chatbots, automatisation, analyse prédictive et vision par ordinateur. Experts IA en Occitanie."
        />
        <meta
          name="keywords"
          content="intégration IA, intelligence artificielle, chatbot, automatisation, machine learning, vision par ordinateur, Toulouse, Occitanie, Ariège"
        />
        <link rel="canonical" href="https://mdoservices.fr/integration-ia" />
      </Helmet>

      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Intégration IA"
            title="Intégrez l'<span class='bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'>intelligence artificielle</span> dans vos processus"
            description="Transformez votre entreprise avec l'IA : automatisation des tâches, chatbots intelligents, analyse prédictive et optimisation de vos workflows métiers. Nos experts vous accompagnent de l'audit à la mise en production."
            primaryCTA={{
              text: "Démarrer un Projet IA",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Découvrir nos Solutions",
              link: "#solutions"
            }}
            stats={[
              { value: "50+", label: "Projets IA Réalisés" },
              { value: "-40%", label: "Gain de Temps Moyen" },
              { value: "100%", label: "Sur Mesure" },
              { value: "24/7", label: "Support & Maintenance" }
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nos Solutions d'Intégration IA
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Des solutions IA concrètes et opérationnelles pour améliorer votre productivité
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* Chatbots & Assistants IA Card */}
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
                        <Bot className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Chatbots & Assistants IA</h3>
                    <p className="text-gray-600 mb-6">
                      Automatisez votre support client avec des agents conversationnels intelligents.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Chatbot web et réseaux sociaux",
                        "Assistant vocal intelligent",
                        "Support client 24/7 automatisé",
                        "Intégration bases de connaissances",
                        "Traitement du langage naturel (NLP)",
                        "Escalade vers agents humains"
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
                          <div className="text-2xl font-bold text-slate-800">1 990€</div>
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

                {/* Automatisation & IA Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-purple-200 flex flex-col relative"
                >
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAIRE
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <Zap className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Automatisation Intelligente</h3>
                    <p className="text-gray-600 mb-6">
                      Optimisez vos processus métiers avec l'IA et le machine learning.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Automatisation des workflows",
                        "Traitement automatique de documents",
                        "OCR & extraction de données",
                        "Classification automatique",
                        "Détection d'anomalies",
                        "Prédiction et recommandations",
                        "Intégration API et systèmes existants"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
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
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        Étudier mon projet
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </motion.div>

                {/* Analyse & IA Card */}
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
                        <BarChart className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-slate-800">Analyse & Prédiction IA</h3>
                    <p className="text-gray-600 mb-6">
                      Exploitez vos données avec le machine learning et l'analyse prédictive.
                    </p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {[
                        "Analyse prédictive et forecasting",
                        "Segmentation et clustering",
                        "Détection de tendances",
                        "Scoring et notation automatique",
                        "Tableaux de bord IA",
                        "Recommandations personnalisées",
                        "Optimisation de la performance"
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
                          <div className="text-xs text-slate-500">selon données</div>
                        </div>
                      </div>
                      <Button
                        onClick={handleContact}
                        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                      >
                        Analyser mes données
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-green-500 to-teal-600"></div>
                </motion.div>
              </div>

              {/* Méthodologie */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-20 max-w-6xl mx-auto"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-800">
                  Notre Méthodologie d'Intégration IA
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      num: "1",
                      title: "Audit & Analyse",
                      desc: "Identification des cas d'usage IA pertinents pour votre activité",
                      icon: Target,
                      color: "blue"
                    },
                    {
                      num: "2",
                      title: "Proof of Concept",
                      desc: "Développement d'un POC pour valider la faisabilité technique",
                      icon: Sparkles,
                      color: "purple"
                    },
                    {
                      num: "3",
                      title: "Déploiement",
                      desc: "Intégration dans vos systèmes existants et mise en production",
                      icon: Workflow,
                      color: "green"
                    },
                    {
                      num: "4",
                      title: "Optimisation",
                      desc: "Formation, monitoring et amélioration continue du modèle IA",
                      icon: TrendingUp,
                      color: "orange"
                    }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-200 h-full">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-xl flex items-center justify-center mb-4 text-white font-bold text-xl`}>
                          {step.num}
                        </div>
                        <step.icon className={`h-8 w-8 text-${step.color}-500 mb-3`} />
                        <h4 className="text-lg font-bold mb-2 text-slate-800">{step.title}</h4>
                        <p className="text-sm text-slate-600">{step.desc}</p>
                      </div>
                      {i < 3 && (
                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                          <div className="w-6 h-6 text-slate-300">→</div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSectionTekup
            title="Pourquoi intégrer l'IA dans votre entreprise ?"
            subtitle="L'intelligence artificielle comme levier de croissance et d'efficacité"
            features={features}
          />

          {/* Use Cases Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Cas d'Usage Concrets
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  Exemples d'intégration IA réussies dans différents secteurs
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    title: "E-commerce",
                    cases: [
                      "Chatbot de recommandation produits",
                      "Prédiction de la demande",
                      "Personnalisation du parcours client",
                      "Détection de fraude"
                    ],
                    icon: Bot,
                    color: "blue"
                  },
                  {
                    title: "Industrie",
                    cases: [
                      "Maintenance prédictive",
                      "Contrôle qualité par vision",
                      "Optimisation de production",
                      "Détection d'anomalies"
                    ],
                    icon: Eye,
                    color: "purple"
                  },
                  {
                    title: "Services",
                    cases: [
                      "Automatisation du support client",
                      "Analyse de sentiment",
                      "Scoring et qualification leads",
                      "Traitement automatique documents"
                    ],
                    icon: MessageSquare,
                    color: "green"
                  }
                ].map((sector, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br from-${sector.color}-500 to-${sector.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                      <sector.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-800">{sector.title}</h3>
                    <ul className="space-y-2">
                      {sector.cases.map((useCase, j) => (
                        <li key={j} className="flex items-start text-sm">
                          <CheckCircle className={`h-4 w-4 text-${sector.color}-500 mr-2 flex-shrink-0 mt-0.5`} />
                          <span className="text-slate-700">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <CTASectionTekup
            badge="Transformez votre entreprise avec l'IA"
            title="Demandez un audit gratuit de vos cas d'usage IA"
            description="Nos experts analysent vos processus métiers et identifient les opportunités concrètes d'intégration de l'intelligence artificielle pour améliorer votre productivité et votre compétitivité."
            primaryCTA={{
              text: "Demander un Audit IA Gratuit",
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
