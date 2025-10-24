import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CsvImport } from "@/components/CsvImport";

export function AdminControls({
  newSolution,
  setNewSolution,
  newPrixPartenaire,
  setNewPrixPartenaire,
  newCommission,
  setNewCommission,
  handleAddSolution,
  handleAddSubtitle,
  handleCsvImport
}) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 mb-10 ring-1 ring-slate-700">
      <h2 className="text-2xl font-semibold mb-6 text-center">Ajouter un Élément</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 items-end">
        <Input
          placeholder="Solution ou sous-titre"
          value={newSolution}
          onChange={(e) => setNewSolution(e.target.value)}
          className="bg-slate-700 border-slate-600 placeholder-slate-400"
        />
        <Input
          placeholder="Prix partenaire (€ HT)"
          value={newPrixPartenaire}
          onChange={(e) => setNewPrixPartenaire(e.target.value)}
          className="bg-slate-700 border-slate-600 placeholder-slate-400"
        />
        <Input
          placeholder="Commission (%)"
          value={newCommission}
          onChange={(e) => setNewCommission(e.target.value)}
          className="bg-slate-700 border-slate-600 placeholder-slate-400"
        />
        <div className="flex flex-col sm:flex-row gap-3 md:col-span-2 lg:col-span-1">
          <Button onClick={handleAddSolution} className="w-full bg-blue-600 hover:bg-blue-500 transition-colors">
            Ajouter Solution
          </Button>
          <Button onClick={handleAddSubtitle} variant="outline" className="w-full border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors">
            Ajouter Sous-titre
          </Button>
        </div>
      </div>
      <div className="mt-6 border-t border-slate-700 pt-6">
        <h3 className="text-lg font-medium mb-3 text-center">Importer depuis CSV</h3>
        <CsvImport onImport={handleCsvImport} />
      </div>
    </div>
  );
}