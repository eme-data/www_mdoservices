import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Tag, Loader2, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchTags, createTag, deleteTag } from '@/lib/api'
import { PartnerNav } from '@/components/partner/PartnerNav'

export default function TagsAdmin() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', slug: '' })

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    try {
      setLoading(true)
      const fetchedTags = await fetchTags()
      setTags(fetchedTags || [])
    } catch (err) {
      console.error('Error loading tags:', err)
      alert('Erreur lors du chargement des tags')
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
      const created = await createTag(formData)
      setTags([...tags, created])
      resetForm()
      alert('Tag créé !')
    } catch (err) {
      console.error('Error creating tag:', err)
      alert(err.message || 'Erreur lors de la création')
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Supprimer le tag "${name}" ?`)) {
      return
    }

    try {
      await deleteTag(id)
      setTags(tags.filter(t => t.id !== id))
    } catch (err) {
      console.error('Error deleting tag:', err)
      alert(err.message || 'Erreur lors de la suppression')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', slug: '' })
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
              <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
              <p className="text-gray-600 mt-2">
                {tags.length} tag{tags.length > 1 ? 's' : ''}
              </p>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Tag
            </Button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Nouveau tag</h2>
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
                          name,
                          slug: generateSlug(name)
                        })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom du tag"
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
                      placeholder="slug-du-tag"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="bg-blue-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Créer
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Tags List */}
          {tags.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Tag className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg mb-4">Aucun tag</p>
              <Button onClick={() => setShowForm(true)} variant="outline">
                Créer votre premier tag
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tag
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisation
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tags.map((tag) => (
                    <tr key={tag.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Tag className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {tag.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 font-mono">
                          {tag.slug}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {tag.usage_count || 0} article{(tag.usage_count || 0) > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(tag.id, tag.name)}
                          className="text-red-600 hover:text-red-700"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}
