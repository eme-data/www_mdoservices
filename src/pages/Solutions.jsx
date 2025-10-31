import React from "react"
import { TekupPageLayout } from "@/components/layout/TekupPageLayout"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Mail, Shield, Monitor, Server, Lock, Computer as Windows, Mail as Gmail, Phone, Share2, Award, Zap, HeadphonesIcon, TrendingUp, Users, CheckCircle } from 'lucide-react'
import { SolutionCard } from "@/components/SolutionCard"
import { SolutionHeroTekup } from "@/components/tekup/SolutionHeroTekup"
import { FeaturesSectionTekup } from "@/components/tekup/FeaturesSectionTekup"
import { CTASectionTekup } from "@/components/tekup/CTASectionTekup"

export default function Solutions() {
  // Why choose MDO Services features
  const whyChooseUsFeatures = [
    {
      icon: Award,
      title: "Expertise Certifiée",
      description: "Partenaires officiels des plus grandes marques IT (Microsoft, Google, SentinelOne, etc.)",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Déploiement Rapide",
      description: "Mise en place de vos solutions en quelques jours avec un accompagnement personnalisé.",
      color: "purple"
    },
    {
      icon: HeadphonesIcon,
      title: "Support Réactif",
      description: "Assistance technique disponible 24/7 selon contrat pour garantir votre continuité d'activité.",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Solutions Évolutives",
      description: "Des infrastructures qui grandissent avec vous, adaptées à votre croissance.",
      color: "orange"
    },
    {
      icon: Users,
      title: "Accompagnement Humain",
      description: "Une équipe dédiée qui comprend vos enjeux métiers et vous conseille sur mesure.",
      color: "red"
    },
    {
      icon: CheckCircle,
      title: "Satisfaction Garantie",
      description: "Plus de 50 clients nous font confiance avec un taux de satisfaction de 99%.",
      color: "indigo"
    }
  ]

  return (
    <TekupPageLayout>
      <Helmet>
        <title>Solutions IT & Cloud - MDO SERVICES | Microsoft 365, Google Workspace, Cybersécurité</title>
        <meta name="description" content="Découvrez nos solutions professionnelles : Microsoft 365, Google Workspace, Téléphonie (3CX, Wazo), Cybersécurité (SentinelOne, MailInBlack), Supervision (NinjaRMM), Virtualisation (Proxmox)." />
        <link rel="canonical" href="https://mdoservices.fr/solutions" />
      </Helmet>

      {/* Hero Section */}
      <SolutionHeroTekup
        badge="Nos Solutions IT & Cloud"
        title="Transformez votre <span class='bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>infrastructure</span> informatique"
        description="Découvrez notre gamme complète de solutions professionnelles pour optimiser votre productivité, sécurité et collaboration. Des solutions clé en main, adaptées à votre entreprise."
        primaryCTA={{
          text: "Demander un Devis",
          link: "/contact"
        }}
        secondaryCTA={{
          text: "Prendre Rendez-vous",
          link: "/rendez-vous"
        }}
        features={[
          "Déploiement rapide et accompagnement personnalisé",
          "Solutions certifiées et supportées 24/7",
          "Tarification transparente adaptée à votre budget",
          "Plus de 50 clients satisfaits en Occitanie"
        ]}
        stats={[
          { value: "+50", label: "Clients Satisfaits" },
          { value: "15+", label: "Solutions Proposées" },
          { value: "24/7", label: "Support Disponible" },
          { value: "99%", label: "Taux de Satisfaction" }
        ]}
      />

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nos Solutions Professionnelles
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Choisissez parmi notre catalogue de solutions certifiées et reconnues par les plus grandes entreprises mondiales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cloud & Productivité */}
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

            {/* Téléphonie */}
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

            {/* Cybersécurité */}
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

            {/* Infrastructure & Supervision */}
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
        </div>
      </section>

      {/* Why Choose Us */}
      <FeaturesSectionTekup
        title="Pourquoi choisir MDO SERVICES ?"
        subtitle="Des solutions IT qui s'adaptent à vos besoins, accompagnées par des experts certifiés"
        features={whyChooseUsFeatures}
      />

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ils nous font confiance
            </h2>
            <p className="text-gray-600 text-lg">
              Plus de 50 entreprises en Occitanie nous ont choisi pour leur transformation digitale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "MDO SERVICES a transformé notre infrastructure IT. Le passage à Microsoft 365 s'est fait en douceur avec un accompagnement professionnel. Support réactif et prix compétitifs."
              </p>
              <p className="font-semibold text-gray-900">PME - Toulouse</p>
              <p className="text-sm text-gray-600">Secteur Tertiaire</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "La solution de téléphonie 3CX déployée par MDO SERVICES a révolutionné notre communication interne. Configuration rapide et formation complète de nos équipes."
              </p>
              <p className="font-semibold text-gray-900">TPE - Saint-Girons</p>
              <p className="text-sm text-gray-600">Secteur Commercial</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-pink-50 to-blue-50 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Excellent accompagnement cybersécurité avec SentinelOne et MailInBlack. Notre infrastructure est maintenant protégée et nos équipes formées aux bonnes pratiques."
              </p>
              <p className="font-semibold text-gray-900">PME - Montpellier</p>
              <p className="text-sm text-gray-600">Secteur Industriel</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASectionTekup
        badge="Prêt à moderniser votre IT ?"
        title="Demandez votre audit gratuit dès aujourd'hui"
        description="Nos experts analysent vos besoins et vous proposent les solutions les mieux adaptées à votre entreprise, avec un devis détaillé et transparent."
        primaryCTA={{
          text: "Demander un Audit Gratuit",
          link: "/contact"
        }}
        secondaryCTA={{
          text: "Prendre Rendez-vous",
          link: "/rendez-vous"
        }}
        variant="gradient"
      />
    </TekupPageLayout>
  )
}
