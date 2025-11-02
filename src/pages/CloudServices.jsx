import React from "react"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import {
  ChevronRight,
  Layers,
  Grid3X3,
  ServerCog,
  Cloud,
  Shield,
  Zap,
  Users,
  HeadphonesIcon,
  TrendingUp
} from "lucide-react"

export default function CloudServices() {
  // Features - Pourquoi choisir nos services cloud
  const features = [
    {
      icon: Cloud,
      title: "Infrastructure Scalable",
      description: "Des solutions cloud qui s'adaptent à votre croissance avec une flexibilité totale.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Protection avancée de vos données avec chiffrement et sauvegardes automatiques.",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Performance Optimale",
      description: "Infrastructure haute performance garantissant rapidité et disponibilité 99.9%.",
      color: "orange"
    },
    {
      icon: Users,
      title: "Collaboration Facilitée",
      description: "Travaillez en équipe de manière fluide avec des outils collaboratifs puissants.",
      color: "green"
    },
    {
      icon: HeadphonesIcon,
      title: "Support Expert 24/7",
      description: "Une équipe dédiée disponible à tout moment pour vous accompagner.",
      color: "red"
    },
    {
      icon: TrendingUp,
      title: "ROI Garanti",
      description: "Réduisez vos coûts IT tout en augmentant votre productivité et agilité.",
      color: "indigo"
    }
  ]

  // Stats pour le hero
  const stats = [
    { label: "Clients satisfaits", value: "50+" },
    { label: "Uptime garanti", value: "99.9%" },
    { label: "Support réactif", value: "< 2h" }
  ]

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Suites Collaboratives - Microsoft 365, Google Workspace | MDO Services</title>
        <meta name="description" content="Suites collaboratives professionnelles : Microsoft 365, Google Workspace. Optimisez la productivité et la collaboration de vos équipes avec MDO Services." />
        <meta name="keywords" content="suites collaboratives, microsoft 365, google workspace, productivité, collaboration, saas, ariège, occitanie" />
      </Helmet>

      <div className="pt-20">
        {/* Hero Section avec composant Tekup */}
        <SolutionHeroTekup
          badge="Suites Collaboratives"
          title="Suites Collaboratives Professionnelles"
          subtitle="Propulsez votre entreprise avec des outils de collaboration modernes"
          description="Microsoft 365 et Google Workspace : nous vous accompagnons dans votre transformation digitale pour plus de productivité, de collaboration et d'agilité."
          stats={stats}
          ctaText="Découvrir nos offres"
          ctaLink="#services"
        />

        {/* Section Cards Services - Version améliorée */}
        <section id="services" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nos Suites Collaboratives
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Choisissez la suite collaborative qui correspond le mieux à vos besoins
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Microsoft 365 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Layers size={32} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                    Microsoft 365
                  </h3>

                  <div className="flex-grow">
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      Suite complète d'outils de productivité Microsoft incluant Exchange, SharePoint, Teams et OneDrive pour une collaboration optimale.
                    </p>

                    <div className="mb-6 space-y-2">
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                        <span>Outlook, Word, Excel, PowerPoint</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                        <span>Teams pour la collaboration</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                        <span>1TB de stockage OneDrive</span>
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl mt-auto">
                    <Link to="/solutions/microsoft-365">
                      En savoir plus
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Google Workspace */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 flex flex-col border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-yellow-400 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Grid3X3 size={32} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                    Google Workspace
                  </h3>

                  <div className="flex-grow">
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      Suite collaborative Google avec Gmail, Drive, Meet et tous les outils Google pour travailler en équipe efficacement.
                    </p>

                    <div className="mb-6 space-y-2">
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
                        <span>Gmail professionnel</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
                        <span>Google Drive illimité</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                        <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
                        <span>Meet pour la visioconférence</span>
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl mt-auto">
                    <Link to="/solutions/google-workspace">
                      En savoir plus
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Features avec composant Tekup */}
        <FeaturesSectionTekup
          title="Pourquoi choisir nos suites collaboratives ?"
          subtitle="Des solutions complètes pour optimiser la productivité de vos équipes"
          features={features}
        />

        {/* Section CTA avec composant Tekup */}
        <CTASectionTekup
          title="Prêt à optimiser votre collaboration ?"
          description="Discutons de vos besoins et trouvons ensemble la suite collaborative idéale pour votre entreprise."
          primaryButtonText="Demander un devis"
          primaryButtonLink="/contact"
          secondaryButtonText="Nous appeler"
          secondaryButtonLink="tel:+33582952277"
          variant="gradient"
        />
      </div>
    </TekupPageLayout>
  )
}
