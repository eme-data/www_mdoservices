import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Phone, Video, MessageSquare, Code, Globe, Shield, Check, ArrowLeft, Share2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import BackButton from "@/components/BackButton"

export default function WazoDetails() {
  const navigate = useNavigate()

  return (
    <TekupPageLayout>
      <div className="pt-24">
        <Helmet>
          <title>Wazo - Plateforme de Communication Unifiée Open-Source | MDO SERVICES</title>
          <meta name="description" content="Découvrez Wazo, la plateforme de communication programmable et open-source. Téléphonie, visioconférence et collaboration sur-mesure. Expert Wazo en Occitanie." />
          <meta name="keywords" content="Wazo, communication unifiée, open-source, API, téléphonie, Toulouse, Occitanie" />
          <link rel="canonical" href="https://mdoservices.fr/solutions-telecom/wazo" />
        </Helmet>

        <BackButton to="/solutions-telecom" />
        
        <main className="pt-0">
          <section className="py-16 md:py-20 hero-gradient text-white">
            <div className="container mx-auto px-4 text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-center items-center gap-4">
                  <Share2 size={40} /> Wazo - Communications Programmables
                </div>
              </motion.h1>
              <motion.p 
                className="text-xl text-blue-100 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                La plateforme de communication unifiée, open-source et API-first pour une flexibilité totale.
              </motion.p>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                  <motion.div 
                    className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Fonctionnalités Clés</h2>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Plateforme de communication unifiée 100% open-source.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Approche API-first pour des intégrations et personnalisations poussées.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Téléphonie d'entreprise, visioconférence et outils de collaboration.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Hautement évolutive, sécurisée et garantissant la souveraineté des données.</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Bénéfices pour votre entreprise</h2>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Contrôle total sur votre infrastructure de communication.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Créez des workflows de communication uniques adaptés à vos métiers.</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Évitez la dépendance à un fournisseur (vendor lock-in) grâce à l'open-source.</span>
                      </li>
                       <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Intégrez facilement vos outils existants via un écosystème riche.</span>
                      </li>
                    </ul>
                  </motion.div>
                </div>
                
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-xl text-slate-700 dark:text-slate-200 mb-6">
                    Prêt à bâtir votre communication sur-mesure avec Wazo ?
                  </p>
                  <Button size="lg" onClick={() => navigate("/contact")} className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                    Contactez notre équipe d'experts
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </TekupPageLayout>
  )
}