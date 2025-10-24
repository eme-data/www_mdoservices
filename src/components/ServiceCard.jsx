import React from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export function ServiceCard({ icon, title, description, link }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="service-card-icon">
        {icon}
      </div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
      <Link to={link} className="service-card-link">
        En savoir plus
        <ChevronRight className="ml-2 h-4 w-4" />
      </Link>
    </motion.div>
  )
}