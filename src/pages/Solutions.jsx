import React from "react"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Mail, Shield, ChevronRight, Monitor, Server, Lock, Computer as Windows, Mail as Gmail, Phone, Share2 } from 'lucide-react'
import { SolutionCard } from "@/components/SolutionCard"

export default function Solutions() {
  return (
    <TekupPageLayout>
      <div className="pt-24">
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Solutions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de solutions professionnelles pour optimiser votre infrastructure informatique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/cloud-services/microsoft-365">
              <SolutionCard
                icon={<Windows className="h-8 w-8 text-blue-600" />}
                title="Microsoft 365"
                description="Suite complète de productivité et collaboration"
                features={[
                  "Applications Office",
                  "Email professionnel",
                  "Stockage cloud",
                  "Travail collaboratif"
                ]}
              />
            </Link>

            <Link to="/cloud-services/google-workspace">
              <SolutionCard
                icon={<Gmail className="h-8 w-8 text-blue-600" />}
                title="Google Workspace"
                description="Suite collaborative complète"
                features={[
                  "Gmail professionnel",
                  "Drive et Docs",
                  "Meet et Chat",
                  "Administration centralisée"
                ]}
              />
            </Link>

            <Link to="/solutions-telecom/3cx">
              <SolutionCard
                icon={<Phone className="h-8 w-8 text-blue-600" />}
                title="3CX"
                description="Solution de téléphonie professionnelle"
                features={[
                  "Téléphonie IP",
                  "Visioconférence",
                  "Messagerie instantanée",
                  "Solution web"
                ]}
              />
            </Link>

            <Link to="/solutions-telecom/wazo">
              <SolutionCard
                icon={<Share2 className="h-8 w-8 text-blue-600" />}
                title="Wazo"
                description="Communication unifiée open-source"
                features={[
                  "Approche API-first",
                  "Flexibilité et contrôle",
                  "Intégrations sur-mesure",
                  "Souveraineté des données"
                ]}
              />
            </Link>

            <Link to="/solutions/mailinblack">
              <SolutionCard
                icon={<Mail className="h-8 w-8 text-blue-600" />}
                title="MailInBlack"
                description="Protection email avancée"
                features={[
                  "Anti-spam intelligent",
                  "Protection phishing",
                  "Gestion simplifiée",
                  "Conformité RGPD"
                ]}
              />
            </Link>

            <Link to="/solutions/sentinel-one">
              <SolutionCard
                icon={<Shield className="h-8 w-8 text-blue-600" />}
                title="SentinelOne"
                description="Protection endpoint nouvelle génération"
                features={[
                  "Protection temps réel",
                  "IA et Machine Learning",
                  "Détection avancée",
                  "Réponse automatisée"
                ]}
              />
            </Link>

            <Link to="/solutions/keeper-security">
              <SolutionCard
                icon={<Lock className="h-8 w-8 text-blue-600" />}
                title="Keeper Security"
                description="Gestion des mots de passe d'entreprise"
                features={[
                  "Stockage sécurisé",
                  "Partage sécurisé",
                  "Audit et rapports",
                  "Authentification forte"
                ]}
              />
            </Link>

            <Link to="/solutions/ninja-rmm">
              <SolutionCard
                icon={<Monitor className="h-8 w-8 text-blue-600" />}
                title="NinjaRMM"
                description="Supervision et gestion à distance"
                features={[
                  "Monitoring 24/7",
                  "Gestion des patches",
                  "Scripts automatisés",
                  "Inventaire IT"
                ]}
              />
            </Link>

            <Link to="/solutions/proxmox">
              <SolutionCard
                icon={<Server className="h-8 w-8 text-blue-600" />}
                title="Proxmox"
                description="Virtualisation professionnelle"
                features={[
                  "Haute disponibilité",
                  "Backup intégré",
                  "Performance optimale",
                  "Gestion centralisée"
                ]}
              />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-16"
          >
            <Button
              onClick={() => window.location.href = "mailto:mathieu@mdoservices.fr?subject=Demande d'information solutions MDO SERVICES"}
              className="premium-button text-white"
            >
              Demander plus d'informations
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </section>
      </div>
    </TekupPageLayout>
  )
}