import React from "react"
import { Building, Users, Clock } from "lucide-react"

export function LocalPresence() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Votre Partenaire IT en Occitanie</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Couverture Régionale</h3>
            <p className="text-gray-600">Présents dans toute l'Occitanie, nos équipes sont basées en Ariège pour vous servir</p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Support de Proximité</h3>
            <p className="text-gray-600">Une équipe locale dédiée à votre service dans tous les départements d'Occitanie</p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Réactivité Garantie</h3>
            <p className="text-gray-600">Intervention rapide sur site dans toute la région Occitanie</p>
          </div>
        </div>
      </div>
    </section>
  )
}