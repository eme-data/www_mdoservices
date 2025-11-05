import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Headphones,
  Phone,
  BarChart3,
  FileText,
  Package,
  Settings,
  BookOpen,
  TrendingUp,
  LogOut,
  ExternalLink,
  Clock,
  Users
} from "lucide-react"

export default function ClientDashboard() {
  const navigate = useNavigate()
  const [clientName, setClientName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("client-authenticated")
    if (!isAuthenticated) {
      navigate("/client")
      return
    }

    // Récupérer le nom du client
    const name = localStorage.getItem("client-name") || "Client"
    setClientName(name)

    // Vérifier si l'utilisateur est admin
    const adminStatus = localStorage.getItem("client-admin") === "true"
    setIsAdmin(adminStatus)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("client-authenticated")
    localStorage.removeItem("client-name")
    localStorage.removeItem("client-admin")
    localStorage.removeItem("client-remember")
    navigate("/client")
  }

  const adminServices = [
    {
      icon: Users,
      title: "Gestion des Utilisateurs",
      description: "Créez et gérez les comptes utilisateurs de votre espace client",
      url: "/client/users",
      color: "from-red-500 to-red-600",
      available: true,
      external: false,
      adminOnly: true
    }
  ]

  const services = [
    {
      icon: Headphones,
      title: "Support Client",
      description: "Créez et suivez vos tickets de support directement depuis votre espace",
      url: "/client/tickets",
      color: "from-blue-500 to-blue-600",
      available: true,
      external: false
    },
    {
      icon: Phone,
      title: "Suivi Télécom",
      description: "Gérez vos lignes téléphoniques et consultez vos statistiques d'appels",
      url: "https://portail.mdoservices.fr/",
      color: "from-green-500 to-green-600",
      available: true,
      external: true
    },
    {
      icon: BarChart3,
      title: "Statistiques SharePoint",
      description: "Visualisez l'utilisation de votre SharePoint et OneDrive",
      url: "/client/sharepoint",
      color: "from-purple-500 to-purple-600",
      available: true,
      external: false
    },
    {
      icon: FileText,
      title: "Mes Factures",
      description: "Consultez et téléchargez vos factures en ligne",
      url: "#",
      color: "from-orange-500 to-orange-600",
      available: false,
      comingSoon: true
    },
    {
      icon: Package,
      title: "Mes Services",
      description: "Vue d'ensemble de tous vos services et abonnements actifs",
      url: "#",
      color: "from-teal-500 to-teal-600",
      available: false,
      comingSoon: true
    },
    {
      icon: Settings,
      title: "Gestion du Compte",
      description: "Modifiez vos informations et préférences de compte",
      url: "#",
      color: "from-slate-500 to-slate-600",
      available: false,
      comingSoon: true
    },
    {
      icon: BookOpen,
      title: "Base de Connaissances",
      description: "Documentation, guides et FAQ pour vos services",
      url: "#",
      color: "from-indigo-500 to-indigo-600",
      available: false,
      comingSoon: true
    },
    {
      icon: TrendingUp,
      title: "Reporting",
      description: "Rapports détaillés d'utilisation de vos services cloud",
      url: "#",
      color: "from-pink-500 to-pink-600",
      available: false,
      comingSoon: true
    }
  ]

  const handleServiceClick = (service) => {
    if (!service.available) return

    if (service.external) {
      window.open(service.url, '_blank')
    } else {
      navigate(service.url)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <Helmet>
        <title>Dashboard Client - MDO SERVICES</title>
        <meta name="description" content="Accédez à tous vos services MDO Services depuis votre espace client." />
      </Helmet>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                MDO Services
              </h1>
              <span className="hidden md:inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Espace Client
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-700 font-medium hidden sm:inline">
                {clientName}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Bienvenue, {clientName} 👋
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Accédez à tous vos services et gérez votre compte en quelques clics
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Admin Services */}
          {isAdmin && adminServices.map((service, index) => (
            <motion.div
              key={`admin-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleServiceClick(service)}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-200 relative group ${
                service.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
              }`}
            >
              {/* Admin Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Admin
                </span>
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-7 w-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
                {service.title}
                {service.external && service.available && (
                  <ExternalLink className="h-4 w-4 ml-2 text-slate-400" />
                )}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Button */}
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-50 group-hover:border-red-400"
              >
                Accéder
              </Button>
            </motion.div>
          ))}

          {/* Regular Services */}
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleServiceClick(service)}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 relative group ${
                service.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
              }`}
            >
              {/* Coming Soon Badge */}
              {service.comingSoon && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                    <Clock className="h-3 w-3 mr-1" />
                    Bientôt
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-7 w-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
                {service.title}
                {service.external && service.available && (
                  <ExternalLink className="h-4 w-4 ml-2 text-slate-400" />
                )}
              </h3>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Button */}
              {service.available ? (
                <Button
                  variant="outline"
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 group-hover:border-slate-400"
                >
                  Accéder
                  {service.external && <ExternalLink className="h-4 w-4 ml-2" />}
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outline"
                  className="w-full"
                >
                  Bientôt disponible
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left flex-1">
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Besoin d'assistance ?
                </h3>
                <p className="text-slate-600">
                  Notre équipe support est disponible 24/7 pour répondre à vos questions
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => navigate('/client/tickets')}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6"
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Ouvrir un ticket
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-6"
                >
                  Nous contacter
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-20 pb-8 text-center text-sm text-slate-500">
        <p>© 2024 MDO Services - Tous droits réservés</p>
      </footer>
    </div>
  )
}
