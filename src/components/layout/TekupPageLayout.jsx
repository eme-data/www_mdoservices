import React from "react"
import { HeaderTekup } from "@/components/tekup/HeaderTekup"
import { FooterTekup } from "@/components/tekup/FooterTekup"
import { CookieConsent } from "@/components/CookieConsent"
import TelegramWidget from "@/components/TelegramWidget"

/**
 * TekupPageLayout - Layout moderne avec design Tekup
 * Remplace PageLayout pour harmoniser le design du site
 *
 * Utilisé pour toutes les pages publiques (sauf page d'accueil et espace partenaire)
 */
export function TekupPageLayout({ children }) {
  return (
    <div className="min-h-screen">
      <CookieConsent />
      <TelegramWidget />

      <HeaderTekup />

      <main className="flex-grow">
        {children}
      </main>

      <FooterTekup />
    </div>
  )
}
