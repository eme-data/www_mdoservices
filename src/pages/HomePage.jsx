import React from "react"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { LocalPresence } from "@/components/LocalPresence"
import { RegionalCoverage } from "@/components/RegionalCoverage"
import { CookieConsent } from "@/components/CookieConsent"
import { HeroSection } from "@/components/home/HeroSection"
import { ServicesSection } from "@/components/home/ServicesSection"
import { ExpertiseSection } from "@/components/home/ExpertiseSection"
import { PageLayout } from "@/components/layout/PageLayout"

export default function HomePage() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
      
      toast({
        title: "Navigation",
        description: "Découvrez nos services.",
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>Informatique, Télécom & Cloud – Ariège & Haute-Garonne | MDO Services</title>
        <meta name="description" content="Expert IT et solutions Cloud en Occitanie. MDO SERVICES accompagne les entreprises de l'Ariège (Foix, Pamiers) et de la Haute-Garonne dans leur transformation numérique : infogérance, cloud, cybersécurité." />
        <meta name="keywords" content="IT, Cloud, Ariège, Haute-Garonne, Foix, Pamiers, Toulouse, infogérance, cybersécurité, support informatique" />
        <link rel="canonical" href="https://mdoservices.fr" />
        <meta property="og:title" content="Informatique, Télécom & Cloud – Ariège & Haute-Garonne | MDO Services" />
        <meta property="og:description" content="Expert IT et solutions Cloud en Occitanie. MDO SERVICES accompagne les entreprises de l'Ariège (Foix, Pamiers) et de la Haute-Garonne dans leur transformation numérique : infogérance, cloud, cybersécurité." />
        <meta property="og:url" content="https://mdoservices.fr" />
        <meta property="og:type" content="website" />
      </Helmet>

      <PageLayout>
        <CookieConsent />

        <HeroSection scrollToServices={scrollToServices} />
        <LocalPresence />
        <RegionalCoverage />
        <ServicesSection />
        <ExpertiseSection />
      </PageLayout>
    </>
  )
}