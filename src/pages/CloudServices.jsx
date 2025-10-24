import React from "react"
import { PageLayout } from "@/components/layout/PageLayout"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChevronRight, Layers, Grid3X3, ServerCog } from "lucide-react"
import BackButton from "@/components/BackButton"

export default function CloudServices() {
  return (
    <PageLayout>
      <div className="pt-24">
        <BackButton to="/solutions" />
        
        <main className="pt-0">
          <section className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100">Services Cloud</h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
                Des solutions collaboratives puissantes et des infrastructures cloud sur mesure pour optimiser votre productivité et votre agilité.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-2xl dark:hover:shadow-blue-500/30 transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-white mr-4 shadow-md">
                    <Layers size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Microsoft 365</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                  Suite complète d'outils de productivité Microsoft incluant Exchange, SharePoint, et Teams.
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto">
                  <Link to="/cloud-services/microsoft-365">
                    En savoir plus
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, x: 0 }} // Adjusted for center column animation
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }} // Adjusted delay
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-2xl dark:hover:shadow-green-500/30 transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center mb-6">
                   <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-yellow-400 text-white mr-4 shadow-md">
                    <Grid3X3 size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Google Workspace</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                  Suite collaborative Google avec Gmail, Drive, Meet et tous les outils Google.
                </p>
                 <Button asChild className="w-full bg-gradient-to-r from-green-600 to-yellow-500 hover:from-green-700 hover:to-yellow-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto">
                  <Link to="/cloud-services/google-workspace">
                    En savoir plus
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 hover:shadow-2xl dark:hover:shadow-purple-500/30 transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center mb-6">
                   <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-400 text-white mr-4 shadow-md">
                    <ServerCog size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Hébergement & Migration Cloud</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 flex-grow">
                  Solutions d'hébergement performantes et migration sécurisée de vos infrastructures vers nos clouds privés ou publics.
                </p>
                 <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mt-auto">
                  {/* Update this link when the detail page is created */}
                  <Link to="/cloud-enterprise"> 
                    En savoir plus
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </PageLayout>
  )
}