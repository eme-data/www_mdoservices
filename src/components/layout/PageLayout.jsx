import React from "react"
import Navigation from "@/components/Navigation"
import { AppFooter } from "@/components/layout/AppFooter"
import { useNavigate } from "react-router-dom"

export function PageLayout({ children }) {
  const navigate = useNavigate()

  const handleClientSpace = () => {
    window.open("https://mdoservices.rmmservice.eu/", "_blank")
  }

  const handlePartnerSpace = () => {
    navigate("/partner")
  }

  const handleTelemaintenance = () => {
    window.open("https://get.teamviewer.com/6d5c9ea", "_blank")
  }

  const handleRendezVous = () => {
    navigate("/rendez-vous")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <AppFooter 
        handleClientSpace={handleClientSpace}
        handlePartnerSpace={handlePartnerSpace}
        handleTelemaintenance={handleTelemaintenance}
        handleRendezVous={handleRendezVous}
      />
    </div>
  )
}