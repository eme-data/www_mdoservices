import React from "react"
import { Check, X } from "lucide-react"

export function PricingFeature({ children, included, light }) {
  return (
    <li className="flex items-center">
      {included ? (
        <Check className={`h-5 w-5 mr-2 ${light ? 'text-white' : 'text-green-500'}`} />
      ) : (
        <X className={`h-5 w-5 mr-2 ${light ? 'text-gray-300' : 'text-gray-400'}`} />
      )}
      <span className={!included ? (light ? 'text-gray-300' : 'text-gray-400') : ''}>{children}</span>
    </li>
  )
}