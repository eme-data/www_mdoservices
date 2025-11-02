import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import {
  Menu,
  X,
  ChevronDown,
  Cloud,
  Shield,
  Server,
  Phone,
  Wifi,
  Mail,
  CloudCog
} from "lucide-react"

const navItems = [
  { name: "Accueil", path: "/" },
  {
    name: "Solutions",
    path: "/solutions",
    dropdown: [
      { name: "Suites Collaboratives", path: "/cloud-services", icon: Cloud },
      { name: "Cybersécurité", path: "/cybersecurity", icon: Shield },
      { name: "Infogérance Premium", path: "/premium-management", icon: Server },
      { name: "Solutions Télécom", path: "/solutions-telecom", icon: Phone },
      { name: "Accès Internet", path: "/internet-access", icon: Wifi },
      { name: "Cloud Enterprise", path: "/cloud-enterprise", icon: CloudCog },
    ]
  },
  // { name: "Blog", path: "/blog" }, // 🔹 BLOG DÉSACTIVÉ - Décommenter pour réactiver
  { name: "Contact", path: "/contact" },
]

export function HeaderTekup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  const isHomePage = location.pathname === "/"

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo
              className="h-10"
              showText={true}
              textColorClassName={isScrolled || !isHomePage ? "text-gray-900" : "text-white"}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                        isScrolled || !isHomePage
                          ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                          : "text-white hover:text-blue-200"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                          {item.dropdown.map((subItem) => {
                            const Icon = subItem.icon
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors duration-150 group"
                              >
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                  <Icon className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                                  {subItem.name}
                                </span>
                              </Link>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? isScrolled || !isHomePage
                          ? "text-blue-600 bg-blue-50"
                          : "text-white bg-white/10"
                        : isScrolled || !isHomePage
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white hover:text-blue-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/client" className={`text-sm font-medium ${
              isScrolled || !isHomePage ? "text-gray-600 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>
              Espace Client
            </Link>
            <Link to="/partner" className={`text-sm font-medium ${
              isScrolled || !isHomePage ? "text-gray-600 hover:text-blue-600" : "text-white hover:text-blue-200"
            }`}>
              Espace Partenaire
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
            >
              <Link to="/contact">Demander un devis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled || !isHomePage
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.name && (
                        <div className="mt-2 ml-4 space-y-1">
                          {item.dropdown.map((subItem) => {
                            const Icon = subItem.icon
                            return (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Icon className="w-4 h-4" />
                                {subItem.name}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg ${
                        location.pathname === item.path
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  to="/client"
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Espace Client
                </Link>
                <Link
                  to="/partner"
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Espace Partenaire
                </Link>
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                  <Link to="/contact">Demander un devis</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
