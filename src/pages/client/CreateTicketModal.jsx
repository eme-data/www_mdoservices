import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createTicket, TICKET_CATEGORIES, TICKET_PRIORITIES } from "@/lib/tickets-api"
import { useToast } from "@/components/ui/use-toast"

/**
 * Modal pour créer un nouveau ticket
 */
export default function CreateTicketModal({ isOpen, onClose, onTicketCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'technique',
    priority: 'normal'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.title.trim()) {
      setError('Le titre est requis')
      return
    }

    if (!formData.description.trim()) {
      setError('La description est requise')
      return
    }

    if (formData.title.length > 200) {
      setError('Le titre ne doit pas dépasser 200 caractères')
      return
    }

    setLoading(true)

    try {
      const result = await createTicket(formData)

      toast({
        title: "Ticket créé avec succès!",
        description: `Numéro de ticket: ${result.ticket.ticket_number}`,
      })

      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        category: 'technique',
        priority: 'normal'
      })

      // Callback pour rafraîchir la liste
      if (onTicketCreated) {
        onTicketCreated(result.ticket)
      }

      // Fermer le modal
      onClose()

    } catch (err) {
      setError(err.message || 'Une erreur est survenue')
      toast({
        title: "Erreur",
        description: err.message || 'Impossible de créer le ticket',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-900">Créer un ticket de support</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Titre */}
            <div>
              <Label htmlFor="title" className="text-base font-semibold mb-2">
                Titre du problème <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Impossible de se connecter à mon compte email"
                maxLength={200}
                disabled={loading}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.title.length}/200 caractères
              </p>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-semibold mb-2">
                Description détaillée <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez votre problème en détail: quand est-il survenu, quelles sont les étapes pour le reproduire, etc."
                rows={6}
                disabled={loading}
                className="mt-2"
              />
            </div>

            {/* Catégorie et Priorité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Catégorie */}
              <div>
                <Label htmlFor="category" className="text-base font-semibold mb-2">
                  Catégorie <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TICKET_CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priorité */}
              <div>
                <Label htmlFor="priority" className="text-base font-semibold mb-2">
                  Priorité <span className="text-red-500">*</span>
                </Label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TICKET_PRIORITIES.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Note informative */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Notre équipe de support sera notifiée immédiatement de votre demande.
                Vous recevrez un numéro de ticket et pourrez suivre l'avancement dans cette interface.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  'Créer le ticket'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
