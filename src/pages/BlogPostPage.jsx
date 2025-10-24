import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import { fetchPostBySlug } from '@/lib/api'
import { PageLayout } from '@/components/layout/PageLayout'
import { ArrowLeft, CalendarDays, UserCircle, Tag, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPostBySlug(slug)
        if (data) {
          setPost(data)
        } else {
          setError('Article non trouvé. Il se peut que le lien soit incorrect ou que l\'article ait été retiré.')
        }
      } catch (err) {
        console.error(`Error fetching post ${slug} in BlogPostPage:`, err)
        let errorMessage = 'Impossible de charger l\'article. Veuillez réessayer plus tard.'
        if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
          errorMessage = 'Un problème de réseau est survenu lors de la récupération de l\'article. Vérifiez votre connexion et réessayez.'
        } else if (err.message && err.message.toLowerCase().includes('not found')) {
           errorMessage = 'Article non trouvé. Il se peut que le lien soit incorrect ou que l\'article ait été retiré.'
        } else if (err.message) {
          errorMessage = `Erreur: ${err.message}`
        }
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    getPost()
  }, [slug])

  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue'
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
      <PageLayout>
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-200px)]">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
           <p className="ml-4 mt-4 text-2xl text-slate-600 dark:text-slate-300">Chargement de l'article...</p>
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 pt-24 md:pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-8 rounded-lg shadow-xl max-w-lg mx-auto"
          >
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500 dark:text-red-400" />
            <h1 className="text-3xl font-bold mb-4">Erreur</h1>
            <p className="text-lg mb-6">{error}</p>
            <Button asChild variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-400 dark:hover:text-slate-900">
              <Link to="/blog">
                <ArrowLeft size={18} className="mr-2" /> Retour au Blog
              </Link>
            </Button>
          </motion.div>
        </div>
      </PageLayout>
    )
  }

  if (!post) {
     return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 pt-24 md:pt-32 text-center">
           <p className="text-2xl text-slate-500 dark:text-slate-400">Article non trouvé.</p>
           <p className="text-slate-400 dark:text-slate-500 mt-2">Il est possible que le lien soit incorrect ou que l'article ait été retiré.</p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/blog">
                <ArrowLeft size={18} className="mr-2" /> Retour au Blog
              </Link>
            </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <Helmet>
        <title>{`${post.title} - MDO SERVICES Blog`}</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
        <link rel="canonical" href={`https://mdoservices.fr/blog/${post.slug}`} />
      </Helmet>
      <article className="container mx-auto px-4 py-12 pt-24 md:pt-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-700">
              <Link to="/blog">
                <ArrowLeft size={18} className="mr-2" />
                Retour au Blog
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-2 text-blue-500" />
              <span>Publié le {formatDate(post.published_at)}</span>
            </div>
            {post.author_name && (
              <div className="flex items-center">
                <UserCircle size={16} className="mr-2 text-teal-500" />
                <span>Par {post.author_name}</span>
              </div>
            )}
            {post.updated_at && new Date(post.updated_at).getTime() !== new Date(post.created_at).getTime() && (
               <div className="flex items-center">
                <Tag size={16} className="mr-2 text-purple-500" />
                <span>Mis à jour le {formatDate(post.updated_at)}</span>
              </div>
            )}
          </div>
        </motion.div>

        {post.cover_image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src={post.cover_image_url}
              alt={`Image de couverture pour ${post.title}`}
              className="w-full h-auto max-h-[500px] object-cover"
             src="https://images.unsplash.com/photo-1679521358679-301c295e2cd4" />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none 
                     prose-headings:font-semibold prose-headings:text-slate-800 dark:prose-headings:text-slate-100
                     prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:underline
                     prose-strong:font-semibold
                     prose-img:rounded-md prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
        >
           <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900">
              <Link to="/blog">
                <ArrowLeft size={18} className="mr-2" /> Retour à tous les articles
              </Link>
            </Button>
        </motion.div>

      </article>
    </PageLayout>
  )
}