import React from 'react';

export function PricingTableHeader({ isAdmin }) {
  return (
    <thead className="bg-slate-700/50">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Solution</th>
        {isAdmin && (
          <>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Prix Partenaire (€ HT)</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Commission (%)</th>
          </>
        )}
        <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Prix Revendeur (€ HT)</th>
        <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Prix Public Conseillé (€ HT)</th>
        {isAdmin && (
          <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
        )}
      </tr>
    </thead>
  );
}