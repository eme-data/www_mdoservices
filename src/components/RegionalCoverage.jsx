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
          <h2 className="text-3xl font-bold mb-4">Notre Couverture en Occitanie</h2>
          <p className="text-xl text-gray-700 font-semibold mb-2">Expert IT présent dans toute la région Occitanie</p>
          <p className="text-lg text-gray-600">Zones d'intervention prioritaires : Ariège, Haute-Garonne et Aveyron</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100"
          >
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-blue-600">Ariège (09)</h3>
            <p className="text-sm text-gray-500 mb-3 font-semibold">Zone prioritaire</p>
            <ul className="text-gray-600 space-y-2 text-sm">
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
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100"
          >
            <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-blue-600">Haute-Garonne (31)</h3>
            <p className="text-sm text-gray-500 mb-3 font-semibold">Zone prioritaire</p>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Toulouse</li>
              <li>• Muret</li>
              <li>• Saint-Gaudens</li>
              <li>• Colomiers</li>
              <li>• Tournefeuille</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100"
          >
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-blue-600">Aveyron (12)</h3>
            <p className="text-sm text-gray-500 mb-3 font-semibold">Zone prioritaire</p>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Rodez</li>
              <li>• Millau</li>
              <li>• Villefranche-de-Rouergue</li>
              <li>• Decazeville</li>
              <li>• Onet-le-Château</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <Users2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">Toute l'Occitanie</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Aude (11)</li>
              <li>• Gard (30)</li>
              <li>• Gers (32)</li>
              <li>• Hérault (34)</li>
              <li>• Lot (46)</li>
              <li>• Lozère (48)</li>
              <li>• Hautes-Pyrénées (65)</li>
              <li>• Pyrénées-Orientales (66)</li>
              <li>• Tarn (81)</li>
              <li>• Tarn-et-Garonne (82)</li>
            </ul>
          </motion.div>
        </div>

        {/* Section Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Nos Services sur Toute l'Occitanie</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🏢</span>
              <span className="text-sm">Support sur site</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🔧</span>
              <span className="text-sm">Maintenance</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🌐</span>
              <span className="text-sm">Installation réseau</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">☁️</span>
              <span className="text-sm">Solutions cloud</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-2">🔒</span>
              <span className="text-sm">Cybersécurité</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}