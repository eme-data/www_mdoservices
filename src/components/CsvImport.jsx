import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Download } from "lucide-react"
import Papa from "papaparse"

export function CsvImport({ onImport }) {
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          const validData = results.data
            .filter(row => row.length >= 3 && row[0] && row[1] && row[2])
            .map(row => ({
              type: "solution",
              solution: row[0],
              prix_partenaire: row[1],
              commission: row[2]
            }))
          onImport(validData)
        },
        header: false,
        skipEmptyLines: true
      })
    }
    // Reset input
    event.target.value = null
  }

  const handleDownloadTemplate = () => {
    const csvContent = [
      ["Solution", "Prix Partenaire", "Commission (%)"],
      ["Microsoft 365 Business Basic", "5,50", "15"],
      ["Microsoft 365 Business Standard", "12,50", "15"],
      ["Google Workspace Business Starter", "6,00", "15"]
    ]

    const csv = Papa.unparse(csvContent)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    
    link.setAttribute("href", url)
    link.setAttribute("download", "modele_import_tarifs.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          onClick={handleDownloadTemplate}
          variant="outline"
          className="flex-1"
        >
          <Download className="mr-2 h-4 w-4" />
          Télécharger le modèle CSV
        </Button>
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          Importer CSV
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".csv"
        className="hidden"
      />
      <p className="text-sm text-gray-500 mt-2">
        Format attendu : Solution, Prix Partenaire, Commission (%)
      </p>
    </div>
  )
}