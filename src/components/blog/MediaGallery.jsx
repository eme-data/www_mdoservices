import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Loader2, Image as ImageIcon, Check, Trash2 } from 'lucide-react'
import { fetchMedia, deleteMedia } from '@/lib/api'
import { Button } from '@/components/ui/button'

export function MediaGallery({ isOpen, onClose, onSelectImage }) {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    if (isOpen) {
      loadMedia()
    }
  }, [isOpen])

  const loadMedia = async () => {
    setLoading(true)
    try {
      const result = await fetchMedia(100, 0)
      setMedia(result.items || [])
    } catch (err) {
      console.error('Error loading media:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = () => {
    if (selectedImage) {
      onSelectImage && onSelectImage(selectedImage.file_url)
      onClose && onClose()
    }
  }

  const handleDelete = async (imageId, event) => {
    event.stopPropagation()

    if (!confirm('Supprimer cette image ?')) {
      return
    }

    setDeleting(imageId)
    try {
      await deleteMedia(imageId)
      setMedia(media.filter(m => m.id !== imageId))
      if (selectedImage?.id === imageId) {
        setSelectedImage(null)
      }
    } catch (err) {
      console.error('Error deleting media:', err)
      alert('Erreur lors de la suppression')
    } finally {
      setDeleting(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Galerie d'images</h2>
            <p className="text-sm text-gray-600 mt-1">
              {media.length} image{media.length > 1 ? 's' : ''} disponible{media.length > 1 ? 's' : ''}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
              <p className="text-gray-600">Chargement des images...</p>
            </div>
          ) : media.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <ImageIcon className="w-16 h-16 mb-4 text-gray-400" />
              <p className="text-lg font-medium">Aucune image dans la galerie</p>
              <p className="text-sm mt-1">Uploadez votre première image pour commencer</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage?.id === image.id
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={image.file_url}
                      alt={image.original_filename}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Selected indicator */}
                  {selectedImage?.id === image.id && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDelete(image.id, e)}
                    disabled={deleting === image.id}
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white rounded-full p-1 hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleting === image.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Image info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-medium truncate">
                      {image.original_filename}
                    </p>
                    <p className="text-white/80 text-xs">
                      {(image.file_size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedImage ? (
              <span>Image sélectionnée: {selectedImage.original_filename}</span>
            ) : (
              <span>Sélectionnez une image</span>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={handleSelect}
              disabled={!selectedImage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              Utiliser cette image
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
