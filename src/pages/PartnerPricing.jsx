import React from "react"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import { usePartnerPricing } from "@/hooks/usePartnerPricing"
import { AdminControls } from "@/components/partner-pricing/AdminControls"
import { PricingTable } from "@/components/partner-pricing/PricingTable"
import { TrendingUp, Shield, Award } from "lucide-react"

export default function PartnerPricing() {
  const {
    items,
    newSolution,
    setNewSolution,
    newPrixPartenaire,
    setNewPrixPartenaire,
    newCommission,
    setNewCommission,
    isAdmin,
    handleDragEnd,
    handleAddSolution,
    handleAddSubtitle,
    handleDelete,
    handleUpdateItem,
    handleCsvImport,
    sensors,
  } = usePartnerPricing();

  const features = [
    {
      icon: TrendingUp,
      title: "Tarifs Préférentiels",
      description: "Accès exclusif aux meilleurs prix"
    },
    {
      icon: Award,
      title: "Commissions Attractives",
      description: "Jusqu'à 15% sur chaque vente"
    },
    {
      icon: Shield,
      title: "Plateforme Sécurisée",
      description: "Vos données protégées 24/7"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <Helmet>
        <title>Grille Tarifaire Partenaires - MDO SERVICES</title>
        <meta name="description" content="Consultez et gérez la grille tarifaire réservée aux partenaires MDO SERVICES." />
      </Helmet>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <Navigation />

      <div className="relative z-10 container mx-auto px-4 py-12 pt-24 md:pt-32">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30">
              Espace Partenaire
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            Grille Tarifaire
            <br />
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
              Partenaires
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-12"
          >
            Accédez à vos tarifs préférentiels et gérez vos solutions en toute simplicité
          </motion.p>

          {/* Features Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Admin Controls */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <AdminControls
              newSolution={newSolution}
              setNewSolution={setNewSolution}
              newPrixPartenaire={newPrixPartenaire}
              setNewPrixPartenaire={setNewPrixPartenaire}
              newCommission={newCommission}
              setNewCommission={setNewCommission}
              handleAddSolution={handleAddSolution}
              handleAddSubtitle={handleAddSubtitle}
              handleCsvImport={handleCsvImport}
            />
          </motion.div>
        )}

        {/* Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl"
        >
          <PricingTable
            items={items}
            isAdmin={isAdmin}
            sensors={sensors}
            handleDragEnd={handleDragEnd}
            handleDelete={handleDelete}
            handleUpdateItem={handleUpdateItem}
          />
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-blue-100 text-sm">
            Besoin d'aide ? Contactez notre équipe support partenaires au{" "}
            <a href="tel:0499133010" className="text-white font-semibold hover:underline">
              04 99 13 30 10
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
