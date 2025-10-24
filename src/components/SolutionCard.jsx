import React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

export function SolutionCard({ icon, title, description, features }) {
  return (
    <motion.div 
      className="premium-card rounded-xl p-6"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="feature-icon mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <Check className="h-4 w-4 text-blue-600 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}