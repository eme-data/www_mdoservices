import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, User } from "lucide-react"

/**
 * ContactFormTekup - Formulaire de contact moderne avec design Tekup
 *
 * Features:
 * - Validation en temps réel
 * - Animations fluides
 * - Success/Error states
 * - Design moderne avec gradients
 */
export function ContactFormTekup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.length < 2 ? "Le nom doit contenir au moins 2 caractères" : ""
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Email invalide" : ""
      case "phone":
        return value && !/^[\d\s+()-]{10,}$/.test(value) ? "Numéro invalide" : ""
      case "message":
        return value.length < 10 ? "Le message doit contenir au moins 10 caractères" : ""
      default:
        return ""
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Validation en temps réel
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Validation complète
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== "phone") { // Phone est optionnel
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Simulation d'envoi (à remplacer par votre logique)
    try {
      const subject = encodeURIComponent("Prise de contact depuis le site MDO SERVICES")
      const body = encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone || 'Non renseigné'}\n\nMessage:\n${formData.message}`
      )
      window.location.href = `mailto:contact@mdoservices.fr?subject=${subject}&body=${body}`

      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start">
      {/* Formulaire */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Envoyez-nous un message
          </h2>
          <p className="text-gray-600">
            Remplissez le formulaire et nous vous répondrons dans les 24h
          </p>
        </div>

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800">Message envoyé !</p>
              <p className="text-sm text-green-700">Nous vous répondrons très prochainement.</p>
            </div>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Erreur d'envoi</p>
              <p className="text-sm text-red-700">Veuillez réessayer ou nous contacter directement.</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nom complet *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border ${
                  errors.name ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } rounded-lg shadow-sm focus:ring-2 focus:border-transparent transition-all`}
                placeholder="Jean Dupont"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Adresse e-mail *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border ${
                  errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } rounded-lg shadow-sm focus:ring-2 focus:border-transparent transition-all`}
                placeholder="jean.dupont@entreprise.fr"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Téléphone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Téléphone <span className="text-gray-400 font-normal">(optionnel)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-3 border ${
                  errors.phone ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } rounded-lg shadow-sm focus:ring-2 focus:border-transparent transition-all`}
                placeholder="06 12 34 56 78"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Votre message *
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.message ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              } rounded-lg shadow-sm focus:ring-2 focus:border-transparent transition-all resize-none`}
              placeholder="Décrivez-nous votre projet ou vos besoins..."
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer le Message
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-4 text-xs text-center text-gray-500">
          En envoyant ce formulaire, vous acceptez notre{" "}
          <a href="/politique-confidentialite" className="text-blue-600 hover:underline">
            politique de confidentialité
          </a>
        </p>
      </motion.div>

      {/* Informations de contact */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        {/* Coordonnées */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-6">Nos Coordonnées</h2>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Email</p>
                <a href="mailto:contact@mdoservices.fr" className="font-semibold hover:text-blue-200 transition-colors">
                  contact@mdoservices.fr
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Téléphone</p>
                <a href="tel:+33582952277" className="font-semibold hover:text-blue-200 transition-colors">
                  05.82.95.22.77
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Mobile</p>
                <a href="tel:+33666030361" className="font-semibold hover:text-blue-200 transition-colors">
                  06.66.03.03.61
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-blue-100">Adresse</p>
                <p className="font-semibold">
                  27 rue pierre Mazaud<br />
                  09200 Saint-Girons<br />
                  France
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Horaires */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Horaires d'ouverture</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Lundi - Vendredi</span>
              <span className="text-blue-600 font-semibold">9h00 - 18h00</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Samedi - Dimanche</span>
              <span className="text-gray-400">Fermé</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200">
            Support technique disponible selon contrat 24/7
          </p>
        </div>

        {/* Badges de confiance */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">24h</p>
              <p className="text-sm text-gray-600">Délai de réponse</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">+50</p>
              <p className="text-sm text-gray-600">Clients satisfaits</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
