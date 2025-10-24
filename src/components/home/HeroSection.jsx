import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function HeroSection({ scrollToServices }) {
  return (
    <section className="pt-32 pb-20 hero-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            MDO SERVICES
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-100">
            Expert IT & Cloud en Ariège et Haute-Garonne
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Solutions IT innovantes pour les entreprises de Foix, Pamiers, Toulouse et sa région
          </p>
          <Button onClick={scrollToServices} className="premium-button text-white">
            Commencer maintenant
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}