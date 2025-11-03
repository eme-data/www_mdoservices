import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createPost, updatePost, fetchAllPosts, fetchCategories } from '@/lib/api'
import { PartnerNav } from '@/components/partner/PartnerNav'
import { TiptapEditor } from '@/components/blog/TiptapEditor'
import { ImageUploader } from '@/components/blog/ImageUploader'
import { MediaGallery } from '@/components/blog/MediaGallery'
import { TagSelector } from '@/components/blog/TagSelector'

export default function BlogPostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showMediaGallery, setShowMediaGallery] = useState(false)
  const [categories, setCategories] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    author_name: '',
    category_id: '',
    tags: [],
    published_at: ''
  })

  useEffect(() => {
    loadCategories()
    if (isEditing) {
      loadPost()
    }
  }, [id])

  const loadCategories = async () => {
    try {
      const cats = await fetchCategories()
      setCategories(cats || [])
    } catch (err) {
      console.error('Error loading categories:', err)
    }
  }

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
          category_id: post.category_id || '',
          tags: post.tags || [],
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
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
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

  const handleContentChange = (html) => {
    setFormData(prev => ({ ...prev, content: html }))
  }

  const handleImageUploaded = (url) => {
    setFormData(prev => ({ ...prev, cover_image_url: url }))
  }

  const handleTagsChange = (tags) => {
    setFormData(prev => ({ ...prev, tags }))
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

    if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      alert('Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets')
      return
    }

    setSaving(true)

    try {
      const postData = {
        ...formData,
        category_id: formData.category_id || null,
        tag_ids: formData.tags.map(t => t.id),
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie
                  </label>
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Aucune catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <TagSelector
                    selectedTags={formData.tags}
                    onChange={handleTagsChange}
                  />
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

                {/* Content - Tiptap Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenu *
                  </label>
                  <TiptapEditor
                    content={formData.content}
                    onChange={handleContentChange}
                  />
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image de couverture
                  </label>
                  <ImageUploader
                    onImageUploaded={handleImageUploaded}
                    onMediaGalleryOpen={() => setShowMediaGallery(true)}
                  />
                  {formData.cover_image_url && !formData.cover_image_url.includes('blob') && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Aperçu actuel:</p>
                      <img
                        src={formData.cover_image_url}
                        alt="Couverture"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    </div>
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
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Media Gallery Modal */}
      <MediaGallery
        isOpen={showMediaGallery}
        onClose={() => setShowMediaGallery(false)}
        onSelectImage={handleImageUploaded}
      />
    </>
  )
}
