import React from "react"
import { motion } from "framer-motion"

/**
 * FeaturesSectionTekup - Section features moderne avec icônes et animations
 *
 * Props:
 * - title: Titre de la section
 * - subtitle: Sous-titre (optionnel)
 * - features: Array de { icon, title, description, color }
 *   - icon: Composant Lucide React icon
 *   - title: Titre du feature
 *   - description: Description
 *   - color: Couleur du gradient (ex: "blue", "purple", "pink")
 */
export function FeaturesSectionTekup({ title, subtitle, features }) {
  const colorGradients = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    pink: "from-pink-500 to-rose-500",
    green: "from-green-500 to-emerald-500",
    orange: "from-orange-500 to-amber-500",
    red: "from-red-500 to-pink-500",
    indigo: "from-indigo-500 to-purple-500",
    teal: "from-teal-500 to-cyan-500"
  }

  const colorBackgrounds = {
    blue: "bg-blue-50",
    purple: "bg-purple-50",
    pink: "bg-pink-50",
    green: "bg-green-50",
    orange: "bg-orange-50",
    red: "bg-red-50",
    indigo: "bg-indigo-50",
    teal: "bg-teal-50"
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const gradient = colorGradients[feature.color || "blue"]
            const background = colorBackgrounds[feature.color || "blue"]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${background} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-gradient-to-br ${gradient} p-3 rounded-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
