import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { Phone, Mail, MapPin, Users, Server, HardDrive, CalendarDays } from "lucide-react"
import { Link } from "react-router-dom"

export function AppFooter({ handleClientSpace, handlePartnerSpace, handleTelemaintenance, handleRendezVous }) {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
      className="footer-gradient text-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Logo className="h-12 mb-4" showText={true} textColorClassName="text-white" />
            <p className="text-gray-300 text-sm">
              Expert IT & Cloud en Ariège et Occitanie. Solutions innovantes pour les entreprises de Saint-Girons, Foix, Pamiers, Toulouse et sa région.
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg mb-4">Navigation</p>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-300 transition-colors">Accueil</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-300 transition-colors">Nos Solutions</Link></li>
              <li><Link to="/blog" className="hover:text-blue-300 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-300 transition-colors">Contact</Link></li>
              <li><Link to="/rendez-vous" className="hover:text-blue-300 transition-colors">Réserver un RDV</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-lg mb-4">Informations de Contact</p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-300" />
                <a href="mailto:contact@mdoservices.fr" className="hover:text-blue-300 transition-colors">contact@mdoservices.fr</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-300" />
                <a href="tel:+33582952277" className="hover:text-blue-300 transition-colors">+33 5 82 95 22 77</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-blue-300" />
                <span>27 rue pierre Mazaud, <br />09200 Saint-Girons, <br />France</span>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-lg mb-4">Accès Rapides</p>
            <ul className="space-y-2">
              <li>
                <Button 
                  variant="link" 
                  onClick={handleClientSpace} 
                  className="text-gray-300 hover:text-blue-300 p-0 h-auto flex items-center"
                >
                  <Users className="h-4 w-4 mr-2" /> Espace Client
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  onClick={handlePartnerSpace} 
                  className="text-gray-300 hover:text-blue-300 p-0 h-auto flex items-center"
                >
                  <Server className="h-4 w-4 mr-2" /> Espace Partenaire
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  onClick={handleTelemaintenance} 
                  className="text-gray-300 hover:text-blue-300 p-0 h-auto flex items-center"
                >
                  <HardDrive className="h-4 w-4 mr-2" /> Télémaintenance
                </Button>
              </li>
              <li>
                <Button 
                  variant="link" 
                  onClick={handleRendezVous} 
                  className="text-gray-300 hover:text-blue-300 p-0 h-auto flex items-center"
                >
                  <CalendarDays className="h-4 w-4 mr-2" /> Réserver un rendez-vous
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} MDO SERVICES. Tous droits réservés.</p>
          <p>SIRET: 51409907600028</p>
          <div className="mt-2">
            <Link to="/mentions-legales" className="hover:text-blue-300 transition-colors">Mentions Légales</Link>
            <span className="mx-2">|</span>
            <Link to="/politique-confidentialite" className="hover:text-blue-300 transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}