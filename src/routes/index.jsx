import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import HomePageTekup from "@/pages/HomePageTekup"
import Solutions from "@/pages/Solutions"
// import Support from "@/pages/Support" // Route Support supprimée
import Contact from "@/pages/Contact.jsx"
import MentionsLegales from "@/pages/MentionsLegales.jsx"
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite.jsx"
import Microsoft365Details from "@/pages/Microsoft365Details"
import GoogleWorkspaceDetails from "@/pages/GoogleWorkspaceDetails"
import MailInBlackDetails from "@/pages/MailInBlackDetails"
import SentinelOneDetails from "@/pages/SentinelOneDetails"
import KeeperSecurityDetails from "@/pages/KeeperSecurityDetails"
import NinjaRMMDetails from "@/pages/NinjaRMMDetails"
import ProxmoxDetails from "@/pages/ProxmoxDetails"
import PartnerSpace from "@/pages/PartnerSpace"
import PartnerPricing from "@/pages/PartnerPricing"
import ForgotPassword from "@/pages/ForgotPassword"
import ResetPassword from "@/pages/ResetPassword"
import TelecomSolutions from "@/pages/TelecomSolutions"
import ThreeCXDetails from "@/pages/ThreeCXDetails"
import WazoDetails from "@/pages/WazoDetails"
import CloudEnterprise from "@/pages/CloudEnterprise"
import InternetAccess from "@/pages/InternetAccess"
import PremiumManagement from "@/pages/PremiumManagement"
import Cybersecurity from "@/pages/Cybersecurity"
import CloudServices from "@/pages/CloudServices"
import RendezVousPage from "@/pages/RendezVousPage"
import BlogPage from "@/pages/BlogPage"
import BlogPostPage from "@/pages/BlogPostPage"

export function AppRoutes() {
  return (
    <Routes>
      {/* Nouveau design Tekup activé sur la page d'accueil */}
      <Route path="/" element={<HomePageTekup />} />
      {/* Ancien design accessible sur /classic pour référence */}
      <Route path="/classic" element={<HomePage />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route path="/solutions/microsoft-365" element={<Microsoft365Details />} />
      <Route path="/solutions/google-workspace" element={<GoogleWorkspaceDetails />} />
      <Route path="/solutions/mailinblack" element={<MailInBlackDetails />} />
      <Route path="/solutions/sentinel-one" element={<SentinelOneDetails />} />
      <Route path="/solutions/keeper-security" element={<KeeperSecurityDetails />} />
      <Route path="/solutions/ninja-rmm" element={<NinjaRMMDetails />} />
      <Route path="/solutions/proxmox" element={<ProxmoxDetails />} />
      <Route path="/solutions-telecom" element={<TelecomSolutions />} />
      <Route path="/solutions-telecom/3cx" element={<ThreeCXDetails />} />
      <Route path="/solutions-telecom/wazo" element={<WazoDetails />} />
      <Route path="/cloud-enterprise" element={<CloudEnterprise />} />
      <Route path="/internet-access" element={<InternetAccess />} />
      <Route path="/premium-management" element={<PremiumManagement />} />
      <Route path="/cybersecurity" element={<Cybersecurity />} />
      <Route path="/cloud-services" element={<CloudServices />} />
      <Route path="/cloud-services/microsoft-365" element={<Microsoft365Details />} />
      <Route path="/cloud-services/google-workspace" element={<GoogleWorkspaceDetails />} />
      {/* <Route path="/support" element={<Support />} /> */} {/* Route Support supprimée */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/rendez-vous" element={<RendezVousPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/partner" element={<PartnerSpace />} />
      <Route path="/partner/pricing" element={<PartnerPricing />} />
      <Route path="/partner/forgot-password" element={<ForgotPassword />} />
      <Route path="/partner/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}