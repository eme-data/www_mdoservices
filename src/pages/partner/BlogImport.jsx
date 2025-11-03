import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileJson, Download, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { bulkImportPosts } from '@/lib/api'
import { PartnerNav } from '@/components/partner/PartnerNav'

export default function BlogImport() {
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState(null)
  const [fileContent, setFileContent] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result)
        setFileContent(json)
        setResult(null)
      } catch (err) {
        alert('Fichier JSON invalide')
      }
    }
    reader.readAsText(file)
  }

  const handleImport = async (skipDuplicates) => {
    if (!fileContent) {
      alert('Veuillez charger un fichier JSON')
      return
    }

    const posts = Array.isArray(fileContent) ? fileContent : [fileContent]

    setImporting(true)
    setResult(null)

    try {
      const importResult = await bulkImportPosts(posts, skipDuplicates)
      setResult(importResult)
    } catch (err) {
      console.error('Import error:', err)
      alert(err.message || 'Erreur lors de l\'import')
    } finally {
      setImporting(false)
    }
  }

  const downloadTemplate = () => {
    const template = [
      {
        title: "Mon premier article",
        slug: "mon-premier-article",
        excerpt: "Ceci est un extrait de l'article",
        content: "<p>Contenu HTML de l'article...</p>",
        category_slug: "actualites",
        tags: ["tech", "blog"],
        cover_image_url: "https://example.com/image.jpg",
        author_name: "Auteur",
        published_at: "2024-01-15 10:00:00"
      }
    ]

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'blog-import-template.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <PartnerNav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Import en masse</h1>
            <p className="text-gray-600">
              Importez plusieurs articles depuis un fichier JSON
            </p>
          </div>

          {/* Template Download */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <FileJson className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900 mb-2">
                  Fichier modèle
                </h3>
                <p className="text-blue-700 mb-4">
                  Téléchargez le fichier modèle JSON pour voir le format attendu.
                </p>
                <Button onClick={downloadTemplate} variant="outline" className="border-blue-300 text-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le modèle JSON
                </Button>
              </div>
            </div>
          </div>

          {/* Upload */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">1. Charger le fichier JSON</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-blue-600 font-medium hover:underline">
                  Cliquez pour sélectionner un fichier JSON
                </span>
              </label>
              {fileContent && (
                <div className="mt-4 text-sm text-green-600 font-medium">
                  ✓ Fichier chargé ({Array.isArray(fileContent) ? fileContent.length : 1} article{Array.isArray(fileContent) && fileContent.length > 1 ? 's' : ''})
                </div>
              )}
            </div>
          </div>

          {/* Import Actions */}
          {fileContent && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">2. Lancer l'import</h2>
              <div className="space-y-3">
                <Button
                  onClick={() => handleImport(true)}
                  disabled={importing}
                  className="w-full bg-blue-600 text-white"
                >
                  {importing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Importer (ignorer les doublons)
                </Button>
                <Button
                  onClick={() => handleImport(false)}
                  disabled={importing}
                  variant="outline"
                  className="w-full"
                >
                  Importer (signaler les erreurs de doublons)
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Résultats de l'import</h2>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{result.total}</div>
                  <div className="text-sm text-gray-600">Total</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{result.imported}</div>
                  <div className="text-sm text-gray-600">Importés</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600">{result.skipped}</div>
                  <div className="text-sm text-gray-600">Ignorés</div>
                </div>
              </div>

              {/* Success Message */}
              {result.imported > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700">
                    {result.imported} article{result.imported > 1 ? 's' : ''} importé{result.imported > 1 ? 's' : ''} avec succès !
                  </span>
                </div>
              )}

              {/* Skipped Message */}
              {result.skipped > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-700">
                    {result.skipped} article{result.skipped > 1 ? 's' : ''} ignoré{result.skipped > 1 ? 's' : ''} (doublon{result.skipped > 1 ? 's' : ''})
                  </span>
                </div>
              )}

              {/* Errors */}
              {result.errors && result.errors.length > 0 && (
                <div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">
                      {result.errors.length} erreur{result.errors.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {result.errors.map((error, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded p-3">
                        <div className="text-sm font-medium text-red-900">
                          Article #{error.index + 1}: {error.title}
                        </div>
                        <div className="text-sm text-red-700 mt-1">
                          {error.error}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Documentation */}
          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 className="font-bold mb-3">Format du fichier JSON</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
{`[
  {
    "title": "Titre de l'article",
    "slug": "titre-de-larticle",
    "excerpt": "Résumé court",
    "content": "<p>Contenu HTML...</p>",
    "category_slug": "actualites",
    "tags": ["tag1", "tag2"],
    "cover_image_url": "https://...",
    "author_name": "Auteur",
    "published_at": "2024-01-15 10:00:00"
  }
]`}
            </pre>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>• <strong>title</strong> et <strong>slug</strong> sont obligatoires</li>
              <li>• <strong>category_slug</strong> doit correspondre à une catégorie existante</li>
              <li>• <strong>tags</strong> : les tags inexistants seront créés automatiquement</li>
              <li>• <strong>published_at</strong> : laisser vide ou null pour créer un brouillon</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  )
}
