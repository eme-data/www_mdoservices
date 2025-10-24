import React from "react"
import Navigation from "@/components/Navigation"
import { Helmet } from "react-helmet"
import { usePartnerPricing } from "@/hooks/usePartnerPricing"
import { AdminControls } from "@/components/partner-pricing/AdminControls"
import { PricingTable } from "@/components/partner-pricing/PricingTable"

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white">
      <Helmet>
        <title>Grille Tarifaire Partenaires - MDO SERVICES</title>
        <meta name="description" content="Consultez et gérez la grille tarifaire réservée aux partenaires MDO SERVICES." />
      </Helmet>
      <Navigation />
      <div className="container mx-auto px-4 py-12 pt-24 md:pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">Grille Tarifaire Partenaires</h1>
        
        {isAdmin && (
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
        )}

        <PricingTable
          items={items}
          isAdmin={isAdmin}
          sensors={sensors}
          handleDragEnd={handleDragEnd}
          handleDelete={handleDelete}
          handleUpdateItem={handleUpdateItem}
        />
      </div>
    </div>
  )
}