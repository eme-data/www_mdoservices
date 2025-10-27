import React from "react"
import { Helmet } from "react-helmet"
import { HeaderTekup } from "@/components/tekup/HeaderTekup"
import { HeroTekup } from "@/components/tekup/HeroTekup"
import { ServicesSectionTekup } from "@/components/tekup/ServicesSectionTekup"
import { FooterTekup } from "@/components/tekup/FooterTekup"
import { CookieConsent } from "@/components/CookieConsent"
import TelegramWidget from "@/components/TelegramWidget"
import { LocalPresence } from "@/components/LocalPresence"
import { RegionalCoverage } from "@/components/RegionalCoverage"
import { ExpertiseSection } from "@/components/home/ExpertiseSection"

export default function HomePageTekup() {
  return (
    <>
      <Helmet>
        <title>Informatique, Télécom & Cloud – Ariège & Haute-Garonne | MDO Services</title>
        <meta
          name="description"
          content="Expert IT et solutions Cloud en Occitanie. MDO SERVICES accompagne les entreprises de l'Ariège (Foix, Pamiers) et de la Haute-Garonne dans leur transformation numérique : infogérance, cloud, cybersécurité."
        />
        <meta
          name="keywords"
          content="IT, Cloud, Ariège, Haute-Garonne, Foix, Pamiers, Toulouse, infogérance, cybersécurité, support informatique"
        />
        <link rel="canonical" href="https://mdoservices.fr" />
        <meta property="og:title" content="Informatique, Télécom & Cloud – Ariège & Haute-Garonne | MDO Services" />
        <meta
          property="og:description"
          content="Expert IT et solutions Cloud en Occitanie. MDO SERVICES accompagne les entreprises de l'Ariège (Foix, Pamiers) et de la Haute-Garonne dans leur transformation numérique : infogérance, cloud, cybersécurité."
        />
        <meta property="og:url" content="https://mdoservices.fr" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen">
        <CookieConsent />
        <TelegramWidget />

        <HeaderTekup />

        <main>
          <HeroTekup />
          <ServicesSectionTekup />
          <LocalPresence />
          <RegionalCoverage />
          <ExpertiseSection />
        </main>

        <FooterTekup />
      </div>
    </>
  )
}
