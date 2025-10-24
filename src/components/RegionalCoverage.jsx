import React from "react"
import { MapPin, Building2, Users2 } from "lucide-react"
import { motion } from "framer-motion"

export function RegionalCoverage() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Notre Couverture en Occitanie</h2>
          <p className="text-xl text-gray-600">Expert IT présent dans toute l'Ariège et la Haute-Garonne</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Ariège</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Foix</li>
              <li>• Pamiers</li>
              <li>• Saint-Girons</li>
              <li>• Lavelanet</li>
              <li>• Tarascon-sur-Ariège</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Haute-Garonne</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Toulouse</li>
              <li>• Muret</li>
              <li>• Saint-Gaudens</li>
              <li>• Colomiers</li>
              <li>• Tournefeuille</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <Users2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Services Proposés</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Support sur site</li>
              <li>• Maintenance préventive</li>
              <li>• Installation réseau</li>
              <li>• Solutions cloud</li>
              <li>• Cybersécurité</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}