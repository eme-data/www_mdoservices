import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Folder, Loader2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api'
import { PartnerNav } from '@/components/partner/PartnerNav'

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6'
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const cats = await fetchCategories()
      setCategories(cats || [])
    } catch (err) {
      console.error('Error loading categories:', err)
      alert('Erreur lors du chargement des catégories')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('Le nom est obligatoire')
      return
    }

    try {
      if (editingId) {
        const updated = await updateCategory(editingId, formData)
        setCategories(categories.map(c => c.id === editingId ? updated : c))
      } else {
        const created = await createCategory(formData)
        setCategories([...categories, created])
      }

      resetForm()
      alert(editingId ? 'Catégorie mise à jour !' : 'Catégorie créée !')
    } catch (err) {
      console.error('Error saving category:', err)
      alert(err.message || 'Erreur lors de la sauvegarde')
    }
  }

  const handleEdit = (category) => {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      color: category.color
    })
    setShowForm(true)
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Supprimer la catégorie "${name}" ?`)) {
      return
    }

    try {
      await deleteCategory(id)
      setCategories(categories.filter(c => c.id !== id))
    } catch (err) {
      console.error('Error deleting category:', err)
      alert(err.message || 'Erreur lors de la suppression')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '', color: '#3B82F6' })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <>
      <PartnerNav />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Catégories</h1>
              <p className="text-gray-600 mt-2">
                {categories.length} catégorie{categories.length > 1 ? 's' : ''}
              </p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Catégorie
            </Button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">
                {editingId ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        const name = e.target.value
                        setFormData({
                          ...formData,
                          name,
                          slug: formData.slug || generateSlug(name)
                        })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom de la catégorie"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="slug-de-la-categorie"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Description de la catégorie"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="bg-blue-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? 'Mettre à jour' : 'Créer'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Categories List */}
          {categories.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Folder className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-4">Aucune catégorie</p>
              <Button onClick={() => setShowForm(true)} variant="outline">
                Créer votre première catégorie
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      <Folder
                        className="w-6 h-6"
                        style={{ color: category.color }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-700"
                        title="Éditer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="text-red-600 hover:text-red-700"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-mono mb-2">
                    /{category.slug}
                  </p>
                  {category.description && (
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}
