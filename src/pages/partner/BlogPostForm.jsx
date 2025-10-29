import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createPost, updatePost, fetchAllPosts } from '@/lib/api'
import { PartnerNav } from '@/components/partner/PartnerNav'

export default function BlogPostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    author_name: '',
    published_at: ''
  })

  useEffect(() => {
    if (isEditing) {
      loadPost()
    }
  }, [id])

  const loadPost = async () => {
    try {
      setLoading(true)
      const posts = await fetchAllPosts()
      const post = posts.find(p => p.id === parseInt(id))

      if (post) {
        setFormData({
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          cover_image_url: post.cover_image_url || '',
          author_name: post.author_name || '',
          published_at: post.published_at || ''
        })
      } else {
        alert('Article introuvable')
        navigate('/partner/blog')
      }
    } catch (err) {
      console.error('Error loading post:', err)
      alert('Erreur lors du chargement de l\'article')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e, publish = false) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      alert('Le titre est obligatoire')
      return
    }

    if (!formData.slug.trim()) {
      alert('Le slug est obligatoire')
      return
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      alert('Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets')
      return
    }

    setSaving(true)

    try {
      const postData = {
        ...formData,
        published_at: publish ? new Date().toISOString().slice(0, 19).replace('T', ' ') : formData.published_at || null
      }

      if (isEditing) {
        await updatePost(parseInt(id), postData)
      } else {
        await createPost(postData)
      }

      alert(isEditing ? 'Article mis à jour !' : 'Article créé !')
      navigate('/partner/blog')
    } catch (err) {
      console.error('Error saving post:', err)
      alert(err.message || 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
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
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/partner/blog')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Éditer l\'article' : 'Nouvel Article'}
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Éditer' : 'Prévisualiser'}
          </Button>
        </div>

        {/* Form */}
        {!showPreview ? (
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Titre de l'article"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="mon-article-slug"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  URL: /blog/{formData.slug || 'mon-article-slug'}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Extrait
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Court résumé de l'article (affiché dans la liste)"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenu (HTML/Markdown) *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="<p>Contenu de l'article...</p>"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Vous pouvez utiliser du HTML ou du Markdown
                </p>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de couverture (URL)
                </label>
                <input
                  type="url"
                  name="cover_image_url"
                  value={formData.cover_image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.cover_image_url && (
                  <img
                    src={formData.cover_image_url}
                    alt="Aperçu"
                    className="mt-4 w-full max-w-md h-48 object-cover rounded-lg"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auteur
                </label>
                <input
                  type="text"
                  name="author_name"
                  value={formData.author_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom de l'auteur"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600">
                {formData.published_at ? (
                  <span className="text-green-600 font-medium">✓ Publié</span>
                ) : (
                  <span className="text-yellow-600 font-medium">● Brouillon</span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="outline"
                  disabled={saving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Enregistrer le brouillon' : 'Enregistrer en brouillon'}
                </Button>
                <Button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={saving}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4 mr-2" />
                  )}
                  Publier
                </Button>
              </div>
            </div>
          </form>
        ) : (
          /* Preview */
          <div className="bg-white rounded-lg shadow p-8">
            <div className="max-w-3xl mx-auto">
              {formData.cover_image_url && (
                <img
                  src={formData.cover_image_url}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {formData.title || 'Sans titre'}
              </h1>
              {formData.author_name && (
                <p className="text-gray-600 mb-6">Par {formData.author_name}</p>
              )}
              {formData.excerpt && (
                <p className="text-xl text-gray-600 italic mb-6">
                  {formData.excerpt}
                </p>
              )}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
    </>
  )
}
