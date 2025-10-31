import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

/**
 * SolutionHeroTekup - Hero moderne et réutilisable pour pages solutions
 *
 * Props:
 * - badge: Text du badge (ex: "Services Cloud")
 * - title: Titre principal (peut contenir des <span> pour gradients)
 * - description: Description sous le titre
 * - primaryCTA: { text, link } - Bouton principal
 * - secondaryCTA: { text, link } - Bouton secondaire (optionnel)
 * - features: Array de strings - Points clés à afficher
 * - image: URL de l'image (optionnel)
 * - stats: Array de { value, label } - Statistiques (optionnel)
 */
export function SolutionHeroTekup({
  badge = "Solutions IT",
  title,
  description,
  primaryCTA,
  secondaryCTA,
  features = [],
  image,
  stats = []
}) {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 pt-24 pb-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid ${image || stats.length > 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 items-center`}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-white ${!image && !stats.length ? 'text-center mx-auto max-w-4xl' : ''}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 ${!image && !stats.length ? 'mx-auto' : ''}`}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">{badge}</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${!image && !stats.length ? 'text-center' : ''}`}
              dangerouslySetInnerHTML={{ __html: title }}
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-lg md:text-xl text-blue-100 mb-8 leading-relaxed ${!image && !stats.length ? 'text-center max-w-2xl mx-auto' : ''}`}
            >
              {description}
            </motion.p>

            {/* Features List */}
            {features.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`space-y-3 mb-8 ${!image && !stats.length ? 'max-w-2xl mx-auto' : ''}`}
              >
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-blue-100">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`flex flex-wrap gap-4 ${!image && !stats.length ? 'justify-center' : ''}`}
            >
              {primaryCTA && (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full"
                >
                  <Link to={primaryCTA.link}>
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}

              {secondaryCTA && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full"
                >
                  <Link to={secondaryCTA.link}>
                    {secondaryCTA.text}
                  </Link>
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Image or Stats */}
          {(image || stats.length > 0) && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              {image && (
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl"></div>
                  <img
                    src={image}
                    alt={badge}
                    className="relative rounded-2xl shadow-2xl w-full"
                  />
                </div>
              )}

              {stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center"
                    >
                      <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                      <p className="text-blue-100 text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}
