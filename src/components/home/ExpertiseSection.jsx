import React from "react"
import { motion } from "framer-motion"
import { ExpertiseCard } from "@/components/ExpertiseCard"
import { Shield, Cloud, Users } from "lucide-react"

export function ExpertiseSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Notre Expertise</h2>
          <p className="text-xl text-gray-600">
            Une approche complète pour votre transformation numérique
          </p>
        </motion.div>

        <div className="expertise-grid">
          <ExpertiseCard
            icon={<Shield className="h-6 w-6 text-blue-600" />}
            title="Sécurité Maximale"
            description="Protection avancée contre les cybermenaces et conformité aux normes de sécurité."
          />
          <ExpertiseCard
            icon={<Cloud className="h-6 w-6 text-blue-600" />}
            title="Solutions Cloud"
            description="Migration et gestion de vos données dans le cloud en toute sécurité."
          />
          <ExpertiseCard
            icon={<Users className="h-6 w-6 text-blue-600" />}
            title="Support 24/7"
            description="Une équipe d'experts disponible en permanence pour vous accompagner."
          />
        </div>
      </div>
    </section>
  )
}