import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "@/pages/HomePage"
import HomePageTekup from "@/pages/HomePageTekup"
import Solutions from "@/pages/Solutions"
// import Support from "@/pages/Support" // Route Support supprimée
import Contact from "@/pages/Contact.jsx"
import MentionsLegales from "@/pages/MentionsLegales.jsx"
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite.jsx"
import Microsoft365Details from "@/pages/Microsoft365Details"
import GoogleWorkspaceDetails from "@/pages/GoogleWorkspaceDetails"
import IronScalesDetails from "@/pages/IronScalesDetails"
import SentinelOneDetails from "@/pages/SentinelOneDetails"
import KeeperSecurityDetails from "@/pages/KeeperSecurityDetails"
import NinjaRMMDetails from "@/pages/NinjaRMMDetails"
import ProxmoxDetails from "@/pages/ProxmoxDetails"
import PartnerSpace from "@/pages/PartnerSpace"
import PartnerPricing from "@/pages/PartnerPricing"
import DevenirPartenaire from "@/pages/DevenirPartenaire"
import ClientSpace from "@/pages/ClientSpace"
import ClientDashboard from "@/pages/client/ClientDashboard"
import ForgotPassword from "@/pages/ForgotPassword"
import ResetPassword from "@/pages/ResetPassword"
import TelecomSolutions from "@/pages/TelecomSolutions"
import TelephonyFixed from "@/pages/TelephonyFixed"
import TelephonyMobile from "@/pages/TelephonyMobile"
import IoTM2M from "@/pages/IoTM2M"
import CloudEnterprise from "@/pages/CloudEnterprise"
import InternetAccess from "@/pages/InternetAccess"
import PremiumManagement from "@/pages/PremiumManagement"
import Cybersecurity from "@/pages/Cybersecurity"
import CloudServices from "@/pages/CloudServices"
import Videosurveillance from "@/pages/Videosurveillance"
import NetworkInfrastructure from "@/pages/NetworkInfrastructure"
import AIIntegration from "@/pages/AIIntegration"
import RendezVousPage from "@/pages/RendezVousPage"
import BlogPage from "@/pages/BlogPage"
import BlogPostPage from "@/pages/BlogPostPage"
import BlogAdmin from "@/pages/partner/BlogAdmin"
import BlogPostForm from "@/pages/partner/BlogPostForm"
import CategoriesAdmin from "@/pages/partner/CategoriesAdmin"
import TagsAdmin from "@/pages/partner/TagsAdmin"
import BlogImport from "@/pages/partner/BlogImport"
import ClientUsersAdmin from "@/pages/client/UsersAdmin"
import PartnerUsersAdmin from "@/pages/partner/UsersAdmin"
import Tickets from "@/pages/client/Tickets"

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
      <Route path="/solutions/ironscales" element={<IronScalesDetails />} />
      {/* Redirect old MailInBlack URL for SEO */}
      <Route path="/solutions/mailinblack" element={<Navigate to="/solutions/ironscales" replace />} />
      <Route path="/solutions/sentinel-one" element={<SentinelOneDetails />} />
      <Route path="/solutions/keeper-security" element={<KeeperSecurityDetails />} />
      <Route path="/solutions/ninja-rmm" element={<NinjaRMMDetails />} />
      <Route path="/solutions/proxmox" element={<ProxmoxDetails />} />
      <Route path="/solutions-telecom" element={<TelecomSolutions />} />
      <Route path="/solutions-telecom/telephonie-fixe" element={<TelephonyFixed />} />
      <Route path="/solutions-telecom/telephonie-mobile" element={<TelephonyMobile />} />
      <Route path="/solutions-telecom/iot-m2m" element={<IoTM2M />} />
      {/* Redirects for SEO - old product pages to new service pages */}
      <Route path="/solutions-telecom/3cx" element={<Navigate to="/solutions-telecom/telephonie-fixe" replace />} />
      <Route path="/solutions-telecom/wazo" element={<Navigate to="/solutions-telecom/telephonie-fixe" replace />} />
      <Route path="/cloud-entreprise" element={<CloudEnterprise />} />
      {/* Redirect old URL for SEO */}
      <Route path="/cloud-enterprise" element={<Navigate to="/cloud-entreprise" replace />} />
      <Route path="/internet-access" element={<InternetAccess />} />
      <Route path="/premium-management" element={<PremiumManagement />} />
      <Route path="/cybersecurity" element={<Cybersecurity />} />
      <Route path="/cloud-services" element={<CloudServices />} />
      <Route path="/infrastructure-reseaux" element={<NetworkInfrastructure />} />
      <Route path="/videosurveillance" element={<Videosurveillance />} />
      <Route path="/integration-ia" element={<AIIntegration />} />
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
      <Route path="/devenir-partenaire" element={<DevenirPartenaire />} />
      <Route path="/partner/pricing" element={<PartnerPricing />} />
      <Route path="/client" element={<ClientSpace />} />
      <Route path="/espace-client" element={<ClientSpace />} />
      <Route path="/client/dashboard" element={<ClientDashboard />} />
      <Route path="/partner/blog" element={<BlogAdmin />} />
      <Route path="/partner/blog/new" element={<BlogPostForm />} />
      <Route path="/partner/blog/edit/:id" element={<BlogPostForm />} />
      <Route path="/partner/blog/categories" element={<CategoriesAdmin />} />
      <Route path="/partner/blog/tags" element={<TagsAdmin />} />
      <Route path="/partner/blog/import" element={<BlogImport />} />
      <Route path="/partner/users" element={<PartnerUsersAdmin />} />
      <Route path="/client/users" element={<ClientUsersAdmin />} />
      <Route path="/client/tickets" element={<Tickets />} />
      <Route path="/partner/forgot-password" element={<ForgotPassword />} />
      <Route path="/partner/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}