import React from "react"
import { motion } from "framer-motion"
import { ServiceCard } from "@/components/ServiceCard"
import { Cloud, Shield, Server, Phone, Wifi, Mail } from "lucide-react"

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Nos Services en Ariège et Haute-Garonne</h2>
          <p className="text-xl text-gray-600">
            Des solutions complètes pour votre infrastructure IT
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Cloud className="h-6 w-6 text-blue-600" />}
            title="Solutions Cloud"
            description="Microsoft 365, Google Workspace et solutions cloud entreprise"
            link="/cloud-services"
          />
          <ServiceCard
            icon={<Shield className="h-6 w-6 text-blue-600" />}
            title="Cybersécurité"
            description="Protection et sécurisation de vos systèmes"
            link="/cybersecurity"
          />
          <ServiceCard
            icon={<Server className="h-6 w-6 text-blue-600" />}
            title="Infogérance"
            description="Support et maintenance de votre parc informatique"
            link="/premium-management"
          />
          <ServiceCard
            icon={<Phone className="h-6 w-6 text-blue-600" />}
            title="Solutions Télécom"
            description="Téléphonie IP et communications unifiées"
            link="/solutions-telecom"
          />
          <ServiceCard
            icon={<Wifi className="h-6 w-6 text-blue-600" />}
            title="Accès Internet"
            description="Solutions de connectivité professionnelle"
            link="/internet-access"
          />
          <ServiceCard
            icon={<Mail className="h-6 w-6 text-blue-600" />}
            title="Solutions Cloud Enterprise"
            description="Infrastructure cloud sur mesure"
            link="/cloud-enterprise"
          />
        </div>
      </div>
    </section>
  )
}