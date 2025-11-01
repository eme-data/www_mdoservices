import React from "react"
import { Helmet } from "react-helmet"
import { HeaderTekup } from "@/components/tekup/HeaderTekup"
import { HeroTekup } from "@/components/tekup/HeroTekup"
import { ServicesSectionTekup } from "@/components/tekup/ServicesSectionTekup"
import { FooterTekup } from "@/components/tekup/FooterTekup"
import { CookieConsent } from "@/components/CookieConsent"
import { LocalPresence } from "@/components/LocalPresence"
import { RegionalCoverage } from "@/components/RegionalCoverage"
import { ExpertiseSection } from "@/components/home/ExpertiseSection"
import WhatsAppWidget from "@/components/WhatsAppWidget"

export default function HomePageTekup() {
  return (
    <>
      <Helmet>
        <title>Expert IT & Cloud en Occitanie – Ariège, Haute-Garonne, Aveyron | MDO Services</title>
        <meta
          name="description"
          content="Expert IT et solutions Cloud présent dans toute l'Occitanie. MDO SERVICES accompagne les entreprises en Ariège, Haute-Garonne, Aveyron et tous les départements de la région dans leur transformation numérique : infogérance, cloud, cybersécurité."
        />
        <meta
          name="keywords"
          content="IT Occitanie, Cloud Occitanie, Ariège, Haute-Garonne, Aveyron, Toulouse, Foix, Pamiers, Rodez, Millau, Montpellier, infogérance, cybersécurité, support informatique, expert IT région Occitanie"
        />
        <link rel="canonical" href="https://mdoservices.fr" />
        <meta property="og:title" content="Expert IT & Cloud en Occitanie – Ariège, Haute-Garonne, Aveyron | MDO Services" />
        <meta
          property="og:description"
          content="Expert IT et solutions Cloud présent dans toute l'Occitanie. MDO SERVICES accompagne les entreprises en Ariège, Haute-Garonne, Aveyron et tous les départements de la région dans leur transformation numérique : infogérance, cloud, cybersécurité."
        />
        <meta property="og:url" content="https://mdoservices.fr" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <CookieConsent />

        <HeaderTekup />

        <main>
          <HeroTekup />
          <ServicesSectionTekup />
          <LocalPresence />
          <RegionalCoverage />
          <ExpertiseSection />
        </main>

        <FooterTekup />

        {/* Widget WhatsApp flottant */}
        <WhatsAppWidget />
      </div>
    </>
  )
}
