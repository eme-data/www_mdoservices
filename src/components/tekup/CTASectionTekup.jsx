import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

/**
 * CTASectionTekup - Section Call-to-Action moderne avec gradient
 *
 * Props:
 * - badge: Text du badge (optionnel)
 * - title: Titre principal
 * - description: Description
 * - primaryCTA: { text, link } - Bouton principal
 * - secondaryCTA: { text, link } - Bouton secondaire (optionnel)
 * - variant: "gradient" | "solid" | "minimal" (default: "gradient")
 */
export function CTASectionTekup({
  badge,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = "gradient"
}) {
  const backgrounds = {
    gradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500",
    solid: "bg-blue-600",
    minimal: "bg-gray-50"
  }

  const textColors = {
    gradient: "text-white",
    solid: "text-white",
    minimal: "text-gray-900"
  }

  const descriptionColors = {
    gradient: "text-blue-100",
    solid: "text-blue-100",
    minimal: "text-gray-600"
  }

  return (
    <section className={`relative py-20 overflow-hidden ${backgrounds[variant]}`}>
      {/* Background Effects (only for gradient/solid) */}
      {variant !== "minimal" && (
        <>
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className={`text-sm font-medium ${textColors[variant]}`}>{badge}</span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${textColors[variant]}`}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-lg md:text-xl mb-10 leading-relaxed ${descriptionColors[variant]}`}
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {primaryCTA && (
              <Button
                asChild
                size="lg"
                className={
                  variant === "minimal"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                }
                className={`${
                  variant === "minimal"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    : "bg-white text-blue-600 hover:bg-blue-50"
                } shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full`}
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
                className={
                  variant === "minimal"
                    ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                }
                className={`${
                  variant === "minimal"
                    ? "border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                } shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full`}
              >
                <Link to={secondaryCTA.link}>
                  {secondaryCTA.text}
                </Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
