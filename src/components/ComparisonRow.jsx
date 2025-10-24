import React from "react"

export function ComparisonRow({ feature, basic, pro, enterprise }) {
  return (
    <tr className="border-b">
      <td className="py-4 px-4 font-medium">{feature}</td>
      <td className="text-center py-4 px-4">{basic}</td>
      <td className="text-center py-4 px-4 bg-blue-50">{pro}</td>
      <td className="text-center py-4 px-4">{enterprise}</td>
    </tr>
  )
}