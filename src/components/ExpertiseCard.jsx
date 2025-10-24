import React from "react"
import { Check } from "lucide-react"

export function ExpertiseCard({ title, description, icon }) {
  return (
    <div className="premium-card rounded-xl p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-bold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  )
}