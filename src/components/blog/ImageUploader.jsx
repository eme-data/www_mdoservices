import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2, Check, Image as ImageIcon } from 'lucide-react'
import { uploadMedia } from '@/lib/api'
import { Button } from '@/components/ui/button'

export function ImageUploader({ onImageUploaded, onMediaGalleryOpen }) {
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [error, setError] = useState(null)

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('La taille du fichier ne doit pas dépasser 10MB')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const result = await uploadMedia(file)
      setUploadedImage(result)
      onImageUploaded && onImageUploaded(result.file_url)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Erreur lors de l\'upload')
    } finally {
      setUploading(false)
    }
  }, [onImageUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']
    },
    maxFiles: 1,
    disabled: uploading
  })

  const clearUpload = () => {
    setUploadedImage(null)
    setError(null)
    onImageUploaded && onImageUploaded('')
  }

  return (
    <div className="space-y-4">
      {!uploadedImage ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : uploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <>
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-gray-600">Upload en cours...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400" />
                {isDragActive ? (
                  <p className="text-blue-600 font-medium">Déposez l'image ici...</p>
                ) : (
                  <div>
                    <p className="text-gray-700 font-medium mb-1">
                      Glissez-déposez une image ou cliquez pour sélectionner
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF, WebP, SVG - Max 10MB
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-green-700">
              <Check className="w-5 h-5" />
              <span className="font-medium">Image uploadée avec succès</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearUpload}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-1" />
              Supprimer
            </Button>
          </div>
          <img
            src={uploadedImage.file_url}
            alt="Uploaded"
            className="w-full max-h-64 object-contain rounded-lg bg-white"
          />
          <div className="mt-3 text-sm text-gray-600">
            <p>Fichier: {uploadedImage.original_filename}</p>
            <p>Taille: {(uploadedImage.file_size / 1024).toFixed(2)} KB</p>
            {uploadedImage.width && uploadedImage.height && (
              <p>Dimensions: {uploadedImage.width} × {uploadedImage.height}px</p>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Erreur</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {onMediaGalleryOpen && (
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={onMediaGalleryOpen}
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Choisir depuis la galerie
          </Button>
        </div>
      )}
    </div>
  )
}
