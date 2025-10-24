import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import { fetchPublishedPosts } from '@/lib/api'
import { BlogPostCard } from '@/components/BlogPostCard'
import { PageLayout } from '@/components/layout/PageLayout' 
import { Loader2, AlertTriangle } from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPublishedPosts()
        setPosts(data || [])
      } catch (err) {
        console.error("Error fetching posts in BlogPage:", err)
        let errorMessage = 'Impossible de charger les articles. Veuillez réessayer plus tard.'
        if (err.message && err.message.toLowerCase().includes('failed to fetch')) {
          errorMessage = 'Un problème de réseau est survenu lors de la récupération des articles. Vérifiez votre connexion et réessayez.'
        } else if (err.message) {
          errorMessage = `Erreur: ${err.message}`
        }
        setError(errorMessage)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    getPosts()
  }, [])

  return (
    <PageLayout>
      <Helmet>
        <title>Blog - MDO SERVICES</title>
        <meta name="description" content="Découvrez les derniers articles, actualités et conseils IT de MDO SERVICES." />
        <link rel="canonical" href="https://mdoservices.fr/blog" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-teal-400 to-green-500">
            Notre Blog
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Restez informé des dernières tendances IT, des conseils d'experts et des actualités de MDO SERVICES.
          </p>
        </motion.div>

        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="ml-4 mt-4 text-xl text-slate-600 dark:text-slate-300">Chargement des articles...</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-6 rounded-lg shadow-md max-w-md mx-auto"
          >
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500 dark:text-red-400" />
            <p className="text-xl font-semibold mb-2">Oops ! Une erreur est survenue.</p>
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        {!loading && !error && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-500 dark:text-slate-400 py-10"
          >
            <p className="text-2xl mb-4">Aucun article publié pour le moment.</p>
            <p>Revenez bientôt pour découvrir nos actualités !</p>
          </motion.div>
        )}

        {!loading && !error && posts.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </motion.div>
        )}
      </div>
    </PageLayout>
  )
}