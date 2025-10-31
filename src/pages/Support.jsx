import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout" // Import PageLayout

export default function Support() {
  const { toast } = useToast()
  const recaptchaRef = useRef(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "normal",
    description: ""
  })
  const [captchaValue, setCaptchaValue] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!captchaValue) {
      toast({
        title: "Erreur",
        description: "Veuillez valider le captcha avant d'envoyer le formulaire.",
        variant: "destructive"
      })
      return
    }

    const mailtoLink = `mailto:mathieu@mdoservices.fr?subject=${encodeURIComponent(`[${formData.priority.toUpperCase()}] ${formData.subject}`)}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nDescription du problème:\n${formData.description}`
    )}`

    window.location.href = mailtoLink

    toast({
      title: "Ticket créé",
      description: "Votre ticket d'incident a été envoyé avec succès.",
    })

    // Reset form and captcha
    setFormData({
      name: "",
      email: "",
      subject: "",
      priority: "normal",
      description: ""
    })
    recaptchaRef.current.reset()
    setCaptchaValue(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value)
  }

  return (
    <TekupPageLayout> {/* Use PageLayout here */}
      <div className="pt-24"> {/* Added padding top for fixed Navigation */}
        <main> {/* Removed pt-24 from main, handled by outer div */}
          <section className="hero-gradient text-white py-16 md:py-20"> {/* Adjusted padding */}
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Technique</h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                  Créez un ticket d'incident pour obtenir de l'aide de notre équipe technique
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8"
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Nouveau Ticket</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sujet
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Priorité
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      >
                        <option value="low">Basse</option>
                        <option value="normal">Normale</option>
                        <option value="high">Haute</option>
                        <option value="urgent">Urgente</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description du problème
                      </label>
                      <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      ></textarea>
                    </div>

                    <div className="flex justify-center mb-6">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual site key
                        onChange={handleCaptchaChange}
                        theme="light" // Can be "light" or "dark"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                      disabled={!captchaValue}
                    >
                      Envoyer le ticket
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </TekupPageLayout>
  )
}