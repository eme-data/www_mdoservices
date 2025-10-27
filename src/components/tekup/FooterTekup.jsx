import React from "react"
import { Link } from "react-router-dom"
import { Logo } from "@/components/Logo"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  ArrowUpRight
} from "lucide-react"

export function FooterTekup() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    solutions: [
      { name: "Services Cloud", path: "/cloud-services" },
      { name: "Cybersécurité", path: "/cybersecurity" },
      { name: "Solutions Télécom", path: "/solutions-telecom" },
      { name: "Infogérance", path: "/premium-management" },
    ],
    entreprise: [
      { name: "À propos", path: "/solutions" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
      { name: "Espace Partenaire", path: "/partner" },
    ],
    ressources: [
      { name: "Support", path: "/support" },
      { name: "Documentation", path: "/blog" },
      { name: "Rendez-vous", path: "/rendez-vous" },
    ],
    legal: [
      { name: "Mentions légales", path: "/mentions-legales" },
      { name: "Politique de confidentialité", path: "/politique-confidentialite" },
    ]
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Restez informé de nos actualités
            </h3>
            <p className="text-blue-200 mb-8">
              Recevez nos conseils IT, actualités cloud et offres exclusives
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo className="h-10" showText={true} textColorClassName="text-white" />
            </Link>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Expert IT & Cloud en Occitanie. Nous accompagnons les entreprises dans leur transformation numérique depuis 2020.
            </p>
            <div className="space-y-3">
              <a href="tel:+33537040280" className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                <span>05 37 04 02 80</span>
              </a>
              <a href="mailto:contact@mdoservices.fr" className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                <span>contact@mdoservices.fr</span>
              </a>
              <div className="flex items-center gap-3 text-blue-200">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Ariège & Haute-Garonne, Occitanie</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-bold text-lg mb-6">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="font-bold text-lg mb-6">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-bold text-lg mb-6">Ressources</h4>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-6">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-blue-200 text-sm">
            © {currentYear} MDO Services. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
