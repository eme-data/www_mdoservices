import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, UserCircle } from 'lucide-react'

export function BlogPostCard({ post }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full ring-1 ring-slate-200 dark:ring-slate-700"
    >
      {post.cover_image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={post.cover_image_url}
            alt={`Image de couverture pour ${post.title}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
           src="https://images.unsplash.com/photo-1679521358679-301c295e2cd4" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        {post.excerpt && (
          <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed flex-grow">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-500 mb-2">
            <CalendarDays size={14} className="mr-2" />
            <span>Publié le {formatDate(post.published_at)}</span>
          </div>
          {post.author_name && (
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-500">
              <UserCircle size={14} className="mr-2" />
              <span>Par {post.author_name}</span>
            </div>
          )}
        </div>
        <Link to={`/blog/${post.slug}`} className="mt-4 inline-block">
          <Button variant="link" className="text-blue-600 dark:text-blue-400 hover:underline p-0">
            Lire la suite &rarr;
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

// Dummy Button component if not available globally or for isolation
const Button = ({ variant, className, children, ...props }) => {
  // Basic styling for a link-like button
  const baseStyle = "font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variantStyle = variant === "link" ? "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" : "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  )
}