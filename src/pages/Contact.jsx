import React from "react"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { Helmet } from "react-helmet"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { ContactFormTekup } from "@/components/tekup/ContactFormTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"
import { HeadphonesIcon, Clock, MapPin, Shield, Users, Award } from "lucide-react"

export default function Contact() {
  // Features - Why Contact Us
  const features = [
    {
      icon: HeadphonesIcon,
      title: "Support Réactif",
      description: "Réponse garantie sous 24h pour toutes vos demandes d'information et de support.",
      color: "blue"
    },
    {
      icon: Clock,
      title: "Disponibilité",
      description: "Nous sommes disponibles du lundi au vendredi de 9h à 18h. Support 24/7 selon contrat.",
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Proximité",
      description: "Basés en Ariège, nous intervenons dans toute l'Occitanie pour être au plus près de vous.",
      color: "green"
    },
    {
      icon: Shield,
      title: "Confidentialité",
      description: "Vos données et projets sont traités avec la plus grande confidentialité et sécurité.",
      color: "red"
    },
    {
      icon: Users,
      title: "Conseil Expert",
      description: "Une équipe d'experts certifiés pour vous accompagner dans vos choix technologiques.",
      color: "orange"
    },
    {
      icon: Award,
      title: "Qualité Certifiée",
      description: "Partenaire certifié des plus grandes marques IT et Cloud du marché.",
      color: "indigo"
    }
  ]

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Contactez MDO SERVICES - Expert IT & Cloud en Occitanie</title>
        <meta name="description" content="Contactez MDO SERVICES pour discuter de vos besoins IT et Cloud. Nous sommes basés en Ariège (Saint-Girons) et intervenons en Occitanie." />
        <link rel="canonical" href="https://mdoservices.fr/contact" />
      </Helmet>

      {/* Hero Section */}
      <SolutionHeroTekup
        badge="Contactez-nous"
        title="Parlons de <span class='bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>votre projet</span>"
        description="Notre équipe d'experts est à votre écoute pour discuter de vos besoins IT et Cloud. Nous vous répondons sous 24h."
        primaryCTA={{
          text: "Prendre Rendez-vous",
          link: "/rendez-vous"
        }}
        secondaryCTA={{
          text: "Nos Solutions",
          link: "/solutions"
        }}
        features={[
          "Réponse garantie sous 24h",
          "Conseils personnalisés gratuits",
          "Devis détaillé sur mesure",
          "Support technique certifié"
        ]}
        stats={[
          { value: "+50", label: "Clients Satisfaits" },
          { value: "24h", label: "Délai de Réponse" },
          { value: "15+", label: "Années d'Expérience" },
          { value: "99%", label: "Taux de Satisfaction" }
        ]}
      />

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ContactFormTekup />
        </div>
      </section>

      {/* Why Contact Us - Features */}
      <FeaturesSectionTekup
        title="Pourquoi nous contacter ?"
        subtitle="Découvrez les avantages de travailler avec MDO SERVICES"
        features={features}
      />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-gray-600 text-lg">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <details className="bg-gray-50 rounded-xl p-6 group hover:bg-gray-100 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Quel est votre délai de réponse ?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Nous nous engageons à répondre à toutes les demandes sous 24h ouvrées. Pour les urgences,
                nos clients sous contrat bénéficient d'un support prioritaire disponible 24/7.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="bg-gray-50 rounded-xl p-6 group hover:bg-gray-100 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Quelles sont vos zones d'intervention ?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Basés à Saint-Girons en Ariège, nous intervenons dans toute l'Occitanie (Toulouse, Montpellier, etc.).
                Nos solutions Cloud nous permettent également d'accompagner des clients partout en France.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="bg-gray-50 rounded-xl p-6 group hover:bg-gray-100 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Proposez-vous des devis gratuits ?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Oui, nous réalisons un audit gratuit de vos besoins et vous fournissons un devis détaillé
                sans engagement. Notre objectif est de vous proposer la solution la plus adaptée à votre budget.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="bg-gray-50 rounded-xl p-6 group hover:bg-gray-100 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Quels types d'entreprises accompagnez-vous ?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Nous accompagnons les TPE, PME et collectivités de toutes tailles. Que vous ayez 5 ou 500 utilisateurs,
                nous adaptons nos solutions à votre structure et vos contraintes budgétaires.
              </p>
            </details>

            {/* FAQ Item 5 */}
            <details className="bg-gray-50 rounded-xl p-6 group hover:bg-gray-100 transition-colors">
              <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                <span>Comment se déroule un premier contact ?</span>
                <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Après votre prise de contact, nous planifions un entretien téléphonique ou visioconférence pour
                comprendre vos besoins. Suite à cet échange, nous vous proposons une solution adaptée avec un devis détaillé.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASectionTekup
        badge="Prêt à démarrer ?"
        title="Transformez votre infrastructure IT dès aujourd'hui"
        description="Contactez-nous maintenant pour un audit gratuit et découvrez comment nous pouvons optimiser votre système informatique."
        primaryCTA={{
          text: "Prendre Rendez-vous",
          link: "/rendez-vous"
        }}
        secondaryCTA={{
          text: "Découvrir nos Solutions",
          link: "/solutions"
        }}
        variant="gradient"
      />
    </TekupPageLayout>
  )
}
