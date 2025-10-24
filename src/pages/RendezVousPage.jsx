import React from "react"
import { PageLayout } from "@/components/layout/PageLayout"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"

export default function RendezVousPage() {
  return (
    <PageLayout>
      <Helmet>
        <title>Réserver un Rendez-vous - MDO SERVICES</title>
        <meta name="description" content="Prenez rendez-vous facilement avec MDO SERVICES pour discuter de vos besoins IT, cloud, ou pour un support technique." />
        <link rel="canonical" href="https://mdoservices.fr/rendez-vous" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Prendre un Rendez-vous</h1>
          <p className="text-xl text-gray-600">
            Utilisez le calendrier ci-dessous pour choisir un créneau qui vous convient.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-4 md:p-8 rounded-lg shadow-xl"
        >
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0F8mRM9AYg8DR4N9rrKR5gawbQzy8K46AEZ_nOAqbivEukcYZVJAW9lRTnZUivBNXGmxnsZLS1?gv=true"
            style={{ border: 0 }}
            width="100%"
            height="600"
            frameBorder="0"
            title="Google Calendar Appointment Scheduling"
          ></iframe>
        </motion.div>
      </div>
    </PageLayout>
  )
}