import React, { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { Menu, X, ChevronDown, Briefcase, Cloud, ShieldCheck, PhoneCall, Newspaper, Users } from "lucide-react"

const navItems = [
  { name: "Accueil", path: "/" },
  { 
    name: "Solutions", 
    path: "/solutions",
    dropdown: [
      { name: "Toutes les Solutions", path: "/solutions" },
      { name: "Services Cloud", path: "/cloud-services" },
      { name: "Cybersécurité", path: "/cybersecurity" },
      { name: "Solutions Télécom", path: "/solutions-telecom" },
      { name: "Infogérance Premium", path: "/premium-management" },
    ]
  },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
]

const iconMap = {
  "Toutes les Solutions": Briefcase,
  "Services Cloud": Cloud,
  "Cybersécurité": ShieldCheck,
  "Solutions Télécom": PhoneCall,
  "Infogérance Premium": Users,
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()
  const dropdownTimeoutRef = useRef(null);

  const pagesWithSolidNav = [
    '/blog', 
    '/rendez-vous', 
    '/contact', 
    '/solutions', 
    '/mentions-legales', 
    '/politique-confidentialite', 
    '/partner',
    '/cloud-services',
    '/cybersecurity',
    '/solutions-telecom',
    '/premium-management',
    '/cloud-services/microsoft-365',
    '/cloud-services/google-workspace',
    '/solutions-telecom/3cx',
    '/solutions-telecom/aircall',
    '/cybersecurity/bitwarden',
    '/cybersecurity/mailinblack',
    '/cybersecurity/ninjarmm',
    '/cybersecurity/proxmox',
    '/cybersecurity/sentinelone',
    '/cybersecurity/keepersecurity',
    '/support',
    '/cloud-enterprise',
    '/internet-access',
  ];

  const alwaysShowSolidBackground = pagesWithSolidNav.some(pagePath => location.pathname.startsWith(pagePath));


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const handleMouseEnterDropdown = (itemName) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(itemName);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const navBarIsSolid = isScrolled || isOpen || alwaysShowSolidBackground;

  const NavLink = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.path || (item.dropdown && location.pathname.startsWith(item.path))
    
    const textColorClass = navBarIsSolid ? 
      (isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400") :
      (isActive ? "text-blue-300" : "text-white hover:text-blue-300")


    if (item.dropdown) {
      return (
        <div 
          className="relative"
          onMouseEnter={() => !mobile && handleMouseEnterDropdown(item.name)}
          onMouseLeave={() => !mobile && handleMouseLeaveDropdown()}
        >
          <button
            onClick={() => mobile ? setOpenDropdown(openDropdown === item.name ? null : item.name) : null}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${textColorClass} ${mobile ? "w-full justify-between" : ""}`}
            aria-expanded={openDropdown === item.name}
            aria-haspopup="true"
          >
            {item.name}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                openDropdown === item.name ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {openDropdown === item.name && (
              <motion.div
                id={`dropdown-${item.name.replace(/\s+/g, '-')}`}
                initial={{ opacity: 0, y: mobile ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: mobile ? 0 : 10 }}
                transition={{ duration: 0.2 }}
                className={mobile ? "pl-4 mt-1 space-y-1" : "absolute z-20 mt-1 w-64 bg-white dark:bg-slate-800 shadow-lg rounded-md ring-1 ring-black ring-opacity-5 py-1"}
              >
                {item.dropdown.map((subItem) => {
                  const Icon = iconMap[subItem.name] || Newspaper
                  return (
                    <Link
                      key={subItem.name}
                      to={subItem.path}
                      className={`flex items-center px-4 py-2 text-sm ${
                        location.pathname === subItem.path ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                      } ${mobile ? "rounded-md" : ""}`}
                      onClick={() => setOpenDropdown(null)} 
                    >
                      <Icon size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                      {subItem.name}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <Link
        to={item.path}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${textColorClass} ${mobile ? "block" : ""}`}
      >
        {item.name}
      </Link>
    )
  }
  
  const logoTextColorClass = navBarIsSolid ? "text-slate-800 dark:text-white" : "text-white";
  const mobileMenuButtonColorClass = navBarIsSolid ? 'text-gray-700 dark:text-gray-300' : 'text-white';

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        navBarIsSolid ? "bg-white dark:bg-slate-900 shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 h-10">
            <Logo className="h-full" showText={true} textColorClassName={logoTextColorClass} />
          </Link>
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              <Link to="/contact">Demander un devis</Link>
            </Button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className={`${mobileMenuButtonColorClass} hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none`}
              aria-label="Ouvrir le menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} mobile={true} />
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-slate-700">
              <div className="px-5">
                <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105">
                  <Link to="/contact">Demander un devis</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}