import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Server, Shield, Clock, Users, ChevronRight, Check, X, Zap, HeadphonesIcon, Award } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PricingFeature } from "@/components/PricingFeature"
import { ComparisonRow } from "@/components/ComparisonRow"
import BackButton from "@/components/BackButton"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function PremiumManagement() {
  const navigate = useNavigate()

  const handleContact = () => {
    window.location.href = "mailto:contact@mdoservices.fr?subject=Demande de contact MDO SERVICES - Infogérance Premium"
  }

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />

        <main className="pt-0">
          {/* Hero Section */}
          <SolutionHeroTekup
            badge="Infogérance Premium"
            title="Gestion complète de votre <span class='bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>infrastructure IT</span>"
            description="Confiez-nous la gestion de votre parc informatique et concentrez-vous sur votre cœur de métier. Support 24/7, supervision proactive, et expertise dédiée."
            primaryCTA={{
              text: "Demander un Devis",
              onClick: handleContact
            }}
            secondaryCTA={{
              text: "Voir les Offres",
              link: "#offres"
            }}
            stats={[
              { value: "50+", label: "Clients Infogérés" },
              { value: "24/7", label: "Support Disponible" },
              { value: "< 2h", label: "Temps de Réponse" },
              { value: "99%", label: "Satisfaction Client" }
            ]}
          />

          <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full inline-block">
                      <Server className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">Infrastructure Managée</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Gestion complète de votre parc informatique et de vos serveurs.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-lime-400 rounded-full inline-block">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">Sécurité Proactive</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Protection avancée et surveillance continue de votre système.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full inline-block">
                      <Clock className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">Support 24/7</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Une équipe d'experts disponible en permanence pour vous assister.
                  </p>
                </motion.div>

                <motion.div 
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-full inline-block">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-100">Support Utilisateurs</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Assistance dédiée pour tous vos collaborateurs.
                  </p>
                </motion.div>
              </div>

              {/* Pricing Section */}
              <div id="offres" className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Nos Offres d'Infogérance
                  </h2>
                  <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    Choisissez la formule adaptée à la taille et aux besoins de votre entreprise
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Basic Plan */}
                  <div className="pricing-card bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Essentiel</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Pour les petites entreprises</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">29€</span>
                      <span className="text-gray-600 dark:text-gray-400">/utilisateur/mois</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <PricingFeature included>Support technique 8h-18h</PricingFeature>
                      <PricingFeature included>Supervision basique</PricingFeature>
                      <PricingFeature included>Antivirus</PricingFeature>
                      <PricingFeature>Support 24/7</PricingFeature>
                      <PricingFeature>Audit sécurité</PricingFeature>
                    </ul>
                    <Button onClick={handleContact} className="w-full bg-slate-700 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white">Commencer</Button>
                  </div>

                  {/* Pro Plan */}
                  <div className="pro-card rounded-2xl p-8 shadow-xl transform md:scale-105 border-2 border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-500 to-teal-500 dark:from-blue-600 dark:to-teal-600">
                    <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                    <p className="text-blue-100 dark:text-blue-200 mb-6">Pour les entreprises en croissance</p>
                    <div className="mb-8 text-white">
                      <span className="text-4xl font-bold">49€</span>
                      <span className="text-blue-100 dark:text-blue-200">/utilisateur/mois</span>
                    </div>
                    <ul className="space-y-4 mb-8 text-white">
                      <PricingFeature included light>Support technique 24/7</PricingFeature>
                      <PricingFeature included light>Supervision avancée</PricingFeature>
                      <PricingFeature included light>Suite sécurité complète</PricingFeature>
                      <PricingFeature included light>Audit trimestriel</PricingFeature>
                      <PricingFeature included light>Backup cloud</PricingFeature>
                    </ul>
                    <Button onClick={handleContact} className="w-full bg-white text-blue-600 hover:bg-blue-50 dark:bg-slate-100 dark:text-blue-700 dark:hover:bg-slate-200">
                      Commencer
                    </Button>
                  </div>

                  {/* Enterprise Plan */}
                  <div className="pricing-card bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Enterprise</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Pour les grandes entreprises</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">Sur mesure</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      <PricingFeature included>Support dédié 24/7</PricingFeature>
                      <PricingFeature included>Supervision premium</PricingFeature>
                      <PricingFeature included>Sécurité personnalisée</PricingFeature>
                      <PricingFeature included>Audit mensuel</PricingFeature>
                      <PricingFeature included>Solutions sur mesure</PricingFeature>
                    </ul>
                    <Button onClick={handleContact} className="w-full bg-slate-700 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white">Nous contacter</Button>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="mt-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                  <table className="w-full comparison-table">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                      <tr>
                        <th className="text-left p-4 text-slate-700 dark:text-slate-200">Fonctionnalités</th>
                        <th className="text-center p-4 text-slate-700 dark:text-slate-200">Essentiel</th>
                        <th className="text-center p-4 highlight-column bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Pro</th>
                        <th className="text-center p-4 text-slate-700 dark:text-slate-200">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <ComparisonRow 
                        feature="Support technique"
                        basic="8h-18h"
                        pro="24/7"
                        enterprise="Dédié 24/7"
                      />
                      <ComparisonRow 
                        feature="Temps de réponse"
                        basic="< 4h"
                        pro="< 2h"
                        enterprise="< 30min"
                      />
                      <ComparisonRow 
                        feature="Supervision"
                        basic="Basique"
                        pro="Avancée"
                        enterprise="Premium"
                      />
                      <ComparisonRow 
                        feature="Sécurité"
                        basic="Antivirus"
                        pro="Suite complète"
                        enterprise="Personnalisée"
                      />
                      <ComparisonRow 
                        feature="Audit"
                        basic="Annuel"
                        pro="Trimestriel"
                        enterprise="Mensuel"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <CTASectionTekup
            badge="Libérez-vous de la gestion IT"
            title="Demandez votre devis d'infogérance sur mesure"
            description="Nos experts analysent vos besoins et vous proposent une solution d'infogérance adaptée à votre infrastructure avec un tarif transparent."
            primaryCTA={{
              text: "Demander un Devis Gratuit",
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