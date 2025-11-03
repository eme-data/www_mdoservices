import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  FileText,
  Calendar,
  User,
  Search,
  Filter,
  Settings,
  Upload
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchAllPosts, deletePost, updatePost } from '@/lib/api'
import { PartnerNav } from '@/components/partner/PartnerNav'

export default function BlogAdmin() {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchQuery, statusFilter])

  const filterPosts = () => {
    let filtered = [...posts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.author_name?.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (statusFilter === 'published') {
      filtered = filtered.filter(post => post.published_at)
    } else if (statusFilter === 'draft') {
      filtered = filtered.filter(post => !post.published_at)
    }

    setFilteredPosts(filtered)
  }

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchAllPosts()
      setPosts(data || [])
    } catch (err) {
      console.error('Error loading posts:', err)
      setError('Impossible de charger les articles')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (postId, postTitle) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer l'article "${postTitle}" ?`)) {
      return
    }

    try {
      await deletePost(postId)
      setPosts(posts.filter(p => p.id !== postId))
    } catch (err) {
      console.error('Error deleting post:', err)
      alert('Erreur lors de la suppression de l\'article')
    }
  }

  const handleTogglePublish = async (post) => {
    const newPublishedAt = post.published_at
      ? null
      : new Date().toISOString().slice(0, 19).replace('T', ' ')

    try {
      const updated = await updatePost(post.id, { published_at: newPublishedAt })
      setPosts(posts.map(p => p.id === post.id ? updated : p))
    } catch (err) {
      console.error('Error toggling publish status:', err)
      alert('Erreur lors de la modification du statut')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Jamais'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-lg">Chargement...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion du Blog</h1>
            <p className="text-gray-600 mt-2">
              {filteredPosts.length} / {posts.length} article{posts.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/partner/blog/categories')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Catégories
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/partner/blog/tags')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Tags
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/partner/blog/import')}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button
              onClick={() => navigate('/partner/blog/new')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Article
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, extrait ou auteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="published">Publiés</option>
              <option value="draft">Brouillons</option>
            </select>
          </div>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg mb-4">Aucun article pour le moment</p>
            <Button
              onClick={() => navigate('/partner/blog/new')}
              variant="outline"
            >
              Créer votre premier article
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Auteur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {post.cover_image_url && (
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-16 h-16 rounded object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            /{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published_at
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published_at ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {post.author_name || 'Anonyme'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {formatDate(post.published_at || post.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublish(post)}
                          title={post.published_at ? 'Dépublier' : 'Publier'}
                        >
                          {post.published_at ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/partner/blog/edit/${post.id}`)}
                          title="Éditer"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id, post.title)}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
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
