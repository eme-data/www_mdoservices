import React from "react"
import { PageLayout } from "@/components/layout/PageLayout"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    
    const subject = encodeURIComponent("Prise de contact depuis le site MDO SERVICES")
    const body = encodeURIComponent(
      `Nom: ${event.target.name.value}\nEmail: ${event.target.email.value}\nMessage: ${event.target.message.value}`
    )
    window.location.href = `mailto:contact@mdoservices.fr?subject=${subject}&body=${body}`
  }

  return (
    <PageLayout>
      <Helmet>
        <title>Contactez MDO SERVICES - Expert IT & Cloud en Occitanie</title>
        <meta name="description" content="Contactez MDO SERVICES pour discuter de vos besoins IT et Cloud. Nous sommes basés en Ariège (Saint-Girons) et intervenons en Occitanie." />
        <link rel="canonical" href="https://mdoservices.fr/contact" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-Nous</h1>
          <p className="text-xl text-gray-600">
            Nous sommes à votre écoute pour discuter de vos projets et répondre à vos questions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Votre e-mail"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Votre message"
                ></textarea>
              </div>
              <Button type="submit" className="w-full premium-button text-white">
                Envoyer le Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Nos Coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <Mail className="h-6 w-6 mr-3 text-blue-600" />
                  <a href="mailto:contact@mdoservices.fr" className="hover:text-blue-600">
                    contact@mdoservices.fr
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-6 w-6 mr-3 text-blue-600" />
                  <a href="tel:+33582952277" className="hover:text-blue-600">
                    +33 5 82 95 22 77
                  </a>
                </div>
                <div className="flex items-start text-gray-700">
                  <MapPin className="h-6 w-6 mr-3 text-blue-600 mt-1" />
                  <div>
                    27 rue pierre Mazaud, <br />
                    09200 Saint-Girons, <br />
                    France
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Horaires d'ouverture</h2>
              <p className="text-gray-700">Lundi - Vendredi : 9h00 - 18h00</p>
              <p className="text-gray-700">Samedi - Dimanche : Fermé</p>
              <p className="text-sm text-gray-500 mt-2">Support technique disponible selon contrat.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}