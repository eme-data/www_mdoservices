import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { simpleLogin, saveAuthState } from "@/lib/simple-api"
import { Lock, User, Eye, EyeOff, Headphones, BarChart3, Shield, Zap, ArrowRight } from "lucide-react"

export default function ClientSpace() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await simpleLogin(username, password)

      // Sauvegarder l'état d'authentification
      saveAuthState(response.user)
      localStorage.setItem("client-authenticated", "true")
      localStorage.setItem("client-name", response.user.username)

      if (rememberMe) {
        localStorage.setItem("client-remember", "true")
      }

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${response.user.username}`,
      })

      navigate("/client/dashboard")
    } catch (error) {
      toast({
        title: "Erreur d'authentification",
        description: error.message || "Identifiants incorrects",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: Headphones,
      title: "Support Dédié",
      description: "Accès direct à notre équipe support 24/7"
    },
    {
      icon: BarChart3,
      title: "Suivi en Temps Réel",
      description: "Tableaux de bord et statistiques de vos services"
    },
    {
      icon: Shield,
      title: "Sécurité Renforcée",
      description: "Vos données protégées avec les meilleurs standards"
    },
    {
      icon: Zap,
      title: "Gestion Simplifiée",
      description: "Tous vos services centralisés en un seul endroit"
    }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section (Hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">MDO Services</h1>
            <div className="h-1 w-20 bg-white/50 rounded-full"></div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Bienvenue dans votre<br />Espace Client
            </h2>
            <p className="text-green-100 text-lg">
              Gérez vos services, consultez vos statistiques et accédez au support en quelques clics.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                  <p className="text-green-100 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-8"
          >
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-green-100 text-sm">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-green-100 text-sm">Disponibilité</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-green-100 text-sm">Sécurisé</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
              MDO Services
            </h1>
            <p className="text-slate-600">Espace Client</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Connexion</h2>
              <p className="text-slate-600">Accédez à votre espace client sécurisé</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700 font-medium">
                  Identifiant
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Votre identifiant"
                    required
                    className="pl-10 h-12 border-slate-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                    className="pl-10 pr-10 h-12 border-slate-300 focus:border-green-500 focus:ring-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-slate-600 cursor-pointer"
                  >
                    Se souvenir de moi
                  </Label>
                </div>
                <a
                  href="/contact"
                  className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Se connecter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Besoin d'aide ?</span>
              </div>
            </div>

            {/* CTA for support */}
            <div className="text-center">
              <p className="text-slate-600 mb-4">
                Des questions sur votre accès ou vos services ?
              </p>
              <Button
                onClick={() => window.location.href = '/contact'}
                variant="outline"
                className="w-full h-12 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold"
              >
                Contactez-nous
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            <p>
              En vous connectant, vous acceptez nos{" "}
              <a href="/legal/terms" className="text-green-600 hover:text-green-700">
                conditions d'utilisation
              </a>
              {" "}et notre{" "}
              <a href="/legal/privacy" className="text-green-600 hover:text-green-700">
                politique de confidentialité
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
