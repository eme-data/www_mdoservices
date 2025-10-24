import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail, Calendar, Users, Check, FileText, Video } from "lucide-react"
import { SolutionCard } from "@/components/SolutionCard"
import BackButton from "@/components/BackButton"
import { PageLayout } from "@/components/layout/PageLayout"

export default function GoogleWorkspaceDetails() {
  const handleContact = () => {
    window.location.href = "mailto:mathieu@mdoservices.fr?subject=Demande de contact MDO SERVICES - Google Workspace"
  }

  return (
    <PageLayout>
      <div className="pt-24">
        <BackButton to="/cloud-services" /> {/* Changed from /solutions to /cloud-services */}
        
        <section className="hero-gradient text-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Google Workspace</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Suite collaborative complète pour votre entreprise
              </p>
              <Button onClick={handleContact} className="premium-button text-white">
                Demander un devis
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <SolutionCard
                icon={<Mail className="h-12 w-12 text-blue-600" />}
                title="Gmail Professionnel"
                description="Messagerie professionnelle"
                features={[
                  "Email personnalisé",
                  "Protection anti-spam",
                  "Intégration Calendar",
                  "15 Go de stockage"
                ]}
              />

              <SolutionCard
                icon={<FileText className="h-12 w-12 text-blue-600" />}
                title="Google Docs"
                description="Suite bureautique en ligne"
                features={[
                  "Docs, Sheets, Slides",
                  "Collaboration en temps réel",
                  "Stockage Drive",
                  "Partage simplifié"
                ]}
              />

              <SolutionCard
                icon={<Video className="h-12 w-12 text-blue-600" />}
                title="Google Meet"
                description="Visioconférence professionnelle"
                features={[
                  "Réunions HD",
                  "Partage d'écran",
                  "Chat intégré",
                  "Enregistrement"
                ]}
              />
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités Principales</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Communication</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Gmail professionnel personnalisé</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Google Chat intégré</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Visioconférence HD</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Agenda partagé</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <h3 className="text-xl font-bold mb-4">Productivité</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Suite Google Workspace complète</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Stockage Google Drive</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Sites Google</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-blue-600 mr-2" />
                      <span>Administration centralisée</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            <motion.div 
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Optimisez votre collaboration</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une démonstration personnalisée de Google Workspace
              </p>
              <Button onClick={handleContact} className="premium-button text-white">
                Demander un devis
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}