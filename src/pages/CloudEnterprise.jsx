import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Server, Cloud, Shield, Database, Network, ArrowRight } from "lucide-react"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { PageLayout } from "@/components/layout/PageLayout"

export default function CloudEnterprise() {
  return (
    <PageLayout>
      <div className="pt-24"> {/* Added padding top for fixed Navigation */}
        <BackButton to="/solutions" /> {/* Assuming this page is a sub-page of solutions */}

        {/* Hero Section */}
        <section className="pt-8 pb-20"> {/* Adjusted padding */}
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Solutions Cloud Enterprise
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                Transformez votre infrastructure avec nos solutions cloud sur mesure
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              <SolutionCard
                icon={<Server className="h-8 w-8 text-blue-600" />}
                title="Serveurs Cloud Infogérés"
                description="Infrastructure cloud haute performance avec support 24/7"
                features={[
                  "Supervision proactive 24/7",
                  "Maintenance préventive",
                  "Sauvegardes automatisées",
                  "Support technique dédié",
                  "Scalabilité à la demande"
                ]}
              />
              <SolutionCard
                icon={<Cloud className="h-8 w-8 text-blue-600" />}
                title="Migration Cloud"
                description="Transition en douceur de vos serveurs vers le cloud"
                features={[
                  "Audit de l'infrastructure existante",
                  "Plan de migration personnalisé",
                  "Migration sans interruption",
                  "Tests et validation",
                  "Formation des utilisateurs"
                ]}
              />
              <SolutionCard
                icon={<Database className="h-8 w-8 text-blue-600" />}
                title="Solutions Hybrides"
                description="Le meilleur des deux mondes : cloud et on-premise"
                features={[
                  "Intégration cloud-onprem",
                  "Optimisation des coûts",
                  "Haute disponibilité",
                  "Disaster Recovery",
                  "Gestion unifiée"
                ]}
              />
            </div>

            {/* Features Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-20">
              <h2 className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">Pourquoi choisir nos solutions cloud ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-200">Sécurité maximale</h3>
                    <p className="text-gray-600 dark:text-gray-300">Protection avancée contre les cybermenaces, conformité RGPD, chiffrement des données</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Network className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-200">Performance optimale</h3>
                    <p className="text-gray-600 dark:text-gray-300">Infrastructure haute performance, temps de réponse minimal, disponibilité 99.9%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ArrowRight className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-200">Évolutivité garantie</h3>
                    <p className="text-gray-600 dark:text-gray-300">Ressources adaptables à vos besoins, scalabilité instantanée, flexibilité totale</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Cloud className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-200">Support expert</h3>
                    <p className="text-gray-600 dark:text-gray-300">Équipe dédiée 24/7, maintenance proactive, conseil personnalisé</p>
                  </div>
                </div>
              </div>
            </div>
             <div className="text-center">
                <Button onClick={() => window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Solutions Cloud Enterprise"} className="premium-button text-white">
                    Contactez-nous
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}