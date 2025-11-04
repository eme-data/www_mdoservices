import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Cloud,
  Shield,
  Server,
  Phone,
  Wifi,
  Mail,
  Camera,
  Network,
  Brain,
  ArrowRight
} from "lucide-react"

const services = [
  {
    icon: Cloud,
    title: "Suites Collaboratives",
    description: "Microsoft 365, Google Workspace et solutions collaboratives adaptées à vos besoins",
    link: "/cloud-services",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    description: "Protection avancée et sécurisation complète de vos systèmes informatiques",
    link: "/cybersecurity",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: Server,
    title: "Infogérance Premium",
    description: "Support et maintenance proactive de votre infrastructure IT 24/7",
    link: "/premium-management",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: Phone,
    title: "Solutions Télécom",
    description: "Téléphonie IP, 3CX, Aircall et communications unifiées professionnelles",
    link: "/solutions-telecom",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  },
  {
    icon: Wifi,
    title: "Accès Internet",
    description: "Solutions de connectivité fibre optique professionnelle haute performance",
    link: "/internet-access",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600"
  },
  {
    icon: Mail,
    title: "Cloud Entreprise",
    description: "Infrastructure cloud sur mesure hébergée en France avec redondance datacenter Europe",
    link: "/cloud-entreprise",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600"
  },
  {
    icon: Network,
    title: "Infrastructure Réseaux & WiFi",
    description: "Conception et déploiement de réseaux professionnels avec WiFi haute performance",
    link: "/infrastructure-reseaux",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600"
  },
  {
    icon: Camera,
    title: "Vidéosurveillance & Contrôle d'Accès",
    description: "Solutions complètes : caméras 4K, enregistrement cloud, badges RFID et biométrie",
    link: "/videosurveillance",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600"
  },
  {
    icon: Brain,
    title: "Intégration IA",
    description: "Intégrez l'intelligence artificielle au cœur de vos processus métiers",
    link: "/integration-ia",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  }
]

export function ServicesSectionTekup() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Nos Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solutions IT complètes pour
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              votre entreprise
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            De l'infrastructure cloud à la cybersécurité, nous couvrons tous vos besoins IT en Ariège et Haute-Garonne
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Besoin d'une solution personnalisée ?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 group"
          >
            Contactez-nous
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={service.link} className="block group h-full">
        <div className="relative h-full min-h-[380px] bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

          {/* Icon Container */}
          <div className="relative mb-6">
            <div className={`inline-flex p-4 ${service.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`w-8 h-8 ${service.iconColor}`} />
            </div>
            {/* Decorative Circle */}
            <div className={`absolute -z-10 top-0 left-0 w-16 h-16 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300`}></div>
          </div>

          {/* Content */}
          <div className="relative flex-1 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed flex-1">
              {service.description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-2 text-blue-600 font-semibold group mt-auto">
              <span>En savoir plus</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>

          {/* Corner Accent */}
          <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
        </div>
      </Link>
    </motion.div>
  )
}
